import mongoose from 'mongoose';

const Schema = mongoose.Schema;

const testSchema = new Schema({
  name: { type: String, required: true },
  id: { type: Number, required: true },
  hotelName: { type: String, required: true },
  arrivalDate: { type: Date, required: true },
  departureDate: { type: Date, required: true }
})

const ReservationTest = mongoose.model('ReservationTest', testSchema);

describe('Database Tests', () => {

  beforeAll((done) => {
    mongoose.connect('mongodb://localhost/testDatabase');
    const db = mongoose.connection;
    db.on('error', console.error.bind(console, 'connection error'));
    db.once('open', () => {
      console.log('We are connected to test database!');
      done();
    });
  });

  afterAll(async (done) => {
    try {
      const { db } = mongoose.connection;
      await db.dropDatabase();
      await mongoose.disconnect();
    } catch (error) {
      console.log(`Something went wrong ${error}`)
      throw error
    }
  });

  it('Saves a test document to test Database', (done) => {
    const newRes = ReservationTest({
      name: 'Testing Tester',
      id: 1,
      hotelName: 'Motel 6',
      arrivalDate: '01/01/2000',
      departureDate: '01/01/2000'
    })
    newRes.save(done)
  })

  it('Should find testSchema document from test database by id', (done) => {
    //Look up the testSchema object previously saved.
    ReservationTest.find({ id: 1 }, (err, id) => {
      if (err) { throw err; }
      if (id.length === 0) { throw new Error('Not valid query!'); }
      done();
    });
  });

})


