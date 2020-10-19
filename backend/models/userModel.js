import mongoose from 'mongoose'
import bycript from 'bcryptjs'

const userSchema = mongoose.Schema({
    name: { type: String, required: [true, 'name is required'] },
    lastName: { type: String, required: [true, 'name is required'] },
    isAdmin: {
        type: Boolean,
        required: true,
        default: false
    },
    email: {type: String, required: true, lowercase: true, unique: [true, 'email is taken']}
}, {
    timestamps: true
})

userSchema.methods.matchPassword = async function(psw) {
    return await bycript.compare(psw, this.password)
}

export default mongoose.model('User', userSchema)