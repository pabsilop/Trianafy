import 'dotenv/config';
import cors from 'cors';
import express from 'express';
import bodyParser from 'body-parser';
import morgan from 'morgan';
import morganBody from 'morgan-body';


import models from './models';
import routes from './routes';

const app = express();

app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended : true }));
app.use(morgan('dev'))
morganBody(app);

app.use('/users', routes.user);
app.use('/songs', routes.song);


app.listen(process.env.PORT, () =>
    console.log(
      `Aplicación de ejemplo escuchando en el puerto ${process.env.PORT}`
    )
  );