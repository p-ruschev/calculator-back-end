const mongoose = require("mongoose");

let FormulaSchema = new mongoose.Schema(
  {
    formula: {
      type: Array,
      required: true,
    },
    input: {
      type: Array,
      required: true,
    },
    variables: {
      type: Array,
      required: true
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

let Formula = mongoose.model("Formula", FormulaSchema);

module.exports = Formula;
