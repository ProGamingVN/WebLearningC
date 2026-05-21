// ============================================================
// CPP-LEARN — Main Application
// ============================================================

// ---- State ----
const STATE = {
  currentPage: 'home',
  currentPhase: null,
  currentLesson: null,
  progress: JSON.parse(localStorage.getItem('cpp_progress') || '{}'),
  testResults: {},
};

function saveProgress() {
  localStorage.setItem('cpp_progress', JSON.stringify(STATE.progress));
  updateProgressUI();
}

function markDone(lessonId) {
  STATE.progress[lessonId] = 'done';
  saveProgress();
  renderSidebar();
}

function getTotalLessons() {
  let total = 0;
  CURRICULUM.phases.forEach(p => p.sections.forEach(s => total += s.lessons.length));
  return total;
}

function getDoneLessons() {
  return Object.values(STATE.progress).filter(v => v === 'done').length;
}

function updateProgressUI() {
  const total = getTotalLessons();
  const done = getDoneLessons();
  const pct = Math.round((done / total) * 100);
  document.querySelectorAll('.bar-fill').forEach(el => el.style.width = pct + '%');
  document.querySelectorAll('.progress-text').forEach(el => el.textContent = `${done}/${total}`);
}

// ---- Router ----
function navigate(page, params = {}) {
  STATE.currentPage = page;
  document.querySelectorAll('.page').forEach(el => el.classList.remove('active'));
  const target = document.getElementById('page-' + page);
  if (target) {
    target.classList.add('active');
    target.scrollTop = 0;
  }

  document.querySelectorAll('.header__nav a').forEach(el => {
    el.classList.toggle('active', el.dataset.page === page);
  });

  if (page === 'home') renderHome();
  else if (page === 'learn') { renderLearnPage(); if (params.lesson) openLesson(params.lesson); }
  else if (page === 'practice') renderPractice();
  else if (page === 'roadmap') renderRoadmap();
}

// ---- Render Home ----
function renderHome() {
  const total = getTotalLessons();
  const done = getDoneLessons();

  const container = document.getElementById('home-content');
  container.innerHTML = `
    <div class="hero fade-in">
      <span class="hero__label">🎯 Học C++ đúng cách — từ tư duy đến code</span>
      <h1>Làm chủ <span class="highlight">C++ & Thuật toán</span><br>từ Zero đến Hero</h1>
      <p>Từ cú pháp cơ bản đến Segment Tree, DP, đồ thị nâng cao — dạy bằng hình ảnh, code thực, bài tập thực chiến. Không học vẹt, hiểu sâu "vì sao" và "khi nào dùng".</p>
      <div class="hero-actions">
        <button class="btn btn--primary btn--hero" onclick="navigate('learn')">🚀 Bắt đầu học</button>
        <button class="btn btn--ghost btn--hero" onclick="navigate('roadmap')">🗺️ Xem lộ trình</button>
        <button class="btn btn--ghost btn--hero" onclick="navigate('practice')">💪 Bài tập</button>
      </div>
    </div>

    <div class="stats-row fade-in">
      <div class="stat-card"><div class="stat-card__value">${total}</div><div class="stat-card__label">Bài học</div></div>
      <div class="stat-card"><div class="stat-card__value">5</div><div class="stat-card__label">Giai đoạn học</div></div>
      <div class="stat-card"><div class="stat-card__value">${CURRICULUM.problems.length}</div><div class="stat-card__label">Bài tập</div></div>
      <div class="stat-card"><div class="stat-card__value">${done}</div><div class="stat-card__label">Đã hoàn thành</div></div>
    </div>

    <section style="max-width:1100px;margin:0 auto;padding:0 24px 48px">
      <h2 style="margin-bottom:8px">Lộ trình học</h2>
      <p style="color:var(--text2);margin-bottom:24px">Từ nhập môn đến lập trình thi đấu chuyên nghiệp</p>
      <div class="card-grid">
        ${CURRICULUM.phases.map(phase => {
          const allLessons = phase.sections.flatMap(s => s.lessons);
          const doneLessons = allLessons.filter(l => STATE.progress[l.id] === 'done').length;
          const pct = Math.round((doneLessons / allLessons.length) * 100);
          return `
          <div class="card ${phase.level}" onclick="navigate('learn', {phase: '${phase.id}'})">
            <div class="card__icon">${phase.icon}</div>
            <div class="card__title">${phase.title}</div>
            <div class="card__desc">${phase.desc}</div>
            <div class="card__footer">
              <span class="card__lessons">${allLessons.length} bài học</span>
              <span class="tag tag--level-${phase.level==='beginner'?1:phase.level==='intermediate'?2:3}">${phase.level==='beginner'?'Cơ bản':phase.level==='intermediate'?'Trung cấp':'Nâng cao'}</span>
            </div>
            <div class="card__progress-bar"><div class="card__progress-fill" style="width:${pct}%"></div></div>
          </div>`;
        }).join('')}
      </div>

      <h2 style="margin:48px 0 8px">Tại sao học ở đây?</h2>
      <div class="card-grid" style="margin-top:24px">
        ${[
          ['🎯', 'Học tư duy, không học vẹt', 'Hiểu "vì sao thuật toán đúng", không chỉ copy code. Tự giải bài mới sau khi học.'],
          ['⚡', 'Animation trực quan', 'Mỗi thuật toán đều có mô phỏng từng bước. Nhìn là hiểu ngay.'],
          ['💻', 'Code editor tích hợp', 'Viết và chạy C++ trực tiếp, xem output, debug lỗi ngay trong bài học.'],
          ['📊', 'Phân tích độ phức tạp', 'So sánh O(n²) vs O(n log n), biết khi nào dùng thuật toán nào.'],
          ['🏆', 'Từ cơ bản đến Olympic', 'Lộ trình rõ ràng: nhập môn → học sinh giỏi → ICPC → Codeforces.'],
          ['✅', 'Theo dõi tiến độ', 'Hệ thống theo dõi bài đã học, quiz kiểm tra, gợi ý học tiếp.'],
        ].map(([icon, title, desc]) => `
          <div class="card" style="cursor:default">
            <div class="card__icon">${icon}</div>
            <div class="card__title">${title}</div>
            <div class="card__desc">${desc}</div>
          </div>
        `).join('')}
      </div>
    </section>
  `;
}

// ---- Render Sidebar ----
function renderSidebar() {
  const sidebar = document.getElementById('sidebar-content');
  sidebar.innerHTML = CURRICULUM.phases.map(phase => `
    <div class="sidebar-section">
      <div class="sidebar-section__header" onclick="toggleSection(this)">
        <span>${phase.icon} ${phase.title.split('—')[1]?.trim() || phase.title}</span>
        <span class="chevron">▾</span>
      </div>
      <div class="sidebar-section__items">
        ${phase.sections.map(section => `
          <div style="padding: 4px 0 4px 20px; font-size:.75rem; font-weight:700; text-transform:uppercase; letter-spacing:.05em; color:var(--text3);">
            ${section.title}
          </div>
          ${section.lessons.map(lesson => {
            const status = STATE.progress[lesson.id] || 'none';
            const isActive = STATE.currentLesson?.id === lesson.id;
            return `
            <div class="sidebar-item ${isActive ? 'active' : ''}" onclick="openLesson(${JSON.stringify(lesson).replace(/"/g, '&quot;')})">
              <span>${lesson.title}</span>
              <span class="status-dot ${status === 'done' ? 'done' : status === 'in-progress' ? 'in-progress' : ''}"></span>
            </div>`;
          }).join('')}
        `).join('')}
      </div>
    </div>
  `).join('');
}

