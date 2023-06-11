const express = require("express");
const db = require("./config/connection");
const routes = require("./routes");

const PORT = 3001;
const app = express();

app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(routes);

db.once("open", () => {
  app.listen(PORT, () => {
    console.log(`API server for Social-Network-API running on port ${PORT}!`);
  });
});

//TODO: Delete below --> for testing
// const User = require("./models/User");

// run()
// async function run() {
//   const user = await User.create({
//     username: "HassFriend",
//     email: "freind44@gmail.com",
//     friends: ['6485518af71c698c3fe6a751', '648553957e55d2ea2f7d0299' ]
//   });
//   console.log(user);
// }
