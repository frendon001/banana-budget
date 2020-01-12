import express from 'express';
import bodyParser from 'body-parser';
import path from 'path';
import expenses from './routes/expenses';

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

expenses(app);

if (process.env.NODE_ENV === 'production') {
  // Serve production assets
  app.use(express.static('client/build'));

  app.get('*', (_req, res) => {
    res.sendFile(path.resolve(__dirname, 'client', 'build', 'index.html'));
  });
}

const PORT = process.env.PORT || 3030;
app.listen(PORT);

//for testing
module.exports = app;
