const log = (s: any) => console.log(s);
// log("asd");

//11111111111111111111111111111111111222222222222222222222222222222222222222222
async function getIP(): Promise<string> {
  try {
    const response = await fetch("https://api.ipify.org?format=json");
    const data = await response.json();
    return data.ip;
  } catch (error) {
    console.error("Error fetching IP:", error);
    return "Unable to fetch IP";
  }
}

// getIP().then((ip) => console.log("Your IP is: ", ip));

/** 333333333333333333333333333333333333333333333333333333333333333333333333333
    Використайте async/await + Promise.all

    Використайте async/await але без Promise.all

    Скористуйтеся виключно промісами, без async/await, без Promise.all
 */
async function getNames() {
  try {
    const responses = await Promise.all([
      await fetch("https://random-data-api.com/api/name/random_name"),
      await fetch("https://random-data-api.com/api/name/random_name"),
      await fetch("https://random-data-api.com/api/name/random_name"),
    ]);
    log(responses);
    const data = await Promise.all([
      await responses[0].json(),
      //   await responses[1].json(),
      //   await responses[2].json(),
    ]);
    log("\n---------------------------------------------------------------\n");
    log(data);
    return data;
  } catch (error) {
    console.error("Error fetching names:", error);
  }
}

async function getNames2() {
  // без проміс олл ми не можем зручно отримати результати в масив, як перед цим
  try {
    const response1 = await fetch("https://random-data-api.com/api/name/random_name");
    const name1 = await response1.json();

    // const response2 = await fetch("https://random-data-api.com/api/name/random_name");
    // const name2 = await response2.json();

    // const response3 = await fetch("https://random-data-api.com/api/name/random_name");
    // const name3 = await response3.json();

    return [
      name1.first_name,
      // name2.first_name,
      // name3.first_name
    ];
  } catch (error) {
    console.error("Error fetching names:", error);
  }
}

function getNames3() {
  // а тут взагалі ...
  const fetchName = (url: RequestInfo | URL) =>
    fetch(url)
      .then((res) => res.json())
      .then((data) => data.first_name);

  const fetchName1 = fetchName("https://random-data-api.com/api/name/random_name");
  const fetchName2 = fetchName("https://random-data-api.com/api/name/random_name");
  const fetchName3 = fetchName("https://random-data-api.com/api/name/random_name");

  return fetchName("https://random-data-api.com/api/name/random_name")
    .then((name1) =>
      fetchName("https://random-data-api.com/api/name/random_name").then((name2) =>
        fetchName("https://random-data-api.com/api/name/random_name").then((name3) => [name1, name2, name3])
      )
    )
    .catch((error) => {
      console.error("Error fetching names:", error);
      throw error;
    });
}

// getNames3().then((names) => console.log(names));

//44444444444444444444444444444444444444444444444444444444444444444444444444444
async function getUserPremium1() {
  let subscriptionPlan;

  while (true) {
    log(11111111111111111111111111111111111111111111111111111111111111111111111111111); // щоб бачити запити
    try {
      await new Promise((resolve) => setTimeout(resolve, 2000)); // Затримка 2 секунди перед кожним запитом
      const response = await fetch("https://random-data-api.com/api/users/random_user");
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      const randomUser = await response.json();
      subscriptionPlan = randomUser.subscription.plan;

      if (subscriptionPlan === "Premium") {
        return subscriptionPlan;
      }
    } catch (error) {
      console.error("Error fetching user data:", error);
    }
  }
}

function getUserPremium2() {
  log(11111111111111111111111111111111111111111111111111111111111111111111111111111); // щоб бачити запити
  const fetchSubscriptionPlan = (url: RequestInfo | URL) =>
    fetch(url)
      .then((res) => res.json())
      .then((data) => data.subscription.plan);

  const checkSubscription = () => {
    return fetchSubscriptionPlan("https://random-data-api.com/api/users/random_user")
      .then((subscriptionPlan) => {
        if (subscriptionPlan === "Premium") {
          return subscriptionPlan;
        }
        return new Promise((resolve) => {
          setTimeout(() => resolve(checkSubscription()), 2000);
        });
      })
      .catch((error) => {
        console.error("Error fetching user data:", error);
        return new Promise((resolve) => {
          setTimeout(() => resolve(checkSubscription()), 2000);
        });
      });
  };

  return checkSubscription();
}

// getUserPremium2().then((subscriptionPlan) => console.log(subscriptionPlan));

//55555555555555555555555555555555555555555555555555555555555555555555555555555
//Є функція №1, яка приймає коллбек, який буде викликаний з параметром == ваш поточний айпі.
//Створіть функцію №2, яку можна евейтити, яка буде користуватися функцією №1

// async function getMyIp(): Promise<string> {
//   const response = await fetch("https://api.ipify.org?format=json");
//   const data = await response.json();
//   return data.ip;
// }

// async function func1(callback: (ip: string) => void): Promise<void> {
//   const ip = await getMyIp();
//   callback(ip);
// }

// function myCallback(ip: string): void {
//   console.log("Ваш IP:", ip);
// }

// async function func2(): Promise<void> {
//   await func1(myCallback);
//   log("Співчуваю рев'юеру...");
// }

// func2();

//66666666666666666666666666666666666666666666666666666666666666666666666666666
// Є функція №1, яку можна евейти, яка поверне рядок == ваш поточний айп. Створіть функцію №2,
// яка повинна використовувати функцію №1 для отримання вашого поточного айпі, і яка приймає
// на вхід один параметр - функцію-коллбек, яка буде викликана, коли айпі буде отримано, з
// першим параметром, що дорівнює цьому айпі. Так, ми намагалися писати заплутано, але тут все чітко.

async function func1(): Promise<string> {
  const response = await fetch("https://api.ipify.org?format=json");
  const data = await response.json();
  return data.ip;
}

async function func2(callback: (ip: string) => void): Promise<void> {
  const ip = await func1();
  callback(ip);
  log("Співчуваю рев'юеру...");
}

function myCallback(ip: string): void {
  console.log("Ваш IP:", ip);
}

func2(myCallback);

