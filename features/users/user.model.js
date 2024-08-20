import { ROLES } from '#constants';
import { Schema } from '#lib';
import bcrypt from 'bcryptjs';
const User = new Schema({
  name: 'User',
  schema: [
    {
      username: {
        type: String,
        required: [true, 'Username is required'],
      },
      email: {
        type: String,
        required: [true, 'Email is required'],
        unique: [true, 'Email already exists'],
      },
      password: {
        type: String,
        required: [true, 'Password is required'],
      },
      role: {
        type: String,
        enum: ROLES,
        default: ROLES.CUSTOMER,
      },
    },
    { timestamps: true },
  ],
});

User.statics.fillables = ['username', 'email', 'password'];
User.statics.hidden = ['password'];

User.statics.hashPassword = async (password) => {
  const salt = await bcrypt.genSalt(10);
  return await bcrypt.hash(password, salt);
};

User.methods.matchPassword = async function (password) {
  return await bcrypt.compare(password, this.password);
};

User.pre('save', async function (next) {
  if (this.isModified('password'))
    this.password = await this.constructor.hashPassword(this.password);
  next();
});
export default User.makeModel();
