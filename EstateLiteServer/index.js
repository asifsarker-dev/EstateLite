const express = require('express');
const app = express();
const port = process.env.PORT || 5000;
const cors = require('cors');
const { initializeApp: initAdminApp, cert } = require('firebase-admin/app');
const path = require('path');
const fs = require('fs');
require('dotenv').config();

// Firebase Admin SDK Initialization
const serviceAccountPath = path.resolve(
  __dirname,
  process.env.FIREBASE_SERVICE_ACCOUNT_KEY || './estate-lite-firebase-adminsdk.json'
);
if (fs.existsSync(serviceAccountPath)) {
  try {
    initAdminApp({
      credential: cert(require(serviceAccountPath)),
    });
    console.log('Firebase Admin SDK initialized successfully');
  } catch (err) {
    console.warn('Firebase Admin SDK init warning:', err.message);
  }
}

// CORS Configuration - mirrors Ofbid pattern
const corsOptions = {
  origin: process.env.ALLOWED_ORIGINS ? process.env.ALLOWED_ORIGINS.split(',') : '*',
  methods: ['GET', 'POST', 'PUT', 'DELETE'],
  credentials: true,
  optionsSuccessStatus: 200,
};
app.use(express.json({ limit: '10mb' }));
app.use(express.urlencoded({ limit: '10mb', extended: true }));
app.use(cors(corsOptions));

// Rate limiting middleware - mirrors Ofbid pattern
const rateLimit = new Map();
const RATE_LIMIT_WINDOW = 60000; // 1 minute
const MAX_REQUESTS = 100;
app.use((req, res, next) => {
  const ip = req.ip || req.connection.remoteAddress;
  const now = Date.now();
  if (!rateLimit.has(ip)) {
    rateLimit.set(ip, { count: 1, resetTime: now + RATE_LIMIT_WINDOW });
  } else {
    const record = rateLimit.get(ip);
    if (now > record.resetTime) {
      record.count = 1;
      record.resetTime = now + RATE_LIMIT_WINDOW;
    } else {
      record.count++;
      if (record.count > MAX_REQUESTS) {
        return res.status(429).json({ error: 'Too many requests. Please try again later.' });
      }
    }
  }
  next();
});

// Root health check endpoint
app.get('/', (req, res) => {
  res.send('EstateLite server is running');
});

const dns = require('dns');
dns.setDefaultResultOrder('ipv4first');
try {
  dns.setServers(['8.8.8.8', '1.1.1.1']);
} catch (err) {
  // Ignore fallback error
}

const { MongoClient, ServerApiVersion, ObjectId } = require('mongodb');
const uri = process.env.MONGO_URI;

const client = new MongoClient(uri, {
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true,
  }
});

async function run() {
  try {
    await client.connect();
    console.log('Connected to MongoDB Atlas');

    const db = client.db('EstateLiteDB');
    const propertiesCollection = db.collection('properties');

    // Ping MongoDB deployment
    await client.db('admin').command({ ping: 1 });
    console.log('Pinged your deployment. You successfully connected to MongoDB!');

    // ── API Routes ──

    // 1. GET /api/properties - Fetch all property listings
    app.get('/api/properties', async (req, res) => {
      try {
        const properties = await propertiesCollection.find({}).sort({ createdAt: -1 }).toArray();
        res.json(properties);
      } catch (error) {
        console.error('Error fetching properties:', error);
        res.status(500).json({ error: 'Failed to fetch properties' });
      }
    });

    // 2. GET /api/properties/:id - Fetch single property details
    app.get('/api/properties/:id', async (req, res) => {
      try {
        const { id } = req.params;
        let query;
        try {
          query = { _id: new ObjectId(id) };
        } catch {
          return res.status(400).json({ error: 'Invalid property ID format' });
        }
        const property = await propertiesCollection.findOne(query);
        if (!property) {
          return res.status(404).json({ error: 'Property not found' });
        }
        res.json(property);
      } catch (error) {
        console.error('Error fetching property by ID:', error);
        res.status(500).json({ error: 'Failed to fetch property' });
      }
    });

    // 3. POST /api/properties - Create a new property listing
    app.post('/api/properties', async (req, res) => {
      try {
        const { title, price, location, description, bedrooms, addedBy, imageUrl } = req.body;
        if (!title || !price || !location || !description) {
          return res.status(400).json({
            error: 'Missing required fields: title, price, location, description are required',
          });
        }
        const newProperty = {
          title: title.trim(),
          price: Number(price),
          location: location.trim(),
          description: description.trim(),
          bedrooms: Number(bedrooms) || 0,
          addedBy: addedBy || 'anonymous',
          ...(imageUrl && { imageUrl }),
          createdAt: new Date().toISOString(),
        };
        const result = await propertiesCollection.insertOne(newProperty);
        res.status(201).json({
          message: 'Property added successfully',
          insertedId: result.insertedId,
          property: { _id: result.insertedId, ...newProperty },
        });
      } catch (error) {
        console.error('Error creating property:', error);
        res.status(500).json({ error: 'Failed to add property' });
      }
    });

  } catch (error) {
    console.error('MongoDB connection error:', error);
  } finally {
    // Keep connection alive for incoming requests
  }
}
run().catch(console.dir);

app.listen(port, () => {
  console.log(`EstateLite server running on port ${port}`);
});

