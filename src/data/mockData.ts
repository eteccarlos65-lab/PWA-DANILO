import { Vehicle, PaintOption, WheelOption, CaliperOption, InteriorOption, SavedCar } from '../types';

export const APP_ASSETS = {
  logo: 'https://lh3.googleusercontent.com/aida/AEtjO1XXhqn0w2iJfa0mBrfztCKHZJDsVSzt704sZ82T5pXM1zB_uhv85hA4CU6835RJnN2ituUy--Z8XTBKWDOg3y7RMHmW1o30uQ347AfHoWrhBEcM2tFIlG6CLrDlLALaTIVdNiqQ4MzU0caAr2hY445nHgTIQPyLn44bR_NmOkj9STb3kBff2wp3igu-C5_D3PVleYD_-Ssb0olZWXbtif2voVRzb9fch4k6uXxDtWUKowfl4TY2HGOpfYIr',
  avatar: 'https://lh3.googleusercontent.com/aida-public/AB6AXuDdYsCT3IUEF1vX3IHQoBNudQ_u_5xb2JFBK5GHXKXJbpOp2cnVAvRgxzKx77zgGISy_b1_GCrJ787Fm8w3tPgIh0wlQDV79R3MaCqI-ulvA5SktOhUMvdko-mUB5xFg81KzlCOii3ZyETFc-fh--OYC3tE8m5IQ0v68WuzgHmbtfsEWtf-26YOG9XfMrLrJ7b8Myz1BeYNjTNQFzLTNKO9Lw8Fs-B0OTJuoj3fsexzHVsC029Jcc9MkQ',
  carlosConcierge: 'https://lh3.googleusercontent.com/aida-public/AB6AXuB7wlCo8qDMID4wOKq1cHCeqyb4yGVWZeGSjOEG1EjDIONlXe3uQiJhWHZDbKiYnppxP1zmq4WWOTPV3NdalMFnL-IqkqUDnTto6uT4DyqwVH-oX_lQd6PRpD88LNVECCu8shwWZePBHi9gg4Olr75WrpveeJFtI91G2x2zvjtNSedgTbbNM1U3MoiOouhNHUYFeklTw9SkFxFWCqHJjYCt8QVyZHxPZ3phGhuuOfwmIvAHFVvBaHi3HA',
  hyperionFront: 'https://lh3.googleusercontent.com/aida-public/AB6AXuA91BH1YoZ3JQ7f5ljaakQPd9vXU8j8yj6vfHwjT-u2faKuRUg-EPAVxVagyW88WQTDYkVareBMXcDlA1VCm4Bbs6Z51R4IxWHGp1gb5zxs0MXUYhX9JBql_EqdaMCGegJDw42zGCho5EEEPQ_CDil1Eu_kLdN7WKjle83caSn9sBvlaJThXVsqWDzLw_jqq-iv3NJZDEGwrzDTgaL2SBvduAsUk9CakQHJghA3SUWFM1xDNuwv2nabgQ',
  hyperionCockpit: 'https://lh3.googleusercontent.com/aida-public/AB6AXuB8UyadngHmm9N5Yz8nNJ_XQE-g6waH_mp_48xfoBshO7KdtNicyzXdgdqpAVfa6__VVPrNLpDaMosGLLWgq-zsJNbod6jGbZvBdXz69RspfaOa0Wfk0XQ43Ld1Mk5jRkFo618mrcvXWCaqcrU042Jp-pXp9gMjzRe591rnXvmgXBdBNL2optmUzQFaF8tHsZyVuWgkfnsdjQJqV6J7IjQ3stxao0fmTHiD52fLGb1QmFuCMkIdDjGYKA',
  hyperionRear: 'https://lh3.googleusercontent.com/aida-public/AB6AXuCTleYHzOIGPQkHqZOYnfojSOcOeWeUBjCsxvQJfMbB4-JY-1Po9Cehz45Av-cZXafZeSolQmaLC9lb6cdM-DnnjyTmJ5JBN49s7_3jILsxJ3sHWolAOe51WbtH_MTrA8Zfn53TtYe83t4qTkhQzoGuHK497dHOglM_WA3e5mpdxrIXJ8817FkFj0CZJ_AazTeGV14QqtIyYXndMsYYgrf6_AGQ5EeHwDDWmuOzXxXlUW1opcC-3iYCpg',
  nappaLeather: 'https://lh3.googleusercontent.com/aida-public/AB6AXuBftTwjBluDiqCRyVnU6bwxDRC5l6E_qm1okliur_yqfLsmnnXm95jdriTnsB0Wk40CEEen745mVT6FNwEjrqE3TD71BzJ825srJ4t9hx2nig1dBwFVTxGorNJlglzx-tBYOFYUN9eys3UiYEj4pWkv0Xv7H20GtB9P-Wg_Ie3iN_V8rK0iUR9-hyFNjDTEr1sHMnk7LrGcnOc2nUpl-ZiCa6YtcvRsMxZVyyQlv96kuPa_wCIv9MLqQQ',
  hyperionHero: 'https://lh3.googleusercontent.com/aida-public/AB6AXuC3d09EaCMbi5osHr5w4UNBjZjzrGmoBDX-MtIOmvM_h1vKM-tsvcNFGQn4iDzSLi2Q38WSAKwpn75PGtR0GiaUQHbwcw_gTR8iKeTClidsE4_09BRcvnZhtqFlT71RlA156jGQYhJ-zh2gC2PMhzIWStKb9rjZe0Jm-Ezu-7Lp1EU02rAYOQuo5Nj-Uj7zAr-jzwbI3JJzmPbMm76WnLvKNdgqpRDxss_CL9gp2SXRk8vexAL6c64DLA',
  chronosEV: 'https://lh3.googleusercontent.com/aida-public/AB6AXuBjwhz1pAIs0PXK0R5skH64cpptMSOFiw8tR_buNEgUKUYI-vTCuOZeFt2Ka4kVGCLTJ-ppMasFy5sLur2kwdw0y-aTcI3gq_jnBy7xzgtGNR8hak8C_WcYZW7bti7byKlRMnmSSLigPYOO1aF37tVxLHCsfGMzx8_k_foMMiZNlbH5SdpyHchuKiOgtLwRrEEjhukMUs18bSTCxGygUisbhiSeFdCGSwPr2nHuzA6ekNMm_WEZc-XyTg',
  veloceSpyder: 'https://lh3.googleusercontent.com/aida-public/AB6AXuAIrgtDy758MM68ttKnos4K3WjUlskikG0T0wkoVdBoziuytPOgd6zURUxtJCq0SgTcVrWt6PstS1vdzt-m3fpELyHumzHFGwOBAuYRTr-dg04UXRFT0PVKS101AP2izwM-BbMIdimmfSi5T2CcKTpr5Cze69eTGE_4P6xFlo69mIrD47h2m3BR_Mh9TSEge88kncGsZlb7-xvhkwC4vCS5-oxW5HtfM5IgS69nw-z1gVHyRYThQ9tO8Q',
  imperiumCoupe: 'https://lh3.googleusercontent.com/aida-public/AB6AXuAPnfioCWbCIuZIMOZAkMAbQTJ6oPZxFWw1yb9rRbGAJllsURkPNSZ2hziNre6aIaXcD-Fz2QHu7DJm_KQhv7HYfuI25Fjl-tx2GzPcU2LZW59dxw5b8oCQfyYvt5xI1PO4YSe_0Ra5ktned3X0cV-K83ri6MH3o3UQpeWMSGh0OZQmK_IxMjoqSxrT_wYkrsj8E4LdhEdA290gThbd7L_fQnOH2loyGB3xzWJgSrQ5QYb-CK5a47kEdw',
  heritage68: 'https://lh3.googleusercontent.com/aida-public/AB6AXuCBg5oEfMhA07BwUfpeQERbw6hK9sYieMGMYb0166SjEldonz17H8xrhdMZivFfAE3VVb2EkXntnCwq-X9kRmrIMCoHz5J4acrb_DjK7vrUH19F68w13hW72m9Tgm2S3PVQKcvD9do1gjTAvXrtVyxE7WEYYG04aA_S4hL2J7kzj8YBg_t5wKVFaAY-btLT2TC8cxYX-iRTZHJ9IMaJjUKqWk4WU4YyW_A1VTsEqKG0NRlNoyIZSbIocw',
  studioTurntable: 'https://lh3.googleusercontent.com/aida-public/AB6AXuDiooBdqH1aD00egJ9S8xZFTZ7G6tly8plDDalFCVYP9Xt7Xd5--0WrZQtQAEELNGOheMibWfZuvQ9-RknfOosBdxQ2N_CDp6RcXN0cCnBaBfOeA3mDuHca2BFFljX4AqdM_VcFUmGkAo9C6nmIgI2k_fbQ-VjlzSjxY8sk4RsCNgAkC1xGIL-NWjhU6sdxA_ODiQbWCZmRzUjRaUE2pzOwFYj-E5o6jtmSfdL_r0G5ayjMY1u6ALl0Yg',
  aeroBladeWheel: 'https://lh3.googleusercontent.com/aida-public/AB6AXuDfL8jvJm19y3URd1I_yz_MzhKJmtlIqaY_vb6khMhadJJhVv7IDWEA5rTukRei6d3ueTu4diUIb7DtIdfJXitZHyGh7akxnybY9HfJJMktsUq7ILyHL3brGFRtmYCowf0y0CXxr90Bqg3KzVcl2iiNSXecaEKr05UM1nqIVO4Y53w77PCc40H46uyAhek6YOsbdXULTKeRIEnoaLhBx8nd6jtWFE3kKMKqQ3QZu6VVovOGfx1HGUFTcw',
  magnesioWheel: 'https://lh3.googleusercontent.com/aida-public/AB6AXuBoTaVDPK2CnwzDpXLCfWUc7KDQEuPnFFb6N5R2COm0qsrTCSE4FRX22J3oZZKhAsj1O5-kH9uwJenqpu1Rlyn05Q6Rh_MFNUoQ-kT8-sN2yjwblJ4j6pxuQfSdOYpDoNoyQ-3ZhCkUJib-xKrdfG21xHejV0ydV7Z5NLKn0pIlHhYIHcR1G1ooVIAYdVnqmryAIsM2trgEcprsDno_ByRXuk1OXw_xfHTeVS5OSp9WSd08v8-D1n3dRQ',
  studioInterior: 'https://lh3.googleusercontent.com/aida-public/AB6AXuDaZtXZ3cQvTlCBoEZZbo8Ii81KBb4dAfuuIQCyukO4hrnP3dIGgc2oG9qYlsEZe2-n1TvMXR7BjTIZBvl6z46SrjRtz-Y5iMNXTY2QaJjBNQ8-8AoSZ4wo3QUdf4wpFYn-d5nfN6R0j_vdE795nlizScoDnzRupnmSQRoWS4mFjICEfEz2z3p6Ru4rWywRHn0GpJKrGa_zclXj5Zg48jWcbm3NAapU0YxQumoz0JgvdIj6iqOWCQsdig',
  savedCar1: 'https://lh3.googleusercontent.com/aida-public/AB6AXuDKW76kgdRTBquzMRsk054i4oxClENkNKqHB2XYFoEzQShRBG3zLj7oOxrNhiuvgWpe9InkUL32Wnf7oH4xseacNj37urL0kVL90riYuvfSSTPDegiN7gGOxdLN0ek6Bb8bkQ3bIKTA3xoH1_dUOvIuHMRWQ6RvFTkoh0r7hFxMBNNS6gSVsmCa__Eay_bMl-eGHMNBycl6i_-wCg_Us5rIt7XZ_pdo-qgUf_j8GTCzXPIeuzegpqGSgw',
  savedCar2: 'https://lh3.googleusercontent.com/aida-public/AB6AXuDtOnR0Lkzvk1s6IW8s024WF54ddrL-tcvbHMycehFkKH2DkpzawINBgwSw4xDGkNLLRDDaCcuRBJ6choLGdkImhzwgxZlzlyI8-kA-gKNNaZP80qutFVhvuVoJPJl8jGpktYBVErox044-yM-4Fagv85vS_IFoajRTN0Oi3HDgYyP5Tgxx5rhZwhDlz_1JoW3DY6BZsP9MsYod_4AYoAWNgqTvJoxs1AqkXsotAq06uZDueGLMIRqw8w'
};

