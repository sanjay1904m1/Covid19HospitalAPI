const mongoose = require("mongoose");

//patient schema
const patientSchema = new mongoose.Schema(
  {
    Patient_Name: {
      type: String,
      required: true,
    },
    Patient_phone: {
      type: String,
      required: true,
    },
    address: {
      type: String,
      required: true,
    },
    reports: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Report",
      },
    ],
  },
  {
    timestamps: true,
  }
);

// export patient schema
module.exports = Patient = mongoose.model("Patient", patientSchema);
