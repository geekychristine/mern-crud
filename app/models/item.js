const mongoose = require("mongoose");
const slugify = require("../utils").slugify;
const Schema = mongoose.Schema;

/**
 * Mongoose Model Convenient Methods
 * Item.find() - Find any items that match our query
 * Item.findOne() - Find only one that matches query
 * Item.save() - Update Item
 * Item.remove() - Deleting Item
 * */

// Create a data schema
const itemSchema = new Schema({
  slug: {
    type: String,
    unique: true
  },
  name: String,
  type: String,
  desc: String,
  rarity: String,
  requires_attunement: String,
  document__slug: String,
  document__title: String
});

// middleware -----
// Make sure that the slug is cerated from the name
itemSchema.pre("save", function(next) {
  this.slug = slugify(this.name);
  next();
});

// Create the model
const itemModel = mongoose.model("Item", itemSchema);

// Export the model
module.exports = itemModel;
