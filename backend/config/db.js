const mongoose = require('mongoose');
const dns = require('dns');

// Override local DNS to fix SRV lookup on restrictive networks
try {
    dns.setServers(['8.8.8.8', '8.8.4.4']);
} catch (error) {
    console.error('Failed to set DNS servers:', error.message);
}

const connectDB = async () => {
    try {
        const conn = await mongoose.connect(process.env.MONGO_URI);
        console.log(`MongoDB Connected: ${conn.connection.host}`);
    } catch (error) {
        console.error(`Error: ${error.message}`);
        process.exit(1);
    }
};

module.exports = connectDB;
