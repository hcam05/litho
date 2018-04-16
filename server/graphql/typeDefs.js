const typeDefs = `
# schema types
type Reservation {
  name: String,
  id: Int,
  hotelName: String,
  arrivalDate: String,
  departureDate: String,
  _id: String
}

# the schema allows the following query:
type Query {
  allReservations: [Reservation]
  resById(id: Int, name: String, hotelName: String, arrivalDate: String, departureDate: String): [Reservation]
  reservations(hotelName: String, arrivalDate: String, departureDate: String): [Reservation]
}

schema {
  query: Query
}
`

export default typeDefs;
