const Doctor = require("../models/doctor");
const Patient = require("../models/patient");
const Report = require("../models/report");

//register patient
module.exports.register = async (req, res) => {
  try {
    // check if the patient already exists
    let patientExist = await Patient.findOne({ Patient_phone: req.body.Patient_phone });

    if (!patientExist) {
      // if patient doesn't already exists, create new patient
      let patient = await Patient.create(req.body);

      return res.status(200).json({
        message: "Patient successfully registered",
        patientId: patient._id,
      });
    } else {
      // if patient already exists
      return res.status(409).json({
        message: "One patient already registered with this number",
      });
    }
  } catch (err) {
    console.log(`Error in registering patient: ${err}`);

    return res.status(500).json({
      message: "Internal Server Error",
    });
  }
};

//create report for the patient
module.exports.createReport = async (req, res) => {
  try {
    // check if patient exists
    let patient = await Patient.findById(req.params.id);

    if (patient) {
      // if patient exists
      let Doctor_Id = await Doctor.findById(req.body.Doctor_Id);

      // create data for report
      let reportData = {
        Doctor_Id: req.body.Doctor_Id,
        patient: req.params.id,
        Status_of_Report: req.body.Status_of_Report,
        Date_of_Report: req.body.Date_of_Report,
      };

      // create the report and push in patient's reports
      let report = await Report.create(reportData);
      patient.reports.push(report);

      patient.save();

      return res.status(200).json({
        message: "Patient report successfully created",
      });
    } else {
      return res.status(409).json({
        message: "Patient registration unsuccessful",
      });
    }
  } catch (err) {
    console.log(`Error in creating report for the patient: ${err}`);

    return res.status(500).json({
      message: "Internal server error",
    });
  }
};

// create all the reports
module.exports.allReports = async (req, res) => {
  try {
    let patient = await Patient.findById(req.params.id).populate({
      path: "reports",
      populate: { path: "doctor", select: "Doctor_ID _id" },
    });

    if (patient) {
      return res.status(200).json({
        message: `${patient.Patient_Name}'s Test Reports`,
        reports: patient.reports,
      });
    } else {
      return res.status(409).json({
        message: "Patient not registered",
      });
    }
  } catch (err) {
    console.log(`Error creating all reports for the patient: ${err}`);
    return res.status(500).json({
      message: "Internal Server Error",
    });
  }
};
