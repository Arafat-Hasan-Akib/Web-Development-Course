const SUBJECTS = [
    { name: 'বাংলা ১ম পত্র',   short: 'বাং-১', color: '#c0392b' },
    { name: 'বাংলা ২য় পত্র',   short: 'বাং-২', color: '#e74c3c' },
    { name: 'English 1st',      short: 'Eng-1', color: '#2980b9' },
    { name: 'English 2nd',      short: 'Eng-2', color: '#3498db' },
    { name: 'Accounting',       short: 'Acct',  color: '#8b6914' },
    { name: 'Finance',          short: 'Fin',   color: '#e67e22' },
    { name: 'Management',       short: 'Mgmt',  color: '#27ae60' },
    { name: 'Marketing',        short: 'Mktg',  color: '#16a085' },
    { name: 'ICT',              short: 'ICT',   color: '#8e44ad' },
  ];

  const DAYS_BN = ['রবি','সোম','মঙ্গল','বুধ','বৃহঃ','শুক্র','শনি'];
  const MONTHS_EN = ['January','February','March','April','May','June','July','August','September','October','November','December'];
  const STORAGE_KEY = 'akib_study_tracker_v3';

  let data = JSON.parse(localStorage.getItem(STORAGE_KEY) || '{}');
  const now = new Date();
  let viewYear = now.getFullYear();
  let viewMonth = now.getMonth();

  function save() { localStorage.setItem(STORAGE_KEY, JSON.stringify(data)); }

  function getKey(y, m, d) {
    return `${y}-${String(m+1).padStart(2,'0')}-${String(d).padStart(2,'0')}`;
  }

  function getDaysInMonth(y, m) { return new Date(y, m+1, 0).getDate(); }

  function buildOptions() {
    let o = '<option value="0">—</option>';
    for (let h = 0.5; h <= 10; h += 0.5) {
      o += `<option value="${h}">${h}h</option>`;
    }
    return o;
  }

  function getMonthTotals() {
    const totals = {};
    SUBJECTS.forEach(s => totals[s.name] = 0);
    const days = getDaysInMonth(viewYear, viewMonth);
    for (let d = 1; d <= days; d++) {
      const key = getKey(viewYear, viewMonth, d);
      if (data[key]) {
        SUBJECTS.forEach(s => {
          totals[s.name] += (data[key][s.name] || 0);
        });
      }
    }
    return totals;
  }

  function updateSummary() {
    const days = getDaysInMonth(viewYear, viewMonth);
    let totalHours = 0, studiedDays = 0;
    const totals = getMonthTotals();

    for (let d = 1; d <= days; d++) {
      const key = getKey(viewYear, viewMonth, d);
      if (data[key]) {
        const dayTotal = SUBJECTS.reduce((s, sub) => s + (data[key][sub.name] || 0), 0);
        if (dayTotal > 0) { totalHours += dayTotal; studiedDays++; }
      }
    }

    const avg = studiedDays > 0 ? (totalHours / studiedDays).toFixed(1) : 0;

    // Top subject
    let topName = '—', topVal = 0;
    SUBJECTS.forEach(s => {
      if (totals[s.name] > topVal) { topVal = totals[s.name]; topName = s.short; }
    });

    document.getElementById('totalHours').textContent = totalHours % 1 === 0 ? totalHours : totalHours.toFixed(1);
    document.getElementById('studiedDays').textContent = studiedDays;
    document.getElementById('avgHours').textContent = avg;
    document.getElementById('topSubject').textContent = topVal > 0 ? topName : '—';

    // Subject bars
    const maxVal = Math.max(...Object.values(totals), 1);
    const barsEl = document.getElementById('subjBars');
    barsEl.innerHTML = '';
    SUBJECTS.forEach(s => {
      const h = totals[s.name];
      const pct = Math.round((h / maxVal) * 100);
      const row = document.createElement('div');
      row.className = 'subj-row';
      row.innerHTML = `
        <div class="name">${s.name}</div>
        <div class="bar-wrap"><div class="bar-fill" style="width:${pct}%;background:${s.color}"></div></div>
        <div class="hr-val">${h > 0 ? (h % 1 === 0 ? h + 'h' : h + 'h') : '—'}</div>
      `;
      barsEl.appendChild(row);
    });
  }

  function renderGrid() {
    const grid = document.getElementById('dayGrid');
    grid.innerHTML = '';
    const days = getDaysInMonth(viewYear, viewMonth);
    const todayKey = getKey(now.getFullYear(), now.getMonth(), now.getDate());

    document.getElementById('monthTitle').textContent = `${MONTHS_EN[viewMonth]} ${viewYear}`;

    for (let d = 1; d <= days; d++) {
      const key = getKey(viewYear, viewMonth, d);
      const dayData = data[key] || {};
      const isToday = key === todayKey;
      const dayTotal = SUBJECTS.reduce((s, sub) => s + (dayData[sub.name] || 0), 0);
      const hasHours = dayTotal > 0;
      const dayName = DAYS_BN[new Date(viewYear, viewMonth, d).getDay()];

      const card = document.createElement('div');
      card.className = `day-card${isToday ? ' today' : ''}${hasHours ? ' has-hours' : ''}`;

      let subjHTML = '';
      SUBJECTS.forEach(s => {
        const val = dayData[s.name] || 0;
        subjHTML += `
          <div class="subj-item">
            <div class="subj-dot" style="background:${s.color}"></div>
            <label>${s.name}</label>
            <select data-key="${key}" data-subj="${s.name}">
              ${buildOptions()}
            </select>
          </div>`;
      });

      card.innerHTML = `
        <div class="day-header">
          <div class="date-num">${d}</div>
          <div class="day-name">${dayName}</div>
          ${hasHours ? `<div class="total-badge">${dayTotal % 1 === 0 ? dayTotal : dayTotal.toFixed(1)}h</div>` : ''}
        </div>
        <div class="subj-list">${subjHTML}</div>
      `;

      // Set select values
      card.querySelectorAll('select').forEach(sel => {
        const subj = sel.dataset.subj;
        sel.value = dayData[subj] || 0;
        sel.addEventListener('change', function () {
          const k = this.dataset.key;
          const s = this.dataset.subj;
          const v = parseFloat(this.value);
          if (!data[k]) data[k] = {};
          if (v > 0) data[k][s] = v;
          else delete data[k][s];
          if (Object.keys(data[k]).length === 0) delete data[k];
          save();
          renderGrid();
          updateSummary();
        });
      });

      grid.appendChild(card);
    }

    updateSummary();
  }

  document.getElementById('prevBtn').addEventListener('click', () => {
    viewMonth--; if (viewMonth < 0) { viewMonth = 11; viewYear--; }
    renderGrid();
  });

  document.getElementById('nextBtn').addEventListener('click', () => {
    viewMonth++; if (viewMonth > 11) { viewMonth = 0; viewYear++; }
    renderGrid();
  });

  renderGrid();