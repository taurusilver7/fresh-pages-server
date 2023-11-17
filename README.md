# Fresh Pages

> A Fully Server-Side Writing Platform

![fresh-pages](https://i.ibb.co/SxLMzBM/fresh-pages.png)

> A MERN CRUD Application API & Client.
> A fully server-side function for the story book application.
> MVC architecture in API building.

### Setup work environment.

Start the application in a local development server.

```bash
npm init -y
# and
npm run dev
```

-  The application modes are set in the _package.json_ for test, development & production modes.
   <br />
-  import the required dependencies & dev-dependencies with `npm install <package>` & `npm install <package> --save-dev`.
   <br />
-  set up the required scripts for development & production modes.

---

Set up the server with application configuration, env config, template-engine, application listeners.
Setup a db in _./config/_ for the database configuration & connect it to the server.
Create views directory for template literals & organise directory layout.
Create routes directory for api routes & create routes for top-level routes [dashboard, login/landing] in **index.js**.

---

-  Use [materialize](https://materializecss.com/getting-started.html) to add design to the webpage.
-  Use [font-awesome](https://cdnjs.com/libraries/font-awesome) to add stylish fonts to the webpages in api.

---

-  create a public directory to hold all the static files for the application [css, imgs, icons] & configure it to the server file to recognize the static directory.
-  Render the routes in /routes with corresponding **.hbs** files in _/views_.

---

### Authenticate Application

-  create a project for the application in google-cloud-console & enable api services for the application. add a redirect url to working localhost now & hosted homepage in future to enable google oauth services.
-  ---> Copy the **client id & client secret** for enabling the google+ services

---

-  create a _googleStrategy_ using passport js for 2 specified login routes for the api.
-  create passport strategy using google strategy for success & error routes & re-directs.
-  The passport configuration is created in _/config_ dir & imported to server.
-  create passport middleware with **initialize & session** from passport [passport-session only works with express sessions initialized above]

---

### Mongoose models

-  a _/models_ directory to hold the db models using mongoose is created to store the models in passport strategy.
-  A mongoose model with a schema to get the user info is created in _/models/User.js_

> In a typical web application, the credentials used to authenticate a user will only be transmitted during the login request. If authentication succeeds, a session will be established and maintained via a cookie set in the user's browser.
> Each subsequent request will not contain credentials, but rather the unique cookie that identifies the session. In order to support login sessions, Passport will serialize and deserialize user instances to and from the session.

-  The passport strategy allows the user to login with google+ authentication using passport-js
-  The login & logout routes are created in _/routes/auth.js_.
-  A partial view template to insert into other template (main.hbs) to get a navbar for logout button.
-  A script for the side navbar operation is created at **main.hbs**

---

-  to avoid a user/non-user/guest to redirect to other pages through url's, a middleware to authorize the user/guest priviliages is created in _/controller/auth.js_.
-  The user/ guest priviliges are tightly bound. But the user session expires with every refresh/ app changes. To avoid this, the session is stored in database with **mongo-connect** package
-  The package used for session storing is `connect-mongo@3` with `express-session`. The store location is the current mongoose.connection.

---

### Create Stories for the App

-  create a model for the story in the user dashboard.
-  In the index routes, for the dashboard, restrict the find to _user.id_ from the req & enable `lean()` to make the document returned from queries as plain js objects but not mongoose documents.

-  create a 404 error & 500 internal server error templates for error rendering in the dashboard route.
-  The dashboard table for stories is created in /dashboard.hbs
-  Add a stroy add button in partials & add it to the main template.
-  Create a _/stories_ dir in views to create different types of templates for creating, editing stories. Add their corresponding routes to the _/router_.
-  Link the stories route to the server. Add the script for status selection in **add.hbs** template to the **main.hbs**

---

-  For the textarea in the /stories/add route to be converted into `wysiwyg editor`, **ck editor** is imported as script.
-  more about wysiwyg editor is [here](https://froala.com/wysiwyg-editor/)
-  cdn for ck editor v4.16.0 is [here](https://cdnjs.com/libraries/ckeditor)

-  To post the data to database, a post req is created in /stories route with body-parsers enabled in server, for webpage rendering.
-  format the date in each story in the dashboard, using a helper to wrap around date to format it. Register the helper with handlebars in server to use it in templates
-  The moment format required (used) in app is 'MMMM Do YYYY, h:mm:ss a'

---

### Adding & Editing Stories

-  create a public stories end point to the api. create a template in _/stories/index.hb_s for the get route in _/routes/stories\_.
-  To refactor the webpage, some helpers to strip the p-tags, truncate the text are created.
-  Register the helper functions in server to use them in templates.

---

-  A helper function editIcon to intiate a story editing is created along with the template for the edit button.
-  create a route for editing & template for the edit web-page >> _/stories/edit.hbs_ & _/routes/stories_
-  The edit tempate is similar to add template with already values of the story ready to be edited >> `value="{{story.title}}"` >> `<textarea>{{story.body}}</textarea>`
-  To edit the story status in the database, they are wrapped in a select helper function >>
   `{{#select story.status}}` with their status as selectors.

-  the edit function is a PUT request, which simply cannot be added to form>method. The **method-override** package is imported to add a hidden input(desired method=PUT/PATCH/DEL) to the html form(default method=POST) as a middleware.
   `<input type="hidden" name="_method" value=""PUT">`

---

-  create a button that uses method-override to delete a story from the dashboard.
-  create a delete req in /routes/stories with method _model.remove()_

-  create a get request for single story & create a template for it. >> _/stories/show.hbs_
-  create a get request for user stories only & template used for web-page is _/stories/index.hbs_

# Deployment

Deploy the server application on [render](https://render.com) with custom parameters and settings.

Check the deployed [fresh-pages](http://fresh-pages.onrender.com/) here and create your own stories.
