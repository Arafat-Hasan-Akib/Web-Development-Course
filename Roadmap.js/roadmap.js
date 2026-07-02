const DATA = [
  { id:1, title:"Python Fundamentals", emoji:"🐍", duration:"২–৩ মাস", color:"#f59e0b",
    topics:[
      {id:"py1",name:"Variables",done:true},{id:"py2",name:"Data Types",done:true},
      {id:"py3",name:"Operators",done:true},{id:"py4",name:"If-Else",done:true},
      {id:"py5",name:"Loops",done:true},{id:"py6",name:"Functions",done:true},
      {id:"py7",name:"Lists",done:true},{id:"py8",name:"Tuples",done:true},
      {id:"py9",name:"Dictionaries",done:true},{id:"py10",name:"Sets",done:true},
      {id:"py11",name:"String Manipulation",done:false},{id:"py12",name:"File Handling",done:true},
      {id:"py13",name:"Exception Handling",done:false},{id:"py14",name:"Modules & Packages",done:false},
      {id:"py15",name:"OOP (Class, Inheritance...)",done:false},
    ]},
  { id:2, title:"Problem Solving", emoji:"🧩", duration:"১–২ মাস", color:"#ef4444",
    topics:[
      {id:"ps1",name:"Basic Algorithms",done:false},{id:"ps2",name:"Time Complexity",done:false},
      {id:"ps3",name:"Searching",done:false},{id:"ps4",name:"Sorting",done:false},
      {id:"ps5",name:"Recursion",done:false},{id:"ps6",name:"Arrays",done:false},
      {id:"ps7",name:"Strings",done:false},{id:"ps8",name:"Hash Maps",done:false},
      {id:"ps9",name:"Stack",done:false},{id:"ps10",name:"Queue",done:false},
    ]},
  { id:3, title:"Frontend — HTML & CSS", emoji:"🎨", duration:"১–১.৫ মাস", color:"#3b82f6",
    topics:[
      {id:"html1",name:"Tags",done:true},{id:"html2",name:"Forms",done:true},
      {id:"html3",name:"Tables",done:true},{id:"html4",name:"Semantic HTML",done:true},
      {id:"html5",name:"Accessibility",done:false},{id:"css1",name:"Selectors",done:true},
      {id:"css2",name:"Box Model",done:true},{id:"css3",name:"Flexbox",done:true},
      {id:"css4",name:"Grid",done:true},{id:"css5",name:"Responsive Design",done:true},
      {id:"css6",name:"Animations",done:false},
    ]},
  { id:4, title:"JavaScript", emoji:"⚡", duration:"২–৩ মাস", color:"#eab308",
    topics:[
      {id:"js1",name:"Variables",done:true},{id:"js2",name:"Functions",done:true},
      {id:"js3",name:"Arrays",done:true},{id:"js4",name:"Objects",done:true},
      {id:"js5",name:"DOM",done:true},{id:"js6",name:"Events",done:true},
      {id:"js7",name:"Async/Await",done:true},{id:"js8",name:"Promises",done:true},
      {id:"js9",name:"Fetch API",done:false},{id:"js10",name:"ES6+",done:false},
    ]},
  { id:5, title:"Git & GitHub", emoji:"🌿", duration:"২–৩ সপ্তাহ", color:"#8b5cf6",
    topics:[
      {id:"git1",name:"Repository",done:false},{id:"git2",name:"Commit",done:false},
      {id:"git3",name:"Branch",done:false},{id:"git4",name:"Merge",done:false},
      {id:"git5",name:"Pull Request",done:false},{id:"git6",name:"Collaboration",done:false},
    ]},
  { id:6, title:"React", emoji:"⚛️", duration:"২–৩ মাস", color:"#06b6d4",
    topics:[
      {id:"r1",name:"Components",done:false},{id:"r2",name:"Props",done:false},
      {id:"r3",name:"State",done:false},{id:"r4",name:"Hooks",done:false},
      {id:"r5",name:"Routing",done:false},{id:"r6",name:"API Integration",done:false},
      {id:"r7",name:"Context API",done:false},
    ]},
  { id:7, title:"Database (SQL + NoSQL)", emoji:"🗄️", duration:"১.৫–২ মাস", color:"#10b981",
    topics:[
      {id:"db1",name:"PostgreSQL — Tables",done:false},{id:"db2",name:"Relationships & Joins",done:false},
      {id:"db3",name:"CRUD & Indexes",done:false},{id:"db4",name:"MongoDB — Documents",done:false},
      {id:"db5",name:"Collections & Aggregation",done:false},
    ]},
  { id:8, title:"Backend (Django / FastAPI)", emoji:"🔧", duration:"২–৩ মাস", color:"#f97316",
    topics:[
      {id:"be1",name:"Routing & Views",done:false},{id:"be2",name:"Models & ORM",done:false},
      {id:"be3",name:"Authentication",done:false},{id:"be4",name:"Authorization",done:false},
      {id:"be5",name:"REST API",done:false},{id:"be6",name:"Middleware",done:false},
      {id:"be7",name:"JWT",done:false},
    ]},
  { id:9, title:"Deployment", emoji:"🚀", duration:"১ মাস", color:"#ec4899",
    topics:[
      {id:"dep1",name:"Linux Basics",done:false},{id:"dep2",name:"Nginx",done:false},
      {id:"dep3",name:"Domain & SSL",done:false},{id:"dep4",name:"Hosting",done:false},
      {id:"dep5",name:"CI/CD",done:false},
    ]},
  { id:10, title:"Real Projects", emoji:"🏗️", duration:"২–৪ মাস", color:"#14b8a6",
    topics:[
      {id:"proj1",name:"Calculator App",done:false},{id:"proj2",name:"To-Do App",done:false},
      {id:"proj3",name:"Note App",done:false},{id:"proj4",name:"Blog Website",done:false},
      {id:"proj5",name:"E-commerce Clone",done:false},{id:"proj6",name:"Chat App",done:false},
      {id:"proj7",name:"Full Stack SaaS",done:false},
    ]},
];

