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
      slug: 'iPhone 12 Pro Max',
      category: 'mobiles',
      image: '/images/12ProMax.png', // 679px x 829px
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
        '5G, Gigabit LTE and 802.11ax Wi‑Fi with 2x2 MIMO ' +
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
      name: 'iPhone 12 mini',
      slug: 'iPhone 12 mini',
      category: 'mobiles',
      image: '/images/12MiniBlue.png',
      price: 579.0,
      countInStock: 1,
      brand: 'Apple',
      rating: 4.0,
      numReviews: 1,
      description:
        'Originally released October 2020' +
        'Unlocked, SIM-Free, Model A23991' +
        '5.4-inch Super Retina XDR display with OLED' +
        'A14 Bionic chip with 16-core Neural Engine' +
        'Video playback: up to 15 hours' +
        '5G, Gigabit LTE and 802.11ax Wi‑Fi with 2x2 MIMO' +
        'Bluetooth 5.0 wireless technology' +
        'NFC with reader mode' +
        'Dual 12MP Ultra-wide and wide cameras' +
        'Digital zoom up to 5x' +
        '4K video recording, 1080p HD video recording' +
        'Face ID' +
        'Siri' +
        'Apple Pay' +
        '4.76 ounces and 0.29 inches',
    },
    {
      // _id: '3',
      name: 'iPhone 13 Pro Max',
      slug: 'iPhone 13 Pro Max',
      category: 'mobiles',
      image: '/images/13ProMaxGreen.png',
      price: 1549.0,
      countInStock: 0,
      brand: 'Apple',
      rating: 4.5,
      numReviews: 10,
      description:
        'Originally released September 2021' +
        'Unlocked, SIM-Free, Model A26431' +
        '6.7-inch Super Retina XDR display with ProMotion and OLED' +
        'A15 Bionic chip with 16-core Neural Engine' +
        'Video playback: up to 28 hours' +
        '5G, Gigabit LTE and 802.11ax Wi‑Fi with 2x2 MIMO' +
        'Bluetooth 5.0 wireless technology' +
        'NFC with reader mode' +
        'Pro 12MP: Telephoto, Wide and Ultra Wide cameras' +
        'Digital zoom up to 15x' +
        '4K video recording, 1080p HD video recording' +
        'Face ID' +
        'Siri' +
        'Apple Pay' +
        '240 grams and 7.65 mm.',
    },
    {
      // _id: '4',
      name: 'Phone4',
      slug: 'phone4-url-display',
      category: 'mobiles',
      image: '/images/12ProMax.png',
      price: 40,
      countInStock: 1,
      brand: 'Apple',
      rating: 4.5,
      numReviews: 10,
      description: 'Apple powerful smart phone',
    },
    {
      // _id: '5',
      name: 'Phone5',
      slug: 'phone4-url-display1',
      category: 'mobiles',
      image: '/images/12ProMax.png',
      price: 40,
      countInStock: 1,
      brand: 'Apple',
      rating: 4.5,
      numReviews: 10,
      description: 'Apple powerful smart phone',
    },
    {
      // _id: '6',
      name: 'Phone6',
      slug: 'phone4-url-display2',
      category: 'mobiles',
      image: '/images/12ProMax.png',
      price: 40,
      countInStock: 1,
      brand: 'Apple',
      rating: 4.5,
      numReviews: 10,
      description: 'Apple powerful smart phone',
    },
    {
      // _id: '7',
      name: 'Phone7',
      slug: 'phone4-url-display3',
      category: 'mobiles',
      image: '/images/12ProMax.png',
      price: 40,
      countInStock: 1,
      brand: 'Apple',
      rating: 4.5,
      numReviews: 10,
      description: 'Apple powerful smart phone',
    },
    {
      // _id: '8',
      name: 'Phone8',
      slug: 'phone4-url-display4',
      category: 'mobiles',
      image: '/images/12ProMax.png',
      price: 40,
      countInStock: 1,
      brand: 'Apple',
      rating: 4.5,
      numReviews: 10,
      description: 'Apple powerful smart phone',
    },
    {
      //_id: '4',
      name: 'Phone9',
      slug: 'phone4-url-display5',
      category: 'mobiles',
      image: '/images/p4.jpg.png',
      price: 400,
      countInStock: 10,
      brand: 'Apple',
      rating: 4.5,
      numReviews: 10,
      description: 'Apple powerful smart phone',
    },
  ],
};
export default data;
