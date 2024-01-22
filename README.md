# Clone_dev_api_sophos
This is a single-page application using [Sophos Central APIs](https://developer.sophos.com/).

Soon 

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
- react-hooks-global-state
- react-router-dom

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
