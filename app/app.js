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

// Route 404
app.use((req, res) => {
  res.status(404).json({ message: "Route introuvable" });
});

module.exports = app;

