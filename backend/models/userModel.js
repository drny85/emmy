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
    email: {type: String, required: true, lowercase: true, unique: [true, 'email is taken']},
    password: {type: String, required: true}
}, {
    timestamps: true
})

userSchema.methods.matchPassword = async function(psw) {
    return await bycript.compare(psw, this.password)
}

userSchema.pre('save', async function(next) {
    if (!this.isModified('password')) {
        next()
    }
    const salt = await bycript.genSalt(10);
    this.password = await bycript.hash(this.password, salt)
})

export default mongoose.model('User', userSchema)