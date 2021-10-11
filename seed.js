const Asignatura = require('./models/Asignatura');

const asignatura1 = {
    nombre: "Ciberseguridad",
    clave: "OII4220-1",
    descripcion: "Asignatura orientada a prepar estudiantes para conocer distintas formas de seguridad en sistemas de software"
}

const asignatura2 = {
    nombre: "Algebra Lineal",
    clave: "MAT2301-1",
    descripcion: "Asignatura matemática orientada a matrices y cálculo de algebra lineal"
}

const asignatura3 = {
    nombre: "Ingenieria de software",
    clave: "INF4223-1",
    descripcion: "Asignatura orientada a inculcar el proceso de desarrollo de software"
}

const asignatura4 = {
    nombre: "Estructura de datos",
    clave: "INF2341-1",
    descripcion: "Algoritmos avanzados de estructuras de datos"
}


Asignatura.create(asignatura1, (error, data) => {
    if (error) {
        console.log("no se guardó la info");
        console.log(error)
    } else {
        console.log('Informacion 1 cargada correctamente');
        console.log(data);
    }
});
Asignatura.create(asignatura2, (error, data) => {
    if (error) {
        console.log("no se guardó la info");
    } else {
        console.log('Informacion  2cargada correctamente');
        console.log(data);
    }
});
Asignatura.create(asignatura3, (error, data) => {
    if (error) {
        console.log("no se guardó la info");
    } else {
        console.log('Informacion 3 cargada correctamente');
        console.log(data);
    }
});
Asignatura.create(asignatura4, (error, data) => {
    if (error) {
        console.log("no se guardó la info");
    } else {
        console.log('Informacion 4 cargada correctamente');
        console.log(data);
    }
});
