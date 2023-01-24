# Updates to Boilermaker

# Friday, October 21st, 2022

### Dependencies

- bcrypt update to 5.1.0 from 5.0.0
- compression update to 1.7.4 from 1.7.3
- express update to 4.18.2 from 4.16.4
- morgan update to 1.10.0 from 1.9.1
- pg update to 8.8.0 from 8.5.1
- sequelize update to 6.25.3 from 6.3.5
- _remove_ history (no longer used with react-router-dom version 6)

### DevDependencies

- @babel/core update to 7.19.6 from 7.12.10
- _add_ @babel/preset-env at 7.19.4
- @babel/preset-react update to 7.18.6 from 7.12.10
- @babel/register update to 7.18.9 from 7.12.10
- _add_ @reduxjs/toolkit
- axios update to 1.1.3 from 0.21.1
- axios-mock-adapter update to 1.21.2 from 1.16.0
- babel-loader update to 8.2.5 from 8.2.2
- chai update to 4.3.6 from 4.2.0
- mocha update to 10.1.0 from 6.2.3
- nodemon update to 2.0.20 from 1.19.4
- react update to 18.2.0 from 16.8.6
- react-dom update to 18.2.0 from 16.8.6
- react-redux update to 8.0.4 from 7.0.1
- react-router-dom update to 6.4.2 from 5.0.0
- react-test-renderer update to 18.2.0 from 16.4.2
- _remove_ react-test-renderer (unused)
- _remove_ redux (included in @reduxjs/toolkit)
- _remove_ redux-devtools-extention (included in @reduxjs/toolkit)
- _remove_ redux-mock-store (unused)
- _remove_ redux-thunk (included in @reduxjs/toolkit)
- supertest update to 6.3.0 from 4.0.2
- webpack update to 5.74.0 from 5.15.0
- webpack-cli update to 4.10.0 from 4.3.1
- _remove_ enzyme (deprecated)
- _remove_ enzyme-adapter-react-16 (deprecated)

### Refactor

- update client file structure to adhere to Redux Toolkit best practices
- update store abd components for compatibility with Redux Toolkit
- update React initialization approach to use createRoot for compatibility with React version 18
- update components and store for compatiblity with React Router version 6
- update webpack.config.js to follow best practices & include babel/preset-env
- remove .babelrc (babel configuration now in webpack.config.js)
- remove Redux & Redux testing until full testing tech stack change can be prioritized (enzyme deprecated, RTK requires different testing approach)

## Monday, December 28th, 2020

- removed sockets from boilermaker
- removed travis.yml and travis.cli related content from boilermaker
- pg update from 7.9.0 to 8.5.1 (node 14 capable)

## Tuesday, April 9th, 2019

### Dependencies

- axios update to 0.18.0 from 0.15.3
- connect-session-sequelize update to 6.0.0 from 4.1.0
- history update to 4.9.0 from 4.6.3
- morgan update to 1.9.1 from 1.8.1
- passport update to 0.4.0 from 0.3.2
- passport-google-oauth update to 2.0.0 from 1.0.0
- pg update to 7.9.0 from 6.1.2
- prop-types update to 15.7.2 from 15.6.2
- **react-redux update to 5.0.7 from 5.0.2**
  - There are some known issues with this and other react packages; will update after some testing
- react-router-dom update to 5.0.0 from 4.3.1
- redux update to 4.0.1 from 3.6.0
- redux-logger update to 3.0.6 from 2.8.1
- sequelize update to 5.2.15 from 4.38.0
- socket.io update to 2.2.0 from 2.1.0

### DevDependencies

- axios-mock-adatper update to 1.16.0 from 1.15.0
- babel-eslint update to 10.0.1 from 8.2.6
- chai update to 4.2.0 from 3.5.0
- enzyme update to 3.9.0 from 3.0.0
- enzyme-adapter-react-16 update to 1.12.1 from 1.0.0
- eslint update to 5.16.0 from 4.19.1
- eslint-config-fullstack update to 6.0.0 from 5.1.0
- eslint-config-prettier update to 4.1.0 from 2.9.0
- husky update to 1.3.1 from 0.14.3
- lint-staged update to 8.1.5 from 7.2.0
- mocha update to 6.1.2 from 5.2.0
- supertest update to 4.0.2 from 3.1.0
- @babel/core update to 7.4.3 from 7.0.0-beta.55
- @babel/plugin-proposal-class-properties update to 7.4.0 from 7.0.0-beta.54
- @babel/plugin-proposal-decorators update to 7.4.0 from 7.0.0-beta.54
- @babel/plugin-proposal-export-namespace-from update to 7.2.0 from 7.0.0-beta.54
- @babel/plugin-proposal-function-sent update to 7.2.0 from 7.0.0-beta.54
- @babel/plugin-proposal-numeric-separator update to 7.2.0 from 7.0.0-beta.54
- @babel/plugin-proposal-throw-expressions update to 7.2.0 from 7.0.0-beta.54
- @babel/plugin-syntax-dynamic-import update to 7.2.0 from 7.0.0-beta.54
- @babel/plugin-syntax-import-meta update to 7.2.0 from 7.0.0-beta.54
- @babel/polyfill update to 7.4.3 from 7.0.0-beta.55
- @babel/preset-env update to 7.4.3 from 7.0.0-beta.55
- @babel/preset-react update to 7.0.0 from 7.0.0-beta.55
- @babel/register update to 7.4.0 from 7.0.0-beta.55
- babel-loader update to 8.0.5 from 8.0.0-beta.4

`npm i enzyme` to fix lodash dependency: [Prototype Polution](https://www.npmjs.com/advisories/782)

## Wednesday, April 10th, 2019

### Dependencies

- react-redux update to 7.0.1 from 5.0.7
  - Found out that as long as react- is 16.4+, the updates should be fine
- react update to 16.8.6 from 16.4.2
- react-dom update to 16.8.6 from 16.4.2

## Thursday, April 11th, 2019

### Dependencies

- sequelize update to 5.3.1 from 5.2.15
