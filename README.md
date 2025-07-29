# 🍴 Dial A Meal– React + Firebase

**Dial A Meal** is a tiffin subscription web app using React and Firebase. It supports customer meal bookings for 1 month, 2 months, or a custom number of days. Admin can manage bookings, change status, and handle pricing plans.

---

## 🧩 Features

### 👤 Customer Panel

- Firebase Auth Login/Register
- Book Meals:
  - 1 Month
  - 2 Months
  - Custom Days
- Track Booking Status
- Profile Page

### 👨‍🍳 Admin Panel

- Manage customers and update their status
- Manage meals and update
- Manage pricing plans and update
- View & Update All Bookings
- Change Booking Status: Pending, Approved, Cancelled, Rejected

---

## 🛠️ Tech Stack

- **Frontend:** React.js
- **Backend:** Firebase Firestore
- **Authentication:** Firebase Auth
- **UI Framework:** Bootstrap/Tailwind CSS

---

## 📁 Folder Structure

dial-a-meal-react-firebase/
├── public/
│ └── ... # Static assets (index.html, images, etc.)
├── src/
│ ├── components/
│ │ ├── admin/
│ │ │ ├── layout/ # Admin-specific layout (Header, Sidebar, Footer)
│ │ │ │ ├── AdminHeader.js
│ │ │ │ └── AdminFooter.js
│ │ │ ├── pages/ # Admin-specific pages
│ │ │ │ ├── Dashboard.js
│ │ │ │ ├── ManageBookings.js
│ │ │ │ └── ...
│ │ ├── customer/
│ │ │ ├── layout/ # Customer layout (Header, Footer)
│ │ │ │ ├── CustomerHeader.js
│ │ │ │ └── CustomerFooter.js
│ │ │ ├── pages/ # Customer-specific pages
│ │ │ │ ├── Home.js
│ │ │ │ ├── MyBookings.js
│ │ │ │ └── ...
│ │ ├── auth/ # Authentication components
│ │ │ ├── Login.js
│ │ │ ├── Register.js
│ │ │ └── ...
│ │ ├── common/ # Reusable components (like buttons, loaders)
│ ├── firebase.js # Firebase config and initialization
│ ├── App.js # Root component
│ ├── index.js # Entry point
│ └── routes.js # Centralized route definitions
├── .env
├── .gitignore
├── package.json
└── README.md

---

## ⚙️ Installation

### 1. Clone the repo

git clone https://github.com/NikitaSain20/Dial-A-Meal-React-Firebase.git
cd Dial-A-Meal-React-Firebase

### 2. Install Dependencies

npm install

### 3. Configure .env

REACT_APP_FIREBASE_API_KEY=your_api_key
REACT_APP_FIREBASE_AUTH_DOMAIN=your_auth_domain
REACT_APP_FIREBASE_PROJECT_ID=your_project_id
REACT_APP_FIREBASE_STORAGE_BUCKET=your_storage_bucket
REACT_APP_FIREBASE_MESSAGING_SENDER_ID=your_messaging_id
REACT_APP_FIREBASE_APP_ID=your_app_id

### 4. Start the App

npm start

---

📸 Screenshots

<div align="center">
  <img src="public/screenshots/1.png" width="45%" style="margin: 10px;" />
  <img src="public/screenshots/2.png" width="45%" style="margin: 10px;" />
  <br/>
  <img src="public/screenshots/3.png" width="45%" style="margin: 10px;" />
  <img src="public/screenshots/4.png" width="45%" style="margin: 10px;" />
  <br/>
  <img src="public/screenshots/5.png" width="45%" style="margin: 10px;" />
  <img src="public/screenshots/6.png" width="45%" style="margin: 10px;" />
</div>

---

✍️ Author
Developed by Nikita Sain

```


```
