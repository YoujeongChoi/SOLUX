var express = require('express');
var app = express();

app.use(express.static('public'))

app.get('/', (req, res) => {
    res.send('Hello home page');
});

app.get('/route',(req, res) => {
    res.send('Hello, <img src=/routes.png');
})

app.get('/login', (req, res) => {
    res.send('login page');
});

app.listen(3000, ()=>{                      // 포트번호 지정
    console.log('Connected 3000 port!');
});       
