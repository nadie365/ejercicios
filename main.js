const formulario= document.querySelector('#formulario')
const cardsEstudiantes= document.querySelector('#cardEstudiantes')
const cardsProfesores= document.querySelector('#cardsProfesores')
const TemplateEstudiante= document.querySelector('#TemplateEstudiante').content
const Templateprofesor= document.querySelector('#Templateprofesor').content


const estudiantes = []
const profesores = []



class Persona{
    constructor(nombre, edad){
        this.nombre =  nombre
        this.edad = edad

    }
    static pintarPersonaUI(personas, tipo){
        if(tipo === "Estudiante"){
            cardsEstudiantes.textContent = "";
            const fragment = document.createDocumentFragment()

            personas.forEach(item =>{
                fragment.appendChild(item.agregarNuevoEstudiante())
            });
            cardsEstudiantes.appendChild(fragment);
        }
        if(tipo === "Profesor"){
            cardsProfesores.textContent = "";
            const fragment = document.createDocumentFragment()

            personas.forEach(item =>{
                fragment.appendChild(item.agregarNuevoProfesor())
            });
            cardsProfesores.appendChild(fragment);
        }

    }
}

class Estudiante extends Persona{
    #estado = false
    #estudiante =  "Estudiante"

    set setEstado(estado){
        this.#estado = estado
    }

    get getEstudiante(){
        return this.#estudiante
    }
    agregarNuevoEstudiante(){
        const clone= TemplateEstudiante.cloneNode(true)
        clone.querySelector('h5 .text-primary').textContent =  this.nombre

        return clone
    }
}

class Profesor extends Persona{
    #profesor = "Persona"

    agregarNuevoProfesor(){
        const clone = Templateprofesor.cloneNode(true)
        clone.querySelector('h5').textContent= this.nombre
        clone.querySelector('h6').textContent= this.#profesor
        clone.querySelector('.lead').textContent = this.edad
        return clone
    }
}

formulario.addEventListener('submit', e => {
    e.preventDefault();

    const datos = new FormData(formulario);
    // datos.forEach(item => console.log(item));
    const [nombre, edad, opcion] = [...datos.values()]
    // console.log(nombre, edad, opcion)
    if (opcion == "Estudiante") {

        const estudiante = new Estudiante(nombre, edad)
        estudiantes.push(estudiante)
        Persona.pintarPersonaUI(estudiantes,opcion)
    }
    if (opcion === "Profesor") {
        const profesor = new Profesor(nombre, edad)
        profesores.push(profesor)
        Persona.pintarPersonaUI(profesores, opcion)

    }
});
