const express = require('express');
const cors = require('cors');
const morgan = require('morgan');
const bodyParser = require('body-parser');

const app = express();

const routes = require('./routes');
const db = require('./database/init');

// db.initDb(true).then(_ => {});

app
  .use(cors())
  .use(morgan("dev"))
  .use(bodyParser.json());

app.use("/api", routes);

module.exports = app;

