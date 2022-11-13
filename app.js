var express = require('express');
var app = express();
var fs = require('fs');
var bodyParser = require('body-parser')
app.use(bodyParser.urlencoded({extended: false}))
app.set('view engine', 'jade');
app.set('views', './views');
app.use(express.static('public'))

app.get('/topic/new', (req, res) => {
    res.render('new');
})

app.post('/topic', (req, res) => {
    var title = req.query.title;
    var description = req.query.description;
    fs.writeFile('./data/' + title, description, 'utf8', function(err) {
        res.redirect('/topic');
    });
});

app.get('/topic', (req,res) => {
    fs.readdir('data', function(err, files) {
        res.render('index', {topics:files});
    })
})

app.get('/topic/:title', function(req, res){
    fs.ReadStream('data', function(err, files) {
        fs.readFile('/data/' + req.params.title, function(err, data) {
            if(err){
                console.log(err);
                res.status(500).send('Internal Server Error');
            }
            res.render('index', {topics:files, title:req.params.title, description:data});
         });
    });
});

app.locals.pretty = true;

app.listen(3000, ()=>{                      // 포트번호 지정
    console.log('Connected 3000 port!');
});

///////////////////////



// app.get('/form', (req, res)=> {
//     res.render('form')
// })

// app.get('/form_receiver', (req, res) => {
//     var title = req.query.title;
//     var description = req.query.description;
//     res.send(title+','+description)
// })

// app.get(['/topic', '/topic/:id'], (req, res)=>{
//     var topics=[
//         'Javascript is ...',
//         'Nodejs is. ..',
//         'Express is ...'
//     ];
// })

// app.get('/topic:name', (req, res) => {
//     var topics=[
//         'Javascript is ...',
//         'Nodejs is. ..',
//         'Express is ...'
//     ];
//     var output = `
//     <a href="/topic?id=0">Javascript</a><br> 
//     <a href="/topic?id=1>Nodejs</a><br>
//     <a href="/topic?id=2">Express</a><br>
    
//     ${topics[req.params.name]}
//     `
//     res.send(output);
// })

// app.get('/template', (req, res) => {
//     res.render('temp', {time: Date(), _title:'Jade'});
// })



// app.get('form_receiver', (req, res) => {
    
//     var title = req.body.title;
//     var description = req.body.description;
//     res.send(title+','+description)
// })




// app.get('/topic/:id/:mode', (req,res)=> {
//     res.send(req.params.id+'/'+req.params.mode)
// })
// // ${topics[req.query.id]}
// app.get('/param/:module_id/:topic_id', (req,res) => {
//     res.json(req.params);
// })

// app.get('/', (req, res) => {
//     res.send('Hello home page');
// });

// app.get('/dynamic', (req, res)=> {
//     var lis = '';
//     for(var i=0; i<5; i++){
//         lis = lis + '<li>coding</li>'
//     }
//     var time = Date();
//     var output = `
//     <!DOCTYPE html>
//     <html lang="en">
//     <head>
//         <meta charset="UTF-8">
//         <meta http-equiv="X-UA-Compatible" content="IE=edge">
//         <meta name="viewport" content="width=device-width, initial-scale=1.0">
//         <title>Document</title>
//     </head>
//     <body>
//         Hello Dynamic!
//         <ul>${lis}</ul>
//         ${time}
//     </body>
//     </html>`
//     res.send(output);
// })

// app.get('/route',(req, res) => {
//     res.send('Hello Router, <img src="/route.jpg">');
// })

// app.get('/login', (req, res) => {
//     res.send('login page');
// });

  