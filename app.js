import express from 'express';
import dotenv from 'dotenv';
import bodyParser from 'body-parser';
import mongoose from 'mongoose'
import session from 'express-session';
import cors from 'cors'; 
const path = require('path');
var exphbs  = require('express-handlebars');
const app = express();
dotenv.config();

  app.engine('hbs', exphbs({
    extname:'.hbs'
  }));
  app.set('view engine', 'hbs');
  app.set('views',path.join(__dirname, 'views/'));
  app.use(bodyParser.json());
  app.use(cors())
  app.use(bodyParser.urlencoded({extended: true}));
  app.use(express.static(path.join(__dirname, 'app/public')));

  app.use(session({
    secret: 'This is a secret',
    cookie: {
      maxAge: 1000 * 60 * 60 * 24 * 7 // 1 week
    },
    resave: true,
    saveUninitialized: true
  }));

  //connect

  mongoose.connect(
    process.env.MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true
}).then(() => console.log('DB Connected'))

mongoose.connection.on('error', err => {
    console.log(`DB connection error: ${err.message}`)
});

const albumsRouter = require('./app/router/albums');
const categotyRouter = require('./app/router/categories')
const authRouter = require('./app/router/auth');
const adminRouter= require('./app/router/admin')

app.use(authRouter,adminRouter,categotyRouter,albumsRouter)
const port = process.env.PORT || 8000
app.listen(port,()=>{
    console.log(`Sever runing on port: ${port}`)
})