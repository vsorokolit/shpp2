const http = require("http");

const postData = "Привіт, сервере!";

// Опції для HTTP запиту
const options = {
  hostname: "localhost",
  port: 3000,
  path: "/",
  method: "POST",
  headers: {
    "Content-Type": "text/plain",
    "Content-Length": Buffer.byteLength(postData),
  },
};

const req = http.request(options, (res) => {
  let responseData = "";

  res.on("data", (chunk) => {
    responseData += chunk;
  });

  res.on("end", () => {
    console.log(`Відповідь від сервера: ${responseData}`);
    console.log(`Повідомлення збігається: ${responseData === postData}`);
  });
});

req.on("error", (e) => {
  console.error(`Проблема з запитом: ${e.message}`);
});

req.write(postData);
req.end();

/**
 * Відповідь від сервера: Привіт, сервере!
 * Повідомлення збігається: true
 */
