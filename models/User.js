const { Schema, model } = require("mongoose");

// Schema to create User model
const userSchema = new Schema(
  {
    username: {
      type: String,
      unique: true,
      required: true,
      trim: true,
    },
    email: {
      type: String,
      required: [true, "User email address required."],
      unique: true,
      validate: {
        validator: function (v) {
          return /^([a-zA-Z0-9_\.-]+)@([\da-z\.-]+)\.([a-z\.]{2,6})$/.test(v);
        },
        message: (props) => `${props.value} is not a valid email address!`,
      },
    },
    thoughts: [
      {
        type: Schema.Types.ObjectId,
        ref: "Thought",
      },
    ],
    friends: [
      {
        type: Schema.Types.ObjectId,
        ref: this,
      },
    ],
  },
  {
    toJSON: {
      virtuals: true,
    },
    id: false,
  }
);

//TODO: check this
userSchema
  .virtual("friendCount")
  .get(function () {
    return this.friends.length;
  })
  .set(function (v) {
    const friendCount = v.length;
    this.set({ friendCount });
  });

// Initialize User model
const User = model("user", userSchema);

module.exports = User;
