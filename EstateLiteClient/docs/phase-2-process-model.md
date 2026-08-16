# Phase 2: Process Model Justification - EstateLite MVP

> **Project:** EstateLite — Real Estate Listing Platform (Varsity MVP)  
> **Tech Stack:** MERN Stack (MongoDB, Express.js, React, Node.js)  
> **Selected Model:** Prototype Software Process Model  
> **Document Status:** Official Architecture Documentation  

---

## 1. Selected Process Model: Prototype Model

The **Prototype Software Process Model** is an iterative software development methodology centered around building an early, simplified version of the software system (a prototype) to visualize, evaluate, and refine core functionality before committing to full-scale engineering or production deployment. In the context of **EstateLite**, a varsity MVP real estate platform, prototyping allows the engineering team to rapidly assemble working modules—such as property listing displays, interactive search filters, form submissions, and authentication—into a functional application.

Rather than attempting to capture exhaustively detailed specifications prior to writing code, the Prototype Model emphasizes building a tangible demonstration version. This working prototype serves as a concrete medium for gathering immediate stakeholder feedback, validating MERN stack technology integrations (such as MongoDB Atlas schemas and Firebase Authentication), and discovering latent user interface requirements early in the project lifecycle.

---

## 2. Why Prototype is Suitable for EstateLite

The selection of the Prototype Model for EstateLite is justified by several project-specific technical and organizational factors:

1. **Quick Demonstration Capability (Rapid Time-to-Demo):**  
   As an academic project with strict evaluation deadlines, EstateLite required a working application that could be demonstrated to evaluators and peers as early as possible. The Prototype Model prioritizes building functional UI screens and API endpoints rapidly, allowing a complete end-to-end user flow (from browsing property listings to submitting new entries) to be demonstrated early.

2. **Limited Development Timeframe:**  
   Given the compressed schedule of a university semester project, exhaustive upfront requirements analysis or prolonged multi-sprint planning ceremonies would consume valuable coding time. Prototyping enabled the team to begin implementation immediately while refining edge cases concurrently.

3. **Tight Stakeholder & Evaluator Feedback Loop:**  
   Building a working prototype provides immediate visual and functional artifacts for course instructors and evaluators to review. Feedback on layout preferences, property card attributes, filter behavior, and navigation flows can be incorporated into subsequent prototype iterations without costly rework.

4. **Early Technical Feasibility & Integration Check:**  
   Integrating multiple components of the MERN stack—specifically MongoDB Atlas, Express REST APIs, React with Tailwind CSS / DaisyUI, and Firebase Authentication—presents architectural integration risks. Creating an early working prototype validated database connectivity, CORS handling, client-side routing, and environment variable management upfront before building secondary features.

---

## 3. Why Waterfall is Less Suitable

The classic **Waterfall Process Model** was deemed inappropriate for EstateLite due to the following structural limitations:

1. **Rigid Sequential Phases:**  
   Waterfall requires completing each phase (Requirements $\rightarrow$ Design $\rightarrow$ Implementation $\rightarrow$ Verification $\rightarrow$ Maintenance) strictly in sequence. In an MVP development context, blocking implementation until all requirement specifications are finalized creates unnecessary bottlenecks.

2. **No Early Working Deliverable:**  
   Under Waterfall, a working software deliverable is only produced near the very end of the lifecycle. If structural integration flaws or UI usability issues are discovered during late-stage testing, resolving them requires backtracking through multiple phases, creating significant schedule risk.

3. **Inflexibility to Evolving Requirements:**  
   Upfront requirements for varsity projects frequently evolve based on evaluator feedback, feature scope adjustments, or technical constraints encountered during implementation. Waterfall's strict change control mechanisms make adapting to mid-course specification updates difficult.

---

## 4. Why Agile Scrum is Less Suitable

While **Agile Scrum** is widely used in commercial software engineering, it presents noticeable friction for a small-scale MVP project like EstateLite:

1. **High Ceremony & Overhead for Small Teams:**  
   Scrum mandates regular ceremonies including Daily Standups, Sprint Planning, Backlog Grooming, Sprint Reviews, and Retrospectives. For a 3-person student team working on a focused MVP, the administrative overhead of managing these ceremonies consumes time better spent on direct development and testing.

2. **Team Size & Scope Mismatch:**  
   Scrum is optimized for cross-functional teams of 5–9 members working on large, long-term software products. Applying formal Scrum roles (Scrum Master, Product Owner, Development Team) to a small academic group leads to role redundancy and unnecessary process management.

3. **Insufficient Duration for Multiple Multi-Week Sprints:**  
   The typical 2-week Sprint structure requires multiple iterations over months to realize full product capability. Given the short timeframe of the lab assignment, running formal multi-sprint cycles is impractical compared to rapid, continuous prototype refinement.

---

## 5. Process Model Comparison Matrix

The table below compares the Prototype Model against Waterfall and Agile Scrum across five core criteria relevant to EstateLite:

| Evaluation Criteria | Prototype Model (Selected) | Waterfall Model | Agile Scrum Model |
| :--- | :--- | :--- | :--- |
| **Time to Working Demo** | **Very Fast** (Early working screens & APIs) | **Slow** (Delivered only in final phase) | **Moderate** (Delivered incrementally per sprint) |
| **Flexibility to Changes** | **High** (Iterative adjustment based on feedback) | **Low** (Change requires formal phase review) | **High** (Backlog reprioritization each sprint) |
| **Suitable Team Size** | **Small to Medium** (1–5 developers) | **Medium to Large** | **Medium** (5–9 developers) |
| **Documentation Overhead** | **Low to Moderate** (Focused on MVP docs) | **Very High** (Exhaustive specs before coding) | **Moderate** (User stories & sprint backlogs) |
| **Feedback Cycle** | **Immediate** (Direct visual & user testing) | **Late** (User testing only at project end) | **Periodic** (At end of each 2-week sprint) |

---

## 6. Conclusion

The **Prototype Software Process Model** provided the optimal balance of speed, adaptability, and risk mitigation for developing the EstateLite Real Estate Listing Platform MVP. By facilitating early MERN stack integration, enabling immediate visual feedback from project evaluators, and avoiding the heavy process overhead of Waterfall or Scrum, Prototyping allowed our small team to deliver a functional, high-quality real estate application within strict time constraints.
