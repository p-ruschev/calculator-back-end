const express = require("express");
const routes = require("./routes");
const { initDatabase } = require("./config/database_config");
const { errorHandler } = require("./middlewares/errorHandler");
const app = express();
require('dotenv').config();
require("./config/express_config")(app);

const PORT = process.env.PORT || 5000;

app.use(routes);
app.use(errorHandler);

initDatabase()
  .then(() => {
    app.listen(PORT, () =>
      console.log(`Attempt for REST API running on: ${PORT}`)
    );
  })
  .catch((err) => {
    console.log("Can not connect to app", err);
  });
  
