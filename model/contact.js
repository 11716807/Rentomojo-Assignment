const mongoose= require("mongoose");
const Schema = mongoose.Schema;

const Contact = new Schema(
    {
        name:
        {
          type: String,
          required: true,
         
        },

        phone:{
            type:String,
            default:"xxxxxxxxxxx"
        },

        email:{
            type:String,
            required:true,
            unique: true
        }
    },
    {
       timestamps:true
    }
)

var contact = mongoose.model('Contact',Contact);
module.exports=contact;