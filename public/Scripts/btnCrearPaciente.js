document.addEventListener('DOMContentLoaded', () => {
const form = document.getElementById("formulario")
const btn = document.getElementById("buscar")
const input = document.getElementById("input")
const regBtn = document.getElementById("registrar")

btn.addEventListener("click",(e) =>{
    if (input.value.trim()===''){
        e.preventDefault()
        regBtn.style.display = 'inline-block'
    } else {
        regBtn.style.display = 'none'
        form.submit()
    }
})

regBtn.addEventListener("click", ()=>{
    window.location.href = "/pacientes/nuevo?ingreso=1"
})

}
)