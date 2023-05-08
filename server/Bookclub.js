const mongoose = require("mongoose");

const bookClubSchema = new mongoose.Schema({
  name: { type: String, required: true },
  description: { type: String, required: true },
  location: { type: String, required: true },
  date: { type: Date, required: true },
  organizer: { type: String, required: true },
  members: [{ type: mongoose.Schema.Types.ObjectId, ref: "User" }],
});

const BookClub = mongoose.model("BookClub", bookClubSchema);

module.exports = BookClub;
