# Phase 1 Requirements Documentation
## EstateLite — Real Estate Listing Platform MVP

> **Course:** Software Engineering Lab
> **Process Model:** Prototype Process Model
> **Technology Stack:** MERN (MongoDB, Express.js, React, Node.js)
> **Team Roles:** Roll 130 (Frontend + Phase 1 Docs) · Roll 131 (Backend + Architecture) · Roll 132 (Data + Final Report)
> **Date:** August 2026

---

## 1. Project Overview

EstateLite is a Minimum Viable Product (MVP) web application built as a university Software Engineering lab project using the MERN technology stack. The platform provides a streamlined interface for browsing and submitting real estate property listings in a structured, data-driven manner. By combining a React-based single-page application on the frontend with a RESTful Node.js/Express backend and a MongoDB Atlas cloud database, EstateLite demonstrates a functional end-to-end prototype of a modern real estate listing system.

The platform targets the core workflows present in real-world real estate web applications: authenticated users may submit new property listings, and both authenticated and unauthenticated users may browse all available listings. The system stores property data — including title, price, location, bedroom count, and description — in a MongoDB collection and exposes it through a well-defined REST API. The React frontend consumes this API via Axios HTTP requests, presenting the data in a clean, responsive interface built with TailwindCSS and the DaisyUI component library.

EstateLite is intentionally scoped as a prototype. The objective is to validate the technical feasibility of the MERN architecture for a real estate listing use case, to gather early feedback on core workflows, and to establish a foundation that can be iteratively extended in future phases. The Prototype Process Model was selected for this project specifically because it prioritises rapid delivery of a demonstrable working system over exhaustive upfront specification.

---

## 2. Problem Statement

In Bangladesh, real estate information is fragmented across informal channels including social media groups, word-of-mouth referrals, and unstructured classified advertisements. Prospective buyers, renters, and property agents lack access to a centralised, reliable platform where property listings can be submitted, browsed, and searched in a structured format.

Furthermore, university students studying Software Engineering lack hands-on exposure to full-stack web development workflows, including RESTful API design, user authentication systems, frontend-backend integration, and cloud database management. There is a need for a practical, demonstrable project that illustrates these concepts within a realistic application domain.

EstateLite addresses both problems: it provides a functional prototype of a real estate listing platform targeting Dhaka-area properties, while simultaneously serving as a complete Software Engineering educational artefact demonstrating the MERN stack, the Prototype Process Model, Firebase Authentication, and MongoDB Atlas in a cohesive, working system.

---

## 3. Stakeholder Identification

| Stakeholder | Role | Interest |
|-------------|------|----------|
| **Property Browser (Guest User)** | End user | Ability to browse all property listings without requiring an account; access to title, price, location, and description data |
| **Registered User (Submitter)** | End user | Ability to log in with a verified account and submit new property listings directly into the database |
| **Platform Administrator** | Operational | Ability to seed the database with sample data and manage Firebase user accounts through the Firebase Console |
| **Software Engineering Instructor** | Academic evaluator | Verification that the project demonstrates a functioning MERN prototype, correct process model application, and complete documentation |
| **Development Team (Rolls 130, 131, 132)** | Developers | Delivery of a working MVP that satisfies all functional and non-functional requirements within the academic timeline |
| **MongoDB Atlas** | Infrastructure provider | Provides the cloud-hosted NoSQL database cluster used to persist property data |
| **Firebase (Google)** | Authentication provider | Provides secure, managed email/password authentication services for the platform |

---

## 4. Project Scope

### 4.1 In Scope (MVP)

The following features and components are included in the EstateLite MVP:

- **User Authentication:** Firebase email/password login for registered users. Authentication state is managed globally via a React Context Provider.
- **Dashboard (Home Page):** A landing page displaying a welcome message, live statistics (total property count fetched from the API), and navigation cards linking to core modules.
- **Property Listing Module:** A page that fetches all property records from the `GET /api/properties` endpoint and displays them in a responsive card grid. Each card shows the property title, price, location, bedroom count, and description.
- **Property Submission Form:** An authenticated form (`/add-property`) protected by a private route guard. Allows logged-in users to submit new property listings via a `POST /api/properties` API call.
- **Navigation Component:** A responsive, sticky navigation bar with links to Dashboard, Browse Properties, and Add Property (auth-gated), plus a Login/Logout button.
- **REST API (Read):** `GET /api/properties` — returns all property listings from MongoDB sorted by creation date.
- **REST API (Create):** `POST /api/properties` — validates and inserts a new property document into MongoDB.
- **Single Property Lookup API:** `GET /api/properties/:id` — retrieves a single property by its MongoDB ObjectId.
- **Sample Data:** A database seed script (`EstateLiteServer/seed.js`) to populate the MongoDB collection with 12 realistic mock property listings (Roll 132).
- **Error Handling:** 404 error page, API error states with retry affordance, form validation with toast notifications.

