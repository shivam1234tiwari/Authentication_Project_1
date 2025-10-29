import UserModel from "../models/user.js";
import bcrypt, { compare } from "bcrypt";
import jwt from "jsonwebtoken";

export const userRegistration = async (req, res) => {
  const { name, email, password, password_confirmation } = req.body;
  const user = await UserModel.findOne({ email: email });
  if (user) {
    res.send({ status: "failed", message: "Email already exists" });
  } else {
    if (name && email && password && password_confirmation) {
      if (password === password_confirmation) {
        try {
          const salt = await bcrypt.genSalt(12);
          const hashPassword = await bcrypt.hash(password, salt);
          const doc = new UserModel({
            name: name,
            email: email,
            password: hashPassword,
            tc: tc,
          });
          await doc.save();
          const saved_user = await UserModel.findOne({ email: email });
          // Generate JWT Token
          const token = jwt.sign(
            { userID: saved_user._id },
            process.env.JWT_SECRET_KEY,
            { expiresIn: "1d" }
          );
          res
            .status(201)
            .send({
              status: "success",
              message: "Registration Success",
              token: token,
            });
        } catch (error) {
          console.log(error);
          res.send({ status: "failed", message: "Unable to Register" });
        }
      } else {
        res.send({
          status: "failed",
          message: "Password and Confirm Password doesn't match",
        });
      }
    } else {
      res.send({ status: "failed", message: "All fields are required" });
    }
  }
};
export const userlogin = async (req, res) => {
  try{
    const {email,password}=req.body;
    if(email && password){
       const user=await UserModel.findOne({email:email})
       if(user !=null){
        const isMatch=await bcrypt.compare(password,user.password)
        if((user.email ===email) && isMatch){
          // Generate JWT Token
          const token = jwt.sign(
            { userID: user._id },
            process.env.JWT_SECRET_KEY,
            { expiresIn: "1d" }
          );
             res.send({"status":"success","message":"Login Success","token":token})
        }else{
             res.send({"status":"failed","message":"Something wrong.."})
        }
       }else{
         res.send({"status":"failed","message":"User not registered "})
       }
    }else{
         res.send({"status":"failed","message":"All fields required "})
    }

  }catch(error){
    console.log(error)
     res.send({"status":"failed","message":"Unable to login "})
  }
};
export const userLogout=async(req,res)=>{
  res.redirect('/');
}
