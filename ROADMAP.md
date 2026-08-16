# EstateLite - Project Roadmap

> **Real Estate Listing Platform - Varsity MVP**
> Built on the **MERN Stack** following the **Prototype Process Model**
> Reference architecture: Ofbid Project (OfbidClient / OfbidServer structure)

---

## Completion Legend

| Symbol | Meaning |
|:------:|---------|
| `[ ]` | Not started |
| `[/]` | In progress |
| `[x]` | COMPLETED — Do NOT redo this task |

---

## Task Completion Summary

| Task ID | Branch | Description | Status |
|:-------:|--------|-------------|:------:|
| **131-1** | `feat/project-init` | Repository & Project Initialization | `[x]` |
| **131-2** | `feat/database-setup` | Database Architecture & MongoDB Connection | `[x]` |
| **131-3** | `feat/api-routes` | API Routing — GET & POST Properties | `[x]` |
| **131-4** | `feat/frontend-boilerplate` | Frontend Boilerplate, Auth Provider, Routing | `[x]` |
| **130-2** | `feat/navbar` | Navigation Component (Navbar + Footer) | `[x]` |
| **130-3** | `feat/dashboard` | Dashboard / Home Page | `[x]` |
| **130-4** | `feat/property-listing` | Property Listing Module + PropertyCard | `[x]` |
| **130-5** | `feat/submit-property` | Property Submission Form | `[x]` |
| **130-6** | `feat/login` | Login Page with Firebase Auth | `[x]` |
| **130-7** | `docs/phase-1` | Phase 1 Documentation | `[x]` |
| **132-1** | `feat/seed-data` | Sample Data Population (12 mock listings) | `[x]` |
| **132-2** | `docs/phase-2` | Phase 2 Process Model Documentation | `[x]` |
| **132-3** | `docs/final-report` | README + Final Project Design Report | `[ ]` |

---

## Technology Stack (Mirrors Ofbid)

### Frontend (EstateLiteClient)
| Technology | Version | Purpose |
|-----------|---------|---------|
| React | ^18.3.1 | UI library |
| Vite | ^5.3.1 | Build tool and dev server |
| React Router DOM | ^6.24.0 | Client-side routing |
| TailwindCSS | ^3.4.17 | Utility-first styling |
| DaisyUI | ^4.x | Component library on top of Tailwind |
| Firebase | ^10.x | User Authentication |
| Axios | ^1.x | HTTP requests to backend |
| React Toastify | ^10.x | Toast notifications |
| SweetAlert2 | ^11.x | Confirm dialogs |
| React Icons | ^5.x | Icon library |
| Framer Motion | ^12.x | Animations |
| Inter font | Google Fonts | Typography (same as Ofbid) |

### Backend (EstateLiteServer)
| Technology | Version | Purpose |
|-----------|---------|---------|
| Node.js | LTS | Runtime |
| Express | ^4.19.2 | Web framework |
| MongoDB native driver | ^6.8.0 | Database - NO Mongoose |
| CORS | ^2.8.5 | Cross-origin requests |
| dotenv | ^16.5.0 | Environment variables |
| Firebase Admin SDK | ^13.x | Server-side token verification |

### Database
- **MongoDB Atlas** - single cluster, single collection: properties
- Fields: title, price, location, description, bedrooms, addedBy, createdAt

