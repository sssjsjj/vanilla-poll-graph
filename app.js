const http = require('http');
const url = require('url');
const fs = require('fs');

const hostname = '127.0.0.1';
const port = 3000;

const server = http.createServer((req, res) => {
  const path = url.parse(req.url, true).pathname; // url에서 path 추출
  res.statusCode = 200;
  if (path.includes('.js')) {
    res.setHeader('Content-Type', 'text/javascript');
    fs.readFile(__dirname + path, (err, data) => {
      if (err) {
        return console.error(err);
      }
      res.end(data);
    });
  } else if (path === '/') {
    res.setHeader('Content-Type', 'text/html');
    fs.readFile(__dirname + '/index.html', (err, data) => {
      if (err) {
        return console.error(err);
      }
      res.end(data, 'utf-8');
    });
  } else {
    res.statusCode = 404; // 404 상태 코드
    res.end('주소가 없습니다');
  }
});

server.listen(port, hostname, () => {
  console.log(`Server running at http://${hostname}:${port}/`);
});