const net = require("net");

const client = new net.Socket();
const message = "Привіт, сервере!";

client.connect(4000, "localhost", () => {
  console.log("Підключено до сервера");
  client.write(message);
});

client.on("data", (data) => {
  console.log(`Відповідь від сервера: ${data}`);
  console.log(`Повідомлення збігається: ${data.toString() === message}`);
  client.end();
});

client.on("close", () => {
  console.log("З'єднання закрито");
});

client.on("error", (err) => {
  console.error(`Помилка: ${err.message}`);
});

/**
 * Підключено до сервера
 * Відповідь від сервера: Привіт, сервере!
 * Повідомлення збігається: true
 * З'єднання закрито
 */
