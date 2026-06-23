## LooBreak


### Structure

This repo contains two applications:

- A frontend React App
- A backend api server

These two applications will communicate through HTTP requests, and need to be
run separately.

### Documentation

[More documentation of the codebase and its architecture can be found here.](./DOCUMENTATION.md)
It's recommended you all read the suggested docs _after making sure the whole
setup below worked for everyone_. Then work together on a diagram describing how
the application works.

### Card wall

[TRELLO](https://trello.com/b/xcTayIHB/push-play-flush)

### Quickstart

### Install Node.js

If you haven't already, make sure you have node and NVM installed.

1. Install Node Version Manager (NVM)
   ```
   brew install nvm
   ```
   Then follow the instructions to update your `~/.zshrc`.
2. Open a new terminal
3. Install Node.js version 24:
   ```
   nvm install 24
   ```
   _Note: This project requires Node 24 or later to run._

### Set up your project

1. Every team member clone the fork to their local machine
2. Install dependencies for both the `frontend` and `api` applications:
   ```
   cd frontend
   npm install
   cd ../api
   npm install
   ```
   **Note:** If you see peer dependency warnings during install, they should resolve automatically. If you encounter `ERESOLVE` errors, you can use `npm install --legacy-peer-deps` as a fallback.

5. Install an ESLint plugin for your editor, for example
   [ESLint for VSCode](https://marketplace.visualstudio.com/items?itemName=dbaeumer.vscode-eslint)
6. Install MongoDB - pick the latest version available, at the time of writing this, it's @8.0. 
   ```
   brew tap mongodb/brew
   brew install mongodb-community@8.0
   ```
   _Note:_ If you see a message that says
   `If you need to have mongodb-community@8.0 first in your PATH, run:`, follow
   the instruction. Restart your terminal after this.
7. Start MongoDB

   ```
   brew services start mongodb-community@8.0
   ```

### Setting up environment variables.

We need to create two `.env` files, one in the frontend and one in the api.

#### Frontend

Create a file `frontend/.env` with the following contents:

```
VITE_BACKEND_URL="http://localhost:3000"
```

#### Backend

Create a file `api/.env` with the following contents:

```
MONGODB_URL="mongodb://0.0.0.0/loobreak"
NODE_ENV="development"
JWT_SECRET="secret"
```

For an explanation of these environment variables, see the documentation.

### How to run the server and use the app

1. Start the server application (in the `api` directory) in dev mode:

```
; cd api
; npm run dev
```

2. Start the front end application (in the `frontend` directory)

In a new terminal session...

```
; cd frontend
; npm run dev
```

You should now be able to open your browser and go to
`http://localhost:5173/signup` to create a new user.

Then, after signing up, you should be able to log in by going to
`http://localhost:5173/login`.

After logging in, you won't see much but you can create posts using PostMan and
they should then show up in the browser if you refresh the page.

### Dependencies

This project uses:

- **Node.js 24+** - Runtime
- **React 18** - Frontend UI
- **Vite 8** - Frontend build tool
- **Express 4** - Backend server
- **Mongoose 8** - MongoDB object modeling
- **MongoDB 8** - Database
- **Vitest 4** - Testing framework

All versions have been tested together and should work without conflicts.