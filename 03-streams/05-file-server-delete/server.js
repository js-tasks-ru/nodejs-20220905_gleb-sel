const url = require('url');
const http = require('http');
const path = require('path');
const fs = require('fs');


const server = new http.Server();

server.on('request', (req, res) => {
  const url = new URL(req.url, `http://${req.headers.host}`);
  const pathname = url.pathname.slice(1);

  const filepath = path.join(__dirname, 'files', pathname);

  switch (req.method) {
    case 'DELETE':
      fs.unlink(filepath, (err) => {
        if (err) {
          fs.access(`${filepath}`, fs.constants.F_OK, (err) => {
            if (pathname.includes('/')) {
              res.statusCode = 400;
              res.end('not supported nesting path 400');
            } else if (err) {
              res.statusCode = 404;
              res.end('file not found 404');
            } else {
              res.statusCode = 500;
              res.end('some strange error 500');
            }
          });
        } else {
          res.statusCode = 200;
          res.end('file was deleted 500');
        }
      });

      req.on('aborted', () => {
        stream.destroy();
      });

      break;

    default:
      res.statusCode = 501;
      res.end('Not implemented');
  }
});

module.exports = server;
