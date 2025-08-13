const express = require("express");
const app = express();

app.use(express.json());

app.get("/", (req, res) => {
  res.send("Hello, from Express backend!");
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
