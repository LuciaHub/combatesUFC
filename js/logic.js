let BTNACCEDER = document.querySelector("button.btn.btn-primary");
const USERS_URL = "data/datauser.json";  

function accederUsuario() {

    let userForm = document.querySelector("#user").value;
    let passForm = document.querySelector("#pass").value;

    fetch(USERS_URL)
        .then(response => response.json())
        .then(datos => {
        
            for (usuario of datos.usuarios) {
                if (usuario.user === userForm && usuario.pass === passForm) {
                    location.replace("contenido.html");
                    break;
                }
                else {
                    location.replace("error.html");  
                }
            }
               
    })
        
}


BTNACCEDER.addEventListener("click", accederUsuario);
