const net = require("net");

const server = net.createServer((socket) => {
  const clientAddress = `${socket.remoteAddress}:${socket.remotePort}`;
  console.log(`Клієнт підключився: ${clientAddress}`);

  socket.on("data", (data) => {
    console.log(`Отримано дані від клієнта ${clientAddress}: ${data}`);
    socket.write(data);
  });

  socket.on("end", () => {
    console.log(`Клієнт ${clientAddress} відключився.`);
  });

  socket.on("error", (err) => {
    console.log(`Помилка з клієнтом ${clientAddress}: ${err.message}`);
  });
});

server.listen(4000, () => {
  console.log("TCP сервер працює на порті 4000");
});

/**
 * TCP сервер працює на порті 4000
 * Клієнт підключився: ::1:61034
 * Отримано дані від клієнта ::1:61034: Привіт, сервере!
 * Клієнт ::1:61034 відключився.
 */
