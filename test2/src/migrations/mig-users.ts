import { Sequelize } from 'sequelize-typescript';
import { User } from '../users/users.model';
import * as dotenv from 'dotenv';

dotenv.config();

const sequelize = new Sequelize({
  dialect: 'postgres',
  host: process.env.DB_HOST,
  port: parseInt(process.env.DB_PORT, 10),
  username: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
  models: [User],
});

async function generateUsers() {
    await sequelize.sync({ force: true });

    const batchSize = 10000;
    const totalUsers = 1000000;
  
    for (let i = 0; i < totalUsers; i += batchSize) {
      const users = [];
      for (let j = 0; j < batchSize && i + j < totalUsers; j++) {
        users.push({
          firstname: `FirstName${i + j}`,
          lastname: `LastName${i + j}`,
          age: Math.floor(Math.random() * 100),
          gender: Math.random() > 0.5 ? 'male' : 'female',
          problem: Math.random() > 0.5,
        });
      }
      await User.bulkCreate(users);
      console.log(`Inserted users ${i + 1} to ${i + users.length}`);
    }
  
    console.log('Database has been generated');
    await sequelize.close();
}

generateUsers();
