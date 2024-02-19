const list = document.getElementById("list");
const createBtn = document.getElementById("create-btn");

let todos = [];

createBtn.addEventListener("click", createNewTodo);

function createNewTodo() {
    const item = {
        id: new Date().getTime(),
        text: '',
        complete: false
    }

    todos.unshift(item);

    const {itemElem, inputElem, editBtnElem, removeBtnElem} = createTodoElement(item);

    list.prepend(itemElem);
    inputElem.removeAttribute("disabled");
    inputElem.focus();

    saveToLocalStorage();
}

function createTodoElement(item) {
    const itemElem = document.createElement("div");
    itemElem.classList.add("item");

    const checkboxElem = document.createElement("input");
    checkboxElem.type = "checkbox";
    checkboxElem.checked = item.complete;

    if (item.complete) {
        checkboxElem.classList.add("complete");
    }

    const inputElem = document.createElement("input");
    inputElem.type = "text";
    inputElem.value = item.text;
    inputElem.setAttribute("disabled", "");

    const actionsElem = document.createElement("div");
    actionsElem.classList.add("actions");

    const editBtnElem = document.createElement("button");
    editBtnElem.classList.add('material-icons', 'edit-btn');
    editBtnElem.innerText = "edit";

    const removeBtnElem = document.createElement("button");
    removeBtnElem.classList.add('material-icons', 'remove-btn');
    removeBtnElem.innerText = "remove";

    checkboxElem.addEventListener("change", () => {
        item.complete = checkboxElem.checked;

        if (item.complete) {
            itemElem.classList.add("completed");
        }else{
            itemElem.classList.remove("completed");
        }
        saveToLocalStorage();
    });

    inputElem.addEventListener("blur", () => {
        inputElem.setAttribute("disabled", '');
        saveToLocalStorage();
    });

    inputElem.addEventListener("input", () => {
        item.text = inputElem.value;
    });

    editBtnElem.addEventListener("click", () => {
        inputElem.removeAttribute("disabled");
        inputElem.focus();
    });

    removeBtnElem.addEventListener("click", () => {
        todos = todos.filter(t=> t.id !== item.id);
        itemElem.remove();
        saveToLocalStorage();
    });

    actionsElem.append(editBtnElem);
    actionsElem.append(removeBtnElem);

    itemElem.append(checkboxElem);
    itemElem.append(inputElem);
    itemElem.append(actionsElem);

    return {itemElem, inputElem, editBtnElem, removeBtnElem};
}

function saveToLocalStorage() {
    const data = JSON.stringify(todos);
    localStorage.setItem("my_todos", data);
}

function loadFromLocalStorage() {
    const data = localStorage.getItem("my_todos");
    if (data) {
        todos = JSON.parse(data);
    }
}

function displayTodos() {
    loadFromLocalStorage();
    for (let i = 0; i < todos.length; i++) {
        const item = todos[i];
        const {itemElem} = createTodoElement(item);

        list.append(itemElem);
    }
}

displayTodos();