const express = require('express')
const app = express();
const path = require('path');
const hbs = require('hbs');
const bodyParser = require('body-parser');

require('./helpers')

const directoriopublico = path.join(__dirname,'../public');
const directoriopartials = path.join(__dirname,'../partials');
app.use(express.static(directoriopublico));
hbs.registerPartials(directoriopartials)
app.use(bodyParser.urlencoded({extended: false}))

app.set('view engine', 'hbs');

app.get('/',(req,res) =>{
	res.render('index', {
		bienvenida: 'tarea 2'
	});
});


app.get('/plantilla',(req,res) =>{
	res.render('plantilla', {
		bienvenida: 'tarea 2'
	});
});

app.get('/listar',(req,res) =>{
	res.render('listar', {
		titulo: 'Listado de cursos, para ver el detalle de un curso haga click en el Id',
		bienvenida: 'tarea 2'
	});
});

app.get('/listarcoor',(req,res) =>{
	res.render('listarcoor', {
		titulo: 'Listado de cursos, puede actualizar el estado del curso y ver los inscritos',
		bienvenida: 'tarea 2'
	});
});

app.get('/listarinsc',(req,res) =>{
	res.render('listarinsc', {
		id: req.query.id,
		titulo: 'Listado de inscritos por curso, puede actualizar el estado del curso y ver los inscritos',
		bienvenida: 'tarea 2'
	});
});


app.post('/calculos',(req,res) =>{

	//console.log(req.query);
	res.render('calculos', {
		estudiante: req.body.nombre,
		nota1: parseInt(req.body.nota1),
		nota2: parseInt(req.body.nota2),
		nota3: parseInt(req.body.nota3),
	});
});

app.get('/detalleCurso',(req,res) =>{

	//console.log(req.query);
	res.render('detalleCurso',{
		id: req.query.id,
		bienvenida: 'tarea 2'


	});
});

app.get('/cursos',(req,res) =>{

	//console.log(req.query);
	res.render('cursos',{
		bienvenida: 'tarea 2'
	});
});

app.post('/creaCurso',(req,res) =>{
	//console.log(req.query);
	res.render('creaCurso', {
		id: req.body.id,
		nombre: req.body.nombre,
		descripcion: req.body.descripcion,
		valor: parseInt(req.body.valor),
		modalidad: req.body.modalidad,
		horas: parseInt(req.body.horas),
		bienvenida: 'tarea 2'

		
	});
});

app.post('/creaInscripcion',(req,res) =>{
	res.render('creaInscripcion', {
		documento: req.body.documento,
		nombre: req.body.nombre,
		correo: req.body.correo,
		telefono: req.body.telefono,
		id: req.body.id,		
		bienvenida: 'tarea 2'

		
	});
});

app.get('/inscripcion',(req,res) =>{

	console.log("inscripcion  "+ req.query.id);
	res.render('inscripcion',{
		id: req.query.id,
		bienvenida: 'tarea 2'
	});
});


app.get('/cerrarCurso',(req,res) =>{
	res.render('cerrarCurso',{
		id: req.query.id,
		estado: req.query.estado,
		bienvenida: 'tarea 2'
	});
});

app.get('/eliminarinsc',(req,res) =>{

	console.log("4");
	console.log(req.query);
	
	res.render('eliminarinsc',{
		id: req.query.id,
		documento: req.query.documento,
		bienvenida: 'tarea 2'
	});
});


app.get('*',(req,res) =>{
	res.render('error', {
		bienvenida: 'ERROR'
	})
})



console.log(__dirname)
 

app.listen(3000,() => {
	console.log('Escuchando por el puerto 3000 ')
});