import mongoose from 'mongoose';
import crypto from 'crypto'
import {
    v4 as uuidv4
  } from 'uuid';
const userSchema = mongoose.Schema({
    username:{
        type: String,
        require:true,
        maxlength: 32
    },
    email: {
        type: String,
        trim: true,
        required: true,
        unique: 32
    },
    hashed_password: {
        type: String,
        required: true,
      },
    about: {
        type: String,
        trim: false,
    },
    salt: {
        type: String
    },
    role: {
        type: Number,
        default: 0
    },
    history: {
        type: Array,
        default: []
    },
},{timestamps:true})
// xử lý password truyền vào mã hóa lần 1 gán cho hashed_password
userSchema.virtual('password').set(function (password) {
    this.salt = uuidv4();
    this.hashed_password = this.encrytPassword(password);
  })
  
  // trả về password đã mã hóa 2 lớp
  
  userSchema.methods = {
    authenticate: function (plainText) {

      return this.encrytPassword(plainText) == this.hashed_password;
    },
    encrytPassword: function (password) {
      if (!password) return '';
      try {
        return crypto.createHmac('sha1', this.salt).update(password).digest('hex');
      } catch (error) {
        return '';
      }
    }
  }
module.exports = mongoose.model('User',userSchema);
