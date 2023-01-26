// env setting
const dotenv = require("dotenv");
dotenv.config({ path: "./.env" });
const keys = require("./config/dev");

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
  } catch (ex) {
    console.log(ex);
  }
};

// connect to database
init();

// start listening (and create a 'server' object representing our server)
const PORT = keys.PORT || 8080;
app.listen(PORT, () => console.log(`Mixing it up on port ${PORT}`));
