'use strict';

/* ================= DATA ================= */
const CARS = [
  { id: 1, name: 'Dacia Logan', brand: 'Dacia', year: 2024, category: 'Économique', price: 250, seats: 5, doors: 4, bags: 3, transmission: 'Manuelle', fuel: 'Diesel', ac: true, rating: 4.6, reviews: 312, deposit: 3000, tag: 'Le moins cher', available: true,
    img: 'images/dacia-logan.jpg', features: ['Climatisation', 'Bluetooth', 'Radio USB', 'ABS'] },
  { id: 2, name: 'Renault Clio 5', brand: 'Renault', year: 2024, category: 'Citadine', price: 300, seats: 5, doors: 5, bags: 2, transmission: 'Manuelle', fuel: 'Diesel', ac: true, rating: 4.7, reviews: 280, deposit: 4000, tag: 'Le plus loué', available: true,
    img: 'images/renault-clio.jpg', features: ['Climatisation', 'Écran tactile', 'Apple CarPlay', 'Radar de recul'] },
  { id: 3, name: 'Peugeot 208', brand: 'Peugeot', year: 2024, category: 'Citadine', price: 330, seats: 5, doors: 5, bags: 2, transmission: 'Automatique', fuel: 'Essence', ac: true, rating: 4.8, reviews: 198, deposit: 4000, tag: '', available: true,
    img: 'images/peugeot-208.jpg', features: ['Climatisation auto', 'i-Cockpit', 'Android Auto', 'Régulateur de vitesse'] },
  { id: 4, name: 'Volkswagen Golf 8', brand: 'Volkswagen', year: 2023, category: 'Compacte', price: 450, seats: 5, doors: 5, bags: 3, transmission: 'Automatique', fuel: 'Diesel', ac: true, rating: 4.9, reviews: 150, deposit: 6000, tag: '', available: true,
    img: 'images/vw-golf.jpg', features: ['Cockpit digital', 'GPS intégré', 'Caméra de recul', 'Sièges chauffants'] },
  { id: 5, name: 'Hyundai Tucson', brand: 'Hyundai', year: 2024, category: 'SUV', price: 600, seats: 5, doors: 5, bags: 4, transmission: 'Automatique', fuel: 'Hybride', ac: true, rating: 4.8, reviews: 121, deposit: 8000, tag: 'Hybride', available: true,
    img: 'images/hyundai-tucson.jpg', features: ['Toit panoramique', 'GPS', 'Caméra 360°', 'Aide au maintien de voie'] },
  { id: 6, name: 'Toyota Land Cruiser', brand: 'Toyota', year: 2023, category: 'SUV', price: 1200, seats: 7, doors: 5, bags: 5, transmission: 'Automatique', fuel: 'Diesel', ac: true, rating: 4.9, reviews: 87, deposit: 15000, tag: '4x4', available: true,
    img: 'images/toyota-land-cruiser.jpg', features: ['4x4 intégral', '7 places', 'Cuir', 'Idéal désert & montagne'] },
  { id: 7, name: 'Dacia Lodgy', brand: 'Dacia', year: 2023, category: 'Familiale', price: 400, seats: 7, doors: 5, bags: 4, transmission: 'Manuelle', fuel: 'Diesel', ac: true, rating: 4.5, reviews: 140, deposit: 5000, tag: '7 places', available: true,
    img: 'images/dacia-lodgy.jpg', features: ['7 places', 'Grand coffre', 'Climatisation', 'Bluetooth'] },
  { id: 8, name: 'Mercedes Classe C', brand: 'Mercedes', year: 2024, category: 'Luxe', price: 1100, seats: 5, doors: 4, bags: 3, transmission: 'Automatique', fuel: 'Diesel', ac: true, rating: 5.0, reviews: 64, deposit: 20000, tag: '', available: true,
    img: 'images/mercedes-classe-c.jpg', features: ['Intérieur cuir', 'MBUX', 'Éclairage d\'ambiance', 'Sièges massants'] },
  { id: 9, name: 'Range Rover Sport', brand: 'Land Rover', year: 2024, category: 'Luxe', price: 2000, seats: 5, doors: 5, bags: 4, transmission: 'Automatique', fuel: 'Hybride', ac: true, rating: 5.0, reviews: 42, deposit: 30000, tag: '', available: true,
    img: 'images/range-rover-sport.jpg', features: ['Suspension pneumatique', 'Toit ouvrant', 'Son Meridian', 'Caméra 360°'] },
  { id: 10, name: 'Renault Trafic', brand: 'Renault', year: 2023, category: 'Utilitaire', price: 700, seats: 9, doors: 4, bags: 8, transmission: 'Manuelle', fuel: 'Diesel', ac: true, rating: 4.6, reviews: 55, deposit: 8000, tag: '9 places', available: true,
    img: 'images/renault-trafic.jpg', features: ['9 places', 'Idéal groupes', 'Climatisation', 'Grand volume'] },
  { id: 11, name: 'Tesla Model 3', brand: 'Tesla', year: 2024, category: 'Luxe', price: 1300, seats: 5, doors: 4, bags: 3, transmission: 'Automatique', fuel: 'Électrique', ac: true, rating: 4.9, reviews: 38, deposit: 20000, tag: 'Électrique', available: true,
    img: 'images/tesla-model-3.jpg', features: ['Autopilot', 'Autonomie 500 km', 'Écran 15"', 'Recharge incluse'] },
  { id: 12, name: 'Fiat 500', brand: 'Fiat', year: 2023, category: 'Économique', price: 280, seats: 4, doors: 3, bags: 1, transmission: 'Manuelle', fuel: 'Essence', ac: true, rating: 4.4, reviews: 110, deposit: 3000, tag: '', available: false,
    img: 'images/fiat-500.jpg', features: ['Compacte', 'Facile à garer', 'Climatisation', 'Bluetooth'] }
];

// Per-listing details: reference, mileage, engine, consumption, colour, stock per agency
const CAR_INFO = {
  1: { ref: 'AL-0112', km: 18400, engine: '1.5 dCi', power: '95 ch', conso: '4,4 L/100 km', color: 'Gris Comète', minDays: 1, updated: '2026-11-10', stock: { Casablanca: 4, Marrakech: 3, Rabat: 2, Agadir: 2, Fès: 1, Oujda: 1 } },
  2: { ref: 'AL-0207', km: 9100, engine: '1.5 Blue dCi', power: '100 ch', conso: '4,1 L/100 km', color: 'Gris Titanium', minDays: 1, updated: '2026-11-12', stock: { Casablanca: 3, Marrakech: 2, Rabat: 2, Tanger: 2, Agadir: 1 } },
  3: { ref: 'AL-0315', km: 12650, engine: '1.2 PureTech', power: '100 ch', conso: '5,4 L/100 km', color: 'Blanc Nacré', minDays: 1, updated: '2026-11-08', stock: { Casablanca: 2, Marrakech: 2, Tanger: 1, Essaouira: 1 } },
  4: { ref: 'AL-0421', km: 21300, engine: '2.0 TDI', power: '150 ch', conso: '4,8 L/100 km', color: 'Bleu Atlantique', minDays: 2, updated: '2026-11-01', stock: { Casablanca: 2, Rabat: 1, Marrakech: 1 } },
  5: { ref: 'AL-0518', km: 6200, engine: '1.6 T-GDI hybride', power: '230 ch', conso: '5,7 L/100 km', color: 'Gris Shadow', minDays: 2, updated: '2026-11-11', stock: { Casablanca: 2, Marrakech: 2, Agadir: 1, Tanger: 1 } },
  6: { ref: 'AL-0603', km: 24800, engine: '2.8 D-4D', power: '204 ch', conso: '8,9 L/100 km', color: 'Blanc Platine', minDays: 3, updated: '2026-10-29', stock: { Marrakech: 2, Agadir: 1, Fès: 1 } },
  7: { ref: 'AL-0709', km: 31200, engine: '1.5 dCi', power: '110 ch', conso: '5,1 L/100 km', color: 'Gris Platine', minDays: 2, updated: '2026-11-05', stock: { Casablanca: 2, Marrakech: 1, Rabat: 1, Oujda: 1 } },
  8: { ref: 'AL-0802', km: 7900, engine: 'C 220 d', power: '200 ch', conso: '5,0 L/100 km', color: 'Noir Obsidienne', minDays: 2, updated: '2026-11-09', stock: { Casablanca: 2, Marrakech: 1 } },
  9: { ref: 'AL-0901', km: 5400, engine: 'P440e hybride', power: '440 ch', conso: '1,0 L/100 km (hybride)', color: 'Gris Carpathian', minDays: 3, updated: '2026-11-07', stock: { Casablanca: 1, Marrakech: 1 } },
  10: { ref: 'AL-1004', km: 28700, engine: '2.0 Blue dCi', power: '150 ch', conso: '7,4 L/100 km', color: 'Blanc Glacier', minDays: 2, updated: '2026-10-25', stock: { Casablanca: 1, Marrakech: 1, Agadir: 1 } },
  11: { ref: 'AL-1102', km: 11800, engine: 'Propulsion électrique', power: '283 ch', conso: '14 kWh/100 km', color: 'Blanc Perle', minDays: 2, updated: '2026-11-03', stock: { Casablanca: 1, Rabat: 1 } },
  12: { ref: 'AL-1210', km: 42300, engine: '1.0 Hybrid', power: '70 ch', conso: '4,8 L/100 km', color: 'Bleu Dipinto', minDays: 1, updated: '2026-09-18', stock: {} }
};
CARS.forEach(c => Object.assign(c, CAR_INFO[c.id]));

