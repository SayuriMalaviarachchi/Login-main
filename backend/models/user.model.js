const bcrypt = require('bcryptjs');
const mongoose = require("mongoose");

const userSchema = mongoose.Schema({
    profilePicture: {
        type: String,
    },
    userName: {
        type: String,
        required: true,
        trim: true,
    },
    password:{
        type : String,
        required:true,
        trim: true,
    },
    email: {
        type: String,
        required: true,
        trim: true,
    }, 
})

// Hash password before saving the user
userSchema.pre('save', async function (next) {
    if (this.isModified('password')) {
      this.password = await bcrypt.hash(this.password, 10);
    }
    next();
  });
  
  userSchema.methods.comparePassword = function (password) {
    return bcrypt.compare(password, this.password);
  };
  
const userModel = mongoose.model("user",userSchema);

module.exports = userModel;