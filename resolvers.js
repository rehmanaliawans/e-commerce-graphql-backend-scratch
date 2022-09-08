const { randomBytes } = require("crypto");
const bcrypt = require("bcryptjs");
const User = require("./models/user");
const Category = require("./models/category");
const Product = require("./models/product");
const jwt = require("jsonwebtoken");
//Resolvers
const resolvers = {
  Mutation: {
    signUpUser: async (_, { userNew }) => {
      const user = await User.findOne({ email: userNew.email });
      if (user) {
        throw new Error("User already exist");
      }
      const hashPassword = await bcrypt.hash(userNew.password, 12);
      const userData = await User.create({
        ...userNew,
        password: hashPassword,
      });
      const token = jwt.sign({ userId: userData._id }, process.env.JWT_SECRET);
      return { token };
    },
    signInUser: async (_, { userSignIn }) => {
      const user = await User.findOne({ email: userSignIn.email });
      if (!user) {
        throw new Error("Invalid email or passsword");
      }
      const doMatch = await bcrypt.compare(userSignIn.password, user.password);
      if (!doMatch) {
        throw new Error("Invalud emal or password");
      }
      const token = jwt.sign({ userId: user._id }, process.env.JWT_SECRET);
      return {
        token,
        user: {
          email: user.email,
        },
      };
    },
    addCategory: async (_, { name }) => {
      await Category.create({ name });
      return "successfully added";
    },
    addProducts: async (_, { newProduct }) => {
      console.log("pro", newProduct);
      await Product.create(newProduct);
      return "successfully added";
    },
  },
};

module.exports = resolvers;
