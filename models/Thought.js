const { Schema, model } = require("mongoose");

// Schema to create Thought model
const thoughtSchema = new Schema(
  {
    thoughtText: {
      type: String,
      required: true,
      validate: {
        validator: function (v) {
          return /^.{1,280}$/.test(v);
        },
        message: (props) => `${props.value} is not a valid character amount!`,
      },
    },
    createdAt: {
      type: Date,
      default: Date.now,
      get: function (timestamp) {
        const options = {
          hour: "2-digit",
          minute: "2-digit",
          day: "2-digit",
          month: "2-digit",
          year: "2-digit",
        };
        return new Date(timestamp).toLocaleString("en-US", options);
      },
    },
    username: {
      type: String,
      required: true,
    },
    reactions: [
      {
        reactionId: {
          type: Schema.Types.ObjectId,
          default: () => new Types.ObjectId(),
        },
        reactionText: {
          type: String,
          required: true,
          max: 280,
        },
        username: {
          type: String,
          required: true,
        },
        createdAt: {
          type: Date,
          default: Date.now,
          get: function (timestamp) {
            const options = {
              hour: "2-digit",
              minute: "2-digit",
              day: "2-digit",
              month: "2-digit",
              year: "2-digit",
            };

            return new Date(timestamp).toLocaleString("en-US", options);
          },
        },
      },
    ],
  },
  {
    toJSON: {
      getters: true,
      virtuals: true,
    },
    id: false,
  }
);

thoughtSchema.virtual("reactionCount").get(function () {
  return this.reactions.length;
});

// Initialize Thought model
const Thought = model("thoughts", thoughtSchema);

module.exports = Thought;