### Design System & Visual Identity
- **Logo**: Uses the official [`Logo.jpg`](file:///c:/Users/DFIT/Desktop/Projects/Paid/EstateLite/EstateLiteClient/public/Logo.jpg) with clean house roof glyph and dual-tone typography ("Estate" Charcoal + "Lite" Cerulean).
- **Aesthetic**: Smart, minimal, professional Scandinavian real estate UI (no heavy dark/purple gradients).
- **Background**: Soft crisp off-white (`#F8FAFC` / `bg-slate-50`).
- **Surface / Cards**: Clean white (`#FFFFFF`) with subtle slate borders (`border-slate-200/90`) and light shadows.
- **Brand Colors**: Primary Cerulean Blue (`#4A8CE8`), Secondary Dark Slate (`#1E293B`), Accent Sky Blue (`#0284C7`).
- **Typography**: Inter (Google Fonts) with clear visual hierarchy.

### Firebase Configuration (`estate-lite`)
- **Client Configuration (`EstateLiteClient/.env` & `firebase.config.js`)**:
  ```env
  VITE_FIREBASE_API_KEY=AIzaSyDGA8qn7PSPjyfgMJr0uKrab7UF0DQ6JLo
  VITE_FIREBASE_AUTH_DOMAIN=estate-lite.firebaseapp.com
  VITE_FIREBASE_PROJECT_ID=estate-lite
  VITE_FIREBASE_STORAGE_BUCKET=estate-lite.firebasestorage.app
  VITE_FIREBASE_MESSAGING_SENDER_ID=252019209722
  VITE_FIREBASE_APP_ID=1:252019209722:web:c7d85e105c3b8ea75c6043
  VITE_FIREBASE_MEASUREMENT_ID=G-QG8664212V
  VITE_SERVER_URL=http://localhost:5000
  ```
- **Server Admin Configuration (`EstateLiteServer/estate-lite-firebase-adminsdk.json`)**:
  - File: `EstateLiteServer/estate-lite-firebase-adminsdk.json`
  - Client Email: `firebase-adminsdk-fbsvc@estate-lite.iam.gserviceaccount.com`
  - Service Account Key integrated in `EstateLiteServer/index.js` via `firebase-admin/app`.

---

## ROLL 131 - Core Architecture & Backend

---

### TASK 131-1 - Repository & Project Initialization

> **Status: `[x]` COMPLETED**

**Branch:** `feat/project-init`

**Instructions for Agent:**

STEP 1 - Initialize git and create branch (run from EstateLite/ root):
```bash
git init
git checkout -b main
git checkout -b feat/project-init
```

STEP 2 - Create two empty folders inside EstateLite/:
- EstateLite/EstateLiteClient/
- EstateLite/EstateLiteServer/

STEP 3 - Initialize the backend. Run from EstateLiteServer/:
```bash
npm init -y
npm install express cors dotenv mongodb firebase-admin axios
```
Add to package.json scripts: "start": "node index.js" and "dev": "node --watch index.js"

STEP 4 - Initialize the frontend. Run from EstateLiteClient/:
```bash
npm create vite@latest . -- --template react
npm install
npm install react-router-dom axios firebase react-icons react-toastify sweetalert2 react-sweetalert2 framer-motion tailwindcss postcss autoprefixer date-fns
npm install -D daisyui eslint @vitejs/plugin-react
npx tailwindcss init -p
```

STEP 5 - Update EstateLiteClient/tailwind.config.js (mirror Ofbid exactly):
```js
/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: { extend: { fontFamily: { inter: ['Inter', 'sans-serif'] } } },
  plugins: [require('daisyui')],
}
```

STEP 6 - Add Inter font to EstateLiteClient/index.html inside the <head> tag:
```html
<link href="https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700;800&display=swap" rel="stylesheet">
```

STEP 7 - Create .gitignore in BOTH EstateLiteClient/ and EstateLiteServer/ with this content:
```
node_modules/
.env
dist/
```

STEP 8 - Create EstateLiteServer/.env.example:
```
PORT=5000
MONGO_URI=mongodb+srv://username:password@cluster0.xxxxx.mongodb.net/?retryWrites=true&w=majority
ALLOWED_ORIGINS=http://localhost:5173
API_KEY=your_api_key_here
```

STEP 9 - Commit and merge:
```bash
git add .
git commit -m "feat: initialize project structure for EstateLite client and server"
git checkout main
git merge feat/project-init
git branch -d feat/project-init
```

STEP 10 - Mark this task complete: Change `[ ]` to `[x]` in the Status line above, then:
```bash
git add ROADMAP.md
git commit -m "chore: mark task 131-1 as complete"
```

---

### TASK 131-2 - Database Architecture & Connection

> **Status: `[x]` COMPLETED**

**Branch:** `feat/database-setup`

**Instructions for Agent:**

STEP 1:
```bash
git checkout -b feat/database-setup
```

STEP 2 - Create EstateLiteServer/index.js with this full content (mirrors Ofbid OfbidServer/index.js pattern):
```js
const express = require('express');
const app = express();
const port = process.env.PORT || 5000;
const cors = require('cors');
require('dotenv').config();

// CORS config - same pattern as Ofbid
const corsOptions = {
  origin: process.env.ALLOWED_ORIGINS ? process.env.ALLOWED_ORIGINS.split(',') : '*',
  methods: ['GET', 'POST', 'PUT', 'DELETE'],
  credentials: true,
  optionsSuccessStatus: 200,
};
app.use(express.json({ limit: '10mb' }));
app.use(express.urlencoded({ limit: '10mb', extended: true }));
app.use(cors(corsOptions));

// Rate limiting - same pattern as Ofbid
const rateLimit = new Map();
const RATE_LIMIT_WINDOW = 60000;
const MAX_REQUESTS = 100;
app.use((req, res, next) => {
  const ip = req.ip || req.connection.remoteAddress;
  const now = Date.now();
  if (!rateLimit.has(ip)) {
    rateLimit.set(ip, { count: 1, resetTime: now + RATE_LIMIT_WINDOW });
  } else {
    const record = rateLimit.get(ip);
    if (now > record.resetTime) { record.count = 1; record.resetTime = now + RATE_LIMIT_WINDOW; }
    else {
      record.count++;
      if (record.count > MAX_REQUESTS) return res.status(429).json({ error: 'Too many requests' });
    }
  }
  next();
});

app.listen(port, () => console.log(`EstateLite server running on port ${port}`));
app.get('/', (req, res) => res.send('EstateLite server is running'));

const { MongoClient, ServerApiVersion, ObjectId } = require('mongodb');
const uri = process.env.MONGO_URI;
const client = new MongoClient(uri, {
  serverApi: { version: ServerApiVersion.v1, strict: true, deprecationErrors: true }
});

async function run() {
  try {
    await client.connect();
    console.log('Connected to MongoDB Atlas');

    const db = client.db('EstateLiteDB');
    const propertiesCollection = db.collection('properties');

    // API routes will be added in TASK 131-3

  } finally {
    // Keep connection alive - do NOT close the client
  }
}
run().catch(console.dir);
```

STEP 3 - MongoDB Atlas manual setup (do before running the server):
- Go to https://cloud.mongodb.com
- Create a free M0 cluster
- Create a database user (username + password)
- Whitelist IP: 0.0.0.0/0 (for development)
- Copy the connection string into EstateLiteServer/.env as: MONGO_URI=<your_connection_string>
- Database: EstateLiteDB, Collection: properties

STEP 4 - Test: cd EstateLiteServer && npm run dev
Should print: "EstateLite server running on port 5000" and "Connected to MongoDB Atlas"

STEP 5 - Commit and merge:
```bash
git add .
git commit -m "feat: set up MongoDB connection using native driver, mirror Ofbid server pattern"
git checkout main && git merge feat/database-setup && git branch -d feat/database-setup
```

MARK COMPLETE: Change `[ ]` to `[x]` in Status above, then:
```bash
git add ROADMAP.md && git commit -m "chore: mark task 131-2 as complete"
```

---

### TASK 131-3 - API Routing (Create & Read)

> **Status: `[x]` COMPLETED**

**Branch:** `feat/api-routes`

**Instructions for Agent:**

STEP 1:
```bash
git checkout -b feat/api-routes
```

STEP 2 - Open EstateLiteServer/index.js. Inside the run() async function, right after `const propertiesCollection = db.collection('properties');` line, add these 3 routes:

Route 1 - GET all properties:
```js
app.get('/api/properties', async (req, res) => {
  try {
    const properties = await propertiesCollection.find({}).toArray();
    res.json(properties);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch properties' });
  }
});
```

Route 2 - GET single property by ID:
```js
app.get('/api/properties/:id', async (req, res) => {
  try {
    const property = await propertiesCollection.findOne({ _id: new ObjectId(req.params.id) });
    if (!property) return res.status(404).json({ error: 'Property not found' });
    res.json(property);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch property' });
  }
});
```

Route 3 - POST create new property:
```js
app.post('/api/properties', async (req, res) => {
  try {
    const { title, price, location, description, bedrooms, addedBy } = req.body;
    if (!title || !price || !location || !description) {
      return res.status(400).json({ error: 'Missing required fields: title, price, location, description' });
    }
    const newProperty = {
      title,
      price: Number(price),
      location,
      description,
      bedrooms: Number(bedrooms) || 0,
      addedBy: addedBy || 'anonymous',
      createdAt: new Date().toISOString(),
    };
    const result = await propertiesCollection.insertOne(newProperty);
    res.status(201).json({ message: 'Property added successfully', insertedId: result.insertedId });
  } catch (error) {
    res.status(500).json({ error: 'Failed to add property' });
  }
});
```

STEP 3 - Test all endpoints (use Thunder Client in VS Code or Postman):
- GET http://localhost:5000/api/properties -> returns []
- POST http://localhost:5000/api/properties with JSON body: {"title":"Test","price":5000000,"location":"Dhaka","description":"Test desc"} -> returns {insertedId: "..."}
- GET http://localhost:5000/api/properties -> returns [{...the posted property...}]

STEP 4 - Commit and merge:
```bash
git add .
git commit -m "feat: add GET and POST API endpoints for properties using plain MongoDB driver"
git checkout main && git merge feat/api-routes && git branch -d feat/api-routes
```

MARK COMPLETE: Change `[ ]` to `[x]` in Status above, then:
```bash
git add ROADMAP.md && git commit -m "chore: mark task 131-3 as complete"
```

---

## ROLL 130 - Frontend Prototyping & Phase 1 Documentation

---

### TASK 131-4 - Frontend Boilerplate & Routing

> **Status: `[x]` COMPLETED**

**Branch:** `feat/frontend-boilerplate`

**Instructions for Agent:**

STEP 1:
```bash
git checkout -b feat/frontend-boilerplate
```

STEP 2 - Create EstateLiteClient/firebase.config.js:
```js
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";

const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
  authDomain: import.meta.env.VITE_FIREBASE_AUTH_DOMAIN,
  projectId: import.meta.env.VITE_FIREBASE_PROJECT_ID,
  storageBucket: import.meta.env.VITE_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: import.meta.env.VITE_FIREBASE_MESSAGING_SENDER_ID,
  appId: import.meta.env.VITE_FIREBASE_APP_ID,
};

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export default app;
```

Create EstateLiteClient/.env.example:
```
VITE_FIREBASE_API_KEY=your_key
VITE_FIREBASE_AUTH_DOMAIN=your_project.firebaseapp.com
VITE_FIREBASE_PROJECT_ID=your_project_id
VITE_FIREBASE_STORAGE_BUCKET=your_project.appspot.com
VITE_FIREBASE_MESSAGING_SENDER_ID=your_sender_id
VITE_FIREBASE_APP_ID=your_app_id
VITE_SERVER_URL=http://localhost:5000
```

STEP 3 - Create EstateLiteClient/src/Provider.jsx (mirrors Ofbid Provider.jsx exactly):
```jsx
import React, { useEffect, useState, createContext } from 'react';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { auth } from '../firebase.config';
import { signInWithEmailAndPassword, onAuthStateChanged, signOut } from "firebase/auth";
export const AuthContext = createContext(null);

function Provider({ children }) {
  const [loading, setLoading] = useState(true);
  const [user, setUser] = useState(null);

  const login = (email, pass) => signInWithEmailAndPassword(auth, email, pass);
  const logout = () => signOut(auth);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, currentUser => {
      setUser(currentUser);
      setLoading(false);
    });
    return () => unsubscribe();
  }, []);

  const notifySuccess = (message) => toast.success(message);
  const notifyFailed = (message) => toast.error(message);

  const providerInfo = { login, logout, user, setUser, auth, loading, setLoading, notifySuccess, notifyFailed };

  return (
    <AuthContext.Provider value={providerInfo}>
      {children}
      <ToastContainer />
    </AuthContext.Provider>
  );
}
export default Provider;
```

STEP 4 - Create EstateLiteClient/src/PrivateRoute.jsx (identical to Ofbid PrivateRoute):
```jsx
import { useContext } from 'react';
import { AuthContext } from './Provider';
import { Navigate, useLocation } from 'react-router-dom';

function PrivateRoute({ children }) {
  const { user, loading } = useContext(AuthContext);
  const location = useLocation();
  if (loading) return (
    <div className="flex justify-center items-center h-screen">
      <span className="loading loading-spinner loading-lg text-primary"></span>
    </div>
  );
  if (user) return children;
  return <Navigate state={{ path: location.pathname }} to="/login" />;
}
export default PrivateRoute;
```

STEP 5 - Create EstateLiteClient/src/components/Root.jsx:
```jsx
import { Outlet } from 'react-router-dom';
import Nav from './Homepage/Nav';
import Footer from './Homepage/Footer';

function Root() {
  return (
    <div className="min-h-screen flex flex-col font-inter bg-gradient-to-br from-slate-900 via-blue-950 to-indigo-950">
      <Nav />
      <div className="flex-grow">
        <Outlet />
      </div>
      <Footer />
    </div>
  );
}
export default Root;
```

STEP 6 - Create EstateLiteClient/src/main.jsx (same createBrowserRouter pattern as Ofbid main.jsx):
```jsx
import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import Root from './components/Root';
import Provider from './Provider';
import Home from './components/Homepage/Home';
import Login from './components/Login';
import PrivateRoute from './PrivateRoute';
import PropertyListing from './components/Properties/PropertyListing';
import PropertySubmit from './components/Properties/PropertySubmit';
import ErrorPage from './components/otherPages/ErrorPage';

const router = createBrowserRouter([
  {
    path: '/',
    element: <Root />,
    errorElement: <ErrorPage />,
    children: [
      { path: '/', element: <Home /> },
      { path: '/login', element: <Login /> },
      { path: '/properties', element: <PropertyListing /> },
      { path: '/add-property', element: <PrivateRoute><PropertySubmit /></PrivateRoute> },
    ],
  },
]);

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <Provider><RouterProvider router={router} /></Provider>
  </React.StrictMode>
);
```

STEP 7 - Update EstateLiteClient/src/index.css:
```css
@tailwind base;
@tailwind components;
@tailwind utilities;

body {
  font-family: 'Inter', sans-serif;
}
```

STEP 8 - Commit and merge:
```bash
git add .
git commit -m "feat: set up React frontend boilerplate with Firebase auth, routing, Provider, and PrivateRoute"
git checkout main && git merge feat/frontend-boilerplate && git branch -d feat/frontend-boilerplate
```

MARK COMPLETE: Change `[ ]` to `[x]` in Status above, then:
```bash
git add ROADMAP.md && git commit -m "chore: mark task 130-1 as complete"
```

---

### TASK 130-2 - Navigation Component (Navbar)

> **Status: `[x]` COMPLETED**

**Branch:** `feat/navbar`

**Instructions for Agent:**

STEP 1: git checkout -b feat/navbar

STEP 2 - Create EstateLiteClient/src/components/Homepage/Nav.jsx.
Requirements:
- Use DaisyUI navbar component
- Brand: "EstateLite" text with FaHouseUser icon from react-icons/fa
- Nav links using NavLink (active state: text-primary font-bold, inactive: text-white):
  - "/" -> Dashboard
  - "/properties" -> Browse Properties
  - "/add-property" -> Add Property (ONLY visible when user is logged in from AuthContext)
- Right side: if not logged in show Login button (btn btn-primary btn-sm) -> /login; if logged in show truncated email + Logout button -> calls logout() from AuthContext
- Responsive: hamburger menu on mobile using DaisyUI dropdown
- Style: bg-slate-900/70 backdrop-blur-md sticky top-0 z-50 border-b border-white/10

```jsx
import { useContext } from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import { AuthContext } from '../../Provider';
import { FaHouseUser } from 'react-icons/fa';

function Nav() {
  const { user, logout, notifySuccess } = useContext(AuthContext);
  const navigate = useNavigate();
  const handleLogout = () => { logout(); notifySuccess('Logged out successfully'); navigate('/'); };

  const links = (
    <>
      <li><NavLink to="/" className={({ isActive }) => isActive ? 'text-primary font-bold' : 'text-white'}>Dashboard</NavLink></li>
      <li><NavLink to="/properties" className={({ isActive }) => isActive ? 'text-primary font-bold' : 'text-white'}>Browse Properties</NavLink></li>
      {user && <li><NavLink to="/add-property" className={({ isActive }) => isActive ? 'text-primary font-bold' : 'text-white'}>Add Property</NavLink></li>}
    </>
  );

  return (
    <div className="navbar bg-slate-900/70 backdrop-blur-md sticky top-0 z-50 border-b border-white/10 px-4">
      <div className="navbar-start">
        <div className="dropdown">
          <label tabIndex={0} className="btn btn-ghost lg:hidden text-white">
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h8m-8 6h16" />
            </svg>
          </label>
          <ul tabIndex={0} className="menu menu-compact dropdown-content mt-3 p-2 shadow bg-slate-900 rounded-box w-52 z-50">
            {links}
          </ul>
        </div>
        <NavLink to="/" className="flex items-center gap-2 text-white font-bold text-xl">
          <FaHouseUser className="text-primary text-2xl" />
          EstateLite
        </NavLink>
      </div>
      <div className="navbar-center hidden lg:flex">
        <ul className="menu menu-horizontal px-1 gap-1">{links}</ul>
      </div>
      <div className="navbar-end">
        {user ? (
          <div className="flex items-center gap-3">
            <span className="text-slate-300 text-sm hidden md:block">{user.email?.split('@')[0]}</span>
            <button onClick={handleLogout} className="btn btn-outline btn-error btn-sm">Logout</button>
          </div>
        ) : (
          <NavLink to="/login" className="btn btn-primary btn-sm">Login</NavLink>
        )}
      </div>
    </div>
  );
}
export default Nav;
```

STEP 3 - Create EstateLiteClient/src/components/Homepage/Footer.jsx:
```jsx
import { NavLink } from 'react-router-dom';
import { FaHouseUser } from 'react-icons/fa';

function Footer() {
  return (
    <footer className="footer footer-center p-8 bg-slate-900/80 border-t border-white/10 text-white">
      <div className="flex items-center gap-2 text-xl font-bold">
        <FaHouseUser className="text-primary text-2xl" />
        EstateLite
      </div>
      <div className="flex gap-4 text-slate-400 text-sm">
        <NavLink to="/" className="hover:text-white transition-colors">Dashboard</NavLink>
        <NavLink to="/properties" className="hover:text-white transition-colors">Properties</NavLink>
        <NavLink to="/add-property" className="hover:text-white transition-colors">Add Property</NavLink>
      </div>
      <p className="text-slate-500 text-xs">EstateLite 2025 - Real Estate Listing Platform MVP</p>
    </footer>
  );
}
export default Footer;
```

STEP 4 - Commit and merge:
```bash
git add .
git commit -m "feat: add responsive Nav and Footer components with auth-aware navigation"
git checkout main && git merge feat/navbar && git branch -d feat/navbar
```

MARK COMPLETE: Change `[ ]` to `[x]` in Status above, then:
```bash
git add ROADMAP.md && git commit -m "chore: mark task 130-2 as complete"
```

---

### TASK 130-3 - Dashboard (Home) Page

> **Status: `[x]` COMPLETED**

**Branch:** `feat/dashboard`

**Instructions for Agent:**

STEP 1: git checkout -b feat/dashboard

STEP 2 - Create EstateLiteClient/src/components/Homepage/Home.jsx.
The page MUST have these 4 sections:

SECTION 1 - Hero with Framer Motion fade-in:
- Large h1: "Find Your Perfect Property" (text-5xl font-bold text-white)
- Subtext: "Explore curated real estate listings in one place" (text-slate-300 text-xl)
- CTA buttons: "Browse Properties" (btn btn-primary btn-lg) -> /properties, and if user logged in: "Add a Listing" (btn btn-outline btn-success btn-lg) -> /add-property
- Use motion.div with initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }}

