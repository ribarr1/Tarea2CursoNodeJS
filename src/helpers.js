const hbs = require('hbs');
const funciones = require('./funciones');


hbs.registerHelper('obtenerPromedio', (nota1, nota2,nota3) =>{
	return (nota1+nota2+nota3)/3
});

hbs.registerHelper('cerrarCurso', (id,estado) =>{

	resp=funciones.cerrarcurso(id,estado);
	return resp;
});


hbs.registerHelper('eliminarAspirante', (id,documento) =>{

	resp=funciones.eliminarinscrito(id,documento);
	return resp;
});


hbs.registerHelper('detalleCurso', (id) =>{

	curso = funciones.mostrarcurso(id);
	if(curso=="no existe el curso")
		return curso;
	else{
		texto = `
					<table class="table table-bordered table-condensed" >
				<div class="col-xs-3"> 	
				  <tr align="right"> 
				    <td><label> Id: </label></td>
				    <td align="left"> <label>`+ curso.id +`</label></td>
				  </tr>
				  
				  <tr align="right">
				    <td><label>* Nombre:  </label></td>
				    <td align="left"> <label>`+ curso.nombre +`</label></td>
				  </tr>
				  <tr align="right">
				    <td><label>* Descripcion:  </label></td>
				    <td align="left"> <label>`+ curso.descripcion +`</label></td>
				  </tr>
				  <tr align="right">
				    <td><label>* Valor:  </label></td>
				    <td align="left"> <label>`+ curso.valor +`</label></td>
				  </tr>
				  <tr align="right">
				    <td ><label>Modalidad:  </label></td>
				    <td align="left"> <label>`+ curso.modalidad +`</label></td>
				  </tr>
				  <tr align="right">
				    <td><label>Duracion en horas:  </label></td>
				    <td align="left"> <label>`+ curso.horas +`</label></td>
				  </tr> 
				  <tr >
				    <td align="right"><label>Estado:  </label></td>
				    <td align="left"> <label  >`+ curso.estado +`</label></td>
				  </tr> 
				</table>

				
				<br> <br>

  	 <input type ='button'  class="btn-primary" value = '<-- Volver' onclick="window.open('http://localhost:3000/listar', 'width=800,height=600');"/> 
  	 <input type ='button' class="btn-primary" value = 'Inscribirse -->' onclick="window.open('http://localhost:3000/inscripcion?id=`+curso.id+`', 'width=800,height=600');"/> 

  	 </div>`;


	}
	return texto;
});

hbs.registerHelper('listaCursos', () =>{
	
	lista=funciones.listarcursos();


	let texto = "<table class='table table-striped table-bordered'> \
	<thead class='thead-dark'>\
	<th>Id</th>\
	<th>Nombre</th>\
	<th>descripcion</th>\
	<th>Valor</th>\
	</thead>\
	<tbody>";

	lista.forEach(cursos=>{
		texto+='<tr>' +
				 '<td> <a href=\'http://localhost:3000/detallecurso?id='+cursos.id+'\'>' + cursos.id + '</a> </td>' +
				'<td>' + cursos.nombre + '</td>' +
				'<td>' + cursos.descripcion + '</td>' +
				'<td>' + cursos.valor + '</td>' +
				'</tr>';
	})
	texto+='</tbody> </table>';
	return texto;
});

hbs.registerHelper('listaCursoscoor', () =>{
	
	lista=funciones.listarcursoscoor();

    cerrado = "cerrado";
	let texto = "<table class='table table-striped table-bordered'> \
	<thead class='thead-dark'>\
	<th>Ver inscritos</th>\
	<th>Nombre</th>\
	<th>descripcion</th>\
	<th>Valor</th>\
	<th>Estado</th>\
	<th>Actualiza</th>\
	</thead>\
	<tbody>";

	lista.forEach(cursos=>{
		texto+='<tr>' +
				 '<td> <a href=\'http://localhost:3000/listarinsc?id='+cursos.id+'\'>ver</a> </td>' +
				'<td>' + cursos.nombre + '</td>' +
				'<td>' + cursos.descripcion + '</td>' +
				'<td>' + cursos.valor + '</td>' +
				'<td>' + cursos.estado + '</td>' ;

			if (cursos.estado!="cerrado"){
				texto+='<td> <a href=\'http://localhost:3000/cerrarCurso?estado='+cerrado+'&id='+cursos.id+'\'>Cerrar Curso</a> </td>';
				
			}
	})

	texto+='</tr></tbody> </table>';

	return texto;
});



hbs.registerHelper('listarPorCurso', (id) =>{
	lista=funciones.listarporcurso(id);


	let texto = "<table class='table table-striped table-bordered'> \
	<thead class='thead-dark'>\
	<th>Documento</th>\
	<th>nombre</th>\
	<th>correo</th>\
	<th>telefono</th>\
	<th>Eliminar</th>\
	</thead>\
	<tbody>";

	lista.forEach(inscritos=>{
		texto+='<tr>' +
				'<td>' + inscritos.documento + '</td>' +
				'<td>' + inscritos.nombre + '</td>' +
				'<td>' + inscritos.correo + '</td>' +
				'<td>' + inscritos.telefono + '</td>' +
				'<td> <a href=\'http://localhost:3000/eliminarinsc?id='+id+'&documento='+inscritos.documento+'\'>eliminar</a> </td>' +
				'</tr>';
	})
	texto+='</tbody> </table>';
	return texto;
});





hbs.registerHelper('crearCurso', (id, nombre,descripcion,valor,modalidad,horas) =>{

	let curso = {
	id: id,
	nombre: nombre,
	descripcion: descripcion,
	valor: valor,
	modalidad: modalidad,
	horas: horas,
	estado:"disponible"
	
};
	
	console.log(curso);

	resp=funciones.crearcurso(curso);

	return resp;
});

hbs.registerHelper('crearInscripcion', (documento, nombre,correo,telefono,id) =>{

	let inscripcion = {
		documento: documento,
		nombre: nombre,
		correo: correo,
		telefono: telefono,
		id: id		
	};
	resp=funciones.crear(inscripcion);
	return resp;
});