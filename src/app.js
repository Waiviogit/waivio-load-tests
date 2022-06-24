const http = require('http');

const host = process.env.HOST || 'localhost';
const port = process.env.PORT || 8000;

require('./jobs');

const server = http.createServer();
server.listen(port, host, () => {
  console.log(`Server is running on http://${host}:${port}`);
});