SECTION 2 - DaisyUI Stats (fetch live count from API):
- Use useEffect + axios to GET VITE_SERVER_URL/api/properties on mount, store count in state
- Use DaisyUI stats component: 3 stat cards - "Total Properties" (live count), "Users: Students", "Model: Prototype"
- Style: bg-white/10 text-white border border-white/20

SECTION 3 - Quick Navigation Cards (3 cards in responsive grid):
- Grid: grid-cols-1 md:grid-cols-3 gap-6
- Each card: bg-white/10 backdrop-blur-sm border border-white/20 rounded-2xl p-8 hover:scale-105 transition-all duration-300 cursor-pointer text-center text-white
- Card 1: FaHome icon (text-primary) + "Property Listing" h3 + "View all available real estate" p -> navigate('/properties')
- Card 2: FaPlus icon (text-success) + "Add Property" h3 + "Submit a new listing" p -> navigate('/add-property')
- Card 3: FaLock icon (text-warning) + "Account" h3 + (user.email if logged in, else "Login to access") -> navigate('/login')

SECTION 4 - Conditional welcome (shown only if user is logged in):
- Small badge or alert: "Welcome back, {user.email}!"

Full component code:
```jsx
import { useContext, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { AuthContext } from '../../Provider';
import axios from 'axios';
import { FaHome, FaPlus, FaLock } from 'react-icons/fa';

function Home() {
  const { user } = useContext(AuthContext);
  const navigate = useNavigate();
  const [propertyCount, setPropertyCount] = useState(0);

  useEffect(() => {
    axios.get(`${import.meta.env.VITE_SERVER_URL}/api/properties`)
      .then(res => setPropertyCount(res.data.length))
      .catch(() => setPropertyCount(0));
  }, []);

  return (
    <div className="px-4 py-12 max-w-7xl mx-auto">
      <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }}
        className="text-center py-20">
        <h1 className="text-5xl font-bold text-white mb-4">Find Your Perfect Property</h1>
        <p className="text-slate-300 text-xl mb-8">Explore curated real estate listings in one place</p>
        <div className="flex gap-4 justify-center flex-wrap">
          <button onClick={() => navigate('/properties')} className="btn btn-primary btn-lg">Browse Properties</button>
          {user && <button onClick={() => navigate('/add-property')} className="btn btn-outline btn-success btn-lg">Add a Listing</button>}
        </div>
        {user && <p className="mt-4 text-slate-400 text-sm">Welcome back, {user.email}!</p>}
      </motion.div>

      <div className="flex justify-center my-12">
        <div className="stats stats-vertical lg:stats-horizontal shadow bg-white/10 text-white border border-white/20">
          <div className="stat">
            <div className="stat-title text-slate-300">Total Properties</div>
            <div className="stat-value text-primary">{propertyCount}</div>
            <div className="stat-desc text-slate-400">Listed on the platform</div>
          </div>
          <div className="stat">
            <div className="stat-title text-slate-300">Users</div>
            <div className="stat-value">Students</div>
            <div className="stat-desc text-slate-400">Varsity project MVP</div>
          </div>
          <div className="stat">
            <div className="stat-title text-slate-300">Model</div>
            <div className="stat-value">Prototype</div>
            <div className="stat-desc text-slate-400">Software process model</div>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 my-12">
        <div onClick={() => navigate('/properties')} className="bg-white/10 backdrop-blur-sm border border-white/20 rounded-2xl p-8 hover:scale-105 transition-all duration-300 cursor-pointer text-center text-white">
          <FaHome className="text-5xl text-primary mx-auto mb-4" />
          <h3 className="text-xl font-bold mb-2">Property Listing</h3>
          <p className="text-slate-400">View all available real estate</p>
        </div>
        <div onClick={() => navigate('/add-property')} className="bg-white/10 backdrop-blur-sm border border-white/20 rounded-2xl p-8 hover:scale-105 transition-all duration-300 cursor-pointer text-center text-white">
          <FaPlus className="text-5xl text-success mx-auto mb-4" />
          <h3 className="text-xl font-bold mb-2">Add Property</h3>
          <p className="text-slate-400">Submit a new listing</p>
        </div>
        <div onClick={() => navigate('/login')} className="bg-white/10 backdrop-blur-sm border border-white/20 rounded-2xl p-8 hover:scale-105 transition-all duration-300 cursor-pointer text-center text-white">
          <FaLock className="text-5xl text-warning mx-auto mb-4" />
          <h3 className="text-xl font-bold mb-2">Account</h3>
          <p className="text-slate-400">{user ? user.email : 'Login to access'}</p>
        </div>
      </div>
    </div>
  );
}
export default Home;
```

