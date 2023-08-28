const mainHTML = document.querySelector('#main');
const cardDataContainer = document.querySelector('#carCardContainer');
const encavesadosDeVista = document.querySelector('#encavesadosDeVista');

const importBooton = document.querySelector('.importBooton');
const tramiteBooton = document.querySelector('.tramiteBooton');
const ventaBooton = document.querySelector('.ventaBooton');
const vendidosBooton = document.querySelector('.vendidosBooton');
const BuscadoresVin = document.querySelectorAll('.buscadorVin');


let arrayVehiculos = [];
let vehiculoEnUso;

const fechaActual = new Date();

const anio = fechaActual.getFullYear();
const mes = fechaActual.getMonth() + 1; // sumamos 1 ya que los meses empiezan en 0
const dia = fechaActual.getDate();
const hora = fechaActual.getHours();
const minutos = fechaActual.getMinutes();
const segundos = fechaActual.getSeconds();
const milisegundos = fechaActual.getMilliseconds();

//console.log(`${dia}/${mes}/${anio} ${hora}:${minutos}:${segundos}`);

const fechaDeRegistro = `${dia} / ${mes} / ${anio}`;

class Carro {
    constructor(vin,fechaIngreso,marca,modelo,precioCompra,comprobantes,status='Importando') {
        this.vin = vin;
        this.fechaIngreso = fechaIngreso;
        this.marca = marca;
        this.modelo = modelo;
        this.precioCompra = precioCompra;
        this.comprobantes = comprobantes;
        this.status = status;

        this.reparaciones = [];
        this.placas = null;
        this.tituloCarro = null;
        this.tarjetaCirculacion = null;
        this.registro = null;
        this.pagoImpuesto = null;

        this.precioVenta = null;
        this.facturaVenta = null;
        this.nitCliente = null;
        this.dpiCliente = null;
        this.documentoCompraventa = null;

    }
    mostrarCarInfo() {
        
        let informacionVehiculo = `
                            <section id="vistaInfoStatus">
								<h3>STATUS DEL VEHICULO</h3>
								<form method="post" action="#">
									<div class="row gtr-uniform">
	
	
										<div class="col-4">
											<select name="demo-category" id="registroMarca">
                                            	<option value="${this.status}">${this.status}</option>
												<option value="Importando">Importando</option>
												<option value="Pre-Venta">Pre-Venta</option>
												<option value="En Venta">En Venta</option>
												<option value="Vendido">Vendido</option>
											</select>
										</div>
										
										<div class="col-12">
											<ul class="actions">
												<li><a id="editarBTNStatus"  class="button icon solid fa-save">guardar</a></li>
											</ul>
										</div>
									</div>
								</form>
							</section>

							<hr />

							<section id="vistaInfoBasica">
								<h3>INFORMACIÓN BÁSICA</h3>
								<form method="post" action="#">
									<div class="row gtr-uniform">
	
										<div class="col-4">
											<i>Código VIN:</i> <br>
											<b>${this.vin}</b>	
										</div>
										<div class="col-4">
											<i>Marca:</i> <br>
											<b>${this.marca}</b>
										</div>
										<div class="col-4">
											<i>Modelo:</i> <br>
											<b>${this.modelo}</b>
										</div>
										<div class="col-4">
											<i>Precio de Compra:</i> <br>
											<b>Q. ${this.precioCompra}</b>
										</div>
										<div class="col-4">
											<i>Fecha de Ingreso:</i> <br>
											<b>${this.fechaIngreso}</b>
										</div>
										<div class="col-6 col-12-xsmall">
											<i>Facturas de compraventa:</i> <br>
											<ul class="actions">
												<li><a  class="button icon solid fa-download">Documento 1</a></li>
												<li><a  class="button icon solid fa-download">Documento 2</a></li>
											</ul>
										</div>
										
										<div class="col-12">
											<ul class="actions">
												<li><input type="reset" class="editarBTNbasico"  value="EDITAR" /></li>
											</ul>
										</div>
									</div>
								</form>
							</section>
	
							<hr />

							<section id="vistaInfoLegal">
								<h3>INFORMACIÓN LEGAL</h3>
								<form method="post" action="#">
									<div class="row gtr-uniform">
	
										<div class="col-4">
											<i>No. Placas:</i> <br>
											<b>${this.placas}</b>
										</div>
										<div class="col-4">
											<i>Documento de Titulo de Propiedad:</i> <br>
											<ul class="actions">
												<li><a  class="button icon solid fa-download">TITULO DE PROPIEDAD</a></li>
											</ul>
										</div>
										<div class="col-4">
											<i>Documento Tarjeta de circulación:</i> <br>
											<ul class="actions">
												<li><a  class="button icon solid fa-download">TARJETA DE CIRCULACIÓN</a></li>
											</ul>
										</div>
										<div class="col-4">
											<i>Documento Impuesto de circulación:</i> <br>
											<ul class="actions">
												<li><a  class="button icon solid fa-download">IMPUESTO DE CIRCULACIÓN</a></li>
											</ul>
										</div>
										<div class="col-4">
											<i>Documento de registro:</i> <br>
											<ul class="actions">
												<li><a  class="button icon solid fa-download">REGISTRO</a></li>
											</ul>
										</div>

										<div class="col-12">
											<ul class="actions">
												<li><input type="reset" class="editarBTNLegal" value="EDITAR" /></li>
											</ul>
										</div>
									</div>
								</form>
							</section>

							<hr />

							<section id="vistaInfoTaller">
								<h3>FACTURAS</h3>
								<form method="post" action="#">
									<div class="row gtr-uniform">
	
										<div class="col-4">
											<input type="text" name="demo-name" id="registroDescripcion" value="" placeholder="DESCRIPCIÓN DE FACTURA" />
										</div>
										<div class="col-4">
											<input type="text" name="demo-name" id="registroMonto" value="" placeholder="MONTO TOTAL" />
										</div>

										<div class="col-12">
											<ul class="actions">
												<li><input type="reset" id="editarBTNTaller" value="AÑADIR" /></li>
											</ul>
										</div>

									</div>
								</form>

								<div class="table-wrapper">
									<table class="alt">
										<thead>
											<tr>
												<th>DESCRIPCIÓN DE LA FACTURA</th>
												<th>MONTO TOTAL</th>
											</tr>
										</thead>
										<tbody id="elementostablaAñadirTaller">
										</tbody>
										<tfoot>
										</tfoot>
									</table>
								</div>

							</section>

							<hr />

							<section id="vistaInfoVenta">
								<h3>INFORMACIÓN DE VENTA</h3>
								<form method="post" action="#">
									<div class="row gtr-uniform">
	
										<div class="col-4">
											<i>Precio de Venta:</i> <br>
											<b>Q. ${this.precioVenta}</b>
										</div>
										<div class="col-4">
											<i>NIT Cliente:</i> <br>
											<b>${this.nitCliente}</b>
										</div>
										<div class="col-4">
											<i>DPI Cliente:</i> <br>
											<b>${this.dpiCliente}</b>
										</div>

										<div class="col-6 col-12-xsmall">
											<i>Documento de compraventa:</i> <br>
											<ul class="actions">
												<li><a  class="button icon solid fa-download">DOCUMENTO DE COMPRAVENTA</a></li>
											</ul>
										</div>
										
										<div class="col-12">
											<ul class="actions">
												<li><input type="reset" id="editarBTNVenta" value="EDITAR" /></li>
											</ul>
										</div>
									</div>
								</form>
							</section>
							<hr />
	
										<ul class="actions">
											<li><a class="button large" id="registroConfirmarBTN">ELIMINAR INFORMACIÓN DEL VEHICULO</a></li>
											<li><a class="button disabled" id="registroCancelarBTN">CONFIRMAR</a></li>
										</ul>`;

         encavesadosDeVista.innerHTML=informacionVehiculo;

         const vistaInfoStatus = document.querySelector('#vistaInfoStatus'); // aun no se usa CONSIDERAR BORRAR
         const editarBTNvistaInfoStatus = document.querySelector('#editarBTNStatus');

         const vistaInfoBasica = document.querySelector('#vistaInfoBasica');
         const editarBTNvistaInfoBasica = document.querySelector('.editarBTNbasico');

         const vistaInfoLegal = document.querySelector('#vistaInfoLegal');
         const editarBTNLegal = document.querySelector('.editarBTNLegal');

         const vistaInfoTaller = document.querySelector('#vistaInfoTaller'); // aun no se usa CONSIDERAR BORRAR
         const editarBTNTaller = document.querySelector('#editarBTNTaller');
         const registroDescripcion = document.querySelector('#registroDescripcion');
         const registroMonto = document.querySelector('#registroMonto');
		 const elementostablaAñadirTaller = document.querySelector('#elementostablaAñadirTaller');

         const vistaInfoVenta = document.querySelector('#vistaInfoVenta');
         const editarBTNVenta = document.querySelector('#editarBTNVenta');

		 const agregarRegistrosDeTaller = ()=> {
			if(vehiculoEnUso.reparaciones.length === 0){console.log('No Hay Registros');return};

			vehiculoEnUso.reparaciones.forEach((x,index)=>{
				let registroTaller = `
					<tr>
						<td>${x[0]}</td>
						<td>${x[1]}</td>
					</tr>`
				elementostablaAñadirTaller.innerHTML += registroTaller;
							
			})
		 }
		 agregarRegistrosDeTaller();

         const actualizarInfoStatus = () => {
			const statusInput = document.querySelector('#registroMarca');
			vehiculoEnUso.status = statusInput.value;
		 };
         const actualizarInfoBasica = () => {
            let editableDeInfoBasica = `
                                <h3>INFORMACIÓN BÁSICA</h3>
								<form method="post" action="#">
									<div class="row gtr-uniform">
	
										<div class="col-12-xsmall">
											<i>Código VIN:</i> <br>
											<input type="text" name="demo-name" id="actualizarVin" value="" placeholder="${this.vin}" />	
										</div>
										<div class="col-4">
											<i>Marca:</i> <br>
											<select name="demo-category" id="actualizarMarca">
												<option value="${this.marca}">${this.marca}</option>
												<option value="Toyota">Toyota</option>
												<option value="Nissan">Nissan</option>
												<option value="Mazda">Mazda</option>
												<option value="BMW">BMW</option>
											</select>
										</div>
										<div class="col-4">
											<i>Modelo:</i>
											<input type="text" name="demo-name" id="actualizarModelo" value="" placeholder="${this.modelo}" />
										</div>
										<div class="col-4">
											<i>Precio de compra:</i>
											<input type="text" name="demo-name" id="actualizarPrecioCompra" value="" placeholder="${this.precioCompra}" />
										</div>
	
										<div class="col-4">
											<i>Fecha de Ingreso:</i>
												<input type="text" name="demo-name" id="actualizarFechaIngreso" value="" placeholder="${this.fechaIngreso}" />
											</select>
										</div>
										<div class="col-6 col-12-xsmall">
											<i>Facturas de compraventa</i>
											<ul class="actions">
												<li><a href="#" class="button icon solid fa-upload">Documento 1</a></li>
												<li><a href="#" class="button icon solid fa-upload">Documento 2</a></li>
											</ul>
										</div>
										
										<div class="col-12">
											<ul class="actions">
												<li><a id="guardarEditarBasico" class="button icon solid fa-save">Guardar</a></li>
												<li><input type="reset" id="cancelarEditarBasico" value="Cancelar" /></li>
											</ul>
										</div>
									</div>
								</form> `

            vistaInfoBasica.innerHTML = editableDeInfoBasica;
            const actualizarVin = document.querySelector('#actualizarVin');
            const actualizarMarca = document.querySelector('#actualizarMarca');
            const actualizarModelo = document.querySelector('#actualizarModelo');
            const actualizarPrecioCompra = document.querySelector('#actualizarPrecioCompra');
            const actualizarFechaIngreso = document.querySelector('#actualizarFechaIngreso');

            const guardarEditarBasico = document.querySelector('#guardarEditarBasico');
            const cancelarEditarBasico = document.querySelector('#cancelarEditarBasico');

            guardarEditarBasico.addEventListener('click', ()=>{
                vehiculoEnUso.vin = actualizarVin.value;
                vehiculoEnUso.marca = actualizarMarca.value;
                vehiculoEnUso.modelo = actualizarModelo.value;
                vehiculoEnUso.precioCompra = actualizarPrecioCompra.value;
                vehiculoEnUso.fechaIngreso = actualizarFechaIngreso.value;
                 vehiculoEnUso.mostrarCarInfo()});

            cancelarEditarBasico.addEventListener('click', ()=>{vehiculoEnUso.mostrarCarInfo()});
         };
         const actualizarInfoLegal = () => {

            let editableInfoLegal = `
			<section id="vistaInfoLegal">
			<h3>INFORMACIÓN LEGAL</h3>
			<form method="post" action="#">
				<div class="row gtr-uniform">

					<div class="col-4">
						<i>No. Placas:</i> <br>
						<input type="text" name="demo-name" id="actualizarPlacas" value="" placeholder="No.Placas" />
					</div>
					<div class="col-4">
						<i>Documento de Titulo de Propiedad:</i> <br>
						<ul class="actions">
							<li><a  class="button icon solid fa-upload">TITULO DE PROPIEDAD</a></li>
						</ul>
					</div>
					<div class="col-4">
						<i>Documento Tarjeta de circulación:</i> <br>
						<ul class="actions">
							<li><a  class="button icon solid fa-upload">TARJETA DE CIRCULACIÓN</a></li>
						</ul>
					</div>
					<div class="col-4">
						<i>Documento Impuesto de circulación:</i> <br>
						<ul class="actions">
							<li><a  class="button icon solid fa-upload">IMPUESTO DE CIRCULACIÓN</a></li>
						</ul>
					</div>
					<div class="col-4">
						<i>Documento de registro:</i> <br>
						<ul class="actions">
							<li><a  class="button icon solid fa-upload">REGISTRO</a></li>
						</ul>
					</div>

					<div class="col-12">
						<ul class="actions">
							<li><a id="guardarEditarLegal" class="button icon solid fa-save">Guardar</a></li>
							<li><input type="reset" id="cancelarEditarLegal" value="Cancelar" /></li>
						</ul>
					</div>
				</div>
			</form>
		</section>`
		vistaInfoLegal.innerHTML = editableInfoLegal;
		const actualizarPlacas = document.querySelector('#actualizarPlacas');
		const cancelarEditarLegal = document.querySelector('#cancelarEditarLegal');
		const guardarEditarLegal = document.querySelector('#guardarEditarLegal');

		cancelarEditarLegal.addEventListener('click', ()=>{vehiculoEnUso.mostrarCarInfo()})
		guardarEditarLegal.addEventListener('click', ()=>{

			vehiculoEnUso.placas = actualizarPlacas.value;
			vehiculoEnUso.mostrarCarInfo();
		})
			
         };
         const actualizarInfoTaller = () => {
			let descripcionTaller = registroDescripcion.value
			let montoTaller = registroMonto.value;

			vehiculoEnUso.reparaciones.push([descripcionTaller,montoTaller]);

			let registroTaller = `
					<tr>
						<td>${descripcionTaller}</td>
						<td>${montoTaller}</td>
					</tr>`

			elementostablaAñadirTaller.innerHTML += registroTaller;
         };
         const actualizarInfoVenta = () => {
            let editableInfoVentas = `
            				<section>
								<h3>INFORMACIÓN DE VENTA</h3>
								<form method="post" action="#">
									<div class="row gtr-uniform">
										<div class="col-4">

										<i>Precio de Venta:</i>
										<input type="text" name="demo-name" id="actualizarPrecioVenta" value="" placeholder="PRECIO DE VENTA" />
										</div>

										<div class="col-4">
											<i>NIT Cliente:</i>
											<input type="text" name="demo-name" id="actualizarNIT" value="" placeholder="NIT CLIENTE" />
										</div>

										<div class="col-4">
											<i>DPI Cliente:</i>
											<input type="text" name="demo-name" id="actualizarDPI" value="" placeholder="DPI CLIENTE" />
										</div>

										<div class="col-6 col-12-xsmall">
											<ul class="actions">
												<li><a href="#" class="button icon solid fa-upload">Documento 1</a></li>
											</ul>
										</div>
										
										<div class="col-12">
											<ul class="actions">
											<li><a id="guardarEditarVenta" class="button icon solid fa-save">Guardar</a></li>
											<li><input type="reset" id="cancelarEditarVenta" value="Cancelar" /></li>
											</ul>
										</div>
									</div>
								</form>
							</section>`
			vistaInfoVenta.innerHTML = editableInfoVentas;
			
			const actualizarPrecioVenta = document.querySelector('#actualizarPrecioVenta');
			const actualizarNIT = document.querySelector('#actualizarNIT');
			const actualizarDPI = document.querySelector('#actualizarDPI');
			const cancelarEditarVenta = document.querySelector('#cancelarEditarVenta');
			const guardarEditarVenta = document.querySelector('#guardarEditarVenta');

			cancelarEditarVenta.addEventListener('click', ()=>{vehiculoEnUso.mostrarCarInfo()});
			guardarEditarVenta.addEventListener('click', ()=>{
				vehiculoEnUso.precioVenta = actualizarPrecioVenta.value;
				vehiculoEnUso.nitCliente = actualizarNIT.value;
				vehiculoEnUso.dpiCliente = actualizarDPI.value;

				vehiculoEnUso.mostrarCarInfo();
			})
         };

		 editarBTNvistaInfoStatus.addEventListener('click', actualizarInfoStatus);
         editarBTNvistaInfoBasica.addEventListener('click',actualizarInfoBasica);
		 editarBTNLegal.addEventListener('click', actualizarInfoLegal);
		 editarBTNTaller.addEventListener('click', actualizarInfoTaller);
		 editarBTNVenta.addEventListener('click', actualizarInfoVenta);
         
    };

