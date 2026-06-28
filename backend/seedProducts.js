const mongoose = require('mongoose');
const Product = require('./models/Product');
require('dotenv').config();

const sampleProducts = [
  // Cricket Products
  {
    name: 'SG Cricket Bat English Willow',
    description: 'Professional grade English willow bat with excellent pickup and sweet spot. Ideal for intermediate to professional players.',
    price: 1499,
    category: 'Cricket',
    sport: 'Cricket',
    skillLevel: 'Intermediate',
    ageGroup: 'Adult',
    productType: 'Cricket Bat',
    brand: 'SG',
    stock: 50,
    images: ['https://images.unsplash.com/photo-1531415074968-036ba1b575da?w=500&q=80'],
    rating: 4.5,
    numReviews: 12
  },
  {
    name: 'SS Cricket Ball Red Leather',
    description: 'Premium quality leather cricket ball with excellent shape retention and durability. Perfect for match play.',
    price: 899,
    category: 'Cricket',
    sport: 'Cricket',
    skillLevel: 'Professional',
    ageGroup: 'Adult',
    productType: 'Cricket Ball',
    brand: 'SS',
    stock: 100,
    images: ['https://images.unsplash.com/photo-1624526267942-ab0ff8a3e972?w=500&q=80'],
    rating: 4.8,
    numReviews: 25
  },
  {
    name: 'SS Batting Gloves Professional',
    description: 'Professional batting gloves worn on hands while batting like Kohli. Excellent protection and grip with cotton palm and foam padding.',
    price: 699,
    category: 'Cricket',
    sport: 'Cricket',
    skillLevel: 'Professional',
    ageGroup: 'Adult',
    productType: 'Batting Gloves',
    brand: 'SS',
    stock: 80,
    images: ['https://images.unsplash.com/photo-1614632537197-38a17061c2bd?w=500&q=80'],
    rating: 4.6,
    numReviews: 18
  },
  {
    name: 'SG Wicketkeeping Gloves',
    description: 'Professional wicketkeeping gloves with excellent grip and protection. Cotton palm with sponge padding.',
    price: 999,
    category: 'Cricket',
    sport: 'Cricket',
    skillLevel: 'Professional',
    ageGroup: 'Adult',
    productType: 'Wicketkeeping Gloves',
    brand: 'SG',
    stock: 40,
    images: ['https://images.unsplash.com/photo-1587280501635-68a0e82cd5ff?w=500&q=80'],
    rating: 4.7,
    numReviews: 15
  },
  // Football Products
  {
    name: 'Adidas Football Copa Sense',
    description: 'Premium leather football with exceptional touch and control. Features innovative sensepod technology for enhanced ball feel.',
    price: 4999,
    category: 'Football',
    sport: 'Football',
    skillLevel: 'Professional',
    ageGroup: 'Adult',
    productType: 'Football',
    brand: 'Adidas',
    stock: 30,
    images: ['https://images.unsplash.com/photo-1614632537197-38a17061c2bd?w=500&q=80'],
    rating: 4.9,
    numReviews: 18
  },
  {
    name: 'Nike Football Mercurial Vapor',
    description: 'Lightweight football boots with explosive speed. Features dynamic fit collar and textured upper for enhanced control.',
    price: 8999,
    category: 'Football',
    sport: 'Football',
    skillLevel: 'Professional',
    ageGroup: 'Adult',
    productType: 'Football Shoes',
    brand: 'Nike',
    stock: 25,
    images: ['https://images.unsplash.com/photo-1606107557195-0e29a4b5b4aa?w=500&q=80'],
    rating: 4.7,
    numReviews: 22
  },
  // Basketball Products
  {
    name: 'Spalding Basketball Official Size',
    description: 'Official size 7 basketball with composite leather cover. Excellent grip and durability for indoor and outdoor play.',
    price: 2499,
    category: 'Basketball',
    sport: 'Basketball',
    skillLevel: 'Intermediate',
    ageGroup: 'Adult',
    productType: 'Basketball',
    brand: 'Spalding',
    stock: 60,
    images: ['https://images.unsplash.com/photo-1494197134875-6f9f8ffb8f9d?w=500&q=80'],
    rating: 4.6,
    numReviews: 28
  },
  {
    name: 'Wilson Basketball NBA Replica',
    description: 'Official NBA replica basketball with authentic styling. Features composite leather construction for superior grip.',
    price: 2999,
    category: 'Basketball',
    sport: 'Basketball',
    skillLevel: 'Beginner',
    ageGroup: 'Youth',
    productType: 'Basketball',
    brand: 'Wilson',
    stock: 45,
    images: ['https://images.unsplash.com/photo-1519861531473-9200262188bf?w=500&q=80'],
    rating: 4.7,
    numReviews: 20
  },
  // Volleyball Products
  {
    name: 'Mikasa Volleyball Official',
    description: 'Official match volleyball with excellent grip and durability. Perfect for indoor and outdoor play.',
    price: 1999,
    category: 'Volleyball',
    sport: 'Volleyball',
    skillLevel: 'Professional',
    ageGroup: 'Adult',
    productType: 'Volleyball',
    brand: 'Mikasa',
    stock: 50,
    images: ['https://images.unsplash.com/photo-1592656094267-764a45148838?w=500&q=80'],
    rating: 4.8,
    numReviews: 22
  },
  // Handball Products
  {
    name: 'Select Handball Official',
    description: 'Official match handball with excellent grip. Perfect for professional and amateur play.',
    price: 1499,
    category: 'Handball',
    sport: 'Handball',
    skillLevel: 'Professional',
    ageGroup: 'Adult',
    productType: 'Handball',
    brand: 'Select',
    stock: 40,
    images: ['https://images.unsplash.com/photo-1551958219-acbc608c6377?w=500&q=80'],
    rating: 4.5,
    numReviews: 15
  },
  // Tennis Products
  {
    name: 'Wilson Tennis Ball Championship',
    description: 'Premium tennis balls with excellent bounce and durability. Official ball for many tournaments.',
    price: 599,
    category: 'Tennis',
    sport: 'Tennis',
    skillLevel: 'Professional',
    ageGroup: 'Adult',
    productType: 'Tennis Ball',
    brand: 'Wilson',
    stock: 200,
    images: ['https://images.unsplash.com/photo-1595435934249-5df7ed86e1c0?w=500&q=80'],
    rating: 4.7,
    numReviews: 35
  },
  {
    name: 'Wilson Tennis Racket Pro Staff',
    description: 'Classic tennis racket with excellent control and feel. Used by professional players worldwide.',
    price: 8999,
    category: 'Tennis',
    sport: 'Tennis',
    skillLevel: 'Professional',
    ageGroup: 'Adult',
    productType: 'Tennis Racket',
    brand: 'Wilson',
    stock: 30,
    images: ['https://images.unsplash.com/photo-1622279457486-62dcc4a431d6?w=500&q=80'],
    rating: 4.9,
    numReviews: 22
  },
  // Baseball Products
  {
    name: 'Rawlings Baseball Official',
    description: 'Official league baseball with excellent grip and durability. Perfect for practice and match play.',
    price: 799,
    category: 'Baseball',
    sport: 'Baseball',
    skillLevel: 'Professional',
    ageGroup: 'Adult',
    productType: 'Baseball',
    brand: 'Rawlings',
    stock: 100,
    images: ['https://images.unsplash.com/photo-1579952363873-27f3bade9f55?w=500&q=80'],
    rating: 4.6,
    numReviews: 28
  },
  {
    name: 'Easton Baseball Bat Composite',
    description: 'Professional composite baseball bat with excellent power and balance. Approved for league play.',
    price: 5999,
    category: 'Baseball',
    sport: 'Baseball',
    skillLevel: 'Professional',
    ageGroup: 'Adult',
    productType: 'Baseball Bat',
    brand: 'Easton',
    stock: 25,
    images: ['https://images.unsplash.com/photo-1531415074968-036ba1b575da?w=500&q=80'],
    rating: 4.8,
    numReviews: 18
  },
  // Rugby Products
  {
    name: 'Gilbert Rugby Ball Official',
    description: 'Official match rugby ball with excellent grip and durability. Perfect for all levels of play.',
    price: 2499,
    category: 'Rugby',
    sport: 'Rugby',
    skillLevel: 'Professional',
    ageGroup: 'Adult',
    productType: 'Rugby Ball',
    brand: 'Gilbert',
    stock: 35,
    images: ['https://images.unsplash.com/photo-1587280501635-68a0e82cd5ff?w=500&q=80'],
    rating: 4.7,
    numReviews: 20
  },
  // Badminton Products
  {
    name: 'Yonex Badminton Racket Astrox 88D',
    description: 'Professional badminton racket with head-heavy balance for power players. Features nanomesh neo technology for enhanced shaft flex.',
    price: 12999,
    category: 'Badminton',
    sport: 'Badminton',
    skillLevel: 'Professional',
    ageGroup: 'Adult',
    productType: 'Badminton Racket',
    brand: 'Yonex',
    stock: 20,
    images: ['https://images.unsplash.com/photo-1622279457486-62dcc4a431d6?w=500&q=80'],
    rating: 4.8,
    numReviews: 15
  },
  {
    name: 'Li-Ning Badminton Shuttlecock',
    description: 'Premium feather shuttlecock with excellent flight stability and durability. Approved for tournament play.',
    price: 1499,
    category: 'Badminton',
    sport: 'Badminton',
    skillLevel: 'Intermediate',
    ageGroup: 'Adult',
    productType: 'Shuttlecock',
    brand: 'Li-Ning',
    stock: 200,
    images: ['https://images.unsplash.com/photo-1599586120429-48281b6f0ece?w=500&q=80'],
    rating: 4.6,
    numReviews: 30
  },
  // Table Tennis Products
  {
    name: 'Stiga Table Tennis Bat Pro Carbon',
    description: 'Professional table tennis bat with carbon fiber blade for speed and power. ITTF approved rubber sheets.',
    price: 3999,
    category: 'Table Tennis',
    sport: 'Table Tennis',
    skillLevel: 'Professional',
    ageGroup: 'Adult',
    productType: 'Table Tennis Bat',
    brand: 'Stiga',
    stock: 35,
    images: ['https://images.unsplash.com/photo-1534158914592-062992fbe900?w=500&q=80'],
    rating: 4.8,
    numReviews: 16
  },
  {
    name: 'Donic Table Tennis Ball 3-Star',
    description: 'ITTF approved 3-star table tennis balls with consistent bounce and spin. Pack of 6 balls.',
    price: 599,
    category: 'Table Tennis',
    sport: 'Table Tennis',
    skillLevel: 'Beginner',
    ageGroup: 'Adult',
    productType: 'Table Tennis Ball',
    brand: 'Donic',
    stock: 150,
    images: ['https://images.unsplash.com/photo-1595435934249-5df7ed86e1c0?w=500&q=80'],
    rating: 4.5,
    numReviews: 42
  },
  // Hockey Products
  {
    name: 'Dhyan Chand Hockey Stick Composite',
    description: 'Composite hockey stick with excellent power and control. 90% carbon construction for professional players.',
    price: 4999,
    category: 'Hockey',
    sport: 'Hockey',
    skillLevel: 'Professional',
    ageGroup: 'Adult',
    productType: 'Hockey Stick',
    brand: 'Dhyan Chand',
    stock: 25,
    images: ['https://images.unsplash.com/photo-1587280501635-68a0e82cd5ff?w=500&q=80'],
    rating: 4.6,
    numReviews: 14
  },
  {
    name: 'Grays Hockey Stick Beginner',
    description: 'Fiberglass hockey stick perfect for beginners. Lightweight with good balance and control.',
    price: 1999,
    category: 'Hockey',
    sport: 'Hockey',
    skillLevel: 'Beginner',
    ageGroup: 'Youth',
    productType: 'Hockey Stick',
    brand: 'Grays',
    stock: 40,
    images: ['https://images.unsplash.com/photo-1551958219-acbc608c6377?w=500&q=80'],
    rating: 4.4,
    numReviews: 18
  },
  // Cycling Products
  {
    name: 'Giant Cycling Bike Defy Advanced',
    description: 'Advanced composite road bike with lightweight frame and smooth ride quality. Perfect for long-distance cycling.',
    price: 89999,
    category: 'Cycling',
    sport: 'Cycling',
    skillLevel: 'Intermediate',
    ageGroup: 'Adult',
    productType: 'Bicycle',
    brand: 'Giant',
    stock: 10,
    images: ['https://images.unsplash.com/photo-1485965120184-e220f721d03e?w=500&q=80'],
    rating: 4.9,
    numReviews: 8
  },
  {
    name: 'KTM Cycling Mountain Bike',
    description: 'Full-suspension mountain bike with excellent trail performance. Features hydraulic disc brakes and 27.5-inch wheels.',
    price: 65000,
    category: 'Cycling',
    sport: 'Cycling',
    skillLevel: 'Intermediate',
    ageGroup: 'Adult',
    productType: 'Mountain Bike',
    brand: 'KTM',
    stock: 8,
    images: ['https://images.unsplash.com/photo-1576435728678-38d01d52e38c?w=500&q=80'],
    rating: 4.7,
    numReviews: 12
  },
  // Running Products
  {
    name: 'Nike Running Shoes Air Zoom Pegasus',
    description: 'Responsive running shoes with Zoom Air units for cushioned ride. Breathable mesh upper and durable outsole.',
    price: 7999,
    category: 'Running',
    sport: 'Running',
    skillLevel: 'Beginner',
    ageGroup: 'Adult',
    productType: 'Running Shoes',
    brand: 'Nike',
    stock: 50,
    images: ['https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=500&q=80'],
    rating: 4.5,
    numReviews: 45
  },
  {
    name: 'Adidas Running Shoes Ultraboost',
    description: 'Energy-returning running shoes with Boost midsole. Primeknit upper for adaptive fit and comfort.',
    price: 9999,
    category: 'Running',
    sport: 'Running',
    skillLevel: 'Intermediate',
    ageGroup: 'Adult',
    productType: 'Running Shoes',
    brand: 'Adidas',
    stock: 40,
    images: ['https://images.unsplash.com/photo-1608231387042-66d1773070a5?w=500&q=80'],
    rating: 4.8,
    numReviews: 38
  },
  // Spikes
  {
    name: 'Nike Spikes Zoom Rival',
    description: 'Lightweight track spikes for sprinting and running events. Excellent traction and speed.',
    price: 6999,
    category: 'Running',
    sport: 'Running',
    skillLevel: 'Professional',
    ageGroup: 'Adult',
    productType: 'Spikes',
    brand: 'Nike',
    stock: 30,
    images: ['https://images.unsplash.com/photo-1606107557195-0e29a4b5b4aa?w=500&q=80'],
    rating: 4.7,
    numReviews: 25
  },
  // Walking Shoes
  {
    name: 'Skechers Walking Shoes Go Walk',
    description: 'Comfortable walking shoes with cushioned insole and breathable mesh. Perfect for daily walks.',
    price: 4999,
    category: 'Running',
    sport: 'Running',
    skillLevel: 'Beginner',
    ageGroup: 'Adult',
    productType: 'Walking Shoes',
    brand: 'Skechers',
    stock: 45,
    images: ['https://images.unsplash.com/photo-1534438327276-14e5300c3a48?w=500&q=80'],
    rating: 4.6,
    numReviews: 32
  },
  // Gym Shoes
  {
    name: 'Nike Gym Shoes Metcon',
    description: 'Cross-training shoes with stable base and excellent grip. Perfect for gym workouts and weightlifting.',
    price: 8999,
    category: 'Fitness & Gym',
    sport: 'Fitness & Gym',
    skillLevel: 'Intermediate',
    ageGroup: 'Adult',
    productType: 'Gym Shoes',
    brand: 'Nike',
    stock: 35,
    images: ['https://images.unsplash.com/photo-1571902943202-507ec2618e8f?w=500&q=80'],
    rating: 4.8,
    numReviews: 28
  },
  // Kabaddi Products
  {
    name: 'Proline Kabaddi Jersey Professional',
    description: 'Professional kabaddi jersey with moisture-wicking fabric. Lightweight and durable for intense gameplay.',
    price: 1299,
    category: 'Kabaddi',
    sport: 'Kabaddi',
    skillLevel: 'Professional',
    ageGroup: 'Adult',
    productType: 'Kabaddi Jersey',
    brand: 'Proline',
    stock: 80,
    images: ['https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?w=500&q=80'],
    rating: 4.3,
    numReviews: 15
  },
  // Swimming Products
  {
    name: 'Speedo Swimming Goggles Pro',
    description: 'Professional swimming goggles with anti-fog coating and UV protection. Comfortable silicone seal.',
    price: 1499,
    category: 'Swimming',
    sport: 'Swimming',
    skillLevel: 'Intermediate',
    ageGroup: 'Adult',
    productType: 'Swimming Goggles',
    brand: 'Speedo',
    stock: 60,
    images: ['https://images.unsplash.com/photo-1517649763962-0c623066013b?w=500&q=80'],
    rating: 4.6,
    numReviews: 35
  },
  {
    name: 'Arena Swimming Cap Silicone',
    description: 'Premium silicone swimming cap for reduced drag and hair protection. Durable and easy to put on.',
    price: 599,
    category: 'Swimming',
    sport: 'Swimming',
    skillLevel: 'Beginner',
    ageGroup: 'Adult',
    productType: 'Swimming Cap',
    brand: 'Arena',
    stock: 120,
    images: ['https://images.unsplash.com/photo-1530549387789-4c1017266635?w=500&q=80'],
    rating: 4.5,
    numReviews: 42
  },
  // Fitness & Gym Products
  {
    name: 'Fitness Dumbbell Set 20kg',
    description: 'Complete dumbbell set with adjustable weights. Includes rack and weight plates for home gym.',
    price: 4999,
    category: 'Fitness & Gym',
    sport: 'Fitness & Gym',
    skillLevel: 'Beginner',
    ageGroup: 'Adult',
    productType: 'Dumbbell Set',
    brand: 'Fitness Gear',
    stock: 25,
    images: ['https://images.unsplash.com/photo-1534438327276-14e5300c3a48?w=500&q=80'],
    rating: 4.7,
    numReviews: 55
  },
  {
    name: 'Yoga Mat Premium 6mm',
    description: 'Extra thick yoga mat with non-slip surface. Provides excellent cushioning for all yoga poses.',
    price: 999,
    category: 'Fitness & Gym',
    sport: 'Fitness & Gym',
    skillLevel: 'Beginner',
    ageGroup: 'Adult',
    productType: 'Yoga Mat',
    brand: 'Yoga Pro',
    stock: 100,
    images: ['https://images.unsplash.com/photo-1601925260368-ae2f83cf8b7f?w=500&q=80'],
    rating: 4.8,
    numReviews: 68
  },
  {
    name: 'Nike Sweatbands Sports',
    description: 'Set of sports sweatbands for wrist and head. Absorbent cotton blend for moisture management during workouts.',
    price: 299,
    category: 'Fitness & Gym',
    sport: 'Fitness & Gym',
    skillLevel: 'Beginner',
    ageGroup: 'Adult',
    productType: 'Sweatbands',
    brand: 'Nike',
    stock: 200,
    images: ['https://images.unsplash.com/photo-1571902943202-507ec2618e8f?w=500&q=80'],
    rating: 4.3,
    numReviews: 45
  },
  {
    name: 'Adidas Gym Shorts Pro',
    description: 'Professional gym shorts with moisture-wicking fabric. Lightweight athletic shorts for workouts and training.',
    price: 799,
    category: 'Fitness & Gym',
    sport: 'Fitness & Gym',
    skillLevel: 'Beginner',
    ageGroup: 'Adult',
    productType: 'Shorts',
    brand: 'Adidas',
    stock: 120,
    images: ['https://images.unsplash.com/photo-1506629082955-511b1aa562c8?w=500&q=80'],
    rating: 4.5,
    numReviews: 52
  },
  {
    name: 'Nike Gym Equipment Resistance Bands',
    description: 'Set of resistance bands for strength training. Different resistance levels for various exercises.',
    price: 1299,
    category: 'Fitness & Gym',
    sport: 'Fitness & Gym',
    skillLevel: 'Beginner',
    ageGroup: 'Adult',
    productType: 'Gym Equipment',
    brand: 'Nike',
    stock: 80,
    images: ['https://images.unsplash.com/photo-1598289431512-b97b0917affc?w=500&q=80'],
    rating: 4.6,
    numReviews: 38
  },
  // Sports Apparel
  {
    name: 'Nike Cricket Jersey Professional',
    description: 'Professional cricket jersey with moisture-wicking fabric. Team colors and numbering available.',
    price: 1499,
    category: 'Cricket',
    sport: 'Cricket',
    skillLevel: 'Professional',
    ageGroup: 'Adult',
    productType: 'Jersey',
    brand: 'Nike',
    stock: 60,
    images: ['https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?w=500&q=80'],
    rating: 4.7,
    numReviews: 22
  },
  {
    name: 'Adidas Football Jersey Professional',
    description: 'Professional football jersey with breathable fabric. Official team styling and customization.',
    price: 1999,
    category: 'Football',
    sport: 'Football',
    skillLevel: 'Professional',
    ageGroup: 'Adult',
    productType: 'Jersey',
    brand: 'Adidas',
    stock: 50,
    images: ['https://images.unsplash.com/photo-1576566588028-4147f3842f27?w=500&q=80'],
    rating: 4.8,
    numReviews: 35
  },
  {
    name: 'Nike Basketball Jersey Pro',
    description: 'Professional basketball jersey with moisture management. Lightweight and comfortable for gameplay.',
    price: 1799,
    category: 'Basketball',
    sport: 'Basketball',
    skillLevel: 'Professional',
    ageGroup: 'Adult',
    productType: 'Jersey',
    brand: 'Nike',
    stock: 45,
    images: ['https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?w=500&q=80'],
    rating: 4.6,
    numReviews: 28
  },
  {
    name: 'Adidas Tracksuit Professional',
    description: 'Professional tracksuit with jacket and pants. Perfect for warm-ups and casual wear.',
    price: 3999,
    category: 'Fitness & Gym',
    sport: 'Fitness & Gym',
    skillLevel: 'Beginner',
    ageGroup: 'Adult',
    productType: 'Tracksuit',
    brand: 'Adidas',
    stock: 40,
    images: ['https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?w=500&q=80'],
    rating: 4.7,
    numReviews: 32
  },
  {
    name: 'Nike Running Tracksuit',
    description: 'Lightweight running tracksuit with breathable fabric. Perfect for outdoor training.',
    price: 3499,
    category: 'Running',
    sport: 'Running',
    skillLevel: 'Intermediate',
    ageGroup: 'Adult',
    productType: 'Tracksuit',
    brand: 'Nike',
    stock: 35,
    images: ['https://images.unsplash.com/photo-1576566588028-4147f3842f27?w=500&q=80'],
    rating: 4.5,
    numReviews: 25
  }
];

const seedDatabase = async () => {
  try {
    await mongoose.connect(process.env.MONGODB_URI);
    console.log('Connected to MongoDB');

    // Clear existing products
    await Product.deleteMany();
    console.log('Cleared existing products');

    // Insert sample products
    await Product.insertMany(sampleProducts);
    console.log('Sample products inserted successfully');

    console.log('Database seeded successfully!');
    process.exit(0);
  } catch (error) {
    console.error('Error seeding database:', error);
    process.exit(1);
  }
};

seedDatabase();
