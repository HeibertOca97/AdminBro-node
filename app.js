const express = require('express');
const app = express();

//Invocar la conexion DB
const conexion = require('./database/db');
conexion.once('open', () => console.log('Conexion exitosa a MongoDB'));
conexion.on('error', error => console.log("Error de conexion: " + error));

//AdminBro
const AdminBro = require('admin-bro');
const expressAdminBro = require('@admin-bro/express');
const mongooseAdminBro = require('@admin-bro/mongoose');

//Models
const User = require('./models/User');
const Post = require('./models/Post');

AdminBro.registerAdapter(mongooseAdminBro);
const AdminBroOptions = { resources: [User, Post] };
const admin_Bro = new AdminBro(AdminBroOptions);
const router = expressAdminBro.buildRouter(admin_Bro);

app.use(admin_Bro.options.rootPath, router);

app.get('/', (req, res) => {
    res.send("Dashboard con node!");
});

app.listen(5000, () => {
    console.log("Server UP! OK en http://localhost:5000/admin");
});