    generarCarCard() {
        
        let card = `
            <article class="carCard">
                <header>
                    <time class="published" datetime="${this.fechaIngreso}">Ingresó - ${this.fechaIngreso}</time>
                    <a href="#" class="author"><span class="name">${this.marca}</span><img src="images/toyota.png" alt=""/></a>
                    <h3>VIN - ${this.vin}</h3>
                </header>
                <main>
                    <p>Status - ${this.status} </p>
                    <p>Modelo - ${this.modelo} </p>
                    <p>Placa - </p>
                </main>
                <footer>
                    <a class="button small fit modificarVehiculoInfoBTN">VER DETTALLES</a>
                </footer>
            </article>`
        cardDataContainer.innerHTML += card;

    };
    
}

const prepararEventosModificarBTN = ()=> {
    
    let modificarVehiculoInfoBTN = document.querySelectorAll('.modificarVehiculoInfoBTN');
    modificarVehiculoInfoBTN.forEach((x,index)=>{
        x.addEventListener('click', (e)=>{buscarVehiculo(e.target);});
        x.addEventListener('click', () => {window.scrollTo({ top: 0, behavior: 'smooth' });});
            
    });
}

const buscarVehiculo = (elemento)=> {
    console.log(arrayVehiculos);
    if(typeof(elemento) === 'object') {

        let vehiculoEncontrado;
        textoVIN = elemento.parentElement.parentElement.children[0].children[2].innerHTML;
        vin = textoVIN.split(' ');
        vehiculoEnUso = arrayVehiculos.find((e) => e.vin === vin[2]);
        vehiculoEnUso.mostrarCarInfo();

    }else if(typeof(elemento)==='string') {

        encavesadosDeVista.innerHTML = `
        <h3>RESULTADOS DE BUSQUEDA</h3>
        <hr />`;
    
        cardDataContainer.innerHTML = '';

        const vehiculosCoincidentes = arrayVehiculos.filter((el) => el.vin.includes(elemento));
        vehiculosCoincidentes.forEach((x,index)=>{
            x.generarCarCard();
        })
        prepararEventosModificarBTN()
    }
}
const añadirListenerSearch = () => {
    
    BuscadoresVin.forEach((x,index) => {
        x.addEventListener('submit', (e)=> {
            e.preventDefault();
            buscarVehiculo(e.target.children[0].value)
        });
    });
}
añadirListenerSearch();



