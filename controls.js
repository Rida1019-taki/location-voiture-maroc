'use strict';

/*
 * Custom select / date / time controls.
 * The native element stays in the DOM (visually hidden) and remains the single source of truth:
 * value, validation (required/min/max), form reset and input/change events all keep working,
 * so the rest of the app never needs to know these widgets exist.
 */
const Controls = (() => {
  const MONTHS = ['janvier', 'février', 'mars', 'avril', 'mai', 'juin', 'juillet', 'août', 'septembre', 'octobre', 'novembre', 'décembre'];
  const MONTHS_SHORT = ['janv.', 'févr.', 'mars', 'avr.', 'mai', 'juin', 'juil.', 'août', 'sept.', 'oct.', 'nov.', 'déc.'];
  const WEEKDAYS = ['lu', 'ma', 'me', 'je', 've', 'sa', 'di'];
  // Date pairs (end -> start) get a highlighted range and auto-open the end picker
  const PAIRS = { returnDate: 'pickupDate', bEndDate: 'bStartDate' };

  const pad = n => String(n).padStart(2, '0');
  const iso = d => `${d.getFullYear()}-${pad(d.getMonth() + 1)}-${pad(d.getDate())}`;
  const parse = s => { if (!s) return null; const [y, m, d] = s.split('-').map(Number); return new Date(y, m - 1, d); };
  const today = () => { const d = new Date(); return new Date(d.getFullYear(), d.getMonth(), d.getDate()); };
  const daysIn = (y, m) => new Date(y, m + 1, 0).getDate();
  const esc = s => String(s).replace(/[&<>"]/g, c => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;' })[c]);
  const norm = s => s.normalize('NFD').replace(/[\u0300-\u036f]/g, '').toLowerCase().trim();
  const fire = el => { el.dispatchEvent(new Event('input', { bubbles: true })); el.dispatchEvent(new Event('change', { bubbles: true })); };

  const registry = new Map();
  let uid = 0;
  let pop = null;
  let owner = null;

  /* ---------- Popover ---------- */
  function openPop(ctrl, build) {
    close();
    pop = document.createElement('div');
    pop.className = `pop pop-${ctrl.kind}`;
    document.body.appendChild(pop);
    owner = ctrl;
    ctrl.btn.setAttribute('aria-expanded', 'true');
    ctrl.box.classList.add('is-open');
    build(pop);
    place();
  }

  function place() {
    if (!pop) return;
    const r = owner.btn.getBoundingClientRect();
    const vw = document.documentElement.clientWidth, vh = window.innerHeight;
    if (r.bottom < 0 || r.top > vh) return close();
    if (owner.kind !== 'date') pop.style.minWidth = r.width + 'px';
    const w = pop.offsetWidth, h = pop.offsetHeight;
    const left = Math.max(8, Math.min(r.left, vw - w - 8));
    let top = r.bottom + 6;
    if (top + h > vh - 8 && r.top - h - 6 > 8) top = r.top - h - 6;
    pop.style.left = left + 'px';
    pop.style.top = Math.max(8, top) + 'px';
  }

  function close(refocus) {
    if (!pop) return;
    const o = owner;
    pop.remove();
    pop = null;
    owner = null;
    o.btn.setAttribute('aria-expanded', 'false');
    o.btn.removeAttribute('aria-activedescendant');
    o.box.classList.remove('is-open');
    if (refocus) o.btn.focus();
  }

  document.addEventListener('mousedown', e => {
    if (pop && !pop.contains(e.target) && !owner.box.contains(e.target)) close();
  });
  // Capture phase so Escape closes only the popover, never the modal underneath (whatever has focus)
  window.addEventListener('keydown', e => {
    if (e.key === 'Escape' && pop) { e.preventDefault(); e.stopPropagation(); close(true); }
  }, true);
  window.addEventListener('resize', () => close());
  window.addEventListener('scroll', e => { if (pop && e.target !== pop) place(); }, true);

  /* ---------- Shared wrapper ---------- */
  function labelText(el) {
    const l = (el.id && document.querySelector(`label[for="${el.id}"]`)) || el.closest('label');
    if (!l) return '';
    return [...l.childNodes].filter(n => n.nodeType === 3).map(n => n.textContent).join(' ').trim() || l.textContent.trim();
  }

  // Re-render the trigger whenever the native value changes, including programmatic `el.value = …`
  function watchValue(el, refresh) {
    const proto = Object.getPrototypeOf(el);
    ['value', 'selectedIndex'].forEach(prop => {
      const d = Object.getOwnPropertyDescriptor(proto, prop);
      if (!d || !d.set) return;
      Object.defineProperty(el, prop, {
        configurable: true,
        get() { return d.get.call(this); },
        set(v) { d.set.call(this, v); refresh(); }
      });
    });
    el.addEventListener('change', refresh);
    if (el.form) el.form.addEventListener('reset', () => setTimeout(refresh));
  }

  function wrap(el, kind) {
    const box = document.createElement('div');
    box.className = `cs cs-${kind}`;
    el.parentNode.insertBefore(box, el);
    box.appendChild(el);
    el.classList.add('cs-native');
    el.tabIndex = -1;
    el.setAttribute('aria-hidden', 'true');

    const btn = document.createElement('button');
    btn.type = 'button';
    btn.className = 'cs-btn';
    btn.setAttribute('aria-haspopup', kind === 'date' ? 'dialog' : 'listbox');
    btn.setAttribute('aria-expanded', 'false');
    box.appendChild(btn);

    const ctrl = { el, box, btn, kind, label: labelText(el), id: `cs${++uid}` };
    el.addEventListener('focus', () => btn.focus());
    // A click on the <label> is forwarded to the hidden native control: open ours instead
    el.addEventListener('click', e => { e.preventDefault(); if (owner !== ctrl) ctrl.open(); });
    if (el.id) registry.set(el.id, ctrl);
    return ctrl;
  }

  function setTrigger(ctrl, text, placeholder, icon) {
    ctrl.btn.innerHTML = `<span class="cs-val${placeholder ? ' ph' : ''}">${esc(text)}</span>${icon}`;
    ctrl.btn.setAttribute('aria-label', `${ctrl.label}${ctrl.label ? ' : ' : ''}${text}`);
  }

  /* ---------- List behaviour (select + time) ---------- */
  function listBehavior(ctrl, api) {
    let active = 0;
    let typed = '', typedAt = 0;
    const isOpen = () => owner === ctrl;

    const mark = scroll => {
      if (!isOpen()) return;
      [...pop.children].forEach((n, i) => n.classList.toggle('active', i === active));
      const a = pop.children[active];
      if (a) {
        ctrl.btn.setAttribute('aria-activedescendant', a.id);
        if (scroll) a.scrollIntoView({ block: 'nearest' });
      }
    };

    const render = () => {
      const sel = api.index();
      pop.innerHTML = api.items().map((it, i) =>
        `<div class="pop-opt${it.muted ? ' muted' : ''}" role="option" id="${ctrl.id}-${i}" data-i="${i}" aria-selected="${i === sel}">${esc(it.label)}</div>`).join('');
      mark(true);
    };

    const choose = i => { api.set(i); close(true); };

    ctrl.open = () => {
      active = Math.max(0, api.index());
      openPop(ctrl, p => {
        p.setAttribute('role', 'listbox');
        p.id = `${ctrl.id}-list`;
        ctrl.btn.setAttribute('aria-controls', p.id);
        p.addEventListener('mousedown', e => e.preventDefault());
        p.addEventListener('click', e => { const t = e.target.closest('[data-i]'); if (t) choose(+t.dataset.i); });
        p.addEventListener('mousemove', e => {
          const t = e.target.closest('[data-i]');
          if (t && +t.dataset.i !== active) { active = +t.dataset.i; mark(false); }
        });
        render();
      });
      mark(true);
    };
    ctrl.rerender = () => { if (isOpen()) render(); };

    ctrl.btn.addEventListener('click', () => (isOpen() ? close() : ctrl.open()));
    ctrl.btn.addEventListener('keydown', e => {
      const n = api.items().length;
      const open = isOpen();
      const move = to => { e.preventDefault(); if (!open) return ctrl.open(); active = Math.max(0, Math.min(n - 1, to)); mark(true); };
      switch (e.key) {
        case 'ArrowDown': return move(active + 1);
        case 'ArrowUp': return move(active - 1);
        case 'PageDown': return move(active + 6);
        case 'PageUp': return move(active - 6);
        case 'Home': return open && move(0);
        case 'End': return open && move(n - 1);
        case 'Enter': case ' ':
          if (open) { e.preventDefault(); choose(active); }
          return;
        case 'Escape':
          if (open) { e.preventDefault(); e.stopPropagation(); close(true); }
          return;
        case 'Tab':
          if (open) close();
          return;
      }
      // Type-ahead, like a native select
      if (e.key.length === 1 && !e.ctrlKey && !e.metaKey && !e.altKey) {
        const now = Date.now();
        typed = now - typedAt > 700 ? e.key : typed + e.key;
        typedAt = now;
        const q = norm(typed);
        const items = api.items();
        const from = open ? active : api.index();
        const order = [...items.keys()].map(i => (from + 1 + i) % n);
        const hit = (typed.length > 1 ? [...items.keys()] : order).find(i => norm(items[i].label).startsWith(q));
        if (hit === undefined) return;
        e.preventDefault();
        if (open) { active = hit; mark(true); } else api.set(hit);
      }
    });
  }

  /* ---------- Select ---------- */
  function enhanceSelect(el) {
    const ctrl = wrap(el, 'select');
    const refresh = () => {
      const o = el.options[el.selectedIndex];
      setTrigger(ctrl, o ? o.textContent : '', !o || o.value === '', '<span class="cs-ico cs-chev" aria-hidden="true"></span>');
      ctrl.rerender && ctrl.rerender();
    };
    listBehavior(ctrl, {
      items: () => [...el.options].map(o => ({ label: o.textContent, muted: o.value === '' })),
      index: () => el.selectedIndex,
      set: i => { if (el.selectedIndex !== i) { el.selectedIndex = i; fire(el); } }
    });
    watchValue(el, refresh);
    refresh();
  }

  /* ---------- Time ---------- */
  function enhanceTime(el) {
    const ctrl = wrap(el, 'time');
    const step = Math.max(15, Math.round((+el.step || 1800) / 60));
    const base = [];
    for (let m = 0; m < 24 * 60; m += step) base.push(`${pad(Math.floor(m / 60))}:${pad(m % 60)}`);
    const slots = () => (el.value && !base.includes(el.value) ? [...base, el.value].sort() : base);
    const refresh = () => {
      setTrigger(ctrl, el.value || '--:--', !el.value, '<i class="fa-regular fa-clock cs-ico" aria-hidden="true"></i>');
      ctrl.rerender && ctrl.rerender();
    };
    listBehavior(ctrl, {
      items: () => slots().map(s => ({ label: s })),
      index: () => slots().indexOf(el.value),
      set: i => { const v = slots()[i]; if (el.value !== v) { el.value = v; fire(el); } }
    });
    watchValue(el, refresh);
    refresh();
  }

  /* ---------- Date ---------- */
  function enhanceDate(el) {
    const ctrl = wrap(el, 'date');
    if (el.hasAttribute('data-past') && !el.max) el.max = iso(today());

    let mode = 'days';
    let view, cursor;

    const fmt = s => {
      const d = parse(s);
      const opts = { weekday: 'short', day: 'numeric', month: 'short' };
      if (d.getFullYear() !== new Date().getFullYear()) opts.year = 'numeric';
      return d.toLocaleDateString('fr-FR', opts);
    };
    const refresh = () => {
      setTrigger(ctrl, el.value ? fmt(el.value) : 'Choisir une date', !el.value, '<i class="fa-regular fa-calendar cs-ico" aria-hidden="true"></i>');
      if (owner === ctrl) render(false);
    };

    const bounds = () => ({ min: parse(el.min), max: parse(el.max) });
    const outOfRange = d => { const { min, max } = bounds(); return (min && d < min) || (max && d > max); };
    const clamp = d => { const { min, max } = bounds(); if (min && d < min) return min; if (max && d > max) return max; return d; };

    const rangeEnds = () => {
      const endId = PAIRS[el.id] ? el.id : Object.keys(PAIRS).find(k => PAIRS[k] === el.id);
      if (!endId) return null;
      const s = document.getElementById(PAIRS[endId]), e = document.getElementById(endId);
      return s && e ? { start: s.value, end: e.value } : null;
    };

    function render(focus) {
      const y = view.getFullYear(), m = view.getMonth();
      let title, body, label;

      if (mode === 'days') {
        title = `${MONTHS[m]} ${y}`;
        label = 'Choisir le mois et l\'année';
        const first = new Date(y, m, 1);
        const start = new Date(y, m, 1 - ((first.getDay() + 6) % 7));
        const t = iso(today()), sel = el.value, cur = iso(cursor);
        const range = rangeEnds();
        let cells = WEEKDAYS.map(w => `<span class="cal-wd" aria-hidden="true">${w}</span>`).join('');
        for (let i = 0; i < 42; i++) {
          const d = new Date(start.getFullYear(), start.getMonth(), start.getDate() + i);
          const k = iso(d);
          const cls = ['cal-day'];
          if (d.getMonth() !== m) cls.push('muted');
          if (k === t) cls.push('today');
          if (range && range.start && range.end && k > range.start && k < range.end) cls.push('in-range');
          if (range && (k === range.start || k === range.end) && range.start && range.end && range.start !== range.end) cls.push(k === range.start ? 'r-start' : 'r-end');
          if (k === sel) cls.push('sel');
          const dis = outOfRange(d);
          cells += `<button type="button" class="${cls.join(' ')}" data-d="${k}" tabindex="${k === cur ? 0 : -1}" ${dis ? 'disabled' : ''}
            aria-label="${d.toLocaleDateString('fr-FR', { weekday: 'long', day: 'numeric', month: 'long', year: 'numeric' })}" ${k === sel ? 'aria-pressed="true"' : ''}>${d.getDate()}</button>`;
        }
        body = `<div class="cal-grid" role="grid">${cells}</div>`;
      } else if (mode === 'months') {
        title = String(y);
        label = 'Choisir l\'année';
        const { min, max } = bounds();
        body = `<div class="cal-cells">${MONTHS_SHORT.map((n, i) => {
          const dis = (min && new Date(y, i + 1, 0) < min) || (max && new Date(y, i, 1) > max);
          return `<button type="button" data-m="${i}" class="${i === cursor.getMonth() && y === cursor.getFullYear() ? 'sel' : ''}" ${dis ? 'disabled' : ''}>${n}</button>`;
        }).join('')}</div>`;
      } else {
        const from = y - (y % 12);
        title = `${from} – ${from + 11}`;
        label = '';
        const { min, max } = bounds();
        body = `<div class="cal-cells">${Array.from({ length: 12 }, (_, i) => from + i).map(yr => {
          const dis = (min && yr < min.getFullYear()) || (max && yr > max.getFullYear());
          return `<button type="button" data-y="${yr}" class="${yr === cursor.getFullYear() ? 'sel' : ''}" ${dis ? 'disabled' : ''}>${yr}</button>`;
        }).join('')}</div>`;
      }

      const todayOk = !outOfRange(today()) && !el.hasAttribute('data-past');
      pop.innerHTML = `
        <div class="cal-head">
          <button type="button" class="cal-nav" data-nav="-1" aria-label="Précédent"><i class="fa-solid fa-chevron-left"></i></button>
          <button type="button" class="cal-title" data-title ${label ? `aria-label="${label}"` : 'disabled'}>${title}</button>
          <button type="button" class="cal-nav" data-nav="1" aria-label="Suivant"><i class="fa-solid fa-chevron-right"></i></button>
        </div>
        ${body}
        <div class="cal-foot">
          ${todayOk ? '<button type="button" data-today>Aujourd\'hui</button>' : '<span></span>'}
          <button type="button" data-close>Fermer</button>
        </div>`;

      if (focus) {
        const target = pop.querySelector('.cal-day[tabindex="0"]:not([disabled])') || pop.querySelector('.cal-cells .sel') || pop.querySelector('.cal-title');
        if (target) target.focus({ preventScroll: true });
      }
      place();
    }

    const shift = dir => {
      if (mode === 'days') {
        view = new Date(view.getFullYear(), view.getMonth() + dir, 1);
        cursor = clamp(new Date(view.getFullYear(), view.getMonth(), Math.min(cursor.getDate(), daysIn(view.getFullYear(), view.getMonth()))));
      } else {
        view = new Date(view.getFullYear() + dir * (mode === 'years' ? 12 : 1), view.getMonth(), 1);
      }
    };

    const choose = k => {
      el.value = k;
      fire(el);
      close(true);
      const next = Object.keys(PAIRS).find(endId => PAIRS[endId] === el.id);
      if (next && registry.has(next)) setTimeout(() => registry.get(next).open(), 0);
    };

    ctrl.open = () => {
      const offset = +el.dataset.viewOffset || 0;
      const fallback = offset ? new Date(today().getFullYear() + offset, today().getMonth(), 1) : today();
      cursor = clamp(parse(el.value) || fallback);
      view = new Date(cursor.getFullYear(), cursor.getMonth(), 1);
      mode = el.value || !offset ? 'days' : 'years';
      openPop(ctrl, p => {
        p.setAttribute('role', 'dialog');
        p.setAttribute('aria-label', ctrl.label || 'Calendrier');
        p.addEventListener('click', e => {
          const b = e.target.closest('button');
          if (!b || b.disabled) return;
          if (b.dataset.d) return choose(b.dataset.d);
          if (b.dataset.nav) { shift(+b.dataset.nav); return render(false); }
          if (b.hasAttribute('data-title')) { mode = mode === 'days' ? 'months' : 'years'; return render(true); }
          if (b.dataset.y) { view = new Date(+b.dataset.y, view.getMonth(), 1); cursor = new Date(+b.dataset.y, cursor.getMonth(), 1); mode = 'months'; return render(true); }
          if (b.dataset.m) { view = new Date(view.getFullYear(), +b.dataset.m, 1); cursor = clamp(new Date(view.getFullYear(), +b.dataset.m, Math.min(cursor.getDate(), daysIn(view.getFullYear(), +b.dataset.m)))); mode = 'days'; return render(true); }
          if (b.hasAttribute('data-today')) return choose(iso(today()));
          if (b.hasAttribute('data-close')) return close(true);
        });
        p.addEventListener('keydown', e => {
          if (e.key === 'Escape') { e.preventDefault(); e.stopPropagation(); return close(true); }
          if (e.key === 'Tab' && !p.contains(document.activeElement)) { return close(); }
          if (mode !== 'days' || !e.target.classList.contains('cal-day')) return;
          const moves = { ArrowLeft: -1, ArrowRight: 1, ArrowUp: -7, ArrowDown: 7 };
          let next = null;
          if (moves[e.key]) next = new Date(cursor.getFullYear(), cursor.getMonth(), cursor.getDate() + moves[e.key]);
          if (e.key === 'PageUp' || e.key === 'PageDown') {
            const dm = e.key === 'PageUp' ? -1 : 1;
            next = new Date(cursor.getFullYear(), cursor.getMonth() + dm, Math.min(cursor.getDate(), daysIn(cursor.getFullYear(), cursor.getMonth() + dm)));
          }
          if (e.key === 'Home') next = new Date(cursor.getFullYear(), cursor.getMonth(), cursor.getDate() - ((cursor.getDay() + 6) % 7));
          if (e.key === 'End') next = new Date(cursor.getFullYear(), cursor.getMonth(), cursor.getDate() + (6 - ((cursor.getDay() + 6) % 7)));
          if (!next) return;
          e.preventDefault();
          cursor = clamp(next);
          view = new Date(cursor.getFullYear(), cursor.getMonth(), 1);
          render(true);
        });
        render(true);
      });
    };

    ctrl.btn.addEventListener('click', () => (owner === ctrl ? close() : ctrl.open()));
    ctrl.btn.addEventListener('keydown', e => {
      if (e.key === 'ArrowDown' && owner !== ctrl) { e.preventDefault(); ctrl.open(); }
      if (e.key === 'Escape' && owner === ctrl) { e.preventDefault(); e.stopPropagation(); close(true); }
    });
    watchValue(el, refresh);
    refresh();
  }

  function enhance(root = document) {
    root.querySelectorAll('select:not(.cs-native)').forEach(enhanceSelect);
    root.querySelectorAll('input[type="date"]:not(.cs-native)').forEach(enhanceDate);
    root.querySelectorAll('input[type="time"]:not(.cs-native)').forEach(enhanceTime);
  }

  return { enhance, close };
})();
