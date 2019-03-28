const fs = require ('fs');
listaEstudiantes = [];
listaCursos = [];
listaInscripcion = [];


const listarcursos = () => {

	try{
	listaCursos = require('../cursos.json');
	let disponibles = listaCursos.filter(buscar => buscar.estado == "disponible");
	return disponibles;
	} catch(error){
		listaCursos=[];
		return listaCursos;
	}

	//cuando el archivo varia de forma asincronica
	//listaEstudiantes = JSON.parse(fs.readFileSync('listado.json'));
}

const guardarcurso = () => {
	let datos = JSON.stringify(listaCursos);
	fs.writeFile('cursos.json', datos, (err)=>{
if (err) throw (err);
console.log('Archivo creado con exito')

	})
}

const guardarinscripcion = () => {
	let datos = JSON.stringify(listaInscripcion);
	fs.writeFile('inscritos.json', datos, (err)=>{
if (err) throw (err);
console.log('Archivo creado con exito')

	})
}

const crearcurso = (curso) => {
	listarcursos();
	let cur = {
		id: curso.id,
		nombre: curso.nombre,
		descripcion: curso.descripcion,
		valor: curso.valor,
		modalidad: curso.modalidad,
		horas: curso.horas,
		estado:curso.estado

	};

	let duplicado = listaCursos.find(cur=>cur.id == curso.id);
	if(!duplicado){
		listaCursos.push(cur);
		guardarcurso();
		return('El curso se guardo con exito ');
	}
	else
		return('Ya existe un curso con ese Id');
}

const mostrarcurso = (id) =>{
	listarcursos();
	let cur = listaCursos.find(buscar=>buscar.id == id);
	if(!cur){
		
		return ('no existe el curso');
		
	}
	else{
		return cur;
     }
}




const crear = (estudiante) => {
	listar();
	listarinscritos();
	let est = {
		documento: estudiante.documento,
		nombre: estudiante.nombre,
		correo: estudiante.correo,
		telefono: estudiante.telefono,
		id:estudiante.id
	};
	console.log(listaEstudiantes);
	let ins ={
			documento:estudiante.documento,
			id:estudiante.id
		};  
	let duplicado = listaEstudiantes.find(doc=>doc.documento == estudiante.documento);
	if(!duplicado){
		listaEstudiantes.push(est);
		guardar();
		listaInscripcion.push(ins);
		guardarinscripcion();
		texto="se creo el estudiante y la inscripcion";
		return(texto);//se creo 
	}else{
		let inscduplicado = listaInscripcion.find(buscar => (buscar.id == estudiante.id && buscar.documento == estudiante.documento));
		if(!inscduplicado){
			listaInscripcion.push(ins);
			guardarinscripcion();
			texto="se creo la inscripcion";
		}else{
			texto="Ya el estudiante esta inscrito en este curso";
		}

	}
		return(texto);//ya existe 
	
}

const listar = () => {
	try{
	listaEstudiantes = require('../estudiantes.json');
	} catch(error){
		listaEstudiantes=[];
	}

	//cuando el archivo varia de forma asincronica
	//listaEstudiantes = JSON.parse(fs.readFileSync('listado.json'));
}

const listarinscritos = () => {
	
	try{
	listaInscripcion = require('../inscritos.json');
	return listaInscripcion;
	} catch(error){
		listaInscripcion=[];
		return listaInscripcion;
	}

	//cuando el archivo varia de forma asincronica
	//listaEstudiantes = JSON.parse(fs.readFileSync('listado.json'));
}

const listarporcurso = (id) => {
	
	try{
	listarinscritos();
	let inscritos = listaInscripcion.filter(ins => ins.id == id);
	listar();
	listainscxcurso=[];
	inscritos.forEach(inscrito => {
		let est = listaEstudiantes.find(buscar=>buscar.documento == inscrito.documento);
		listainscxcurso.push(est);
	});

	return listainscxcurso;
	} catch(error){
		listainscxcurso=[];
		return listainscxcurso;
	}

	//cuando el archivo varia de forma asincronica
	//listaEstudiantes = JSON.parse(fs.readFileSync('listado.json'));
}





const listarcursoscoor = () => {

	try{
	listaCursos = require('../cursos.json');
	return listaCursos;
	} catch(error){
		listaCursos=[];
		return listaCursos;
	}

	//cuando el archivo varia de forma asincronica
	//listaEstudiantes = JSON.parse(fs.readFileSync('listado.json'));
}