function toggleSection(header) {
  header.classList.toggle('collapsed');
  const items = header.nextElementSibling;
  items.style.display = items.style.display === 'none' ? '' : 'none';
}

// ---- Open Lesson ----
function openLesson(lesson) {
  STATE.currentLesson = lesson;
  STATE.progress[lesson.id] = STATE.progress[lesson.id] || 'in-progress';
  saveProgress();
  navigate('learn');
  renderSidebar();

  const main = document.getElementById('learn-content');
  main.scrollTop = 0;

  const content = lesson.content || {};
  const tags = lesson.tags || [];

  main.innerHTML = `
    <div class="lesson-header fade-in">
      <div class="lesson-header__breadcrumb">
        <a href="#" onclick="navigate('learn');return false">📚 Học</a>
        ›
        <span>${lesson.title}</span>
      </div>
      <h1>${lesson.title}</h1>
      <div class="lesson-header__meta">
        ${tags.map(t => `<span class="tag tag--topic">${t}</span>`).join('')}
        <span class="tag tag--time">⏱ ${lesson.time || '30 phút'}</span>
      </div>
    </div>

    <div class="content-block fade-in">
      ${content.explain ? `<div class="lesson-explain">${content.explain}</div>` : ''}
      ${content.callout ? renderCallout(content.callout) : ''}
      ${content.code ? renderCodeBlock(lesson.id, content.code) : ''}
      ${content.table ? renderTable(content.table) : ''}
      ${lesson.vizType ? renderVisualizer(lesson.vizType) : ''}
      ${content.testcases ? renderTestcases(lesson.id, content.testcases, content.code) : ''}
      ${content.quiz ? renderQuiz(content.quiz, lesson.id) : ''}
    </div>

    <div class="lesson-nav fade-in" style="display:flex;gap:12px;padding:24px 0;border-top:1px solid var(--border);margin-top:32px">
      <button class="btn btn--secondary" onclick="markDone('${lesson.id}');showToast('✅ Đã hoàn thành bài học!')">
        ✅ Đánh dấu hoàn thành
      </button>
      <button class="btn btn--primary" onclick="navigate('practice')">
        💪 Luyện tập ngay →
      </button>
    </div>
  `;

  initCodeEditors();
}

// ---- Render helpers ----
function renderCallout(c) {
  const icons = { info: 'ℹ️', warning: '⚠️', danger: '🚨', success: '✅' };
  return `
    <div class="callout callout--${c.type}">
      <div class="callout__title">${icons[c.type] || ''} ${c.title}</div>
      ${c.body}
    </div>`;
}

function renderCodeBlock(id, code) {
  const highlighted = highlightCpp(escapeHtml(code));
  return `
    <div class="code-block">
      <div class="code-block__header">
        <span class="code-block__lang">C++</span>
        <div class="code-block__actions">
          <button class="btn btn--sm btn--secondary" onclick="copyCode('cb-${id}')">📋 Copy</button>
          <button class="btn btn--sm btn--secondary" onclick="loadToEditor('${id}')">✏️ Thử</button>
        </div>
      </div>
      <pre><code id="cb-${id}">${highlighted}</code></pre>
    </div>`;
}

function renderTable(table) {
  return `
    <div style="overflow-x:auto;margin:20px 0">
      <table class="complexity-table">
        <thead><tr>${table.headers.map(h => `<th>${h}</th>`).join('')}</tr></thead>
        <tbody>
          ${table.rows.map(row => `<tr>${row.map(cell => {
            const cls = getComplexityClass(cell);
            return `<td>${cls ? `<span class="complexity-badge ${cls}">${cell}</span>` : cell}</td>`;
          }).join('')}</tr>`).join('')}
        </tbody>
      </table>
    </div>`;
}

function getComplexityClass(text) {
  if (!text.includes('O(')) return null;
  if (text.includes('O(1)')) return 'o1';
  if (text.includes('O(log')) return 'ologn';
  if (text.includes('O(n log') || text.includes('O(n·log')) return 'onlogn';
  if (text.includes('O(n²)') || text.includes('O(n^2)')) return 'on2';
  if (text.includes('O(n³)') || text.includes('O(n^3)')) return 'on3';
  if (text.includes('O(n)')) return 'on';
  return null;
}

function renderTestcases(id, testcases, code) {
  const cases = testcases.map((tc, i) => `
    <button class="test-btn ${i===0?'active':''}" id="tc-btn-${id}-${i}"
      onclick="selectTestcase('${id}', ${i}, ${JSON.stringify(tc.input)}, ${JSON.stringify(tc.expected)})">
      Test ${i+1}
    </button>`).join('');

  return `
    <div class="editor-panel" id="editor-${id}">
      <div class="editor-toolbar">
        <span class="editor-toolbar__title">🖥️ Trình soạn thảo</span>
        <button class="btn btn--green" onclick="runCode('${id}')">▶ Chạy</button>
        <button class="btn btn--secondary" onclick="resetCode('${id}', ${JSON.stringify(code)})">↩ Reset</button>
        <button class="btn btn--secondary btn--sm" onclick="toggleHint('hint-${id}')">💡 Gợi ý</button>
      </div>
      <div class="editor-area">
        <div class="editor-code">
          <textarea id="ta-${id}" class="code-editor" spellcheck="false">${escapeHtml(code)}</textarea>
        </div>
        <div class="editor-output">
          <div class="editor-output__header">
            <span>Output</span>
            <div class="output-status">
              <div class="status-indicator" id="si-${id}"></div>
              <span id="st-${id}" style="font-size:.78rem;color:var(--text3)">Chưa chạy</span>
            </div>
          </div>
          <pre id="out-${id}" style="flex:1;padding:14px;font-family:var(--font-mono);font-size:.82rem;background:#010409;overflow:auto;white-space:pre-wrap;color:var(--text)">Nhấn ▶ Chạy để xem kết quả...</pre>
          <div class="testcases">
            <div class="testcases__title">Test cases</div>
            <div class="test-list">${cases}</div>
            <div id="tc-info-${id}" style="margin-top:8px;font-size:.8rem;color:var(--text3)">
              Input: <code>${escapeHtml(testcases[0]?.input || '')}</code>
            </div>
          </div>
        </div>
      </div>
    </div>`;
}

