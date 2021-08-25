import bcrypt from 'bcryptjs'

const users = [
    {
        name : 'Admin User',
        email : 'admin@gmail.com',
        password : bcrypt.hashSync('123456', 10),
        isAdmin : true
    },
    {
        name : 'Chinmay',
        email : 'Chinmay@gmail.com',
        password : bcrypt.hashSync('123456', 10),
        
    },
    {
        name : 'Chethana',
        email : 'Chethana@gmail.com',
        password : bcrypt.hashSync('123456', 10),
        
    }
]

export default users