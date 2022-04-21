const express = require('express');
const app = express();
const path = require('path');
const session = require('express-session');
const router = require('./router');
const { v4: uuidv4 } = require('uuid');
app.use(
  express.urlencoded({
    extended: true,
  })
);
const PORT = process.env.PORT || 3000;
app.set('view engine', 'ejs');

// Load static assets
app.use('/static', express.static(path.join(__dirname, 'public')));
app.use('/assets', express.static(path.join(__dirname, 'public/assets')));

app.use(session({ secret: uuidv4(), resave: false, saveUninitialized: true }));

// home route
app.get('/', (req, res) => {
  res.render('base', { title: 'Loin System' });
});

app.use('/route', router);

app.listen(PORT, function () {
  console.log('listening on port' + PORT);
});
