const url = require('url');
const http = require('http');
const path = require('path');
const fs = require('fs');
const LimitSizeStream = require('./LimitSizeStream');


const server = new http.Server();

server.on('request', (req, res) => {
  const url = new URL(req.url, `http://${req.headers.host}`);
  const pathname = url.pathname.slice(1);

  const filepath = path.join(__dirname, 'files', pathname);

  switch (req.method) {
    case 'POST':

      if (pathname.includes('/')) {
        res.statusCode = 400;
        res.end('not supported nesting path 400');
        break;
      }

      if (fs.existsSync(filepath)) {
        res.statusCode = 409;
        res.end('file already exists 409');
        break;
      }
      // fs.access(filepath, fs.constants.F_OK, (err) => {
      // использую existsSync так как
      // access ломал весь запуск кода этой домашки и домашки про DELETE. Почему так произошло?
      //   res.statusCode = 409;
      //   res.end('file already exists 409');
      //   break;
      // });


      const stream = fs.createWriteStream(filepath);
      const limitSizeStream = new LimitSizeStream({limit: 1048576});
      req.pipe(limitSizeStream).on('error', (err) => {
        fs.unlink(filepath, () => { });
        stream.destroy();
        res.statusCode = 413;
        res.end('статус код ответа сервера 413');
      }).pipe(stream).on('error', (err) => {
        stream.destroy();
        res.statusCode = 500;
        fs.unlink(filepath, () => { });
        res.end('some strange error 500');
      }).on('finish', () => {
        res.statusCode = 201;
        res.end('success file');
      });

      req.on('aborted', () => {
        fs.unlink(filepath, () => { });
        stream.destroy();
      });
      break;

    default:
      res.statusCode = 501;
      res.end('Not implemented');
  }
});

module.exports = server;
