//==========================================
// MEZDI ALERTAS
//==========================================

//------------------------------------------
// ÉXITO
//------------------------------------------

function alertaExito(titulo, mensaje){

    Swal.fire({

        icon: 'success',

        title: titulo,

        html: mensaje,

        confirmButtonColor:'#0A4A8A',

        background:'#FFFFFF',

        color:'#1E1E1E',

        customClass:{
            popup:'rounded-4 shadow-lg'
        }

    });

}

//------------------------------------------
// ERROR
//------------------------------------------

function alertaError(titulo,mensaje){

    Swal.fire({

        icon:'error',

        title:titulo,

        html:mensaje,

        confirmButtonColor:'#dc3545',

        background:'#FFFFFF',

        color:'#1E1E1E'

    });

}

//------------------------------------------
// ADVERTENCIA
//------------------------------------------

function alertaAdvertencia(titulo,mensaje){

    Swal.fire({

        icon:'warning',

        title:titulo,

        html:mensaje,

        confirmButtonColor:'#f39c12',

        background:'#FFFFFF',

        color:'#1E1E1E'

    });

}

//------------------------------------------
// INFORMACIÓN
//------------------------------------------

function alertaInfo(titulo,mensaje){

    Swal.fire({

        icon:'info',

        title:titulo,

        html:mensaje,

        confirmButtonColor:'#0A4A8A',

        background:'#FFFFFF',

        color:'#1E1E1E'

    });

}