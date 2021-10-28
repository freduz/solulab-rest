const app = require('./app');

const server = app.listen(process.env.PORT, () => {
  console.log(`Listening on port ${process.env.PORT}`);
});

process.on('unhandledRejection', (err) => {
  console.log('Application shutting down..🔥');
  server.close(() => {
    process.exit(1);
  });
});

process.on('uncaughtException', (err) => {
  console.log('Application shutting down..🔥');
  server.close(() => {
    process.exit(1);
  });
});
