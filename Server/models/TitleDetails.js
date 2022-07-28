const { Schema } = require('mongoose');

// This is a subdocument schema, it won't become its own model but we'll use it as the schema for the User's `savedShows` array in User.js
const titleDetailsSchema = new Schema({
  // saved title id from WatchMode
  titleId: {
    type: String,
    required: true,
  },
  title: {
    type: String,
  },
  plotOverview: {
    type: String
  },
  type: {
    type: String,
  },
  runtimeMinutes: {
    type: String,
  },
  genreNames: [
    {
    type: String,
    }
],
  userRating: {
    type: String,
  },
  criticScore: {
    type: String,
  },
  networkNames: [
    {
    type: String,
  }
],
  trailer: {
    type: String,
  },
//   sources: [
//     {
//     type: String,
//     }
// ]
});

module.exports = titleDetailsSchema;
