/* Inform Systems Group — main script: menu, hero slider, reveal/lines, squares motif, theme toggle, news/partners rendering. */
const MENU = [
  {
    t: "Продукты",
    href: "/solutions/",
    d: "Собственные разработки, устройства и технологии группы.",
    l: "Все продукты",
    g: [
      {
        h: "Разработки",
        href: "/solutions/developments/",
        i: [
          [
            "Биометрическая система FINGER",
            "/solutions/developments/finger-biometric-system/",
          ],
          [
            "Облачная рекламная платформа",
            "/solutions/developments/cloud-advertising-platform/",
          ],
          [
            "Операционная система FastSYS",
            "/solutions/developments/fastsys-operating-system/",
          ],
          [
            "ПО для киосков ALLVEND",
            "/solutions/developments/allvend-kiosk-software/",
          ],
          [
            "Процессинговая система SkySend",
            "/solutions/developments/skysend-processing-system/",
          ],
        ],
      },
      {
        h: "Устройства",
        href: "/solutions/devices/",
        i: [
          [
            "Биометрические блоки FINGER",
            "/solutions/devices/finger-biometric-modules/",
          ],
          [
            "Единый фискальный сервер",
            "/solutions/devices/unified-fiscal-server/",
          ],
          [
            "Киоски самообслуживания Beauty",
            "/solutions/devices/beauty-self-service-kiosks/",
          ],
          [
            "Универсальные блоки ALLVEND",
            "/solutions/devices/allvend-universal-modules/",
          ],
        ],
      },
      {
        h: "Инновации",
        href: "/solutions/innovations/",
        i: [
          [
            "Единая информационная система «Умный город»",
            "/solutions/innovations/smart-city-information-system/",
          ],
          [
            "Сеть технопарков «Нейрон»",
            "/solutions/innovations/neuron-technopark-network/",
          ],
          [
            "Система телемедицины «Мой доктор»",
            "/solutions/innovations/my-doctor-telemedicine-system/",
          ],
        ],
      },
      {
        h: "Технологии",
        href: "/solutions/technologies/",
        i: [
          [
            "Замкнутая система обмена криптоключами",
            "/solutions/technologies/closed-cryptographic-key-exchange-system/",
          ],
          [
            "Система удалённых бинарных обновлений",
            "/solutions/technologies/remote-binary-updates/",
          ],
          [
            "Технология клонирования *BSD серверов",
            "/solutions/technologies/bsd-server-cloning/",
          ],
        ],
      },
    ],
  },
  {
    t: "Услуги",
    href: "/service/",
    d: "Сервисы и внедрение: от WEB3 до защищённой инфраструктуры.",
    l: "Все услуги",
    g: [
      {
        h: "Услуги в области WEB3",
        href: "/service/web3-services/",
        i: [
          [
            "Настройка безопасности устройства",
            "/service/web3-services/device-security-configuration/",
          ],
          [
            "Настройка пассивного дохода",
            "/service/web3-services/passive-income-setup/",
          ],
          [
            "Регистрация криптокарты Solflare",
            "/service/web3-services/solflare-crypto-card-registration/",
          ],
        ],
      },
      {
        h: "Услуги системы SkySend",
        href: "/service/skysend-system-services/",
        i: [
          [
            "Собственные интерфейсы",
            "/service/skysend-system-services/custom-interfaces/",
          ],
          [
            "Обработка платёжных транзакций",
            "/service/skysend-system-services/payment-transaction-processing/",
          ],
          [
            "Интеграция с поставщиками услуг",
            "/service/skysend-system-services/service-provider-integration/",
          ],
          [
            "Финансовые услуги системы",
            "/service/skysend-system-services/system-financial-services/",
          ],
        ],
      },
      {
        h: "Разработка и поддержка ПО",
        href: "/service/software-development-and-support/",
        i: [
          [
            "Кластерные и транзакционные системы",
            "/service/software-development-and-support/cluster-and-transactional-systems/",
          ],
          [
            "Встраиваемое ПО",
            "/service/software-development-and-support/embedded-software/",
          ],
          [
            "Драйверы периферийных устройств",
            "/service/software-development-and-support/peripheral-device-drivers/",
          ],
          [
            "Сервисы обработки транзакций (API)",
            "/service/software-development-and-support/transaction-processing-services-api/",
          ],
        ],
      },
      {
        h: "Аналитическая работа",
        href: "/service/analytics-and-consulting/",
        i: [
          [
            "Разработка инструкций и регламентов",
            "/service/analytics-and-consulting/instructions-and-procedures-development/",
          ],
          [
            "Проектирование и аудит ИТ-систем",
            "/service/analytics-and-consulting/it-system-design-and-audit/",
          ],
          [
            "Разработка технических заданий",
            "/service/analytics-and-consulting/technical-specification-development/",
          ],
        ],
      },
      {
        h: "Внедрение решений",
        href: "/service/solution-implementation/",
        i: [
          [
            "Развёртывание удостоверяющего центра (CA)",
            "/service/solution-implementation/certification-authority-ca-setup/",
          ],
          [
            "Закрытая система обмена ключами",
            "/service/solution-implementation/closed-key-exchange-system/",
          ],
          [
            "Комплексная автоматизация МФЦ",
            "/service/solution-implementation/comprehensive-automation-of-multifunctional-public-service-centers-mfcs/",
          ],
          [
            "Криптозащищённые серверы",
            "/service/solution-implementation/cryptographically-protected-servers/",
          ],
          [
            "Интеллектуальное видеонаблюдение",
            "/service/solution-implementation/intelligent-video-surveillance/",
          ],
          [
            "Защищённая IP-телефония",
            "/service/solution-implementation/secure-ip-telephony/",
          ],
        ],
      },
    ],
  },
  {
    t: "Компания",
    href: "/company/",
    d: "Более 20 лет разрабатываем технологии для бизнеса и государства.",
    l: "О компании",
    g: [
      {
        i: [
          ["История", "/company/history/"],
          ["Контакты", "/company/contacts/"],
          ["Лицензии", "/company/licenses/"],
        ],
      },
      {
        i: [
          ["Миссия", "/company/mission/"],
          ["Партнерство", "/company/partnership/"],
          ["Работа", "/company/careers/"],
        ],
      },
    ],
  },
  {
    t: "Поддержка",
    href: "/support/",
    d: "Материалы для клиентов и быстрая связь с командой.",
    l: "Связаться",
    g: [
      {
        i: [["Загрузки", "/downloads/"]],
      },
      {
        i: [
          [
            "Обратная связь",
            "/support/callback/",
            "Наш менеджер ответит вам быстро",
          ],
        ],
      },
    ],
  },
];
const li = (i) =>
  `<a class="i" href="${i[1]}"><span>${i[0]}${i[2] ? `<small>${i[2]}</small>` : ""}</span></a>`;
