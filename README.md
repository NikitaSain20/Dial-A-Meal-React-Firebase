
---

### ✅ **README: React + Firebase – Grab Your Meal**
```markdown
# 🍴 Grab Your Meal – React + Firebase

**Grab Your Meal** is a meal subscription web app using React and Firebase. It supports customer meal bookings for 1 month, 2 months, or a custom number of days. Admin can manage bookings, change status, and handle pricing plans.

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
- View & Update All Bookings
- Manage Plans
- Change Booking Status: Pending, Approved, Cancelled, Rejected

---

## 🛠️ Tech Stack

- **Frontend:** React.js
- **Backend:** Firebase Firestore
- **Authentication:** Firebase Auth
- **Hosting:** Firebase Hosting
- **UI Framework:** Bootstrap/Tailwind CSS

---

## 📁 Folder Structure

/public
/src
└── components/
└── pages/
└── App.js

.env
firebase.json

yaml
Copy
Edit

---

## ⚙️ Installation

### 1. Clone the repo
```bash
git clone https://github.com/your-username/grab-your-meal-firebase.git
cd grab-your-meal-firebase
2. Install Dependencies
bash
Copy
Edit
npm install
3. Configure .env
env
Copy
Edit
REACT_APP_FIREBASE_API_KEY=your_api_key
REACT_APP_FIREBASE_AUTH_DOMAIN=your_auth_domain
REACT_APP_FIREBASE_PROJECT_ID=your_project_id
REACT_APP_FIREBASE_STORAGE_BUCKET=your_storage_bucket
REACT_APP_FIREBASE_MESSAGING_SENDER_ID=your_messaging_id
REACT_APP_FIREBASE_APP_ID=your_app_id
4. Start the App
bash
Copy
Edit
npm start
📸 Screenshots
Add screenshots in /public/screenshots and reference:

markdown
Copy
Edit
![Booking Page](./public/screenshots/booking.png)
![Admin Panel](./public/screenshots/admin.png)
🔥 Firebase Deployment
bash
Copy
Edit
firebase login
firebase init
firebase deploy
✍️ Author
Developed by Nikita Sain

