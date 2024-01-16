const CrudRepository = require("./crud-repository");
const { Flight, Airplane, Airport, City, Sequelize } = require("../models");
class FlightRepository extends CrudRepository {
  constructor() {
    super(Flight);
  }

  async getAllFlights(filter, sort) {
    const resposne = await Flight.findAll({
      where: filter,
      order: sort,
      include: [
        {
          model: Airplane,
          required: true,
          as: "airplane_detail",
        },

        {
          model: Airport,
          require: true,
          as: "departure_airport",

          on: {
            col1: Sequelize.where(
              Sequelize.col("Flight.departureAirportId"),
              "=",
              Sequelize.col("departure_airport.code")
            ),
          },
          include: {
            model: City,
            require: true,
          },
        },
        {
          model: Airport,
          require: true,
          as: "arrival_airport",

          on: {
            col1: Sequelize.where(
              Sequelize.col("Flight.arrivalAirportId"),
              "=",
              Sequelize.col("arrival_airport.code")
            ),
          },
          // as: "DepartureAirport",
        },
      ],
    });
    return resposne;
  }
}

module.exports = FlightRepository;
