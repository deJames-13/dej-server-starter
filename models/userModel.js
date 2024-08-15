import bcrypt from 'bcryptjs';
import Model from './model.js';

const userSchema = [
  {
    name: {
      type: String,
      required: [true, 'Name is required'],
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
  },
  { timestamps: true },
];

const User = new Model({ name: 'User', schema: userSchema });

User.statics.fillables = ['name', 'email', 'password'];
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
