import express from 'express';
import mongoose from 'mongoose';
import { ContactSc } from './ContactModel.js';
import bodyParser from 'express';
import cors from 'cors';
import dotenv from 'dotenv';

dotenv.config();

const app = express();
app.use(bodyParser.json());

app.use(cors({
  origin:true,
  methods:["GET","POST","PUT","DELETE"],
  credentials:true
}))

// rmV9f2mW9RkMoLi7
// mrohan51068
mongoose.connect(process.env.URL, {
  dbName: process.env.DB_NAME
}).then(() => console.log("connected")).catch((err) => console.log(err))

// get All Contacts
app.get("/", async (req, res) => {
  try {
    let contact = await ContactSc.find().sort({createdAt:-1})

    res.json({ message: "All Contacts", contact });
  } catch (error) {
    res.json({ message: error.message });
  }
});
// add contact
app.post("/", async (req, res) => {
  const { name, gmail, phone } = req.body;
  try {
    let contact = await ContactSc.findOne({ gmail });

    if (contact) return res.json({ message: "Contact already exist..!" });

    contact = await ContactSc.create({ name, gmail, phone });
    res.json({ message: "Contact Saved Successfully..!", contact });
  } catch (error) {
    res.json({ message: error.message });
  }
});
// Edit Contact
app.put("/:id", async (req, res) => {
  const id = req.params.id;
  const updatedData = req.body;
  try {
    let contact = await ContactSc.findById(id)
    if(!contact) return res.json({message:'contact not exist'})
    let data = await ContactSc.findByIdAndUpdate(id, updatedData, { new: true });
    res.json({ message: "Contact has been updated..!", data });
  } catch (error) {
    res.json({ message: error.message });
  }
});

// Delete Contact
app.delete("/:id", async (req, res) => {
  const id = req.params.id;
  try {
    let contact = await ContactSc.findById(id);
    if (!contact) return res.json({ message: "Contact not exist...!" });
    await contact.deleteOne();
    res.json({ message: "Your Contact has been deleted..!" });
  } catch (error) {
    res.json({ message: error.message });
  }
});

app.listen(2000, () => console.log("Server is running"))