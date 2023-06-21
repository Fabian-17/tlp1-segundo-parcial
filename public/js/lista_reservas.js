const listadoReservas = document.querySelector('#listadoReservas');

const obtenerReservas = async () => {
    const res = await fetch('http://localhost:4000/api/reserva', {
        headers: {
            'Authorization': localStorage.getItem('token')
        }
    });

    if(res.status === 404 ) {
        return [];
    }

    const data = await res.json();
    return data;
}

const eliminarReserva = async (event) => {
    const id = event.target.dataset.id;

    try {
        const res = await fetch(`http://localhost:4000/api/reserva/${id}`, {
            method: 'DELETE'
        });

        const data = await res.json();

        console.log(data);

        Swal.fire({
            icon: 'success',
            title: 'Reserva eliminada',
            text: data.message,
        });
        
        setTimeout(() => {
            window.location.reload();
        }, 2200);

    } catch (error) {
        console.log(error);
        Swal.fire({
            icon: 'error',
            title: 'Oops...',
            text: error.message,
        })
    }

}

const mostrarReservas = (reservas) => {


    if(reservas.length === 0){
        listadoreservas.innerHTML = `
            <tr>
                <td colspan="3" class="text-center">No hay reservas registradas</td>
            </tr>
        `;
        return;
    };

    reservas.forEach(reserva => {
        listadoreservas.innerHTML += `
                    <tr>
                        <td>${reserva.titulo}</td>
                        <td>${reserva.descripcion}</td>
                        <td>
                            <button onclick=eliminarreserva(event) class="btn btn-danger btn-sm" data-id="${reserva.id}">Eliminar</button>
                            <a href="/reserva/editar/${reserva.id}" class="btn btn-warning btn-sm">Editar</a>
                        </td>
                    </tr>
                `;
    });
}


document.addEventListener('DOMContentLoaded', async () => {

    console.log('DOM cargado')


    try {
        const reservas = await obtenerReservas();     
        mostrarReservas(reservas);
    } catch (error) {  
        console.log({ error });


        Swal.fire({
            icon: 'error',
            title: 'Oops...',
            text: error.message,
        });
    }
});