//selectors
const todoInput = document.querySelector('.todo-input');
const todoButton = document.querySelector('.todo-button');
const todoList = document.querySelector('.todo-list');
const filterOption = document.querySelector('.filter-todo');

//event listeners
document.addEventListener('DOMContentLoaded', getTodos);
todoButton.addEventListener('click', addTodo); //when add button is clicked, addTodo function runs
todoList.addEventListener('click', deleteCheck);
filterOption.addEventListener('click', filterTodo);

//function

function addTodo(event) {
    event.preventDefault(); //prevents browser from refreshing


    const todoDiv = document.createElement('div'); //create a div container
    todoDiv.classList.add("todo"); //adds a new class name to the div


    const newTodo = document.createElement('li'); //creates the li tag
    newTodo.classList.add('todo-item'); //creates a new class name for the list tag
    newTodo.innerText = todoInput.value;


    todoDiv.appendChild(newTodo); //makes the li tag a child of the div container

    //Add To Do to Local Storage
    saveLocalTodos(todoInput.value);

    const completedButton = document.createElement('button'); //creates a button
    completedButton.innerHTML = '<i class="fas fa-check"></i>'; // adds a check icon by referencing to an html
    completedButton.classList.add('completed-btn'); //creates a new class name for the completed button 
    todoDiv.appendChild(completedButton);


    const trashButton = document.createElement('button'); //creates a button
    trashButton.innerHTML = '<i class="fas fa-trash"></i>'; // adds a trash icon by referencing to an html 
    trashButton.classList.add('trash-btn'); //creates a new class name for the trash button
    todoDiv.appendChild(trashButton);

    todoList.appendChild(todoDiv); //makes JS-created div become a child to the ul tag(todoList variable) from the html

    todoInput.value = ""; //clears the bar from texts when clicking the add button

}

function deleteCheck(e) {
    const item = e.target; // captures the element that was clicked on the webpage

    //Delete To Do
    if (item.classList[0] === "trash-btn") {
        const todo = item.parentElement; //captures the parent of the element clicked
        todo.classList.add('fall'); //adds a class name to an element. this is for an animation done in the css file
        removeLocalTodos(todo);
        todo.addEventListener('transitionend', function () {
            todo.remove();
        }); //removes the list once the animation is done
    }
    // if the element that was clicked has a class name of trash-btn
    //.classList[0]: A class is an array and this searches the very first class name of an element


    //Crashing Out Completed Tasks
    if (item.classList[0] === "completed-btn") {
        const todo = item.parentElement; //captures the parent of the element clicked
        todo.classList.toggle("completed"); //It checks if the element currently has the class "completed." If it does, it removes that class. If the element doesn't have the "completed" class, it adds it.
    }
    // if the element that was clicked has a class name of complete-btn

}

function filterTodo() {
    const todos = todoList.childNodes;

    //filterOption.value gets the selected value from the dropdown.
    todos.forEach(function (todo) {
        if (todo.nodeType === 1) {
            switch (filterOption.value) {
                case "all":
                    todo.style.display = 'flex';
                    break;
                case "completed":
                    if (todo.classList.contains("completed")) {
                        todo.style.display = "flex";
                    } else {
                        todo.style.display = "none";
                    }
                    break;
                case "uncomplete":
                    if (!todo.classList.contains("completed")) {
                        todo.style.display = "flex";
                    } else {
                        todo.style.display = "none";
                    }
                    break;
            }
        }
    });
}

function saveLocalTodos(todo) {
    //Checking whether there are items in the local storage
    let todos;
    if (localStorage.getItem('todos') === null) {
        todos = [];
    } else {
        todos = JSON.parse(localStorage.getItem('todos'));
    }
    todos.push(todo);
    localStorage.setItem('todos', JSON.stringify(todos));
}

function getTodos() {
    //Checking whether there are items in the local storage
    let todos;
    if (localStorage.getItem('todos') === null) {
        todos = [];
    } else {
        todos = JSON.parse(localStorage.getItem('todos'));
    }

    todos.forEach(function (todo) {
        const todoDiv = document.createElement('div'); //create a div container
        todoDiv.classList.add("todo"); //adds a new class name to the div


        const newTodo = document.createElement('li'); //creates the li tag
        newTodo.classList.add('todo-item'); //creates a new class name for the list tag
        newTodo.innerText = todo;


        todoDiv.appendChild(newTodo); //makes the li tag a child of the div container


        const completedButton = document.createElement('button'); //creates a button
        completedButton.innerHTML = '<i class="fas fa-check"></i>'; // adds a check icon by referencing to an html
        completedButton.classList.add('completed-btn'); //creates a new class name for the completed button 
        todoDiv.appendChild(completedButton);


        const trashButton = document.createElement('button'); //creates a button
        trashButton.innerHTML = '<i class="fas fa-trash"></i>'; // adds a trash icon by referencing to an html 
        trashButton.classList.add('trash-btn'); //creates a new class name for the trash button
        todoDiv.appendChild(trashButton);

        todoList.appendChild(todoDiv); //makes JS-created div become a child to the ul tag(todoList variable) from the html

    })
}

function removeLocalTodos(todo) {
    //Checking whether there are items in the local storage
    let todos;
    if (localStorage.getItem('todos') === null) {
        todos = [];
    } else {
        todos = JSON.parse(localStorage.getItem('todos'));
    }

    const todoIndex = todo.children[0].innerText;
    todos.splice(todos.indexOf(todoIndex),1);
    localStorage.setItem('todos', JSON.stringify(todos));
}