const express = require('express')
const exhbs = require('express-handlebars')
const flash = require('connect-flash')
const session = require('express-session')
const Users = require('./models/users')
const app = express()

app.engine('hbs', exhbs.engine({defaultLayout: 'main', extname: '.hbs'}))
app.set('view engine', 'hbs')
app.use(express.urlencoded({ extended: true }))

app.use(session({
  secret: 'asfasfasfhh',
  resave: false,
  saveUninitialized: true
}))
app.use(flash())
app.use((req, res, next) => {
  res.locals.success_msg = req.flash('success_msg')
  res.locals.warning_msg = req.flash('warning_msg')
  next()
})

app.get('/', (req, res) => {
  res.render('login')
})

app.get('/welcome', (req, res) => {
  res.render('success')
})

app.post('/login', (req, res) => {
  const { email, password } = req.body
  const user = Users.find(user => user.email === email)
  if(!user) {
    req.flash('warning_msg', 'Email not register')
    res.redirect('back')
    return
  }
  if(password !== user.password) {
    req.flash('warning_msg', 'Password incorrect')
    res.redirect('back')
    return
  }
  res.redirect('/welcome')
})



app.listen(3000, () => {
  console.log('App running')
})