### 4.2 Out of Scope (Not included in MVP)

The following features are explicitly excluded from the current version:

- Property image upload or storage
- Property search by price range or bedroom count (beyond the client-side text search by title/location)
- Property update (PUT) or delete (DELETE) operations
- User registration within the application (users are created manually via Firebase Console)
- Property detail page (individual property view beyond the listing card)
- Map or geolocation integration
- Email notifications or alerts
- Payment or enquiry functionality
- Admin dashboard or moderation tools
- Mobile native application

---

## 5. Functional Requirements

| ID | Requirement | Priority |
|----|-------------|----------|
| **FR-01** | The system shall provide a login page where registered users can authenticate using their email address and password via Firebase Authentication. | High |
| **FR-02** | The system shall redirect successfully authenticated users to the Dashboard (Home) page and persist their authentication session across page refreshes. | High |
| **FR-03** | The system shall display a Dashboard page containing a welcome message, live total property count fetched from the API, and navigation elements linking to the Property Listing and Property Submission modules. | High |
| **FR-04** | The system shall fetch all property listings from the `GET /api/properties` backend endpoint and display them in a responsive card grid on the Property Listing page. | High |
| **FR-05** | Each property card on the listing page shall display the property title, price (in BDT with localised number formatting), location, bedroom count, and a brief description. | High |
| **FR-06** | The system shall provide a client-side text search facility on the Property Listing page that filters displayed cards in real time by property title or location without requiring an additional API call. | Medium |
| **FR-07** | The system shall provide a property submission form accessible only to authenticated users, protected by a private route that redirects unauthenticated visitors to the login page. | High |
| **FR-08** | The property submission form shall collect and validate the following fields before sending a `POST` request to `POST /api/properties`: Property Title (required), Price in BDT (required), Location (required), Number of Bedrooms (optional), and Description (required). | High |
| **FR-09** | The system shall display appropriate user feedback via toast notifications upon successful property submission (navigating to the Property Listing page) or upon submission failure (displaying an error message and remaining on the form). | Medium |
| **FR-10** | The system shall provide a responsive navigation bar with links to Dashboard, Browse Properties, and (when authenticated) Add Property, along with a Login button for unauthenticated users and a Logout button that signs the user out and returns them to the Dashboard. | High |

---

## 6. Non-Functional Requirements

| ID | Requirement | Category |
|----|-------------|----------|
| **NFR-01** | The frontend application shall load and render the Dashboard page within 3 seconds on a standard broadband connection, excluding initial network data fetch latency from the backend API. | Performance |
| **NFR-02** | The backend REST API shall respond to `GET /api/properties` and `POST /api/properties` requests within 2 seconds under normal operating conditions with the MongoDB Atlas free-tier cluster. | Performance |
| **NFR-03** | The application shall be responsive and usable on screen widths from 320px (mobile) through 1440px (desktop) without horizontal scrolling or layout breakage, implemented via TailwindCSS responsive utility classes. | Usability |
| **NFR-04** | All user-facing validation errors and operation results (login failure, form submission success/failure) shall be communicated to the user within 500ms of the event via toast notifications, without requiring a page reload. | Usability |
| **NFR-05** | Firebase credentials (API keys, service account JSON) shall not be hard-coded in committed source files. Client-side Firebase configuration values shall be loaded from environment variables prefixed with `VITE_`, and the MongoDB URI shall be loaded from `process.env.MONGO_URI` on the server. | Security |
| **NFR-06** | The `/add-property` route shall be protected such that unauthenticated users are automatically redirected to `/login` with the originally requested path preserved, allowing redirect-back upon successful authentication. | Security |
| **NFR-07** | The backend server shall implement a rate-limiting middleware capping requests at 100 per IP address per 60-second window, returning HTTP 429 for requests exceeding this limit. | Reliability |
| **NFR-08** | The frontend codebase shall be modular, with each page and UI component defined in a separate `.jsx` file within a logical directory structure (`src/components/Homepage/`, `src/components/Properties/`, `src/components/otherPages/`), enabling independent development and maintenance by team members. | Maintainability |

---

