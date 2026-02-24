// Sherman Bidding System - Constants and Default Data

// Allowance items (items with variable costs finalized during construction)
export const ALLOWANCE_ITEMS = ['permits', 'gravel_driveway', 'sand_pad', 'sewer', 'well', 'crane'];

// Services displayed in Install Services section (not Professional Services section)
export const SUMMARY_SERVICES = [
  'installation_of_home',
  'drywall',
  'painting',
  'carpet',
  'dumpster',
  'siding_install',
  'interior_trim_out',
  'permits',
  'electric_connection',
  'concrete_skirting',
  'plumbing',
  'gas_propane'
];

// Additional home options (displayed in House Specs section only)
export const HOME_OPTIONS = [
  'lp_siding',
  'tray_ceiling',
  'full_backsplash',
  'sets_of_drawers',
  'meter_loop',
  'drop_down_beam',
  'lp_trim',
  'amp_service_200'
];

// Sherman company information
export const SHERMAN = {
  address: '2244 Hwy 65, Mora, MN 55051'
};

// Drive time and pricing constants
export const MIN_MILES = 15;
export const DRIVE_RATE_INSTALL = 22;
export const DRIVE_RATE_SERVICE = 20;
export const DRIVE_RATE_PC = 15;  // Project Command
export const DRIVE_RATE_INSPECTION = 15;
export const HOME_MARKUP = 1.2;

// Tax and contingency rates
export const TAX_RATE = 0.07;  // 7%
export const CONTINGENCY_RATE = 0.02;  // 2%

// Installation Cost Constants
export const INSTALLATION_COSTS = {
  SINGLE_WIDE_BASE: 800,
  DOUBLE_WIDE_BASE: 1600,
  SINGLE_WIDE_AXLES: 275,
  DOUBLE_WIDE_AXLES: 550,
  DELIVERY_INSPECTION: 600,
  WRAP_UP: 600,
  FOUNDATION_ADJUSTMENT: 4000, // For basement or crawlspace
  DRIVE_RATE_PER_MILE: 20,
};

// Pier Specifications
export const PIER_SPECS = {
  SIZES: {
    SMALL: 20,
    MEDIUM: 22,
    LARGE: 32,
  },
  SPACING: {
    OUTER_BEAMS: 6,      // 6' on-center for outer beams
    MARRIAGE_LINE: 12,   // 12' on-center for marriage line (double-wide center beam)
  },
  CANTILEVER: 2,         // House overhangs frame by 2' on each end
};

// Pricing Multipliers
export const PRICING = {
  OVERHEAD: 0.05,          // 5% overhead
  MARKUP: 0.10,            // 10% markup
  CLOSING_COSTS: 0.07,     // 7% closing costs
  CLOSING_DIVISOR: 0.93,   // Divisor for closing costs calculation
  CONTINGENCY: 0.02,       // 2% contingency
  SLAB_COST_PER_SQ_FT: 8,  // $8 per square foot for slab/pad
};

