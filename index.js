const express = require('express')
const app = express()
const port = 3000
const mongoose = require('mongoose')
const bodyParser =  require('body-parser')
const config = require('./config/key');
const { User } = require('./models/User');

app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());

mongoose.connect(config.mongoURI, {
  useNewUrlParser: true, useUnifiedTopology: true, useCreateIndex: true, useFindAndModify: false
}).then(() => console.log('MongoDB Connected...'))
  .catch(err => console.log(err))

app.get('/', (req, res) => {
  res.send('Hello World!!!!!! :)')
})

app.post('/register', (req, res) => {
  const user = new User(req.body)
  user.save((err, data) => {
    if(err) return res.json({ success: false, err})
    return res.status(200).json({ success: true})
  })
})

app.post('/login', (req, res) => {
  // 요청된 이메일이 DB에 있는지 찾는다.

  // DB에 있다면 비밀번호가 맞는지 확인한다.

  // 비밀번호가 맞다면 토큰을 생성하기.

})

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`)
})