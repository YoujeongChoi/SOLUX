const express = require('express');
const app = express();

const bodyParser = require('body-parser');
const { Template } = require('ejs');
app.use(express.urlencoded({extended: true})) ;

var db;
const MongoClient = require('mongodb').MongoClient;

app.set('view engine', 'ejs');

app.use('/public', express.static('public'));

var userInfo;

MongoClient.connect('mongodb+srv://admin:qwer1234@cluster0.1fsubgu.mongodb.net/?retryWrites=true&w=majority', (error, client) => {
    if(error) {return console.log(error)};

    db = client.db('todoapp');

    // db.collection('post').insertOne({이름: 'John', 나이 : 20, _id : 100}, (error, result) => {
    //     console.log('저장완료');
    // } );


    // nodejs 서버띄우는 코드
    app.listen(8080, () => {
        console.log('listening on 8080');
    });
})

// GET 요청
// app.get('/pet', (req, res) => {
//     res.send('펫용품을 쇼핑할 수 있는 페이지입니다.');
// });

// app.get('/beauty', (req, res) => {
//     res.send('뷰티용품을 쇼핑할 수 있는 페이지입니다.');
// });


// app.get('/test', (req, res)=> {
//     res.status(200).json( {
//         "message" : "test"
//     })
// })

app.get('/', (req, res) => {
    // res.sendFile(__dirname + '/index.html');
    res.render('index.ejs');
});

app.get('/write', (req, res) => {
    res.render('write.ejs');
});

app.get('/list', (req, res) => {
    // db에 저장된 데이터 꺼내오기 (post라는 collection안에 있는 모든 데이터)
    db.collection('post').find().toArray((error, result) => {
        console.log(result);
        res.render('list.ejs', {posts : result});
    });

});

app.get('/detail/:id', (req, res) => {
    

    db.collection('post').findOne({_id: parseInt(req.params.id)}, (error, result) => {
        console.log(result);
        res.render('detail.ejs', {data : result});

        if (error) {return res.send('에러발생함')};
    });
});

app.get('/chat', 로그인했니, function(요청, 응답){ 

    db.collection('chatroom').find({ member : 요청.user._id }).toArray().then((결과)=>{
      console.log(결과);
      응답.render('chat.ejs', {data : 결과})
    })
  
  }); 


app.put('/change', (req, res) => {

    req.body._id = parseInt(req.body._id);
    var title = req.body.title;
    var date = req.body.date;

    console.log("확ㅇ!!!!!1", title, date);

    db.collection('post').findOne({_id : req.body._id}, (error, result) => {

        db.collection('post').updateOne({_id: parseInt(req.body._id)}, {$set : {제목 : title, 날짜: date}, }, (error, result) => {
            console.log('수정완료');
            // console.log(title, date);
            res.status(200).send({message : '성공했습니다'});   // 서버쪽 cmd에
            // res.status(400).send({message : '실패했습니다'});
        })
    })

    
});

// app.post('/add', (req, res) => {
//     res.send('전송 완료');
//     console.log(req.body.email_input);
// });

// 어떤 사람이 /add 라는 경로로 post요청을 하면, 데이터 2개(날짜, 제목)를 보내주는데,
// 이때 post 라는 이름을 가진 콜렉션에 두개 데이터 저장하기
// {제목 : '어쩌구', 날짜 : '어쩌구'}


    



const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;
const session = require('express-session');

// 미들웨어
app.use(session({secret : '비밀코드', resave : true, saveUninitialized: false}));
app.use(passport.initialize());
app.use(passport.session());

app.get('/login', (req, res) => {
    res.render('login.ejs');
});

app.post('/login', passport.authenticate('local', {
    failureRedirect : '/fail'
}), (req, res) => {
    
    res.redirect('/');
    response = {
       id : req.query.id,
       pw : req.query.pw
    }
    console.log("로그인!!!!!!!!!!11", req.query);
    res.end(response);
});

app.get('/fail', (req, res) => {
    res.send('로그인 실패');
    // res.redirect('/login');
});

// 인증하는 방법을 Strategy라고 칭함
passport.use(new LocalStrategy({
    usernameField: 'id',
    passwordField: 'pw',
    session: true,  // 로그인 후 세션 저장할것인지
    passReqToCallback: false,   // 아이디비번 말고도 다른정보 검증시
  }, function (입력한아이디, 입력한비번, done) {
    //console.log(입력한아이디, 입력한비번);
    db.collection('login').findOne({ id: 입력한아이디 }, function (에러, 결과) {
      if (에러) return done(에러)
  
      if (!결과) return done(null, false, { message: '존재하지않는 아이디요' })
      if (입력한비번 == 결과.pw) {
        return done(null, 결과)
      } else {
        return done(null, false, { message: '비번틀렸어요' })
      }
    })
  }));

  
  app.post('/chatroom', 로그인했니, function(req, res){

    var 저장할거 = {
      title : '무슨무슨채팅방',
      member : [ObjectId(req.body.당한사람id), req.user._id],
      // 현재 날짜 저장됨
      date : new Date()
    }
  
    db.collection('chatroom').insertOne(저장할거).then(function(result){
      응답.send('저장완료')
    });
  });


