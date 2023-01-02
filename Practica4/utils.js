"use strict";

let listaTareas = [
    { text: "Preparar prácticas AW", tags: ["universidad", "awt"] },
    { text: "Mirar fechas congreso", done: true, tags: [] },
    { text: "Ir al supermercado", tags: ["personal", "básico"] },
    { text: "Jugar al fútbol", done: false, tags: ["personal", "deportes"] },
    { text: "Hablar con profesor", done: false, tags: ["universidad", "tp2"] }
];

//console.log("_________ GET_TO_DO_TASKS _________");

function getToDoTasks(tasks) {
    let tareasNoFinalizadas = tasks.filter(task => !task.done);
    let textoTareas = tareasNoFinalizadas.map(task => task.text);
    return textoTareas;
}

//console.log(getToDoTasks(listaTareas));


//console.log("__________ FIND_BY_TAG __________");

function findByTag(tasks, tag) {
    let tareasContienenTag = tasks.filter(task => task.tags.some(a => a === tag));
    return tareasContienenTag;

}

//console.log(findByTag(listaTareas, "personal"));

//console.log("__________ FIND_BY_TAGS __________");

function findByTags(tasks, tags) {
    let tareasContienenAlgunaTag = tasks.filter(task => task.tags.some(tag => tags.some(t => t === tag)));
    return tareasContienenAlgunaTag;
}

//console.log(findByTags(listaTareas, ["personal", "practica"]));

//console.log("__________ COUNT_DONE __________");

function countDone(tasks) {
    let numeroTareasCompletadas = tasks.reduce((ac, task) => { if (task.done) { ac += 1 } return ac }, 0);
    return numeroTareasCompletadas;
}

//console.log(countDone(listaTareas));

//console.log("__________ CREATE_TASK __________");

function createTask(texto) {
    let arrayTexto = texto.split(" ");
    let arrayText = arrayTexto.filter(t => !t.startsWith("@"));
    let text = arrayText.join(" ");
    let arrayTags = arrayTexto.filter(t => t.startsWith("@"));
    let tagsSinArroba = arrayTags.map(t => t.replace(/[@]/, ""));
    let tarea = new Object();
    tarea.text = text;
    tarea.done = false;
    tarea.tags = tagsSinArroba;
    return tarea;
}

//console.log(createTask("Ir al medico @personal @salud"));
//console.log(createTask("@universidad @practica Preparar prácticas TP"));
//console.log(createTask("Ir a @deporte entrenar"));

module.exports = {
    getToDoTasks: getToDoTasks,
    findByTag: findByTag,
    findByTags: findByTags,
    countDone: countDone,
    createTask: createTask
}