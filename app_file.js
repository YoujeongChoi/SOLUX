var express = require('express');
var bodyParser = require('body-parser');
var fs = require('fs');
var app = express();
app.locals.pretty = true;
app.use(bodyParser.urlencoded({extended:false}));

app.set('views', './views_file');
app.set('view engine', 'jade');
app.get('/topic/new', function(req, res){
    res.render('new');
})
app.get('/topic', function(req, res){
    // res.render('view', {topics:files});
    fs.readdir('data', function(err, files){
        if(err){
            console.log(err);
            res.status(500).send('Internal Server Error');
        }
    })
    res.render('view', {topics:files});
})
app.get('/topic/:id', function(req, res){
    var id = req.params.id;
    fs.readdir('dir', function(err, files){
        if(err){
            console.log(err);
            res.status(500).send('Internal Server Error');
        }
    })
    fs.readFile('data/' + id, 'utf8', function(err, data){
        if(err){
            console.log(err);
            res.status(500).send('Internal Server Error');
        }
        res.render('view', {topics:files, title:id, description:data})
    })
})
app.post('/topic', function(req, res){
    var title = req.body.title;
    var description = req.body.description;
    // fs.writeFileSync('data/');
    fs.writeFile('data/'+title, description, function(err){
        if(err){
            console.log(err);
            res.status(500).send('Internal Server Error');
        }
        res.render('view', {title:id});
    });
    
});
app.listen(3000, function(){
    console.log('Connected 3000 port!');
})