export const SHOWROOM_VEHICLES: Vehicle[] = [
  {
    id: 'chronos-ev',
    name: 'AURA Chronos EV',
    series: 'Série Chronos // 2026',
    edition: 'Grand Tourer Dual-Motor',
    category: 'eletricos-puros',
    tagBadge: '100% Elétrico',
    tagColor: 'text-sky-400',
    priceFormatted: 'R$ 4.250.000',
    priceNumeric: 4250000,
    specs: {
      acceleration: '2.8s',
      power: '890 cv',
      topSpeed: '320 km/h',
      range: '680 km'
    },
    image: APP_ASSETS.chronosEV,
    description: 'Aceleração eletrostática contínua com cockpit imersivo acústico e tecnologia de carregamento ultra-rápido de 800V.'
  },
  {
    id: 'veloce-spyder',
    name: 'AURA Veloce Spyder',
    series: 'Série Pista // V10',
    edition: 'Arquitetura Leve de Pista',
    category: 'hipercarros',
    tagBadge: 'V10 Aspirado',
    tagColor: 'text-amber-400',
    priceFormatted: 'R$ 5.900.000',
    priceNumeric: 5900000,
    specs: {
      acceleration: '2.7s',
      power: '760 cv',
      topSpeed: '345 km/h',
      downforce: '480 kg'
    },
    image: APP_ASSETS.veloceSpyder,
    description: 'Estrutura aberta sem concessões ao peso. Motor central aspirado de rotação estratosférica a 9.200 RPM.'
  },
  {
    id: 'imperium-coupe',
    name: 'AURA Imperium Coupe',
    series: 'Série Executiva // GT',
    edition: 'Bespoke Interior & Acústica',
    category: 'gran-turismo',
    tagBadge: 'Gran Turismo',
    tagColor: 'text-zinc-200',
    priceFormatted: 'A partir de R$ 3.800.000',
    priceNumeric: 3800000,
    specs: {
      acceleration: '3.1s',
      power: '680 cv',
      topSpeed: '330 km/h'
    },
    image: APP_ASSETS.imperiumCoupe,
    description: 'Fastback de proporções esculturais com tratamento acústico com vidros duplos laminados com isolamento criogênico.'
  },
  {
    id: 'heritage-68',
    name: 'Heritage Tributo \'68',
    series: 'Atelier Heritage // 1968',
    edition: 'Restomod V8 Bi-Turbo',
    category: 'bespoke-vintage',
    tagBadge: 'Unidade Única',
    tagColor: 'text-amber-200',
    priceFormatted: 'Preço sob consulta',
    priceNumeric: 7800000,
    specs: {
      acceleration: '3.4s',
      power: '620 cv',
      topSpeed: '310 km/h',
      transmission: 'Manual 6m'
    },
    image: APP_ASSETS.heritage68,
    description: 'Pura elegância artesanal em British Racing Green clássico sobre monocoque moderno de fibra de carbono.'
  }
];

