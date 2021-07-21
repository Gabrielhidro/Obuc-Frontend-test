// Global Variables
const buttonAdd = document.getElementById("add");
const inputPredios = document.getElementById("input-predio");
const inputLocais = document.getElementById("input-local");
const tbody = document.getElementById("table-body");

// Insert datas in SessionStorage
function setLocaisTrabalho(data) {
  sessionStorage.setItem("arrLocaisTrabalho", JSON.stringify(data));
}

// Get datas in sessionStorage
function getLocaisTrabalho() {
  if (sessionStorage.hasOwnProperty("arrLocaisTrabalho")) {
     return JSON.parse(sessionStorage.getItem("arrLocaisTrabalho"));
  }
  return new Array()
}

// Reset inputs when insert datas
function cleanInput() {
  inputPredios.value = "";
  inputLocais.value = "";
}

// Render HTML Function
function buildLocalTableLine(item){
  return  `
  <tr id="${item.id}">
  <td>${item.predio}</td>
  <td>${item.local}</td>
  <td>
  <i onclick="editForm(${item.id})"class='bx bxs-pencil'></i>
  <i onclick="removeForm(${item.id})" class='bx bx-trash'></i>
  </td>
  </tr>
`
}

function insertLocalTableLine(item){
  tbody.insertAdjacentHTML(
    "beforeend",
    buildLocalTableLine(item)
  );
}

// Insert new datas
buttonAdd.addEventListener("click", addNewItem);

function addNewItem(e) {
  e.preventDefault();
  const id = Math.random()

  // Confirm if inputs has a value
  if (inputPredios.value == "") {
    alert("Selecione um prédio!");
    inputPredios.focus();
    return;
  }

  if (inputLocais.value == "") {
    alert("Informe um local!");
    inputLocais.focus();
    return;
  }

  // Change values in array
  let arrLocaisTrabalho = getLocaisTrabalho();
  const item = {
      id: id,
      predio: inputPredios.value,
      local: inputLocais.value,
  }

  arrLocaisTrabalho.push(item);

  // Insert HTML
  setLocaisTrabalho(arrLocaisTrabalho);
  insertLocalTableLine(item)
  cleanInput();
}

// Insert datas that exist in SessionStorage
window.addEventListener("load", loadContent);

function loadContent() {
  getLocaisTrabalho().forEach(insertLocalTableLine);
}


// Remove table line 
function removeForm(id) {
  const getTr = document.getElementById(id);

  if (confirm("Esta ação é irreversível, deseja prosseguir?")) {
    getTr.remove();
  }

  let arrLocaisTrabalho = getLocaisTrabalho();

  // Remove item in the SessionStorage
  const filteredItems = arrLocaisTrabalho.filter((item) => item.id !== id);
  setLocaisTrabalho(filteredItems);
}

// Edit table item 
function editForm(id) {
  const selectId = document.getElementById(id)

  selectId.firstElementChild.innerHTML = `
  <select style="width: 160px; outline: auto;" class="form-select edit-predio">
    <option selected></option>
    <option>Prédio 1</option>
    <option>Prédio 2</option>
    <option>Prédio 3</option>
    <option>Prédio 4</option>
    <option>Prédio 5</option>
  </select>
`
  selectId.children[1].innerHTML = '<input style="outline: auto; padding: 1px 5px;" class="edit-local"></input>'
  selectId.children[2].innerHTML = `<i style="font-size: 2rem; font-weight: bold" onclick="confirmEdit(${id})" class='bx bx-check'></i><i style="font-size: 2rem; font-weight: bold" onclick="cancelEdit(${id})" class='bx bx-x' ></i>`
}

/* Confirm Editions */
function confirmEdit(id){
  const selectedId =  document.getElementById(id)
  const selectPredio = selectedId.getElementsByClassName('edit-predio')[0]
  const inputLocal = selectedId.getElementsByClassName('edit-local')[0]

  if (selectPredio.value === ''  || inputLocal.value === ''){
    alert('Preencha os campos de edição!')
  }
  else {
    let arrLocaisTrabalho = getLocaisTrabalho();
    const editedItem = {
      id,
      predio: selectPredio.value,
      local: inputLocal.value
    }
    const index = arrLocaisTrabalho.findIndex(item => item.id == id)
    arrLocaisTrabalho[index] = editedItem;

    setLocaisTrabalho(arrLocaisTrabalho)

    selectedId.innerHTML = buildLocalTableLine(editedItem);
  }
}

/* Cancel Editions */
function cancelEdit(id){
  const selectedId =  document.getElementById(id)
  selectedId.innerHTML = buildLocalTableLine(getLocaisTrabalho().find((item) => item.id == id));
}