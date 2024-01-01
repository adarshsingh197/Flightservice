const express = require("express");
const { PORT } = require("./config");
const app = express();

const apiRoutes = require("./routes");
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use("/api", apiRoutes);

app.listen(3000, () => {
  console.log(`you are listentning to :${3000}`);
});
