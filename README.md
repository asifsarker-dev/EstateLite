# 🏠 EstateLite — Real Estate Listing Platform MVP

![React](https://img.shields.io/badge/Frontend-React_18-61DAFB?logo=react&logoColor=black)
![Vite](https://img.shields.io/badge/Build_Tool-Vite-646CFF?logo=vite&logoColor=white)
![TailwindCSS](https://img.shields.io/badge/Styling-TailwindCSS_3-38BDF8?logo=tailwindcss&logoColor=white)
![DaisyUI](https://img.shields.io/badge/UI_Library-DaisyUI-5A0E2D?logo=daisyui&logoColor=white)
![Node.js](https://img.shields.io/badge/Backend-Node.js-339933?logo=nodedotjs&logoColor=white)
![Express.js](https://img.shields.io/badge/Framework-Express_5-000000?logo=express&logoColor=white)
![MongoDB](https://img.shields.io/badge/Database-MongoDB_Atlas-47A248?logo=mongodb&logoColor=white)
![Firebase](https://img.shields.io/badge/Auth-Firebase_10-FFCA28?logo=firebase&logoColor=black)

**EstateLite** is a streamlined Minimum Viable Product (MVP) real estate listing platform developed for a university Software Engineering project. Built on the **MERN stack** (MongoDB native driver, Express.js, React, Node.js) following the **Prototype Software Process Model**, EstateLite enables users to browse real estate property listings across Dhaka and permits authenticated users to submit new property entries into a cloud-hosted MongoDB Atlas database.

---

## 🛠️ Technology Stack

### Frontend (`EstateLiteClient`)
| Technology | Version | Purpose |
| :--- | :--- | :--- |
| **React** | `^18.3.1` | Component-based UI library |
| **Vite** | `^5.3.1` | Fast frontend build tool & development server |
| **React Router DOM** | `^6.24.0` | Client-side routing (`/`, `/properties`, `/add-property`, `/login`) |
| **TailwindCSS** | `^3.4.17` | Utility-first CSS styling framework |
| **DaisyUI** | `^4.x` | UI component library built on top of TailwindCSS |
| **Firebase Auth** | `^10.x` | Client-side user authentication & session persistence |
| **Axios** | `^1.x` | HTTP client for communicating with backend REST endpoints |

### Backend (`EstateLiteServer`)
| Technology | Version | Purpose |
| :--- | :--- | :--- |
| **Node.js** | `LTS` | JavaScript runtime environment |
| **Express.js** | `^5.2.1` | Web application framework for RESTful API routing |
| **MongoDB Native Driver** | `^7.5.0` | Cloud database client (Direct driver — No Mongoose) |
| **CORS** | `^2.8.6` | Cross-Origin Resource Sharing middleware |
| **dotenv** | `^17.4.2` | Environment variable management |
| **Firebase Admin SDK** | `^14.2.0` | Server-side authentication token verification |

### Database
- **MongoDB Atlas**: Single cloud database cluster (`EstateLiteDB`), storing property listings in the `properties` collection.

---

## 📁 Project Directory Structure

```text
EstateLite/
├── README.md                           # Root documentation & setup guide
├── ROADMAP.md                          # Project roadmap & task completion tracker
├── .gitignore                          # Root git ignore rules
│
├── EstateLiteClient/                   # Frontend React Application (Vite)
│   ├── index.html                      # HTML entry point
│   ├── vite.config.js                  # Vite server & build config
│   ├── tailwind.config.js              # Tailwind CSS configuration
│   ├── firebase.config.js              # Firebase SDK initialization
│   ├── package.json                    # Frontend dependencies & scripts
│   ├── docs/                           # Documentation artifacts
│   │   ├── phase-1-requirements.md     # Phase 1 Requirements Specification
│   │   ├── phase-2-process-model.md     # Phase 2 Process Model Justification
│   │   └── project-design-report-outline.md # 16-Point Final Report Structure
│   ├── screenshots/                    # Application UI screenshots
│   │   ├── dashboard.png
│   │   ├── property-listing.png
│   │   ├── add-property.png
│   │   ├── login.png
│   │   └── mobile-view.png
│   └── src/                            # React application source code
│       ├── App.jsx                     # Core application layout & routing
│       ├── main.jsx                    # React root renderer
│       ├── providers/                  # Context providers (AuthProvider.jsx)
│       ├── routes/                     # Private routes & Router guards
│       └── components/                 # UI Components
│           ├── Shared/                 # Navbar & Footer
│           ├── Homepage/               # Dashboard, Banner & Navigation Cards
│           ├── Properties/             # Property Gallery & PropertyCard
│           └── OtherPages/             # AddProperty form, Login & 404
│
└── EstateLiteServer/                   # Backend Express REST API
    ├── index.js                        # Express server entry point & API routes
    ├── seed.js                         # Database seed script (12 mock listings)
    ├── package.json                    # Backend dependencies & scripts
    ├── .env.example                    # Template for backend environment variables
    └── estate-lite-firebase-adminsdk.example.json # Service account template
```

---

## ✨ MVP Features

- 🔐 **User Authentication:** Email/Password authentication powered by Firebase Auth, with global session context and private route protection for property creation.
- 🏢 **Property Listing Gallery:** Interactive grid displaying real estate listings fetched from MongoDB, complete with price formatting (BDT), location tags, bedroom badges, and real-time client-side search filtering.
- ➕ **Property Submission Form:** Form accessible to authenticated users (`/add-property`) for adding property entries with instant field validation and feedback toasts.
- 📊 **Real Estate Dashboard:** Home page featuring platform statistics (live property count API counter), hero banner, and quick-access navigation cards.
- ⚡ **RESTful API (Create & Read):** Express API endpoints supporting property retrieval, single-property detail lookup, and sanitized insertion into MongoDB.
- 🌱 **Database Seeding:** Automated seeding script (`seed.js`) generating 12 realistic Dhaka property listings (residential & commercial).

---

## 🚀 How to Run Locally

### Prerequisites
- **Node.js**: v18.0.0 or higher
- **npm**: v9.0.0 or higher

### 1. Clone the Repository
```bash
git clone https://github.com/asifsarker-dev/EstateLite.git
cd EstateLite/EstateLite
```

### 2. Backend Setup (`EstateLiteServer`)
```bash
# Navigate to server directory
cd EstateLiteServer

# Install server dependencies
npm install

# Create local environment file from template
cp .env.example .env

# Seed the MongoDB database with 12 mock listings
npm run seed

# Start backend server (runs on http://localhost:5000)
npm run dev
```

### 3. Frontend Setup (`EstateLiteClient`)
Open a new terminal window:
```bash
# Navigate to client directory
cd EstateLite/EstateLite/EstateLiteClient

# Install client dependencies
npm install

# Create local environment file from template
cp .env.example .env.local

# Start Vite dev server (runs on http://localhost:5173)
npm run dev
```

Visit `http://localhost:5173` in your browser to view the application.

---

## 🔑 Environment Variables

### Client (`EstateLiteClient/.env.local`)
| Variable | Description | Example / Value |
| :--- | :--- | :--- |
| `VITE_FIREBASE_API_KEY` | Firebase Web API Key | `AIzaSy...` |
| `VITE_FIREBASE_AUTH_DOMAIN` | Firebase Auth Domain | `estate-lite.firebaseapp.com` |
| `VITE_FIREBASE_PROJECT_ID` | Firebase Project ID | `estate-lite` |
| `VITE_FIREBASE_STORAGE_BUCKET` | Firebase Storage Bucket | `estate-lite.appspot.com` |
| `VITE_FIREBASE_MESSAGING_SENDER_ID` | Firebase Sender ID | `1234567890` |
| `VITE_FIREBASE_APP_ID` | Firebase Web App ID | `1:1234567890:web:abcdef` |
| `VITE_SERVER_URL` | Express Backend Base URL | `http://localhost:5000` |

### Server (`EstateLiteServer/.env`)
| Variable | Description | Example / Value |
| :--- | :--- | :--- |
| `PORT` | Express Server Listening Port | `5000` |
| `MONGO_URI` | MongoDB Atlas Connection String | `mongodb+srv://user:pass@cluster.mongodb.net/?...` |
| `ALLOWED_ORIGINS` | CORS Allowed Origins | `http://localhost:5173` |
| `API_KEY` | Server Secret API Key | `estatelite_secret_api_key` |
| `FIREBASE_SERVICE_ACCOUNT_KEY` | Path to Firebase Admin SDK JSON | `./estate-lite-firebase-adminsdk.json` |

---

## 📡 API Endpoints Table

| Method | Endpoint | Description | Request Body | Success Response |
| :--- | :--- | :--- | :--- | :--- |
| **GET** | `/` | Root server health check | None | `200 OK` — `"EstateLite server is running"` |
| **GET** | `/api/properties` | Fetch all property listings | None | `200 OK` — JSON array of 12+ properties |
| **GET** | `/api/properties/:id` | Fetch single property detail by MongoDB `_id` | None | `200 OK` — Property JSON object |
| **POST** | `/api/properties` | Create a new property listing | `{ title, price, location, bedrooms, description, addedBy }` | `201 Created` — `{ message, insertedId, property }` |

---

## 🔑 Demo Credentials

To test authenticated features (such as adding new properties):

- **Email:** `demo@estatelite.com`
- **Password:** `Demo@1234`

---

## 👥 Team Roles & Responsibilities

| Student Roll | Primary Responsibility | Key Deliverables & Modules |
| :--- | :--- | :--- |
| **Roll 131** | Backend + Architecture | Express API setup, MongoDB Atlas connection, REST endpoints (`GET/POST /api/properties`), rate-limiting middleware, CORS |
| **Roll 130** | Frontend + Phase 1 Docs | React Vite client setup, Navbar, Footer, Dashboard, Property Gallery (`PropertyCard`), Submit Property form, Firebase Auth, Phase 1 Requirements doc |
| **Roll 132** | Data + Final Report | MongoDB seeding script (`seed.js`), 12 Dhaka property mock data entries, Phase 2 Process Model doc, root `README.md`, screenshots & Final Design Report outline |

---

*Developed as part of the Software Engineering Lab Course (August 2026).*
