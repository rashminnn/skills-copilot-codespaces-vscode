// Create web server 
var http = require('http');
var url = require('url');
var fs = require('fs');
var qs = require('querystring');
var path = require('path');

var server = http.createServer(function(req, res) {
    var url_parts = url.parse(req.url, true);
    var query = url_parts.query;
    var pathname = url_parts.pathname;
    var filename = path.join(process.cwd(), pathname);

    if (req.method == 'GET') {
        if (pathname == '/comments') {
            fs.readFile('comments.json', function(err, data) {
                if (err) {
                    res.writeHead(404, {
                        'Content-Type': 'text/plain'
                    });
                    res.end('Not Found');
                } else {
                    res.writeHead(200, {
                        'Content-Type': 'application/json'
                    });
                    res.end(data);
                }
            });
        } else {
            fs.exists(filename, function(exists) {
                if (!exists) {
                    res.writeHead(404, {
                        'Content-Type': 'text/plain'
                    });
                    res.end('Not Found');
                } else {
                    fs.createReadStream(filename).pipe(res);
                }
            });
        }
    } else if (req.method == 'POST') {
        if (pathname == '/comments') {
            var body = '';
            req.on('data', function(data) {
                body += data;
            });
            req.on('end', function() {
                var post = qs.parse(body);
                fs.readFile('comments.json', function(err, data) {
                    if (err) {
                        res.writeHead(404, {
                            'Content-Type': 'text/plain'
                        });
                        res.end('Not Found');
                    } else {
                        var comments = JSON.parse(data);
                        comments.push(post);
                        fs.writeFile('comments.json', JSON.stringify(comments), function(err) {
                            if (err) {
                                res.writeHead(500, {
                                    'Content-Type': 'text/plain'
                                });
                                res.end('Internal Server Error');
                            } else {
                                res.writeHead(201, {
                                    'Content-Type': 'text/plain'
                                });
                                res.end('Created');
                            }
                        });
                    }
                });
            });
        } else {
            res.writeHead(405, {
                'Content-Type': 'text/plain'
            });
            res.end('Method Not Allowed');
        }
    } else {
        res.writeHead(405, {
            'Content-Type':
// Require the 'http' module
var http = require('http');

// Create a server object
http.createServer(function (req, res) {
    // Set the response's content type
    res.writeHead(200, {'Content-Type': 'text/plain'});

    // Write the response's body
    res.end('Hello World\n');
}).listen(8080, '