STEP 3 - Commit and merge:
```bash
git add .
git commit -m "feat: build dashboard home page with hero, stats, and navigation cards"
git checkout main && git merge feat/dashboard && git branch -d feat/dashboard
```

MARK COMPLETE: Change `[ ]` to `[x]` in Status above, then:
```bash
git add ROADMAP.md && git commit -m "chore: mark task 130-3 as complete"
```

---

### TASK 130-4 - Property Listing Module

> **Status: `[x]` COMPLETED**

**Branch:** `feat/property-listing`

**Instructions for Agent:**

STEP 1: git checkout -b feat/property-listing

STEP 2 - Create EstateLiteClient/src/components/Properties/PropertyListing.jsx:
```jsx
import { useEffect, useState } from 'react';
import axios from 'axios';
import PropertyCard from './PropertyCard';

function PropertyListing() {
  const [properties, setProperties] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    axios.get(`${import.meta.env.VITE_SERVER_URL}/api/properties`)
      .then(res => { setProperties(res.data); setLoading(false); })
      .catch(() => { setError('Failed to load properties. Please try again.'); setLoading(false); });
  }, []);

  if (loading) return (
    <div className="flex justify-center items-center h-64">
      <span className="loading loading-spinner loading-lg text-primary"></span>
    </div>
  );

  if (error) return (
    <div className="flex flex-col items-center justify-center h-64 text-white gap-4">
      <p className="text-red-400">{error}</p>
      <button onClick={() => window.location.reload()} className="btn btn-primary">Retry</button>
    </div>
  );

  return (
    <div className="px-4 py-8 max-w-7xl mx-auto">
      <div className="flex items-center justify-between mb-8">
        <h1 className="text-3xl font-bold text-white">Available Properties</h1>
        <span className="badge badge-primary badge-lg">{properties.length} listings</span>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {properties.map(property => (
          <PropertyCard key={property._id} property={property} />
        ))}
      </div>
      {properties.length === 0 && (
        <div className="text-center text-slate-400 py-20">
          <p className="text-xl">No properties listed yet.</p>
          <p className="text-sm mt-2">Be the first to add one!</p>
        </div>
      )}
    </div>
  );
}
export default PropertyListing;
```