nav.innerHTML = MENU.map(
  (m) =>
    `<div><a href="${m.href}">${m.t}</a><div class="mg"><div class="w mgi"><div class="mgl"><h5>${m.t}</h5><p>${m.d}</p><a class="btn o s" href="${m.href}">${m.l} →</a></div><div class="mgc" style="--n:${m.g.length}">${m.g.map((g, k) => `<div>${g.h ? `<h4><a href="${g.href}"><span>${g.h}</span><em>0${k + 1}</em></a></h4>` : ""}${g.i.map(li).join("")}</div>`).join("")}</div></div></div></div>`,
).join("");

const NW = [
  [
    "10.11.2026",
    "Запущен FTP-сервер Inform Systems Group",
    "Центральный FTP-сервер компании ISG введён в эксплуатацию.",
    "assets/news-post_ftp.jpg",
  ],
  [
    "10.11.2026",
    "Бизнес-миссия группы в Азербайджане",
    "Inform Systems Group приняла участие в бизнес-миссии в Азербайджан.",
    "https://new.isg.dev/wp-content/uploads/2026/10/az.webp",
  ],
  [
    "10.11.2026",
    "Уважаемые номинаторы сети Polkadot",
    "В связи с улучшением инфраструктуры и повышением стабильности работы.",
    "assets/news-post_polkadot-2.jpeg",
  ],
  [
    "27.10.2026",
    "Уважаемые валидаторы Polkadot",
    "При миграции серверов возникла ошибка с дублированием экземпляра.",
    "assets/news-post_polkadot-1.jpg",
  ],
];
nw.innerHTML = NW.map(
  (x, i) =>
    `<article class="card rv" style="--i:${i*.1}s">
        <div class="im sqs" data-sq="4" data-c="28">
            ${x[3] ? `<img src="${x[3]}" alt="${x[1]}" loading="lazy">` : `
                <div class="phi">
                    <svg viewBox="0 0 48 48" fill="none" stroke="currentColor" stroke-width="1.6">
                        <rect x="6" y="9" width="36" height="30" rx="4"/>
                        <circle cx="17" cy="20" r="3.5"/>
                        <path d="m6 34 11-10 8 7 6-5 11 9"/>
                    </svg>
                    <span>Изображение</span>
                </div>
            `}
        </div>
        <div class="bd">
            <time>${x[0]}</time>
            <h3>${x[1]}</h3>
            <p>${x[2]}</p>
            <a class="btn o s" href="#">Читать далее</a>
        </div>
    </article>`,
).join("");
const row = (a) => {
  const h = Array.from(
    { length: 8 },
    (_, i) => `<div class="pl">PARTNER ${String(i + a).padStart(2, "0")}</div>`,
  ).join("");
  return `<div class="tr${a > 8 ? " rt" : ""}">${h + h}</div>`;
};
mq.innerHTML = row(1) + row(9);
const S = [...document.querySelectorAll(".sl")],
  T = tabs,
  names = ["О компании", "Solflare", "ALLVEND", "SkySend"];
