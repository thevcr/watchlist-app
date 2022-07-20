const { Schema, model } = require('mongoose');
const bcrypt = require('bcrypt');

const showSchema = require('./Show');

const userSchema = new Schema(
  {
    username: {
      type: String,
      required: true,
      unique: true,
      trim: true
    },
    email: {
      type: String,
      required: true,
      unique: true,
      match: [/.+@.+\..+/, 'Must match an email address!']
    },
    password: {
      type: String,
      required: true,
      minlength: 6,
      maxLength: 20
    },
    savedShows: [showSchema]
  },
  {
    toJSON: {
      virtuals: true
    }
  }
);

// set up pre-save middleware to create password
userSchema.pre('save', async function(next) {
  if (this.isNew || this.isModified('password')) {
    const saltRounds = 10;
    this.password = await bcrypt.hash(this.password, saltRounds);
  }

  next();
});

// compare the incoming password with the hashed password
userSchema.methods.isCorrectPassword = async function(password) {
  return bcrypt.compare(password, this.password);
};

// when we query a user, we'll also get another field called `showCount` with the number of saved books we have
userSchema.virtual('showCount').get(function() {
  return this.savedShows.length;
});

const User = model('User', userSchema);

module.exports = User;
