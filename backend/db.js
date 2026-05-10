const low = require('lowdb');
const FileSync = require('lowdb/adapters/FileSync');
const path = require('path');

const adapter = new FileSync(path.join(__dirname, 'data', 'db.json'));
const db = low(adapter);

const seedProducts = [
  { id: 1,  name: 'iPhone 15 Pro',      description: 'Apple flagship smartphone with titanium frame',     price: 999.99,  category: 'Phones',      image: 'https://picsum.photos/seed/phone1/400/300',   stock: 25 },
  { id: 2,  name: 'Samsung Galaxy S24', description: 'Android powerhouse with AI features',               price: 849.99,  category: 'Phones',      image: 'https://picsum.photos/seed/phone2/400/300',   stock: 30 },
  { id: 3,  name: 'MacBook Pro 14"',    description: 'M3 chip, Liquid Retina XDR display',                price: 1999.99, category: 'Laptops',     image: 'https://picsum.photos/seed/laptop1/400/300',  stock: 15 },
  { id: 4,  name: 'Dell XPS 15',        description: 'OLED display, Intel Core i9',                       price: 1799.99, category: 'Laptops',     image: 'https://picsum.photos/seed/laptop2/400/300',  stock: 12 },
  { id: 5,  name: 'Sony WH-1000XM5',   description: 'Industry-leading noise cancelling headphones',      price: 349.99,  category: 'Audio',       image: 'https://picsum.photos/seed/audio1/400/300',   stock: 40 },
  { id: 6,  name: 'AirPods Pro 2',      description: 'Active noise cancellation, spatial audio',          price: 249.99,  category: 'Audio',       image: 'https://picsum.photos/seed/audio2/400/300',   stock: 50 },
  { id: 7,  name: 'iPad Pro 12.9"',     description: 'M2 chip, mini-LED display',                        price: 1099.99, category: 'Tablets',     image: 'https://picsum.photos/seed/tablet1/400/300',  stock: 20 },
  { id: 8,  name: 'Samsung Tab S9',     description: 'AMOLED display, S-Pen included',                   price: 799.99,  category: 'Tablets',     image: 'https://picsum.photos/seed/tablet2/400/300',  stock: 18 },
  { id: 9,  name: 'LG 27" 4K Monitor', description: 'IPS panel, USB-C, 144Hz',                          price: 499.99,  category: 'Monitors',    image: 'https://picsum.photos/seed/monitor1/400/300', stock: 22 },
  { id: 10, name: 'Logitech MX Master 3', description: 'Advanced wireless mouse, ergonomic design',      price: 99.99,   category: 'Accessories', image: 'https://picsum.photos/seed/access1/400/300',  stock: 60 },
  { id: 11, name: 'Mechanical Keyboard',  description: 'RGB backlit, Cherry MX switches',                price: 149.99,  category: 'Accessories', image: 'https://picsum.photos/seed/access2/400/300',  stock: 35 },
  { id: 12, name: 'GoPro Hero 12',        description: 'Action camera, 5.3K video, waterproof',         price: 399.99,  category: 'Cameras',     image: 'https://picsum.photos/seed/cam1/400/300',     stock: 28 },
];

db.defaults({
  products: seedProducts,
  users: [],
  cartItems: [],
  nextProductId: seedProducts.length + 1,
  nextUserId: 1,
  nextCartId: 1,
}).write();

module.exports = db;
