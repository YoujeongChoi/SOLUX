const http = require('http');
const fs = require('fs').promises;

http.createServer(async(req, res) => {
    try{
        const data = await fs.readFile('./createServer.html');
        res.writeHead(20, {'Content-Type': 'text/html; charset=utf-8'});
        res.write(data);    // 버퍼 전송   
    } catch (err) {
        console.error(err);
        res.writeHead(500, {'Content-Type': 'text/plain; charset=utf8'});
        res.end(err.message);
    }
    
})
.listen(8081, () => {
    console.log('8081번 포트에서 서버 대기중');
});