import * as bodyParser from 'body-parser';
import * as cors from 'cors';
import * as express from 'express';
import * as helmet from 'helmet';
import * as morgan from 'morgan';
import * as path from 'path';
import 'reflect-metadata';
import { createConnection } from 'typeorm';
import routes from './routes';

createConnection()
  .then(async (connection) => {
    // Create a new express application instance
    const app = express();

    // Call midlewares
    app.use('/static', express.static(path.join(__dirname, 'public')));
    app.use(morgan('tiny'));
    app.use(cors());
    app.use(helmet());
    app.use(bodyParser.json());

    //Set all routes from routes folder
    app.use('/', routes);

    app.listen(3001, () => {
      console.log('Server started on port 3001!');
    });
  })
  .catch((error) => console.log(error));
