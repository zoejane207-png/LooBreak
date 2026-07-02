# 🚽 LooBreak

LooBreak is a daily trivia quiz app designed to be played on your loo break. Play a quick 10-question quiz, compete on the daily leaderboard, and discover icebreaker questions and bathroom tips along the way.

**Live app:** https://loobreak.onrender.com/

---

## Features

- 🎯 **Daily Quiz** — 10 multiple choice questions, same for everyone each day
- 🏆 **Daily Leaderboard** — see how you rank against other players
- 🧊 **Icebreaker Button** — random icebreaker questions to think about or discuss
- 💡 **LooTip of the Day** — a handy bathroom tip shown in the footer
- 🌙 **Dark Mode** — toggle between light and dark themes

---

## Structure

This repo contains two applications:

- A **frontend** React app
- A **backend** API server

These two applications communicate through HTTP requests and need to be run separately.

---

## Quickstart

### Install Node.js

1. Install Node Version Manager (NVM):

brew install nvm

Then follow the instructions to update your `~/.zshrc`.

2. Open a new terminal and install Node.js version 24:

nvm install 24

> This project requires Node 24.

### Install MongoDB

brew tap mongodb/brew
brew install mongodb-community@8.0

> If you see a message saying `If you need to have mongodb-community@8.0 first in your PATH, run:`, follow the instruction and restart your terminal.

Start MongoDB:

brew services start mongodb-community@8.0

### Set up the project

1. Clone the repo to your local machine
2. Install dependencies for both applications:

cd frontend
npm install
cd ../api
npm install

---

## Environment Variables

### Frontend

Create a file `frontend/.env`:

VITE_BACKEND_URL="http://localhost:3000"

### Backend

Create a file `api/.env`:

MONGODB_URL="mongodb://0.0.0.0/loobreak"
NODE_ENV="development"
JWT_SECRET="secret"

### Backend (test)

Create a file `api/.env.test`:

MONGODB_URL="mongodb://0.0.0.0/loobreak_test"
JWT_SECRET="test_secret"

---

## Seed the Database

To populate the database with questions, players, tips and icebreakers:

cd api
npm run seed

---

## Running the App

### Start the backend (in the `api` directory):

cd api
npm run dev

### Start the frontend (in a new terminal, in the `frontend` directory):

cd frontend
npm run dev

Open your browser and go to `http://localhost:5173/`

---

## Running Tests

### Backend:

cd api
npm test

### Frontend:

cd frontend
npm test

### Frontend coverage report:

cd frontend
npm test -- --coverage --run

---

## Tech Stack

| Frontend | React 18, Vite 8, Tailwind CSS, shadcn/ui |
| Backend | Node.js 24, Express 4 |
| Database | MongoDB 8, Mongoose 8 |
| Testing | Vitest 4 (frontend), Jest (backend) |

---

## Card Wall

[Trello Board](https://trello.com/b/xcTayIHB/push-play-flush)
