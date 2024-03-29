import bcrypt from 'bcryptjs';

const data = {
  users: [
    {
      name: 'Louis',
      email: 'admin@test.com',
      password: bcrypt.hashSync('123456'),
      isAdmin: true,
    },
    {
      name: 'cust',
      email: 'cust@test.com',
      password: bcrypt.hashSync('123456'),
      isAdmin: false,
    },
  ],

  products: [
    {
      //_id: '1',
      name: 'iPhone 12 Pro Max',
      slug: 'iPhone-12-Pro-Max-url-display',
      category: 'mobiles',
      image: '/images/12ProMax.png',
      storage: '1TB',
      price: 779.0,
      countInStock: 10,
      brand: 'Apple',
      rating: 4.5,
      numReviews: 10,
      description:
        'Originally released October 2020 Unlocked, SIM-Free, Model A24111 ' +
        '6.7-inch Super Retina XDR display with OLED ' +
        'A14 Bionic chip with 16-core Neural Engine ' +
        'Video playback: Up to 20 hours ' +
        '5G, Gigabit LTE and 802.11ax Wi-Fi with 2x2 MIMO ' +
        'Bluetooth 5.0 wireless technology ' +
        'NFC with reader mode ' +
        'Pro 12MP Ultra wide, Wide and Telephoto cameras ' +
        'Digital zoom up to 12 ' +
        '4K video recording, 1080p HD video recording ' +
        'Face ID ' +
        'Siri ' +
        'Apple Pay ' +
        '228 g and 0.74 cm (8.03 ounces and 0.29 inches)',
      reviewListing: 'This Product is good at testing reviews',
    },
    {
      // _id: '2',
      name: 'iPhone 12 mini',
      slug: 'iPhone-12-mini-url-display',
      category: 'mobiles',
      image: '/images/12MiniBlue.png',
      storage: '512GB',
      price: 579.0,
      countInStock: 1,
      brand: 'Apple',
      rating: 4.0,
      numReviews: 1,
      description:
        'Originally released October 2020 ' +
        'Unlocked, SIM-Free, Model A23991 ' +
        '5.4-inch Super Retina XDR display with OLED ' +
        'A14 Bionic chip with 16-core Neural Engine ' +
        'Video playback: up to 15 hours ' +
        '5G, Gigabit LTE and 802.11ax Wi-Fi with 2x2 MIMO ' +
        'Bluetooth 5.0 wireless technology ' +
        'NFC with reader mode ' +
        'Dual 12MP Ultra-wide and wide cameras ' +
        'Digital zoom up to 5x ' +
        '4K video recording, 1080p HD video recording ' +
        'Face ID ' +
        'Siri ' +
        'Apple Pay ' +
        '4.76 ounces and 0.29 inches ',
    },
    {
      // _id: '3',
      name: 'iPhone 13 Pro Max',
      slug: 'iPhone-13-Pro-Max-url-display',
      category: 'mobiles',
      image: '/images/13ProMaxGreen.png',
      storage: '1TB',
      price: 1549.0,
      countInStock: 0,
      brand: 'Apple',
      rating: 4.5,
      numReviews: 10,
      description:
        'Originally released September 2021 ' +
        'Unlocked, SIM-Free, Model A26431 ' +
        '6.7-inch Super Retina XDR display with ProMotion and OLED ' +
        'A15 Bionic chip with 16-core Neural Engine ' +
        'Video playback: up to 28 hours ' +
        '5G, Gigabit LTE and 802.11ax Wi-Fi with 2x2 MIMO ' +
        'Bluetooth 5.0 wireless technology ' +
        'NFC with reader mode ' +
        'Pro 12MP: Telephoto, Wide and Ultra Wide cameras ' +
        'Digital zoom up to 15x ' +
        '4K video recording, 1080p HD video recording ' +
        'Face ID ' +
        'Siri ' +
        'Apple Pay ' +
        '240 grams and 7.65 mm.',
    },
    {
      // _id: '4',
      name: 'iPhone 12 Pro',
      slug: 'iPhone-12-Pro-url-display',
      category: 'mobiles',
      image: '/images/iphone12problue.png',
      storage: '512GB',
      price: 949.0,
      countInStock: 4,
      brand: 'Apple',
      rating: 2.5,
      numReviews: 4,
      description:
        'Originally released October 2020 ' +
        'Unlocked, SIM-Free, Model A24071 ' +
        '6.1-inch Super Retina XDR display with OLED ' +
        'A14 Bionic chip with 16-core Neural Engine ' +
        'Video playback: Up to 17 hours ' +
        '5G, Gigabit LTE and 802.11ax Wi-Fi with 2x2 MIMO ' +
        'Bluetooth 5.0 wireless technology ' +
        'NFC with reader mode ' +
        'Pro 12MP Ultra wide, Wide and Telephoto cameras ' +
        'Digital zoom up to 10x ' +
        '4K video recording, 1080p HD video recording ' +
        'Face ID ' +
        'Siri ' +
        'Apple Pay ' +
        '189 g and 0.74 cm (6.66 ounces and 0.29 inches).',
    },
    {
      // _id: '5',
      name: 'iPhone 13 Mini Midnight',
      slug: 'iPhone-13-Mini-Midnight-url-display',
      category: 'mobiles',
      image: '/images/iphone13minimidnight.png',
      storage: '256GB',
      price: 649.0,
      countInStock: 1,
      brand: 'Apple',
      rating: 5,
      numReviews: 1,
      description:
        'Originally released September 2021' +
        'Unlocked, SIM-Free, Model A26281 ' +
        '5.4-inch Super Retina XDR display with OLED ' +
        'A15 Bionic chip with 16-core Neural Engine ' +
        'Video playback: Up to 17 hours ' +
        '5G, Gigabit LTE and 802.11ax Wi-Fi with 2x2 MIMO ' +
        'Bluetooth 5.0 wireless technology ' +
        'NFC with reader mode ' +
        'Dual 12MP Ultra-wide and wide cameras ' +
        'Digital zoom up to 5x ' +
        '4K video recording, 1080p HD video recording ' +
        'Face ID ' +
        'Siri ' +
        'Apple Pay ' +
        '141 grams (4.97 ouches) and 7.7 mm (0.30 inches).',
    },
    {
      // _id: '6',
      name: 'iPhone 12 128GB Green',
      slug: 'iPhone-12-Green-url-display',
      category: 'mobiles',
      image: '/images/iphone12green.png',
      storage: '512GB',
      price: 589.0,
      countInStock: 2,
      brand: 'Apple',
      rating: 4,
      numReviews: 2,
      description:
        'Originally released October 2020 ' +
        'Unlocked, SIM-Free, Model A24031 ' +
        '6.1-inch Super Retina XDR display with OLED ' +
        'A14 Bionic chip with 16-core Neural Engine ' +
        'Video playback: Up to 17 hours ' +
        '5G, Gigabit LTE and 802.11ax Wi‑Fi with 2x2 MIMO ' +
        'Bluetooth 5.0 wireless technology ' +
        'NFC with reader mode ' +
        'Dual 12MP Ultra-wide and wide cameras ' +
        'Digital zoom up to 5x ' +
        '4K video recording, 1080p HD video recording ' +
        'Face ID ' +
        'Siri ' +
        'Apple Pay ' +
        '164g and 0.74cm.',
    },
    {
      // _id: '7',
      name: 'iPhone 12 mini Purple',
      slug: 'iPhone-12-mini-Purple-url-display',
      category: 'mobiles',
      image: '/images/iphone12minipurple.png',
      storage: '512GB',
      price: 589.0,
      countInStock: 7,
      brand: 'Apple',
      rating: 3.0,
      numReviews: 5,
      description:
        'Originally released October 2020 ' +
        'Unlocked, SIM-Free, Model A23991 ' +
        '5.4-inch Super Retina XDR display with OLED ' +
        'A14 Bionic chip with 16-core Neural Engine ' +
        'Video playback: up to 15 hours ' +
        '5G, Gigabit LTE and 802.11ax Wi‑Fi with 2x2 MIMO ' +
        'Bluetooth 5.0 wireless technology ' +
        'NFC with reader mode ' +
        'Dual 12MP Ultra-wide and wide cameras ' +
        'Digital zoom up to 5x ' +
        '4K video recording, 1080p HD video recording ' +
        'Face ID ' +
        'Siri ' +
        'Apple Pay ' +
        '4.76 ounces and 0.29 inches.',
    },
    {
      // _id: '8',
      name: 'iPhone 13 Pro Graphite',
      slug: 'iPhone-13-Pro-Graphite-url-display4',
      category: 'mobiles',
      image: '/images/iphone13prographite.png',
      storage: '1TB',
      price: 1229.0,
      countInStock: 3,
      brand: 'Apple',
      rating: 5.0,
      numReviews: 3,
      description:
        'Originally released September 2021 ' +
        'Unlocked, SIM-Free, Model A26381 ' +
        '6.1-inch Super Retina XDR display with ProMotion and OLED ' +
        'A15 Bionic chip with 16-core Neural Engine ' +
        'Video playback: up to 22 hours ' +
        '5G, Gigabit LTE and 802.11ax Wi‑Fi with 2x2 MIMO ' +
        'Bluetooth 5.0 wireless technology ' +
        'NFC with reader mode ' +
        'Pro 12MP: Telephoto, Wide and Ultra Wide cameras ' +
        'Digital zoom up to 15x ' +
        '4K video recording, 1080p HD video recording ' +
        'Face ID ' +
        'Siri ' +
        'Apple Pay ' +
        '203 grams (7.19 ounces) and 7.6 mm (0.30 inches).',
    },
    {
      //_id: '1',
      name: 'iPhone 12 Pro Max CHANGE',
      slug: 'iPhone-12-Pro-Max-CHANGE-url-display',
      category: 'mobiles',
      image: '/images/12ProMax.png',
      storage: '512GB',
      price: 779.0,
      countInStock: 10,
      brand: 'Apple',
      rating: 4.5,
      numReviews: 10,
      description:
        'Originally released October 2020 Unlocked, SIM-Free, Model A24111 ' +
        '6.7-inch Super Retina XDR display with OLED ' +
        'A14 Bionic chip with 16-core Neural Engine ' +
        'Video playback: Up to 20 hours ' +
        '5G, Gigabit LTE and 802.11ax Wi-Fi with 2x2 MIMO ' +
        'Bluetooth 5.0 wireless technology ' +
        'NFC with reader mode ' +
        'Pro 12MP Ultra wide, Wide and Telephoto cameras ' +
        'Digital zoom up to 12 ' +
        '4K video recording, 1080p HD video recording ' +
        'Face ID ' +
        'Siri ' +
        'Apple Pay ' +
        '228 g and 0.74 cm (8.03 ounces and 0.29 inches)',
    },
    {
      // _id: '2',
      name: 'iPhone 12 mini CHANGE',
      slug: 'iPhone-12-mini-CHANGE-url-display',
      category: 'mobiles',
      image: '/images/12MiniBlue.png',
      storage: '512GB',
      price: 579.0,
      countInStock: 1,
      brand: 'Apple',
      rating: 4.0,
      numReviews: 1,
      description:
        'Originally released October 2020 ' +
        'Unlocked, SIM-Free, Model A23991 ' +
        '5.4-inch Super Retina XDR display with OLED ' +
        'A14 Bionic chip with 16-core Neural Engine ' +
        'Video playback: up to 15 hours ' +
        '5G, Gigabit LTE and 802.11ax Wi-Fi with 2x2 MIMO ' +
        'Bluetooth 5.0 wireless technology ' +
        'NFC with reader mode ' +
        'Dual 12MP Ultra-wide and wide cameras ' +
        'Digital zoom up to 5x ' +
        '4K video recording, 1080p HD video recording ' +
        'Face ID ' +
        'Siri ' +
        'Apple Pay ' +
        '4.76 ounces and 0.29 inches ',
    },
    {
      // _id: '3',
      name: 'iPhone 13 Pro Max CHANGE',
      slug: 'iPhone-13-Pro-Max-CHANGE-url-display',
      category: 'mobiles',
      image: '/images/13ProMaxGreen.png',
      storage: '1TB',
      price: 1549.0,
      countInStock: 0,
      brand: 'Apple',
      rating: 4.5,
      numReviews: 10,
      description:
        'Originally released September 2021 ' +
        'Unlocked, SIM-Free, Model A26431 ' +
        '6.7-inch Super Retina XDR display with ProMotion and OLED ' +
        'A15 Bionic chip with 16-core Neural Engine ' +
        'Video playback: up to 28 hours ' +
        '5G, Gigabit LTE and 802.11ax Wi-Fi with 2x2 MIMO ' +
        'Bluetooth 5.0 wireless technology ' +
        'NFC with reader mode ' +
        'Pro 12MP: Telephoto, Wide and Ultra Wide cameras ' +
        'Digital zoom up to 15x ' +
        '4K video recording, 1080p HD video recording ' +
        'Face ID ' +
        'Siri ' +
        'Apple Pay ' +
        '240 grams and 7.65 mm.',
    },
    {
      // _id: '4',
      name: 'iPhone 12 Pro CHANGE',
      slug: 'iPhone-12-Pro-CHANGE-url-display',
      category: 'mobiles',
      image: '/images/iphone12problue.png',
      storage: '1TB',
      price: 949.0,
      countInStock: 4,
      brand: 'Apple',
      rating: 2.5,
      numReviews: 4,
      description:
        'Originally released October 2020 ' +
        'Unlocked, SIM-Free, Model A24071 ' +
        '6.1-inch Super Retina XDR display with OLED ' +
        'A14 Bionic chip with 16-core Neural Engine ' +
        'Video playback: Up to 17 hours ' +
        '5G, Gigabit LTE and 802.11ax Wi-Fi with 2x2 MIMO ' +
        'Bluetooth 5.0 wireless technology ' +
        'NFC with reader mode ' +
        'Pro 12MP Ultra wide, Wide and Telephoto cameras ' +
        'Digital zoom up to 10x ' +
        '4K video recording, 1080p HD video recording ' +
        'Face ID ' +
        'Siri ' +
        'Apple Pay ' +
        '189 g and 0.74 cm (6.66 ounces and 0.29 inches).',
    },
    {
      // _id: '4',
      name: 'Galaxy S20',
      slug: 'Galaxy-S20-url-display',
      category: 'mobiles',
      image: '/images/SamsungS20.png',
      storage: '128GB',
      price: 449.0,
      countInStock: 2,
      brand: 'Samsung',
      rating: 3.8,
      numReviews: 1,
      description:
        'Capture the world around you like never before ' +
        'Experience every moment in full, edge-to-edge clarity ' +
        'Speed, power and performance fit for the future ' +
        'Stay in charge longer than ever before ' +
        'Truly epic power for truly epic days ' +
        'Keep focused on what matters most to you ',
    },
    {
      // _id: '4',
      name: 'Google Pixel 6',
      slug: 'Google-Pixel-6-url-display',
      category: 'mobiles',
      image: '/images/Google_Pixel_6.png',
      storage: '128GB',
      price: 379.0,
      countInStock: 5,
      brand: 'Google',
      rating: 3.5,
      numReviews: 2,
      description:
        'The adaptive battery lasts up to 48 hours on a single charge with the Extreme Battery Saver ' +
        'Dedicated just to security, the Titan M2 chip watches over multiple layers of protection so your data stay absolutely safe ' +
        'If theres a stranger in your picture, use the Magic Eraser to effortlessly remove them from the background ' +
        'The Pixel 6 is waterproof with IP68 certification, so you can take it with you in the shower or in the pool ' +
        'With built-in Google Assistant, you can compose messages, answer calls, set alarms and so much more, with just your voice ',
    },
    {
      // _id: '4',
      name: 'Mororola Moto g22',
      slug: 'Mororola-Moto-g22-url-display',
      category: 'mobiles',
      image: '/images/motorolag22.png',
      storage: '64GB',
      price: 99.0,
      countInStock: 1,
      brand: 'Motorola',
      rating: 4,
      numReviews: 1,
      description:
        'Battery: Li-Po 5000 mAh' +
        'Internal memory: 64GB ' +
        'External memory: microSDXC ' +
        'RAM: 4GB ' +
        'Screen size: 6.5 inches, Resolution: 720 x 1600 pixels ',
    },
    {
      // _id: '4',
      name: 'Nokia G10',
      slug: 'Nokia-G10-url-display',
      category: 'mobiles',
      image: '/images/nokiag10.png',
      storage: '32GB',
      price: 89.0,
      countInStock: 3,
      brand: 'Nokia',
      rating: 2,
      numReviews: 3,
      description:
        'The secret to happiness is… battery life. Once your ' +
        'mobile dies its all missed calls, sulking, and ' +
        'tantrums. Thats why Nokia G10 comes with a battery ' +
        'that can last up to 3 days between charges ',
    },
  ],
};
export default data;