// Default home models with pricing
export const DEFAULT_HOME_MODELS = [
  { name: 'NONE', price: 0, width: 0, length: 0, floorPlanUrl: '' },
  // TEMPO Series - Single Wide
  { name: 'TEMPO RHYTHM NATION', price: 59864, width: 16, length: 66, floorPlanUrl: 'https://www.claytonhomes.com/homes/51TEM16663AH/' },
  { name: 'TEMPO MOVE ON UP', price: 64222, width: 16, length: 72, floorPlanUrl: 'https://www.claytonhomes.com/homes/51TEM16723AH/' },
  { name: 'TEMPO SWEET CAROLINE', price: 66605, width: 16, length: 76, floorPlanUrl: 'https://www.claytonhomes.com/homes/54TEM16763BH/' },
  { name: 'TEMPO RISING SUN', price: 69502, width: 24, length: 44, floorPlanUrl: 'https://www.claytonhomes.com/homes/54TEM24442AH/' },
  { name: 'TEMPO RISING SUN MOD', price: 74443, width: 24, length: 44, floorPlanUrl: 'https://www.claytonhomes.com/homes/54TEM24442AM/' },
  { name: 'TEMPO 3 LITTLE BIRDS', price: 75797, width: 24, length: 52, floorPlanUrl: 'https://www.claytonhomes.com/homes/54TEM24523AH/' },
  { name: 'TEMPO 3 LITTLE BIRDS MOD', price: 79061, width: 24, length: 52, floorPlanUrl: 'https://www.claytonhomes.com/homes/54TEM24523AM/' },
  { name: 'TEMPO MY GIRL', price: 78319, width: 24, length: 56, floorPlanUrl: 'https://www.claytonhomes.com/homes/55TMP24563AH/' },
  { name: 'TEMPO MY GIRL MOD', price: 82809, width: 24, length: 56, floorPlanUrl: 'https://www.claytonhomes.com/homes/55TMP24563AM/' },
  { name: 'TEMPO SWEET DREAMS', price: 69930, width: 28, length: 40, floorPlanUrl: 'https://www.claytonhomes.com/homes/54TEM28403AH/' },
  { name: 'TEMPO SWEET DREAMS MOD', price: 73515, width: 28, length: 40, floorPlanUrl: 'https://www.claytonhomes.com/homes/54TEM28403AM/' },
  { name: 'TEMPO JOHNNY B GOODE', price: 79639, width: 28, length: 52, floorPlanUrl: 'https://www.claytonhomes.com/homes/81TPO28523PH/' },
  { name: 'TEMPO JOHNNY B GOODE MOD', price: 83241, width: 28, length: 52, floorPlanUrl: 'https://www.claytonhomes.com/homes/54TEM28523AM/' },
  { name: 'TEMPO LEAN ON ME', price: 84730, width: 28, length: 56, floorPlanUrl: 'https://www.claytonhomes.com/homes/54TEM28563BH/' },
  { name: 'TEMPO LEAN ON ME MOD', price: 87654, width: 28, length: 56, floorPlanUrl: 'https://www.claytonhomes.com/homes/54TEM28563BM/' },
  { name: 'TEMPO 2860 BROWN EYED GIRL', price: 86312, width: 28, length: 60, floorPlanUrl: 'https://www.claytonhomes.com/homes/54TEM28604AH/' },
  { name: 'TEMPO 2860 BROWN EYED GIRL MOD', price: 89453, width: 28, length: 60, floorPlanUrl: 'https://www.claytonhomes.com/homes/54TEM28604AM/' },
  // RAMSEY Series - Single Wide
  { name: 'RAMSEY 215-1', price: 44251, width: 14, length: 42, floorPlanUrl: 'https://www.claytonhomes.com/homes/54RMS14421AH/' },
  { name: 'RAMSEY 210-1', price: 50420, width: 14, length: 56, floorPlanUrl: 'https://www.claytonhomes.com/homes/54RMS14562AH/' },
  { name: 'RAMSEY 208-1', price: 60819, width: 16, length: 66, floorPlanUrl: 'https://www.claytonhomes.com/homes/54RMS16663DH/' },
  { name: 'RAMSEY 217-1', price: 63834, width: 16, length: 70, floorPlanUrl: 'https://www.claytonhomes.com/homes/54RMS16703AH/' },
  { name: 'RAMSEY 218-1', price: 63570, width: 16, length: 76, floorPlanUrl: 'https://www.claytonhomes.com/homes/54RMS16703BH/' },
  { name: 'RAMSEY 223', price: 67924, width: 16, length: 76, floorPlanUrl: 'https://www.claytonhomes.com/homes/54RMS16763AH/' },
  { name: 'RAMSEY 207-1', price: 68042, width: 16, length: 76, floorPlanUrl: 'https://www.claytonhomes.com/homes/54RMS16763CH/' },
  { name: 'RAMSEY 216-2', price: 68445, width: 16, length: 76, floorPlanUrl: 'https://www.claytonhomes.com/homes/54RMS16763DH/' },
  // RAMSEY Series - Double Wide
  { name: 'RAMSEY 65-3', price: 75230, width: 28, length: 48, floorPlanUrl: 'https://www.claytonhomes.com/homes/54RMS28483AH/' },
  { name: 'RAMSEY 65-3 MOD', price: 82253, width: 28, length: 48, floorPlanUrl: 'https://www.claytonhomes.com/homes/54RMS28483AM/' },
  { name: 'RAMSEY 4045-1', price: 87814, width: 28, length: 56, floorPlanUrl: 'https://www.claytonhomes.com/homes/54RMS28563AH/' },
  { name: 'RAMSEY 4045-1 MOD', price: 95459, width: 28, length: 56, floorPlanUrl: 'https://www.claytonhomes.com/homes/54RMS28563AM/' },
  { name: 'RAMSEY 2022-1', price: 88645, width: 28, length: 58, floorPlanUrl: 'https://www.claytonhomes.com/homes/54RMS28583AH/' },
  { name: 'RAMSEY 2022-1 MOD', price: 96596, width: 28, length: 58, floorPlanUrl: 'https://www.claytonhomes.com/homes/54RMS28583AM/' },
  // ENCORE Series
  { name: 'ENCORE 3262', price: 136689, width: 32, length: 62, floorPlanUrl: 'https://www.claytonhomes.com/homes/54ENC32623AH/' },
  { name: 'ENCORE 3262 MOD', price: 152842, width: 32, length: 62, floorPlanUrl: 'https://www.claytonhomes.com/homes/54ENC32623AM/' },
  // LANDMARK Series
  { name: 'LANDMARK 50TH ANNIVERSARY', price: 114580, width: 32, length: 64, floorPlanUrl: 'https://www.claytonhomes.com/homes/54LDK32643AH/' },
  { name: 'LANDMARK 50TH ANNIVERSARY MOD', price: 124901, width: 32, length: 64, floorPlanUrl: 'https://www.claytonhomes.com/homes/54LDK32643AM/' },
  // LEGEND Series - Double Wide
  { name: 'LEGEND 518', price: 90353, width: 28, length: 44, floorPlanUrl: 'https://www.claytonhomes.com/homes/54LGD28443BH/' },
  { name: 'LEGEND 518 MOD', price: 98303, width: 28, length: 44, floorPlanUrl: 'https://www.claytonhomes.com/homes/54LGD28443BM/' },
  { name: 'LEGEND 98', price: 95890, width: 28, length: 48, floorPlanUrl: 'https://www.claytonhomes.com/homes/54LGD28482AH/' },
  { name: 'LEGEND 98 MOD', price: 103511, width: 28, length: 48, floorPlanUrl: 'https://www.claytonhomes.com/homes/54LGD28482AM/' },
  { name: 'LEGEND 76-4', price: 94647, width: 28, length: 48, floorPlanUrl: 'https://www.claytonhomes.com/homes/54LGD28483BH/' },
  { name: 'LEGEND 76-4 MOD', price: 106513, width: 28, length: 48, floorPlanUrl: 'https://www.claytonhomes.com/homes/54LGD28483BM/' },
  { name: 'LEGEND 412-1', price: 112446, width: 28, length: 60, floorPlanUrl: 'https://www.claytonhomes.com/homes/54LGD28603AH/' },
  { name: 'LEGEND 412-1 MOD', price: 123496, width: 28, length: 60, floorPlanUrl: 'https://www.claytonhomes.com/homes/54LGD28603AM/' },
  { name: 'LEGEND 327-1', price: 114751, width: 28, length: 64, floorPlanUrl: 'https://www.claytonhomes.com/homes/54LGD28643AH/' },
  { name: 'LEGEND 327-1 MOD', price: 125841, width: 28, length: 64, floorPlanUrl: 'https://www.claytonhomes.com/homes/54LGD28643AM/' },
  { name: 'LEGEND 413-1', price: 122391, width: 28, length: 68, floorPlanUrl: 'https://www.claytonhomes.com/homes/54LGD28683AH/' },
  { name: 'LEGEND 413-1 MOD', price: 131057, width: 28, length: 68, floorPlanUrl: 'https://www.claytonhomes.com/homes/54LGD28683AM/' },
  { name: 'LEGEND 86', price: 113909, width: 32, length: 56, floorPlanUrl: 'https://www.claytonhomes.com/homes/54LGD32563AH/' },
  { name: 'LEGEND 86 MOD', price: 129529, width: 32, length: 56, floorPlanUrl: 'https://www.claytonhomes.com/homes/54LGD32563AM/' },
  { name: 'LEGEND 377-1', price: 121733, width: 32, length: 60, floorPlanUrl: 'https://www.claytonhomes.com/homes/54LGD32603AH/' },
  { name: 'LEGEND 377-1 MOD', price: 137658, width: 32, length: 60, floorPlanUrl: 'https://www.claytonhomes.com/homes/54LGD32603AM/' },
  { name: 'LEGEND 43', price: 129319, width: 32, length: 64, floorPlanUrl: 'https://www.claytonhomes.com/homes/54LGD32643AH/' },
  { name: 'LEGEND 43 MOD', price: 145133, width: 32, length: 64, floorPlanUrl: 'https://www.claytonhomes.com/homes/54LGD32643AM/' },
  { name: 'LEGEND 402', price: 139502, width: 32, length: 72, floorPlanUrl: 'https://www.claytonhomes.com/homes/54LGD32723AH/' },
  { name: 'LEGEND 402 MOD', price: 157368, width: 32, length: 72, floorPlanUrl: 'https://www.claytonhomes.com/homes/54LGD32723AM/' },
  { name: 'LEGEND 17-1', price: 143171, width: 32, length: 76, floorPlanUrl: 'https://www.claytonhomes.com/homes/54LGD32763AH/' },
  { name: 'LEGEND 17-1 MOD', price: 160783, width: 32, length: 76, floorPlanUrl: 'https://www.claytonhomes.com/homes/54LGD32763AM/' },
  // LEGEND Series - Triple Wide (Modular Only)
  { name: 'LEGEND 572-1 MOD', price: 180950, width: 45, length: 76, floorPlanUrl: 'https://www.claytonhomes.com/homes/54LGD45763AM/' },
];

