# _dev_api_
This is a single-page application using [Sophos Central APIs](https://developer.sophos.com/).

## Overview
(Name project - soon) is **SPA** (single page application). The goal of this thesis is to develop a web application that provides providers with a product to **monitor and manage** a group of endpoints (computers or servers). Provide an easy and simple to use **interface** for remote monitoring of computers. Provide an intuitive way to work with the application.


# ✨ Features
- Customers dashboard - general overview of all your customers with their number of machines and their respective alarms.

*All the Features described below are for a specific client and accordingly what rights we have the following information.*

- Enpoints table - display detailed information about the machines of a specific customer.
  - If you have **limited access**:
    - Additional function is display more information on a specific machine.
  - If you have **full access**:
    - Additional functions are to scan, update or display more information on a specific machine.
- Events table - this feature is available if you have **full access**. Visualizes what has happened on the machines in the last 24 hours. You have the feature to allow banned sites if there is no reason not to.
- Alerts table - while in events everything is shown, here the problems are reflected, they need to be addressed.
  - If you have **limited access**:
    - Only visualize.
  - If you have **full access**:
    - Visualize. An additional feature is Acknowledge.
- Websites - this feature is available if you have **full access**. Visualizes the sites we are allowed to access. We are allowed to add new ones or ban from the list.
- Management - allows to make backups of given policies from a corresponding list of policies.
  - If you have **limited access**:
    - Only access to backups.
  - If you have **full access**:
    - Access to backups, reset all policies to base and software downloader.
- If the user is **admin** - access to register client.
- Logout

## Resources
Here are some used for the project.

- [Sophos](https://developer.sophos.com/) - Open API.
- [React](https://react.dev/) - fronted.
- [react-bootstrap](https://react-bootstrap.github.io/)
- [firebase](https://firebase.google.com/) - database.
- [axios](https://axios-http.com/docs/intro) - request api.
- [Expres.js](https://expressjs.com/) - for server.

## How to setup project

- Clone project.
- This project have two folders - one client and one server.

## How to setup client application folder

In terminal (../client) install this packages:
- react
- axios
- react-bootstrap and bootstrap (for now)
- firebase
- react-secure-storage
- uuid
- react-router-dom

```
npm i package
```

For firebase setup create one ```.env.local.``` inside copy this
```
REACT_APP_FIREBASE_API_KEY=
REACT_APP_FIREBASE_AUTH_DOMAIN=
REACT_APP_FIREBASE_PROJECT_ID=
REACT_APP_FIREBASE_STORAGE_BUCKET=a
REACT_APP_FIREBASE_MESSAGING_SENDER_ID=
REACT_APP_FIREBASE_APP_ID=
```
I will give you this configuration.

To run the client application you must be on port 3001. Otherwise you will not have a connection to the server part.
```
npm start
```
## Server part

In terminal (../server) install this packages:
- cors
- axios
- express
- express-rate-limit
- express-validator
- helmet

For the server part of the code, it is used as a correspondence between the client application and the rest of the Internet.
To run this:
```
npm run start
```
