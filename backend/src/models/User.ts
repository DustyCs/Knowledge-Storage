import mongoose, { Document } from "mongoose";


const validateEmail = (email: string) => {
    const re = /^(([^<>()[]\.,;:\s@"]+(\.[^<>()[]\.,;:\s@"]+)*)|(".+"))@(([^<>()[]\.,;:\s@"]+\.)+[^<>()[]\.,;:\s@"]{2,})$/i;
    return re.test(String(email).toLowerCase());
  };
  

const UserSchema = new mongoose.Schema({
  username: { type: String, required: true },
  email: { 
    type: String, 
    required: true, 
    unique: true,
    validate: {
      validator: validateEmail,
      message: (props:any) =>  `${props.value} Invalid email format`,
    },
  },
  password: { type: String, required: true },
  role: { type: String, default: "N/A" },
  createdAt: { type: Date, default: Date.now },
});

// Middleware
// use "post" instead of "pre" which instead does the function after the document is saved
UserSchema.pre("save", async function (this: mongoose.Document & { email: string }, next) {
    if (this.isModified("email")) {
      this.email = this.email.toLowerCase();
    }
    next();
  });

export const User = mongoose.model("User", UserSchema);