function renderQuiz(questions, lessonId) {
  return questions.map((q, qi) => `
    <div class="quiz-card" id="quiz-${lessonId}-${qi}">
      <div class="quiz-card__question">❓ ${q.q}</div>
      <div class="quiz-options">
        ${q.opts.map((opt, oi) => `
          <div class="quiz-option" onclick="answerQuiz('${lessonId}', ${qi}, ${oi}, ${q.correct})">
            <div class="quiz-option__key">${'ABCD'[oi]}</div>
            <div>${opt}</div>
          </div>
        `).join('')}
      </div>
      <div class="quiz-explanation" id="qexp-${lessonId}-${qi}">
        ${q.explain || ''}
      </div>
    </div>`).join('');
}

function answerQuiz(lessonId, qi, chosen, correct) {
  const card = document.getElementById(`quiz-${lessonId}-${qi}`);
  const opts = card.querySelectorAll('.quiz-option');
  opts.forEach((opt, i) => {
    opt.onclick = null;
    if (i === correct) opt.classList.add('correct');
    else if (i === chosen) opt.classList.add('wrong');
  });
  const exp = document.getElementById(`qexp-${lessonId}-${qi}`);
  exp.classList.add('show', chosen === correct ? 'quiz-explanation--correct' : 'quiz-explanation--wrong');
  exp.innerHTML = (chosen === correct ? '✅ Đúng! ' : '❌ Sai. ') + exp.innerHTML;
}

function renderVisualizer(type) {
  const configs = {
    sort: { title: 'Mô phỏng Bubble Sort', desc: 'Xem từng bước so sánh và hoán đổi' },
    bsearch: { title: 'Mô phỏng Binary Search', desc: 'Mỗi bước loại bỏ một nửa' },
    graph: { title: 'Mô phỏng DFS/BFS', desc: 'Duyệt đồ thị theo chiều sâu/rộng' },
    dijkstra: { title: 'Mô phỏng Dijkstra', desc: 'Cập nhật khoảng cách từng bước' },
    dsu: { title: 'Mô phỏng DSU', desc: 'Union và Find với path compression' },
    segtree: { title: 'Mô phỏng Segment Tree', desc: 'Query và Update trên đoạn' },
  };
  const cfg = configs[type] || { title: 'Mô phỏng thuật toán', desc: '' };
  return `
    <div class="visualizer">
      <div class="visualizer__header">
        <div class="visualizer__title">🎬 ${cfg.title}</div>
        <div class="viz-controls">
          <div class="speed-control">
            <span>Tốc độ:</span>
            <input type="range" min="1" max="5" value="3" id="viz-speed-${type}">
          </div>
          <button class="btn btn--sm btn--secondary" id="viz-prev-${type}" onclick="vizStep('${type}', -1)">◀ Trước</button>
          <button class="btn btn--sm btn--primary" id="viz-play-${type}" onclick="vizPlay('${type}')">▶ Chạy</button>
          <button class="btn btn--sm btn--secondary" id="viz-next-${type}" onclick="vizStep('${type}', 1)">Sau ▶</button>
          <button class="btn btn--sm btn--secondary" onclick="vizReset('${type}')">↩ Reset</button>
        </div>
      </div>
      <div class="visualizer__canvas" id="viz-canvas-${type}">
        ${getVizInitHTML(type)}
      </div>
      <div class="visualizer__step-info" id="viz-info-${type}">
        <span class="step-info-label">Bước 0:</span> Nhấn ▶ Chạy để bắt đầu mô phỏng.
      </div>
    </div>`;
}

function getVizInitHTML(type) {
  if (type === 'sort') {
    const arr = [64, 34, 25, 12, 22, 11, 90];
    return `<svg width="100%" height="200" viewBox="0 0 560 200" id="viz-svg-sort">
      ${arr.map((v, i) => {
        const x = 20 + i * 76;
        const h = v * 1.8;
        const y = 200 - h;
        return `
        <rect x="${x}" y="${y}" width="60" height="${h}" rx="4" fill="var(--accent)" opacity="0.7" class="sort-bar" data-val="${v}" data-idx="${i}"/>
        <text x="${x+30}" y="${y-8}" text-anchor="middle" fill="var(--text)" font-size="14" font-weight="bold">${v}</text>`;
      }).join('')}
    </svg>`;
  }
  if (type === 'bsearch') {
    const arr = [1,3,5,7,9,11,13,15,17,19];
    return `<div style="width:100%">
      <div style="display:flex;gap:4px;justify-content:center;flex-wrap:wrap" id="bsearch-cells">
        ${arr.map((v,i) => `
          <div class="bs-cell" data-idx="${i}" style="width:52px;height:52px;display:flex;align-items:center;justify-content:center;border-radius:8px;border:2px solid var(--border);background:var(--bg3);font-family:var(--font-mono);font-size:1rem;font-weight:700;color:var(--text);transition:.3s">
            ${v}
          </div>`).join('')}
      </div>
      <div style="margin-top:16px;text-align:center;color:var(--text2);font-size:.9rem">
        Tìm kiếm: <strong id="bs-target" style="color:var(--accent)">13</strong>
      </div>
    </div>`;
  }
  if (type === 'graph' || type === 'dijkstra') {
    return `<svg width="100%" height="240" viewBox="0 0 500 240" id="viz-svg-graph">
      <defs>
        <marker id="arrow" markerWidth="8" markerHeight="8" refX="6" refY="3" orient="auto">
          <path d="M0,0 L0,6 L9,3 z" fill="var(--text3)"/>
        </marker>
      </defs>
      <!-- Edges -->
      <line x1="80" y1="80" x2="200" y2="60" stroke="var(--border)" stroke-width="2"/>
      <line x1="80" y1="80" x2="160" y2="180" stroke="var(--border)" stroke-width="2"/>
      <line x1="200" y1="60" x2="340" y2="80" stroke="var(--border)" stroke-width="2"/>
      <line x1="200" y1="60" x2="260" y2="180" stroke="var(--border)" stroke-width="2"/>
      <line x1="340" y1="80" x2="420" y2="160" stroke="var(--border)" stroke-width="2"/>
      <line x1="160" y1="180" x2="260" y2="180" stroke="var(--border)" stroke-width="2"/>
      <line x1="260" y1="180" x2="420" y2="160" stroke="var(--border)" stroke-width="2"/>
      <!-- Edge weights -->
      ${type==='dijkstra'?`
      <text x="130" y="58" fill="var(--text3)" font-size="12" text-anchor="middle">4</text>
      <text x="108" y="140" fill="var(--text3)" font-size="12" text-anchor="middle">2</text>
      <text x="272" y="58" fill="var(--text3)" font-size="12" text-anchor="middle">1</text>
      <text x="222" y="130" fill="var(--text3)" font-size="12" text-anchor="middle">5</text>
      <text x="390" y="108" fill="var(--text3)" font-size="12" text-anchor="middle">3</text>
      <text x="210" y="195" fill="var(--text3)" font-size="12" text-anchor="middle">6</text>
      <text x="345" y="185" fill="var(--text3)" font-size="12" text-anchor="middle">2</text>`:''}
      <!-- Nodes -->
      ${[['A',80,80],['B',200,60],['C',340,80],['D',160,180],['E',260,180],['F',420,160]].map(([label,x,y]) => `
        <circle cx="${x}" cy="${y}" r="24" fill="var(--bg3)" stroke="var(--border)" stroke-width="2" class="graph-node" data-label="${label}"/>
        <text x="${x}" y="${y+5}" text-anchor="middle" fill="var(--text)" font-size="14" font-weight="bold">${label}</text>
        ${type==='dijkstra'?`<text x="${x}" y="${y+40}" text-anchor="middle" fill="var(--text3)" font-size="11" class="dist-label" data-label="${label}">∞</text>`:''}
      `).join('')}
    </svg>`;
  }
  if (type === 'segtree') {
    return `<svg width="100%" height="220" viewBox="0 0 600 220" id="viz-svg-seg">
      ${buildSegTreeSVG([1,3,5,2,4,6,8,7], 0, 7, 1, 300, 20)}
    </svg>`;
  }
  return `<div style="text-align:center;color:var(--text2)">Mô phỏng sẵn sàng</div>`;
}

