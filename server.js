const http = require('http'); // 서버를 만드는 모듈 불러옴
const url = require('url'); // 주소를 분석하는 모듈입니다. 이 모듈을 사용해서 url에 따라 다른 HTML을 전송하는 라우팅을 구현하고 있습니다.
const fs = require('fs'); // 파일을 읽고 쓰는 모듈
http.createServer((request, response) => {// 서버 만드는 메소드
  const path = url.parse(request.url, true).pathname; // url에서 path 추출
  if (request.method === 'GET') { // GET 요청이면
    if (path === '/about') { // 주소가 /about이면
      response.writeHead(200, {'Content-Type':'text/html'}); // header 설정
      fs.readFile(__dirname + '/about.html', (err, data) => { // 파일 읽는 메소드
        if (err) {
          return console.error(err); // 에러 발생시 에러 기록하고 종료
        }
        response.end(data, 'utf-8'); // 브라우저로 전송
      });
    } else if (path === '/') { // 주소가 /이면
      response.writeHead(200, {'Content-Type':'text/html'});
      fs.readFile(__dirname + '/index.html', (err, data) => {
        if (err) {
          return console.error(err);
        }
        response.end(data, 'utf-8');
      });
    } else { // 매칭되는 주소가 없으면
      response.statusCode = 404; // 404 상태 코드
      response.end('주소가 없습니다');
    }
  }
}).listen(8000);