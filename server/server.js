// Dependencies //
import express from 'express';
import webpackDevMiddleware from 'webpack-dev-middleware';
import webpackHotMiddleware from 'webpack-hot-middleware';
import webpack from 'webpack';
import webpackConfig from '../webpack.config.js';
import mcache from 'memory-cache';
import bodyParser from 'body-parser';
import mongoose from 'mongoose';

// Reservation Controller //
import processRes from './controllers/processReservation';

// Apollo-Server //
import { graphqlExpress, graphiqlExpress } from 'apollo-server-express';
import { makeExecutableSchema } from 'graphql-tools';

// GraphQL Schema //
import typeDefs from './graphql/typeDefs.js';
import resolvers from './graphql/resolvers.js';

const schema = makeExecutableSchema({
  typeDefs,
  resolvers,
});

// Cache //
let cache = (duration) => {
  return (req, res, next) => {
    let key = '__express__' + req.originalUrl || req.url
    let cachedBody = mcache.get(key);

    if (cachedBody) {
      res.send(cachedBody)
      return
    } else {
      res.sendResponse = res.end
      res.end = (body) => {
        mcache.put(key, body, duration * 1000);
        res.sendResponse(body)
      }
      next();
    }
  }
}

// EXPRESS APP SETUP //
const app = express();

// Body Parser //
app.use(bodyParser.urlencoded({ extended: true }))
app.use(bodyParser.json())

// CORS //
app.use((req, res, next) => {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  next();
});

// Serve Static Assets //
app.use(express.static(__dirname + '/www'));

// Webpack //
const compiler = webpack(webpackConfig);

app.use(webpackDevMiddleware(compiler, {
  hot: true,
  filename: 'main.js',
  publicPath: '/',
  stats: {
    colors: true,
  },
  historyApiFallback: true,
}));
app.use(webpackHotMiddleware(compiler))

// ROUTES //

// GraphQL endpoint
app.use('/graphql', bodyParser.json(), graphqlExpress({ schema }));
// GraphiQL
app.use('/graphiql', graphiqlExpress({ endpointURL: '/graphql' }));
// GET /reservation/ID – Returns a single reservation with ID
app.get('/reservation/:ID', processRes.reservationById);
// POST /reservation – Creates a new reservation, assigns an ID to it, and returns that ID
app.post('/reservation', processRes.createReservation);
// GET /reservations – Returns all reservations
app.get('/reservations', processRes.searchReservations);

const server = app.listen(3000, function () {
  const port = server.address().port;
  console.log(`Server Running on Port: ${port}`);
});