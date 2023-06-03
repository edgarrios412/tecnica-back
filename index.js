const server = require('./src/app.js');
const { conn } = require('./src/db.js');
const {swaggerDocs} = require("./src/swagger.js")
const PORT = process.env.PORT || 4000;
const {Genre} = require ("./src/db.js")

// Syncing all the models at once.
conn.sync({alter: true }).then(() => {
  Genre.findOrCreate({
    where: { id: 1 },
    defaults: { name: 'Accion' }
  });
   Genre.findOrCreate({
    where: { id: 2 },
    defaults: { name: 'Comedia' }
  });
   Genre.findOrCreate({
    where: { id: 3 },
    defaults: { name: 'Romance' }
  });
   Genre.findOrCreate({
    where: { id: 4 },
    defaults: { name: 'Adultos' }
  });
  server.listen(PORT, () => {
    console.log('Server listening on port '+ PORT); // eslint-disable-line no-console
    swaggerDocs(server, PORT)
  });
});
