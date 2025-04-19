// DARK MODE
document.querySelector('.icon-sun').addEventListener('click', function () {
    document.querySelector('.icon-moon').classList.remove('d-none');
    document.querySelector('.icon-sun').classList.add('d-none');
    document.querySelector('.img-dark').classList.add('d-none');
    document.querySelector('.img-light').classList.remove('d-none');

    document.querySelector('body').classList.add('light');
    document.querySelector('.content').classList.add('content-light');
    document.querySelector('.todo-input').classList.add('todo-input-light');
    document.querySelector('.todo-content').classList.add('todo-content-light');
    document.querySelector('.todo-list').classList.add('todo-list-light');
    document.querySelector('.todo-footer').classList.add('todo-footer-light');
    document.querySelector('.attribution').classList.add('attribution-light');
});
// LIGHT MODE
document.querySelector('.icon-moon').addEventListener('click', function () {
    document.querySelector('.icon-moon').classList.add('d-none');
    document.querySelector('.icon-sun').classList.remove('d-none');
    document.querySelector('.img-dark').classList.remove('d-none');
    document.querySelector('.img-light').classList.add('d-none');

    document.querySelector('body').classList.remove('light');
    document.querySelector('.content').classList.remove('content-light');
    document.querySelector('.todo-input').classList.remove('todo-input-light');
    document.querySelector('.todo-content').classList.remove('todo-content-light');
    document.querySelector('.todo-list').classList.remove('todo-list-light');
    document.querySelector('.todo-footer').classList.remove('todo-footer-light');
    document.querySelector('.attribution').classList.remove('attribution-light');
});


// CHECK BUTTON
let num = 0;
document.addEventListener("click", (event) => {
    if (event.target.closest(".check-span")) {
        event.target.nextElementSibling.classList.remove('d-none');
        event.target.classList.add('d-none');
        event.target.nextElementSibling.nextElementSibling.classList.add('text-barre');
        event.target.nextElementSibling.setAttribute("data-checked", true);

        for(let i=0; i<todoArray.length; i++){
            if(todoArray[i].id == event.target.getAttribute("todo-id")){
                todoArray[i].completed = true;
            }
        }

        num--;
        document.querySelector('.todo-number').innerHTML = num;
    }    
    if(event.target.classList.contains('check-span-checked')){
        event.target.setAttribute("data-checked", false);
        for(let i=0; i<todoArray.length; i++){
            if(todoArray[i].id == event.target.getAttribute("todo-id")){
                todoArray[i].completed = false;
            }
        }
        event.target.previousElementSibling.classList.remove('d-none');
        event.target.classList.add('d-none');
        event.target.nextElementSibling.classList.remove('text-barre');


        num++;
        document.querySelector('.todo-number').innerHTML = num;
    }
    console.log(todoArray);
    console.log(event.target);
});


document.addEventListener("click", (event) => {
    if (event.target.closest(".check-img")) {
        event.target.parentElement.classList.add('d-none');
        event.target.parentElement.previousElementSibling.classList.remove('d-none');
        event.target.parentElement.nextElementSibling.classList.remove('text-barre');

        for(let i=0; i<todoArray.length; i++){
            if(todoArray[i].id == event.target.getAttribute("todo-id")){
                todoArray[i].completed = false;
            }
        }

        num++;
        document.querySelector('.todo-number').innerHTML = num;    
    }
    // console.log( event.target.parentElement.nextElementSibling);
});





// TODO-LIST LOGIQUE
var todoArray = [];
let input = document.querySelector('.todo-input input');
let id = 0;
input.addEventListener('keypress', (event) => {
    if (event.key === 'Enter') {
        if(input.value === ""){
            return
        }
        let todoText = { id: `${id++}`, text: `${input.value}`, completed: false , order: `` };

        todoArray.push(todoText)
        view();
        input.value = '';
        // console.log(todoArray);
        num++;
        document.querySelector('.todo-number').innerHTML = num;
    }
});


