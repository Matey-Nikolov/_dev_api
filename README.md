#  _dev_api_

## Overview
(Name project - soon) is **SPA** (single page application). The goal of this thesis is to develop a web application that provides providers with a product to **monitor and manage** a group of endpoints (computers or servers). Provide an easy and simple to use **interface** for remote monitoring of computers. Provide an intuitive way to work with the application.


# ✨ Features
- Customers dashboard - general overview of all your customers with their number of machines and their respective alarms.
- Access setup - register new client.
- Logout - exit from your account. 

*All the Features described below are for a specific client and accordingly what rights we have the following information.*

- Enpoints table - display detailed information about the machines of a specific customer.
  - If you have **limited access**:
    - Display function - more information on a specific machine.
  - If you have **full access**:
    - Additional functions are to scan, update on a specific machine.

- Alerts table - while in events everything is shown, here the problems are reflected, they need to be addressed.
  - If you have **limited access**:
    - Only visualize.
  - If you have **full access**:
    - Visualize. An additional feature is Acknowledge.

- Management - allows to make backups of given policies from a corresponding list of policies.
  - If you have **limited access**:
    - Only access to backups.
  - If you have **full access**:
    - Access to backups, reset all policies to base and software downloader.

- Features available only if you have **full access**.
  - Websites - visualizes the sites we are allowed to access. We are allowed to add new ones or ban from the list.
  - Events table - visualizes what has happened on the machines in the last 24 hours. You have the feature to allow banned sites if there is no reason not to.

## Resources
Here are some used for the project.

- [Sophos](https://developer.sophos.com/) - Open API.
- [React](https://react.dev/) - fronted.
- [react-bootstrap](https://react-bootstrap.github.io/)
- [firebase](https://firebase.google.com/) - database.
- [axios](https://axios-http.com/docs/intro) - request api.
- [Expres.js](https://expressjs.com/) - for server.

## Application architecture
![project drawio (002)](https://github.com/Matey-Nikolov/_dev_api/assets/80168510/cf99e1cf-4472-4539-9cb5-2faaae2c4248)



# Project Setup
This project consists of two parts: a client and a server. Follow the steps below to set up each part.

### 1. Server Setup
The server acts as a bridge between the client application and the rest of the Internet.

### 1.1.  Setup Instructions
Navigate to the server directory (`../server`) in your terminal and install the following packages:

```
npm install cors axios axios-retry express express-rate-limit express-validator helmet
```

### 1.2. Running the Server
```
npm run start
```
Now server is running on port 3000.

### 2. Client application
The client application folder hosts the frontend interface that interacts with the server.

### 2.2 Setup Instructions

In terminal (`../client`) install this packages:

```
npm install react axios react-bootstrap bootstrap firebase react-secure-storage uuid react-router-dom
```

### 2.3 Create .env.local
Configure Firebase by creating a .env.local file in the client directory and adding the following variables:

```
REACT_APP_FIREBASE_API_KEY=
REACT_APP_FIREBASE_AUTH_DOMAIN=
REACT_APP_FIREBASE_PROJECT_ID=
REACT_APP_FIREBASE_STORAGE_BUCKET=a
REACT_APP_FIREBASE_MESSAGING_SENDER_ID=
REACT_APP_FIREBASE_APP_ID=

REACT_APP_BASE_URL=
REACT_APP_ROLE=
```
***Note: You will receive this configuration separately.***

### 2.4. Running the client application

To run the client application you must be on port 3001. Otherwise you will not have a connection to the server part.
```
npm start
```

## Unit testing

### 1. Backend testing
Navigate to the server directory (`../server`) in your terminal and install the following packages:

```
npm install mocha chai chai-http nock supertest --save-dev
```
When is complete go to (`../server/package.json`) and add or update this:
```
  "scripts": {
    "start": "node server",
    "test": "mocha './tests/*.test.js'"
  },
```
The test script is configured to run all the **unit tests** located in the tests directory with a - *.test.js extension.

### 1.1 Run the tests
To run backend tests enter following command:
```
npm test
```

## User Login Information
To login, use the following credentials:

- **Email:** matey@gmail.com
- **Password:** 123789