// Time-limited offers ("annonces"). Car offers lower the daily price automatically while active.
const OFFERS = [
  { id: 'fin-annee', title: 'Citadines de fin d\'année', text: 'La Clio 5 et la 208 passent à −15 % sur toutes les dates, réservations comprises jusqu\'au 5 janvier.', rate: 0.15, cars: [2, 3], ends: '2027-01-05', cta: 'Voir les citadines', filter: 'Citadine' },
  { id: 'familles', title: 'Vacances en famille', text: '−20 % sur nos 7 et 9 places pendant les vacances scolaires. Siège bébé offert sur demande.', rate: 0.20, cars: [7, 10], ends: '2026-12-31', cta: 'Voir les 7 places', seats: 7 },
  { id: 'suv', title: 'Tucson hybride', text: 'Nos nouveaux Tucson à −10 % jusqu\'à la fin du mois, le temps de les faire connaître.', rate: 0.10, cars: [5], ends: '2026-11-30', cta: 'Voir le Tucson', filter: 'SUV' },
  { id: 'bienvenue', title: 'Première location', text: '10 % de remise sur votre première réservation en ligne, cumulable avec la remise durée.', code: 'BIENVENUE10', ends: '2027-06-30', cta: 'Copier le code' }
];

const NEWS = [
  { date: '2026-11-02', title: 'Nouveau comptoir à l\'aéroport de Tanger', text: 'Hall des arrivées, à droite après la douane. Ouvert de 8h à 22h, et sur rendez-vous pour les vols de nuit.' },
  { date: '2026-10-18', title: 'Six Tucson hybrides rejoignent la flotte', text: 'Livrés en octobre, disponibles à Casablanca, Marrakech, Agadir et Tanger.' },
  { date: '2026-09-30', title: 'Paiement par virement accepté', text: 'Pour les locations de plus de 7 jours. Le RIB est envoyé avec la confirmation.' },
  { date: '2026-09-10', title: 'Horaires d\'hiver à Essaouira', text: 'L\'agence ouvre de 9h à 19h jusqu\'au 31 mars. Remise des clés possible en dehors sur demande.' }
];

const todayISO = () => new Date().toISOString().slice(0, 10);
const activeOffers = () => OFFERS.filter(o => o.ends >= todayISO());
const carOffer = c => activeOffers().find(o => o.cars && o.cars.includes(c.id));
const dayPrice = c => { const o = carOffer(c); return o ? Math.round(c.price * (1 - o.rate)) : c.price; };
const daysLeft = iso => Math.ceil((new Date(iso + 'T23:59:59') - new Date()) / 864e5);

const AGENCIES = [
  { city: 'Casablanca', address: '123 Bd Mohammed V', phone: '+212 522 00 00 00', hours: '24h/24', airport: 'Aéroport Mohammed V' },
  { city: 'Marrakech', address: 'Av. Mohammed VI, Guéliz', phone: '+212 524 00 00 00', hours: '24h/24', airport: 'Aéroport Menara' },
  { city: 'Rabat', address: 'Av. Hassan II, Agdal', phone: '+212 537 00 00 00', hours: '8h - 22h', airport: 'Aéroport Rabat-Salé' },
  { city: 'Tanger', address: 'Bd Pasteur', phone: '+212 539 00 00 00', hours: '8h - 22h', airport: 'Aéroport Ibn Battouta' },
  { city: 'Agadir', address: 'Bd du 20 Août', phone: '+212 528 00 00 00', hours: '24h/24', airport: 'Aéroport Al Massira' },
  { city: 'Fès', address: 'Av. Hassan II', phone: '+212 535 00 00 00', hours: '8h - 22h', airport: 'Aéroport Fès-Saïss' },
  { city: 'Oujda', address: 'Bd Mohammed V', phone: '+212 536 00 00 00', hours: '8h - 20h', airport: 'Aéroport Angads' },
  { city: 'Essaouira', address: 'Av. Al Massira', phone: '+212 524 00 00 01', hours: '9h - 19h', airport: '' }
];

const EXTRAS = [
  { id: 'gps', name: 'GPS', desc: 'Navigation hors ligne', icon: 'fa-location-arrow', price: 30, perDay: true },
  { id: 'baby', name: 'Siège bébé', desc: '0 - 4 ans', icon: 'fa-baby', price: 25, perDay: true },
  { id: 'booster', name: 'Rehausseur enfant', desc: '4 - 10 ans', icon: 'fa-child', price: 20, perDay: true },
  { id: 'driver2', name: 'Conducteur additionnel', desc: 'Offert à partir de 4 jours', icon: 'fa-user-plus', price: 40, perDay: true },
  { id: 'wifi', name: 'Wi-Fi 4G portable', desc: 'Internet illimité', icon: 'fa-wifi', price: 35, perDay: true },
  { id: 'fuel', name: 'Plein de carburant', desc: 'Rendez la voiture sans faire le plein', icon: 'fa-gas-pump', price: 500, perDay: false },
  { id: 'chauffeur', name: 'Chauffeur privé', desc: '8h / jour', icon: 'fa-user-tie', price: 400, perDay: true }
];

const INSURANCE = [
  { id: 'basic', name: 'Assurance de base', desc: 'Responsabilité civile — franchise selon catégorie', price: 0, depositRate: 1 },
  { id: 'plus', name: 'Assurance Plus', desc: 'Franchise réduite de 50%', price: 60, depositRate: 0.5 },
  { id: 'full', name: 'Tous risques (0 franchise)', desc: 'Aucune franchise, bris de glace & pneus inclus', price: 120, depositRate: 0 }
];

const PROMOS = { BIENVENUE10: 0.10, ETE2026: 0.15, VIP20: 0.20 };
const ONE_WAY_FEE = 300;
const YOUNG_DRIVER_FEE = 50;

const TESTIMONIALS = [
  { name: 'Youssef E.', city: 'Casablanca', car: 'Clio 5', rating: 5, text: 'Vol en retard de deux heures, l\'agent m\'attendait quand même à la sortie. La voiture avait 8 000 km.' },
  { name: 'Sarah M.', city: 'Lyon', car: 'Land Cruiser', rating: 5, text: 'Dix jours entre Merzouga et Zagora sans un souci. Ils ont répondu sur WhatsApp un dimanche soir en dix minutes.' },
  { name: 'Khadija B.', city: 'Rabat', car: 'Peugeot 208', rating: 4, text: 'Le prix sur le site était exactement celui de la facture. Seul bémol, un peu d\'attente au retour à Rabat-Salé.' },
  { name: 'Ahmed T.', city: 'Marrakech', car: 'Dacia Logan', rating: 5, text: 'Je loue chez eux chaque été depuis 2019. Le tarif au mois est imbattable, et la caution est rendue le jour même.' }
];

