const dgram = require("dgram");
const server = dgram.createSocket("udp4");

server.on("message", (msg, rinfo) => {
  console.log(`Отримано повідомлення від клієнта ${rinfo.address}:${rinfo.port}: ${msg}`);
  server.send(msg, rinfo.port, rinfo.address, (err) => {
    if (err) console.error("Помилка відправки:", err);
    else console.log(`Повідомлення відправлено назад клієнту ${rinfo.address}:${rinfo.port}`);
  });
});

server.on("error", (err) => {
  console.error(`Помилка сервера: ${err.stack}`);
  server.close();
});

server.on("listening", () => {
  const address = server.address();
  console.log(`UDP сервер працює на ${address.address}:${address.port}`);
});

server.bind(5000);

/**
 * UDP сервер працює на 0.0.0.0:5000
 * Отримано повідомлення від клієнта 127.0.0.1:59516: Привіт, сервере!
 * Повідомлення відправлено назад клієнту 127.0.0.1:59516
 */
