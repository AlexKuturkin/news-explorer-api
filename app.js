const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const cors = require('cors');
const { errors } = require('celebrate');
const helmet = require('helmet');
const { requestLogger, errorLogger } = require('./middlewares/logger');
const errorMiddleware = require('./middlewares/error');
const routerApp = require('./routes/index');
const { limitedRequest } = require('./middlewares/limit');
const { PORT, MONGO_LINK } = require('./config');

const app = express();

mongoose
  .connect(MONGO_LINK, {
    useNewUrlParser: true,
    useCreateIndex: true,
    useFindAndModify: false,
    useUnifiedTopology: true,
  })
  .then(() => {
    console.log('Подключение к Mongo прошло успешно');
  })
  .catch(() => {
    console.log('Ошибка подключения к Mongo');
  });

app.use(helmet());
app.use(limitedRequest);
app.use(cors({
  origin: ['http://localhost:8080', 'http://localhost:8080/', 'http://localhost:8080/index.html', 'https://alexkuturkin.github.io'],
  optionsSuccessStatus: 200,
  credentials: true
}));
app.use(cookieParser());

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use(requestLogger);


app.use(routerApp);

app.use(errorLogger);
app.use(errors());
app.use(errorMiddleware);

app.listen(PORT, () => {
  console.log('Server is listening on port:', PORT);
});
