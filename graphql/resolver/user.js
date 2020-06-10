const bcrypt = require('bcryptjs')

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
}
