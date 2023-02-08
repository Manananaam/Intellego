### Steps to setup project

1. create a PostgreSQL Database with the name `intellego`
2. clone the project main branch to your local computer
3. add`.env` file to the root directory of the project foler
4. paste this content to the .env file

   ```jsx
   NODE_ENV= development
   PORT = 3015

   JWT_SECRET = test_jwt_secret_key
   JWT_EXPIRES = 30d
   ```

5. `npm install` to install packages
6. `npm run seed` to seed data to database
7. `npm run start:dev` to run the project.
8. in browser, go to url : `localhost:3015`
9. log in with existed account or signup with new account.
   ```jsx
   email: kara@email.com
   password: 123123
   ```
10. show submission form in this url : [localhost:3015/student/courses/114/assessments/105](http://localhost:3015/student/courses/114/assessments/105)
    - verify student ID with 100
