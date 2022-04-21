var express = require('express');
var router = express.Router();

const credentials = {
  email: 'aviaryan77@gmail.com',
  password: '12345',
};
router.post('/login', function (req, res) {
  if (
    req.body.email.toLowerCase() === credentials.email &&
    req.body.password === credentials.password
  ) {
    req.session.user = req.body.email;
    res.redirect('/route/dashboard');
  } else {
    res.end('Invalid email or password');
  }
});

// route for dashboard
router.get('/dashboard', (req, res) => {
  if (req.session.user) {
    res.render('dashboard', { user: req.session.user });
  } else {
    res.send('Unauthorized user');
  }
});

router.get('/logout', function (req, res) {
  req.session.destroy((err) => {
    if (err) {
      console.log(err);
      res.send('Error');
    } else {
      res.render('base', {
        title: 'Express',
        logout: 'Logout Successfully...',
      });
    }
  });
});

module.exports = router;
