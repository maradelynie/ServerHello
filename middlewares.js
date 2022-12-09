const bodyParser = require('body-parser');
const express = require('express');
const cors = require('cors')
const morgan = require('morgan');
const logger = require('./logger');
const compression = require('compression');
const helmet = require('helmet')

const corsUrl = process.env.CORSURL;

module.exports = app => {
	app.set('port', 3008);
	app.set('json	spaces', 2);
	app.use(morgan('common', {
		stream: {
			write: (log) => logger.info(log)
		}
	}));
	app.use(helmet())
	app.use(cors())
	app.use(compression());
	app.use(bodyParser.json());
	app.use(app.auth.initialize());
	app.use((req, res, next) => {
		delete req.body.id;
		next();
	});
	app.use(express.static('public'));
};
