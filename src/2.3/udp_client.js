const dgram = require("dgram");
const client = dgram.createSocket("udp4");
const message = Buffer.from("Привіт, сервере!");

client.send(message, 5000, "localhost", (err) => {
  if (err) console.error("Помилка відправки:", err);
  else console.log("Повідомлення надіслано серверу");
});

client.on("message", (msg, rinfo) => {
  console.log(`Отримано відповідь від сервера: ${msg}`);
  console.log(`Повідомлення збігається: ${msg.toString() === message.toString()}`);
  client.close();
});

client.on("error", (err) => {
  console.error(`Помилка клієнта: ${err.message}`);
});

/**
 * Повідомлення надіслано серверу
 * Отримано відповідь від сервера: Привіт, сервере!
 * Повідомлення збігається: true
 */