export const PAINT_OPTIONS: PaintOption[] = [
  {
    id: 'obsidian',
    name: 'Nero Carbon Metalizado',
    subtitle: 'Fosco Multicamada',
    gradientClass: 'from-black via-zinc-800 to-zinc-600',
    hex: '#18181b',
    threeColor: 0x18181b,
    price: 0,
    priceFormatted: 'Incluso'
  },
  {
    id: 'amber',
    name: 'Âmbar Imperial',
    subtitle: 'Verniz Dourado Quente',
    gradientClass: 'from-amber-700 via-amber-500 to-amber-200',
    hex: '#f59e0b',
    threeColor: 0xd97706,
    price: 140000,
    priceFormatted: '+R$ 140k'
  },
  {
    id: 'mercury',
    name: 'Prata Celestial',
    subtitle: 'Alumínio Polido Criogênico',
    gradientClass: 'from-slate-400 via-zinc-200 to-white',
    hex: '#e2e8f0',
    threeColor: 0xcccccc,
    price: 95000,
    priceFormatted: '+R$ 95k'
  },
  {
    id: 'emerald',
    name: 'Verde Esmeralda Fosco',
    subtitle: 'Pigmento Metálico Tradicional',
    gradientClass: 'from-emerald-950 via-emerald-800 to-teal-700',
    hex: '#064e3b',
    threeColor: 0x064e3b,
    price: 180000,
    priceFormatted: '+R$ 180k'
  }
];

