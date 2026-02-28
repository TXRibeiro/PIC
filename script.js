// ===================================================
// DISASTER-READY WATER STORAGE SYSTEM — SCRIPTS
// ===================================================

// ---- 1. AOS Init ----
AOS.init({
    duration: 700,
    once: true,
    offset: 60,
});

// ---- 2. Navbar scroll effect ----
const navbar = document.getElementById('navbar');
window.addEventListener('scroll', () => {
    if (window.scrollY > 50) {
        navbar.classList.add('scrolled');
    } else {
        navbar.classList.remove('scrolled');
    }
});

// ---- 3. Mobile menu toggle ----
const menuBtn = document.getElementById('menuBtn');
const navLinks = document.querySelector('.nav-links');
menuBtn.addEventListener('click', () => {
    navLinks.style.display = navLinks.style.display === 'flex' ? 'none' : 'flex';
    navLinks.style.flexDirection = 'column';
    navLinks.style.position = 'absolute';
    navLinks.style.top = '70px';
    navLinks.style.right = '2rem';
    navLinks.style.background = 'rgba(5,13,26,0.95)';
    navLinks.style.padding = '1rem 1.5rem';
    navLinks.style.borderRadius = '12px';
    navLinks.style.border = '1px solid rgba(0,212,255,0.2)';
    navLinks.style.backdropFilter = 'blur(16px)';
});

// ---- 4. Typewriter effect ----
const phrases = [
    'DISASTER-READY\nWATER STORAGE\nSYSTEM FOR CITIES',
];

function typewriter(element, text, speed = 50) {
    element.textContent = '';
    let i = 0;
    const interval = setInterval(() => {
        element.textContent += text[i];
        i++;
        if (i >= text.length) clearInterval(interval);
    }, speed);
}

const typewriterEl = document.getElementById('typewriter');
if (typewriterEl) {
    // Small delay for initial load feel
    setTimeout(() => {
        typewriter(typewriterEl, phrases[0], 45);
    }, 400);
}

// ---- 5. Animated counters ----
function animateCounter(el) {
    const target = parseInt(el.dataset.target, 10);
    const duration = 1800;
    const step = target / (duration / 16);
    let current = 0;

    const timer = setInterval(() => {
        current += step;
        if (current >= target) {
            el.textContent = target;
            clearInterval(timer);
        } else {
            el.textContent = Math.floor(current);
        }
    }, 16);
}

// ---- 6. Intersection Observer for animations ----
const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (!entry.isIntersecting) return;

        // Counters
        if (entry.target.classList.contains('metric-value')) {
            animateCounter(entry.target);
            observer.unobserve(entry.target);
        }

        // Impact bars (problem section)
        if (entry.target.classList.contains('bar-fill')) {
            entry.target.classList.add('animated');
            observer.unobserve(entry.target);
        }

    });
}, { threshold: 0.3 });

// Observe all animated elements
document.querySelectorAll('.metric-value').forEach(el => observer.observe(el));
document.querySelectorAll('.bar-fill').forEach(el => observer.observe(el));

// ---- 7. Smooth scroll for nav links ----
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', (e) => {
        const target = document.querySelector(anchor.getAttribute('href'));
        if (target) {
            e.preventDefault();
            target.scrollIntoView({ behavior: 'smooth', block: 'start' });
            // Close mobile menu if open
            if (window.innerWidth <= 900) {
                navLinks.style.display = 'none';
            }
        }
    });
});

// ---- 8. Team + Departments data & generation ----

const teamDataMain = [
    { name: 'Carolina João',      role: 'leader', dept: 'Eletrónica',           deptIcon: 'fa-microchip', photo: 'photos/Carolina.png'  },
    { name: 'Tomás Ribeiro',      role: 'leader', dept: 'Firmware',             deptIcon: 'fa-bolt',      photo: 'photos/Tomás.jpg'     },
    { name: 'Margarida Sebastião',role: 'leader', dept: 'Geográfica / Métricas',deptIcon: 'fa-map',       photo: 'photos/Margarida.png' },
    { name: 'Matilde Silva',      role: 'leader', dept: 'Orçamento',            deptIcon: 'fa-coins',     photo: 'photos/Matilde.png'   },
    { name: 'Francisco Caravana', role: 'leader', dept: 'Relações Externas',    deptIcon: 'fa-handshake', photo: 'photos/Francisco.jpg' },
    { name: 'Tiago Carvalho',     role: 'leader', dept: 'Software',             deptIcon: 'fa-code',      photo: 'photos/tiago.png'     },
];

