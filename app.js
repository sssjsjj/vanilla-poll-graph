const http = require('http'); // 서버 만드는 모듈
const url = require('url'); // 주소 분석 모듈
const fs = require('fs'); // 파일을 읽고 쓰는 모듈

const hostname = '127.0.0.1';
const port = 3000;
/*
localhost주소를 입력하면 서버에 '정보'를 달라고 '요청'한다.
대기중이던 서버는 '요청'을 처리 후 클라리언트로 '정보'를 돌려준다.
> 요청(request)와 정보(response)에는 header와 body가 있다.
	* header - request, response에 대한 정보(종류, 크기, 캐시) 등
	* body - 주고 받고자 하는 메인 정보
*/
const server = http.createServer((req, res) => { // 서버 만드는 메소드
  // url모듈을 이용해서 url에 따라 다른 HTML을 전송하는 라우팅을 구현
  const path = url.parse(req.url, true).pathname; 
  if (req.method === 'GET') { // GET 요청이면 
    if (path.includes('.js')) {
      res.writeHead (200, 'Content-Type', 'text/javascript');
      // readFile 메소드로 HTML 파일을 읽어서 읽은 데이터를 브라우저로 보낸다.
      fs.readFile(__dirname + path, (err, data) => {
        if (err) {
          return console.error(err);
        }
        res.end(data);
      });
    } else if (path === '/') {
      res.writeHead (200, 'Content-Type', 'text/html');
      // __dirname - 현재 프로젝트의 경로
      fs.readFile(__dirname + '/index.html', (err, data) => {
        if (err) {
          return console.error(err);
        }
        res.end(data, 'utf-8');
      });
    } else {
      res.writeHead(404, 'Content-Type', 'text/plain; charset=UTF-8');
      res.end('주소가 없습니다', 'utf-8');
    }
  }
});

server.listen(port, hostname, () => {
  console.log(`Server running at http://${hostname}:${port}/`);
});