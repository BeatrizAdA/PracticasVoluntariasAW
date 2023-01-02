"use strict";

class DAOTasks {

    constructor(pool) {
        this.pool = pool;
    }

    getAllTasks(email, callback) {
        this.pool.getConnection(function(err, connection) {
            if (err) { 
                callback(new Error("Error de conexión a la base de datos"));
            }
            else {
                connection.query("SELECT t.IdTarea, t.texto, ut.hecho, e.texto AS textoEtiqueta FROM aw_tareas_usuarios u JOIN aw_tareas_user_tareas ut ON (u.IdUser = ut.idUser) JOIN aw_tareas_tareas t ON (ut.idTarea = t.IdTarea) JOIN aw_tareas_tareas_etiquetas te ON (t.IdTarea = te.IdTarea) JOIN aw_tareas_etiquetas e ON (te.idEtiqueta = e.IdEtiqueta) WHERE email = ?" , [email],
                function(err, rows) {
                    connection.release(); // devolver al pool la conexión
                    if (err) {
                        callback(new Error("Error de acceso a la base de datos"));
                    }
                    else {
                        if (rows.length === 0) {
                            callback(null, false);
                        }
                        else {
                            var tareas = new Array();
                            let id;
                            var tarea;
                            
                            rows.forEach(element => {
                                if(id !== element.IdTarea){
                                    id = element.IdTarea;
                                    tarea = new Object();
                                    tarea.id = element.IdTarea;
                                    tarea.text = element.texto;
                                    tarea.done = element.hecho;
                                    tarea.tags = new Array();
                                    tarea.tags.push(element.textoEtiqueta);
                                    tareas.push(tarea);
                                }
                                else {
                                    tarea.tags.push(element.textoEtiqueta);
                                }
                            });

                            callback(null, tareas);
                        } 
                    }
                });
            }
        });  
    }

    insertTask(email, task, callback) {
        this.pool.getConnection(function(err, connection) {
            if (err) { 
                callback(new Error("Error de conexión a la base de datos"));
            }
            else {
                connection.query("INSERT INTO aw_tareas_tareas (texto) VALUES (?)" , [task.text],
                function(err, rows1) {
                    connection.release(); // devolver al pool la conexión
                    if (err) {
                        callback(new Error("Error de acceso a la base de datos"));
                    }
                    else{
                        connection.query("SELECT IdUser FROM aw_tareas_usuarios WHERE email = ?" , [email],
                        function(err, rows2) {
                            if (err) {
                                callback(new Error("Error de acceso a la base de datos"));
                            }
                            else{
                                connection.query("INSERT INTO aw_tareas_user_tareas VALUES (?, ?, ?)" , [rows2[0].IdUser, rows1.insertId, task.done],
                                function(err, rows3) {
                                    if (err) {
                                        callback(new Error("Error de acceso a la base de datos"));
                                    }
                                    else{
                                        task.tags.forEach(element => {
                                            connection.query("SELECT IdEtiqueta FROM aw_tareas_etiquetas WHERE texto = ?" , [element],
                                            function(err, rows4) {
                                                if (err) {
                                                    callback(new Error("Error de acceso a la base de datos"));
                                                }
                                                else{
                                                    if (rows4.length === 0) {
                                                        connection.query("INSERT INTO aw_tareas_etiquetas (texto) VALUES (?)" , [element],
                                                        function(err, rows5) {
                                                            if (err) {
                                                                callback(new Error("Error de acceso a la base de datos"));
                                                            }
                                                            else{
                                                                connection.query("INSERT INTO aw_tareas_tareas_etiquetas VALUES (?, ?)" , [rows1.insertId, rows5.insertId],
                                                                function(err, rows6) {
                                                                    if (err) {
                                                                        callback(new Error("Error de acceso a la base de datos"));
                                                                    }
                                                                });
                                                            }
                                                        });
                                                    }
                                                    else{
                                                        connection.query("INSERT INTO aw_tareas_tareas_etiquetas VALUES (?, ?)" , [rows1.insertId, rows4[0].IdEtiqueta],
                                                        function(err, rows6) {
                                                            if (err) {
                                                                callback(new Error("Error de acceso a la base de datos"));
                                                            }
                                                        });
                                                    }
                                                }
                                            });
                                        });
                                    }
                                });
                            }
                        });
                    }
                });
            }
        });
    }

    markTaskDone(idTask, callback) {
        this.pool.getConnection(function(err, connection) {
            if (err) { 
                callback(new Error("Error de conexión a la base de datos"));
            }
            else {
                connection.query("UPDATE aw_tareas_user_tareas SET hecho = true WHERE idTarea = ?" , [idTask],
                function(err, rows) {
                    connection.release(); // devolver al pool la conexión
                    if (err) {
                        callback(new Error("Error de acceso a la base de datos"));
                    }
                });
            }
        });
    }

    deleteCompleted(email, callback) {
        this.pool.getConnection(function(err, connection) {
            if (err) { 
                callback(new Error("Error de conexión a la base de datos"));
            }
            else {
                connection.query("SELECT IdUser FROM aw_tareas_usuarios WHERE email = ?" , [email],
                function(err, rows1) {
                    connection.release(); // devolver al pool la conexión
                    if (err) {
                        callback(new Error("Error de acceso a la base de datos"));
                    }
                    else {
                        connection.query("DELETE FROM aw_tareas_user_tareas WHERE idUser = ? AND hecho = true" , [rows1[0].IdUser],
                        function(err, rows2) {
                            if (err) {
                                callback(new Error("Error de acceso a la base de datos"));
                            }
                        });
                    }
                });
            }
        });
    }

}

module.exports = DAOTasks;
