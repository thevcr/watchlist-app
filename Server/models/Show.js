const { Schema } = require('mongoose');

// This is a subdocument schema, it won't become its own model but we'll use it as the schema for the User's `savedShows` array in User.js
const showSchema = new Schema({
  genre: [
    {
      type: String,
    },
  ],
  description: {
    type: String,
    required: true,
  },
  // saved show id from Watchbox
  showId: {
    type: String,
    required: true,
  },
  backdrop: {
    type: String,
  },
  type: {
    type: String,
  },
  title: {
    type: String,
    required: true,
  },
});

module.exports = showSchema;