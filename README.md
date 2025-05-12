# Getting Started with Create React App

This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).

## Available Scripts

In the project directory, you can run:

### `npm start`

Runs the app in the development mode.\
Open [http://localhost:3000](http://localhost:3000) to view it in your browser.

The page will reload when you make changes.\
You may also see any lint errors in the console.

### `npm test`

Launches the test runner in the interactive watch mode.\
See the section about [running tests](https://facebook.github.io/create-react-app/docs/running-tests) for more information.

### `npm run build`

Builds the app for production to the `build` folder.\
It correctly bundles React in production mode and optimizes the build for the best performance.

The build is minified and the filenames include the hashes.\
Your app is ready to be deployed!

See the section about [deployment](https://facebook.github.io/create-react-app/docs/deployment) for more information.

### `npm run eject`

**Note: this is a one-way operation. Once you `eject`, you can't go back!**

If you aren't satisfied with the build tool and configuration choices, you can `eject` at any time. This command will remove the single build dependency from your project.

Instead, it will copy all the configuration files and the transitive dependencies (webpack, Babel, ESLint, etc) right into your project so you have full control over them. All of the commands except `eject` will still work, but they will point to the copied scripts so you can tweak them. At this point you're on your own.

You don't have to ever use `eject`. The curated feature set is suitable for small and middle deployments, and you shouldn't feel obligated to use this feature. However we understand that this tool wouldn't be useful if you couldn't customize it when you are ready for it.

## Learn More

You can learn more in the [Create React App documentation](https://facebook.github.io/create-react-app/docs/getting-started).

To learn React, check out the [React documentation](https://reactjs.org/).

### Code Splitting

This section has moved here: [https://facebook.github.io/create-react-app/docs/code-splitting](https://facebook.github.io/create-react-app/docs/code-splitting)

### Analyzing the Bundle Size

This section has moved here: [https://facebook.github.io/create-react-app/docs/analyzing-the-bundle-size](https://facebook.github.io/create-react-app/docs/analyzing-the-bundle-size)

### Making a Progressive Web App

This section has moved here: [https://facebook.github.io/create-react-app/docs/making-a-progressive-web-app](https://facebook.github.io/create-react-app/docs/making-a-progressive-web-app)

### Advanced Configuration

This section has moved here: [https://facebook.github.io/create-react-app/docs/advanced-configuration](https://facebook.github.io/create-react-app/docs/advanced-configuration)

### Deployment

This section has moved here: [https://facebook.github.io/create-react-app/docs/deployment](https://facebook.github.io/create-react-app/docs/deployment)

### `npm run build` fails to minify

This section has moved here: [https://facebook.github.io/create-react-app/docs/troubleshooting#npm-run-build-fails-to-minify](https://facebook.github.io/create-react-app/docs/troubleshooting#npm-run-build-fails-to-minify)



Loan Manager (Community) - README
Overview
The Loan Manager (Community) is a web application designed to manage loan applications, approval, and rejection processes. It provides role-based access for users, verifiers, and admins. Users can apply for loans, verifiers can view and approve/reject loan applications, and admins have control over all loan data.

Repository Structure:
This project is organized with two separate branches:
.main branch – Contains the backend (Node.js + PostgreSQL)
.master branch – Contains the frontend (React.js)
Switch between branches to access the respective codebases.


Technologies Used:
.Frontend: React.js
.Backend: Node.js, Express.js
.Database: PostgreSQL
.Authentication: JWT (JSON Web Tokens)

Features:
.User:
..Register and login.
..Apply for loans.
..View their loan status.

.Verifier:
..View loan applications.
..Approve or reject loans.

.Admin:
..View all loan applications.
..Approve or reject loans.
..Full control over the loan status.

Project Setup
Prerequisites
.Node.js (v14 or later)
.PostgreSQL (for database setup)
.npm (Node Package Manager)

Backend Setup
Clone the repository:
git clone <repository-url>
cd loan-manager-community
Install dependencies:

cd backend
npm install
Configure PostgreSQL:

Create a PostgreSQL database for the application.

Update the database connection details in backend/config/db.js to match your local PostgreSQL setup.

Run database migrations (if any):

npm run migrate
Start the backend server:

npm start
The backend server will be running on http://localhost:5000.

Frontend Setup
Install frontend dependencies:

cd frontend
npm install
Configure the frontend to connect with your backend:

Update API base URLs in frontend/src/utils/api.js to match your backend server.

Start the frontend development server:
npm start
The frontend will be available at http://localhost:3000.

API Endpoints
User Endpoints
POST /api/register/user: Register a new user.

POST /api/login/user: Login as a user (returns JWT token).

GET /api/loans: View all loans for a user.

POST /api/loans: Apply for a new loan.

Verifier Endpoints
GET /api/loans: View all loan applications.

PUT /api/loans/:id/status: Approve or reject a loan application.

Admin Endpoints
GET /api/loans: View all loan applications.

PUT /api/loans/:id/status: Approve or reject a loan application.

Running in Development
The backend server runs on port 5000 by default.

The frontend runs on port 3000 by default.

In development, both servers need to be running concurrently. You can use concurrently to run both frontend and backend from one terminal:
npm install -g concurrently
Then, run:

concurrently "npm run start:frontend" "npm run start:backend"

Folder Structure

/loanmanager
  /frontend              # React.js frontend
    /src
      /components        # React components
      /pages             # Page components (e.g. LoanList, Dashboard)
  /backend               # Node.js backend
    /controllers         # Business logic for loan operations
    /models              # Database models and queries
    /routes              # Express routes
    /config              # Configuration (DB connection, etc.)

License
This project is licensed under the MIT License - see the LICENSE file for details.

Author
Developed by CH Harshavardhan Reddy


