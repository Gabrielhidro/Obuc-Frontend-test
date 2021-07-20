// Global Variables

const buttonAdd = document.getElementById("add");
const inputPredios = document.getElementById("input-predio");
const inputLocais = document.getElementById("input-local");
const tbody = document.getElementById("table-body");

let arrLocaisTrabalho = new Array();


// Insert datas in SessionStorage

function setData() {
  sessionStorage.setItem("key", JSON.stringify(arrLocaisTrabalho));
}

// Get datas in sessionStorage

function getData() {
  if (sessionStorage.hasOwnProperty("key")) {
    arrLocaisTrabalho = JSON.parse(sessionStorage.getItem("key"));
  }
}

// Reset inputs when insert datas

function cleanInput() {
  inputPredios.value = "";
  inputLocais.value = "";
}

// Insert new datas

buttonAdd.addEventListener("click", addNewItem);

function addNewItem(e) {
  e.preventDefault();

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

  getData();

  arrLocaisTrabalho.push({
    id: Math.random(),
    predio: inputPredios.value,
    local: inputLocais.value,
  });


  // Insert HTML

  setData();
  
  tbody.insertAdjacentHTML('beforeend', `
  <tr id="${arrLocaisTrabalho.id}">
  <td>${inputPredios.value}</td>
  <td>${inputLocais.value}</td>
  <td>
  <i class='bx bxs-pencil'></i>
  <i onclick="removeForm(${arrLocaisTrabalho.id})" class='bx bx-trash'></i>
  </td>
  </tr>
  `)

  cleanInput();
}

// Insert datas that exist in SessionStorage

window.addEventListener("load", loadContent);

function loadContent() {
  if (sessionStorage.hasOwnProperty("key")) {
    JSON.parse(sessionStorage.getItem("key")).forEach((item) => {
      tbody.insertAdjacentHTML(
        "beforeend",
        `
        <tr id="${item.id}">
        <td>${item.predio}</td>
        <td>${item.local}</td>
        <td>
        <i class='bx bxs-pencil'></i>
        <i onclick="removeForm(${item.id})" class='bx bx-trash'></i>
        </td>
        </tr>
      `
      );
    });
  }
}

