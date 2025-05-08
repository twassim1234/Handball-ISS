# Handball-ISS

## Description

This project is designed to digitize the inefficient paper-based processes and optimize critical handball management processes, including player acquisition, match organization, and result recording. It features a web-based interface that enables stakeholders to manage clubs, validate player qualifications, organize matches, and generate match sheets automatically

## Tech Stack

- **Frontend**: React, Vite
- **Backend**: Node.js, Express, Axios
- **Database**: MySQL
- **Other Tools**: Multer

## Installation

### Prerequisites

- Node.js installed
- npm or yarn installed
- Multer installed

### Backend Setup

1. Navigate to the backend directory:
    ```bash
    cd backend
    ```
2. Install dependencies:
    ```bash
    npm install
    ```
3. Start the backend server:
    ```bash
    node server.js
    ```

### Frontend Setup

1. Navigate to the frontend directory:
    ```bash
    cd frontend
    ```
2. Install dependencies:
    ```bash
    npm install
    ```
3. Start the frontend server:
    ```bash
    npm run dev
    ```

## Environment Variables

The following environment variables are required for the project:

```env
PORT= 8000
URL= "mysql://root:admin123@localhost:3306/handball"
DB_NAME= "handball"
DB_HOST= "localhost"
DB_USER= "root"
db_PASSWORD= "admin123"
JWT_SECRET= "ed34df439zx"
GOOGLE_API_KEY="AIzaSyBpHjDvAdqYoHx5Ggq3G3SZPKhLYGrPxK4"
```

## Folder Structure
```plaintext
root/
    ├── backend/    # Node.js backend
    │   ├── database/   # MySQL database scripts and configurations
    ├── frontend/   # React frontend
    ├── LICENSE     # License file for the project
    ├── README.md   # Project documentation
```
```

## License

This project is licensed under the [MIT License](LICENSE).
