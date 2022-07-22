const { Schema } = require('mongoose');

// This is a subdocument schema, it won't become its own model but we'll use it as the schema for the User's `savedTitles` array in User.js
const listTitleSchema = new Schema({
  titles: [
    {
      type: String,
    },
  ],
  // saved title id from WatchMode
  titleId: {
    type: String,
    required: true,
  },
  limit: {
    type: String,
    required: true
  }
});

module.exports = listTitleSchema;