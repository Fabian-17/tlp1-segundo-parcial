const obtenerDatos = async () => {
    // Pedir las reservas al servidor
    const data = await fetch('http://localhost:4000/api', {
        method: 'GET'
    });
    const reservas = await data.json();
    return reservas;
}


const mostrarReservas = (reservas, tablaElement) => {
let registros = '';
reservas.forEach(reserva => {
    registros += `
        <tr>
            <td>${reserva.nombre}</td>
            <td>${reserva.apellido}</td>
            <td>${dayjs(reserva.fecha).format('YYYY-MM-DD HH:mm')}</td>
            <td>${reserva.email}</td>
            <td>${reserva.telefono}</td>
            <td>
           <div class="gap-1">
           <a href="/reserva/editar/${reserva.id}" class="btn btn-m btn-warning fa-regular fa-pen-to-square"></a>
           <button class="btn btn-m btn-danger fa-solid fa-trash" data-id="${reserva.id}" onClick=eliminarReserva(event)></button>
           </div>
            </td>
        </tr>
    `
})

tablaElement.innerHTML = registros;

}


const eliminarReserva = async (e) => {

console.log(e)
const id = e.target.dataset.id;

    // Se pregunta al usuario si está seguro de eliminar la reserva
    const result = await Swal.fire({
        title: '¿Está seguro de eliminar la reserva?',
        text: "Esta acción no se puede deshacer",
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#d33',
        cancelButtonColor: '#3085d6',
        confirmButtonText: 'Eliminar',
        cancelButtonText: 'Cancelar'
    })

    if (!result.isConfirmed) {
        return;
    }

const response = await fetch(`/api/${id}`,{
    method: 'DELETE',
})

const data = await response.json();

if (response.status !== 200) {
    Swal.fire({
        title: 'Error',
        text: data.message,
        icon: 'error',
        confirmButtonText: 'Aceptar'
    })
}

Swal.fire({
    title: 'Reserva eliminada',
    text: data.message,
    icon: 'success',
    confirmButtonText: 'Aceptar'
})

setTimeout(() => {
    // Redireccionar al usuario
    window.location.href = "/"
}, 2000);

}



document.addEventListener('DOMContentLoaded', async () => {
// Mostrar las reservas en la tabla
const tbody = document.querySelector('#listadoReservas');
const reservas = await obtenerDatos() // undefined si no obtenerDatos no retorna nada
mostrarReservas(reservas, tbody)

});