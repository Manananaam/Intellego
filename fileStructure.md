## Overall of file structure

- server folder
- client folder
- public folder index.html and bundle.js
- script folder includes seed script
- .env
- .eslintrc.json
- package.json
- .gitignore

## 1. server

- index.js
- app.js
- config folder
- routers folder
- controllers folder
- db folder
- utils folder

---

1. `index.js`
   - set up environment variable
   - init connection between the database and server
   - start server
2. `app.js`
   - add middlewares
   - add router
3. config folder has files related to the environment variable
4. routers folder
   - `index.js` which defines the specific URL for each router.
   - `templateRouter.js` which is an example to show how to define different endpoints.
     - name of file: `xxxRouter.js`
5. controllers folder
   - `errorController.js` where handle error case
   - `templateController.js`
     - name of file: `xxxController.js`
     - has 3 type of function as example to show how to define middleware function
       - `testTemplate` implement how to send response
       - `testError` implement how to manually throw error
         1. require `appError.js` file
         2. manually throw error: `throw new AppError(errorMessage, statusCode);`
       - fetchTemplateData implement how to write async function
         - use `asyncHandler()` to wrap `(req,res,next)⇒{}` to replace `try/catch` block
6. db folder
   - `index.js`
     - define associations
     - export models
   - `db.js`
     - create database
   - models folder where define models
     - name of file: `xxxModel.js`
   - data folder includes data that will be seeded to the database.
     - name of file: `xxxs.js`
7. utils folder which include utilities function
   - `appError.js`
     - customize error object for developing application

### Client

- index.js
- app folder

---

1. index.js
   - Render react component
   - Connect redux to react
   - Add BrowserRouter to react
2. app folder
   - components folder includes single small component
   - screens folder includes the combination of components
     - name of file: `xxxScreen.js`
   - stores folder includes
     - index.js
       - define store of redux
       - export functions from slices
     - slices folder includes slices
       - name of file: `xxxSlice.js`
       - the initial state of slice should be defined as `{}` empty object