export const WHEEL_OPTIONS: WheelOption[] = [
  {
    id: 'aero-blade',
    name: 'Aero Carbon 21"',
    type: 'Fibra de Carbono & Titânio',
    image: APP_ASSETS.aeroBladeWheel,
    price: 0,
    priceFormatted: 'Incluso'
  },
  {
    id: 'magnesio',
    name: 'Magnesio GT-R',
    type: 'Magnésio Monolítico de Competição',
    image: APP_ASSETS.magnesioWheel,
    price: 85000,
    priceFormatted: '+R$ 85.000'
  }
];

export const CALIPER_OPTIONS: CaliperOption[] = [
  {
    id: 'amber',
    name: 'Âmbar Neon',
    colorClass: 'bg-amber-500 shadow-[0_0_8px_rgba(245,158,11,0.6)]',
    threeColor: 0xf59e0b,
    price: 0,
    priceFormatted: 'Padrão'
  },
  {
    id: 'scuderia',
    name: 'Scuderia Red',
    colorClass: 'bg-red-600 shadow-[0_0_8px_rgba(220,38,38,0.6)]',
    threeColor: 0xdc2626,
    price: 22000,
    priceFormatted: '+R$ 22.000'
  },
  {
    id: 'titanium',
    name: 'Titânio Puro',
    colorClass: 'bg-slate-300 shadow-[0_0_8px_rgba(203,213,225,0.6)]',
    threeColor: 0xcbd5e1,
    price: 18000,
    priceFormatted: '+R$ 18.000'
  }
];

export const INTERIOR_OPTIONS: InteriorOption[] = [
  {
    id: 'camel-vintage',
    name: 'Couro Camel Vintage & Carbono',
    image: APP_ASSETS.studioInterior,
    price: 125000,
    priceFormatted: '+R$ 125.000',
    stitching: 'Ponto Cruzado Âmbar (Feito à Mão em Bologna)',
    ambientLight: 'Fóton Dourado 2700K'
  }
];

export const INITIAL_SAVED_CARS: SavedCar[] = [
  {
    id: 'aura-gt-speziale',
    title: 'Aura GT Speziale',
    status: 'Alocação Reservada',
    statusColor: 'text-amber-400 bg-amber-500/10 border-amber-500/20',
    details: 'Nero Carbon / Interior Havana',
    price: 'R$ 3.920.000',
    image: APP_ASSETS.savedCar1
  },
  {
    id: 'aura-spyder-v10',
    title: 'Aura Spyder V10',
    status: 'Estudo de Design',
    statusColor: 'text-sky-400 bg-sky-500/10 border-sky-500/20',
    details: 'Prata Celestial / Pinças Scuderia',
    price: 'R$ 4.450.000',
    image: APP_ASSETS.savedCar2
  }
];
