import mongoose, { ObjectId } from "mongoose";
import bcrypt from "bcrypt";

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
} , {
    timestamps: true,
})

userSchema.pre('save', async function(next) {
    if(!this.isModified("password")) next();

    const salt = await bcrypt.genSaltSync(10);
    this.password = await bcrypt.hashSync(this.password , salt);
})

userSchema.methods.createPasswordResetToken = async function(enteredPassword) {
    const resetToken = crypto.randombytes(32).toString("hex");
    this.passwordResetToken = crypto
        .createHash('sha256')
        .update(resetToken)
        .digest("hex");
    this.passwordResetExpires = Date() + 30* 60 * 1000;
    return resetToken
}

userSchema.methods.isPasswordMatched = async function (enteredPassword) {
    return await bcrypt.compare(enteredPassword, this.password);
}

const User = mongoose.model("User", userSchema);

export default User;