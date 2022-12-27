

function calcularPromedioAlumnos () {
    let cantAlumnos = parseInt(prompt('Para calcular nota final, primero ingrese la cantidad de alumnos que desea calcular (MAXIMO 10)'));
    
    while (cantAlumnos > 10) {
        alert('Podes ingresar maximo 10 alumnos, por favor, ingrese menos');
        cantAlumnos = parseInt(prompt('Para calcular nota final, primero ingrese la cantidad de alumnos que desea calcular (MAXIMO 10)'));
    }

    var totalSumaNotas = 0;
    for (let i = 1; i <= cantAlumnos; i++) {
        let nombreAlumno = prompt('Ingresa el nombre del alumno ' + i);
        for (let n = 1; n <= 3; n++) {
            let notaAlumno = parseInt(prompt('Ingrese la nota ' + n + ' del alumno ' + nombreAlumno));
            if (notaAlumno > 0) {
                totalSumaNotas += notaAlumno;
            }
        }
        alert('El promedio del alumno ' + nombreAlumno + ' es ' + promedio(totalSumaNotas));
        totalSumaNotas = 0;
    }

    function promedio(total) {
        return total / 3;
    }
}


calcularPromedioAlumnos();