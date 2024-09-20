const btnForm = document.getElementById('btnForm')
const modal = document.getElementById('modal')
const modalMessage = document.getElementById('modal-message')
const modalClose = document.getElementById('modal-close')

let listExpensesNames = []
let listExpensesValues = []
let listExpensesDetails = []
let editingPosition = null // Variable para rastrear si estamos actualizando un gasto

function clickBtn() {
  let expenseName = document.getElementById('expenseName').value
  let expenseValue = document.getElementById('expenseValue').value
  let textDetails = document.getElementById('expenseDetails').value

  if (expenseValue > 150) showModal('Revisa este gasto que supera los US$ 150.00.')

  if (editingPosition !== null) {
    // Si estamos actualizando un gasto
    listExpensesNames[editingPosition] = expenseName
    listExpensesValues[editingPosition] = expenseValue
    listExpensesDetails[editingPosition] = textDetails
    editingPosition = null // Limpiar la variable después de la actualización

    document.getElementById('btnForm').textContent = "Agregar Gasto"
  } else {
    // Si estamos añadiendo un nuevo gasto
    listExpensesNames.push(expenseName)
    listExpensesValues.push(expenseValue)
    listExpensesDetails.push(textDetails)
  }

  updateExpensesList()
}

function updateExpensesList() {
  const elemList = document.getElementById('expensesList')
  const totalExpenses = document.getElementById('totalExpenses')

  let htmlList = ''
  let total = 0

  listExpensesNames.forEach((elem, position) => {
    const expenseValue = Number(listExpensesValues[position])
    const expenseDetails = listExpensesDetails[position]
    htmlList += `
      <li>${elem} - USD ${expenseValue.toFixed(2)}
        <div>
          <button class="btn-update" data-position="${position}">Editar</button>
          <button class="btn-delete" data-position="${position}">Eliminar</button>
        </div>
      </li>
      <p class='textDetail'>${expenseDetails}</p>
      `

    total += Number(expenseValue)
  })

  elemList.innerHTML = htmlList
  totalExpenses.innerHTML = total.toFixed(2)
  clean()

  // Agregar los event listeners a los botones 'Eliminar'
  document.querySelectorAll('.btn-delete').forEach(button => {
    button.addEventListener('click', function () {
      const position = this.getAttribute('data-position')
      deleteExpense(position)
    })
  })

  // Agregar los event listeners a los botones 'Actualizar'
  document.querySelectorAll('.btn-update').forEach(button => {
    button.addEventListener('click', function () {
      const position = this.getAttribute('data-position')
      updateExpense(position)
    })
  })
}

function clean() {
  document.getElementById('expenseName').value = ''
  document.getElementById('expenseValue').value = ''
  document.getElementById('expenseDetails').value = ''
}

function deleteExpense(position) {
  listExpensesNames.splice(position, 1)
  listExpensesValues.splice(position, 1)
  listExpensesDetails.splice(position, 1)
  updateExpensesList()
}

function updateExpense(position) {
  // Llenar los campos de entrada con los valores actuales del gasto a actualizar
  document.getElementById('expenseName').value = listExpensesNames[position]
  document.getElementById('expenseValue').value = listExpensesValues[position]
  document.getElementById('expenseDetails').value = listExpensesDetails[position]

  editingPosition = position; // Guardar la posición que se está editando

  document.getElementById('btnForm').textContent = "Actualizar Gasto"
}

// Función para mostrar el modal
function showModal(message) {
  modalMessage.textContent = message
  modal.classList.add('modal-active')
}

// Evento para cerrar el modal
modalClose.addEventListener('click', function () {
  modal.classList.remove('modal-active')
});

btnForm.addEventListener('click', clickBtn)

// Evento para el campo de entrada
document.getElementById('expenseName').addEventListener('keydown', function (event) {
  if (event.key === 'Enter') {
    clickBtn();
  }
});