// Default materials pricing
export const DEFAULT_MATERIALS = {
  great_stuff: { name: 'Great Stuff', cost: 9.00, price: 18.00 },
  floor_coverings: { name: 'Floor Coverings', cost: 65.00, price: 130.00 },
  cookies_16x4: { name: '16x4 Cookies', cost: 12.01, price: 24.02 },
  tyvek: { name: 'Tyvek', cost: 50, price: 50 },
  anchor_system: { name: 'Anchor System 44"', cost: 107.51, price: 161.27 },
  steel_pier_20: { name: '20" Steel Pier', cost: 15.00, price: 30.00 },
  steel_pier_22: { name: '22" Steel Pier', cost: 16.00, price: 32.00 },
  steel_pier_32: { name: '32" Steel Pier', cost: 24.00, price: 48.00 },
  tie_down_straps: { name: "5' Anchor Strap", cost: 11.98, price: 23.96 },
  coil_nails: { name: '2" Ring Coil Nails 3600ct', cost: 76.35, price: 152.70 },
  asphalt_silicon: { name: 'Asphalt Silicon', cost: 9.58, price: 19.16 },
  stairs_4step: { name: '4 Step Stairs w/ Platform', cost: 811.65, price: 1623.30 },
  heat_tape: { name: 'Heat Tape', cost: 30.00, price: 60.00 },
  fiberglass_wrap: { name: 'Fiberglass Pipe Wrap 3x1', cost: 10.00, price: 20.00 },
  aluminum_foil_tape: { name: 'Aluminum Foil Heat Tape', cost: 15.00, price: 30.00 },
};

