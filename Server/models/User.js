const { Schema, model } = require('mongoose');
const bcrypt = require('bcrypt');

const listTitleSchema = require('./ListTitle');
const titleDetailsSchema = require('./TitleDetails');

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
    savedTitles: [titleDetailsSchema]
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

// when we query a user, we'll also get another field called `titleCount` with the number of saved titles we have
userSchema.virtual('titleCount').get(function() {
  return this.savedTitles.length;
});

const User = model('User', userSchema);

module.exports = User;