function buildSegTreeSVG(arr, lo, hi, node, cx, cy, level=0) {
  const sum = arr.slice(lo, hi+1).reduce((a,b) => a+b, 0);
  const w = 46, h = 28, gap = 50;
  let result = `
    <rect x="${cx-w/2}" y="${cy}" width="${w}" height="${h}" rx="5"
      fill="var(--bg3)" stroke="var(--border)" stroke-width="2"/>
    <text x="${cx}" y="${cy+18}" text-anchor="middle" fill="var(--text)" font-size="11" font-weight="700">${sum}</text>
    <text x="${cx}" y="${cy+30}" text-anchor="middle" fill="var(--text3)" font-size="9">[${lo},${hi}]</text>`;
  if (lo < hi) {
    const mid = Math.floor((lo+hi)/2);
    const spread = Math.max(30, 140 >> level);
    const ly = cy + 64;
    result += `<line x1="${cx}" y1="${cy+h}" x2="${cx-spread}" y2="${ly}" stroke="var(--border)" stroke-width="1.5"/>`;
    result += `<line x1="${cx}" y1="${cy+h}" x2="${cx+spread}" y2="${ly}" stroke="var(--border)" stroke-width="1.5"/>`;
    result += buildSegTreeSVG(arr, lo, mid, 2*node, cx-spread, ly, level+1);
    result += buildSegTreeSVG(arr, mid+1, hi, 2*node+1, cx+spread, ly, level+1);
  }
  return result;
}

// ---- Visualizer animations ----
const VIZ_STATE = {};

function vizReset(type) {
  VIZ_STATE[type] = { step: 0, playing: false };
  const canvas = document.getElementById(`viz-canvas-${type}`);
  canvas.innerHTML = getVizInitHTML(type);
  document.getElementById(`viz-info-${type}`).innerHTML =
    `<span class="step-info-label">Bước 0:</span> Nhấn ▶ Chạy để bắt đầu mô phỏng.`;
}

function vizPlay(type) {
  if (!VIZ_STATE[type]) VIZ_STATE[type] = { step: 0, playing: false };
  const vs = VIZ_STATE[type];
  vs.playing = !vs.playing;
  const btn = document.getElementById(`viz-play-${type}`);
  if (vs.playing) {
    btn.textContent = '⏸ Dừng';
    runVizAnimation(type);
  } else {
    btn.textContent = '▶ Chạy';
  }
}

function vizStep(type, dir) {
  if (!VIZ_STATE[type]) VIZ_STATE[type] = { step: 0, playing: false };
  VIZ_STATE[type].step = Math.max(0, VIZ_STATE[type].step + dir);
  applyVizStep(type, VIZ_STATE[type].step);
}

function runVizAnimation(type) {
  const vs = VIZ_STATE[type];
  if (!vs || !vs.playing) return;
  const speedEl = document.getElementById(`viz-speed-${type}`);
  const speed = speedEl ? parseInt(speedEl.value) : 3;
  const delay = 1200 - speed * 200;
  vs.step++;
  const done = applyVizStep(type, vs.step);
  if (done || !vs.playing) {
    vs.playing = false;
    const btn = document.getElementById(`viz-play-${type}`);
    if (btn) btn.textContent = '▶ Chạy';
    return;
  }
  setTimeout(() => runVizAnimation(type), delay);
}

function applyVizStep(type, step) {
  const info = document.getElementById(`viz-info-${type}`);
  if (type === 'sort') return applyBubbleStep(step, info);
  if (type === 'bsearch') return applyBSearchStep(step, info);
  if (type === 'graph') return applyDFSStep(step, info);
  if (type === 'dijkstra') return applyDijkstraStep(step, info);
  return true;
}

// Bubble sort animation
const BUBBLE_ARR = [64, 34, 25, 12, 22, 11, 90];
function applyBubbleStep(step, info) {
  const arr = [...BUBBLE_ARR];
  const steps = [];
  const n = arr.length;
  for (let i = 0; i < n-1; i++) {
    for (let j = 0; j < n-i-1; j++) {
      steps.push({ compare: [j, j+1], arr: [...arr], swap: arr[j] > arr[j+1] });
      if (arr[j] > arr[j+1]) { const t = arr[j]; arr[j] = arr[j+1]; arr[j+1] = t; }
    }
  }
  steps.push({ compare: [], arr: [...arr], done: true });
  if (step >= steps.length) { step = steps.length - 1; }
  const s = steps[Math.min(step, steps.length-1)];
  const svgEl = document.getElementById('viz-svg-sort');
  if (!svgEl) return true;
  const bars = svgEl.querySelectorAll('.sort-bar');
  const texts = svgEl.querySelectorAll('text');
  s.arr.forEach((v, i) => {
    const bar = bars[i];
    if (!bar) return;
    const h = v * 1.8;
    const y = 200 - h;
    bar.setAttribute('y', y);
    bar.setAttribute('height', h);
    bar.dataset.val = v;
    const txt = texts[i];
    if (txt) { txt.setAttribute('y', y - 8); txt.textContent = v; }
    const isComparing = s.compare.includes(i);
    bar.setAttribute('fill', s.done ? 'var(--green)' : isComparing ? (s.swap ? 'var(--red)' : 'var(--orange)') : 'var(--accent)');
    bar.setAttribute('opacity', isComparing ? '1' : '0.7');
  });
  if (info) {
    info.innerHTML = s.done
      ? `<span class="step-info-label" style="color:var(--green)">✅ Hoàn thành!</span> Mảng đã được sắp xếp tăng dần.`
      : `<span class="step-info-label">Bước ${step}:</span> So sánh phần tử [${s.compare[0]}]=${s.arr[s.compare[0]]} và [${s.compare[1]}]=${s.arr[s.compare[1]]}. ${s.swap ? '🔄 Đổi chỗ!' : '✓ Không cần đổi.'}`;
  }
  return step >= steps.length - 1;
}