const deptData = [
    {
        icon: 'fa-microchip', name: 'Eletrónica', category: 'tecnico',
        desc: 'Design e prototipagem de hardware, sensores de nível e qualidade de água, sistemas de atuação e interfaces físicas.',
        leader: 'Carolina João', members: ['Tiago Carvalho', 'Francisco Caravana', 'Tomás Ribeiro']
    },
    {
        icon: 'fa-coins', name: 'Orçamento', category: 'gestao',
        desc: 'Estimativa de custos de implementação, análise custo-benefício, sourcing de componentes e viabilidade financeira do projeto.',
        leader: 'Matilde Silva', members: ['Tiago Carvalho']
    },
    {
        icon: 'fa-map', name: 'Geográfica / Métricas', category: 'tecnico',
        desc: 'Análise GIS para seleção de localizações, modelação de redes de distribuição e definição de métricas de desempenho.',
        leader: 'Margarida Sebastião', members: ['Matilde Silva', 'Tomás Ribeiro']
    },
    {
        icon: 'fa-handshake', name: 'Relações Externas', category: 'gestao',
        desc: 'Ligação com municípios, entidades reguladoras e parceiros institucionais. Gestão de comunicação e divulgação do projeto.',
        leader: 'Francisco Caravana', members: ['Margarida Sebastião']
    },
    {
        icon: 'fa-bolt', name: 'Firmware', category: 'tecnico',
        desc: 'Desenvolvimento do firmware embebido, protocolos de comunicação e integração com hardware de sensores e atuadores.',
        leader: 'Matilde Silva', members: ['Margarida Sebastião', 'Carolina João']
    },
    {
        icon: 'fa-code', name: 'Software', category: 'tecnico',
        desc: 'Dashboard de monitorização, APIs de integração, interfaces web e lógica de controlo do sistema.',
        leader: 'Tomás Ribeiro', members: ['Tiago Carvalho', 'Francisco Caravana']
    },
];

// Helper: build a person card (used in both #teamGridMain and #personGridDept)
function buildPersonCard(member) {
    const card = document.createElement('div');
    card.className = 'team-card';
    const isLeader = member.role === 'leader';
    const avatarHTML = member.photo
        ? `<img src="${member.photo}" alt="${member.name}">`
        : `<i class="fa-solid ${member.deptIcon}"></i>`;
    card.innerHTML = `
        <div class="team-avatar">
            ${avatarHTML}
        </div>
        <h3>${member.name}</h3>
        <span class="team-role-badge ${isLeader ? 'badge-leader' : 'badge-member'}">
            ${isLeader ? '★ Team Leader' : 'Team Member'}
        </span>
        <span class="team-dept-tag">
            <i class="fa-solid ${member.deptIcon}"></i> ${member.dept}
        </span>
    `;
    return card;
}

// Generate #deptGrid (Por Departamento — with leader/members listed)
const deptGrid = document.getElementById('deptGrid');
const filterBtns = document.querySelectorAll('.btn-filter');

if (deptGrid) {
    deptData.forEach(dept => {
        const membersHTML = dept.members.length
            ? dept.members.map(m => `<li><i class="fa-solid fa-user"></i> ${m}</li>`).join('')
            : '';
        const card = document.createElement('div');
        card.className = 'dept-card';
        card.dataset.category = dept.category;
        card.innerHTML = `
            <div class="dept-icon">
                <i class="fa-solid ${dept.icon}"></i>
            </div>
            <h3>${dept.name}</h3>
            <p>${dept.desc}</p>
            <ul class="dept-members">
                <li class="dept-leader"><i class="fa-solid fa-star"></i> ${dept.leader}</li>
                ${membersHTML}
            </ul>
        `;
        deptGrid.appendChild(card);
    });

    filterBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            const filter = btn.dataset.filter;
            filterBtns.forEach(b => b.classList.remove('active'));
            btn.classList.add('active');
            document.querySelectorAll('.dept-card').forEach(card => {
                const match = filter === 'all' || card.dataset.category === filter;
                card.classList.toggle('hidden', !match);
            });
        });
    });
}

// Generate #personGridDept (Por Pessoa)
const personGridDept = document.getElementById('personGridDept');
if (personGridDept) {
    teamDataMain.forEach(member => personGridDept.appendChild(buildPersonCard(member)));
}

// Tab switching for departments section
const deptTabs = document.querySelectorAll('.dept-tab');
const deptView  = document.getElementById('deptView');
const personView = document.getElementById('personView');

deptTabs.forEach(tab => {
    tab.addEventListener('click', () => {
        deptTabs.forEach(t => t.classList.remove('active'));
        tab.classList.add('active');
        if (tab.dataset.view === 'dept') {
            deptView.style.display  = 'block';
            personView.style.display = 'none';
        } else {
            deptView.style.display  = 'none';
            personView.style.display = 'block';
        }
    });
});

// ---- 9. Active nav link on scroll ----
const sections = document.querySelectorAll('section[id]');
const navAnchors = document.querySelectorAll('.nav-links a');

const sectionObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            navAnchors.forEach(a => a.style.color = '');
            const active = document.querySelector(`.nav-links a[href="#${entry.target.id}"]`);
            if (active) active.style.color = 'var(--accent-cyan)';
        }
    });
}, { rootMargin: '-40% 0px -55% 0px' });

sections.forEach(s => sectionObserver.observe(s));
