# Sunrise and Sunset Finder Eval

This web app provides a way for a user to find the sunrise and sunset times by IP Address.  These times will be in the local time zone of the user, not the location of the IP Address.  There is also an "Auto Find" feature that will automatically find the users IP for them.  Once an IP Address is entered and the user selects "Go", the sunrise and sunrise times will be displayed.  In addition, the map will be zoomed with a pin marking the location determined by the IP Address.

For this evaluation, I decided to keep the UI clean and to the point.  The API's used provided a lot of additional information that I could have easily displayed, however I decided just because I could didn't mean I should.  The user comes here for the sunrise and sunset, so that's what they'll get.  I spent around 10 hours putting this project together from scratch.

### Setup and start ###
1. Requires [NodeJS](https://nodejs.org/en/) and [NPM](https://www.npmjs.com/).  It has been tested with NodeJS 16 and 18.
2. Run the command "npm ci" from the root directory that has the package.json.
3. Run the command "npm start" from the same directory.  This should launch a localhost:3000 and run the app.

## Development / Application Design

This Web App uses the following frameworks
- [TypeScript](https://www.typescriptlang.org/)
- [React](https://reactjs.org/)
- [Bootstrap](https://getbootstrap.com/)
- [Leaflet Map](https://leafletjs.com/)
- [i18Next](https://www.i18next.com/)
- [Jest](https://jestjs.io/)

This App is written in React 18 using functional components, and is styled in a responsive design with Bootstrap 5.  It is statically typed with TypeScript and uses React PropTypes for runtime type checking of function props.  The code has been linted with ESLint and formated with Prettier, according to best practices. The design of each component is to have a single logical purpose, and to be reusable.  The App will responsively work on any screen size.

### Internationalization

Using [i18Next](https://www.i18next.com/) the App is ready for internationalization.  All of the user facing text is stored in a translations file that can be swapped with any translation file to change the language.

### Unit Tests

Jest component tests can be run with the command (npm test).  There is a test file for each component with a basic render test.  These tests are not exhaustive. 

### External APIs

* https://geolocation-db.com
* https://ipbase.com/
* https://sunrise-sunset.org/api

### Future Thoughts

This App was designed with scalability in mind.  It would be easy to add new ways of inputting geographic data, either by form input or map selection.  New components and features can be easily added to the project without interfering with existing functionality.  Currently there is only one display (page) for this app, if scaled belong that I would implement React Router with a route for each.  The app has very little state and using Reacts Hook useState was perfect for the job (that's what I used).  If there was a need to store a large amount of state that needed to be accessed throughout the app, I would implement Redux.    

## Available Scripts

This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).

In the project directory, you can run:

### `npm start`

Runs the app in the development mode.\
Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

The page will reload if you make edits.\
You will also see any lint errors in the console.

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

**Note: this is a one-way operation. Once you `eject`, you can’t go back!**

If you aren’t satisfied with the build tool and configuration choices, you can `eject` at any time. This command will remove the single build dependency from your project.

Instead, it will copy all the configuration files and the transitive dependencies (webpack, Babel, ESLint, etc) right into your project so you have full control over them. All of the commands except `eject` will still work, but they will point to the copied scripts so you can tweak them. At this point you’re on your own.

You don’t have to ever use `eject`. The curated feature set is suitable for small and middle deployments, and you shouldn’t feel obligated to use this feature. However we understand that this tool wouldn’t be useful if you couldn’t customize it when you are ready for it.

## Learn More

You can learn more in the [Create React App documentation](https://facebook.github.io/create-react-app/docs/getting-started).

To learn React, check out the [React documentation](https://reactjs.org/).
