//etiquetas del HTML
const cajaAgregarTarea = document.querySelector(".agregar-tarea");
const listaDeTareas = document.querySelector(".lista-tareas");
const mostrarDia = document.querySelector(".dia-actual");
const mostrarHora = document.querySelector(".hora-actual");
const simboloAgregar = document.querySelector("#agrega");

let tareasGuardadas = [];

//crear para agregar a HTML

//funciones
function agregarTarea() {
	let tarea = document.createElement("li");
	tarea.textContent = cajaAgregarTarea.value;
	tarea.setAttribute("class", "tareas");
	tarea.setAttribute("data-id", Date.now().toString());

	const svg = document.createElementNS("http://www.w3.org/2000/svg", "svg");
	svg.setAttribute("viewBox", "0 0 448 512");
	svg.setAttribute("id", "borrar");
	svg.addEventListener("click", borrarTarea);
	const path = document.createElementNS("http://www.w3.org/2000/svg", "path");
	path.setAttribute(
		"d",
		"M32 464a48 48 0 0 0 48 48h288a48 48 0 0 0 48-48V128H32zm272-256a16 16 0 0 1 32 0v224a16 16 0 0 1-32 0zm-96 0a16 16 0 0 1 32 0v224a16 16 0 0 1-32 0zm-96 0a16 16 0 0 1 32 0v224a16 16 0 0 1-32 0zM432 32H312l-9.4-18.7A24 24 0 0 0 281.1 0H166.8a23.72 23.72 0 0 0-21.4 13.3L136 32H16A16 16 0 0 0 0 48v32a16 16 0 0 0 16 16h416a16 16 0 0 0 16-16V48a16 16 0 0 0-16-16z"
	);
	svg.appendChild(path);
	tarea.appendChild(svg);

	listaDeTareas.appendChild(tarea);
	cajaAgregarTarea.focus();
	cajaAgregarTarea.value = "";
	tarea.addEventListener("click", function () {
		event.currentTarget.classList.toggle("tachar");
	});

	tareasGuardadas.push(tarea.textContent);
	localStorage.setItem("listaTareas1", JSON.stringify(tareasGuardadas));
}

function borrarTarea(event) {
	const tarea = event.target.closest("li");
	const tareaId = tarea.getAttribute("data-id");
	let indice = tareasGuardadas.indexOf(tarea.textContent);
	if (indice !== -1) {
		tareasGuardadas.splice(indice, 1);
		localStorage.setItem("listaTareas1", JSON.stringify(tareasGuardadas));
		tarea.parentNode.removeChild(tarea);
	}
	localStorage.removeItem(tareaId);
	tarea.remove();
}

//configuracion para mostrar dia, mes, año, hora, minutos y segundos
const diasDeLaSemana = ["DOMINGO", "LUNES", "MARTES", "MIERCOLES", "JUEVES", "VIERNES", "SABADO"];
const meses = ["ENE", "FEB", "MAR", "ABR", "MAY", "JUN", "JUL", "AGO", "SEP", "OCT", "NOV", "DIC"];

function mostrarDiaYHora() {
	let diaActual = new Date();

	let anho = diaActual.getFullYear();
	let mes = meses[diaActual.getMonth()];
	let dia = diaActual.getDate();
	let diaSemana = diasDeLaSemana[diaActual.getDay()];

	let hora = diaActual.getHours();
	let minutos = diaActual.getMinutes();
	let segundos = diaActual.getSeconds();

	function formatear(dato) {
		if (dato < 10) {
			return (dato = "0" + dato);
		}
		return dato;
	}

	mostrarDia.textContent = `${diaSemana} ${dia} de ${mes}, ${anho}`;
	mostrarHora.textContent = `${formatear(hora)}:${formatear(minutos)}:${formatear(segundos)}`;
}

let tiempoLive = setInterval(mostrarDiaYHora, 1000);
mostrarDiaYHora();

// funcion para cargar tareas guardadas de localStorage cliente
function cargarTareas() {
	let tareasGuardadasCliente = localStorage.getItem("listaTareas1");
	if (tareasGuardadasCliente !== null) {
		tareasGuardadas = JSON.parse(tareasGuardadasCliente);
		for (let i = 0; i < tareasGuardadas.length; i++) {
			let tarea = document.createElement("li");
			tarea.textContent = tareasGuardadas[i];
			tarea.setAttribute("class", "tareas");
			listaDeTareas.appendChild(tarea);

			const svg = document.createElementNS("http://www.w3.org/2000/svg", "svg");
			svg.setAttribute("viewBox", "0 0 448 512");
			svg.setAttribute("id", "borrar");
			svg.addEventListener("click", borrarTarea);
			const path = document.createElementNS("http://www.w3.org/2000/svg", "path");
			path.setAttribute(
				"d",
				"M32 464a48 48 0 0 0 48 48h288a48 48 0 0 0 48-48V128H32zm272-256a16 16 0 0 1 32 0v224a16 16 0 0 1-32 0zm-96 0a16 16 0 0 1 32 0v224a16 16 0 0 1-32 0zm-96 0a16 16 0 0 1 32 0v224a16 16 0 0 1-32 0zM432 32H312l-9.4-18.7A24 24 0 0 0 281.1 0H166.8a23.72 23.72 0 0 0-21.4 13.3L136 32H16A16 16 0 0 0 0 48v32a16 16 0 0 0 16 16h416a16 16 0 0 0 16-16V48a16 16 0 0 0-16-16z"
			);
			svg.appendChild(path);
			tarea.appendChild(svg);

			tarea.addEventListener("click", function () {
				event.currentTarget.classList.toggle("tachar");
			});
		}
	}
}

//Escucha eventos
cajaAgregarTarea.addEventListener("keypress", function (event) {
	if (event.key === "Enter") {
		agregarTarea();
	}
});
simboloAgregar.addEventListener("click", agregarTarea);

//cargar de cliente
cargarTareas();
