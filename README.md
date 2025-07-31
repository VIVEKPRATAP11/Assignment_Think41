# Assignment_Think41

This repository contains a full-stack web application for product management and display. The project is organized into two main folders: `backend` and `frontend`.

## Table of Contents
- [Project Overview](#project-overview)
- [Folder Structure](#folder-structure)
- [Backend](#backend)
  - [Features](#backend-features)
  - [Setup & Usage](#backend-setup--usage)
- [Frontend](#frontend)
  - [Features](#frontend-features)
  - [Setup & Usage](#frontend-setup--usage)
- [Data Files](#data-files)
- [How to Run the Project](#how-to-run-the-project)
- [Contributing](#contributing)
- [License](#license)

---

## Project Overview
This project demonstrates a simple product management system with a Node.js backend and a React frontend. The backend serves product data from a SQLite database and CSV files, while the frontend displays product lists and details in a user-friendly interface.

## Folder Structure
```
backend/
  db.js
  index.js
  package.json
  products_detailed.csv
  products.csv
  products.db
  README.md
frontend/
  package.json
  README.md
  public/
    favicon.ico
    index.html
    ...
  src/
    App.js
    ProductList.js
    ProductDetail.js
    ...
```

## Backend
### Backend Features
- Node.js server using Express.js
- SQLite database integration (`products.db`)
- Product data import from CSV files (`products.csv`, `products_detailed.csv`)
- RESTful API endpoints for product listing and details

### Backend Setup & Usage
1. Navigate to the `backend` directory:
   ```powershell
   cd backend
   ```
2. Install dependencies:
   ```powershell
   npm install
   ```
3. Start the backend server:
   ```powershell
   node index.js
   ```
4. The server will run on the default port (usually 3001 or as specified in `index.js`).

## Frontend
### Frontend Features
- Built with React.js
- Product list and detail views
- Responsive design
- Fetches product data from backend API

### Frontend Setup & Usage
1. Navigate to the `frontend` directory:
   ```powershell
   cd frontend
   ```
2. Install dependencies:
   ```powershell
   npm install
   ```
3. Start the frontend development server:
   ```powershell
   npm start
   ```
4. The app will run on [http://localhost:3000](http://localhost:3000) by default.

## Data Files
- `products.csv`: Basic product information
- `products_detailed.csv`: Detailed product information
- `products.db`: SQLite database containing product data

## How to Run the Project
1. Start the backend server (see Backend Setup).
2. Start the frontend server (see Frontend Setup).
3. Open your browser and navigate to [http://localhost:3000](http://localhost:3000).
4. The frontend will communicate with the backend to display product data.

## Contributing
Contributions are welcome! Please fork the repository and submit a pull request.

## License
This project is licensed under the MIT License.
