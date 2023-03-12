const mongoose = require("mongoose");

//report schema
const reportSchema = new mongoose.Schema(
  {
    Doctor_Id: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Doctor",
    },
    patient: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Patient",
    },
    Status_of_Report: {
      type: String,
      required: true,
    },

    Date_of_Report: {
      type: Date,
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

// export report schema
module.exports = Report = mongoose.model("Report", reportSchema);
