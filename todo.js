const toDoForm = document.querySelector(".js-toDo"),
    toDoInput = toDoForm.querySelector("input"),
    toDoList = document.querySelector(".js-toDoList");

const TODOS_LS = 'toDos';


let toDos = [];

function delToDo(event) {
    const btn = event.target;
    const ul = btn.parentNode;
    toDoList.removeChild(ul);
    const cleanToDos = toDos.filter(function (toDo) {
        return toDo.id !== parseInt(ul.id);
    });
    toDos = cleanToDos;
    saveToDos();
}

function saveToDos() {
    localStorage.setItem(TODOS_LS, JSON.stringify(toDos));
}

function paintToDo(text) {
    const ul = document.createElement("ul");
    const delBtn = document.createElement("button");
    const span = document.createElement("span");
    const newId = toDos.length + 1;
    delBtn.innerHTML = "X";
    delBtn.addEventListener("click", delToDo);
    span.innerText = text;
    ul.appendChild(delBtn);
    ul.appendChild(span);
    ul.id = newId;
    toDoList.appendChild(ul);
    const toDoObj = {
        text: text,
        id: newId
    };
    toDos.push(toDoObj);
    saveToDos();
}

function handleSubmit(event) {
    event.preventDefault();
    const currentValue = toDoInput.value;
    paintToDo(currentValue);
    toDoInput.value = "";
}

function loadToDo() {
    const loadedToDos = localStorage.getItem(TODOS_LS);
    if (loadedToDos !== null) {
        const jsonToDos = JSON.parse(loadedToDos);
        jsonToDos.forEach(function (toDo) {
            paintToDo(toDo.text);
        });
    }
}

function init() {
    loadToDo();
    toDoForm.addEventListener("submit", handleSubmit);
}
init();