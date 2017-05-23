var http = require('http'),
port = 8080,
server = http.createServer(),
state = 10;


server.listen(port, function (error) {
    if (error) {
        console.log(error);
    } else {
        console.log('api listening on port', port);
    }
});

server.on('request', function (request, response) {
    let mainHtml;  
    let htmlContent = (state) => {      
    return`
    <html>
    <head>
    </head>
    <body>
    <h1>${state}</h1>
    </body>
    </html>`;}
    
    console.log('New http request received', request.url);

    if (request.url === '/state') {
        mainHtml = htmlContent(state);
        console.log('original state is ' + state);
        
    } else if (request.url === '/add') {
        state++;
        mainHtml = htmlContent(state);
        console.log('plus one state ' + state);

    } else if (request.url === '/remove') {
        state--;
        mainHtml = htmlContent(state);
        console.log('minus one state ' + state);

    } else if (request.url === '/reset') {
        state = 10;
        mainHtml = htmlContent(state);
        console.log('reset state ' + state); 
     
    } else { 
      mainHtml = `
    <html>
    <head>
    </head>
    <body>
    <h1>canot find page</h1>
    </body>
    </html>`;
    console.log('canot find page');   
    } 
    
    
    response.setHeader('content-type', 'text/html');
    response.write(mainHtml);   
    response.end();
    
});