// Default services catalog
export const DEFAULT_SERVICES = {
  installation_of_home: { name: 'Installation of Home', base: 0, calc: 'install_home' },
  permits: { name: 'Permits', base: 5500, addDrive: true },
  drywall: { name: 'Drywall', base: 2500, addDrive: true },
  surfaced_driveway: { name: 'Surfaced Driveway', base: 4320, addDrive: true },
  concrete_garage: { name: 'Concrete Garage Floor', base: 5616, addDrive: true },
  surfaced_sidewalks: { name: 'Surfaced Sidewalks', base: 720, addDrive: true },
  professional_cleaning: { name: 'Professional Cleaning', base: 1000, addDrive: true },
  electric_connection: { name: 'Electric Connection', base: 5000, addDrive: true },
  transformer: { name: 'Transformer', base: 2000, addDrive: true },
  hvac: { name: 'HVAC (AC Unit)', base: 5000, addDrive: true },
  concrete_skirting: { name: 'Concrete Skirting', base: 0, calc: 'skirt' },
  gas_propane: { name: 'Gas & Propane', base: 2500, addDrive: true },
  plumbing: { name: 'Plumbing Connections', base: 2500, addDrive: true },
  gravel_driveway: { name: 'Gravel Driveway', base: 4320, addDrive: true },
  sand_pad: { name: 'Sand Pad', base: 2180, addDrive: true },
  survey: { name: 'Survey', base: 1500, addDrive: true },
  culvert: { name: 'Culvert', base: 1500, addDrive: true },
  siding_install: { name: 'Siding Install', base: 2200, addDrive: true },
  city_sewer_water: { name: 'City Sewer & Water', base: 5000, addDrive: true },
  underground_sleeves: { name: 'Underground Sleeves', base: 1400, addDrive: true },
  dumpster: { name: 'Dumpster Service', base: 950, addDrive: false },
  painting: { name: 'Painting', base: 900, addDrive: false },
  carpet: { name: 'Carpet', base: 500, addDrive: false },
  crane: { name: 'Crane', base: 8000, addDrive: true },
  updraft_furnace: { name: 'Updraft Furnace', base: 6000, addDrive: true },
  water_heater: { name: 'Water Heater', base: 1500, addDrive: true },
  basement_stairs: { name: 'Basement Stairs', base: 2000, addDrive: true },
  closing_costs: { name: 'Closing Costs (7% of Total)', base: 0, calc: 'closing' },
  interior_trim_out: { name: 'Interior Trim Out', base: 1200, addDrive: true },
  // Additional Home Options
  lp_siding: { name: 'LP SmartSide Siding', base: 0, calc: 'lp_siding' },
  tray_ceiling: { name: 'Tray Ceiling', base: 900, addDrive: false },
  full_backsplash: { name: 'Full Backsplash', base: 800, addDrive: false },
  sets_of_drawers: { name: 'Sets of Drawers', base: 900, addDrive: false },
  meter_loop: { name: 'Meter Loop', base: 300, addDrive: false },
  drop_down_beam: { name: 'Drop Down Beam', base: 500, addDrive: false },
  lp_trim: { name: 'LP SmartSide Trim', base: 2000, addDrive: false },
  amp_service_200: { name: '200 Amp Service', base: 400, addDrive: false },
};

