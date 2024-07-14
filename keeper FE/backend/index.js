const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const port = 8080;

const app = express();
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(cors());

mongoose.connect("mongodb+srv://User1:user123@cluster0.j84plfy.mongodb.net/keeperDB")
  .then(() => {
    console.log('Successfully connected to MongoDB');
  })
  .catch((err) => {
    console.error('Failed to connect to MongoDB', err);
  });

// Create schema
const keeperSchema = new mongoose.Schema({
  title: String,
  description: String
});

// Create model
const Keeper = mongoose.model('Keeper', keeperSchema);

app.get('/api/getall', async (req, res) => {
  try {
    const keepers = await Keeper.find();
    res.json(keepers);
  } catch (error) {
    console.error(error);
    res.status(500).send("Internal Server Error");
  }
});
app.post('/api/addnew', async (req, res) => {
  try {
    const { title, description } = req.body;
    const newKeeper = new Keeper({
      title: title,
      description: description
    });
    console.log(newKeeper)
    await newKeeper.save();
    
    const keeperList = await Keeper.find();
    res.status(201).json(keeperList);
  } catch (error) {
    console.error(error);
    res.status(500).send("Internal Server Error");
  }
});


app.delete('/api/delete', async (req, res) => {
  try {
    const { id } = req.body;
    await Keeper.findByIdAndDelete(id);
    const keepers = await Keeper.find();
    res.json(keepers);
  } catch (error) {
    console.error(error);
    res.status(500).send("Internal Server Error");
  }
});



app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
