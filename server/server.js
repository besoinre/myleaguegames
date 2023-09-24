const express = require('express');
const app = express();
require('dotenv').config();

const leagueRoutes = require('./routes/routes'); 

app.use('/api', leagueRoutes);

const port = process.env.NODE_PORT || 3001;
app.listen(port, () => {
  console.log(`------------------------ Express Server is running on port ${port}`);
});