// Sewer pricing by bedroom count
export const DEFAULT_SEWER = {
  none: 0,
  '1_bed': 14200,
  '2_bed': 16700,
  '3_bed': 17200
};

// Patio pricing by size (feet)
export const DEFAULT_PATIO = {
  none: 0,
  '6': 6300,
  '8': 8300,
  '10': 11800
};

// Foundation pricing by type
export const DEFAULT_FOUNDATION = {
  basement: 30000,
  crawlspace: 22000
};

// Warranty information
export const WARRANTIES = [
  { mfr: 'BlueLinx (Exterior Door)', terms: '10yr Steel/25yr Fiberglass', phone: '' },
  { mfr: 'Certainteed (Shingles)', terms: '10 Years', phone: '800-782-8777' },
  { mfr: 'Samsung (Appliances)', terms: '2 Years', phone: '800-726-7864' },
  { mfr: 'Carrier', terms: '2 Year Limited', phone: '866-234-1018' },
  { mfr: 'Pella Windows', terms: '5 Year', phone: '800-374-4758' },
  { mfr: 'Rheem (Water Heaters)', terms: '1 Year', phone: '800-432-8373' },
  { mfr: 'Shaw Flooring', terms: '1 Year', phone: '800-720-7429' },
  { mfr: 'Smart Lap Siding', terms: '50yr Pro-Rated', phone: '888-820-0325' },
  { mfr: 'Sherman - Structural', terms: '30 Years', phone: '320-679-3438' },
  { mfr: 'Sherman - Workmanship', terms: '10 Years', phone: '320-679-3438' },
];

