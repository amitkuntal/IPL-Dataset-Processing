/* eslint-disable quotes */
/* eslint-disable linebreak-style */
const http = require('http');
const fs = require('fs');
const url = require('url');

http.createServer( function(request, response) {
  let pathname = url.parse(request.url).pathname;
  console.log('Request Url:-'+request.url);
  console.log('Request for ' + pathname + ' received.');
  
  if (pathname=='/') {
    pathname+="../client/index.html";
  } else {
    pathname='/../client'+pathname;
  }

  let path= pathname.split('.');
  if (path.includes('json')) {
    path=path[2].split('/');
    pathname = "/../output/"+path[(path.length)-1]+".json";
  }
  fs.readFile(pathname.substr(1), function(err, data) {
    if (err) {
      console.log(err);
      response.writeHead(404, {'Content-Type': 'text/html'});
      response.write("<h1>Not Found</h1>")
    } 
    else {
      const path= pathname.split('.');
      let cType;
      if (path.includes('css')) {
        cType='text/css';
      } else if (path.includes('js')) {
        cType='text/javascript';
      } else {
        cType='text/html';
      }
      response.writeHead(200, {'Content-Type': cType});

      response.write(data);
    }
    response.end();
  });
}).listen(8081);
console.log('Server running at http://127.0.0.1:8081/');
