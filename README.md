## Steps to setup project

1.  update project name and description in `package.json`
2.  `npm install`
3.  Create two postgres databases

    - These commands will create both your **development** and **test** databases

      ```jsx
      createdb <YOUR APP NAME HERE FROM package.json>
      createdb <YOUR APP NAME HERE FROM package.json>-test
      ```

    - (`MY_APP_NAME` should match the `name` parameter in `package.json`):

4.  By default, running `npm test` will use your test database, while regular development uses the development database

## Commands

- `npm run seed` : sync and seed your database
- `npm run start:dev` : start this full-stack application
  - `start:dev` will both start your server and build your client side files using webpack
  - `start:dev:logger` is the same as start:dev, but you will see your SQL queries (can be helpful for debugging)
  - `start:dev:seed` will start your server and also seed your database (this is useful when you are making schema changes and you don't want to run your seed script separately)
- `npm install package-name`: install package that related to server
- `npm install -D package-name`: install package that not related to server, for instance, package that use for React.

### File structure

fileStructure.md includes more detail and instruction of this template
