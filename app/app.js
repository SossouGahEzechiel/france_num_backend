const express = require('express');
const cors = require('cors');
const morgan = require('morgan');
const bodyParser = require('body-parser');
const authMiddleware = require('./middlewares/AuthenticatedUserMiddleware');

const app = express();

const routes = require('./routes');

app
  .use(cors())
  .use(morgan("dev"))
  .use(bodyParser.json())
  .use(authMiddleware);

app.use("/api", routes);

module.exports = app;