let k = 0,
  tm;
T.innerHTML = names.map((n) => `<button><i></i>${n}</button>`).join("");
const B = [...T.children];
function go(i) {
  k = (i + S.length) % S.length;
  S.forEach((s, j) => s.classList.toggle("on", j == k));
  B.forEach((b, j) => {
    b.classList.remove("on");
    void b.offsetWidth;
    if (j == k) b.classList.add("on");
  });
  clearTimeout(tm);
  const d = k ? 7 : 10;
  T.style.setProperty("--d", d + "s");
  tm = setTimeout(() => go(k + 1), d * 1000);
}
B.forEach((b, i) => (b.onclick = () => go(i)));
pv.onclick = () => go(k - 1);
nx.onclick = () => go(k + 1);
go(0);
const hv = document.querySelector(".hero");
hv.onmouseenter = () => {
  T.classList.add("pz");
  clearTimeout(tm);
};
hv.onmouseleave = () => {
  T.classList.remove("pz");
  go(k);
};
const io = new IntersectionObserver(
  (e) =>
    e.forEach((x) => {
      if (x.isIntersecting) {
        x.target.classList.add("in");
        const s = x.target.querySelector("[data-n]");
        if (s && !s.done) {
          s.done = 1;
          const n = +s.dataset.n,
            f = +(s.dataset.f || 0),
            t0 = performance.now();
          (function a(t) {
            const p = Math.min((t - t0) / 1600, 1),
              v = n * (1 - Math.pow(1 - p, 4));
            s.textContent =
              v.toLocaleString("ru", {
                minimumFractionDigits: f,
                maximumFractionDigits: f,
              }) + (p == 1 ? s.dataset.s || "" : "");
            p < 1 && requestAnimationFrame(a);
          })(t0);
        }
        io.unobserve(x.target);
      }
    }),
  { threshold: 0.15 },
);
document.querySelectorAll(".rv,.dl,.gfade").forEach((e) => io.observe(e));
function sqs() {
  document.querySelectorAll("[data-sq]").forEach((el) => {
    el.querySelectorAll("i.q").forEach((x) => x.remove());
    const c = +(el.dataset.c || 32),
      n = +el.dataset.sq,
      w = el.clientWidth,
      h = el.clientHeight,
      x0 = +(el.dataset.x || 0),
      cols = (el.dataset.col || "#0166ff,#39ac59").split(",");
    el.style.setProperty("--c", c + "px");
    if (!w) return;
    const place = (q) => {
      q.style.left =
        Math.floor(((x0 + Math.random() * (1 - x0)) * w) / c) * c + "px";
      q.style.top = Math.floor((Math.random() * h) / c) * c + "px";
      q.style.background = cols[Math.floor(Math.random() * cols.length)];
    };
    for (let k = 0; k < n; k++) {
      const q = document.createElement("i");
      q.className = "q";
      q.style.width = q.style.height = c + "px";
      q.style.animationDuration = 5 + Math.random() * 5 + "s";
      q.style.animationDelay = -Math.random() * 8 + "s";
      place(q);
      q.addEventListener("animationiteration", () => place(q));
      el.appendChild(q);
    }
  });
}
sqs();
let rz;
addEventListener("resize", () => {
  clearTimeout(rz);
  rz = setTimeout(sqs, 250);
});
th.onclick = () => {
  const r = document.documentElement,
    d = r.dataset.theme == "dark" ? "light" : "dark";
  r.classList.add("tr");
  r.dataset.theme = d;
  try {
    localStorage.setItem("isg-theme", d);
  } catch (e) {}
  setTimeout(() => r.classList.remove("tr"), 450);
};
mob.innerHTML = MENU.map(
  (m) =>
    `<details><summary>${m.t}</summary>${m.g.map((g) => (g.h ? `<h6><a href="${g.href}">${g.h}</a></h6>` : "") + g.i.map((i) => `<a href="${i[1]}">${i[0]}</a>`).join("")).join("")}</details>`,
).join("");
bgr.onclick = () => {
  const o = mob.classList.toggle("open");
  document.body.style.overflow = o ? "hidden" : "";
};
mob.onclick = (e) => {
  if (e.target.tagName == "A") {
    mob.classList.remove("open");
    document.body.style.overflow = "";
  }
};
addEventListener(
  "scroll",
  () => document.querySelector("header").classList.toggle("sc", scrollY > 8),
  { passive: true },
);
