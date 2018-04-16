// Dependencies //
import mongoose from 'mongoose';
import autoIncrement from 'mongoose-auto-increment'; // Auto Increment Library for ID Field

mongoose.connect('mongodb://localhost/reservation');
mongoose.connection.once('open', () => {
  console.log('Connected to Reservation Database');
});

autoIncrement.initialize(mongoose.connection);

const Schema = mongoose.Schema;

const ReservationSchema = new Schema({
  name: { type: String, required: true },
  hotelName: { type: String, required: true },
  arrivalDate: { type: Date, required: true },
  departureDate: { type: Date, required: true }
})

// Increment ID field
ReservationSchema.plugin(
  autoIncrement.plugin,
  {
    model: 'Reservation',
    field: 'id',
  }
);

const Reservation = mongoose.model('Reservation', ReservationSchema);

export default Reservation;
