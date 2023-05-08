const express = require("express");
const { ObjectId } = require("mongodb");
const mongoose = require("mongoose");
const BookClub = require("./Bookclub");

const app = express();

// Connect to MongoDB Atlas
mongoose
  .connect(
    "mongodb+srv://pakiozihak:DkKJ7TmzkUtw2GJR@bookclub.pfcfaho.mongodb.net/?retryWrites=true&w=majority",
    {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    }
  )
  .then(() => {
    console.log("Connected to MongoDB Atlas");

// Create a new book club
  // Create a new book club
const bookClub = new BookClub({
  name: 'My Book Club',
  description: 'A book club for bookworm readers',
  organizer: 'John Doe',
  date: new Date(),
  location: 'London'
});

bookClub.save().then(() => {
  console.log('Created new book club:', bookClub);
}).catch(err => {
  console.error('Error creating book club:', err);
});

   // Start the server
  app.listen(3011, () => {
    console.log('Server listening on port 3011');
  });


app.use(express.json());

app.post("/bookclubs", async (req, res) => {
  const { name, description } = req.body;

  // Insert new book club document into database
  const bookClub = new BookClub({ name, description });
  await bookClub.save();

  res.json(bookClub);
});


app.post("/bookclubs/:id/members", async (req, res) => {
  const { id } = req.params;
  const { userId } = req.body;

  // Update book club document to add new member
  const bookClub = await BookClub.findByIdAndUpdate(
    id,
    { $addToSet: { members: ObjectId(userId) } },
    { new: true }
  );

  res.json(bookClub);
});

app.get("/bookclubs/:id", async (req, res) => {
  const { id } = req.params;

  // Find book club document by ID
  const bookClub = await BookClub.findById(id);

  res.json(bookClub);
});

  });