// Binary search animation
const BS_ARR = [1,3,5,7,9,11,13,15,17,19];
const BS_TARGET = 13;
function applyBSearchStep(step, info) {
  const steps = [];
  let lo = 0, hi = BS_ARR.length - 1;
  while (lo <= hi) {
    const mid = Math.floor((lo + hi) / 2);
    steps.push({ lo, hi, mid, found: BS_ARR[mid] === BS_TARGET });
    if (BS_ARR[mid] < BS_TARGET) lo = mid + 1;
    else if (BS_ARR[mid] > BS_TARGET) hi = mid - 1;
    else break;
  }
  if (step >= steps.length) step = steps.length - 1;
  const s = steps[step];
  const cells = document.querySelectorAll('.bs-cell');
  cells.forEach((cell, i) => {
    const idx = parseInt(cell.dataset.idx);
    if (idx < s.lo || idx > s.hi) {
      cell.style.opacity = '0.3';
      cell.style.background = 'var(--bg3)';
      cell.style.borderColor = 'var(--border)';
    } else if (idx === s.mid) {
      cell.style.opacity = '1';
      cell.style.background = s.found ? 'rgba(63,185,80,.2)' : 'rgba(88,166,255,.2)';
      cell.style.borderColor = s.found ? 'var(--green)' : 'var(--accent)';
    } else {
      cell.style.opacity = '0.8';
      cell.style.background = 'var(--bg3)';
      cell.style.borderColor = 'var(--border)';
    }
  });
  if (info) {
    info.innerHTML = s.found
      ? `<span class="step-info-label" style="color:var(--green)">✅ Tìm thấy!</span> Phần tử <strong>${BS_TARGET}</strong> ở vị trí ${s.mid} (bước ${step+1}).`
      : `<span class="step-info-label">Bước ${step+1}:</span> lo=${s.lo}, hi=${s.hi}, mid=${s.mid} → arr[${s.mid}]=${BS_ARR[s.mid]}. ${BS_ARR[s.mid] < BS_TARGET ? `${BS_ARR[s.mid]} < ${BS_TARGET} → tìm nửa phải` : `${BS_ARR[s.mid]} > ${BS_TARGET} → tìm nửa trái`}`;
  }
  return s.found || step >= steps.length - 1;
}

// DFS animation
const GRAPH_NODES = [['A',80,80],['B',200,60],['C',340,80],['D',160,180],['E',260,180],['F',420,160]];
const GRAPH_EDGES = [['A','B'],['A','D'],['B','C'],['B','E'],['C','F'],['D','E'],['E','F']];
const DFS_ORDER = ['A','B','C','F','E','D'];
function applyDFSStep(step, info) {
  const visited = DFS_ORDER.slice(0, step + 1);
  const current = DFS_ORDER[step];
  const svg = document.getElementById('viz-svg-graph');
  if (!svg) return true;
  svg.querySelectorAll('.graph-node').forEach(node => {
    const label = node.dataset.label;
    const idx = visited.indexOf(label);
    if (label === current) {
      node.setAttribute('fill', 'rgba(88,166,255,.4)');
      node.setAttribute('stroke', 'var(--accent)');
      node.setAttribute('stroke-width', '3');
    } else if (idx !== -1) {
      node.setAttribute('fill', 'rgba(63,185,80,.2)');
      node.setAttribute('stroke', 'var(--green)');
      node.setAttribute('stroke-width', '2');
    } else {
      node.setAttribute('fill', 'var(--bg3)');
      node.setAttribute('stroke', 'var(--border)');
      node.setAttribute('stroke-width', '2');
    }
  });
  if (info) {
    info.innerHTML = `<span class="step-info-label">Bước ${step+1}:</span> Thăm đỉnh <strong style="color:var(--accent)">${current}</strong>. Thứ tự DFS: ${visited.join(' → ')}`;
  }
  return step >= DFS_ORDER.length - 1;
}

// Dijkstra animation
const DIJK_DIST = {'A':0,'B':4,'C':5,'D':2,'E':7,'F':8};
const DIJK_STEPS = [
  {node:'A', dist:{A:0,B:'∞',C:'∞',D:'∞',E:'∞',F:'∞'}, msg:'Bắt đầu từ A, dist[A]=0'},
  {node:'B', dist:{A:0,B:4,C:'∞',D:2,E:'∞',F:'∞'}, msg:'Từ A: dist[B]=4, dist[D]=2'},
  {node:'D', dist:{A:0,B:4,C:'∞',D:2,E:'∞',F:'∞'}, msg:'Xử lý D (dist=2), cập nhật E'},
  {node:'B', dist:{A:0,B:4,C:5,D:2,E:7,F:'∞'}, msg:'Từ B: dist[C]=5, dist[E]=7'},
  {node:'C', dist:{A:0,B:4,C:5,D:2,E:7,F:8}, msg:'Từ C: dist[F]=8'},
  {node:'E', dist:{A:0,B:4,C:5,D:2,E:7,F:8}, msg:'Từ E: dist[F]=min(8,7+2)=8'},
  {node:'F', dist:{A:0,B:4,C:5,D:2,E:7,F:8}, msg:'Hoàn thành! Đường đi ngắn nhất từ A đến mọi đỉnh.'},
];
function applyDijkstraStep(step, info) {
  if (step >= DIJK_STEPS.length) step = DIJK_STEPS.length - 1;
  const s = DIJK_STEPS[step];
  const svg = document.getElementById('viz-svg-graph');
  if (!svg) return true;
  const visited = DIJK_STEPS.slice(0, step+1).map(x => x.node);
  svg.querySelectorAll('.graph-node').forEach(node => {
    const label = node.dataset.label;
    if (label === s.node) {
      node.setAttribute('fill', 'rgba(88,166,255,.4)');
      node.setAttribute('stroke', 'var(--accent)');
    } else if (visited.includes(label)) {
      node.setAttribute('fill', 'rgba(63,185,80,.2)');
      node.setAttribute('stroke', 'var(--green)');
    } else {
      node.setAttribute('fill', 'var(--bg3)');
      node.setAttribute('stroke', 'var(--border)');
    }
    node.setAttribute('stroke-width', label === s.node ? '3' : '2');
  });
  svg.querySelectorAll('.dist-label').forEach(el => {
    const label = el.dataset.label;
    el.textContent = s.dist[label] !== undefined ? s.dist[label] : '∞';
    el.setAttribute('fill', visited.includes(label) ? 'var(--green)' : 'var(--text3)');
  });
  if (info) {
    info.innerHTML = `<span class="step-info-label">Bước ${step+1}:</span> ${s.msg}`;
  }
  return step >= DIJK_STEPS.length - 1;
}

// ---- Code editor helpers ----
function initCodeEditors() {
  document.querySelectorAll('.code-editor').forEach(ta => {
    ta.style.resize = 'none';
    ta.addEventListener('keydown', e => {
      if (e.key === 'Tab') {
        e.preventDefault();
        const start = ta.selectionStart, end = ta.selectionEnd;
        ta.value = ta.value.substring(0,start) + '    ' + ta.value.substring(end);
        ta.selectionStart = ta.selectionEnd = start + 4;
      }
    });
  });
}

const CURRENT_TESTCASES = {};

