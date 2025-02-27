require("dotenv").config();
const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");
const fs = require("fs");
const XLSX = require("xlsx");

const app = express();
const PORT = process.env.PORT || 5000;
const FILE_PATH = process.env.EXCEL_FILE_PATH || "registration_data.xlsx";

app.use(cors());
app.use(bodyParser.json());

const writeToExcel = (data) => {
  let workbook,
    worksheet,
    existingData = [];

  if (fs.existsSync(FILE_PATH)) {
    workbook = XLSX.readFile(FILE_PATH);
    worksheet = workbook.Sheets["Registrations"];
    if (worksheet) {
      existingData = XLSX.utils.sheet_to_json(worksheet);
    }
  } else {
    workbook = XLSX.utils.book_new();
  }

  existingData.push(data);
  worksheet = XLSX.utils.json_to_sheet(existingData);

  if (!workbook.Sheets["Registrations"]) {
    XLSX.utils.book_append_sheet(workbook, worksheet, "Registrations");
  } else {
    workbook.Sheets["Registrations"] = worksheet;
  }

  XLSX.writeFile(workbook, FILE_PATH);
};

app.post("/register", (req, res) => {
  const { teamName, teamMembers, leaderName, phone, email } = req.body;

  if (!teamName || !teamMembers || !leaderName || !phone || !email) {
    return res.status(400).json({ message: "All fields are required" });
  }

  const newData = {
    Team_Name: teamName,
    Team_Members: teamMembers,
    Leader_Name: leaderName,
    Phone: phone,
    Email: email,
  };

  try {
    writeToExcel(newData);
    res.status(200).json({ message: "Registration successful!" });
  } catch (error) {
    res.status(500).json({ message: "Server error", error: error.message });
  }
});

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
