let quantity = document.getElementById('quantity')
let button = document.getElementById('generate')
let pass = document.getElementById('password')
let btnclean = document.getElementById('btn-clean')
let errorMessage = document.getElementById('error-message')
let strengthText = document.getElementById('strength-text')
let strengthLevel = document.getElementById('strength-level')


const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz1234567890!@#$%^&*()'


function generate() {
  let inputNum = parseInt(quantity.value)

  // Validar si la entrada es válida
  if (isNaN(inputNum) || inputNum < 8) {
    errorMessage.style.display = 'block'; // Mostrar el mensaje de error
    return; // Salir de la función si la entrada no es válida
  } else {
    errorMessage.style.display = 'none'; // Ocultar el mensaje de error si la entrada es válida
  }

  let password = ''

  for (let i = 0; i < inputNum; i++) {
    let randomChar = chars[Math.floor(Math.random() * chars.length)]
    password += randomChar
  }

  pass.value = password

  evaluateStrength(password) // Evaluar la fortaleza de la contraseña

  strengthText.innerText = 'Fortaleza:' // Asegurarse de que el mensaje de fortaleza está visible y actualizado
}

function evaluateStrength(password) {
  let strength = 'Débil'
  let className = 'weak'

  // Verificar criterios para clasificar la contraseña
  if (password.length > 14 && /[A-Z]/.test(password) && /[0-9]/.test(password) && /[!@#$%^&*()]/.test(password)) {
    strength = 'Fuerte'
    className = 'strong'
  } else if (password.length > 10 && /[A-Z]/.test(password) && /[0-9]/.test(password)) {
    strength = 'Media'
    className = 'medium'
  }

  // Actualizar el texto y el color de fortaleza
  strengthLevel.innerText = strength
  strengthLevel.className = className
}

function clean() {
  // Limpiar el campo de la contraseña y otros valores
  pass.value = '';
  errorMessage.style.display = 'none';
  quantity.value = '';

  strengthLevel.innerText = '';  // Quitar el nivel de fortaleza
  strengthLevel.className = '';  // Remover cualquier clase de fortaleza (color)
}

button.addEventListener('click', generate)
btnclean.addEventListener('click', clean)