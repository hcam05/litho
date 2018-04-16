// Dependencies //
import Reservation from '../db/schema.js';
import mongoose from 'mongoose';

mongoose.connect('mongodb://localhost/reservation');
mongoose.connection.once('open', () => {
  console.log('Connected to Reservation Database');
});

const resolvers = {
  Query: {
    allReservations() {
      return new Promise((resolve, reject) => {
        setTimeout(() => reject('MongoDB timeout when fetching field views (timeout is 500ms)'), 500);
        Reservation.find()
          .exec()
          .then(resp => {
            resolve(resp);
            // resp.forEach((x) => resolve(x));
          })
          .catch(errors => reject(errors));
      })
    },
    resById(_, args) {
      return new Promise((resolve, reject) => {
        setTimeout(() => reject('MongoDB timeout when fetching field views (timeout is 500ms)'), 500);
        Reservation.find({
          ...args
        })
          .exec()
          .then(resp => {
            resolve(resp);
          })
          .catch(errors => reject(errors));
      })
    },
    reservations(_, args) {
      return new Promise((resolve, reject) => {
        setTimeout(() => reject('MongoDB timeout when fetching field views (timeout is 500ms)'), 500);
        Reservation.find({
          ...args
        })
          .exec()
          .then(resp => {
            resolve(resp);
          })
          .catch(errors => reject(errors));
      })
    },
  },
};

export default resolvers;