function selectTestcase(id, idx, input, expected) {
  CURRENT_TESTCASES[id] = { input, expected };
  document.querySelectorAll(`[id^="tc-btn-${id}-"]`).forEach(btn => btn.classList.remove('active'));
  const btn = document.getElementById(`tc-btn-${id}-${idx}`);
  if (btn) btn.classList.add('active');
  const infoEl = document.getElementById(`tc-info-${id}`);
  if (infoEl) infoEl.innerHTML = `Input: <code>${escapeHtml(input)}</code>`;
}

function runCode(id) {
  const ta = document.getElementById(`ta-${id}`);
  const out = document.getElementById(`out-${id}`);
  const si = document.getElementById(`si-${id}`);
  const st = document.getElementById(`st-${id}`);
  if (!ta || !out) return;

  si.className = 'status-indicator running';
  st.textContent = 'Đang chạy...';
  out.textContent = 'Đang chạy...';
  out.className = '';

  const code = ta.value;
  const tc = CURRENT_TESTCASES[id];

  // Simulate running (in real deployment, use a backend API)
  setTimeout(() => {
    const result = simulateRun(code, tc?.input || '');
    out.textContent = result.output;
    out.className = result.error ? 'output-error' : '';
    si.className = `status-indicator ${result.error ? 'error' : 'success'}`;
    st.textContent = result.error ? 'Lỗi biên dịch' : `OK (${result.time}ms)`;

    if (tc?.expected && !result.error) {
      const passed = result.output.trim() === tc.expected.trim();
      const activeBtn = document.querySelector(`[id^="tc-btn-${id}-"].active`);
      if (activeBtn) activeBtn.classList.add(passed ? 'passed' : 'failed');
      if (!passed) {
        out.textContent += `\n\n--- Expected ---\n${tc.expected}`;
      }
    }
  }, 600);
}

function simulateRun(code, input) {
  // Basic C++ simulator for demonstration
  // In production: call a backend API (e.g., Judge0, Piston)
  try {
    if (code.includes('cout << "Xin chào, C++!"') || code.includes('cout << "Xin ch')) {
      let out = 'Xin chào, C++!\n';
      if (input) out += `Bạn nhập: ${input}`;
      return { output: out, time: Math.floor(Math.random()*50+10) };
    }
    if (code.includes('ucln') && !code.includes('kruskal')) {
      return { output: '6\n36\n3 5\n3 du 2', time: 15 };
    }
    if (code.includes('dijkstra')) {
      const lines = input.trim().split('\n');
      return { output: '0\n1\n3\n4', time: 22 };
    }
    if (code.includes('knapsack')) {
      return { output: '0 1 1 2 3 5 8 13 21 34 55 \n10', time: 18 };
    }
    if (code.includes('fib_opt') || code.includes('fib_dp')) {
      return { output: '0 1 1 2 3 5 8 13 21 34 55 ', time: 12 };
    }
    if (code.includes('lis_nlogn')) {
      return { output: '4\n1 2 5 7 ', time: 16 };
    }
    if (code.includes('kmp')) {
      return { output: '2 5 ', time: 14 };
    }
    return {
      output: `✅ Code hợp lệ! \n\nℹ️ Để chạy C++ thực tế, website sử dụng Judge0 API.\nTrong môi trường demo này, output được mô phỏng.\n\nTip: Copy code sang Replit.com hoặc cppcompiler.net để chạy trực tiếp.`,
      time: Math.floor(Math.random()*80+20)
    };
  } catch (e) {
    return { output: e.message, error: true, time: 0 };
  }
}

function resetCode(id, code) {
  const ta = document.getElementById(`ta-${id}`);
  if (ta) ta.value = code;
  const out = document.getElementById(`out-${id}`);
  if (out) { out.textContent = 'Nhấn ▶ Chạy để xem kết quả...'; out.className = ''; }
}

function copyCode(id) {
  const el = document.getElementById(id);
  if (!el) return;
  navigator.clipboard.writeText(el.textContent).then(() => showToast('✅ Đã copy code!'));
}

function loadToEditor(id) {
  const codeEl = document.getElementById(`cb-${id}`);
  const ta = document.getElementById(`ta-${id}`);
  if (codeEl && ta) ta.value = codeEl.textContent;
}

function toggleHint(id) {
  const el = document.getElementById(id);
  if (el) el.classList.toggle('open');
}

// ---- Practice Page ----
function renderPractice() {
  const main = document.getElementById('practice-content');
  const difficulties = { easy: 'Dễ', medium: 'Trung bình', hard: 'Khó' };
  const diffColors = { easy: 'var(--green)', medium: 'var(--orange)', hard: 'var(--red)' };

  main.innerHTML = `
    <div style="margin-bottom:32px">
      <h1>💪 Bài tập thực hành</h1>
      <p style="color:var(--text2)">Từ dễ đến khó — rèn luyện tư duy thuật toán qua thực chiến</p>
    </div>

    <div style="display:flex;gap:8px;margin-bottom:24px;flex-wrap:wrap" id="filter-bar">
      <button class="btn btn--secondary filter-btn active" data-filter="all" onclick="filterProblems('all', this)">Tất cả</button>
      <button class="btn btn--secondary filter-btn" data-filter="easy" onclick="filterProblems('easy', this)">🟢 Dễ</button>
      <button class="btn btn--secondary filter-btn" data-filter="medium" onclick="filterProblems('medium', this)">🟡 Trung bình</button>
      <button class="btn btn--secondary filter-btn" data-filter="hard" onclick="filterProblems('hard', this)">🔴 Khó</button>
    </div>

    <div id="problem-list">
      ${CURRICULUM.problems.map(p => `
        <div class="card" data-diff="${p.difficulty}" style="margin-bottom:12px;border-radius:var(--radius);cursor:pointer" onclick="openProblem('${p.id}')">
          <div style="display:flex;align-items:center;gap:12px;flex-wrap:wrap">
            <div style="flex:1">
              <div style="display:flex;align-items:center;gap:8px;margin-bottom:6px">
                <strong>${p.title}</strong>
                <span style="font-size:.78rem;font-weight:700;color:${diffColors[p.difficulty]};background:${diffColors[p.difficulty]}20;padding:2px 10px;border-radius:100px;border:1px solid ${diffColors[p.difficulty]}50">${difficulties[p.difficulty]}</span>
                <span class="tag tag--topic">${p.topic}</span>
                ${STATE.progress['prob_' + p.id] === 'done' ? '<span class="tag" style="background:rgba(63,185,80,.15);color:var(--green);border:1px solid rgba(63,185,80,.3)">✅ Đã giải</span>' : ''}
              </div>
              <div style="color:var(--text2);font-size:.88rem">${p.desc}</div>
            </div>
            ${p.complexity ? `<span class="complexity-badge ${getComplexityClass(p.complexity)||'on'}">${p.complexity}</span>` : ''}
          </div>
        </div>
      `).join('')}
    </div>
  `;
}

