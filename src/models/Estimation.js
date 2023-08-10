const mongoose = require("mongoose");

let EstimationSchema = new mongoose.Schema(
  {
    formula: {
      type: Array,
      required: true,
    },
    result: {
      type: Number,
      required: true,
    },
    input: {
      type: Array,
      required: true,
    },
    comment: {
      type: String,
    },
    creator: [
      {
        type: mongoose.Types.ObjectId,
        ref: "User",
      },
    ],
  },
  { timestamps: true }
);

let Estimation = mongoose.model("Estimation", EstimationSchema);

module.exports = Estimation;
