const mongoose = require("mongoose");
const CompanySchema = new mongoose.Schema({
  owner: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "user"
  },
  companyName: {
    type: String,
    required: true,
    unique: true
  },
  address: {
    type: String,
    required: true
  },
  description: {
    type: String,
    required: true
  },
  workers: [
    {
      name:{
        type:String
      },
      email: {
        type: String,
        unique: true
      },
      accessKey: {
        type: String
      },
      accessGranted: {
        type: Boolean,
        default: false
      },
      user_id:{
         type: mongoose.Schema.Types.ObjectId,
    ref: "user"
      }
    }
  ],
  teams: [
    {
      name: {
        type: String,
        unique: true
      },
      numberOfProjects:{
      type:Number,
      default:0
    },
       description: {
        type: String
      },
      members: []
    }

  ],

});

module.exports = Company = mongoose.model("company", CompanySchema);