// 세선만들기
// 세션을 저장시키는 코드 - 로그인 성공시 발동
passport.serializeUser(function(user, done) {
    done(null, user.id)
});

// 이 세션 데이터를 가진 사람을 db에서 찾아주세요 - 마이페이지 접속시 발동
passport.deserializeUser(function(아이디, done) {
    db.collection("login").findOne({id : 아이디}, (error, result) => {
        done(null, {result});
    })
    
});

app.post('/register', (req, res) => {
    db.collection('login').insertOne({id : req.body.id, pw : req.body.pw}, (error, result) => {
        res.redirect('/');
    })
})

// 마이페이지 접속하면 일단 미들웨어 실행시키고 응담
app.get('/mypage',로그인했니, (req, res) => {
    // deserialize되어 나온 사용자 정보
    console.log(req.user);
    res.render('mypage.ejs', {data : req.user});
})

// 미들웨어 만들기
function 로그인했니(req, res, next) {
    // req.user가 있으면(로그인 후 세션이있으면) next() 통과
    if (req.user) {
        next()
    } 
    else { 
      응답.send('로그인안하셨는데요?') 
    } 
  } 

//   app.get('/search', (req, res)=>{
//     console.log(req.query);
//     db.collection('post').find({제목 : req.query.value}).toArray((errpr, result)=>{
//         console.log(result)
//       })
//   })

  app.get('/search', (요청, 응답)=>{

    var 검색조건 = [
      {
        $search: {
          index: 'titleSearchIndex',
          text: {
            query: 요청.query.value,
            path: ['제목', '날짜']  // 제목날짜 둘다 찾고 싶으면 ['제목', '날짜']
          }
        }
      }, 
      {$sort : {_id : 1}},
      {$limit : 10},
      // 검색결과에서 필터주기
      // 1 - 가져옴, 0 - 안가져옴
      // 검색어 score - 얼마나 관련있는지? 점수높을수록 관련도높음
      {$project : {제목 : 1 , 날짜 : 1,  _id : 1, score: {$meta: "searchScore"} }}
    ] 
    // console.log(요청.query);
    db.collection('post').aggregate(검색조건).toArray((에러, 결과)=>{
      console.log("result!!!!!!!!!", 결과)
      응답.render('result.ejs', {data : 결과})
    });
  });


  app.post('/add', (req, res) => {
    
    // res.send('전송 완료');
    console.log(req.body.email_input, req.body.pw_input);
    var title = req.body.email_input;
    var date = req.body.pw_input;
    
    db.collection('counter').findOne({name : '게시물갯수'}, (error, result) => {
        
        console.log('게시물 갯수 : ', result);
        console.log('user는?', user);
        var totalPost = result.totalPost;
        var 저장할거 = {_id : totalPost + 1, 제목: title, 날짜 : date, 작성자id : req.user.result._id, 작성자이름: req.user.result.id}

        db.collection('post').insertOne((저장할거), (error, result) => {
            // console.log('저장 완료');
            console.log('저장된 값은: ', title, date);

            // db데이터 수정할때 - updateOne updateMany
            db.collection('counter').updateOne({name : '게시물갯수'}, {$inc : {totalPost : 1}}, (error, result) => {
                if (error) {return console.log(error)};
                res.redirect('/list');
            });
            
            
        });
        
    }); 
});

app.delete('/delete', (req, res) => {
    // 요청시 함께 보낸 데이터 찾으려면
    console.log('삭제요청: ', req.body);
    req.body._id = parseInt(req.body._id);

    var 삭제데이터 = { _id : req.body._id, 작성자 : req.user.result._id}

    // 요청.body에 담긴 게시물 번호에따라 db에서 게시물 삭제
    db.collection('post').deleteOne(삭제데이터, (error, result) => {
        console.log('삭제완료');
        if (error) {console.log(error)};
        res.status(200).send({message : '성공했습니다'});   // 서버쪽 cmd에
        // res.status(400).send({message : '실패했습니다'});
       
    })
    
});






app.get('/edit/:id', (req, res) => {

    var t;
    var r = String(req.user.result._id);

    db.collection('post').findOne({_id: parseInt(req.params.id)}, (error, result) => {
        t =  String(result.작성자id);
        if (t === r) {
            
            db.collection('post').findOne( {_id : parseInt(req.params.id)} , (error, result) => {
                console.log("확인!!!", result);
                
                if (error) {return res.send('에러발생함')};
        
                res.render('edit.ejs', {data : result});
                
            });
        } else {
            res.send('본인이 작성한 게시글만 수정가능합니다.') ;
        }
    });

    
});


// app.use는 미들웨어 사용할때 (전역미들웨어- 모든 요청과 응답사이 실행)
app.use('/shop', require('./routes/shop.js'));
// /shop으로 접속하면 shop.js이용해서 라우팅