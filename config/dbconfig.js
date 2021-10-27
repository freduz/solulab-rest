const mongoose = require('mongoose');

module.exports = async (req, res, next) => {
  try {
    const conn = await mongoose.connect(process.env.DATABASE_LOCAL, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log(`Database connected on ${conn.connection.host}`);
  } catch (err) {
    console.log(err);
    process.exit(1);
  }
};
