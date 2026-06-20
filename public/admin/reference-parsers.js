(function () {
  'use strict';

  // ─── Helpers ──────────────────────────────────────────────────────────────────
  function makeId(i) { return 'ref-' + (i + 1); }

  // ─── Format detector ──────────────────────────────────────────────────────────
  function detectFormat(text) {
    if (/@\w+\s*\{/.test(text)) return 'bibtex';
    if (/^TY\s+-/m.test(text)) return 'ris';
    var first = text.split('\n')[0];
    if (first.indexOf(',') !== -1 && /title|author/i.test(first)) return 'csv';
    return 'text';
  }

  function parseReferences(raw) {
    var text = (raw || '').trim();
    if (!text) return [];
    switch (detectFormat(text)) {
      case 'bibtex': return parseBibTeX(text);
      case 'ris':    return parseRIS(text);
      case 'csv':    return parseCSV(text);
      default:       return parsePlainText(text);
    }
  }

  // ─── Plain text (APA / Harvard / Vancouver / fallback) ────────────────────────
  function parsePlainText(text) {
    var blocks = text.split(/\n\s*\n+/).map(function (b) { return b.trim(); }).filter(Boolean);
    if (blocks.length <= 1) {
      blocks = text.split(/\n(?=\s*[\[\(]?\d+[\]\)\.]?\s+\S)/).map(function (b) { return b.trim(); }).filter(Boolean);
    }
    return blocks.map(function (block, i) { return parseOneRef(block, i); }).filter(Boolean);
  }

  function parseOneRef(raw, i) {
    var text = raw.replace(/^\s*[\[\(]?\d+[\]\)\.]?\s*/, '').trim();
    if (text.length < 5) return null;
    var ref = { id: makeId(i), authors: '', year: '', title: '', source: '', url: '' };

    var urlM = text.match(/https?:\/\/[^\s,)\]>]+/);
    if (urlM) {
      ref.url = urlM[0].replace(/[.,)>]+$/, '');
      text = text.replace(urlM[0], '').replace(/\s{2,}/g, ' ').trim();
    }

    // APA: Authors (Year). Title. Source.
    var apa = text.match(/^(.+?)\s*\((\d{4}[a-z]?)\)\.\s*(.+?)\.\s*(.+)/);
    if (apa) {
      ref.authors = apa[1].replace(/[.,\s]+$/, '');
      ref.year    = apa[2];
      ref.title   = apa[3].replace(/\.+$/, '');
      ref.source  = apa[4].replace(/[.,\s]+$/, '');
      return ref;
    }

    // Harvard: Author (Year) Title. Source.
    var harv = text.match(/^(.+?)\s*\((\d{4})\)\s+(.+?)\.\s*(.+)/);
    if (harv) {
      ref.authors = harv[1].replace(/[.,\s]+$/, '');
      ref.year    = harv[2];
      ref.title   = harv[3].replace(/\.+$/, '');
      ref.source  = harv[4].replace(/[.,\s]+$/, '');
      return ref;
    }

    // Vancouver: Authors. Title. Source. Year
    var vanc = text.match(/^(.+?)\.\s+(.+?)\.\s+(.+?)\.\s+(\d{4})/);
    if (vanc) {
      ref.authors = vanc[1];
      ref.title   = vanc[2];
      ref.source  = vanc[3];
      ref.year    = vanc[4];
      return ref;
    }

    var yM = text.match(/\b(19|20)\d{2}\b/);
    if (yM) ref.year = yM[0];
    ref.title = text.substring(0, 300);
    return ref;
  }

  // ─── BibTeX ───────────────────────────────────────────────────────────────────
  function getBibField(body, field) {
    var re = new RegExp('\\b' + field + '\\s*=\\s*', 'i');
    var m = re.exec(body);
    if (!m) return '';
    var rest = body.slice(m.index + m[0].length);
    if (rest.charAt(0) === '"') {
      var end = rest.indexOf('"', 1);
      return end > 0 ? rest.slice(1, end).replace(/\s+/g, ' ').trim() : '';
    }
    if (rest.charAt(0) === '{') {
      var depth = 0, j = 0, out = '';
      while (j < rest.length) {
        if (rest[j] === '{') { depth++; }
        else if (rest[j] === '}') { depth--; if (depth === 0) break; }
        if (depth > 0 && j > 0) out += rest[j];
        j++;
      }
      return out.replace(/\s+/g, ' ').trim();
    }
    var num = rest.match(/^(\d+)/);
    return num ? num[1] : '';
  }

  function parseBibTeX(text) {
    var entries = text.match(/@\w+\s*\{[^@]+/g) || [];
    return entries.map(function (entry, i) {
      var keyM = entry.match(/@\w+\s*\{([^,\s]+)/);
      var key = keyM ? keyM[1] : makeId(i);
      var doi = getBibField(entry, 'doi');
      return {
        id:      key,
        authors: getBibField(entry, 'author').replace(/\s+and\s+/gi, '; '),
        year:    getBibField(entry, 'year'),
        title:   getBibField(entry, 'title'),
        source:  getBibField(entry, 'journal') || getBibField(entry, 'booktitle') || getBibField(entry, 'publisher') || '',
        url:     getBibField(entry, 'url') || (doi ? 'https://doi.org/' + doi : ''),
      };
    }).filter(function (r) { return r.title || r.authors; });
  }

  // ─── RIS ──────────────────────────────────────────────────────────────────────
  function parseRIS(text) {
    var refs = [];
    var chunks = text.split(/^ER\s*-[^\n]*/m).filter(function (c) { return c.trim(); });
    chunks.forEach(function (chunk, i) {
      var ref = { id: makeId(i), authors: '', year: '', title: '', source: '', url: '' };
      var auths = [];
      chunk.split('\n').forEach(function (line) {
        var lm = line.match(/^([A-Z][A-Z0-9])\s*-\s*(.+)/);
        if (!lm) return;
        var tag = lm[1], val = lm[2].trim();
        if (tag === 'AU' || tag === 'A1') { auths.push(val); }
        else if (tag === 'PY' || tag === 'Y1') { ref.year = val.split('/')[0]; }
        else if (tag === 'TI' || tag === 'T1') { ref.title = val; }
        else if ((tag === 'JO' || tag === 'JF' || tag === 'T2' || tag === 'SO') && !ref.source) { ref.source = val; }
        else if (tag === 'UR' || tag === 'L1') { ref.url = val; }
      });
      ref.authors = auths.join('; ');
      if (ref.title || ref.authors) refs.push(ref);
    });
    return refs;
  }

  // ─── CSV ──────────────────────────────────────────────────────────────────────
  function splitCSV(line) {
    var cells = [], cur = '', q = false;
    for (var j = 0; j < line.length; j++) {
      var c = line[j];
      if (c === '"') { q = !q; }
      else if (c === ',' && !q) { cells.push(cur.trim()); cur = ''; }
      else { cur += c; }
    }
    cells.push(cur.trim());
    return cells;
  }

  function parseCSV(text) {
    var rows = text.trim().split('\n');
    if (rows.length < 2) return [];
    var headers = splitCSV(rows[0]).map(function (h) { return h.toLowerCase().replace(/^["'\s]+|["'\s]+$/g, ''); });
    var aliases = {
      id:      ['id', 'key', 'ref_id'],
      authors: ['authors', 'author', 'au'],
      year:    ['year', 'date', 'yr', 'py'],
      title:   ['title', 'ti', 'name'],
      source:  ['source', 'journal', 'venue', 'booktitle', 'publisher'],
      url:     ['url', 'doi', 'link', 'uri'],
    };
    var cols = {};
    Object.keys(aliases).forEach(function (f) {
      aliases[f].forEach(function (a) {
        var idx = headers.indexOf(a);
        if (idx >= 0 && cols[f] === undefined) cols[f] = idx;
      });
    });
    var refs = [];
    rows.slice(1).forEach(function (row, i) {
      if (!row.trim()) return;
      var cells = splitCSV(row);
      var get = function (f) { return cols[f] !== undefined ? (cells[cols[f]] || '') : ''; };
      var ref = { id: get('id') || makeId(i), authors: get('authors'), year: get('year'), title: get('title'), source: get('source'), url: get('url') };
      if (ref.title || ref.authors) refs.push(ref);
    });
    return refs;
  }

  // ─── React Widget ─────────────────────────────────────────────────────────────
  var React = window.React;
  var h = React.createElement;

  function toArr(val) {
    if (!val) return [];
    if (typeof val.toJS === 'function') return val.toJS();
    if (Array.isArray(val)) return val;
    return [];
  }

  var C = {
    root: { fontFamily: '-apple-system,BlinkMacSystemFont,sans-serif', fontSize: '14px' },
    tabs: { display: 'flex', gap: '6px', marginBottom: '14px' },
    tab: function (on) {
      return { padding: '5px 14px', borderRadius: '6px', cursor: 'pointer', fontSize: '13px', fontWeight: on ? '600' : '400', border: '1px solid ' + (on ? '#4f46e5' : '#d1d5db'), background: on ? '#4f46e5' : '#fff', color: on ? '#fff' : '#374151' };
    },
    refRow: { display: 'flex', alignItems: 'flex-start', gap: '8px', padding: '10px 12px', marginBottom: '6px', borderRadius: '8px', border: '1px solid #e5e7eb', background: '#fafafa' },
    idx:  { color: '#9ca3af', fontSize: '12px', minWidth: '28px', marginTop: '3px' },
    body: { flex: '1', fontSize: '13px', lineHeight: '1.55' },
    del:  { background: 'none', border: 'none', color: '#ef4444', cursor: 'pointer', fontSize: '18px', lineHeight: '1', padding: '0 2px' },
    empty:{ color: '#9ca3af', fontSize: '13px', padding: '10px 0' },
    ta:   { width: '100%', minHeight: '160px', padding: '10px', boxSizing: 'border-box', fontFamily: 'monospace', fontSize: '12.5px', border: '1px solid #d1d5db', borderRadius: '6px', resize: 'vertical', lineHeight: '1.5', marginTop: '8px' },
    hint: { fontSize: '12px', color: '#6b7280', lineHeight: '1.5' },
    bar:  { display: 'flex', gap: '8px', alignItems: 'center', marginTop: '10px', flexWrap: 'wrap' },
    btn: function (bg) { return { padding: '6px 14px', borderRadius: '6px', border: 'none', cursor: 'pointer', fontWeight: '600', fontSize: '13px', background: bg || '#4f46e5', color: '#fff' }; },
    ghost:{ padding: '6px 14px', borderRadius: '6px', border: '1px solid #d1d5db', background: '#f9fafb', color: '#374151', fontSize: '13px', cursor: 'pointer' },
    err:  { color: '#dc2626', fontSize: '13px', marginTop: '6px' },
    box:  { marginTop: '12px', padding: '12px', borderRadius: '8px', background: '#f0fdf4', border: '1px solid #86efac' },
    boxH: { fontWeight: '600', fontSize: '13px', color: '#15803d', marginBottom: '8px', margin: '0 0 8px 0' },
    boxL: { fontSize: '12px', color: '#166534', margin: '0 0 3px 0' },
    form: { marginTop: '10px', padding: '12px', border: '1px solid #e5e7eb', borderRadius: '8px', background: '#f9fafb' },
    grid: { display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '8px', marginBottom: '8px' },
    lbl:  { display: 'block', fontSize: '11px', color: '#6b7280', marginBottom: '3px', fontWeight: '600', textTransform: 'uppercase', letterSpacing: '0.04em' },
    inp:  { width: '100%', padding: '6px 9px', border: '1px solid #d1d5db', borderRadius: '6px', fontSize: '13px', boxSizing: 'border-box' },
  };

  var BLANK = { id: '', authors: '', year: '', title: '', source: '', url: '' };

  function RefsControl(props) {
    var refs = toArr(props.value);

    var s1 = React.useState('list');              var tab = s1[0];      var setTab = s1[1];
    var s2 = React.useState('');                  var raw = s2[0];      var setRaw = s2[1];
    var s3 = React.useState(null);                var parsed = s3[0];   var setParsed = s3[1];
    var s4 = React.useState('');                  var err = s4[0];      var setErr = s4[1];
    var s5 = React.useState('');                  var fstat = s5[0];    var setFstat = s5[1];
    var s6 = React.useState(false);               var showForm = s6[0]; var setShowForm = s6[1];
    var s7 = React.useState(Object.assign({}, BLANK)); var entry = s7[0]; var setEntry = s7[1];
    var fileRef = React.useRef(null);

    function setField(k, v) { var u = Object.assign({}, entry); u[k] = v; setEntry(u); }
    function save(arr) { props.onChange(arr); }

    function doParse() {
      if (!raw.trim()) { setErr('Paste references first.'); return; }
      try {
        var r = parseReferences(raw);
        if (!r.length) { setErr('No references detected — check the format and try again.'); return; }
        setParsed(r); setErr('');
      } catch (e) { setErr('Parse error: ' + e.message); }
    }

    function doAppend() {
      var base = refs.length;
      save(refs.concat(parsed.map(function (r, i) { return Object.assign({}, r, { id: r.id || makeId(base + i) }); })));
      resetImport();
    }

    function doReplace() { save(parsed); resetImport(); }

    function resetImport() { setParsed(null); setRaw(''); setFstat(''); setTab('list'); }

    function doDelete(i) { save(refs.filter(function (_, j) { return j !== i; })); }

    function doAddManual() {
      if (!entry.title && !entry.authors) return;
      save(refs.concat([Object.assign({}, entry, { id: entry.id || makeId(refs.length) })]));
      setEntry(Object.assign({}, BLANK)); setShowForm(false);
    }

    function onFile(e) {
      var f = e.target.files[0]; if (!f) return;
      setFstat('Reading ' + f.name + '…');
      var rdr = new FileReader();
      rdr.onload = function (ev) { setRaw(ev.target.result || ''); setFstat('Loaded: ' + f.name); setParsed(null); setErr(''); };
      rdr.onerror = function () { setFstat('Error reading file.'); };
      rdr.readAsText(f);
    }

    // ── List tab ─────────────────────────────────────────────────────────────────
    function renderList() {
      return h('div', null,
        refs.length === 0
          ? h('p', { style: C.empty }, 'No references yet. Use "Bulk Import" to add many at once, or "+ Add one manually" below.')
          : refs.map(function (ref, i) {
              return h('div', { key: i, style: C.refRow },
                h('span', { style: C.idx }, '[' + (i + 1) + ']'),
                h('div', { style: C.body },
                  ref.authors ? h('strong', null, ref.authors) : null,
                  (ref.authors && ref.year) ? h('span', null, ' (' + ref.year + '). ') : null,
                  ref.title ? h('em', null, ref.title) : null,
                  ref.title ? '. ' : null,
                  ref.source ? h('span', null, ref.source) : null,
                  ref.source ? '.' : null,
                  ref.url ? h('a', { href: ref.url, target: '_blank', rel: 'noreferrer', style: { color: '#4f46e5', fontSize: '12px', marginLeft: '6px' } }, 'Link ↗') : null
                ),
                h('button', { type: 'button', style: C.del, onClick: function () { doDelete(i); }, title: 'Remove' }, '×')
              );
            }),
        h('div', { style: { marginTop: '10px' } },
          showForm ? renderManualForm() : h('button', { type: 'button', style: C.ghost, onClick: function () { setShowForm(true); } }, '+ Add one manually')
        )
      );
    }

    // ── Manual add form ───────────────────────────────────────────────────────────
    function renderManualForm() {
      function inp(label, key) {
        return h('div', null,
          h('label', { style: C.lbl }, label),
          h('input', { type: 'text', style: C.inp, value: entry[key], onChange: function (e) { setField(key, e.target.value); } })
        );
      }
      return h('div', { style: C.form },
        h('p', { style: { fontWeight: '600', fontSize: '13px', marginBottom: '10px', marginTop: '0' } }, 'Add a reference manually'),
        h('div', { style: C.grid }, inp('Authors', 'authors'), inp('Year', 'year')),
        h('div', { style: { marginBottom: '8px' } }, inp('Title', 'title')),
        h('div', { style: C.grid }, inp('Source / Journal', 'source'), inp('URL (optional)', 'url')),
        h('div', { style: Object.assign({}, C.grid, { marginBottom: '10px' }) }, inp('Reference ID (optional)', 'id'), h('div', null)),
        h('div', { style: C.bar },
          h('button', { type: 'button', style: C.btn(), onClick: doAddManual }, 'Add reference'),
          h('button', { type: 'button', style: C.ghost, onClick: function () { setShowForm(false); setEntry(Object.assign({}, BLANK)); } }, 'Cancel')
        )
      );
    }

    // ── Import tab ────────────────────────────────────────────────────────────────
    function renderImport() {
      return h('div', null,
        h('p', { style: C.hint },
          'Paste references in APA, Harvard, Vancouver, BibTeX, or RIS format (one per blank line), or upload a ',
          h('code', null, '.bib'), ', ', h('code', null, '.ris'), ', ', h('code', null, '.csv'), ', or ', h('code', null, '.txt'), ' file.'
        ),
        h('textarea', {
          style: C.ta,
          placeholder: 'APA example:\nMpofu, E. (2024). Agentic AI Systems in Enterprise. AI Quarterly, 12(3), 45–67.\n\nSmith, J. & Lee, A. (2023). RAG Architectures at Scale. Journal of AI, 5(1), 1–20.',
          value: raw,
          onChange: function (e) { setRaw(e.target.value); setParsed(null); setErr(''); },
        }),
        fstat ? h('p', { style: Object.assign({}, C.hint, { marginTop: '4px' }) }, fstat) : null,
        h('div', { style: C.bar },
          h('button', { type: 'button', style: C.ghost, onClick: function () { fileRef.current && fileRef.current.click(); } }, '📎 Upload file (.bib .ris .csv .txt)'),
          h('input', { ref: fileRef, type: 'file', accept: '.bib,.ris,.csv,.txt,.text', style: { display: 'none' }, onChange: onFile }),
          h('button', { type: 'button', style: C.btn(), onClick: doParse }, 'Parse References →')
        ),
        err ? h('p', { style: C.err }, err) : null,
        parsed ? renderParsedPreview() : null
      );
    }

    function renderParsedPreview() {
      return h('div', { style: C.box },
        h('p', { style: C.boxH }, '✓ Found ' + parsed.length + ' reference' + (parsed.length !== 1 ? 's' : '') + ':'),
        parsed.slice(0, 5).map(function (ref, i) {
          return h('p', { key: i, style: C.boxL },
            '[' + (i + 1) + '] ',
            (ref.authors || '—') + (ref.year ? ' (' + ref.year + ')' : '') +
            ' — ' + (ref.title || '').substring(0, 80) + (ref.title && ref.title.length > 80 ? '…' : '')
          );
        }),
        parsed.length > 5 ? h('p', { style: C.boxL }, '… and ' + (parsed.length - 5) + ' more') : null,
        h('div', { style: Object.assign({}, C.bar, { marginTop: '10px' }) },
          refs.length > 0
            ? h('button', { type: 'button', style: C.btn('#15803d'), onClick: doAppend }, 'Append ' + parsed.length + ' to existing ' + refs.length)
            : null,
          h('button', { type: 'button', style: C.btn(), onClick: doReplace },
            (refs.length > 0 ? 'Replace all with ' : 'Add ') + parsed.length + ' references'),
          h('button', { type: 'button', style: C.ghost, onClick: function () { setParsed(null); } }, 'Cancel')
        )
      );
    }

    // ── Root ─────────────────────────────────────────────────────────────────────
    return h('div', { style: C.root },
      h('div', { style: C.tabs },
        h('button', { type: 'button', style: C.tab(tab === 'list'), onClick: function () { setTab('list'); } },
          'References' + (refs.length ? ' (' + refs.length + ')' : '')
        ),
        h('button', { type: 'button', style: C.tab(tab === 'import'), onClick: function () { setTab('import'); } }, '⬇ Bulk Import')
      ),
      tab === 'list' ? renderList() : renderImport()
    );
  }

  function RefsPreview(props) {
    var refs = toArr(props.value);
    if (!refs.length) return h('p', null, 'No references.');
    return h('ol', { style: { fontSize: '13px', lineHeight: '1.6' } },
      refs.map(function (ref, i) {
        return h('li', { key: i, style: { marginBottom: '6px' } },
          ref.authors, ref.year ? ' (' + ref.year + '). ' : ' ',
          h('em', null, ref.title), '. ',
          ref.source, '.',
          ref.url ? h('a', { href: ref.url, target: '_blank', style: { color: '#4f46e5', marginLeft: '4px' } }, ' [Link]') : null
        );
      })
    );
  }

  CMS.registerWidget('references-bulk', RefsControl, RefsPreview);

})();
