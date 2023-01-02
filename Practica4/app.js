const config = require("./config");
const DAOTasks = require("./DAOTasks");
const utils = require("./utils");
const path = require("path");
const mysql = require("mysql");
const express = require("express");
const bodyParser = require("body-parser");
const fs = require("fs");

// Crear un servidor Express.js
const app = express();

// Crear un pool de conexiones a la base de datos de MySQL
const pool = mysql.createPool(config.mysqlConfig);

// Crear una instancia de DAOTasks
const daoT = new DAOTasks(pool);

app.set("view engine", "ejs");

app.use(bodyParser.urlencoded({extended: false}));

// Middleware static
const ficherosEstaticos = path.join(__dirname, "public");
app.use(express.static(ficherosEstaticos));

app.get("/tasks", function(request, response) {
    daoT.getAllTasks("usuario@ucm.es", function(err, result){
        if (err) {
            console.log(err.message);
        } 
        else {
            response.render("tasks", { taskList : result });
        }
    });
});

app.post("/addTask", function(request, response) {
    if(request.body.textoAñadir === '') {
        response.redirect("/tasks");
        console.log("Tarea vacía");
    }
    else {
        let task = utils.createTask(request.body.textoAñadir);
        daoT.insertTask("usuario@ucm.es", task, function(err, result){
            if(err) {
                console.log(err.message);
            } 
            else {
                response.redirect("/tasks");
            }
        });
    }
});

app.get("/finish/:taskId", function(request, response) {
    daoT.markTaskDone(request.params.taskId, function(err, result) {
        if(err) {
            console.log(err.message);
        } 
        else {
            response.redirect("/tasks");
        }
    });
});

app.get("/deleteCompleted", function(request, response) {
    daoT.deleteCompleted("usuario@ucm.es", function(err, result) {
        if(err) {
            console.log(err.message);
        } 
        else {
            response.redirect("/tasks");
        }
    });
});

// Arrancar el servidor
app.listen(config.port, function(err) {
    if (err) {
        console.log("ERROR al iniciar el servidor");
    }
    else {
        console.log(`Servidor arrancado en el puerto ${config.port}`);
    }
});