STEP 3 - Create EstateLiteClient/src/components/Properties/PropertyCard.jsx:
```jsx
import { formatDistanceToNow } from 'date-fns';
import { FaBed, FaMapMarkerAlt } from 'react-icons/fa';

function PropertyCard({ property }) {
  const { title, price, location, description, bedrooms, createdAt } = property;
  const gradients = ['from-indigo-500 to-blue-600', 'from-emerald-500 to-teal-600', 'from-violet-500 to-purple-600'];
  const gradient = gradients[Math.floor(Math.random() * gradients.length)];

  return (
    <div className="card bg-white/10 backdrop-blur-sm border border-white/20 shadow-xl hover:scale-105 hover:shadow-2xl transition-all duration-300">
      <div className={`h-48 bg-gradient-to-br ${gradient} rounded-t-2xl flex flex-col items-center justify-center`}>
        <span className="text-6xl">🏠</span>
        <div className="badge badge-ghost mt-2">
          <FaBed className="mr-1" />{bedrooms} Beds
        </div>
      </div>
      <div className="card-body text-white">
        <h2 className="card-title text-lg font-bold line-clamp-1">{title}</h2>
        <p className="text-slate-300 text-sm flex items-center gap-1">
          <FaMapMarkerAlt className="text-primary flex-shrink-0" /> {location}
        </p>
        <p className="text-emerald-400 text-2xl font-bold">Tk {price?.toLocaleString()}</p>
        <p className="text-slate-400 text-sm line-clamp-2">{description}</p>
        <p className="text-xs text-slate-500 mt-2 border-t border-white/10 pt-2">
          Posted {createdAt ? formatDistanceToNow(new Date(createdAt)) + ' ago' : 'recently'}
        </p>
      </div>
    </div>
  );
}
export default PropertyCard;
```

