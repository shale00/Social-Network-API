const { Schema, model, default: mongoose } = require("mongoose");

// Schema to create Thought model
const thoughtSchema = new Schema(
    {
        thoughtText: {
            type: String,
            required: true,
            validate: {
                validator: function (v) {
                  return /^{1,280}$/.test(v);
                },
                message: (props) => `${props.value} is not a valid character amount!`,
              },
        },
        createdAt: {
            type: Date,
            default: Date.now
            // TODO: Use a getter method to format the timestamp on query
        },
        username: {
            type: String,
            required: true
        },
        reactions: [{
            reactionId: {
                type: Schema.Types.ObjectId,
                default: new ObjectId(),
            },
            reactionBody: {
                type: String,
                required: true,
                validate: {
                    validator: function (v) {
                      return /^{0,280}$/.test(v);
                    },
                    message: (props) => `${props.value} is not a valid character amount!`,
                  },
            },
            username: {
                type: String,
                required: true,
            },
            createAt: {
                type: Date,
                default: Date.now,

            }
        }]
    },
    {
        toJSON: {
            getters: true,
            virtuals: true,
        },
        id: false,
    }
);

thoughtSchema.virtuals("reactionCount").get(function() {
    return this.reactions.length;
})