function view() {
    resultat = ``;
    for (let i = 0; i < todoArray.length; i++) {
        todoArray[i].order = i;
        resultat += `<div class="todo-list-item pt-3 pb-3 d-flex align-items-center position-relative">
                        <span class="check-span d-flex justify-content-center align-items-center rounded-circle" todo-id="${todoArray[i].order}" data-checked="${todoArray[i].completed}"></span>
                        <span class="check-span-checked d-flex justify-content-center align-items-center rounded-circle d-none" todo-id="${todoArray[i].order}" data-checked="${todoArray[i].completed}"><img src="./images/icon-check.svg" class="check-img"></span>
                        <span class="todo-list-text ps-3">${todoArray[i].text}</span>
                        <img class="remove-icon" todo-id="${todoArray[i].order}" src="./images/icon-cross.svg">
                    </div>`
    }
    document.querySelector('.todo-list').innerHTML = resultat;
}

document.addEventListener('click', event => {
    if (event.target.closest('.remove-icon')) {
        id = event.target.getAttribute("todo-id")
        todoArray.splice(id, 1);
        view();
        // console.log(todoArray);
    }
})



// SORT TODO COMPLETED
let completed = document.querySelector('.completed');

completed.addEventListener('click', () =>{
    let completedArray = [];
    for(let i=0; i<todoArray.length; i++){
        if(todoArray[i].completed == true){
            completedArray.push(todoArray[i]);
        }
    }
    viewCompleted();
    // console.log(completedArray)



function viewCompleted() {
    resultat = ``;
    for (let i = 0; i < completedArray.length; i++) {
        completedArray[i].order = i;
        resultat += `<div class="todo-list-item pt-3 pb-3 d-flex align-items-center position-relative">
                        <span class="check-span d-flex justify-content-center align-items-center rounded-circle" todo-id="${todoArray[i].order}" data-checked="${todoArray[i].completed}"></span>
                        <span class="check-span-checked d-flex justify-content-center align-items-center rounded-circle d-none" todo-id="${todoArray[i].order}" data-checked="${todoArray[i].completed}"><img src="./images/icon-check.svg" class="check-img"></span>                        
                        <span class="todo-list-text ps-3">${completedArray[i].text}</span>
                        <img class="remove-icon" todo-id="${completedArray[i].order}" src="./images/icon-cross.svg">
                    </div>`
    }
    document.querySelector('.todo-list').innerHTML = resultat;
}

document.addEventListener('click', event => {
    if (event.target.closest('.remove-icon')) {
        id = event.target.getAttribute("todo-id")
        todoArray.splice(id, 1);
        viewCompleted();
    }
})
})





// SORT TODO ALL
let all = document.querySelector('.all');

all.addEventListener('click', ()=>{
    view();
});



// SORT TODO ACTIVE
let active = document.querySelector('.active');

active.addEventListener('click', ()=>{
    let activeTodo = [];
    for(let i=0; i<todoArray.length; i++){
        if(todoArray[i].completed == false){
            activeTodo.push(todoArray[i])
        }
    }
    viewActive()

    function viewActive(){
        resultat = ``;
        for(let i=0; i<activeTodo.length; i++){
            resultat += `<div class="todo-list-item pt-3 pb-3 d-flex align-items-center position-relative">
                            <span class="check-span d-flex justify-content-center align-items-center rounded-circle" todo-id="${todoArray[i].order}" data-checked="${todoArray[i].completed}"></span>
                            <span class="check-span-checked d-flex justify-content-center align-items-center rounded-circle d-none" todo-id="${todoArray[i].order}" data-checked="${todoArray[i].completed}"><img src="./images/icon-check.svg" class="check-img"></span>                            
                            <span class="todo-list-text ps-3">${activeTodo[i].text}</span>
                            <img class="remove-icon" todo-id="${activeTodo[i].order}" src="./images/icon-cross.svg">
                        </div>` 
        }
        document.querySelector('.todo-list').innerHTML = resultat;
    }

    document.addEventListener('click', event =>{
        if (event.target.closest('.remove-icon')) {
            id = event.target.getAttribute('todo-id')
            activeTodo.splice(id, 1);
            viewActive()
        }
    })
});



// CLEAR COMPLETED

let clear = document.querySelector('.clear');
let toRemove = [];
clear.addEventListener('click', ()=>{
    for(let i=0; i<todoArray.length; i++){
        if(todoArray[i].completed){
            toRemove.push(todoArray[i])
        }
    }
    todoArray = todoArray.filter(todo => !toRemove.includes(todo))
    view()
    console.log(todoArray);
    console.log(toRemove);
})