require("dotenv").config();
const mongoose = require("mongoose");
const express = require("express");
const cors = require("cors");
const MenuItem = require("./schema");
const connectDB = require("./db");

const app = express();
app.use(express.json());
app.use(cors());

app.put("/menu/:id", async (req, res) => {
  try {
    const { name, description, price } = req.body;
    if (name === "" || price === "") {
      return res.status(400).json({
        success: false,
        message: "Name and Price cannot be empty",
      });
    }
    const updatedMenuItem = await MenuItem.findByIdAndUpdate(
      req.params.id,
      {
        name,
        description,
        price,
      },
      { new: true, runValidators: true }
    );
    if (!updatedMenuItem) {
      return res.status(404).json({
        success: false,
        message: "Menu item not found",
      });
    }
    res.status(200).json({
      success: true,
      message: "Menu item updated successfully",
      data: updatedMenuItem,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Error updating menu items",
      error: error.message,
    });
  }
});

app.delete("/menu/:id", async (req, res) => {
  try {
    const deletedMenuItem = await MenuItem.findByIdAndDelete(req.params.id);
    if (!deletedMenuItem) {
      return res.status(400).json({
        success: false,
        message: "Menu item not found",
      });
    }
    res.status(200).json({
      success: true,
      message: "Menu item deleted successfully",
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Error deleting menu items",
      error: error.message,
    });
  }
});

connectDB();
app.listen(process.env.PORT, () => {
  console.log(`Server is running at port http://localhost:${process.env.PORT}`);
});
