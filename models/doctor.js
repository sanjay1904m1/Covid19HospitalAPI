const mongoose = require("mongoose");

//doctor schema
const doctorSchema = new mongoose.Schema(
  {
    Doctor_name: {
      type: String,
      required: true,
    },
    specialty: {
      type: String,
      required: true,
    },
    Doctor_ID: {
      type: Number,
      required: true,
    },
    address: {
      type: String,
      required: true,
    },
    password: {
      type: String,
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

// export doctor schema
module.exports = Doctor = mongoose.model("Doctor", doctorSchema);