// Load from localStorage
function loadState() {
  try {
    const saved = localStorage.getItem('roadmap_v1');
    if (!saved) return;
    const state = JSON.parse(saved);
    DATA.forEach(sec => {
      sec.topics.forEach(t => {
        if (state[t.id] !== undefined) t.done = state[t.id];
      });
    });
  } catch(e) {}
}

function saveState() {
  const state = {};
  DATA.forEach(sec => sec.topics.forEach(t => state[t.id] = t.done));
  localStorage.setItem('roadmap_v1', JSON.stringify(state));
}

function updateOverall() {
  const total = DATA.reduce((a,s) => a + s.topics.length, 0);
  const done = DATA.reduce((a,s) => a + s.topics.filter(t=>t.done).length, 0);
  const pct = Math.round(done/total*100);
  document.getElementById('overall-label').textContent = `${done} / ${total} topics`;
  document.getElementById('overall-pct').textContent = `${pct}%`;
  document.getElementById('overall-bar').style.width = pct + '%';
}

function getStatus(sec) {
  const done = sec.topics.filter(t=>t.done).length;
  if (done === 0) return 'locked';
  if (done === sec.topics.length) return 'complete';
  return 'active';
}

let openId = null;

function render() {
  const container = document.getElementById('sections');
  container.innerHTML = '';

  DATA.forEach(sec => {
    const done = sec.topics.filter(t=>t.done).length;
    const pct = Math.round(done/sec.topics.length*100);
    const status = getStatus(sec);
    const isOpen = openId === sec.id;

    const div = document.createElement('div');
    div.className = 'section' + (isOpen ? ' open' : '');
    div.style.setProperty('--sec-color', sec.color);

    const badgeClass = status === 'complete' ? 'complete' : status === 'locked' ? 'locked' : '';
    const badgeContent = status === 'complete' ? '✓' : sec.emoji;

    let pill = '';
    if (status === 'complete') pill = `<span class="pill pill-done">DONE</span>`;
    else if (status === 'active') pill = `<span class="pill pill-active">IN PROGRESS</span>`;

    div.innerHTML = `
      <button class="sec-header" onclick="toggleSection(${sec.id})">
        <div class="phase-badge ${badgeClass}">${badgeContent}</div>
        <div class="sec-info">
          <div class="sec-title-row">
            <span class="sec-title">${sec.title}</span>${pill}
          </div>
          <div class="sec-meta">
            <div class="sec-bar-wrap">
              <div class="sec-bar" style="width:${pct}%;background:${sec.color}"></div>
            </div>
            <span class="sec-count">${done}/${sec.topics.length}</span>
            <span class="sec-duration">⏱ ${sec.duration}</span>
          </div>
        </div>
        <span class="chevron">▾</span>
      </button>
      <div class="topics">
        ${sec.topics.map(t => `
          <button class="topic-btn ${t.done?'done':''}" onclick="toggleTopic('${t.id}',${sec.id})">
            <span class="checkbox">${t.done?'✓':''}</span>
            <span class="topic-name">${t.name}</span>
          </button>
        `).join('')}
      </div>
    `;
    container.appendChild(div);
  });

  updateOverall();
}

function toggleSection(id) {
  openId = openId === id ? null : id;
  render();
}

function toggleTopic(topicId, secId) {
  const sec = DATA.find(s=>s.id===secId);
  const topic = sec.topics.find(t=>t.id===topicId);
  topic.done = !topic.done;
  saveState();
  render();
}

loadState();
render();