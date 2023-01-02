"use strict";

const mysql = require("mysql");
const config = require("./config");
const DAOUsers = require("./DAOUsers");
const DAOTasks = require("./DAOTasks");

// Crear el pool de conexiones
const pool = mysql.createPool({
    host: config.host,
    user: config.user,
    password: config.password,
    database: config.database
});

let daoUser = new DAOUsers(pool);
let daoTask = new DAOTasks(pool);

// Definición de las funciones callback
// Uso de los métodos de las clases DAOUsers y DAOTasks

daoUser.isUserCorrect("usuario@ucm.es", "mipass", cb_isUserCorrect);

function cb_isUserCorrect(err, result){
    console.log("------ IS_USER_CORRECT ------");
    if (err) {
        console.log(err.message);
    } 
    else if (result) {
        console.log("Usuario y contraseña correctos");
    } 
    else {
        console.log("Usuario y/o contraseña incorrectos");
    }
}

daoUser.getUserImageName("felipe.lotas@ucm.es", cb_getUserImageName);

function cb_getUserImageName(err, result){
    console.log("------ GET_USER_IMAGE_NAME ------");
    if (err) {
        console.log(err.message);
    } 
    else if (result) {
        console.log(result);
    }
}

daoTask.getAllTasks("steve.curros@ucm.es", cb_getAllTasks);

function cb_getAllTasks(err, result){
    console.log("------ GET_ALL_TASKS ------");
    if (err) {
        console.log(err.message);
    } 
    else if (result) {
        console.log(result);
    } 
}

//let task = { text: "Hacer práctica", done: false, tags: ["AW", "Pr3"] };

let task = { text:"Tarea nueva", done:false, tags:["mog"]};

daoTask.insertTask("aitor.tilla@ucm.es", task, cb_insertTask);

function cb_insertTask(err){
    console.log("------ INSERT_TASK ------");
    if (err) {
        console.log(err.message);
    }
}

daoTask.markTaskDone(3, cb_markTaskDone);

function cb_markTaskDone(err){
    console.log("------ MARK_TASK_DONE ------");
    if (err) {
        console.log(err.message);
    }
}

daoTask.deleteCompleted("bill.puertas@ucm.es", cb_deleteCompleted);

function cb_deleteCompleted(err){
    console.log("------ DELETE_COMPLETED ------");
    if (err) {
        console.log(err.message);
    }
}
