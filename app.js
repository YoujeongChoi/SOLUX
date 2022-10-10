var express = require('express');
var app = express();

app.use(express.static('public'))

app.get('/', (req, res) => {
    res.send('Hello home page');
});

app.get('/dynamic', (req, res)=> {
    var lis = '';
    for(var i=0; i<5; i++){
        lis = lis + '<li>coding</li>'
    }
    var time = Date();
    var output = `
    <!DOCTYPE html>
    <html lang="en">
    <head>
        <meta charset="UTF-8">
        <meta http-equiv="X-UA-Compatible" content="IE=edge">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>Document</title>
    </head>
    <body>
        Hello Dynamic!
        <ul>${lis}</ul>
        ${time}
    </body>
    </html>`
    res.send(output);
})

app.get('/route',(req, res) => {
    res.send('Hello Router, <img src="/route.jpg">');
})

app.get('/login', (req, res) => {
    res.send('login page');
});

app.listen(3000, ()=>{                      // 포트번호 지정
    console.log('Connected 3000 port!');
});       
