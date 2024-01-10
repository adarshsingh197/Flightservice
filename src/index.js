const express = require("express");
const { PORT } = require("./config");
const app = express();

const apiRoutes = require("./routes");
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use("/api", apiRoutes);

app.listen(3000, async () => {
  console.log(`you are listentning to :${3000}`);

  const { Airplane, City } = require("./models");
  // const city = await City.findByPk(17);
  // console.log(city);

  // await city.createAirport({ name: "Delhi Airport", code: "IND" });
  // await City.destroy({
  //   where: {
  //     id: 17,
  //   },
  // });
});
