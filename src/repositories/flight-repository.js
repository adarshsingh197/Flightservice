const CrudRepository = require("./crud-repository");
const { Flight } = require("../models");
class FlightRepository extends CrudRepository {
  constructor() {
    super(Flight);
  }

  async getAllFlights(filter, sort) {
    const resposne = await Flight.findAll({
      where: filter,
      order: sort,
    });
    return resposne;
  }
}

module.exports = FlightRepository;