const FAQ = [
  { q: 'Quels documents dois-je fournir ?', a: 'Un permis de conduire valide depuis au moins 2 ans, une CIN ou un passeport, et une carte bancaire au nom du conducteur pour la caution.' },
  { q: 'Quel est l\'âge minimum pour louer ?', a: '21 ans minimum. Un supplément jeune conducteur de 50 DH/jour s\'applique pour les moins de 25 ans.' },
  { q: 'Le kilométrage est-il illimité ?', a: 'Oui, toutes nos locations incluent le kilométrage illimité partout au Maroc.' },
  { q: 'Comment fonctionne la caution ?', a: 'La caution est bloquée (non débitée) sur votre carte au départ et libérée au retour du véhicule. Son montant dépend de la catégorie et diminue avec les assurances complémentaires.' },
  { q: 'Puis-je annuler ma réservation ?', a: 'Oui, l\'annulation est gratuite jusqu\'à 48h avant le départ. Vous pouvez annuler directement depuis « Mes réservations ».' },
  { q: 'Puis-je rendre la voiture dans une autre ville ?', a: 'Oui, la location aller simple est possible entre toutes nos agences moyennant un supplément de 300 DH.' },
  { q: 'Puis-je sortir du Maroc avec la voiture ?', a: 'Non, nos véhicules ne peuvent pas quitter le territoire marocain.' },
  { q: 'Que se passe-t-il en cas de panne ou d\'accident ?', a: 'Notre assistance 24/7 intervient partout au Maroc et vous fournit un véhicule de remplacement si nécessaire.' }
];

/* ================= HELPERS ================= */
const $ = (s, el = document) => el.querySelector(s);
const $$ = (s, el = document) => [...el.querySelectorAll(s)];
const fmt = n => Math.round(n).toLocaleString('fr-FR') + ' DH';
const store = {
  get: (k, d) => { try { return JSON.parse(localStorage.getItem(k)) ?? d; } catch { return d; } },
  set: (k, v) => localStorage.setItem(k, JSON.stringify(v))
};
const PLACEHOLDER = 'data:image/svg+xml;utf8,' + encodeURIComponent(
  '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 400 260"><rect width="400" height="260" fill="#e2dbcd"/><g fill="none" stroke="#8a8478" stroke-width="2"><path d="M110 165h180M120 165l18-36c4-7 10-11 18-11h88c8 0 14 4 18 11l18 36"/><circle cx="150" cy="168" r="14"/><circle cx="250" cy="168" r="14"/></g></svg>');
const imgTag = (src, alt) => `<img src="${src}" alt="${alt}" loading="lazy" onerror="this.onerror=null;this.src='${PLACEHOLDER}'">`;
const toISO = d => { const z = new Date(d); z.setMinutes(z.getMinutes() - z.getTimezoneOffset()); return z.toISOString().slice(0, 10); };
const addDays = (d, n) => { const x = new Date(d); x.setDate(x.getDate() + n); return x; };
const fmtDate = s => new Date(s).toLocaleDateString('fr-FR', { day: '2-digit', month: 'short', year: 'numeric' });

function toast(msg, type = '') {
  const t = $('#toast');
  t.textContent = msg;
  t.className = `toast show ${type}`;
  clearTimeout(t._timer);
  t._timer = setTimeout(() => t.classList.remove('show'), 3200);
}

// Billing: 24h blocks, with a 2h grace period before an extra day is charged
function rentalDays(startDate, startTime, endDate, endTime) {
  const start = new Date(`${startDate}T${startTime}`);
  const end = new Date(`${endDate}T${endTime}`);
  const hours = (end - start) / 36e5;
  if (isNaN(hours) || hours <= 0) return 0;
  const full = Math.floor(hours / 24);
  const rest = hours - full * 24;
  return Math.max(1, full + (rest > 2 ? 1 : 0));
}
const durationDiscount = days => days >= 14 ? 0.20 : days >= 4 ? 0.10 : 0;

/* ================= STATE ================= */
const state = {
  category: 'all',
  favorites: store.get('favorites', []),
  bookings: store.get('bookings', []),
  search: null,
  car: null,
  step: 1,
  promo: null,
  pendingCode: null
};

/* ================= THEME & NAV ================= */
function initTheme() {
  const btn = $('#themeToggle');
  const apply = dark => {
    document.body.classList.toggle('dark', dark);
    btn.innerHTML = `<i class="fa-solid fa-${dark ? 'sun' : 'moon'}"></i>`;
  };
  apply(store.get('dark', window.matchMedia('(prefers-color-scheme: dark)').matches));
  btn.addEventListener('click', () => {
    const dark = !document.body.classList.contains('dark');
    store.set('dark', dark);
    apply(dark);
  });
}

function initNav() {
  const links = $('#navLinks');
  $('#burger').addEventListener('click', () => links.classList.toggle('open'));
  $$('a', links).forEach(a => a.addEventListener('click', () => links.classList.remove('open')));

  const sections = $$('section[id]');
  const onScroll = () => {
    const y = window.scrollY;
    $('#navbar').classList.toggle('scrolled', y > 20);
    $('#backTop').classList.toggle('show', y > 600);
    let current = '';
    sections.forEach(s => { if (y >= s.offsetTop - 120) current = s.id; });
    $$('a', links).forEach(a => a.classList.toggle('active', a.getAttribute('href') === `#${current}`));
  };
  window.addEventListener('scroll', onScroll, { passive: true });
  onScroll();
  $('#backTop').addEventListener('click', () => window.scrollTo({ top: 0 }));
}

/* ================= HERO SEARCH ================= */
function fillCitySelects() {
  const opts = AGENCIES.map(a => `<option value="${a.city}">${a.city}${a.airport ? ' (+ aéroport)' : ''}</option>`).join('');
  $('#pickupLocation').insertAdjacentHTML('beforeend', opts);
  $('#returnLocation').innerHTML = opts;
  $('#bPickup').innerHTML = opts;
  $('#bReturn').innerHTML = opts;
  const cats = [...new Set(CARS.map(c => c.category))];
  $('#searchCategory').insertAdjacentHTML('beforeend', cats.map(c => `<option>${c}</option>`).join(''));
}

function setupDatePair(startEl, endEl) {
  const today = toISO(new Date());
  startEl.min = today;
  if (!startEl.value) startEl.value = toISO(addDays(new Date(), 1));
  if (!endEl.value) endEl.value = toISO(addDays(new Date(startEl.value), 3));
  endEl.min = startEl.value;
  startEl.addEventListener('change', () => {
    endEl.min = startEl.value;
    if (endEl.value < startEl.value) endEl.value = toISO(addDays(new Date(startEl.value), 1));
    endEl.dispatchEvent(new Event('change'));
  });
}

function initSearch() {
  const pd = $('#pickupDate'), rd = $('#returnDate');
  setupDatePair(pd, rd);
  $('#differentReturn').addEventListener('change', e => $('#returnWrap').classList.toggle('hidden', !e.target.checked));

  const updateSummary = () => {
    const d = rentalDays(pd.value, $('#pickupTime').value, rd.value, $('#returnTime').value);
    $('#searchSummary').textContent = d ? `${d} jour${d > 1 ? 's' : ''} facturé${d > 1 ? 's' : ''}${durationDiscount(d) ? `, remise de ${durationDiscount(d) * 100} % incluse` : ''}` : 'Le retour doit être après le départ';
  };
  ['change', 'input'].forEach(ev => [pd, rd, $('#pickupTime'), $('#returnTime')].forEach(el => el.addEventListener(ev, updateSummary)));
  updateSummary();

  $('#searchForm').addEventListener('submit', e => {
    e.preventDefault();
    const pickup = $('#pickupLocation').value;
    if (!pickup) { $('#pickupLocation').classList.add('invalid'); return toast('Veuillez choisir un lieu de prise en charge', 'error'); }
    $('#pickupLocation').classList.remove('invalid');
    if (!rentalDays(pd.value, $('#pickupTime').value, rd.value, $('#returnTime').value)) return toast('La date de retour doit être après la date de départ', 'error');
    state.search = {
      pickup,
      ret: $('#differentReturn').checked ? $('#returnLocation').value : pickup,
      startDate: pd.value, startTime: $('#pickupTime').value,
      endDate: rd.value, endTime: $('#returnTime').value
    };
    state.category = $('#searchCategory').value;
    renderTabs();
    renderCars();
    $('#flotte').scrollIntoView();
    toast(`Disponibilités à ${pickup} mises à jour`);
  });
}

