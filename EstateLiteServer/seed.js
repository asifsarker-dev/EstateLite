require('dotenv').config();
const { MongoClient, ServerApiVersion } = require('mongodb');
const dns = require('dns');

dns.setDefaultResultOrder('ipv4first');
try {
  dns.setServers(['8.8.8.8', '1.1.1.1']);
} catch (err) {
  // Ignore fallback error
}

const BASE_URL = process.env.SEED_BASE_URL || 'http://localhost:5000';

const sampleProperties = [
  {
    title: "Luxury 3-Bedroom Apartment in South Gulshan",
    price: 28500000,
    location: "Gulshan",
    bedrooms: 3,
    description: "Spacious luxury apartment featuring premium finishes, private balcony, and 24/7 security. Located in the heart of South Gulshan close to diplomat zone and fine dining.",
    addedBy: "admin@estatelite.com",
    imageUrl: `${BASE_URL}/uploads/property-gulshan-luxury-apartment.jpg`,
    createdAt: "2026-07-20T10:15:00.000Z"
  },
  {
    title: "Modern Family Flat near Dhanmondi Lake",
    price: 16500000,
    location: "Dhanmondi",
    bedrooms: 4,
    description: "Elegant 4-bedroom flat with ample natural light, modern kitchen, and dedicated parking space. Walking distance to Dhanmondi Lake and top educational institutions.",
    addedBy: "admin@estatelite.com",
    imageUrl: `${BASE_URL}/uploads/property-dhanmondi-family-flat.jpg`,
    createdAt: "2026-07-22T14:30:00.000Z"
  },
  {
    title: "Compact Studio Apartment in Uttara Sector 11",
    price: 4800000,
    location: "Uttara",
    bedrooms: 1,
    description: "Cozy 1-bedroom apartment perfect for single professionals or small families. Features generator backup, elevator access, and easy commuting options.",
    addedBy: "admin@estatelite.com",
    imageUrl: `${BASE_URL}/uploads/property-uttara-studio-apartment.jpg`,
    createdAt: "2026-07-25T09:00:00.000Z"
  },
  {
    title: "Premium Duplex Residence in Banani Block F",
    price: 45000000,
    location: "Banani",
    bedrooms: 5,
    description: "Stunning 5-bedroom duplex offering panoramic city views, high-end imported fixtures, and a private rooftop garden. Situated in a serene residential neighborhood.",
    addedBy: "admin@estatelite.com",
    imageUrl: `${BASE_URL}/uploads/property-banani-duplex-residence.jpg`,
    createdAt: "2026-07-28T11:45:00.000Z"
  },
  {
    title: "Exclusive Gated Community Condo in Bashundhara R/A",
    price: 19800000,
    location: "Bashundhara",
    bedrooms: 3,
    description: "Contemporary 3-bedroom condo inside Bashundhara R/A Block C. Enjoys state-of-the-art building amenities including gym, swimming pool, and child play area.",
    addedBy: "admin@estatelite.com",
    imageUrl: `${BASE_URL}/uploads/property-bashundhara-gated-condo.jpg`,
    createdAt: "2026-08-01T16:20:00.000Z"
  },
  {
    title: "Spacious 4-BHK Apartment in Uttara Sector 4",
    price: 22000000,
    location: "Uttara",
    bedrooms: 4,
    description: "Well-maintained 4-bedroom home with cross-ventilation, servant room, and secure parking. Located close to Uttara Dhaka Metro station and supermarkets.",
    addedBy: "admin@estatelite.com",
    imageUrl: `${BASE_URL}/uploads/property-uttara-4bhk-apartment.jpg`,
    createdAt: "2026-08-03T12:10:00.000Z"
  },
  {
    title: "Charming 2-Bedroom Flat in Dhanmondi Road 27",
    price: 9500000,
    location: "Dhanmondi",
    bedrooms: 2,
    description: "Affordable 2-bedroom residential flat with modern interior decor and tiled flooring. Ideal position near shopping malls, hospitals, and public transport.",
    addedBy: "admin@estatelite.com",
    imageUrl: `${BASE_URL}/uploads/property-dhanmondi-2br-flat.jpg`,
    createdAt: "2026-08-07T08:50:00.000Z"
  },
  {
    title: "High-Floor Executive Apartment in Gulshan 2",
    price: 38000000,
    location: "Gulshan",
    bedrooms: 3,
    description: "Sophisticated 3-bedroom executive suite on a higher floor with unblocked lake views. Includes underground parking, smart home automation, and full power backup.",
    addedBy: "admin@estatelite.com",
    imageUrl: `${BASE_URL}/uploads/property-gulshan2-executive-apartment.jpg`,
    createdAt: "2026-08-10T15:05:00.000Z"
  },
  {
    title: "Prime Corporate Office Space in Banani Commercial Area",
    price: 32000000,
    location: "Banani",
    bedrooms: 0,
    description: "Fully furnished 2,500 sq ft office floor designed for corporate headquarters. Features central air conditioning, high-speed elevators, and fiber-optic connectivity.",
    addedBy: "admin@estatelite.com",
    imageUrl: `${BASE_URL}/uploads/property-banani-corporate-office.jpg`,
    createdAt: "2026-07-29T10:00:00.000Z"
  },
  {
    title: "Ground Floor Retail Shop in Bashundhara City Zone",
    price: 14500000,
    location: "Bashundhara",
    bedrooms: 0,
    description: "High-footfall commercial shop space ideal for boutique retail, showroom, or tech outlet. Excellent road frontage with large glass display facade.",
    addedBy: "admin@estatelite.com",
    imageUrl: `${BASE_URL}/uploads/property-bashundhara-retail-shop.jpg`,
    createdAt: "2026-08-04T13:40:00.000Z"
  },
  {
    title: "Commercial Floor in Gulshan Avenue Tower",
    price: 49000000,
    location: "Gulshan",
    bedrooms: 0,
    description: "Pre-fitted Grade-A commercial office space on main Gulshan Avenue. Offers basement parking spaces, 24/7 security guard detail, and emergency backup generators.",
    addedBy: "admin@estatelite.com",
    imageUrl: `${BASE_URL}/uploads/property-gulshan-commercial-floor.jpg`,
    createdAt: "2026-08-08T11:15:00.000Z"
  },
  {
    title: "Open-Plan IT Office Unit in Uttara Commercial Sector",
    price: 11200000,
    location: "Uttara",
    bedrooms: 0,
    description: "Modern open-plan commercial unit tailored for tech startups or consulting firms. Close to Hazrat Shahjalal International Airport and express elevated highway.",
    addedBy: "admin@estatelite.com",
    imageUrl: `${BASE_URL}/uploads/property-uttara-it-office.jpg`,
    createdAt: "2026-08-12T09:30:00.000Z"
  }
];

async function seed() {
  const client = new MongoClient(process.env.MONGO_URI, {
    serverApi: { version: ServerApiVersion.v1, strict: true, deprecationErrors: true }
  });
  try {
    await client.connect();
    console.log('Connected to MongoDB');
    const db = client.db('EstateLiteDB');
    const col = db.collection('properties');
    await col.deleteMany({});  // Clear existing data first
    const result = await col.insertMany(sampleProperties);
    console.log(`Seeded ${result.insertedCount} properties successfully`);
  } finally {
    await client.close();
  }
}
seed().catch(console.dir);
