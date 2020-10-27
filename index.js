const express = require('express')
const bodyParser = require('body-parser')
const mongoose = require('mongoose')
const cookieParser = require('cookie-parser')
const port = 5000
const config = require('./server/config/key');
const { User } = require('./server/models/User');
const { auth } = require('./server/middleware/auth');

const app = express()

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(cookieParser());

mongoose.connect(config.mongoURI, {
  useNewUrlParser: true, useUnifiedTopology: true, useCreateIndex: true, useFindAndModify: false
}).then(() => console.log('MongoDB Connected...'))
  .catch(err => console.log(err))

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`)
})

app.get('/', (req, res) => {
  res.send('Hello World!!!!!! :)')
})

app.post('/api/users/register', (req, res) => {
  const user = new User(req.body)
  user.save((err, data) => {
    if (err) return res.json({ success: false, err })
    return res.status(200).json({ success: true })
  })
})

app.post('/api/users/login', (req, res) => {

  // 요청된 이메일이 DB에 있는지 찾는다.
  User.findOne({ email: req.body.email }, (err, user) => {
    if (!user) {
      return res.json({
        loginSuccess: false,
        message: "아이디 또는 비밀번호가 잘못되었습니다."
      })
    }

    // DB에 있다면 비밀번호가 맞는지 확인한다.
    user.comparePassword(req.body.password, function (err, isMatch) {
      if (!isMatch) {
        return res.json({
          loginSuccess: false,
          message: "비밀번호가 잘못되었습니다."
        })
      }

      // 비밀번호가 맞다면 토큰을 생성한다.
      user.generateToken((err, user) => {
        if (err) return res.status(400).send(err);

        res.cookie("x_auth", user.token)
          .status(200)
          .json({
            loginSuccess: true,
            userId: user._id
          })
      })
    })
  })
})

app.get('/api/user/auth', auth, (req, res) => {
  res.status(200).json({
    _id: req.user._id,
    isAdmin: req.user.role === 0 ? false : true,
    isAuth: true,
    email: req.user.email,
    name: req.user.name,
    lastname: req.user.lastname,
    role: req.user.role,
    image: req.user.image
  })
})

app.get('/api/user/logout', auth, (req, res) => {
  User.findOneAndUpdate({ _id: req.user._id }, { token: "" }, (err, user) => {
    if (err) return res.json({ success: false, err })
    res.status(200).send({
      success: true
    })
  })
})