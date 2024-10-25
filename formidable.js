var http = require('http');
var formidable = require('formidable');
var fs = require('fs');

var app = http.createServer(function (req, res)
 {
  if (req.url == '/fileupload') {
    var form = new formidable.IncomingForm();
    form.parse(req, function (error, fields, files) 
    {
      if (error) {
        res.writeHead(500, { 'Content-Type': 'text/plain' });
        res.write('Error uploading file');
        res.end();
      } else {
        res.writeHead(200, { 'Content-Type': 'text/html' });
        res.write('File uploaded successfully');
        res.end();
      }
    });
  } else {
    res.writeHead(200, { 'Content-Type': 'text/html' });
    res.write(
      '<form action="fileupload" method="post" enctype="multipart/form-data">'
    );
    res.write('<input type="file" name="filetoupload"><br>');
    res.write('<input type="submit">');
    res.write('</form>');
    return res.end();
  }
});

app.listen(
  8000, function () 
{
  console.log('Server running at http://localhost:8000/');
});