/* ================= FLEET ================= */
function isBooked(carId, startDate, endDate) {
  return state.bookings.some(b => b.carId === carId && b.status === 'confirmed' && !(endDate < b.startDate || startDate > b.endDate));
}

function renderTabs() {
  const cats = ['all', ...new Set(CARS.map(c => c.category))];
  $('#categoryTabs').innerHTML = cats.map(c =>
    `<button data-cat="${c}" class="${state.category === c ? 'active' : ''}">${c === 'all' ? 'Toutes' : c}</button>`).join('');
}

function getFilteredCars() {
  const q = $('#carSearch').value.trim().toLowerCase();
  const tr = $('#filterTransmission').value;
  const fuel = $('#filterFuel').value;
  const seats = +$('#filterSeats').value;
  const max = +$('#priceRange').value;
  const onlyFav = $('#onlyFav').checked;
  const list = CARS.filter(c =>
    (state.category === 'all' || c.category === state.category) &&
    (!q || `${c.name} ${c.brand} ${c.category}`.toLowerCase().includes(q)) &&
    (tr === 'all' || c.transmission === tr) &&
    (fuel === 'all' || c.fuel === fuel) &&
    c.seats >= seats && dayPrice(c) <= max &&
    (!onlyFav || state.favorites.includes(c.id)));
  const sort = $('#sortBy').value;
  if (sort === 'priceAsc') list.sort((a, b) => dayPrice(a) - dayPrice(b));
  if (sort === 'priceDesc') list.sort((a, b) => dayPrice(b) - dayPrice(a));
  if (sort === 'rating') list.sort((a, b) => b.rating - a.rating);
  if (sort === 'offers') list.sort((a, b) => !!carOffer(b) - !!carOffer(a));
  return list;
}

const totalStock = c => Object.values(c.stock || {}).reduce((a, b) => a + b, 0);
const stockIn = (c, city) => (c.stock || {})[city] || 0;

// Returns '' when bookable, otherwise the reason shown to the user
function unavailableReason(c) {
  if (!c.available || !totalStock(c)) return 'Temporairement retirée de la location';
  if (state.search && !stockIn(c, state.search.pickup)) return `Pas en stock à ${state.search.pickup}`;
  if (state.search && isBooked(c.id, state.search.startDate, state.search.endDate)) return 'Déjà louée sur ces dates';
  return '';
}
const carAvailable = c => !unavailableReason(c);

function stockLabel(c) {
  if (!totalStock(c)) return 'Indisponible';
  if (state.search) {
    const n = stockIn(c, state.search.pickup);
    return n ? `${n} dispo à ${state.search.pickup}` : `Pas à ${state.search.pickup}`;
  }
  const cities = Object.keys(c.stock).length;
  return `${totalStock(c)} en parc · ${cities} agence${cities > 1 ? 's' : ''}`;
}

function renderCars() {
  const list = getFilteredCars();
  const days = state.search ? rentalDays(state.search.startDate, state.search.startTime, state.search.endDate, state.search.endTime) : 0;
  $('#resultsCount').textContent = `${list.length} annonce${list.length > 1 ? 's' : ''}` +
    (state.search ? ` — ${state.search.pickup}, du ${fmtDate(state.search.startDate)} au ${fmtDate(state.search.endDate)} (${days} j)` : '');

  if (!list.length) {
    $('#carsGrid').innerHTML = `<div class="empty"><strong>Rien ne correspond.</strong>Essayez d'élargir le budget ou d'enlever un filtre.</div>`;
    return;
  }
  $('#carsGrid').innerHTML = list.map(c => {
    const reason = unavailableReason(c);
    const fav = state.favorites.includes(c.id);
    const offer = carOffer(c);
    const price = dayPrice(c);
    const total = days ? `${fmt(price * days * (1 - durationDiscount(days)))} pour ${days} j` : 'par jour, TTC';
    return `
    <article class="car-card ${reason ? 'is-off' : ''}" id="voiture-${c.id}">
      <div class="car-img">
        ${imgTag(c.img, c.name)}
        <div class="badges">
          ${offer ? `<span class="tag tag-offer">−${Math.round(offer.rate * 100)} %</span>` : ''}
          ${c.tag ? `<span class="tag">${c.tag}</span>` : ''}
        </div>
        <button class="fav ${fav ? 'active' : ''}" data-fav="${c.id}" aria-label="${fav ? 'Retirer des' : 'Ajouter aux'} favoris"><i class="fa-${fav ? 'solid' : 'regular'} fa-heart"></i></button>
        ${reason ? `<div class="unavailable">${reason}</div>` : ''}
      </div>
      <div class="car-body">
        <p class="car-meta"><span class="mono">${c.ref}</span><span class="stock ${reason ? 'off' : ''}">${stockLabel(c)}</span></p>
        <div class="car-top">
          <h4>${c.name}</h4>
          <span class="rating">${c.rating.toFixed(1)} · ${c.reviews} avis</span>
        </div>
        <p class="car-sub">${c.category}, ${c.year} · ${c.km.toLocaleString('fr-FR')} km · ${c.power}</p>
        <p class="specs">${c.seats} places · ${c.transmission.toLowerCase()} · ${c.fuel.toLowerCase()} · ${c.bags} valise${c.bags > 1 ? 's' : ''}</p>
        <div class="car-foot">
          <div class="car-price">
            <strong>${price} DH${offer ? ` <s>${c.price}</s>` : ''}</strong>
            <small>${total}</small>
          </div>
          <div class="car-actions">
            <button class="btn btn-ghost btn-sm" data-details="${c.id}">Voir l'annonce</button>
            <button class="btn btn-primary btn-sm" data-book="${c.id}" ${reason ? 'disabled' : ''}>Réserver</button>
          </div>
        </div>
      </div>
    </article>`;
  }).join('');
}

function toggleFavorite(id) {
  const i = state.favorites.indexOf(id);
  if (i > -1) state.favorites.splice(i, 1); else state.favorites.push(id);
  store.set('favorites', state.favorites);
  updateCounters();
  renderCars();
  toast(i > -1 ? 'Retiré des favoris' : 'Ajouté aux favoris');
}

function updateCounters() {
  const favs = state.favorites.length;
  const books = state.bookings.filter(b => b.status === 'confirmed').length;
  $('#favCount').textContent = favs;
  $('#bookCount').textContent = books;
  $('#favCount').classList.toggle('on', favs > 0);
  $('#bookCount').classList.toggle('on', books > 0);
}

function initFleet() {
  renderTabs();
  renderCars();
  $('#categoryTabs').addEventListener('click', e => {
    const b = e.target.closest('button'); if (!b) return;
    state.category = b.dataset.cat;
    renderTabs(); renderCars();
  });
  ['#carSearch', '#filterTransmission', '#filterFuel', '#filterSeats', '#sortBy', '#onlyFav'].forEach(s =>
    $(s).addEventListener(s === '#carSearch' ? 'input' : 'change', renderCars));
  $('#priceRange').addEventListener('input', e => { $('#priceValue').textContent = e.target.value; renderCars(); });
  $('#resetFilters').addEventListener('click', () => {
    $('#carSearch').value = '';
    ['#filterTransmission', '#filterFuel', '#sortBy'].forEach(s => $(s).value = $(s).options[0].value);
    $('#filterSeats').value = '0';
    $('#priceRange').value = 2000; $('#priceValue').textContent = 2000;
    $('#onlyFav').checked = false;
    state.category = 'all';
    renderTabs(); renderCars();
  });
  $('#carsGrid').addEventListener('click', e => {
    const fav = e.target.closest('[data-fav]');
    const det = e.target.closest('[data-details]');
    const book = e.target.closest('[data-book]');
    if (fav) toggleFavorite(+fav.dataset.fav);
    if (det) openDetails(+det.dataset.details);
    if (book) openBooking(+book.dataset.book);
  });
  $('#favBtn').addEventListener('click', () => {
    $('#onlyFav').checked = !$('#onlyFav').checked;
    renderCars();
    $('#flotte').scrollIntoView();
  });
}

