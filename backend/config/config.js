require('dotenv').config();

module.exports = {
    PORT: process.env.PORT || 3000,
    MONGODB_URI: process.env.MONGODB_URI || 'mongodb+srv://saurabh:database123@database.hm7c7xk.mongodb.net/authdb',
    JWT_SECRET: process.env.JWT_SECRET || 'your-secret-key'
};