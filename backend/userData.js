import bcrypt from 'bcryptjs'

let userData = [
    {
        name: "Raihan",
        email: "raihanbiswas.dev@gmail.com",
        password: bcrypt.hashSync("123456789"),
        isAdmin:true
    },
    {
        name: "Rashed",
        email: "habib.devs@gmail.com",
        password: bcrypt.hashSync("123456789"),
        isAdmin:false
    },

]

export default userData