const guardar = () => {
	let datos = JSON.stringify(listaEstudiantes);
	fs.writeFile('estudiantes.json', datos, (err)=>{
if (err) throw (err);
return('Se creo el estudiante Con exito')

	})
}

const suma = (nota1, nota2, nota3) => {
	sumar=nota1+nota2+nota3;
	return sumar;
}

const mostrar = () =>{
	listar()
	console.log ('Notas de los estudiantes ')
	listaEstudiantes.forEach(estudiante => {
		console.log (estudiante.nombre);
		console.log ('notas')
		console.log(' Matematicas ' + estudiante.matematicas)
		console.log(' Ingles ' + estudiante.ingles)
		console.log(' Programacion ' + estudiante.programacion + '\n')

	});

}

const mostrarest = (nom) =>{
	listar()
	
	let est = listaEstudiantes.find(buscar=>buscar.nombre == nom);
	if(!est){
		
		console.log('no existe ese estudiante');
		
	}
	else{
		console.log (est.nombre);
		console.log ('notas')
		console.log(' Matematicas ' + est.matematicas)
		console.log(' Ingles ' + est.ingles)
		console.log(' Programacion ' + est.programacion + '\n')
     }
}

const mostrarmat = () =>{
	listar()
	let ganan = listaEstudiantes.filter(mat => mat.matematicas >= 3);
	if(ganan.length == 0){
		console.log('ninguno saco mas de 3')
	}else{
		ganan.forEach(estudiante => {
		console.log (estudiante.nombre);
		console.log ('notas')
		console.log(' Matematicas ' + estudiante.matematicas)
		

	});

	}
}

const mostrarpromtop = () =>{
	listar()
	let ganan = listaEstudiantes.filter(mat => (mat.matematicas+mat.ingles+mat.programacion)/3 >= 3);
	if(ganan.length == 0){
		console.log('ninguno saco un promedio por encima de 3')
	}else{
		ganan.forEach(estudiante => {
		console.log (estudiante.nombre);
		console.log ('Promedio de estudiantes Top')
		console.log(' Promedio ' + (estudiante.matematicas+estudiante.ingles+estudiante.programacion)/3)
		

	});

	}
}

const promedio = (nom) =>{
	listar()
	let est = listaEstudiantes.find(buscar=>buscar.nombre == nom);
	if(!est){
		
		console.log('no existe ese estudiante');
		
	}
	else{
		console.log (est.nombre);
		console.log ('Promedio')
		console.log(' Matematicas ' + est.matematicas)
		console.log(' Ingles ' + est.ingles)
		console.log(' Programacion ' + est.programacion )
		console.log(' El promedio es: ' + (est.programacion+est.matematicas+est.ingles)/3 + '\n\n')
     }
}

const actualizar = (nom,asignatura,calificacion)=>{
	listar()

	let encontrado = listaEstudiantes.find(buscar=>buscar.nombre == nom);
	if(!encontrado){ 
		console.log('estudiante no existe ')
	}else{
		encontrado[asignatura] = calificacion;
		guardar()
	}
}



const cerrarcurso = (id, estado)=>{
	listarcursoscoor()
	nombrecampo="estado";
	let encontrado = listaCursos.find(buscar=>buscar.id == id);
	console.log("funcion cerrarcurso ");
	console.log(encontrado);

	if(!encontrado){ 
		return("curso no existe ")
	}else{
		encontrado[nombrecampo] = estado;
		console.log(encontrado);
		guardarcurso();
		return ("Se cerro el curso con exito");
	}
}



const eliminarinscrito = (id,documento)=>{
	listarinscritos();
	let eliminados = listaInscripcion.filter(buscar => !(buscar.id == id && buscar.documento == documento));
	if(eliminados.length == listaInscripcion.length){
		return('no existe el aspirante');
	}else{
		listaInscripcion=eliminados;
		guardarinscripcion();
		return('Se elimino el aspirante');
	};
}



const eliminar = (nom) => {
	listar()
	let nuevo = listaEstudiantes.filter(mat => mat.nombre != nom);
	if(nuevo.length == listaEstudiantes.length){
		console.log('no existe el estudiante')
	}else{
		listaEstudiantes=nuevo;
		guardar()
		

	};
}


module.exports = {
	crear,
	mostrar,
	mostrarest,
	mostrarmat,
	promedio,
	mostrarpromtop, 
	actualizar,
	eliminar,
	suma,
	crearcurso,
	listarcursos,
	mostrarcurso,
	listarcursoscoor,
	listarinscritos,
	listarporcurso,
	cerrarcurso,
	eliminarinscrito 
}