STEP 4 - Create EstateLiteClient/src/components/otherPages/ErrorPage.jsx:
```jsx
import { useNavigate } from 'react-router-dom';

function ErrorPage() {
  const navigate = useNavigate();
  return (
    <div className="flex flex-col items-center justify-center min-h-screen text-white gap-6">
      <h1 className="text-8xl font-bold text-primary">404</h1>
      <h2 className="text-2xl font-semibold">Page Not Found</h2>
      <p className="text-slate-400">The page you are looking for does not exist.</p>
      <button onClick={() => navigate('/')} className="btn btn-primary">Go Home</button>
    </div>
  );
}
export default ErrorPage;
```

STEP 5 - Commit and merge:
```bash
git add .
git commit -m "feat: build property listing page and PropertyCard component with API integration"
git checkout main && git merge feat/property-listing && git branch -d feat/property-listing
```

MARK COMPLETE: Change `[ ]` to `[x]` in Status above, then:
```bash
git add ROADMAP.md && git commit -m "chore: mark task 130-4 as complete"
```

---

### TASK 130-5 - Property Submission Form

> **Status: `[x]` COMPLETED**

**Branch:** `feat/submit-property`

**Instructions for Agent:**

STEP 1: git checkout -b feat/submit-property

STEP 2 - Create EstateLiteClient/src/components/Properties/PropertySubmit.jsx.
This page is PROTECTED by PrivateRoute (already set in main.jsx).

Form fields (DaisyUI form-control pattern):
- Property Title (text input, required)
- Price in Taka (number input, required)
- Location (text input, required)
- Bedrooms (number input, optional, min 0)
- Description (textarea, 4 rows, required)

On form submit:
1. Validate required fields; if missing call notifyFailed('Please fill all required fields')
2. POST to VITE_SERVER_URL/api/properties with all formData + addedBy: user.email
3. On success: notifySuccess('Property added successfully!'), reset form, navigate('/properties')
4. On error: notifyFailed('Failed to add property. Please try again.')
5. Show loading spinner on submit button while request is in flight

```jsx
import { useContext, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { AuthContext } from '../../Provider';
import axios from 'axios';

function PropertySubmit() {
  const { user, notifySuccess, notifyFailed } = useContext(AuthContext);
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [form, setForm] = useState({ title: '', price: '', location: '', bedrooms: '', description: '' });
  const handleChange = e => setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = async e => {
    e.preventDefault();
    if (!form.title || !form.price || !form.location || !form.description) {
      return notifyFailed('Please fill all required fields');
    }
    setLoading(true);
    try {
      await axios.post(`${import.meta.env.VITE_SERVER_URL}/api/properties`, {
        ...form, addedBy: user?.email || 'anonymous'
      });
      notifySuccess('Property added successfully!');
      setForm({ title: '', price: '', location: '', bedrooms: '', description: '' });
      navigate('/properties');
    } catch {
      notifyFailed('Failed to add property. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center p-6">
      <div className="card bg-white/10 backdrop-blur-sm border border-white/20 shadow-2xl w-full max-w-2xl">
        <div className="card-body text-white">
          <h2 className="card-title text-2xl mb-2">🏠 Submit a New Property</h2>
          <p className="text-slate-400 text-sm mb-4">Fill in the details below to list your property.</p>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="form-control">
              <label className="label"><span className="label-text text-slate-300">Property Title *</span></label>
              <input type="text" name="title" value={form.title} onChange={handleChange}
                placeholder="e.g. Modern 3-Bedroom Apartment in Gulshan"
                className="input input-bordered bg-white/5 border-white/20 text-white placeholder-slate-500" required />
            </div>
            <div className="form-control">
              <label className="label"><span className="label-text text-slate-300">Price (Taka) *</span></label>
              <input type="number" name="price" value={form.price} onChange={handleChange}
                placeholder="e.g. 15000000"
                className="input input-bordered bg-white/5 border-white/20 text-white placeholder-slate-500" required />
            </div>
            <div className="form-control">
              <label className="label"><span className="label-text text-slate-300">Location *</span></label>
              <input type="text" name="location" value={form.location} onChange={handleChange}
                placeholder="e.g. Gulshan-2, Dhaka"
                className="input input-bordered bg-white/5 border-white/20 text-white placeholder-slate-500" required />
            </div>
            <div className="form-control">
              <label className="label"><span className="label-text text-slate-300">Bedrooms</span></label>
              <input type="number" name="bedrooms" value={form.bedrooms} onChange={handleChange}
                placeholder="e.g. 3" min="0"
                className="input input-bordered bg-white/5 border-white/20 text-white placeholder-slate-500" />
            </div>
            <div className="form-control">
              <label className="label"><span className="label-text text-slate-300">Description *</span></label>
              <textarea name="description" value={form.description} onChange={handleChange}
                placeholder="Describe the property..." rows={4}
                className="textarea textarea-bordered bg-white/5 border-white/20 text-white placeholder-slate-500" required />
            </div>
            <button type="submit" className="btn btn-primary w-full mt-2" disabled={loading}>
              {loading ? <span className="loading loading-spinner" /> : 'Add Property'}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}
export default PropertySubmit;
```

STEP 3 - Commit and merge:
```bash
git add .
git commit -m "feat: build property submission form with validation and API POST integration"
git checkout main && git merge feat/submit-property && git branch -d feat/submit-property
```

MARK COMPLETE: Change `[ ]` to `[x]` in Status above, then:
```bash
git add ROADMAP.md && git commit -m "chore: mark task 130-5 as complete"
```

---

### TASK 130-6 - Login Page

> **Status: `[x]` COMPLETED**

**Branch:** `feat/login`

**Instructions for Agent:**

STEP 1: git checkout -b feat/login

