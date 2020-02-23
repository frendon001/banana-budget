import { BananaBudget } from '../services/BananaBudget';
import { Express } from 'express';

export default (app: Express): void => {
  //Route to receive banana budget calculation request
  app.get('/api/bananaBudget', (req, res) => {
    const budget = new BananaBudget(req.query);
    //validate request and send response
    if (!budget.showHasValidParams()) {
      res.status(400).send(budget.showErrorMessage());
    } else {
      res.status(200).send({
        totalCost: budget.totalBananaExpenses(),
      });
    }
  });
};