/* ================= MODALS ================= */
function openModal(id) { $(`#${id}`).classList.add('open'); document.body.classList.add('no-scroll'); }
function closeModal(el) {
  Controls.close();
  el.classList.remove('open');
  if (!$('.modal.open')) document.body.classList.remove('no-scroll');
  if (el.id === 'detailsModal' && location.hash.startsWith('#voiture-')) {
    try { history.replaceState(null, '', location.pathname + location.search); } catch { /* file:// in some browsers */ }
  }
}

function initModals() {
  $$('.modal').forEach(m => m.addEventListener('click', e => {
    if (e.target === m || e.target.closest('[data-close]')) closeModal(m);
  }));
  document.addEventListener('keydown', e => { if (e.key === 'Escape') $$('.modal.open').forEach(closeModal); });
  document.addEventListener('click', e => {
    const t = e.target.closest('[data-modal]');
    if (t) { e.preventDefault(); openModal(t.dataset.modal); }
  });
}

function openDetails(id) {
  const c = CARS.find(x => x.id === id);
  const reason = unavailableReason(c);
  const offer = carOffer(c);
  const price = dayPrice(c);
  const grid = [1, 7, 30].map(d => {
    const t = price * d * (1 - durationDiscount(d));
    return `<div><dt>${d === 1 ? '1 jour' : d + ' jours'}</dt><dd class="mono">${fmt(t)}</dd><small>${d > 1 ? fmt(t / d) + '/j' : 'tarif de base'}</small></div>`;
  }).join('');
  const similar = CARS.filter(x => x.id !== c.id && x.category === c.category && totalStock(x)).slice(0, 3);
  const row = (k, v) => `<tr><th>${k}</th><td>${v}</td></tr>`;

  $('#detailsContent').innerHTML = `
    <p class="listing-head"><span class="mono">Annonce ${c.ref}</span><span>Mise à jour le ${fmtDate(c.updated)}</span></p>
    <div class="details-img">${imgTag(c.img, c.name)}${offer ? `<span class="tag tag-offer">${offer.title} · −${Math.round(offer.rate * 100)} %</span>` : ''}</div>
    <div class="car-top"><h3>${c.name}</h3><span class="rating">${c.rating.toFixed(1)} · ${c.reviews} avis</span></div>
    <p class="car-sub">${c.category}, ${c.year} · ${c.color}</p>

    <dl class="price-grid">${grid}</dl>

    <div class="tabs" role="tablist">
      <button class="active" data-tab="specs" role="tab">Fiche technique</button>
      <button data-tab="cond" role="tab">Conditions</button>
      <button data-tab="stock" role="tab">Disponibilité</button>
    </div>
    <div class="tab-panel active" data-panel="specs">
      <table class="spec-table">
        ${row('Kilométrage', c.km.toLocaleString('fr-FR') + ' km')}
        ${row('Motorisation', `${c.engine}, ${c.power}`)}
        ${row('Consommation', c.conso)}
        ${row('Boîte', c.transmission)}
        ${row('Carburant', c.fuel)}
        ${row('Places / portes', `${c.seats} / ${c.doors}`)}
        ${row('Coffre', `${c.bags} valise${c.bags > 1 ? 's' : ''}`)}
        ${row('Couleur', c.color)}
      </table>
      <h4>Équipements</h4>
      <ul class="features-list">${c.features.map(f => `<li>${f}</li>`).join('')}<li>Climatisation</li><li>Kit de sécurité et roue de secours</li></ul>
    </div>
    <div class="tab-panel" data-panel="cond">
      <table class="spec-table">
        ${row('Durée minimale', c.minDays > 1 ? `${c.minDays} jours` : '1 jour')}
        ${row('Âge minimum', c.price >= 1000 ? '25 ans, 3 ans de permis' : '21 ans, 2 ans de permis')}
        ${row('Caution', `${fmt(c.deposit)} (réduite à ${fmt(c.deposit / 2)} avec l'assurance Plus)`)}
        ${row('Kilométrage', 'Illimité')}
        ${row('Carburant', 'Rendu au même niveau')}
        ${row('Sortie du territoire', 'Non autorisée')}
      </table>
    </div>
    <div class="tab-panel" data-panel="stock">
      <ul class="stock-list">
        ${AGENCIES.map(a => { const n = stockIn(c, a.city); return `<li class="${n ? '' : 'off'}"><span>${a.city}</span><span class="mono">${n ? `${n} disponible${n > 1 ? 's' : ''}` : '—'}</span></li>`; }).join('')}
      </ul>
      <p class="hint">Pas dans votre ville ? On peut l'acheminer depuis l'agence la plus proche, comptez 48h et 300 DH.</p>
    </div>

    ${similar.length ? `<h4 class="similar-title">Dans la même catégorie</h4>
    <div class="similar">${similar.map(s => `<button data-similar="${s.id}">${imgTag(s.img, s.name)}<span>${s.name}</span><small class="mono">${dayPrice(s)} DH/j</small></button>`).join('')}</div>` : ''}

    <div class="details-foot">
      <div class="car-price"><strong>${price} DH${offer ? ` <s>${c.price}</s>` : ''}</strong><small>par jour, TTC</small></div>
      <div class="car-actions">
        <button class="btn btn-ghost" id="shareCar" title="Copier le lien de l'annonce"><i class="fa-solid fa-link"></i> Partager</button>
        <button class="btn btn-primary" id="detailsBook" ${reason ? 'disabled' : ''}>${reason || 'Réserver cette voiture'}</button>
      </div>
    </div>`;

  const box = $('#detailsContent');
  $$('.tabs button', box).forEach(b => b.onclick = () => {
    $$('.tabs button', box).forEach(x => x.classList.toggle('active', x === b));
    $$('.tab-panel', box).forEach(p => p.classList.toggle('active', p.dataset.panel === b.dataset.tab));
  });
  $$('[data-similar]', box).forEach(b => b.onclick = () => { openDetails(+b.dataset.similar); $('#detailsModal .modal-box').scrollTop = 0; });
  $('#detailsBook').onclick = () => { closeModal($('#detailsModal')); openBooking(id); };
  $('#shareCar').onclick = () => {
    const url = `${location.href.split('#')[0]}#voiture-${c.id}`;
    (navigator.clipboard ? navigator.clipboard.writeText(url) : Promise.reject())
      .then(() => toast('Lien de l\'annonce copié', 'success'))
      .catch(() => toast(url));
  };
  history.replaceState(null, '', `#voiture-${c.id}`);
  openModal('detailsModal');
}

