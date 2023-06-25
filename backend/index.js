const connectToMongo = require("./db");
const express = require("express");
const cors = require("cors");
const app = express();
const port = 7000;

app.use(express.json());
app.use(cors());
// available routes
app.use("/api/auth", require("./routes/auth"));
app.use("/api/notes", require("./routes/notes"));

app.get("/", (req, res) => {
  res.send("Hello World!");
});

// app.get("/api/v1/signin", (req, res) => {
//   res.send("Sign In Page");
// });
// app.get("/api/v1/signup", (req, res) => {
//   res.send("Sign Up Page");
// });

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});

connectToMongo();
