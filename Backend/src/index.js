
// prueba de conecccion 
// import {getConnection} from './database/connection.js'
// getConnection()

import app from './app.js';
import { PORT } from "./config/config.js";

const port = PORT || 3000;
app.listen(port, () => {
  console.log(`Servidor corriendo en el puerto ${PORT}`);
  console.log(PORT);
});