STEP 2 - Create EstateLiteClient/src/components/Login.jsx:
```jsx
import { useContext, useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { AuthContext } from '../Provider';
import { FaHouseUser } from 'react-icons/fa';

function Login() {
  const { login, notifySuccess, notifyFailed } = useContext(AuthContext);
  const navigate = useNavigate();
  const location = useLocation();
  const [loading, setLoading] = useState(false);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const handleSubmit = async e => {
    e.preventDefault();
    setError('');
    if (!email || !password) return setError('Please enter email and password.');
    setLoading(true);
    try {
      await login(email, password);
      notifySuccess('Login successful!');
      navigate(location.state?.path || '/');
    } catch {
      setError('Invalid email or password. Please try again.');
      notifyFailed('Login failed.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center p-6">
      <div className="card bg-white/10 backdrop-blur-sm border border-white/20 shadow-2xl w-full max-w-md">
        <div className="card-body text-white">
          <div className="flex items-center justify-center gap-3 mb-6">
            <FaHouseUser className="text-primary text-4xl" />
            <h2 className="card-title text-2xl">EstateLite Login</h2>
          </div>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="form-control">
              <label className="label"><span className="label-text text-slate-300">Email</span></label>
              <input type="email" value={email} onChange={e => setEmail(e.target.value)}
                placeholder="demo@estatelite.com"
                className="input input-bordered bg-white/5 border-white/20 text-white placeholder-slate-500" />
            </div>
            <div className="form-control">
              <label className="label"><span className="label-text text-slate-300">Password</span></label>
              <input type="password" value={password} onChange={e => setPassword(e.target.value)}
                placeholder="Enter password"
                className="input input-bordered bg-white/5 border-white/20 text-white placeholder-slate-500" />
            </div>
            {error && <p className="text-red-400 text-sm bg-red-400/10 p-3 rounded-lg">{error}</p>}
            <button type="submit" className="btn btn-primary w-full" disabled={loading}>
              {loading ? <span className="loading loading-spinner" /> : 'Login'}
            </button>
          </form>
          <p className="text-slate-500 text-xs text-center mt-4 border-t border-white/10 pt-4">
            Only registered users can add properties.
          </p>
          <p className="text-slate-400 text-xs text-center">
            Demo credentials: demo@estatelite.com / Demo@1234
          </p>
        </div>
      </div>
    </div>
  );
}
export default Login;
```

STEP 3 - Firebase Console setup (manual, must be done before testing login):
- Go to Firebase Console -> Authentication -> Sign-in method -> Enable Email/Password provider
- Go to Users tab -> Add User manually: email=demo@estatelite.com, password=Demo@1234

STEP 4 - Commit and merge:
```bash
git add .
git commit -m "feat: build login page with Firebase email/password auth and redirect-on-login"
git checkout main && git merge feat/login && git branch -d feat/login
```

MARK COMPLETE: Change `[ ]` to `[x]` in Status above, then:
```bash
git add ROADMAP.md && git commit -m "chore: mark task 130-6 as complete"
```

---

### TASK 130-7 - Phase 1 Documentation

> **Status: `[x]` COMPLETED**

**Branch:** `docs/phase-1`

**Instructions for Agent:**

STEP 1: git checkout -b docs/phase-1

STEP 2: Create docs folder: mkdir EstateLiteClient/docs

STEP 3 - Use this exact prompt with any AI assistant (ChatGPT, Gemini, or Claude):
"Act as a Software Engineer. We are building a Real Estate Listing Platform called EstateLite as an MVP using the MERN stack (MongoDB, Express, React, Node.js). Generate Phase 1 documentation as a professional markdown document including:
1. Project Overview - What the platform does (2-3 paragraphs)
2. Problem Statement - The real-world problem being solved
3. Stakeholder Identification - Who uses or is affected by this system
4. Project Scope - What is included and excluded in the MVP
5. Functional Requirements - Exactly 10, numbered FR-01 to FR-10
6. Non-Functional Requirements - Exactly 8, numbered NFR-01 to NFR-08
7. User Stories - Exactly 5, format: As a [role], I want to [action], so that [benefit].
8. Assumptions and Constraints - At least 5 each
Format as a complete professional markdown document with proper headings."

STEP 4: Save the AI-generated content into EstateLiteClient/docs/phase-1-requirements.md

STEP 5 - Commit and merge:
```bash
git add .
git commit -m "docs: add Phase 1 requirements documentation for EstateLite MVP"
git checkout main && git merge docs/phase-1 && git branch -d docs/phase-1
```

MARK COMPLETE: Change `[ ]` to `[x]` in Status above, then:
```bash
git add ROADMAP.md && git commit -m "chore: mark task 130-7 as complete"
```

---

## ROLL 132 - Data Generation, Phase 2 Docs & Final Report

---

### TASK 132-1 - Sample Data Population (Seeding)

> **Status: `[x]` COMPLETED**

**Branch:** `feat/seed-data`

**Instructions for Agent:**

STEP 1: git checkout -b feat/seed-data

STEP 2 - Generate mock data using this prompt with any AI assistant:
"Generate a JSON array of exactly 12 sample entries for a Real Estate Listing Platform. Each entry must have: title (string - realistic property name in Dhaka), price (number in BDT - between 3000000 and 50000000), location (string - real Dhaka area like Gulshan, Banani, Dhanmondi, Uttara, Bashundhara), bedrooms (number from 1 to 5), description (string - 2-3 sentences), addedBy (string - 'admin@estatelite.com'), createdAt (ISO date string within last 30 days). Mix 8 residential apartments/houses and 4 commercial spaces. Return only the raw JSON array."

STEP 3 - Create EstateLiteServer/seed.js with the generated data:
```js
require('dotenv').config();
const { MongoClient, ServerApiVersion } = require('mongodb');

const sampleProperties = [
  // PASTE THE 12-ENTRY JSON ARRAY HERE
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
```

STEP 4 - Add to EstateLiteServer/package.json scripts section: "seed": "node seed.js"

STEP 5 - Run the seed script and verify:
```bash
cd EstateLiteServer
npm run seed
```
Expected: "Seeded 12 properties successfully"
Then verify at: GET http://localhost:5000/api/properties (must return 12 entries)

STEP 6 - Commit and merge:
```bash
git add .
git commit -m "feat: add database seed script with 12 realistic mock property listings"
git checkout main && git merge feat/seed-data && git branch -d feat/seed-data
```

MARK COMPLETE: Change `[ ]` to `[x]` in Status above, then:
```bash
git add ROADMAP.md && git commit -m "chore: mark task 132-1 as complete"
```

---

### TASK 132-2 - Phase 2 Documentation (Process Model Justification)

> **Status: `[x]` COMPLETED**

**Branch:** `docs/phase-2`

**Instructions for Agent:**

STEP 1: git checkout -b docs/phase-2