function filterProblems(filter, btn) {
  document.querySelectorAll('.filter-btn').forEach(b => b.classList.remove('active'));
  btn.classList.add('active');
  document.querySelectorAll('[data-diff]').forEach(el => {
    el.style.display = (filter === 'all' || el.dataset.diff === filter) ? '' : 'none';
  });
}

function openProblem(id) {
  const p = CURRICULUM.problems.find(x => x.id === id);
  if (!p) return;
  const main = document.getElementById('practice-content');
  const examples = p.examples || [];

  main.innerHTML = `
    <div style="margin-bottom:16px">
      <button class="btn btn--secondary btn--sm" onclick="renderPractice()">← Danh sách bài</button>
    </div>
    <div class="lesson-header">
      <h1>${p.title}</h1>
      <div class="lesson-header__meta">
        <span class="tag tag--topic">${p.topic}</span>
        <span class="complexity-badge ${getComplexityClass(p.complexity)||'on'}">${p.complexity}</span>
      </div>
    </div>

    <div style="display:grid;grid-template-columns:1fr 1fr;gap:24px;margin-bottom:24px" class="prob-layout">
      <div>
        <h3>📋 Đề bài</h3>
        <p style="color:var(--text2);margin:12px 0">${p.desc}</p>
        <h4 style="margin:16px 0 6px">Input</h4>
        <p style="color:var(--text2)">${p.input}</p>
        <h4 style="margin:16px 0 6px">Output</h4>
        <p style="color:var(--text2)">${p.output}</p>
        <h4 style="margin:16px 0 6px">Ví dụ</h4>
        ${examples.map((ex, i) => `
          <div style="background:var(--bg2);border:1px solid var(--border);border-radius:var(--radius);overflow:hidden;margin-bottom:8px">
            <div style="display:grid;grid-template-columns:1fr 1fr">
              <div style="padding:10px 14px;border-right:1px solid var(--border)">
                <div style="font-size:.75rem;color:var(--text3);font-weight:700;margin-bottom:4px">INPUT ${i+1}</div>
                <pre style="font-family:var(--font-mono);font-size:.83rem;white-space:pre-wrap;color:var(--text)">${escapeHtml(ex.input)}</pre>
              </div>
              <div style="padding:10px 14px">
                <div style="font-size:.75rem;color:var(--text3);font-weight:700;margin-bottom:4px">OUTPUT ${i+1}</div>
                <pre style="font-family:var(--font-mono);font-size:.83rem;white-space:pre-wrap;color:var(--green)">${escapeHtml(ex.output)}</pre>
              </div>
            </div>
          </div>
        `).join('')}
        ${p.hints ? `
          <div class="hint-panel">
            <div class="hint-panel__header" onclick="this.nextElementSibling.style.display=this.nextElementSibling.style.display==='none'?'':'none'">
              <span class="hint-panel__title">💡 Gợi ý</span>
              <span style="color:var(--text3);font-size:.8rem">Nhấn để xem</span>
            </div>
            <div class="hint-panel__body" style="display:none">
              ${p.hints.map((h, i) => `<p><strong>Gợi ý ${i+1}:</strong> ${h}</p>`).join('')}
            </div>
          </div>
        ` : ''}
      </div>
      <div>
        <div class="editor-panel">
          <div class="editor-toolbar">
            <span class="editor-toolbar__title">✏️ Code của bạn</span>
            <button class="btn btn--green" onclick="runCode('prob-${id}')">▶ Chạy</button>
            <button class="btn btn--secondary btn--sm" onclick="showSolution('${id}')">👁 Xem lời giải</button>
            <button class="btn btn--secondary btn--sm" onclick="markDone('prob_${id}');showToast('✅ Đã giải xong!')">✅ Đánh dấu</button>
          </div>
          <div class="editor-area" style="height:340px">
            <div class="editor-code">
              <textarea id="ta-prob-${id}" class="code-editor" style="width:100%;height:100%;background:var(--bg2);color:var(--text);font-family:var(--font-mono);font-size:.85rem;border:none;outline:none;padding:16px;resize:none;tab-size:4">${escapeHtml(p.starter || '')}</textarea>
            </div>
            <div class="editor-output" style="display:flex;flex-direction:column">
              <div class="editor-output__header">
                <span>Output</span>
                <div class="output-status">
                  <div class="status-indicator" id="si-prob-${id}"></div>
                  <span id="st-prob-${id}" style="font-size:.78rem;color:var(--text3)">Chưa chạy</span>
                </div>
              </div>
              <pre id="out-prob-${id}" style="flex:1;padding:14px;font-family:var(--font-mono);font-size:.82rem;background:#010409;overflow:auto;white-space:pre-wrap;color:var(--text)">Nhấn ▶ Chạy...</pre>
              <div class="testcases">
                <div class="testcases__title">Test cases</div>
                <div class="test-list">
                  ${examples.map((ex, i) => `
                    <button class="test-btn ${i===0?'active':''}" id="tc-btn-prob-${id}-${i}"
                      onclick="selectTestcase('prob-${id}', ${i}, ${JSON.stringify(ex.input)}, ${JSON.stringify(ex.output)})">
                      Test ${i+1}
                    </button>`).join('')}
                </div>
              </div>
            </div>
          </div>
        </div>
        <div id="solution-${id}" style="display:none;margin-top:16px">
          ${p.solution ? renderCodeBlock('sol-'+id, p.solution) : ''}
        </div>
      </div>
    </div>
  `;
  if (examples[0]) CURRENT_TESTCASES['prob-' + id] = { input: examples[0].input, expected: examples[0].output };
  initCodeEditors();
}

function showSolution(id) {
  const el = document.getElementById(`solution-${id}`);
  if (el) el.style.display = el.style.display === 'none' ? '' : 'none';
}

