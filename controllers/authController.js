import { comparePassword, hashPassword } from "../helper/authHelper.js";
import userModel from "../models/userModel.js";
import JWT from "jsonwebtoken";

export const registerController = async (req, res) => {
  try {
    const { name, email, password, institute, field, description } = req.body;
    // validations
    if (!name) return res.send({ message: "Name is Required" });
    if (!email) return res.send({ message: "Email is Required" });
    if (!password) return res.send({ message: "Password is Required" });
    if (!institute) return res.send({ message: "Institute is Required" });
    if (!field) return res.send({ message: "Field is Required" });

    // only one user with one email
    const existingUser = await userModel.findOne({ email });
    if (existingUser) {
      return res.status(200).send({
        success: false,
        message: "Already register Please Login!!",
      });
    }

    // register user
    const hashedPassword = await hashPassword(password);

    // save details with hashed password
    const user = await new userModel({
      name,
      email,
      password: hashedPassword,
      institute,
      field,
      description,
    }).save();

    res.status(201).send({
      success: true,
      message: "User Registered Successfully",
      user,
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      message: "Error in Registration",
      error,
    });
  }
};

export const loginController = async (req, res) => {
  try {
    const { email, password } = req.body;

    // validation
    if (!email || !password) {
      return res
        .status(404)
        .send({ success: false, message: "Invalid Email or password" });
    }

    // check user
    const user = await userModel.findOne({ email });
    if (!user) {
      return res
        .status(200)
        .send({ success: false, message: "Email Not Registered" });
    }

    // check password matches with hashedPassword
    const match = await comparePassword(password, user.password);
    if (!match) {
      return res
        .status(200)
        .send({ success: false, message: "Invalid password" });
    }

    // token generation
    const token = JWT.sign({ _id: user._id }, process.env.JWT_SECRET, {
      expiresIn: "7d",
    });

    res.status(200).send({
      success: true,
      message: "Login Successfull!!",
      user: {
        name: user.name,
        email: user.email,
        password: user.password,
        institute: user.institute,
        field: user.field,
        description: user.description,
      },
      token,
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      message: "Error in Login",
      error,
    });
  }
};

