const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')

const User = require('../../models/User')

module.exports = {
    createUser: async args => {
        try {
            const existingUser = await User.findOne({ email: args.userInput.email })
            if (existingUser) {
                throw new Error('User already exists')
            }
            const user = new User({
                email: args.userInput.email,
                password: bcrypt.hashSync(args.userInput.password, 12)
            })
            result = await user.save()
            return { ...result._doc, password: null }
        } catch (err) {
            console.log(err) // displayed in console
            throw err // displayed in graphiql gui
        }
    },
    login: async args => {
        try {
            user = await User.findOne({ email: args.authInput.email })
            if (!user) {     // if no user exists
                throw new Error('No user exists')
            }
            //user exists, so now check password
            isEqual = await bcrypt.compare(args.authInput.password, user.password)

            if (!isEqual) {  // if wrong password
                throw new Error('Wrong Password')
            }
            // now user exists, and right password. So, generate token
            JWTtoken = jwt.sign({ userId: user.id, email: user.email }, "thisismysecretkey", { expiresIn: '1h' })
            return {
                userId: user.id,
                token: JWTtoken,
                tokenExpiration: 1
            }
        } catch (err) {
            throw err
        }
    }
}
