const http = require('http');


const server = http.createServer((req, res) => {
    const url = req.url;
    if (url === '/') {
        res.setHeader('Content-Type', 'text/html');
        res.write('<html>');
        res.write('<head><title>Prove 01</title></head>');
        res.write('<body><form action="/create-user" method="POST"><input type="text" name="username"><button type="submit">Send</button></form></body>');
        res.write('</html>');
        return res.end();  //No more res methods can be called now. If so, we would have to add return 
    }
    if (url === '/users') {
        res.setHeader('Content-Type', 'text/html');
        res.write('<html>');
        res.write('<head><title>Prove 01</title></head>');
        res.write('<body>');
        res.write('<ul>');
        res.write(`<li>Cookies</li><li>Ice Cream</li><li>Brownies</li>`);
        res.write('</ul>');
        res.write('<form action="/create-user" method="POST">');
        res.write('<input type="text" name="username">');
        res.write('<button type="submit">Submit</button>');
        res.write('</form');

        res.write('</body>');
        res.write('</html>');
        return res.end();
    }
    //Send HTML response with some "Page not found text"
    if (url === '/create-user') {
        const body = []; //Stores the chunks that are coming in 
        req.on('data', (chunk) => {
            body.push(chunk);
        });
        req.on('end', () => {
            const parsedBody = Buffer.concat(body).toString();
            console.log(parsedBody.split('=')[1]); //username=whatever-the-user-entered
        });
        res.statusCode = 302;
        res.setHeader('Location', '/');
    }
});


server.listen(3000);