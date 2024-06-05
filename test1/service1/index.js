const express = require('express');
const axios = require('axios');
const { sequelize, User } = require('./models/index');

require('dotenv').config();

const PORT = process.env.SERVER1_PORT;

const app = express();
app.use(express.json());

app.post('/users', async (req, res) => {
  try {
    const user = await User.create(req.body);
    console.log("api-key:", process.env.API_KEY);
    await axios.post(`${process.env.HISTORY_SERVICE_URL}/history`,
      { action: 'create', userId: user.id },
      { headers: {'api-key': process.env.API_KEY}}
    );
    res.status(201).json(user);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

app.put('/users/:id', async (req, res) => {
  try {
    const user = await User.findByPk(req.params.id);
    if (user) {
      await user.update(req.body);
      console.log("api-key:", process.env.API_KEY);
      await axios.post(`${process.env.HISTORY_SERVICE_URL}/history`, 
        { action: 'update', userId: user.id },
        { headers: {'api-key': process.env.API_KEY}}
      );
      res.json(user);
    } else {
      res.status(404).json({ error: 'User not found' });
    }
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

app.get('/users', async (req, res) => {
  try {
    const users = await User.findAll();
    res.json(users);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

sequelize.sync().then(() => {
  app.listen(PORT, () => {
    console.log(`User service is running on port ${PORT}`);
  });
});
