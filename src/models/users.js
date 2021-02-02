import bcrypt from 'bcryptjs';
import 'dotenv/config';
import mongoose from 'mongoose';
const { Schema } = mongoose;

const userSchema = new Schema({
    fullname: String,
    username: String,
    email: String,
    password: String
  });
  const User = mongoose.model('User', userSchema);
  
  const emailExists = async (email) => {
    const result = await User.countDocuments({ email: email }).exec();
    console.log(result > 0);
    return result > 0;
  
  }
  const userRepository = {
  
  
    async findAll() {
      const result = await User.find({}).exec();
      return result;
    },
    async findById(id) {
      const result = await User.findById(id).exec();
      return result != null ? result : undefined;
    },
    async findByUserName(username) {
      const result = await User.findOne({ username: username }).exec();
      return result != null ? result : undefined;
    },
  
    async create(newUser) {
      const theUser = new User({
        fullname: newUser.fullname,
        username: newUser.username,
        email: newUser.email,
        password: newUser.password
  
      });
      const result = await theUser.save();
      return result;
    },
  
    async updateById(id, modifiedUser) {
  
      const userSaved = await User.findById(id);
  
      if (userSaved != null) {
        console.log(id);
        return Object.assign(userSaved, modifiedUser).save();
  
      } else
        return undefined;
    },
    update(modifiedUser) {
      return this.updateById(modifiedUser.id, modifiedUser);
    },
    async delete(id) {
    
        await User.findByIdAndDelete(id).exec();
    }
  
  }
  
  
  export {
    User,
    userRepository,
    emailExists
  }