const nuevoVehiculoForm = ()=> {
    let formularioVehiculo = `
                        <section>
							<h3>Nuevo Vehiculo</h3>
							<form method="post" action="#">
								<div class="row gtr-uniform">

									<div class="col-6 col-12-xsmall">
										<i>Código VIN:</i> <br>
										<input type="text" name="demo-name" id="registroVIN" value="" placeholder="VIN" />
									</div>
									<div class="col-6 col-12-xsmall">
										<i>Modelo:</i> <br>
										<input type="text" name="demo-name" id="registroModelo" value="" placeholder="Modelo" />
									</div>
									<div class="col-6 col-12-xsmall">
										<i>Precio de compra:</i> <br>
										<input type="text" name="demo-name" id="registroPreciocompra" value="" placeholder="Precio de compra" />
									</div>
									<div class="col-6 col-12-xsmall">
										<i>Fecha de Ingreso:</i> <br>
										<input type="text" name="demo-name" id="registroFechaIngreso" value="${fechaDeRegistro}" placeholder="${fechaDeRegistro}" />
									</div>

									<div class="col-6 col-12-xsmall">
										<i>Marca:</i> <br>
										<select name="demo-category" id="registroMarca">
											<option value="">Marca</option>
											<option value="Toyota">Toyota</option>
											<option value="Nissan">Nissan</option>
											<option value="Mazda">Mazda</option>
											<option value="BMW">BMW</option>
										</select>
									</div>
									<div class="col-6 col-12-xsmall">
										<i>Comprobantes:</i> <br>
										<ul class="actions">
											<li><a href="#" class="button icon solid fa-upload">Documento 1</a></li>
											<li><a href="#" class="button icon solid fa-upload">Documento 2</a></li>
										</ul>
									</div>
									
									<div class="col-12">
										<ul class="actions">
											<li><input type="reset" id="registroAñadirLista" value="Añadir Vehiculo" /></li>
											<li><input type="reset" value="Reset" /></li>
										</ul>
									</div>
								</div>
							</form>
						</section>

                        <hr />

                        <div class="table-wrapper">
							<table class="alt">
								<thead>
									<tr>
										<th>VIN</th>
										<th>Modelo</th>
										<th>Marca</th>
										<th>Fecha Ingreso</th>
										<th>Documentos</th>
										<th>Precio de compra</th>
									</tr>
								</thead>
								<tbody id="elementostablaAñadir">
                                                       
								</tbody>
								<tfoot>
								</tfoot>
							</table>
						</div>

                        <hr />

                        <ul class="actions">
										<li><a class="button large" id="registroConfirmarBTN">Confirmar Datos de los Vehiculos</a></li>
										<li><a href="#" class="button" id="registroCancelarBTN">Cancelar</a></li>
									</ul>`

    encavesadosDeVista.innerHTML = formularioVehiculo;
    cardDataContainer.innerHTML = ''; 

    let registroVIN = document.querySelector('#registroVIN');
    let registroModelo = document.querySelector('#registroModelo'); 
    let registroPreciocompra = document.querySelector('#registroPreciocompra'); 
    // falta registrar los documentos
    let registroFechaIngreso = document.querySelector('#registroFechaIngreso');  
    let registroMarca = document.querySelector('#registroMarca');

    let registroAñadirLista = document.querySelector('#registroAñadirLista');
    let tabla = document.querySelector('#elementostablaAñadir');

    let registroConfirmarBTN = document.querySelector('#registroConfirmarBTN');
    let registroCancelarBTN = document.querySelector('#registroCancelarBTN');

    let arrayNuevosVehiculos = [];

    registroAñadirLista.addEventListener('click', ()=> { 
        let tablaItem = `
									<tr>
										<td>${registroVIN.value}</td>
										<td>${registroModelo.value}</td>
										<td>${registroMarca.value}</td>
										<td>${registroFechaIngreso.value}</td>
										<td> Doc1,Doc2</td>
										<td>${registroPreciocompra.value}</td>
									</tr>`
        arrayNuevosVehiculos.push([registroVIN.value,registroFechaIngreso.value,registroMarca.value,registroModelo.value,registroPreciocompra.value,'Doc1,Doc2'])
        tabla.innerHTML += tablaItem;
    })

    registroCancelarBTN.addEventListener('click', interfaceImpot);

    registroConfirmarBTN.addEventListener('click', ()=> {
        if(arrayNuevosVehiculos.length === 0) {
            alert('Aun no se registra ningun vehiculo')
        } else {
            arrayNuevosVehiculos.forEach((vehiculo,index) => {
                let nuevoVehic = new Carro(vehiculo[0],vehiculo[1],vehiculo[2],vehiculo[3],vehiculo[4],vehiculo[5]);
                arrayVehiculos.push(nuevoVehic);
            })
            encavesadosDeVista.innerHTML += `<h4> Registrando . . . </h4>`

            setTimeout(() => {
                interfaceImpot()
				window.scrollTo({ top: 0, behavior: 'smooth' });
            }, 1000);
        }
    });

}
const interfaceImpot = ()=> {

    encavesadosDeVista.innerHTML = `
        <h3>VEHICULOS EN IMPORTACIÓN</h3>
        <a  id="nuevoVehiculoBtn" class="button large">+ NUEVO VEHICULO</a>
        <hr />						
    `;
    let nuevoVehiculoBtn = document.querySelector('#nuevoVehiculoBtn');
    nuevoVehiculoBtn.addEventListener('click', nuevoVehiculoForm);

    cardDataContainer.innerHTML = '';
    arrayVehiculos.forEach((x,index) => {
        if(x.status === 'Importando') {
            x.generarCarCard();
        }
    })

    prepararEventosModificarBTN()
}
const interfacePreVenta = ()=> {
    encavesadosDeVista.innerHTML = `
    <h3>VEHICULOS EN TRAMITE - TALLER</h3>
    <hr />					
    `;
    cardDataContainer.innerHTML = '';
    arrayVehiculos.forEach((x,index) => {
        if(x.status === 'Pre-Venta') {
            x.generarCarCard();
        }
    })

    prepararEventosModificarBTN()

}
const interfaceVenta = ()=> {
    encavesadosDeVista.innerHTML = `
    <h3>VEHICULOS EN VENTA</h3>
    <hr />`;
    cardDataContainer.innerHTML = '';
    arrayVehiculos.forEach((x,index) => {
        if(x.status === 'En Venta') {
            x.generarCarCard();
        }
    })

    prepararEventosModificarBTN()
}
const interfaceVendidos = ()=> {
    encavesadosDeVista.innerHTML = `
    <h3>VEHICULOS VENDIDOS</h3>
    <hr />`;
    cardDataContainer.innerHTML = '';
    arrayVehiculos.forEach((x,index) => {
        if(x.status === 'Vendido') {
            x.generarCarCard();
        }
    })

    prepararEventosModificarBTN()
}
importBooton.addEventListener('click', interfaceImpot);
tramiteBooton.addEventListener('click', interfacePreVenta);
ventaBooton.addEventListener('click', interfaceVenta);
vendidosBooton.addEventListener('click',interfaceVendidos);

