var http = require('http');


var port = 8080;


var server = http.createServer();


// Start the HTTP server, start listening for requests

server.listen(port, function(error) {

  if (error) {

    console.log(error);

  } else {

    console.log('api listening on port', port);

  }

});



// Create a event handler for "request"

// this is an alternative way
 let state = 10 ;
server.on('request', function(request, response) {

  console.log('New http request received', request.url);
    
 
    
    
  if ( request.url === '/state') { 
      
      response.end(state.toString());
  
      
      
  }   
    
  else if  ( request.url === '/add' ) {
         
     state++;
       
    response.end(state.toString());
        
          
          
  }
   
   else if  ( request.url === '/remove' ) {
         
     state--;
       
             
    response.end(state.toString());
          
          
  }    
    else if  ( request.url === '/reset' ) {
         
     state = 10;
       
             
    response.end(state.toString());
          
          
  }   
    else {
     var error1 = '404 page not found';
        response.end(error1);
  }
      


});