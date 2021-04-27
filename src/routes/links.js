const express = require('express');
const router = express.Router();

const pool = require('../database');


router.get('/add', (req, res) => {
    res.render('links/add');
});

router.post("/add", async (req, res) => {//aca vamos a poner, donde subis datos a la base de datos
    const {nombre, raza, datosadicionales, ubicacion} = req.body; //guardas los datos que recive el servidor, en una constante
    const newLink = { //en la linea de codigo anterior, creamos 4 constante, una por cada secion (nombre, raza, ubicacion, y descripcion), y aca estoy juntanto todos los datos, en una sola constante, llamada NEWLINK
        nombre,
        raza,
        datosadicionales,
        ubicacion
    };
    await pool.query("INSERT INTO publicaciones set ?", [newLink]); //POOL es nuestra conexion, por eso va al principio, y despues hago una consulta a mysql, INSERT INTO y el nombre de la tabla, en  la cual quiero almacenar los datos, SET significa que quiero establecer un dato nuevo, y el "?", significa que te voy a pasar el dato a continuacion, por eso le paso el objeto NEWLINKS, el cual tiene todos los datos almacenados
    res.redirect("/links"); //cuando te sale esto, despues de dar el boton de save, significa, que el servidor recibio la informacion, que ousiste en el input
}); //para insertar las publicaciones

router.get("/", async (req, res) => {
    const links = await pool.query("SELECT * FROM publicaciones"); //lo que hago aca, es cuando ponga /links, le muestre todas las publicaciones, como muestro lo que hay en  la base de datos, lo hago con SELECT * FROM y el nombre de la base de datos. asi muestro todo lo que hay dentro de la tabla de publicaciones. Todo esto va devolver enlaces, asi que guardo todo estos enlaces, en la constante LINKS
    res.render("links/list", {links});

});

router.get("/delete/:id", async (req, res) => { //aca vamos a borrar unapublicacion, cuando en la url diga/delete/id(la id, va ser la id de la publicacion que querramos borrar)
    const {id} = req.params; //que solo quiero el ID, asi que pongo en una constante el ID, el cual lo saco de la URL
    await pool.query("DELETE * FROM publicaciones WHERE ID = ?", [ID]);//POOL.QUERY, es para hacer una consulta a la base de datos... despues de empezar la conexion, DELETE(etc), significa elimina desde la tabla PUBLICACIONES, donde el ID se igual a lo que te voy a pasar a continuacion, y le pasamos el ID de la URL(osea, elimina el mismo ID de la URL, en la base de datos, si el ID que hay en la URL  es 4, elimina el ID 4 de la base de datos)
    res.redirect("/links");
});

router.get("/edit/:id", async (req, res) => {
    const {id} = req.params;
    const links = await pool.query("SELECT * FROM publicaciones WHERE id = ?", [id]); //despues de empezar la conexion, SELECT(etc), sleciona lo que hay en la tabla PUBLICACIONES, donde el ID se igual a lo que te voy a pasar a continuacion, y le pasamos el ID de la URL(osea, SELECIONA todo lo que hay en la columna del el mismo ID de la URL, en la base de datos, si el ID que hay en la URL  es 4, elimina el ID 4 de la base de datos)
    res.render("links/edit", {link: links[0]}); //aca voy a redirecionar a una nueva pestaña para poder editar los datos, pero lo que se va a mostrar en esta pestaña, son los anteriores datos, los cuales queres modificar(ej: pusiste mal el nombre de tu perro, cuando lo edites, te va a parecer el nombre que le posiste[el cual estaba mal], y lo vas a poder modificar), LINKS[0], es la constante llamada LINKS, ls ual guarde los datos del ID, que quiero mostrar
});
router.post("/edit/:id", async (req, res) => {
    const {id} = req.params;
    const {nombre, raza, datosadicionales, ubicacion} = req.body;
    const newLink = { 
        nombre,
        raza,
        datosadicionales,
        ubicacion
    };
    await pool.query("UPDATE publicaciones set ? WHERE id = ?", [newLink, id]); //actualiza desde la tabla PUBLICAIONES, los siguientes datos que te voy a dar, en donde el ID(de la base de datos) se igual al que te voy a pasar(esto es un arreglo con 2 datos), entre los corchetes, va la constante NEWLINKS(el cual tiene todos los datos que quiero actualizar) y el ID, el cual le quiero actualizar los datos que tiene adentro
    res.redirect("/links");//para que vea el dato actualizado
});

module.exports = router;