function openFromHash() {
  const m = location.hash.match(/^#voiture-(\d+)$/);
  if (m && CARS.some(c => c.id === +m[1])) openDetails(+m[1]);
}

/* ================= BOOKING ================= */
function renderExtras() {
  $('#extrasList').innerHTML = EXTRAS.map(x => `
    <label class="extra">
      <span class="info"><input type="checkbox" name="extra" value="${x.id}"><i class="fa-solid ${x.icon}"></i>
        <span>${x.name}<small>${x.desc}</small></span></span>
      <span class="cost">${x.price} DH${x.perDay ? '/j' : ''}</span>
    </label>`).join('');
  $('#insuranceList').innerHTML = INSURANCE.map((x, i) => `
    <label class="extra">
      <span class="info"><input type="radio" name="insurance" value="${x.id}" ${i === 0 ? 'checked' : ''}><i class="fa-solid fa-shield-halved"></i>
        <span>${x.name}<small>${x.desc}</small></span></span>
      <span class="cost">${x.price ? `+${x.price} DH/j` : 'Inclus'}</span>
    </label>`).join('');
}

function openBooking(id) {
  state.car = CARS.find(c => c.id === id);
  state.step = 1;
  state.promo = null;
  const f = $('#bookingForm');
  f.reset();
  $('#promoMsg').textContent = '';
  if (state.pendingCode) $('#promoCode').value = state.pendingCode;
  $('#bookingError').textContent = '';
  $$('.invalid', f).forEach(el => el.classList.remove('invalid'));

  const s = state.search;
  const sd = $('#bStartDate'), ed = $('#bEndDate');
  sd.value = s ? s.startDate : toISO(addDays(new Date(), 1));
  ed.value = s ? s.endDate : toISO(addDays(new Date(sd.value), 3));
  $('#bStartTime').value = s ? s.startTime : '10:00';
  $('#bEndTime').value = s ? s.endTime : '10:00';
  const home = Object.keys(state.car.stock || {})[0] || AGENCIES[0].city;
  $('#bPickup').value = s ? s.pickup : home;
  $('#bReturn').value = s ? s.ret : home;
  sd.min = toISO(new Date());
  ed.min = sd.value;

  toggleCardFields();
  showStep();
  updateSummary();
  openModal('bookingModal');
}

function computePrice() {
  const c = state.car;
  const days = rentalDays($('#bStartDate').value, $('#bStartTime').value, $('#bEndDate').value, $('#bEndTime').value);
  const lines = [];
  if (!c || !days) return { days: 0, total: 0, lines, deposit: 0 };

  const offer = carOffer(c);
  const base = c.price * days;
  lines.push([`${c.price} DH × ${days} jour${days > 1 ? 's' : ''}`, base]);
  let total = base;
  if (offer) { const v = (dayPrice(c) - c.price) * days; lines.push([`${offer.title} (−${Math.round(offer.rate * 100)} %)`, v, 'discount']); total += v; }

  const disc = durationDiscount(days);
  if (disc) { const v = -total * disc; lines.push([`Remise durée (-${disc * 100}%)`, v, 'discount']); total += v; }

  $$('input[name="extra"]:checked').forEach(inp => {
    const x = EXTRAS.find(e => e.id === inp.value);
    let cost = x.perDay ? x.price * days : x.price;
    if (x.id === 'driver2' && days >= 4) cost = 0;
    lines.push([x.name + (x.perDay ? ` (${days} j)` : ''), cost]);
    total += cost;
  });

  const ins = INSURANCE.find(i => i.id === ($('input[name="insurance"]:checked') || {}).value) || INSURANCE[0];
  if (ins.price) { lines.push([ins.name, ins.price * days]); total += ins.price * days; }

  const delivery = +$('#bDelivery').value;
  if (delivery) { lines.push(['Livraison', delivery]); total += delivery; }

  if ($('#bPickup').value !== $('#bReturn').value) { lines.push(['Aller simple (autre agence)', ONE_WAY_FEE]); total += ONE_WAY_FEE; }

  const birth = $('#dBirth').value;
  if (birth) {
    const age = getAge(birth);
    if (age >= 21 && age < 25) { lines.push(['Jeune conducteur', YOUNG_DRIVER_FEE * days]); total += YOUNG_DRIVER_FEE * days; }
  }

  if (state.promo) { const v = -total * PROMOS[state.promo]; lines.push([`Code ${state.promo}`, v, 'discount']); total += v; }

  return { days, total: Math.max(0, total), lines, deposit: c.deposit * ins.depositRate, insurance: ins };
}

function getAge(dateStr) {
  const b = new Date(dateStr), n = new Date();
  let age = n.getFullYear() - b.getFullYear();
  if (n < new Date(n.getFullYear(), b.getMonth(), b.getDate())) age--;
  return age;
}

function updateSummary() {
  const c = state.car; if (!c) return;
  const p = computePrice();
  $('#summaryCar').innerHTML = `<div class="summary-car">${imgTag(c.img, c.name)}<div><strong>${c.name}</strong><br><span class="summary-route">${c.category}, ${c.transmission.toLowerCase()}</span></div></div>
    <p class="summary-route">${$('#bPickup').value} → ${$('#bReturn').value}${p.days ? ` · ${p.days} jour${p.days > 1 ? 's' : ''}` : ''}</p>`;
  $('#summaryLines').innerHTML = p.days
    ? p.lines.map(([l, v, cls]) => `<li class="${cls || ''}"><span>${l}</span><span>${v === 0 ? 'Offert' : fmt(v)}</span></li>`).join('')
    : '<li><span>Dates invalides</span></li>';
  $('#summaryTotal').textContent = fmt(p.total);
  $('#summaryDeposit').textContent = `Caution : ${p.deposit ? fmt(p.deposit) : 'aucune'}. Kilométrage illimité.`;
}

function showStep() {
  $$('.bstep').forEach(s => s.classList.toggle('active', +s.dataset.step === state.step));
  $$('.stepper li').forEach(s => {
    const n = +s.dataset.step;
    s.classList.toggle('active', n === state.step);
    s.classList.toggle('done', n < state.step);
  });
  $('#prevStep').style.visibility = state.step === 1 ? 'hidden' : 'visible';
  $('#nextStep').classList.toggle('hidden', state.step === 4);
  $('#confirmBooking').classList.toggle('hidden', state.step !== 4);
  $('#bookingError').textContent = '';
  $('.modal-box.large', $('#bookingModal'))?.scrollTo?.(0, 0);
}

function validateStep(step) {
  const box = $(`.bstep[data-step="${step}"]`);
  let ok = true, msg = '';
  $$('input[required], select[required]', box).forEach(el => {
    const valid = el.type === 'checkbox' ? el.checked : el.checkValidity() && el.value.trim() !== '';
    el.classList.toggle('invalid', !valid);
    if (!valid) ok = false;
  });
  if (!ok) msg = 'Veuillez remplir correctement les champs obligatoires.';

  if (ok && step === 1) {
    const sd = $('#bStartDate').value, ed = $('#bEndDate').value;
    if (!rentalDays(sd, $('#bStartTime').value, ed, $('#bEndTime').value)) { ok = false; msg = 'La date de retour doit être postérieure à la date de départ.'; }
    else if (new Date(`${sd}T${$('#bStartTime').value}`) < new Date()) { ok = false; msg = 'La date de départ est déjà passée.'; }
    else if (isBooked(state.car.id, sd, ed)) { ok = false; msg = 'Ce véhicule est déjà réservé sur ces dates. Choisissez d\'autres dates.'; }
    else if (rentalDays(sd, $('#bStartTime').value, ed, $('#bEndTime').value) < (state.car.minDays || 1)) { ok = false; msg = `Cette voiture se loue au minimum ${state.car.minDays} jours.`; }
    else if (!stockIn(state.car, $('#bPickup').value)) { ok = false; msg = `Pas de ${state.car.name} à ${$('#bPickup').value}. Disponible à : ${Object.keys(state.car.stock).join(', ')}.`; $('#bPickup').classList.add('invalid'); }
  }
  if (ok && step === 3) {
    const premium = state.car.price >= 1000;
    const minAge = premium ? 25 : 21, minLicense = premium ? 3 : 2;
    const age = getAge($('#dBirth').value);
    const licenseYears = getAge($('#dLicenseDate').value);
    if (age < minAge) { ok = false; msg = `Le conducteur doit avoir au moins ${minAge} ans pour cette voiture.`; $('#dBirth').classList.add('invalid'); }
    else if (licenseYears < minLicense) { ok = false; msg = `Le permis doit avoir au moins ${minLicense} ans.`; $('#dLicenseDate').classList.add('invalid'); }
  }
  if (ok && step === 4 && $('input[name="pay"]:checked').value === 'card') {
    const num = $('#cardNumber').value.replace(/\s/g, '');
    const exp = $('#cardExp').value;
    const [mm, yy] = exp.split('/').map(Number);
    const expDate = new Date(2000 + yy, mm);
    if (!/^\d{16}$/.test(num) || !luhn(num)) { ok = false; msg = 'Numéro de carte invalide.'; $('#cardNumber').classList.add('invalid'); }
    else if (!/^\d{2}\/\d{2}$/.test(exp) || mm < 1 || mm > 12 || expDate < new Date()) { ok = false; msg = 'Date d\'expiration invalide.'; $('#cardExp').classList.add('invalid'); }
    else if (!/^\d{3,4}$/.test($('#cardCvv').value)) { ok = false; msg = 'CVV invalide.'; $('#cardCvv').classList.add('invalid'); }
  }
  $('#bookingError').textContent = msg;
  return ok;
}

function luhn(num) {
  let sum = 0;
  for (let i = 0; i < num.length; i++) {
    let d = +num[num.length - 1 - i];
    if (i % 2) { d *= 2; if (d > 9) d -= 9; }
    sum += d;
  }
  return sum % 10 === 0;
}

function toggleCardFields() {
  $('#cardFields').classList.toggle('hidden', $('input[name="pay"]:checked').value !== 'card');
}

function initBooking() {
  renderExtras();
  setupDatePair($('#bStartDate'), $('#bEndDate'));
  const form = $('#bookingForm');
  form.addEventListener('change', updateSummary);
  form.addEventListener('input', e => { e.target.classList?.remove('invalid'); if (e.target.type === 'date' || e.target.type === 'time') updateSummary(); });
  $$('input[name="pay"]').forEach(r => r.addEventListener('change', toggleCardFields));

  $('#nextStep').addEventListener('click', () => { if (validateStep(state.step)) { state.step++; showStep(); } });
  $('#prevStep').addEventListener('click', () => { state.step--; showStep(); });

  $('#cardNumber').addEventListener('input', e => {
    e.target.value = e.target.value.replace(/\D/g, '').slice(0, 16).replace(/(.{4})(?=.)/g, '$1 ');
  });
  $('#cardExp').addEventListener('input', e => {
    let v = e.target.value.replace(/\D/g, '').slice(0, 4);
    if (v.length > 2) v = v.slice(0, 2) + '/' + v.slice(2);
    e.target.value = v;
  });
  $('#cardCvv').addEventListener('input', e => e.target.value = e.target.value.replace(/\D/g, ''));

  $('#applyPromo').addEventListener('click', () => {
    const code = $('#promoCode').value.trim().toUpperCase();
    const msg = $('#promoMsg');
    if (PROMOS[code]) {
      state.promo = code;
      msg.textContent = `Code ${code} appliqué, ${PROMOS[code] * 100} % de remise.`;
      msg.className = 'promo-msg ok';
    } else {
      state.promo = null;
      msg.textContent = 'Ce code n\'existe pas ou a expiré.';
      msg.className = 'promo-msg err';
    }
    updateSummary();
  });

  form.addEventListener('submit', e => {
    e.preventDefault();
    for (let s = 1; s <= 4; s++) {
      if (!validateStep(s)) { state.step = s; showStep(); validateStep(s); return; }
    }
    const p = computePrice();
    const booking = {
      ref: 'AL-' + Date.now().toString(36).toUpperCase(),
      carId: state.car.id, carName: state.car.name, img: state.car.img,
      pickup: $('#bPickup').value, ret: $('#bReturn').value,
      startDate: $('#bStartDate').value, startTime: $('#bStartTime').value,
      endDate: $('#bEndDate').value, endTime: $('#bEndTime').value,
      days: p.days, total: Math.round(p.total), deposit: p.deposit,
      insurance: p.insurance.name,
      extras: $$('input[name="extra"]:checked').map(i => EXTRAS.find(x => x.id === i.value).name),
      driver: `${$('#dFirst').value} ${$('#dLast').value}`, email: $('#dEmail').value, phone: $('#dPhone').value,
      payment: $('input[name="pay"]:checked').value,
      status: 'confirmed', createdAt: new Date().toISOString()
    };
    state.bookings.unshift(booking);
    if (state.promo) state.pendingCode = null;
    store.set('bookings', state.bookings);
    updateCounters();
    renderCars();
    closeModal($('#bookingModal'));
    showConfirmation(booking);
  });
}

function showConfirmation(b) {
  const payTxt = { card: 'Payé par carte', agency: 'À payer à l\'agence', transfer: 'Virement en attente' }[b.payment];
  const waText = encodeURIComponent(`Bonjour, ma réservation ${b.ref} : ${b.carName}, du ${b.startDate} au ${b.endDate} à ${b.pickup}.`);
  $('#confirmContent').innerHTML = `
    <p class="ok-mark">Réservation enregistrée</p>
    <h3>C'est noté, ${b.driver.split(' ')[0]}.</h3>
    <p>Le récapitulatif part à <strong>${b.email}</strong>. Un agent vous appelle la veille pour caler l'heure exacte.</p>
    <span class="ref">${b.ref}</span>
    <ul class="summary-lines">
      <li><span>Voiture</span><span>${b.carName}</span></li>
      <li><span>Départ</span><span>${b.pickup}, ${fmtDate(b.startDate)} ${b.startTime}</span></li>
      <li><span>Retour</span><span>${b.ret}, ${fmtDate(b.endDate)} ${b.endTime}</span></li>
      <li><span>Durée</span><span>${b.days} j</span></li>
      <li><span>Paiement</span><span>${payTxt}</span></li>
      <li><span>Total TTC</span><span>${fmt(b.total)}</span></li>
    </ul>
    <div class="confirm-actions">
      <a class="btn btn-primary" target="_blank" rel="noopener" href="https://wa.me/212600000000?text=${waText}"><i class="fa-brands fa-whatsapp"></i> Envoyer sur WhatsApp</a>
      <button class="btn btn-ghost" onclick="window.print()">Imprimer</button>
    </div>`;
  openModal('confirmModal');
}

/* ================= MY BOOKINGS ================= */
function renderMyBookings() {
  const list = $('#myBookingsList');
  if (!state.bookings.length) {
    list.innerHTML = '<div class="empty"><strong>Aucune réservation.</strong>Vos locations apparaîtront ici, sur cet appareil.</div>';
    return;
  }
  list.innerHTML = state.bookings.map(b => {
    const hoursBefore = (new Date(`${b.startDate}T${b.startTime}`) - new Date()) / 36e5;
    const canCancel = b.status === 'confirmed' && hoursBefore > 0;
    return `
    <div class="booking-item">
      ${imgTag(b.img, b.carName)}
      <div class="info">
        <strong>${b.carName}</strong><span class="status ${b.status}">${b.status === 'confirmed' ? 'Confirmée' : 'Annulée'}</span><br>
        <span class="mono">${b.ref}</span> · ${b.pickup} → ${b.ret}<br>
        ${fmtDate(b.startDate)} ${b.startTime} → ${fmtDate(b.endDate)} ${b.endTime} · ${b.days} j · <span class="mono">${fmt(b.total)}</span>
      </div>
      ${canCancel ? `<button class="btn btn-ghost btn-sm" data-cancel="${b.ref}">Annuler</button>` : ''}
    </div>`;
  }).join('');
}

function initMyBookings() {
  $('#myBookingsBtn').addEventListener('click', () => { renderMyBookings(); openModal('myBookingsModal'); });
  $('#myBookingsList').addEventListener('click', e => {
    const btn = e.target.closest('[data-cancel]'); if (!btn) return;
    const b = state.bookings.find(x => x.ref === btn.dataset.cancel);
    const hoursBefore = (new Date(`${b.startDate}T${b.startTime}`) - new Date()) / 36e5;
    const refund = hoursBefore >= 48 ? '100%' : hoursBefore >= 24 ? '50%' : '0%';
    if (!confirm(`Annuler la réservation ${b.ref} ?\nRemboursement : ${refund}`)) return;
    b.status = 'cancelled';
    store.set('bookings', state.bookings);
    updateCounters(); renderMyBookings(); renderCars();
    toast(`Réservation annulée, remboursement ${refund}`, 'success');
  });
}

/* ================= CONTENT SECTIONS ================= */
function renderAgencies() {
  $('#agenciesGrid').innerHTML = AGENCIES.map(a => `
    <div class="agency">
      <h4>${a.city}</h4>
      <span>${a.address}</span>
      <a class="phone" href="tel:${a.phone.replace(/\s/g, '')}">${a.phone}</a>
      <span class="hours">${a.hours}</span>
      <span class="airport ${a.airport ? '' : 'none'}">${a.airport || 'Pas de comptoir aéroport'}</span>
    </div>`).join('');
}

function initTestimonials() {
  const track = $('#testiTrack'), dots = $('#testiDots');
  track.innerHTML = TESTIMONIALS.map((t, i) => `
    <figure class="testi ${i === 0 ? 'active' : ''}">
      <blockquote>${t.text}</blockquote>
      <footer><strong>${t.name}</strong>, ${t.city} — ${t.car}, ${t.rating}/5</footer>
    </figure>`).join('');
  dots.innerHTML = TESTIMONIALS.map((_, i) => `<button class="${i === 0 ? 'active' : ''}" data-i="${i}" aria-label="Avis ${i + 1}"></button>`).join('');
  let idx = 0, timer;
  const go = i => {
    idx = (i + TESTIMONIALS.length) % TESTIMONIALS.length;
    $$('.testi', track).forEach((el, k) => el.classList.toggle('active', k === idx));
    $$('button', dots).forEach((el, k) => el.classList.toggle('active', k === idx));
    clearInterval(timer); timer = setInterval(() => go(idx + 1), 7000);
  };
  $('#prevTesti').onclick = () => go(idx - 1);
  $('#nextTesti').onclick = () => go(idx + 1);
  dots.addEventListener('click', e => { if (e.target.dataset.i) go(+e.target.dataset.i); });
  go(0);
}

function initFaq() {
  $('#faqList').innerHTML = FAQ.map(f => `
    <div class="faq-item">
      <button class="faq-q" aria-expanded="false">${f.q}<span class="sign">+</span></button>
      <div class="faq-a"><p>${f.a}</p></div>
    </div>`).join('');
  $('#faqList').addEventListener('click', e => {
    const q = e.target.closest('.faq-q'); if (!q) return;
    const item = q.parentElement;
    const open = item.classList.contains('open');
    $$('.faq-item').forEach(i => { i.classList.remove('open'); $('.faq-q', i).setAttribute('aria-expanded', 'false'); $('.faq-a', i).style.maxHeight = null; });
    if (!open) { item.classList.add('open'); q.setAttribute('aria-expanded', 'true'); const a = $('.faq-a', item); a.style.maxHeight = a.scrollHeight + 'px'; }
  });
}

function initForms() {
  $('#contactForm').addEventListener('submit', e => {
    e.preventDefault();
    const f = e.target;
    let ok = true;
    $$('[required]', f).forEach(el => { const v = el.checkValidity() && el.value.trim(); el.classList.toggle('invalid', !v); if (!v) ok = false; });
    if (!ok) return toast('Il manque quelque chose dans le formulaire', 'error');
    f.reset();
    toast('Message reçu, on vous répond dans l\'heure', 'success');
  });
  $('#contactForm').addEventListener('input', e => e.target.classList.remove('invalid'));
  $('#newsletterForm').addEventListener('submit', e => {
    e.preventDefault();
    const subs = store.get('newsletter', []);
    const email = $('input', e.target).value.trim().toLowerCase();
    if (subs.includes(email)) return toast('Cette adresse est déjà inscrite');
    subs.push(email); store.set('newsletter', subs);
    e.target.reset();
    toast('Inscription confirmée', 'success');
  });
}

/* ================= ANIMATIONS ================= */
function initAnimations() {
  const counters = new IntersectionObserver(entries => entries.forEach(en => {
    if (!en.isIntersecting) return;
    const el = en.target, target = +el.dataset.count, start = performance.now();
    const tick = now => {
      const p = Math.min(1, (now - start) / 1500);
      el.textContent = Math.floor(target * p).toLocaleString('fr-FR');
      if (p < 1) requestAnimationFrame(tick);
    };
    requestAnimationFrame(tick);
    counters.unobserve(el);
  }));
  $$('[data-count]').forEach(el => counters.observe(el));
}

/* ================= ANNONCES ================= */
function initAnnounceBar() {
  const bar = $('#announceBar');
  if (store.get('announceClosed', '') === todayISO()) { bar.remove(); return; }
  const items = [
    ...activeOffers().map(o => `<strong>${o.title}</strong> — ${o.code ? `code <span class="mono">${o.code}</span>` : `−${Math.round(o.rate * 100)} %`} jusqu'au ${fmtDate(o.ends)}`),
    ...NEWS.slice(0, 2).map(n => `<strong>Nouveau</strong> — ${n.title}`)
  ];
  const track = $('#announceText');
  let i = 0;
  const show = () => {
    track.classList.remove('in');
    setTimeout(() => { track.innerHTML = `<a href="#offres">${items[i]}</a>`; track.classList.add('in'); i = (i + 1) % items.length; }, 250);
  };
  show();
  const timer = setInterval(show, 5000);
  $('#announceClose').onclick = () => { clearInterval(timer); store.set('announceClosed', todayISO()); bar.remove(); };
}

function renderOffers() {
  const offers = activeOffers();
  $('#offersList').innerHTML = offers.map(o => {
    const left = daysLeft(o.ends);
    return `
    <article class="ticket">
      <div class="ticket-main">
        <span class="ticket-rate">${o.code ? '−10 %' : `−${Math.round(o.rate * 100)} %`}</span>
        <h4>${o.title}</h4>
        <p>${o.text}</p>
        ${o.cars ? `<p class="ticket-cars">${o.cars.map(id => { const c = CARS.find(x => x.id === id); return `<button class="link-btn" data-offer-car="${id}">${c.name} <span class="mono">${dayPrice(c)} DH/j</span></button>`; }).join('')}</p>` : ''}
      </div>
      <div class="ticket-side">
        <p><span>Jusqu'au</span><strong>${fmtDate(o.ends)}</strong></p>
        <p class="left ${left <= 20 ? 'soon' : ''}">${left <= 1 ? 'Dernier jour' : `Encore ${left} jours`}</p>
        <button class="btn btn-ghost btn-sm" data-offer="${o.id}">${o.cta}</button>
      </div>
    </article>`;
  }).join('') || '<p class="empty">Pas d\'offre en cours. Revenez bientôt.</p>';

  $('#newsList').innerHTML = NEWS.map(n => `
    <li>
      <time class="mono" datetime="${n.date}">${fmtDate(n.date)}</time>
      <h5>${n.title}</h5>
      <p>${n.text}</p>
    </li>`).join('');

  $('#offersList').addEventListener('click', e => {
    const carBtn = e.target.closest('[data-offer-car]');
    if (carBtn) return openDetails(+carBtn.dataset.offerCar);
    const btn = e.target.closest('[data-offer]'); if (!btn) return;
    const o = OFFERS.find(x => x.id === btn.dataset.offer);
    if (o.code) {
      state.pendingCode = o.code;
      (navigator.clipboard ? navigator.clipboard.writeText(o.code) : Promise.reject()).catch(() => {});
      return toast(`Code ${o.code} copié, il sera proposé au paiement`, 'success');
    }
    $('#resetFilters').click();
    if (o.filter) state.category = o.filter;
    if (o.seats) $('#filterSeats').value = String(o.seats);
    $('#sortBy').value = 'offers';
    renderTabs(); renderCars();
    $('#flotte').scrollIntoView();
  });
}

function renderHeroStock() {
  const byCity = AGENCIES.map(a => ({ city: a.city, n: CARS.reduce((s, c) => s + (c.available ? stockIn(c, a.city) : 0), 0) }))
    .sort((a, b) => b.n - a.n);
  const total = byCity.reduce((s, x) => s + x.n, 0);
  $('#heroStock').innerHTML = `
    <p class="hs-title">En parc aujourd'hui <span class="mono">${total}</span></p>
    <ul>${byCity.slice(0, 4).map(x => `<li><span>${x.city}</span><span class="bar"><i style="width:${Math.round(x.n / byCity[0].n * 100)}%"></i></span><span class="mono">${x.n}</span></li>`).join('')}</ul>`;
}

/* ================= INIT ================= */
document.addEventListener('DOMContentLoaded', () => {
  $('#year').textContent = new Date().getFullYear();
  initAnnounceBar();
  initTheme();
  initNav();
  fillCitySelects();
  Controls.enhance();
  initSearch();
  initFleet();
  initModals();
  initBooking();
  initMyBookings();
  renderOffers();
  renderHeroStock();
  renderAgencies();
  initTestimonials();
  initFaq();
  initForms();
  updateCounters();
  initAnimations();
  openFromHash();
});
