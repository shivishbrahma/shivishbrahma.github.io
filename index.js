const express = require('express');
const morgan = require('morgan');
const helmet = require('helmet');
const cors = require('cors');

require('dotenv').config();

const app = express();

// Middlewares
app.use(morgan('common'));
app.use(helmet());
app.use(cors({ origin: process.env.CORS_ORIGIN }));
app.use(express.json());

app.use('/api', require('./api'));

const port = process.env.SERVER_PORT || 1337;

app.listen(port, () => {
	console.log(`Listening at http://localhost:${port}`);
});
