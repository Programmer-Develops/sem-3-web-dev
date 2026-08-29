const http = require('http');

const server = http.createServer((request, response) => {
	console.log('Request received:', request.method, request.url);

	if (request.url === '/') {
		response.statusCode = 200;
		response.end('Welcome to Smart Utility Toolkit');
	} else if (request.url === '/about') {
		response.statusCode = 200;
		response.end('About page');
	} else if (request.url === '/contact') {
		response.statusCode = 200;
		response.end('Contact page');
	} else {
		response.statusCode = 404;
		response.end('404 Error: Route not found');
	}
});

server.listen(8080, () => {
	console.log('Server is running on port 8080.');
});
