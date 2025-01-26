
# StaffHub (Employee Management System MERN Stack)

The Employee Management System (EMS) is a web application developed to streamline human resource management processes. It is built using the MERN (MongoDB, Express.js, React, Node.js) stack.

## Features
#### Authentication
- Users can log in using their username and password.
- Accessible only by super admin, the sign-up page allows the creation of new users with specific details such as email, name, password, date of joining and position.
#### Profile Management
- Users can edit their username and password.
- Users can upload a profile picture.
#### Leave Management
- Normal users can apply for leave and view their leave history.
- Super admin can view, approve, and reject leave requests from all users.
#### Employee Management
- Normal users can view and edit their own profiles.
- Super admin has access to a list of all employees and can edit their data.
#### Dashboard
- Displays relevant information for all users.
- Shows who is on leave today.
- Provides a summary of total employees and their designations.

## Technologies Used

- **MongoDB:** NoSQL database for storing employee information.
- **Express.js:** Backend framework for handling HTTP requests and  routing.
- **React.js:** Frontend library for building user interfaces.
- **Node.js:** JavaScript runtime environment for server-side - development.



## Installation

To run the Employee Management System on your local machine, follow these steps:

1. Clone the repository to your local machine :
```bash
  git clone https://github.com/Rahul-65-Patra/StaffHub .
```
2. Go to the project directory :
```bash
  cd StaffHub
```
3. Go to the frontend directory and Install dependencies :
```bash
  cd frontend
```
```bash
  npm install
```
4. Go to the backend directory and Install dependencies :
```bash
  cd backend
```
```bash
  npm install
```
5. Start the MongoDB server on your local machine.

6. Start the frontend server
```bash
  npm run dev
```
7. Start the backend server
```bash
  npm start
```
8. Access the Employee Management System in your browser at http://localhost:5173.
## Environment Variables

To run this project, you will need to add the following environment variables to your .env file

`MONGO_URL:`Your MongoDB Connection String

`PORT:`PORT number


## Tech Stack

**Client:** React, TailwindCSS

**Server:** Node, Express

**Database:** MongoDB


## Badges

Add badges from somewhere like: [shields.io](https://shields.io/)

[![MIT License](https://img.shields.io/badge/License-MIT-green.svg)](https://choosealicense.com/licenses/mit/)

[![GPLv3 License](https://img.shields.io/badge/License-GPL%20v3-yellow.svg)](https://opensource.org/licenses/)

[![AGPL License](https://img.shields.io/badge/license-AGPL-blue.svg)](http://www.gnu.org/licenses/agpl-3.0)


## License

[MIT](https://choosealicense.com/licenses/mit/)

