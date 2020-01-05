import express from 'express';
import bodyParser from 'body-parser';

const app = express();

app.use(bodyParser.json());

app.use((_req, res, next) => {
  res.header('Access-Control-Allow-Origin', '*');
  res.header(
    'Access-Control-Allow-Headers',
    'Origin, X-Requested-With, Content-Type, Accept',
  );
  next();
});

require('./routes/expenses')(app);

if (process.env.NODE_ENV === 'production') {
  // Serve production assets
  app.use(express.static('client/build'));

  const path = require('path');
  app.get('*', (_req, res) => {
    res.sendFile(path.resolve(__dirname, 'client', 'build', 'index.html'));
  });
}

const PORT = process.env.PORT || 3030;
app.listen(PORT);

//for testing
module.exports = app;