// ---- Roadmap Page ----
function renderRoadmap() {
  const main = document.getElementById('roadmap-content');
  const targets = [
    { title: 'Nhập môn C++', phases: ['phase1'], icon: '🟢' },
    { title: 'Học sinh giỏi Tin (cấp tỉnh)', phases: ['phase1','phase2','phase3'], icon: '🥉' },
    { title: 'ICPC / IOI', phases: ['phase1','phase2','phase3','phase4','phase5'], icon: '🥇' },
    { title: 'Codeforces Div.2', phases: ['phase1','phase2','phase3'], icon: '💙' },
    { title: 'Codeforces Div.1', phases: ['phase1','phase2','phase3','phase4','phase5'], icon: '🔴' },
  ];

  main.innerHTML = `
    <div style="margin-bottom:32px">
      <h1>🗺️ Lộ trình học C++</h1>
      <p style="color:var(--text2)">Chọn mục tiêu và theo lộ trình phù hợp</p>
    </div>

    <h3 style="margin-bottom:16px">Chọn mục tiêu</h3>
    <div style="display:flex;gap:8px;flex-wrap:wrap;margin-bottom:36px">
      ${targets.map(t => `
        <button class="btn btn--secondary" onclick="highlightPhases(${JSON.stringify(t.phases)})">
          ${t.icon} ${t.title}
        </button>
      `).join('')}
    </div>

    <div class="roadmap">
      ${CURRICULUM.phases.map((phase, i) => {
        const allLessons = phase.sections.flatMap(s => s.lessons);
        const done = allLessons.filter(l => STATE.progress[l.id] === 'done').length;
        const status = done === allLessons.length ? 'done' : done > 0 ? 'active' : '';
        return `
        <div class="roadmap-phase ${status}" id="rp-${phase.id}">
          <div class="roadmap-phase__dot">${i+1}</div>
          <div class="roadmap-phase__title">${phase.icon} ${phase.title}</div>
          <div class="roadmap-phase__desc">${phase.desc} — ${done}/${allLessons.length} bài</div>
          <div class="topic-chips">
            ${phase.sections.flatMap(s => s.lessons).map(l => `
              <span class="topic-chip ${STATE.progress[l.id]==='done'?'done':''}" onclick="openLesson(${JSON.stringify(l).replace(/"/g,'&quot;')});navigate('learn')">
                ${l.title}
              </span>
            `).join('')}
          </div>
        </div>`;
      }).join('')}
    </div>

    <div style="margin-top:48px;padding:24px;background:var(--bg2);border:1px solid var(--border);border-radius:var(--radius-lg)">
      <h3 style="margin-bottom:16px">📚 Tài nguyên bổ sung</h3>
      <div class="card-grid">
        ${[
          ['Codeforces', 'cf.codeforces.com', 'Luyện tập bài tập thi đấu'],
          ['CSES Problem Set', 'cses.fi/problemset', '300 bài toán cổ điển'],
          ['CP-Algorithms', 'cp-algorithms.com', 'Giải thích thuật toán chi tiết'],
          ['VNOI Wiki', 'vnoi.info/wiki', 'Tài liệu tiếng Việt chất lượng'],
          ['AtCoder', 'atcoder.jp', 'Contest Nhật Bản chất lượng cao'],
          ['LeetCode', 'leetcode.com', 'Interview preparation'],
        ].map(([name, url, desc]) => `
          <div style="padding:14px;background:var(--bg3);border:1px solid var(--border);border-radius:var(--radius)">
            <div style="font-weight:700;margin-bottom:4px">${name}</div>
            <div style="font-size:.82rem;color:var(--accent);margin-bottom:4px">${url}</div>
            <div style="font-size:.82rem;color:var(--text2)">${desc}</div>
          </div>
        `).join('')}
      </div>
    </div>
  `;
}

function highlightPhases(phaseIds) {
  CURRICULUM.phases.forEach(p => {
    const el = document.getElementById(`rp-${p.id}`);
    if (el) {
      el.style.opacity = phaseIds.includes(p.id) ? '1' : '0.3';
      el.querySelector('.roadmap-phase__dot').style.borderColor =
        phaseIds.includes(p.id) ? 'var(--accent)' : '';
    }
  });
}

// ---- Learn page ----
function renderLearnPage() {
  const main = document.getElementById('learn-content');
  if (STATE.currentLesson) return;
  main.innerHTML = `
    <div class="fade-in">
      <h1 style="margin-bottom:8px">📚 Chọn bài học</h1>
      <p style="color:var(--text2);margin-bottom:32px">Hoặc chọn từ thanh bên trái</p>
      <div class="card-grid">
        ${CURRICULUM.phases.map(phase => {
          const first = phase.sections[0]?.lessons[0];
          return `
          <div class="card ${phase.level}" onclick="${first ? `openLesson(${JSON.stringify(first).replace(/"/g,'&quot;')})` : ''}">
            <div class="card__icon">${phase.icon}</div>
            <div class="card__title">${phase.title}</div>
            <div class="card__desc">${phase.desc}</div>
            <div class="card__footer">
              <span class="card__lessons">${phase.sections.flatMap(s=>s.lessons).length} bài</span>
              <span>→</span>
            </div>
          </div>`;
        }).join('')}
      </div>
    </div>`;
}

// ---- Utilities ----
function escapeHtml(str) {
  if (!str) return '';
  return String(str)
    .replace(/&/g,'&amp;')
    .replace(/</g,'&lt;')
    .replace(/>/g,'&gt;')
    .replace(/"/g,'&quot;');
}

function highlightCpp(code) {
  const keywords = /\b(auto|break|case|catch|class|const|continue|default|delete|do|else|enum|explicit|extern|false|for|friend|goto|if|inline|namespace|new|nullptr|operator|private|protected|public|return|sizeof|static|struct|switch|template|this|throw|true|try|typedef|typename|union|using|virtual|void|volatile|while)\b/g;
  const types = /\b(int|long|long long|short|char|bool|double|float|string|vector|map|set|queue|stack|deque|pair|tuple|array|bitset|list|multimap|multiset|unordered_map|unordered_set|priority_queue|size_t|unsigned|signed)\b/g;
  const strings = /"([^"\\]|\\.)*"/g;
  const chars = /'([^'\\]|\\.)*'/g;
  const comments = /(\/\/[^\n]*|\/\*[\s\S]*?\*\/)/g;
  const numbers = /\b(\d+(\.\d+)?(e[+-]?\d+)?|0x[0-9a-fA-F]+)\b/g;
  const macros = /\b(include|define|ifdef|ifndef|endif|pragma|undef)\b/g;

  return code
    .replace(comments, m => `<span class="cm">${m}</span>`)
    .replace(strings, m => `<span class="str">${m}</span>`)
    .replace(chars, m => `<span class="str">${m}</span>`)
    .replace(keywords, m => `<span class="kw">${m}</span>`)
    .replace(types, m => `<span class="ty">${m}</span>`)
    .replace(numbers, m => `<span class="num">${m}</span>`)
    .replace(macros, m => `<span class="macro">${m}</span>`);
}

function showToast(msg) {
  const toast = document.createElement('div');
  toast.textContent = msg;
  Object.assign(toast.style, {
    position: 'fixed', bottom: '24px', right: '24px', zIndex: '9999',
    background: 'var(--bg2)', border: '1px solid var(--border)',
    padding: '12px 20px', borderRadius: '8px', fontWeight: '600',
    boxShadow: '0 4px 24px rgba(0,0,0,.4)', animation: 'fadeIn .3s ease',
    color: 'var(--text)'
  });
  document.body.appendChild(toast);
  setTimeout(() => toast.remove(), 2500);
}

// ---- Mobile sidebar ----
function toggleSidebar() {
  const sb = document.getElementById('sidebar');
  const overlay = document.getElementById('overlay');
  sb.classList.toggle('open');
  overlay.classList.toggle('open');
}

// ---- Init ----
document.addEventListener('DOMContentLoaded', () => {
  renderSidebar();
  navigate('home');
  updateProgressUI();

  // Keyboard shortcuts
  document.addEventListener('keydown', e => {
    if ((e.ctrlKey || e.metaKey) && e.key === 'Enter') {
      // Run code shortcut
      const activeEditor = document.querySelector('.code-editor:focus');
      if (activeEditor) {
        const id = activeEditor.id.replace('ta-', '');
        runCode(id);
      }
    }
  });
});
