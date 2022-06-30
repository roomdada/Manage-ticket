const app = require('express')()
const parser = require('body-parser')
const session = require('express-session');


app.set('view engine', 'ejs')


app.use(parser.urlencoded({ extended: false }))
app.use(parser.json())
app.use(session({
  secret: 'jdjdj',
  resave: false,
  saveUninitialized: true,
  cookie: { secure: false }
}))

app.use(require('./middlewares/flash'));



app.get('/', (req, res) => {
  console.log(req.session)
  res.render('pages/index');
});

app.get('/about', (req, res) => {
  res.render('pages/about');
});

app.get('/contact', (req, res) => {
  res.render('pages/contact');
});

app.post('/', (req, res) => {
  if (req.body.full_name === '' || req.body.support === '' || req.body.description === '') {
    req.flash('error', 'Veuillez remplir tous les champs');
    res.redirect('/');
  } else {
    const Ticket = require('./models/ticket');
    Ticket.create(req.body.full_name, req.body.support, req.body.description, function () {
      req.flash('success', 'Votre ticket a été enregistré !');
      res.redirect('/');
    });
  }

  console.log('Pas de problème');
});


app.listen(3000);
