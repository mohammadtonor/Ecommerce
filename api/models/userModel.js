import mongoose, { ObjectId } from "mongoose";
import bcrypt from "bcrypt";
import crypto from "crypto";

const userSchema = new mongoose.Schema({
    firstName: {
        type: String,
        required: true,
        index: true
    },
    lastName: {
        type: String,
        required: true,
        index: true
    },
    email: {
        type: String,
        required: true,
        unique: true,
    },
    mobile: {
        type: String,
        required: true,
        unique: true,
    }, 
    password: {
        type: String,
        required: true,
    },
    role: {
        type: String,
        default: "user"
    },
    isBlocked: {
        type: Boolean,
        default: false 
    }
    ,
    cart: {
        type: Array,
        default: []
    },
    address: [{ type: ObjectId, ref: 'Address'}],
    whashlist: [{ type: ObjectId, ref: 'Product'}],
    refreshToken: {
        type: String,
    },
    passwordChangeAt: Date,
    passwordResetToken: String,
    passwordResetExpires: Date
    } ,
    {
        timestamps: true,
    }
)

userSchema.pre('save', async function(next) {
    if (!this.isModified("password")) {
        next();
    }

    const salt = await bcrypt.genSaltSync(10);
    this.password = await bcrypt.hashSync(this.password , salt);
})

userSchema.methods.createPasswordResetToken = async function () {
    const resettoken = crypto.randomBytes(32).toString("hex");
    this.passwordResetToken = crypto
      .createHash("sha256")
      .update(resettoken)
      .digest("hex");
    this.passwordResetExpires = Date.now() + 30 * 60 * 1000; // 10 minutes
    return resettoken;
  };

userSchema.methods.isPasswordMatched = async function (enteredPassword) {
    return await bcrypt.compare(enteredPassword, this.password);
}

const User = mongoose.model("User", userSchema);

export default User;