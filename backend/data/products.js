const products = [

  // ─── Electronics ──────────────────────────────────────────────────────────
  {
    name: 'Samsung Galaxy A54 5G',
    // Samsung Galaxy phone – verified Unsplash photo
    image: 'https://images.unsplash.com/photo-1610945415295-d9bbf067e59c?auto=format&fit=crop&w=800&q=80',
    description: 'Samsung Galaxy A54 5G with a stunning 6.4-inch Super AMOLED display, 50MP triple camera, 5000mAh long-lasting battery, and 5G connectivity. Perfect for everyday use.',
    brand: 'Samsung',
    category: 'Electronics',
    price: 52000,
    countInStock: 15,
    rating: 4.5,
    numReviews: 34,
  },
  {
    name: 'iPhone 15 Pro 128GB',
    // iPhone on desk – verified
    image: 'https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?auto=format&fit=crop&w=800&q=80',
    description: 'The iPhone 15 Pro with titanium design, A17 Pro chip, and 48MP camera. Features Action Button and USB-C for next-generation connectivity.',
    brand: 'Apple',
    category: 'Electronics',
    price: 185000,
    countInStock: 8,
    rating: 4.8,
    numReviews: 21,
  },
  {
    name: 'Tecno Spark 20 Pro',
    // Generic Android smartphone – verified
    image: 'https://images.unsplash.com/photo-1512941937669-90a1b58e7e9c?auto=format&fit=crop&w=800&q=80',
    description: 'Tecno Spark 20 Pro – widely loved across Ethiopia. 6.6-inch display, 64MP AI camera, and 5000mAh battery that keeps you going all day.',
    brand: 'Tecno',
    category: 'Electronics',
    price: 18500,
    countInStock: 25,
    rating: 4.2,
    numReviews: 58,
  },
  {
    name: 'Infinix Hot 40i',
    // Person holding Android phone – verified
    image: 'https://images.unsplash.com/photo-1598327105666-5b89351aff97?auto=format&fit=crop&w=800&q=80',
    description: 'Infinix Hot 40i with 6.56-inch display and Helio G85 processor. 50MP main camera, 5000mAh battery. Budget-friendly and highly popular in the Ethiopian market.',
    brand: 'Infinix',
    category: 'Electronics',
    price: 14900,
    countInStock: 30,
    rating: 4.0,
    numReviews: 72,
  },
  {
    name: 'Apple AirPods Pro (2nd Gen)',
    // AirPods on white background – verified
    image: 'https://images.unsplash.com/photo-1606220588913-b3aecb4b2c14?auto=format&fit=crop&w=800&q=80',
    description: 'AirPods Pro with Active Noise Cancellation, Transparency mode, and Adaptive Audio. Up to 6 hours listening time with MagSafe charging case.',
    brand: 'Apple',
    category: 'Electronics',
    price: 28000,
    countInStock: 12,
    rating: 4.7,
    numReviews: 19,
  },
  {
    name: 'JBL Charge 5 Bluetooth Speaker',
    // Portable speaker – verified
    image: 'https://images.unsplash.com/photo-1608043152269-423dbba4e7e1?auto=format&fit=crop&w=800&q=80',
    description: 'JBL Charge 5 portable Bluetooth speaker with IP67 waterproofing, 20-hour playtime, and built-in power bank.',
    brand: 'JBL',
    category: 'Electronics',
    price: 12500,
    countInStock: 18,
    rating: 4.6,
    numReviews: 44,
  },
  {
    name: 'Sony WH-1000XM5 Headphones',
    // Over-ear headphones – verified
    image: 'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?auto=format&fit=crop&w=800&q=80',
    description: 'Industry-leading noise cancelling headphones with 30-hour battery life and crystal-clear hands-free calling.',
    brand: 'Sony',
    category: 'Electronics',
    price: 48000,
    countInStock: 9,
    rating: 4.9,
    numReviews: 27,
  },
  {
    name: 'Logitech MX Master 3S Mouse',
    // Computer mouse – verified
    image: 'https://images.unsplash.com/photo-1527814050087-379381547969?auto=format&fit=crop&w=800&q=80',
    description: 'MX Master 3S with near-silent clicks, MagSpeed electromagnetic scrolling. Connects to 3 devices via Bluetooth or USB.',
    brand: 'Logitech',
    category: 'Electronics',
    price: 9800,
    countInStock: 20,
    rating: 4.7,
    numReviews: 31,
  },
  {
    name: 'Dell 27" IPS Monitor',
    // Computer monitor – verified
    image: 'https://images.unsplash.com/photo-1527443224154-c4a3942d3acf?auto=format&fit=crop&w=800&q=80',
    description: 'Dell 27-inch Full HD IPS monitor with 75Hz refresh rate, AMD FreeSync, and ultra-thin bezel. Wide viewing angles for work and entertainment.',
    brand: 'Dell',
    category: 'Electronics',
    price: 35000,
    countInStock: 7,
    rating: 4.4,
    numReviews: 16,
  },
  {
    name: 'Anker 65W GaN USB-C Charger',
    // USB charger / cables – verified
    image: 'https://images.unsplash.com/photo-1625842268584-8f3296236761?auto=format&fit=crop&w=800&q=80',
    description: 'Compact 65W GaN charger with 2× USB-C and 1× USB-A. Charges a laptop, phone, and earbuds simultaneously.',
    brand: 'Anker',
    category: 'Electronics',
    price: 4500,
    countInStock: 35,
    rating: 4.5,
    numReviews: 63,
  },

  // ─── Ethiopian Traditional ─────────────────────────────────────────────────
  {
    name: 'Handwoven Ethiopian Habesha Kemis',
    // Real Shewa Amhara Menen dress – Wikimedia Commons CC0
    image: 'https://upload.wikimedia.org/wikipedia/commons/0/08/Shewa_Amhara_Menen_Dress_from_Addis_Ababa.jpg',
    description: 'Authentic handwoven Habesha Kemis from pure Ethiopian cotton with intricate Tilet border embroidery. Perfect for holidays, weddings, and cultural events.',
    brand: 'Addis Handcraft',
    category: 'Ethiopian Traditional',
    price: 3500,
    countInStock: 20,
    rating: 4.9,
    numReviews: 87,
  },
  {
    name: 'Ethiopian Coffee Ceremony Set',
    // Ethiopian jebena coffee pot – Wikimedia Commons CC BY-SA
    image: 'https://upload.wikimedia.org/wikipedia/commons/thumb/4/44/Jebena.jpg/800px-Jebena.jpg',
    description: 'Complete Ethiopian coffee ceremony set: hand-painted clay jebena, 6 finjal cups, wooden tray, and incense holder. Everything for an authentic ceremony.',
    brand: 'Jebena Craft',
    category: 'Ethiopian Traditional',
    price: 2800,
    countInStock: 14,
    rating: 4.8,
    numReviews: 112,
  },
  {
    name: 'Hand-Painted Ethiopian Art Canvas',
    // Colorful African art painting – verified Unsplash
    image: 'https://images.unsplash.com/photo-1579783902614-a3fb3927b6a5?auto=format&fit=crop&w=800&q=80',
    description: 'Hand-painted Ethiopian art on canvas depicting scenes from daily life in Addis Ababa. Vibrant natural pigments, each piece unique — a collector\'s item.',
    brand: 'Addis Art Gallery',
    category: 'Ethiopian Traditional',
    price: 4200,
    countInStock: 8,
    rating: 4.7,
    numReviews: 39,
  },
  {
    name: 'Lalibela Cross Pendant (925 Silver)',
    // Real Lalibela Cross photo – Wikimedia Commons CC BY-SA 3.0
    image: 'https://upload.wikimedia.org/wikipedia/commons/0/0b/Lalibela_Cross.jpg',
    description: 'Handcrafted 925 sterling silver Lalibela Cross pendant — iconic symbol of Ethiopian Orthodox Christianity. Includes 18-inch chain and gift box.',
    brand: 'Lalibela Jewels',
    category: 'Ethiopian Traditional',
    price: 5500,
    countInStock: 22,
    rating: 4.9,
    numReviews: 54,
  },
  {
    name: 'Injera Mesob (Traditional Basket Table)',
    // Real Harari Mesob – Wikimedia Commons CC BY-SA 4.0
    image: 'https://upload.wikimedia.org/wikipedia/commons/f/f6/Harar_Mesob.jpg',
    description: 'Traditional Ethiopian Mesob woven basket table used to serve injera. Hand-woven by artisans using natural grass with colorful traditional patterns.',
    brand: 'Gojjam Weave',
    category: 'Ethiopian Traditional',
    price: 1800,
    countInStock: 17,
    rating: 4.6,
    numReviews: 48,
  },
  {
    name: 'Ethiopian Tej (Honey Wine) Making Kit',
    // Real Ethiopian Tej in berele glass – Wikimedia Commons CC0
    image: 'https://upload.wikimedia.org/wikipedia/commons/8/83/Tej_%28Ethiopian_honey_wine%29_%2827241999346%29.jpg',
    description: 'Brew authentic Ethiopian Tej at home. Includes 1kg raw honey, dried gesho leaves, traditional berele glass, and step-by-step brewing guide.',
    brand: 'Tej Craft Ethiopia',
    category: 'Ethiopian Traditional',
    price: 1950,
    countInStock: 25,
    rating: 4.5,
    numReviews: 33,
  },
  {
    name: 'Ethiopian Leather Shoulder Bag',
    // Genuine leather shoulder bag – verified Unsplash
    image: 'https://images.unsplash.com/photo-1548036328-c9fa89d128fa?auto=format&fit=crop&w=800&q=80',
    description: 'Handstitched genuine Ethiopian leather shoulder bag. Spacious compartment, front zipper pocket, adjustable strap. Traditional tooled patterns.',
    brand: 'Shewa Leather',
    category: 'Ethiopian Traditional',
    price: 3200,
    countInStock: 11,
    rating: 4.7,
    numReviews: 29,
  },

  // ─── Food & Beverage ───────────────────────────────────────────────────────
  {
    name: 'Yirgacheffe Ground Coffee 500g',
    // Ground coffee in bag – verified Unsplash
    image: 'https://images.unsplash.com/photo-1559056199-641a0ac8b55e?auto=format&fit=crop&w=800&q=80',
    description: 'Premium single-origin Yirgacheffe coffee, freshly roasted and ground. Bright floral aroma with blueberry and jasmine notes. Grown at 2000m — the birthplace of coffee.',
    brand: 'Yirgacheffe Coffee Co.',
    category: 'Food & Beverage',
    price: 750,
    countInStock: 60,
    rating: 4.9,
    numReviews: 198,
  },
  {
    name: 'Sidama Coffee Whole Bean 1kg',
    // Coffee beans closeup – verified Unsplash
    image: 'https://images.unsplash.com/photo-1495474472287-4d71bcdd2085?auto=format&fit=crop&w=800&q=80',
    description: 'Whole bean Sidama coffee, naturally processed with dark chocolate and stone fruit notes. Sun-dried on African raised beds. Specialty grade, export quality.',
    brand: 'Sidama Coffee Farmers Union',
    category: 'Food & Beverage',
    price: 1400,
    countInStock: 40,
    rating: 4.8,
    numReviews: 145,
  },

  // ─── Home & Kitchen ────────────────────────────────────────────────────────
  {
    name: 'Digital Air Fryer 5.5L',
    // Air fryer on countertop – verified Unsplash
    image: 'https://images.unsplash.com/photo-1648651195673-29d4b1d7a4bb?auto=format&fit=crop&w=800&q=80',
    description: 'Large 5.5-litre digital air fryer with 8 preset cooking modes. Up to 90% less oil, non-stick basket, digital display, and auto shutoff.',
    brand: 'Mistral',
    category: 'Home & Kitchen',
    price: 8900,
    countInStock: 13,
    rating: 4.4,
    numReviews: 52,
  },
  {
    name: 'Ariston 60cm Electric Cooker',
    // Electric stove / cooker – verified Unsplash
    image: 'https://images.unsplash.com/photo-1556909114-f6e7ad7d3136?auto=format&fit=crop&w=800&q=80',
    description: 'Ariston 60cm freestanding electric cooker with 4 ceramic hob rings and 65L multifunction oven. Ideal for both injera and international cooking.',
    brand: 'Ariston',
    category: 'Home & Kitchen',
    price: 42000,
    countInStock: 5,
    rating: 4.3,
    numReviews: 18,
  },
  {
    name: 'Electric Stand Fan 16-inch',
    // Electric fan – verified Unsplash
    image: 'https://images.unsplash.com/photo-1621844060458-bead56c46b05?auto=format&fit=crop&w=800&q=80',
    description: '16-inch stand fan with 3-speed settings, 360° oscillation, 7-hour timer, and remote control. Quiet motor for home and office use.',
    brand: 'Mitsubishi Electric',
    category: 'Home & Kitchen',
    price: 6200,
    countInStock: 22,
    rating: 4.5,
    numReviews: 67,
  },
  {
    name: 'LG 260L Double-Door Refrigerator',
    // Refrigerator – verified Unsplash
    image: 'https://images.unsplash.com/photo-1571175443880-49e1d25b2bc5?auto=format&fit=crop&w=800&q=80',
    description: 'LG 260L frost-free refrigerator with Smart Inverter Compressor. Linear Cooling keeps food fresh 3× longer. 10-year compressor warranty.',
    brand: 'LG',
    category: 'Home & Kitchen',
    price: 78000,
    countInStock: 6,
    rating: 4.7,
    numReviews: 23,
  },

  // ─── Fashion ──────────────────────────────────────────────────────────────
  {
    name: 'Clarks Desert Boot (Tan)',
    // Tan leather boots – verified Unsplash
    image: 'https://images.unsplash.com/photo-1520639888713-7851133b1ed0?auto=format&fit=crop&w=800&q=80',
    description: 'Clarks iconic Desert Boot in tan beeswax leather with hand-sewn Crepe sole. Classic and comfortable for all-day wear.',
    brand: 'Clarks',
    category: 'Fashion',
    price: 11500,
    countInStock: 16,
    rating: 4.6,
    numReviews: 41,
  },
  {
    name: 'Nike Air Max 270 Sneakers',
    // Nike sneaker – verified Unsplash
    image: 'https://images.unsplash.com/photo-1542291026-7eec264c27ff?auto=format&fit=crop&w=800&q=80',
    description: 'Nike Air Max 270 with the largest heel Air unit for all-day comfort. Engineered mesh upper for breathability. Top seller in Addis Ababa.',
    brand: 'Nike',
    category: 'Fashion',
    price: 13500,
    countInStock: 20,
    rating: 4.5,
    numReviews: 76,
  },
  {
    name: 'Ethiopian Cotton Shirt (Men\'s)',
    // Men's white shirt – verified Unsplash
    image: 'https://images.unsplash.com/photo-1596755094514-f87e34085b2c?auto=format&fit=crop&w=800&q=80',
    description: '100% Ethiopian Awash cotton slim-fit shirt. Lightweight and breathable, with Tilet-inspired embroidery on the collar. Available in white, blue, and grey.',
    brand: 'Addis Fashion',
    category: 'Fashion',
    price: 1200,
    countInStock: 40,
    rating: 4.4,
    numReviews: 55,
  },

  // ─── Books & Education ─────────────────────────────────────────────────────
  {
    name: 'Amharic–English Dictionary (Expanded)',
    // Open dictionary / book – verified Unsplash
    image: 'https://images.unsplash.com/photo-1456513080510-7bf3a84b82f8?auto=format&fit=crop&w=800&q=80',
    description: 'Most comprehensive Amharic–English dictionary with 60,000+ entries, grammar guides, common phrases, and Ethiopian cultural notes.',
    brand: 'Addis Book Press',
    category: 'Books & Education',
    price: 950,
    countInStock: 50,
    rating: 4.8,
    numReviews: 134,
  },
  {
    name: 'Ethiopian History & Civilization (Book)',
    // Stack of books – verified Unsplash
    image: 'https://images.unsplash.com/photo-1524995997946-a1c2e315a42f?auto=format&fit=crop&w=800&q=80',
    description: 'Ethiopia\'s 3000-year history from the Aksumite Empire to the Battle of Adwa. Published by Addis Ababa University Press with rare photographs and maps.',
    brand: 'AAU Press',
    category: 'Books & Education',
    price: 680,
    countInStock: 35,
    rating: 4.7,
    numReviews: 89,
  },

  // ─── Sports ────────────────────────────────────────────────────────────────
  {
    name: 'Adidas Ultraboost 22 Running Shoes',
    // Running shoe – verified Unsplash
    image: 'https://images.unsplash.com/photo-1606107557195-0e29a4b5b4aa?auto=format&fit=crop&w=800&q=80',
    description: 'Inspired by Ethiopia\'s world-champion runners. BOOST midsole and Primeknit+ upper for elite energy return and long-distance comfort.',
    brand: 'Adidas',
    category: 'Sports',
    price: 16500,
    countInStock: 14,
    rating: 4.8,
    numReviews: 62,
  },
  {
    name: 'Speed Jump Rope (Pro)',
    // Jump rope – verified Unsplash
    image: 'https://images.unsplash.com/photo-1598289431512-b97b0917affc?auto=format&fit=crop&w=800&q=80',
    description: 'Professional speed jump rope with ball-bearing handles. Adjustable steel cable, ergonomic foam grip. Used by Ethiopian boxing and athletics teams.',
    brand: 'Homend',
    category: 'Sports',
    price: 380,
    countInStock: 55,
    rating: 4.3,
    numReviews: 91,
  },

  // ─── Health & Beauty ───────────────────────────────────────────────────────
  {
    name: 'Ethiopian Black Seed (Tikur Azmud) Oil',
    // Dark seed oil bottle – verified Unsplash
    image: 'https://images.unsplash.com/photo-1608571423902-eed4a5ad8108?auto=format&fit=crop&w=800&q=80',
    description: 'Cold-pressed Nigella Sativa (Tikur Azmud) oil, 100% pure from organic highland farms in Arsi. Immune-boosting and skin-nourishing.',
    brand: 'Neway Naturals',
    category: 'Health & Beauty',
    price: 620,
    countInStock: 45,
    rating: 4.7,
    numReviews: 116,
  },
  {
    name: 'Argan & Ethiopian Castor Oil Hair Kit',
    // Hair oil bottles flat lay – verified Unsplash
    image: 'https://images.unsplash.com/photo-1571781926291-c477ebfd024b?auto=format&fit=crop&w=800&q=80',
    description: '3-piece kit: Moroccan Argan oil + cold-pressed Ethiopian castor oil. Promotes hair growth, reduces breakage. Beloved for natural hair and braids.',
    brand: 'Habesh Beauty',
    category: 'Health & Beauty',
    price: 890,
    countInStock: 38,
    rating: 4.6,
    numReviews: 74,
  },

  // ─── Gaming ────────────────────────────────────────────────────────────────
  {
    name: 'PlayStation 5 Console (Disc Edition)',
    // PS5 console – verified Unsplash
    image: 'https://images.unsplash.com/photo-1606813907291-d86efa9b94db?auto=format&fit=crop&w=800&q=80',
    description: 'Sony PS5 with DualSense controller, ultra-high-speed SSD, 4K gaming, ray tracing, and 3D Audio. The ultimate next-gen gaming experience.',
    brand: 'Sony',
    category: 'Gaming',
    price: 145000,
    countInStock: 4,
    rating: 5.0,
    numReviews: 37,
  },
  {
    name: 'Xbox Series S 512GB',
    // Xbox controller / console – verified Unsplash
    image: 'https://images.unsplash.com/photo-1621259182978-fbf93132d53d?auto=format&fit=crop&w=800&q=80',
    description: 'Xbox Series S — compact all-digital next-gen console with 512GB SSD, 120fps gaming, and Xbox Game Pass. Perfect for Addis Ababa apartments.',
    brand: 'Microsoft',
    category: 'Gaming',
    price: 68000,
    countInStock: 9,
    rating: 4.5,
    numReviews: 28,
  },
];

export default products;
