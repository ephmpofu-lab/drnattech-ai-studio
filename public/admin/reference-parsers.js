/**
 * Reference import — DOM injection approach.
 * Decap CMS 3.14+ does not expose window.h / window.createClass, so custom
 * widget registration is not possible without a build step.  Instead this
 * script waits for the CMS to render the References list section, injects an
 * "↑ Import" button next to the existing "Add references +" button, and
 * handles bulk import via a modal overlay using only standard browser APIs.
 */
(function () {
  'use strict';

  // ─── Parsers ────────────────────────────────────────────────────────────────

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

  // ─── React input setter (works with React 16/17/18) ──────────────────────────

  var nativeSetter = Object.getOwnPropertyDescriptor(window.HTMLInputElement.prototype, 'value').set;

  function setReactInput(el, value) {
    nativeSetter.call(el, value);
    el.dispatchEvent(new Event('input', { bubbles: true }));
    el.dispatchEvent(new Event('change', { bubbles: true }));
  }

  // ─── DOM helpers ─────────────────────────────────────────────────────────────

  function findAddRefsButton() {
    var all = document.querySelectorAll('button');
    for (var i = 0; i < all.length; i++) {
      // Match "Add references +" (Decap CMS list widget button text)
      if (/add\s+reference/i.test(all[i].textContent)) return all[i];
    }
    return null;
  }

  function allTextInputs() {
    // Collect all visible text inputs (excludes hidden, submit, checkbox, radio, file)
    var sel = 'input:not([type="button"]):not([type="submit"]):not([type="reset"]):not([type="checkbox"]):not([type="radio"]):not([type="file"]):not([type="hidden"])';
    return Array.prototype.slice.call(document.querySelectorAll(sel));
  }

  // ─── Import modal ─────────────────────────────────────────────────────────────

  var activeModal = null;

  function openModal(addRefsBtn) {
    if (activeModal) return;

    var PLACEHOLDER = [
      'APA:',
      '  Smith, J., & Jones, A. (2024). Paper title. Journal of Science, 10(2), 45–67.',
      '',
      'BibTeX:',
      '  @article{smith2024,',
      '    author  = {Smith, J.},',
      '    title   = {Paper Title},',
      '    year    = {2024},',
      '    journal = {Nature}',
      '  }',
      '',
      'RIS:',
      '  TY  - JOUR',
      '  AU  - Smith, J.',
      '  TI  - Paper Title',
      '  PY  - 2024',
      '  JO  - Nature',
      '  ER  -',
    ].join('\n');

    var overlay = document.createElement('div');
    overlay.style.cssText = 'position:fixed;top:0;left:0;width:100%;height:100%;background:rgba(0,0,0,0.55);z-index:99999;display:flex;align-items:center;justify-content:center;font-family:-apple-system,BlinkMacSystemFont,sans-serif;';

    var box = document.createElement('div');
    box.style.cssText = 'background:#fff;border-radius:10px;padding:28px;width:640px;max-width:92vw;max-height:85vh;overflow-y:auto;box-shadow:0 24px 64px rgba(0,0,0,0.35);';

    box.innerHTML = [
      '<h3 style="margin:0 0 6px;font-size:17px;font-weight:700;color:#111;">Import References</h3>',
      '<p style="margin:0 0 14px;font-size:13px;color:#666;line-height:1.5;">Paste references in APA, Harvard, Vancouver, BibTeX, or RIS format. One reference per line for plain text.</p>',
      '<textarea id="refs-ta" style="width:100%;height:190px;padding:10px;border:1px solid #d1d5db;border-radius:6px;font-size:13px;font-family:monospace;box-sizing:border-box;resize:vertical;line-height:1.5;" placeholder="' + PLACEHOLDER.replace(/"/g, '&quot;') + '"></textarea>',
      '<div id="refs-preview" style="margin:12px 0;min-height:20px;"></div>',
      '<div style="display:flex;gap:8px;flex-wrap:wrap;">',
      '  <button id="refs-parse" type="button" style="padding:9px 18px;background:#3b82f6;color:#fff;border:none;border-radius:6px;cursor:pointer;font-size:14px;font-family:inherit;font-weight:600;">Parse References</button>',
      '  <button id="refs-confirm" type="button" style="padding:9px 18px;background:#16a34a;color:#fff;border:none;border-radius:6px;cursor:pointer;font-size:14px;font-family:inherit;font-weight:600;display:none;">Import to CMS</button>',
      '  <button id="refs-cancel" type="button" style="padding:9px 18px;background:#f3f4f6;color:#374151;border:1px solid #d1d5db;border-radius:6px;cursor:pointer;font-size:14px;font-family:inherit;margin-left:auto;">Cancel</button>',
      '</div>',
    ].join('');

    overlay.appendChild(box);
    document.body.appendChild(overlay);
    activeModal = overlay;

    var textarea  = box.querySelector('#refs-ta');
    var preview   = box.querySelector('#refs-preview');
    var parseBtn  = box.querySelector('#refs-parse');
    var confirmBtn = box.querySelector('#refs-confirm');
    var cancelBtn = box.querySelector('#refs-cancel');
    var parsedRefs = null;

    textarea.focus();

    // Close on overlay click or Cancel
    overlay.addEventListener('click', function (e) { if (e.target === overlay) close(); });
    cancelBtn.addEventListener('click', close);

    function close() {
      if (activeModal) { activeModal.remove(); activeModal = null; }
    }

    // Parse
    parseBtn.addEventListener('click', function () {
      var text = tr(textarea.value);
      if (!text) {
        preview.innerHTML = '<p style="color:#dc2626;font-size:13px;">⚠ Please paste some reference text first.</p>';
        confirmBtn.style.display = 'none';
        parsedRefs = null;
        return;
      }
      try {
        var refs = parseReferences(text);
        if (!refs.length) {
          preview.innerHTML = '<p style="color:#dc2626;font-size:13px;">⚠ No references detected — check the format and try again.</p>';
          confirmBtn.style.display = 'none';
          parsedRefs = null;
        } else {
          var rows = refs.slice(0, 6).map(function (r, i) {
            return '<p style="font-size:12px;color:#444;margin:3px 0;">' + (i + 1) + '. ' + [r.authors, r.year ? '(' + r.year + ')' : '', r.title].filter(Boolean).join(' ') + '</p>';
          }).join('');
          if (refs.length > 6) rows += '<p style="font-size:12px;color:#888;margin:3px 0;">… and ' + (refs.length - 6) + ' more</p>';
          preview.innerHTML = '<div style="background:#f0fdf4;border:1px solid #86efac;border-radius:6px;padding:10px 12px;"><p style="font-size:13px;font-weight:700;color:#166534;margin:0 0 6px;">✓ ' + refs.length + ' reference' + (refs.length > 1 ? 's' : '') + ' found:</p>' + rows + '</div>';
          confirmBtn.textContent = 'Import ' + refs.length + ' Reference' + (refs.length > 1 ? 's' : '') + ' to CMS';
          confirmBtn.style.display = '';
          parsedRefs = refs;
        }
      } catch (e) {
        preview.innerHTML = '<p style="color:#dc2626;font-size:13px;">⚠ Parse error: ' + e.message + '</p>';
        confirmBtn.style.display = 'none';
        parsedRefs = null;
      }
    });

    // Import
    confirmBtn.addEventListener('click', function () {
      if (!parsedRefs || !parsedRefs.length) return;
      close();
      performImport(parsedRefs, addRefsBtn);
    });
  }

  // ─── Sequential import using click + React native setter ─────────────────────

  var importing = false;

  function performImport(refs, addRefsBtn) {
    if (importing) return;
    importing = true;
    var queue = refs.slice();
    var autoId = 1;

    // Try to figure out starting ID offset from existing entries
    var existingInputs = allTextInputs();
    existingInputs.forEach(function (inp) {
      if (/^ref-(\d+)$/i.test((inp.value || '').trim())) {
        var n = parseInt(RegExp.$1, 10);
        if (n >= autoId) autoId = n + 1;
      }
    });

    function next() {
      if (!queue.length) { importing = false; return; }
      var ref = queue.shift();

      // Snapshot inputs before adding
      var before = allTextInputs();

      // Re-find the button each time (DOM can change between iterations)
      var btn = findAddRefsButton();
      if (!btn) { importing = false; return; }
      btn.click();

      // Poll until 5–6 new inputs appear (one per sub-field)
      var attempts = 0;
      var poll = setInterval(function () {
        attempts++;
        var after = allTextInputs();
        var newInputs = after.filter(function (el) { return before.indexOf(el) === -1; });

        if (newInputs.length >= 5 || attempts > 30) {
          clearInterval(poll);

          // Fill in order: ID, Authors, Year, Title, Source/Journal, URL
          var vals = [
            'ref-' + (autoId++),
            ref.authors || '',
            ref.year    || '',
            ref.title   || '',
            ref.source  || '',
            ref.url     || '',
          ];
          newInputs.slice(0, vals.length).forEach(function (inp, i) {
            if (vals[i]) setReactInput(inp, vals[i]);
          });

          // Brief pause so Decap CMS state settles before next entry
          setTimeout(next, 120);
        }
      }, 40);
    }

    next();
  }

  // ─── Inject button next to "Add references +" ────────────────────────────────

  var INJECTED_ATTR = 'data-refs-import-btn';

  function injectButton() {
    var addBtn = findAddRefsButton();
    if (!addBtn) return;

    // Already injected?
    var parent = addBtn.parentNode;
    if (!parent || parent.querySelector('[' + INJECTED_ATTR + ']')) return;

    var btn = document.createElement('button');
    btn.type = 'button';
    btn.setAttribute(INJECTED_ATTR, '1');
    btn.textContent = '↑ Import';

    // Mirror the visual style of the "Add references +" button
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
    console.log('[RefsImport] "↑ Import" button injected next to "Add references +"');
  }

  // ─── Observe DOM until References section renders ─────────────────────────────

  var observer = new MutationObserver(function () { injectButton(); });

  function start() {
    observer.observe(document.body, { childList: true, subtree: true });
    injectButton(); // in case CMS already rendered
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', start);
  } else {
    start();
  }

})();
