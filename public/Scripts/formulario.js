document.addEventListener('DOMContentLoaded', () => {
    
const form = document.getElementById("form")
const nom = document.getElementById("nombre")
const dni = document.getElementById("dni")
const fecha = document.getElementById("fechaN")
const tel = document.getElementById("telefono")
const email = document.getElementById("email")
const nomF = document.getElementById("nom")
const telF = document.getElementById("tel")
const dniF = document.getElementById("dn")
const emailF = document.getElementById("ema")
const fechaF = document.getElementById("fech")


form.addEventListener("submit", (e) => {
  const valido = Vnom() && Vdni() && Vfecha() && Vemail() && Vtel();

  if (!valido) {
    e.preventDefault();
  }
});


function Vtel() {

    
    telF.textContent = ""
    const limit = /^\d{10}$/;

    if (tel.value.length == 10 && limit.test(tel.value)){

        return true 
    }else {

        telF.textContent = "ingrese un telefono con 10 digitos"

        return false
    }


}

function Vdni() {

    dniF.textContent = ""
    const limit = /[0-9]/;

    if (dni.value.length == 8 && limit.test(dni.value)){

        return true 
    }else {
        
        dniF.textContent = "ingrese un dni valido"
        
        return false
    }

}

function Vemail() {

    emailF.textContent = ""
    const limit = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (limit.test(email.value)){

        return true 
    }else {
        
        emailF.textContent = "ingrese un email valido"
        
        return false
    }

}

function Vnom() {

    nomF.textContent = ""
    const limit = /^[a-zA-ZÀ-ÿ\s]+$/

    if (limit.test(nom.value.trim()) && nom.value.length <=30){

        return true 
    }else {

        nomF.textContent = "ingrese un nombre valido"
        
        return false
    }

}

function Vfecha() {

    fechaF.textContent = ""
    const fechaS = new Date(fecha.value)
    const hoy = new Date()

    



    hoy.setHours(0,0,0,0)

    if (fechaS < hoy){

        return true 
    }else {

        fechaF.textContent = "ingrese una fecha valida"
        
        return false
    }

}

}
)