## 7. User Stories

**US-01 — Guest Browsing**
*As a* prospective property buyer browsing without an account,
*I want to* visit the EstateLite platform and immediately see all available property listings with their title, price, location, and description,
*so that* I can evaluate whether any listed property meets my needs without being required to register or log in.

---

**US-02 — Authenticated Listing Submission**
*As a* registered real estate agent or property owner,
*I want to* log in with my email and password and submit a new property listing by entering its title, price, location, bedroom count, and description,
*so that* the listing is saved to the database and immediately visible to all users browsing the Property Gallery.

---

**US-03 — Dashboard Orientation**
*As a* returning user who has just logged in,
*I want to* land on a Dashboard that shows me how many properties are currently listed and provides clear navigation to browse listings or add a new one,
*so that* I can quickly understand the platform's current state and proceed to my intended action without confusion.

---

**US-04 — Access Control Enforcement**
*As an* unauthenticated visitor who attempts to navigate directly to the Add Property page,
*I want to* be automatically redirected to the Login page with my intended destination remembered,
*so that* after I successfully log in, I am taken directly to the Add Property form without having to navigate again.

---

**US-05 — Error Recovery on Submission**
*As a* logged-in user who submits an incomplete property form (missing a required field such as Title or Price),
*I want to* receive an immediate, clear error notification indicating which fields are required,
*so that* I can correct the form and resubmit successfully without losing the data I have already entered.

---

## 8. Assumptions

1. **Firebase project availability:** It is assumed that the Firebase project `estate-lite` is active, that the Email/Password authentication provider is enabled in the Firebase Console, and that at least one demo user account (`demo@estatelite.com`) exists prior to testing.

2. **MongoDB Atlas connectivity:** It is assumed that the MongoDB Atlas cluster is accessible and that the `EstateLiteDB.properties` collection exists with appropriate read/write permissions for the configured database user.

3. **Local development environment:** It is assumed that Node.js (LTS) and npm are installed on all development machines, and that the backend server (`EstateLiteServer/`) is running on `http://localhost:5000` when the frontend is run in development mode.

4. **Single-collection architecture:** It is assumed that the MVP requires only a single MongoDB collection (`properties`) with a flat document schema. No relational joins, embedded sub-documents, or multi-collection transactions are assumed.

5. **Email/password-only authentication:** It is assumed that the MVP does not require OAuth social login (Google, GitHub, etc.) and that user registration is performed manually by the administrator via the Firebase Console rather than through an in-app registration form.

6. **Internet connectivity:** It is assumed that the deployment environment has outbound internet access to reach both MongoDB Atlas and Firebase Authentication services during operation.

7. **Modern browser compatibility:** It is assumed that all end users will access the platform via a modern evergreen browser (Chrome, Firefox, Edge, Safari) that supports ES2020+ JavaScript and CSS Grid/Flexbox layout.

---

## 9. Constraints

1. **Academic timeline:** The MVP must be designed, developed, tested, and documented within the duration of a single university Software Engineering lab semester, limiting the scope of features that can be realistically implemented.

2. **Free-tier infrastructure:** Both MongoDB Atlas (M0 free cluster) and Firebase (Spark plan) are used at no cost, imposing storage, connection, and API call limits. The backend server is expected to run locally or on a free-tier hosting environment.

3. **No Mongoose ORM:** The project specification explicitly requires the use of the plain MongoDB native Node.js driver (`mongodb` npm package). Mongoose or any other ODM must not be used, keeping the data access layer minimal and directly demonstrating native driver usage.

4. **Technology stack fixed:** The technology stack (MongoDB, Express, React, Node.js, TailwindCSS, DaisyUI, Firebase) is predetermined by the project specification and cannot be changed. Alternative frameworks or databases may not be substituted.

5. **Team size and role boundaries:** The project is divided among three team members with distinct role boundaries (Roll 130: Frontend + Phase 1 Docs; Roll 131: Backend + Architecture; Roll 132: Data + Final Report). Each team member must work within their assigned scope to avoid merge conflicts and maintain a coherent git history.

6. **Read/Create API only:** The MVP API is constrained to read (GET) and create (POST) operations. Update (PUT/PATCH) and delete (DELETE) operations for property listings are out of scope for this phase, restricting user-facing functionality to browsing and submission only.

7. **Single-branch sequential workflow:** Due to the academic context and small team size, the git branching strategy uses short-lived feature branches merged directly into `main`, without a separate `develop` or staging branch. Continuous deployment pipelines are not used.
