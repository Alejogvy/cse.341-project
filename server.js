const express = require('express');
const app = express();

const port = process.env.PORT || 3000;

app.use('/', require('./routes/index')); // Asegúrate de que la ruta es correcta

app.listen(port, () => {
    console.log(`Running on port ${port}`);
});