STEP 2 - Use this exact prompt with any AI assistant:
"Act as a Software Architect. We are using the Prototype software process model for a Real Estate Listing Platform MVP called EstateLite, built using the MERN stack (MongoDB, Express, React, Node.js). Write a structured justification document as a professional markdown file including:
1. Selected Process Model: Prototype Model - brief 2-paragraph overview
2. Why Prototype is Suitable - minimum 4 reasons specific to this MVP context: quick demo, limited time, stakeholder feedback loop, feasibility check
3. Why Waterfall is Less Suitable - minimum 3 reasons: rigid sequential phases, no early deliverable, requirements not fully defined upfront
4. Why Agile Scrum is Less Suitable - minimum 3 reasons: sprint ceremony overhead for a small MVP, team size mismatch, insufficient time for multiple iterations
5. Comparison Table - markdown table comparing Prototype, Waterfall, Agile Scrum across 5 criteria (Time to demo, Flexibility, Suitable team size, Documentation, Feedback cycle)
6. Conclusion - 1 paragraph summarizing why Prototype was the best choice
Include proper markdown headings and format professionally."

STEP 3: Save the AI-generated content as EstateLiteClient/docs/phase-2-process-model.md

STEP 4 - Commit and merge:
```bash
git add .
git commit -m "docs: add Phase 2 process model justification document"
git checkout main && git merge docs/phase-2 && git branch -d docs/phase-2
```

MARK COMPLETE: Change `[ ]` to `[x]` in Status above, then:
```bash
git add ROADMAP.md && git commit -m "chore: mark task 132-2 as complete"
```

---

### TASK 132-3 - README & Final Project Design Report

> **Status: `[ ]` Not Started**

**Branch:** `docs/final-report`

**Instructions for Agent:**

STEP 1: git checkout -b docs/final-report

STEP 2 - Generate README.md using this prompt:
"Generate a professional README.md for a GitHub repository called EstateLite - a Real Estate Listing Platform MVP. Include:
1. Project title with house emoji and a short description badge
2. Tech Stack table (Frontend: React+Vite+TailwindCSS+DaisyUI+Firebase; Backend: Node.js+Express+MongoDB native driver)
3. Project folder structure tree
4. MVP Features list: User Authentication (Firebase), Property Listing, Property Submission Form, Real Estate Dashboard, CRUD API (Create & Read)
5. How to Run Locally section with step-by-step commands for BOTH server and client
6. Environment Variables section - table listing all required .env keys for client and server separately
7. API Endpoints table: GET /api/properties, GET /api/properties/:id, POST /api/properties with descriptions
8. Demo Credentials section: demo@estatelite.com / Demo@1234
9. Team Roles table: Roll 131 (Backend + Architecture), Roll 130 (Frontend + Phase 1 Docs), Roll 132 (Data + Final Report)
Use markdown badges for tech stack where appropriate."

STEP 3: Save as EstateLite/README.md (at the ROOT of the project, NOT inside EstateLiteClient or EstateLiteServer)

STEP 4 - Create EstateLiteClient/docs/project-design-report-outline.md:
```markdown
# Project Design Report - EstateLite
## 16-Point Structure (as per lab guidelines)
1. Cover Page - Project name, team names, roll numbers, submission date
2. Table of Contents
3. Project Overview (copy from phase-1-requirements.md)
4. Problem Statement (copy from phase-1-requirements.md)
5. Stakeholder Identification (copy from phase-1-requirements.md)
6. Project Scope (copy from phase-1-requirements.md)
7. Functional Requirements FR-01 to FR-10 (copy from phase-1-requirements.md)
8. Non-Functional Requirements NFR-01 to NFR-08 (copy from phase-1-requirements.md)
9. User Stories 5 stories (copy from phase-1-requirements.md)
10. Assumptions and Constraints (copy from phase-1-requirements.md)
11. Process Model Selection and Justification (copy from phase-2-process-model.md)
12. System Architecture Diagram (create in draw.io: Browser -> React App -> Express Server -> MongoDB Atlas)
13. Database Schema Table (properties collection: _id, title, price, location, description, bedrooms, addedBy, createdAt)
14. API Documentation (table with endpoints, methods, request body, response from TASK 131-3)
15. Screenshots of Working MVP (from screenshots/ folder - dashboard, listing, form, login, mobile)
16. Conclusion and Future Work (what was built, what can be improved)
```

STEP 5 - Take screenshots of the running application and save to EstateLiteClient/screenshots/:
- dashboard.png: Home page showing hero, stats row, and 3 nav cards
- property-listing.png: Properties page with all 12 mock listings displayed in grid
- add-property.png: Property submission form page (logged in)
- login.png: Login page
- mobile-view.png: Any page viewed on mobile size (use browser DevTools -> Toggle Device Toolbar)

STEP 6 - Compile the PDF (manual step):
Combine phase-1-requirements.md + phase-2-process-model.md following the 16-point structure above.
Add all 5 screenshots at point 15. Save as: EstateLiteClient/docs/Project-Design-Report.pdf
Recommended tools: VS Code with "Markdown PDF" extension, OR Pandoc command: pandoc *.md -o Project-Design-Report.pdf

STEP 7 - Commit and merge:
```bash
git add .
git commit -m "docs: add README, report outline, and screenshots for final submission"
git checkout main && git merge docs/final-report && git branch -d docs/final-report
```

MARK COMPLETE: Change `[ ]` to `[x]` in Status above, then:
```bash
git add ROADMAP.md && git commit -m "chore: mark task 132-3 as complete"
```

---

## Important Rules for All Agents

1. **Always create a feature branch BEFORE starting any task.** Never commit directly to main.
2. **Always merge back to main** after completing and testing the task.
3. **Mark tasks complete** by changing Status from `[ ]` to `[x]`, then commit with: "chore: mark task [TASK-ID] as complete"
4. **Do NOT skip any step** - every step is required for the MVP to function correctly.
5. **Never hardcode the server URL** in React. Always use: import.meta.env.VITE_SERVER_URL
6. **Firebase credentials must NEVER be committed.** Use .env files with VITE_ prefix.
7. **MongoDB URI must NEVER be committed.** Always read from: process.env.MONGO_URI
8. **Use plain native MongoDB driver ONLY.** Do NOT install or use Mongoose.
9. **Recommended execution order:** 131-1 -> 131-2 -> 131-3 -> 130-1 -> 130-2 -> 130-3 -> 130-4 -> 130-5 -> 130-6 -> 130-7 -> 132-1 -> 132-2 -> 132-3

---

*Last updated: 2026-08-16 | EstateLite Varsity Project*
