const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const SuperAdmin = require('./models/superAdmin');
const dotenv=require('dotenv')

dotenv.config();

const generateId = (username) => {
    const randomDigits = Math.floor(1000 + Math.random() * 9000); 
    return `${username}-${randomDigits}`;
  };
  


const seedSuperAdmin = async () => {
    try {
        await mongoose.connect(process.env.MONGO_URl)
        .then(() => {
            console.log('Connected to the database');
          })
          .catch((err) => {
            console.error('Database connection error:', err);
          });
        

        const existingSuperAdmin = await SuperAdmin.findOne({ username: 'superadmin123' });
        if (!existingSuperAdmin) {
            const hashedPassword = await bcrypt.hash('superadmin@123', 10);
            const superAdmin = new SuperAdmin({
                super_admin_id: generateId('superadmin'),
                username: 'superadmin123',
                password: hashedPassword
            });
            await superAdmin.save();
            console.log('SuperAdmin seeded successfully');
        } else {
            console.log('SuperAdmin already exists');
        }
        await mongoose.disconnect();
    } catch (error) {
        console.error('Error seeding SuperAdmin:', error);
    }
};

seedSuperAdmin();
