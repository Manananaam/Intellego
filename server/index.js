// env setting
// const dotenv = require("dotenv");
// dotenv.config({ path: "./.env" });
const port = process.env.PORT || 8080;
const { db } = require("./db");
const app = require("./app");
const seed = require("../script/seed");

const init = async () => {
  try {
    if (process.env.SEED === "true") {
      await seed();
    } else {
      await db.sync();
    }
    app.listen(port, () => console.log(`Mixing it up on port ${port}`));
  } catch (ex) {
    console.log(ex);
  }
};

// connect to database
init();
