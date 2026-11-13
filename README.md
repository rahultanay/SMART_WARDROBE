# Smart Wardrobe for Review

This is a separate copy of the original full wardrobe project adapted to the syllabus. Its interface uses the original black-sidebar dashboard design from GitHub commit b90f47e, implemented as working React components and CSS. The original project is unchanged.

## Stack

HTML, CSS, JavaScript, React JSX, Java 17, Spring Boot, SQL and Spring JDBC. H2 is the relational database. Vite, npm, Node.js and Maven are build and startup tools.

## Features retained

- Upload individual clothing photos and enter garment type, colour, pattern and fit.
- Import one photo with several garments using manually drawn crop boxes and rotation.
- Sample a fabric colour with HTML Canvas or choose it manually.
- Generate outfit combinations by dress style and occasion using JavaScript rules.
- Build an outfit around a selected item.
- Manage laundry, wear history, wardrobe search, archives and preferences.
- Export and import wardrobe backups.

AI recognition, pretrained models, ONNX inference, automatic garment segmentation, ThreeUI and shader effects have been removed. Garment types and patterns are selected manually. Canvas pixel calculations are basic colour estimates, not AI.

## Run in IntelliJ

Open this folder in IntelliJ IDEA and import backend/pom.xml as Maven. Install Node.js and a Java JDK (17 or newer). In the project terminal run:

```sh
npm install
npm start
```

Open http://127.0.0.1:8080. npm start builds React, packages Spring Boot and starts the backend serving the website. Data is saved locally in backend/data, independently of the original project.

For frontend development use npm run dev and start the backend separately. Backend source is in backend/src/main/java; frontend source is in src.

## Syllabus coverage

- Units 1 and 2: HTML, CSS, JavaScript, React components, forms, state, effects, DOM and Canvas.
- Unit 3: SQL schema, JDBC database reads and writes.
- Unit 4: Spring Boot HTTP endpoints and business logic.
- Unit 5: relational data model and database persistence. This copy uses JDBC; it does not claim a Spring Data JPA or microservices implementation.

Third-party build tools are development infrastructure rather than additional application languages. No Python or TypeScript is required to run the project.