// Completion checklist items
export const CHECKLIST = [
  { id: 1, item: 'Seal Badge', src: 'Dept of Labor' },
  { id: 2, item: 'State Seal Certificate', src: 'Dept of Labor' },
  { id: 3, item: 'Foundation Inspection Request', src: 'Chuck Olsen' },
  { id: 4, item: 'Builders Certificate', src: 'HUD' },
  { id: 5, item: 'Radon Gas Certificate', src: '' },
  { id: 6, item: 'Certificate of Occupancy', src: 'Permit Issuer' },
  { id: 7, item: 'Surety Bond', src: '' },
  { id: 8, item: 'Plot Plan', src: '' },
  { id: 9, item: 'Manufactured Home Warranty', src: '' },
  { id: 10, item: 'Certificate of Origin', src: 'Manufacturer' },
  { id: 11, item: 'Lien Release', src: '' },
];

// Delivery checklist
export const DELIVERY = {
  docs: [
    'Verify HUD data plate',
    'Confirm red HUD tag',
    'Check installation instructions',
    'Review warranties',
    'Rivet Install Badge - Photo'
  ],
  exterior: [
    'Examine siding',
    'Inspect roof',
    'Check windows',
    'Inspect trim/porches',
    'Transit damage check'
  ],
  interior: [
    'Check drywall/walls',
    'Inspect ceilings'
  ],
};

// Folder types for file organization
export const FOLDER_TYPES = [
  'customer_docs',
  'crew_files',
  'permits',
  'photos',
  'change_orders',
  'warranty',
  'inspections',
  'clayton_docs'
];

// Quote statuses
export const QUOTE_STATUSES = [
  'Draft',
  'Sent',
  'Accepted',
  'Declined'
];

// User roles
export const USER_ROLES = [
  'admin',
  'sales',
  'crew'
];

// Quote types (future expansion)
export const QUOTE_TYPES = [
  { id: 'modular_home', name: 'Modular Home', icon: '🏠', enabled: true },
  { id: 'stud_steel', name: 'Stud and Steel', icon: '🔩', enabled: false },
  { id: 'traditional_garage', name: 'Traditional Garage', icon: '🚗', enabled: false },
  { id: 'post_frame_garage', name: 'Post Frame Garage', icon: '🚙', enabled: false },
  { id: 'stud_barndo', name: 'Stud Barndo', icon: '🏚️', enabled: false },
  { id: 'post_frame_barndo', name: 'Post Frame Barndo', icon: '🏛️', enabled: false },
  { id: 'traditional_home', name: 'Traditional Home', icon: '🏡', enabled: false },
];
