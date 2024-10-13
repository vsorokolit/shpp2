const http = require("http");

const server = http.createServer((req, res) => {
  let body = "";

  req.on("data", (chunk) => {
    body += chunk;
  });

  req.on("end", () => {
    console.log(`Прийнято повідомлення: ${body}`);
    res.writeHead(200, { "Content-Type": "text/plain" });
    res.end(body);
  });

  console.log(`Підключено клієнта з IP: ${req.socket.remoteAddress}`);
});

server.listen(3000, () => {
  console.log("Сервер працює на порту 3000");
});
/**
 * Сервер працює на порту 3000
 * Підключено клієнта з IP: ::1
 * Прийнято повідомлення: Привіт, сервере!
 */
