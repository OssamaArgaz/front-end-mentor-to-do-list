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
document.addEventListener("click", (event) => {
    if (event.target.closest(".check-span")) {
        event.target.firstElementChild.classList.toggle('d-none');
        event.target.classList.toggle('check-span-checked');
        event.target.nextElementSibling.classList.toggle('text-barre');
    }    
    if(event.target.classList.contains('check-span-checked')){
        event.target.setAttribute("data-checked", true);
        for(let i=0; i<todoArray.length; i++){
            if(todoArray[i].id == event.target.getAttribute("todo-id")){
                todoArray[i].completed = true;
            }
        }
    }else{
        event.target.setAttribute("data-checked", false);
        for(let i=0; i<todoArray.length; i++){
            if(todoArray[i].id == event.target.getAttribute("todo-id")){
                todoArray[i].completed = false;
            }
        }
    }
    // console.log(todoArray);
    // console.log(event.target);
});

document.addEventListener("click", (event) => {
    if (event.target.closest(".check-img")) {
        event.target.classList.add('d-none');
        event.target.parentElement.classList.remove('check-span-checked');
        event.target.parentElement.nextElementSibling.classList.remove('text-barre')
    }
});





// TODO-LIST LOGIQUE
var todoArray = [];
let input = document.querySelector('.todo-input input');
let id = 0;
input.addEventListener('keypress', (event) => {
    if (event.key === 'Enter') {
        let todoText = { id: `${id++}`, text: `${input.value}`, completed: false ,order: `` };

        todoArray.push(todoText)
        view();
        input.value = '';
        // console.log(todoArray);
    }
});


function view() {
    resultat = ``;
    for (let i = 0; i < todoArray.length; i++) {
        todoArray[i].order = i;
        resultat += `<div class="todo-list-item pt-3 pb-3 d-flex align-items-center position-relative">
                        <span class="check-span d-flex justify-content-center align-items-center rounded-circle" todo-id="${todoArray[i].order}" data-checked="${todoArray[i].completed}"><img src="./images/icon-check.svg" class="check-img d-none"></span>
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
    console.log(completedArray)



function viewCompleted() {
    resultat = ``;
    for (let i = 0; i < completedArray.length; i++) {
        completedArray[i].order = i;
        resultat += `<div class="todo-list-item pt-3 pb-3 d-flex align-items-center position-relative">
                        <span class="check-span d-flex justify-content-center align-items-center rounded-circle" todo-id="${todoArray[i].order}" data-checked="${completedArray[i].completed}"><img src="./images/icon-check.svg" class="check-img d-none"></span>
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
                            <span class="check-span d-flex justify-content-center align-items-center rounded-circle" todo-id="${activeTodo[i].order}" data-checked="${activeTodo[i].completed}"><img src="./images/icon-check.svg" class="check-img d-none"></span>
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