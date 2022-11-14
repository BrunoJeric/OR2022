const mongoose = require("mongoose");

module.exports = mongoose.model('Castle', 
new mongoose.Schema({
    Name: String,
    Location: String,
    Status: String,
    Founded: String,
    Founder: {
      BirthName: String,
      FamilyName: String,
      Alias: String,
    },
    Rulers: [{
      House : String,
      Sigil : String
    }],
    Type: String,
    Religion: String,
    FandomURL: String,
    PlacesOfNote: [String],
  }), 
'Westeros-castles');