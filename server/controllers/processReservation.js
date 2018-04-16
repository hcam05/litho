// Dependencies //
import Reservation from '../db/schema.js';

const processReservation = {

  createReservation: (req, res) => {
    Reservation.create({
      name: req.body.name,
      hotelName: req.body.hotelName,
      arrivalDate: req.body.arrivalDate,
      departureDate: req.body.departureDate,
    }, (err, doc) => {
      if (err) res.status(400).send(err)
      else res.send({
        name: req.body.name,
        hotelName: req.body.hotelName,
        arrivalDate: req.body.arrivalDate,
        departureDate: req.body.departureDate,
      })
    })
  },

  reservationById: (req, res) => {
    const { ID } = req.params;
    Reservation.find({ "id": ID })
      .exec()
      .then((data) => {
        res.send(data);
      })
  },

  searchReservations: (req, res) => {
    const { hotelName, arrivalDate, departureDate } = req.query
    if (hotelName !== undefined) {
      Reservation.find({
        "hotelName": hotelName,
        "arrivalDate": new Date(arrivalDate),
        "departureDate": new Date(departureDate),
      })
        .exec()
        .then((data) => {
          res.send(data)
        })
        .catch((error) => res.send(error))
    } else {
      Reservation.find({})
        .exec()
        .then((data) => res.send(data))
        .catch((error) => res.send(error))
    }
  }

}

export default processReservation;
