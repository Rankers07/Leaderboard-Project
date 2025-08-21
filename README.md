🏆 Leaderboard Project :-
 A full-stack Leaderboard System built with ReactJS (Frontend) and NodeJS + MongoDB (Backend).
 This project allows users to claim random points, stores their history, and dynamically updates rankings in real time.

Project Tree (Leaderboard Project) :-

📂LeaderboardProject

│
├── Backend/
│   ├── server.js
│   ├── package.json
│   ├── .env
│   ├── models/
│   │   ├── User.js
│   │   └── ClaimHistory.js
│   ├── routes/
│   │   ├── users.js
│   │   └── claims.js
│   ├── controllers/
│   │   ├── userController.js
│   │   └── claimController.js
│   └── config/
│       └── db.js
│
├── Frontend/
│   ├── package.json
│   ├── vite.config.js
│   ├── tailwind.config.js
│   ├── index.html
│   ├── src/
│   │   ├── main.jsx
│   │   ├── App.jsx
│   │   ├── components/
│   │   │   ├── UserSelector.jsx
│   │   │   ├── ClaimButton.jsx
│   │   │   ├── Leaderboard.jsx
│   │   │   └── HistoryList.jsx
│   │   ├── services/
│   │   │   └── api.js   (Axios API calls)
│   │   └── styles/
│   │       └── global.css
│   └── public/
│       └── favicon.ico
│
├── README.md
└── .gitignore

🚀 Features :-

User Selection :-
Choose from a list of 10 default users.
Add new users directly from the frontend (saved in the database).

Claim Points :-
Click a button to award random points (1–10) to the selected user.
Updates total points in the database.
Creates a claim history record for every claim.

Dynamic Leaderboard :-
Displays users with their name, total points, and rank.
Updates in real-time after each claim.

Database (MongoDB) :-
User collection stores all users and points.
Claim history collection stores every claim with timestamps.

🛠 Tech Stack :-
Frontend: ReactJS, TailwindCSS, Vite
Backend: NodeJS, ExpressJS
Database: MongoDB (Atlas)

🎯 How It Works :-
1. Select a user from the list (or add a new one).
2. Click Claim Points → Random points (1–10) are added.
3. The Leaderboard updates automatically with new ranks.
4. Every claim is stored in Claim History Collection.

📸 UI Preview :-
👉 User dropdown to select player.
👉 Claim button to generate random points.
👉 Real-time leaderboard with ranks & total points.

🏆 Bonus Points in This Project :-
✔️ Clean & Modern UI with TailwindCSS.
✔️ Fully Responsive.
✔️ Optimized API & Pagination Ready.
✔️ Well-structured, reusable code.

Project UI :-



