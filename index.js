// package imports
const ENV = require('dotenv');

ENV.config();
const hpp = require('hpp');
const path = require('path');
const cors = require('cors');
const helmet = require('helmet');
const morgan = require('morgan');
const express = require('express');
const EventEmitter = require('events');
const frameguard = require('frameguard');
const bodyParser = require('body-parser');
const compression = require('compression');

// routes imports
const ViewRoutes = require('./routes/default');
const GoogleReviewsRoute = require('./routes/reviews');

// local imports
const { limiter } = require('./middleware/requestRate');
const { errorHandler } = require('./helper/errorHandler');
const { responseHeader } = require('./middleware/setHeader');
const { corsOptionsDelegate } = require('./utils/acceptingHosts');
const { allowedMethods } = require('./utils/acceptingMethods');
const { checkContentType } = require('./utils/acceptingMedia');

const PORT = process.env.PORT || 8002;

const app = express();

app.set('trust proxy', true);
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));
app.use(express.static(path.join(__dirname, 'public')));

// to avoid memory leaks
const bus = new EventEmitter();
bus.setMaxListeners(50);

// dbconnection
require('./database/connection');

// middlewares
app.use(morgan('dev'));
// cors policy
app.use(cors(corsOptionsDelegate));
// prevents from http parameter pollution
// (query string are ignored || parameters are allowed)
app.use(hpp());
// compress all data from its original size to handle server load
app.use(compression());
// accept only get,post.patch requests

// parser for raw or json type data only and payload size limit is 500kb
app.use(
  bodyParser.json({
    limit: '200kb',
    verify: (req, res, buf) => {
      req.rawBody = buf;
    },
  })
);
app.use(bodyParser.urlencoded({ extended: false }));

// prevents browser caching sensitive pages(only for server-side-rendering)
app.use(responseHeader);

// prevents from clickjacking attack
app.use(frameguard({ action: 'deny' }));
// prevents from DDOS attack
app.use(limiter);
// prevents from xss,csrf and other normal attacks
app.use(helmet());
// allowed methods
app.use(allowedMethods);
// allowed media types
app.use(checkContentType);

app.use('/', ViewRoutes);

app.use('/api/v1/google', GoogleReviewsRoute);

app.use('*', (req, res) => {
  res.status(404).json({
    success: false,
    message: 'Not Found: Requested URL not found.',
  });
});

app.use(errorHandler);

// running server
app.listen(PORT, () => {
  console.log(`☘️  Server running on http://localhost:${PORT}`);
});
