# StoryBook Application Back-end API.

> A MERN CRUD Application API.
> The back-end api function for the story book application.
> MVC architecture is applied for the api building.

`npm run dev` command to start the application in development phase.

- The application mode is set in the _package.json_ for both production, start & test modes.
  <br />
- import the required dependencies & dev-dependencies from `npm install <package>`.
  <br />
- set up the required scripts for development & production modes.

---

- set up the server with application configuration, env config, template-engine, application listeners.
- setup a db in _./config/_ for the database configuration & connect it to the server.

- create views directory for template literals & organise directory layout.

- create routes directory for api routes & create routes for top-level routes [dashboard, login/landing] in **index.js**.

---

> use [materialize](https://materializecss.com/getting-started.html) to add design to the webpage.
> <br />
> use [font-awesome](https://cdnjs.com/libraries/font-awesome) to add stylish fonts to the webpages in api.

---

- create a public directory to hold all the static files for the application [css, imgs, icons] & configure it to the server file to recognize the static directory.
- Render the routes in /routes with corresponding **.hbs** files in _/views_.

---

- create a project for the application in google-cloud-console & enable api services for the application. add a redirect url to working localhost now & hosted homepage in future to enable google oauth services.
- ---> Copy the **client id & client secret** for enabling the google+ services

---

- create a _googleStrategy_ using passport js for 2 specified login routes for the api.
- create passport strategy using google strategy for success & error routes & re-directs.
- The passport configuration is created in _/config_ dir & imported to server.
- create passport middleware with **initialize & session** from passport[passport-session only works with express sessions initialized above]()

---

- a _/models_ directory to hold the db models using mongoose is created to store the models in passport strategy.
- A mongoose model with a schema to get the user info is created in _/models/User.js_

> In a typical web application, the credentials used to authenticate a user will only be transmitted during the login request. If authentication succeeds, a session will be established and maintained via a cookie set in the user's browser.
> Each subsequent request will not contain credentials, but rather the unique cookie that identifies the session. In order to support login sessions, Passport will serialize and deserialize user instances to and from the session.
