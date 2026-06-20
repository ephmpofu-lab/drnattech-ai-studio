(function () {
  'use strict';

  var h = window.h;
  var createClass = window.createClass;

  if (!h || !createClass) {
    console.error('[RefsWidget] window.h or window.createClass not available — widget not registered.');
    return;
  }

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
        year:    field('year'),
        title:   title,
        source:  field('journal') || field('booktitle') || field('publisher') || '',
        url:     field('url') || field('doi') || '',
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

  // ─── Styles ─────────────────────────────────────────────────────────────────

  var S = {
    wrap:        { fontFamily: '-apple-system, BlinkMacSystemFont, sans-serif', fontSize: '14px', color: '#333', lineHeight: '1.4' },
    topBar:      { display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '10px' },
    count:       { fontSize: '12px', color: '#888' },
    btn:         { display: 'inline-flex', alignItems: 'center', gap: '5px', padding: '6px 13px', borderRadius: '5px', cursor: 'pointer', fontSize: '13px', border: '1px solid #ccc', background: '#f7f7f7', color: '#333', fontFamily: 'inherit', lineHeight: '1' },
    btnPrimary:  { background: '#3b82f6', color: '#fff', border: '1px solid #3b82f6' },
    btnRemove:   { padding: '3px 8px', fontSize: '12px', borderRadius: '4px', cursor: 'pointer', border: '1px solid #fca5a5', background: 'transparent', color: '#dc2626', fontFamily: 'inherit' },
    card:        { padding: '9px 12px', marginBottom: '7px', borderRadius: '6px', border: '1px solid #e4e4e4', background: '#fafafa' },
    cardHeader:  { display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', gap: '8px' },
    cardTitle:   { fontSize: '13px', cursor: 'pointer', flex: '1', color: '#333', lineHeight: '1.4', userSelect: 'none' },
    grid:        { marginTop: '10px', display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '8px' },
    fullCol:     { gridColumn: '1 / -1' },
    lbl:         { display: 'block', fontSize: '11px', fontWeight: '600', color: '#777', textTransform: 'uppercase', letterSpacing: '0.05em', marginBottom: '3px' },
    input:       { width: '100%', padding: '5px 8px', borderRadius: '4px', border: '1px solid #ccc', fontSize: '13px', boxSizing: 'border-box', fontFamily: 'inherit' },
    textarea:    { width: '100%', padding: '8px', borderRadius: '5px', border: '1px solid #ccc', fontSize: '13px', boxSizing: 'border-box', minHeight: '180px', resize: 'vertical', fontFamily: 'monospace, monospace' },
    hint:        { fontSize: '12px', color: '#666', margin: '0 0 8px' },
    error:       { fontSize: '13px', color: '#dc2626', margin: '6px 0 0' },
    preview:     { background: '#eff6ff', border: '1px solid #bfdbfe', borderRadius: '6px', padding: '10px 12px', margin: '10px 0' },
    previewHdr:  { fontWeight: '700', fontSize: '13px', marginBottom: '6px', color: '#1e40af' },
    previewLine: { fontSize: '12px', color: '#555', margin: '3px 0' },
    empty:       { fontSize: '13px', color: '#aaa', textAlign: 'center', padding: '16px 0', fontStyle: 'italic' },
  };

  // ─── Widget Control ──────────────────────────────────────────────────────────

  var RefsControl = createClass({
    displayName: 'RefsControl',

    getInitialState: function () {
      return { mode: 'list', importText: '', importParsed: null, importError: '', expanded: {} };
    },

    getRefs: function () {
      var v = this.props.value;
      if (!v) return [];
      if (typeof v.toJS === 'function') return v.toJS();
      if (Array.isArray(v)) return v;
      return [];
    },

    setRefs: function (refs) { this.props.onChange(refs); },

    handleAdd: function () {
      var refs = this.getRefs();
      var newRefs = refs.concat([{ id: 'ref-' + (refs.length + 1), authors: '', year: '', title: '', source: '', url: '' }]);
      this.setRefs(newRefs);
      var exp = Object.assign({}, this.state.expanded);
      exp[newRefs.length - 1] = true;
      this.setState({ expanded: exp });
    },

    handleDelete: function (idx) {
      var exp = Object.assign({}, this.state.expanded);
      delete exp[idx];
      this.setRefs(this.getRefs().filter(function (_, i) { return i !== idx; }));
      this.setState({ expanded: exp });
    },

    handleField: function (idx, field, val) {
      var refs = this.getRefs().slice();
      var obj = Object.assign({}, refs[idx]);
      obj[field] = val;
      refs[idx] = obj;
      this.setRefs(refs);
    },

    toggle: function (idx) {
      var exp = Object.assign({}, this.state.expanded);
      exp[idx] = !exp[idx];
      this.setState({ expanded: exp });
    },

    handleParse: function () {
      var text = tr(this.state.importText);
      if (!text) { this.setState({ importError: 'Please paste some reference text first.', importParsed: null }); return; }
      try {
        var parsed = parseReferences(text);
        if (!parsed.length) {
          this.setState({ importError: 'No references detected. Check the format and try again.', importParsed: null });
        } else {
          this.setState({ importParsed: parsed, importError: '' });
        }
      } catch (e) {
        this.setState({ importError: 'Parse error: ' + (e.message || e), importParsed: null });
      }
    },

    handleConfirm: function () {
      var existing = this.getRefs();
      var start = existing.length;
      var toAdd = (this.state.importParsed || []).map(function (r, i) {
        return { id: 'ref-' + (start + i + 1), authors: r.authors || '', year: r.year || '', title: r.title || '', source: r.source || '', url: r.url || '' };
      });
      this.setRefs(existing.concat(toAdd));
      this.setState({ mode: 'list', importText: '', importParsed: null, importError: '' });
    },

    renderImport: function () {
      var self = this;
      var parsed = this.state.importParsed;
      var placeholder = 'APA:  Smith, J. (2024). Title of the paper. Journal, 10(2), 45–67.\n\nBibTeX:\n@article{key,\n  author  = {Smith, J.},\n  title   = {Paper Title},\n  year    = {2024},\n  journal = {Nature}\n}\n\nRIS:\nTY  - JOUR\nAU  - Smith, J.\nTI  - Paper Title\nPY  - 2024\nJO  - Nature\nER  -';

      return h('div', { style: S.wrap },
        h('div', { style: S.topBar },
          h('strong', { style: { fontSize: '14px' } }, 'Import References'),
          h('button', { style: S.btn, type: 'button', onClick: function () { self.setState({ mode: 'list', importText: '', importParsed: null, importError: '' }); } }, '← Back to list')
        ),
        h('p', { style: S.hint }, 'Paste references in APA, Harvard, Vancouver, BibTeX (.bib), or RIS format. One reference per line for plain text.'),
        h('textarea', {
          style: S.textarea,
          value: this.state.importText,
          placeholder: placeholder,
          onChange: function (e) { self.setState({ importText: e.target.value, importParsed: null, importError: '' }); },
        }),
        h('div', { style: { marginTop: '8px' } },
          h('button', { style: Object.assign({}, S.btn, S.btnPrimary), type: 'button', onClick: function () { self.handleParse(); } }, 'Parse References')
        ),
        this.state.importError ? h('p', { style: S.error }, '⚠ ' + this.state.importError) : null,
        parsed && parsed.length > 0
          ? h('div', null,
              h('div', { style: S.preview },
                h('p', { style: S.previewHdr }, '✓ ' + parsed.length + ' reference' + (parsed.length > 1 ? 's' : '') + ' found:'),
                parsed.map(function (r, i) {
                  return h('p', { key: i, style: S.previewLine },
                    (i + 1) + '. ' + [r.authors, r.year ? '(' + r.year + ')' : '', r.title].filter(Boolean).join(' '));
                })
              ),
              h('button', {
                style: Object.assign({}, S.btn, S.btnPrimary),
                type: 'button',
                onClick: function () { self.handleConfirm(); },
              }, 'Append ' + parsed.length + ' Reference' + (parsed.length !== 1 ? 's' : '') + ' to List')
            )
          : null
      );
    },

    renderList: function () {
      var self = this;
      var refs = this.getRefs();
      return h('div', { style: S.wrap },
        h('div', { style: S.topBar },
          h('span', { style: S.count }, refs.length + ' reference' + (refs.length !== 1 ? 's' : '')),
          h('button', { style: S.btn, type: 'button', onClick: function () { self.setState({ mode: 'import' }); } }, '↑ Import References')
        ),
        refs.length === 0
          ? h('p', { style: S.empty }, 'No references yet. Add one below or use Import References.')
          : refs.map(function (ref, idx) {
              var isOpen = !!self.state.expanded[idx];
              var lbl = [ref.authors, ref.year ? '(' + ref.year + ')' : '', ref.title].filter(Boolean).join(' ') || 'Reference ' + (idx + 1);
              return h('div', { key: idx, style: S.card },
                h('div', { style: S.cardHeader },
                  h('span', { style: S.cardTitle, onClick: function () { self.toggle(idx); } }, (isOpen ? '▾ ' : '▸ ') + lbl),
                  h('button', { style: S.btnRemove, type: 'button', onClick: function () { self.handleDelete(idx); } }, 'Remove')
                ),
                isOpen
                  ? h('div', { style: S.grid },
                      h('div', null,
                        h('label', { style: S.lbl }, 'ID'),
                        h('input', { style: S.input, value: ref.id || '', placeholder: 'ref-1', onChange: function (e) { self.handleField(idx, 'id', e.target.value); } })
                      ),
                      h('div', null,
                        h('label', { style: S.lbl }, 'Year'),
                        h('input', { style: S.input, value: ref.year || '', placeholder: '2024', onChange: function (e) { self.handleField(idx, 'year', e.target.value); } })
                      ),
                      h('div', { style: S.fullCol },
                        h('label', { style: S.lbl }, 'Authors'),
                        h('input', { style: S.input, value: ref.authors || '', placeholder: 'Smith, J., Jones, A.', onChange: function (e) { self.handleField(idx, 'authors', e.target.value); } })
                      ),
                      h('div', { style: S.fullCol },
                        h('label', { style: S.lbl }, 'Title'),
                        h('input', { style: S.input, value: ref.title || '', placeholder: 'Paper title', onChange: function (e) { self.handleField(idx, 'title', e.target.value); } })
                      ),
                      h('div', null,
                        h('label', { style: S.lbl }, 'Source / Journal'),
                        h('input', { style: S.input, value: ref.source || '', placeholder: 'Journal name', onChange: function (e) { self.handleField(idx, 'source', e.target.value); } })
                      ),
                      h('div', null,
                        h('label', { style: S.lbl }, 'URL (optional)'),
                        h('input', { style: S.input, value: ref.url || '', placeholder: 'https://...', onChange: function (e) { self.handleField(idx, 'url', e.target.value); } })
                      )
                    )
                  : null
              );
            }),
        h('button', { style: Object.assign({}, S.btn, { marginTop: '8px' }), type: 'button', onClick: function () { self.handleAdd(); } }, '+ Add Reference')
      );
    },

    render: function () {
      return this.state.mode === 'import' ? this.renderImport() : this.renderList();
    },
  });

  // ─── Preview ─────────────────────────────────────────────────────────────────

  var RefsPreview = function (props) {
    var refs = props.value;
    if (!refs) return null;
    if (typeof refs.toJS === 'function') refs = refs.toJS();
    if (!Array.isArray(refs) || !refs.length) return null;
    return h('ol', { style: { paddingLeft: '18px', fontSize: '13px', lineHeight: '1.6' } },
      refs.map(function (r, i) {
        return h('li', { key: i, style: { marginBottom: '5px' } },
          [r.authors, r.year ? '(' + r.year + ')' : '', r.title, r.source].filter(Boolean).join('. '));
      })
    );
  };

  // ─── Register ────────────────────────────────────────────────────────────────

  try {
    window.CMS.registerWidget('references-bulk', RefsControl, RefsPreview);
    window._refsWidgetLoaded = true;
    console.log('[RefsWidget] Registered successfully.');
  } catch (err) {
    console.error('[RefsWidget] Registration failed:', err);
  }

})();
