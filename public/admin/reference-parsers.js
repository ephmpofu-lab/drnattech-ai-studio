/**
 * Reference import — DOM injection, no CMS widget API required.
 *
 * Two modes:
 *   Mode 1 — Structured Parse: extracts Authors / Year / Title / Source / URL
 *             and fills the structured list-widget fields one by one.
 *   Mode 2 — Raw Import: stores the pasted text verbatim in the "Raw References"
 *             textarea field without any parsing or reformatting.
 *
 * Both modes support Append and Replace actions.
 */
(function () {
  'use strict';

  // ─── Parsers (Mode 1 only) ────────────────────────────────────────────────────

  function tr(s) { return (s || '').trim(); }

  function parseBibTeX(text) {
    var refs = [];
    var entries = text.match(/@\w+\{[^@]+/g) || [];
    entries.forEach(function (entry) {
      function field(name) {
        var m = entry.match(new RegExp(name + '\\s*=\\s*[{"]([\\s\\S]*?)[}"]', 'i'));
        return m ? tr(m[1].replace(/\s+/g, ' ')) : '';
      }
      var title = field('title');
      if (!title) return;
      refs.push({
        authors: field('author').replace(/\s+and\s+/gi, ', '),
        year: field('year'),
        title: title,
        source: field('journal') || field('booktitle') || field('publisher') || '',
        url: field('url') || field('doi') || '',
      });
    });
    return refs;
  }

  function parseRIS(text) {
    var refs = [];
    var blocks = text.split(/(?:\r?\n)ER\s*-/);
    if (blocks.length === 1) blocks = [text];
    blocks.forEach(function (block) {
      if (!tr(block)) return;
      var ref = { authors: [], title: '', year: '', source: '', url: '' };
      block.split(/\r?\n/).forEach(function (line) {
        var m = line.match(/^([A-Z][A-Z0-9])\s*-\s*(.*)/);
        if (!m) return;
        var tag = m[1], val = tr(m[2]);
        if (tag === 'AU' || tag === 'A1') ref.authors.push(val);
        else if (tag === 'TI' || tag === 'T1') ref.title = val;
        else if (tag === 'PY' || tag === 'Y1') ref.year = val.split('/')[0].slice(0, 4);
        else if ((tag === 'JO' || tag === 'JF' || tag === 'T2') && !ref.source) ref.source = val;
        else if (tag === 'UR') ref.url = val;
      });
      if (ref.title) refs.push({ authors: ref.authors.join('; '), year: ref.year, title: ref.title, source: ref.source, url: ref.url });
    });
    return refs;
  }

  function parsePlainText(text) {
    var refs = [];
    text.split(/\r?\n/).map(tr).filter(Boolean).forEach(function (line) {
      line = line.replace(/^[\[\(]?\d+[\]\)\.\s]+/, '');
      var yearMatch = line.match(/\((\d{4}[a-z]?)\)/);
      var year = yearMatch ? yearMatch[1] : '';
      var urlMatch = line.match(/https?:\/\/[^\s,]+/);
      var url = urlMatch ? urlMatch[0] : '';
      var authorsPart = '';
      var afterYear = line;
      if (yearMatch) {
        authorsPart = tr(line.slice(0, yearMatch.index)).replace(/[.,]\s*$/, '');
        afterYear = tr(line.slice(yearMatch.index + yearMatch[0].length)).replace(/^[.\s]+/, '');
      }
      var titleEnd = afterYear.search(/\.\s+[A-Z*_]/);
      var title = titleEnd !== -1 ? tr(afterYear.slice(0, titleEnd)) : tr(afterYear.split('.')[0]);
      title = title.replace(/\.$/, '');
      var afterTitle = titleEnd !== -1 ? tr(afterYear.slice(titleEnd + 1)) : tr(afterYear.slice(title.length + 1));
      afterTitle = afterTitle.replace(/^\*+/, '').replace(/\*+$/, '');
      var source = tr(afterTitle.split(/[,.\d]/)[0]).replace(/^[.\s]+/, '');
      if (title) refs.push({ authors: authorsPart, year: year, title: title, source: source, url: url });
    });
    return refs;
  }

  function parseReferences(text) {
    var t = tr(text);
    if (!t) return [];
    if (/@\w+\s*\{/.test(t)) return parseBibTeX(t);
    if (/^TY\s+-/m.test(t) || /^AU\s+-/m.test(t) || /^A1\s+-/m.test(t)) return parseRIS(t);
    return parsePlainText(t);
  }

  // ─── React input / textarea setter ───────────────────────────────────────────

  var inputSetter    = Object.getOwnPropertyDescriptor(window.HTMLInputElement.prototype,  'value').set;
  var textareaSetter = Object.getOwnPropertyDescriptor(window.HTMLTextAreaElement.prototype, 'value').set;

  function setInput(el, value) {
    inputSetter.call(el, value);
    el.dispatchEvent(new Event('input',  { bubbles: true }));
    el.dispatchEvent(new Event('change', { bubbles: true }));
  }

  function setTextarea(el, value) {
    textareaSetter.call(el, value);
    el.dispatchEvent(new Event('input',  { bubbles: true }));
    el.dispatchEvent(new Event('change', { bubbles: true }));
  }

  // ─── DOM helpers ──────────────────────────────────────────────────────────────

  function allTextInputs() {
    var sel = 'input:not([type="button"]):not([type="submit"]):not([type="reset"]):not([type="checkbox"]):not([type="radio"]):not([type="file"]):not([type="hidden"])';
    return Array.prototype.slice.call(document.querySelectorAll(sel));
  }

  function findAddRefsButton() {
    var all = document.querySelectorAll('button');
    for (var i = 0; i < all.length; i++) {
      if (/add\s+reference/i.test(all[i].textContent)) return all[i];
    }
    return null;
  }

  // Walk up from addBtn to find the list-widget container that holds all items.
  function getRefsContainer(addBtn) {
    var el = addBtn.parentNode;        // header row
    if (el) el = el.parentNode;       // list widget root
    return el || null;
  }

  // Find the × delete buttons inside the References list container.
  function findDeleteButtons(container) {
    if (!container) return [];
    return Array.prototype.slice.call(container.querySelectorAll('button')).filter(function (btn) {
      if (btn.hasAttribute('data-refs-import-btn')) return false;
      if (/add\s+reference/i.test(btn.textContent)) return false;
      if (/[▼▸▾►◄›‹⌃⌄↑↓]/u.test(btn.textContent)) return false;
      if (btn.textContent.trim().length > 3) return false;
      return true;
    });
  }

  // Recursively click each delete button one at a time (DOM re-renders after each click).
  function deleteAllRefs(addBtn, onDone) {
    var container = getRefsContainer(addBtn);
    var btns = findDeleteButtons(container);
    if (!btns.length) { onDone(); return; }
    btns[0].click();
    setTimeout(function () { deleteAllRefs(addBtn, onDone); }, 90);
  }

  // Find the "Raw References" textarea by walking the DOM for its label text.
  function findRawRefTextarea() {
    var walker = document.createTreeWalker(document.body, NodeFilter.SHOW_TEXT, null, false);
    var node;
    while ((node = walker.nextNode())) {
      if (/^RAW REFERENCES(\s+\(OPTIONAL\))?$/i.test(node.nodeValue.trim())) {
        var parent = node.parentElement;
        for (var depth = 0; parent && depth < 10; depth++) {
          var ta = parent.querySelector('textarea');
          if (ta) return ta;
          parent = parent.parentElement;
        }
      }
    }
    return null;
  }

  // ─── Modal ────────────────────────────────────────────────────────────────────

  var activeModal = null;

  function openModal(addRefsBtn) {
    if (activeModal) return;

    var overlay = document.createElement('div');
    overlay.style.cssText = 'position:fixed;top:0;left:0;width:100%;height:100%;background:rgba(0,0,0,0.6);z-index:99999;display:flex;align-items:center;justify-content:center;font-family:-apple-system,BlinkMacSystemFont,sans-serif;';

    var box = document.createElement('div');
    box.style.cssText = 'background:#fff;border-radius:10px;padding:28px;width:680px;max-width:94vw;max-height:88vh;overflow-y:auto;box-shadow:0 24px 64px rgba(0,0,0,0.38);';

    box.innerHTML = [
      '<h3 style="margin:0 0 18px;font-size:17px;font-weight:700;color:#111;">Import References</h3>',

      // Mode selector
      '<div style="margin-bottom:16px;">',
      '  <p style="margin:0 0 8px;font-size:12px;font-weight:600;color:#374151;letter-spacing:.06em;text-transform:uppercase;">Import Mode</p>',
      '  <label style="display:flex;align-items:flex-start;gap:8px;cursor:pointer;margin-bottom:8px;">',
      '    <input type="radio" name="refs-mode" id="mode-structured" value="structured" checked style="margin-top:3px;cursor:pointer;">',
      '    <span style="font-size:13px;color:#111;"><strong>Structured Parse</strong><br><span style="color:#6b7280;font-size:12px;">Extracts Authors, Year, Title, Source, URL into individual fields. Supports APA, Harvard, Vancouver, BibTeX, RIS.</span></span>',
      '  </label>',
      '  <label style="display:flex;align-items:flex-start;gap:8px;cursor:pointer;">',
      '    <input type="radio" name="refs-mode" id="mode-raw" value="raw" style="margin-top:3px;cursor:pointer;">',
      '    <span style="font-size:13px;color:#111;"><strong>Raw Import</strong><br><span style="color:#6b7280;font-size:12px;">Stores your bibliography exactly as pasted — no parsing, no splitting. Fills the Raw References field.</span></span>',
      '  </label>',
      '</div>',

      '<div style="height:1px;background:#e5e7eb;margin:16px 0;"></div>',

      // Textarea
      '<p style="margin:0 0 8px;font-size:12px;font-weight:600;color:#374151;letter-spacing:.06em;text-transform:uppercase;">Paste References</p>',
      '<textarea id="refs-ta" style="width:100%;height:200px;padding:10px;border:1px solid #d1d5db;border-radius:6px;font-size:13px;font-family:monospace;box-sizing:border-box;resize:vertical;line-height:1.55;" placeholder="Paste APA, BibTeX, RIS, or plain text references here..."></textarea>',

      // Parse button (Mode 1 only)
      '<div id="refs-parse-row" style="margin-top:10px;">',
      '  <button id="refs-parse" type="button" style="padding:8px 16px;background:#3b82f6;color:#fff;border:none;border-radius:6px;cursor:pointer;font-size:13px;font-family:inherit;font-weight:600;">Parse References</button>',
      '</div>',

      // Preview (Mode 1 only)
      '<div id="refs-preview" style="margin:10px 0;min-height:4px;"></div>',

      '<div style="height:1px;background:#e5e7eb;margin:16px 0;"></div>',

      // Action selector
      '<div style="margin-bottom:18px;">',
      '  <p style="margin:0 0 8px;font-size:12px;font-weight:600;color:#374151;letter-spacing:.06em;text-transform:uppercase;">On Import</p>',
      '  <label style="display:flex;align-items:center;gap:8px;cursor:pointer;margin-bottom:6px;">',
      '    <input type="radio" name="refs-action" id="action-append" value="append" checked style="cursor:pointer;">',
      '    <span style="font-size:13px;color:#111;">Append to existing references</span>',
      '  </label>',
      '  <label style="display:flex;align-items:center;gap:8px;cursor:pointer;">',
      '    <input type="radio" name="refs-action" id="action-replace" value="replace" style="cursor:pointer;">',
      '    <span style="font-size:13px;color:#111;">Replace existing references</span>',
      '  </label>',
      '</div>',

      // Buttons
      '<div style="display:flex;gap:8px;flex-wrap:wrap;align-items:center;">',
      '  <button id="refs-confirm" type="button" style="padding:9px 20px;background:#16a34a;color:#fff;border:none;border-radius:6px;cursor:pointer;font-size:14px;font-family:inherit;font-weight:600;opacity:.4;pointer-events:none;">Import to CMS</button>',
      '  <button id="refs-cancel" type="button" style="padding:9px 18px;background:#f3f4f6;color:#374151;border:1px solid #d1d5db;border-radius:6px;cursor:pointer;font-size:14px;font-family:inherit;margin-left:auto;">Cancel</button>',
      '</div>',
    ].join('');

    overlay.appendChild(box);
    document.body.appendChild(overlay);
    activeModal = overlay;

    var textarea   = box.querySelector('#refs-ta');
    var parseRow   = box.querySelector('#refs-parse-row');
    var parseBtn   = box.querySelector('#refs-parse');
    var preview    = box.querySelector('#refs-preview');
    var confirmBtn = box.querySelector('#refs-confirm');
    var cancelBtn  = box.querySelector('#refs-cancel');
    var modeStructured = box.querySelector('#mode-structured');
    var modeRaw        = box.querySelector('#mode-raw');
    var actionAppend   = box.querySelector('#action-append');
    var actionReplace  = box.querySelector('#action-replace');

    var parsedRefs = null;

    textarea.focus();

    function isRawMode()     { return modeRaw.checked; }
    function isReplaceMode() { return actionReplace.checked; }

    // Update Parse row visibility on mode change
    function onModeChange() {
      parseRow.style.display  = isRawMode() ? 'none' : '';
      preview.style.display   = isRawMode() ? 'none' : '';
      parsedRefs = null;
      refreshConfirm();
    }

    // Enable the Import button only when there's something ready to import
    function refreshConfirm() {
      var ready = isRawMode()
        ? tr(textarea.value).length > 0
        : parsedRefs !== null && parsedRefs.length > 0;

      if (ready) {
        confirmBtn.style.opacity = '1';
        confirmBtn.style.pointerEvents = 'auto';
        if (isRawMode()) {
          confirmBtn.textContent = 'Import to CMS';
        }
      } else {
        confirmBtn.style.opacity = '0.4';
        confirmBtn.style.pointerEvents = 'none';
      }
    }

    [modeStructured, modeRaw].forEach(function (r) { r.addEventListener('change', onModeChange); });
    textarea.addEventListener('input', refreshConfirm);

    // ── Close ─────────────────────────────────────────────────────────────────

    function closeModal() {
      if (activeModal) { activeModal.remove(); activeModal = null; }
    }

    overlay.addEventListener('click', function (e) { if (e.target === overlay) closeModal(); });
    cancelBtn.addEventListener('click', closeModal);

    // ── Parse (Mode 1) ────────────────────────────────────────────────────────

    parseBtn.addEventListener('click', function () {
      var text = tr(textarea.value);
      if (!text) {
        preview.innerHTML = '<p style="color:#dc2626;font-size:13px;">⚠ Paste some reference text first.</p>';
        parsedRefs = null;
        refreshConfirm();
        return;
      }
      try {
        var refs = parseReferences(text);
        if (!refs.length) {
          preview.innerHTML = '<p style="color:#dc2626;font-size:13px;">⚠ No references detected — check the format and try again.</p>';
          parsedRefs = null;
        } else {
          var rows = refs.slice(0, 6).map(function (r, i) {
            return '<p style="font-size:12px;color:#444;margin:3px 0;">' + (i + 1) + '. ' +
              [r.authors, r.year ? '(' + r.year + ')' : '', r.title].filter(Boolean).join(' ') + '</p>';
          }).join('');
          if (refs.length > 6) rows += '<p style="font-size:12px;color:#888;margin:3px 0;">… and ' + (refs.length - 6) + ' more</p>';
          preview.innerHTML = '<div style="background:#f0fdf4;border:1px solid #86efac;border-radius:6px;padding:10px 12px;">' +
            '<p style="font-size:13px;font-weight:700;color:#166534;margin:0 0 6px;">✓ ' + refs.length + ' reference' + (refs.length > 1 ? 's' : '') + ' found:</p>' +
            rows + '</div>';
          confirmBtn.textContent = 'Import ' + refs.length + ' Reference' + (refs.length > 1 ? 's' : '') + ' to CMS';
          parsedRefs = refs;
        }
        refreshConfirm();
      } catch (e) {
        preview.innerHTML = '<p style="color:#dc2626;font-size:13px;">⚠ Parse error: ' + e.message + '</p>';
        parsedRefs = null;
        refreshConfirm();
      }
    });

    // ── Import ────────────────────────────────────────────────────────────────

    confirmBtn.addEventListener('click', function () {
      var rawMode    = isRawMode();
      var replaceMode = isReplaceMode();

      closeModal();

      if (rawMode) {
        performRawImport(tr(textarea.value), replaceMode);
      } else {
        if (!parsedRefs || !parsedRefs.length) return;
        if (replaceMode) {
          deleteAllRefs(findAddRefsButton(), function () {
            performStructuredImport(parsedRefs);
          });
        } else {
          performStructuredImport(parsedRefs);
        }
      }
    });
  }

  // ─── Mode 2: Raw import ───────────────────────────────────────────────────────

  function performRawImport(text, replace) {
    var ta = findRawRefTextarea();
    if (!ta) {
      alert('Could not find the "Raw References" field. Make sure you have scrolled the article so the field is visible, then try again.');
      return;
    }
    var newValue = replace ? text : (tr(ta.value) ? tr(ta.value) + '\n\n' + text : text);
    setTextarea(ta, newValue);
    console.log('[RefsImport] Raw references ' + (replace ? 'replaced' : 'appended') + '.');
  }

  // ─── Mode 1: Structured import ────────────────────────────────────────────────

  var importing = false;

  function performStructuredImport(refs) {
    if (importing) return;
    importing = true;

    var queue  = refs.slice();
    var autoId = 1;

    // Determine the starting ID offset from existing entries.
    allTextInputs().forEach(function (inp) {
      if (/^ref-(\d+)$/i.test((inp.value || '').trim())) {
        var n = parseInt(RegExp.$1, 10);
        if (n >= autoId) autoId = n + 1;
      }
    });

    function next() {
      if (!queue.length) { importing = false; return; }
      var ref = queue.shift();
      var before = allTextInputs();
      var btn = findAddRefsButton();
      if (!btn) { importing = false; return; }
      btn.click();

      var attempts = 0;
      var poll = setInterval(function () {
        attempts++;
        var newInputs = allTextInputs().filter(function (el) { return before.indexOf(el) === -1; });
        if (newInputs.length >= 5 || attempts > 30) {
          clearInterval(poll);
          var vals = ['ref-' + (autoId++), ref.authors || '', ref.year || '', ref.title || '', ref.source || '', ref.url || ''];
          newInputs.slice(0, vals.length).forEach(function (inp, i) {
            if (vals[i]) setInput(inp, vals[i]);
          });
          setTimeout(next, 120);
        }
      }, 40);
    }

    next();
  }

  // ─── Inject "↑ Import" button ─────────────────────────────────────────────────

  var INJECTED_ATTR = 'data-refs-import-btn';

  function injectButton() {
    var addBtn = findAddRefsButton();
    if (!addBtn) return;
    var parent = addBtn.parentNode;
    if (!parent || parent.querySelector('[' + INJECTED_ATTR + ']')) return;

    var btn = document.createElement('button');
    btn.type = 'button';
    btn.setAttribute(INJECTED_ATTR, '1');
    btn.textContent = '↑ Import';

    var cs = window.getComputedStyle(addBtn);
    btn.style.cssText = [
      'cursor:pointer',
      'margin-left:8px',
      'padding:' + cs.getPropertyValue('padding'),
      'border:' + cs.getPropertyValue('border'),
      'border-radius:' + cs.getPropertyValue('border-radius'),
      'background:' + cs.getPropertyValue('background-color'),
      'color:' + cs.getPropertyValue('color'),
      'font-size:' + cs.getPropertyValue('font-size'),
      'font-weight:' + cs.getPropertyValue('font-weight'),
      'font-family:inherit',
      'line-height:' + cs.getPropertyValue('line-height'),
    ].join(';');

    btn.addEventListener('click', function (e) {
      e.preventDefault();
      e.stopPropagation();
      openModal(addBtn);
    });

    parent.insertBefore(btn, addBtn.nextSibling);
    console.log('[RefsImport] "↑ Import" button injected.');
  }

  // ─── MutationObserver ─────────────────────────────────────────────────────────

  var observer = new MutationObserver(function () { injectButton(); });

  function start() {
    observer.observe(document.body, { childList: true, subtree: true });
    injectButton();
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', start);
  } else {
    start();
  }

})();