// ####################### Informes
const graficaImportVent = () => {
const ctx = document.getElementById('myChart');

const labels = ['Enero', 'Febrero', 'Marzo', 'Abril', 'Mayo', 'Junio', 'Julio','Agosto','Septiembre','Octubre','Noviembre','Diciembre'];
const DATA_COUNT = labels.length;
const NUMBER_CFG = {count: DATA_COUNT, min: -100, max: 100};

const data = {
  labels: labels,
  datasets: [
    {
      label: 'Vehiculos Ingresados',
      data: Array.from({length: DATA_COUNT}, () => Math.random() * 200 - 100),
      borderColor: 'rgba(255, 99, 132, 1)',
      backgroundColor: 'rgba(255, 99, 132, 0.5)',
    },
    {
      label: 'Vehiculos Vendidos',
      data: Array.from({length: DATA_COUNT}, () => Math.random() * 200 - 100),
      borderColor: 'rgba(54, 162, 235, 1)',
      backgroundColor: 'rgba(54, 162, 235, 0.5)',
    }
  ]
};

const config = {
  type: 'line',
  data: data,
  options: {
    responsive: true,
    plugins: {
      legend: {
        position: 'top',
      },
      title: {
        display: true,
        text: 'Resumen de movimientos'
      }
    }
  },
};
let myChart = new Chart(ctx, config);
}
graficaImportVent()
//--------------
const graficaBeneficios = () => {
	const ctx = document.getElementById('myChartC');

	const DATA_COUNT = 2;
        const NUMBER_CFG = { count: DATA_COUNT, min: 0, max: 100 };

        const data = {
            labels: ['Gastos', 'Total de Ventas',],
            datasets: [
                {
                    label: 'Gastos',
                    data: [50, 75], // Aquí puedes colocar los valores que desees
                    backgroundColor: ['#cc2936', '#08415c'], // Colores personalizados
                },
            ],
			
        };
	
		const config = {
			type: 'pie',
			data: data,
			options: {
			  responsive: true,
			  plugins: {
				legend: {
				  position: 'top',
				},
				title: {
				  display: true,
				  text: 'Balance'
				}
			  }
			},
		  };
		  let myChart = new Chart(ctx, config);
}
graficaBeneficios()
//------------------------
const graficaMarcas = () => {
	const ctx = document.getElementById('myChartM');

	const DATA_COUNT = 5;
	const NUMBER_CFG = {count: DATA_COUNT, min: 0, max: 100};

	const labels = ['Toyota', 'Mazda', 'Nissan', 'Audi', 'VolksWagen'];
	const data = {
		labels: labels,
		datasets: [
			{
				label: 'Toyota',
				data: Array.from({ length: DATA_COUNT }, () => Math.floor(Math.random() * (NUMBER_CFG.max - NUMBER_CFG.min + 1)) + NUMBER_CFG.min),
				backgroundColor: [
					'rgba(255, 99, 132, 0.5)',
					'rgba(255, 159, 64, 0.5)',
					'rgba(255, 205, 86, 0.5)',
					'rgba(75, 192, 192, 0.5)',
					'rgba(54, 162, 235, 0.5)',
				],
			},
		],
	};

		const config = {
			type: 'polarArea',
			data: data,
			options: {
			  responsive: true,
			  scales: {
				r: {
				  pointLabels: {
					display: true,
					centerPointLabels: true,
					font: {
					  size: 18
					}
				  }
				}
			  },
			  plugins: {
				legend: {
				  position: 'top',
				},
				title: {
				  display: true,
				  text: 'Marcas más vendidas'
				}
			  }
			},
		  };
	
		  let myChart = new Chart(ctx, config);
}
graficaMarcas()

