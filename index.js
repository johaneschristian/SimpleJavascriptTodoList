const toDoContainer = document.querySelector('[data-item-container]');
const addButton = document.querySelector('[data-add-button]');
const toDoInput = document.querySelector('[data-input]');
const display = document.querySelector('[data-item-container]');
const viewSelector = document.querySelector('[data-view-selector]');

let draggables = [];
let ondrag;
let targetdrag;
let selectedType = 'All';


class Item {
    constructor(itemText, isCompleted) {
        this.itemText = itemText;
        this.isCompleted;
    }
}

let toDoList = []

function add(text) {
    if(text.length > 0) {
        let task = new Item(text, false);
        toDoList.push(task);
    }
}

function remove(id) {
    toDoList[id].isCompleted = true;
    updateDisplay(selectedType);
}

function completeRemove(id) {
    toDoList.splice(id, 1);
    updateDisplay(selectedType);
}

function updateDisplay(viewType) {
    display.innerText = '';

    let index = 0;
    if(viewType == 'All') {
        for(let i = 0; i < toDoList.length; i++) {
            if(toDoList[i] && !toDoList[i].isCompleted) {
                display.innerHTML += '<div class=\'row-container\' draggable=\'true\' id=\''+i+'\'>' + 
                '<div class=\'todo-item\' >'+ toDoList[i].itemText +'</div><button onclick=\'remove('+i+')\'>Complete </button>'
                + '</div>';
            }
            
        }  
    
        for(let i = 0; i < toDoList.length; i++) {
            if(toDoList[i] && toDoList[i].isCompleted) {
                display.innerHTML += '<div class=\'row-container-completed\' draggable=\'false\' id=\''+i+'\'>' + 
                '<div class=\'todo-item\'>'+ toDoList[i].itemText +'</div><button class=\'button-completed\'onclick=\'completeRemove('+i+')\'>Completed</button>'
                + '</div>';
            }
            
        }
    } else if(viewType == 'Uncompleted') {
        for(let i = 0; i < toDoList.length; i++) {
            if(toDoList[i] && !toDoList[i].isCompleted) {
                display.innerHTML += '<div class=\'row-container\' draggable=\'true\' id=\''+i+'\'>' + 
                '<div class=\'todo-item\'>'+ toDoList[i].itemText +'</div><button onclick=\'remove('+i+')\'>Complete </button>'
                + '</div>';
            }
            
        }
    } else {
        for(let i = 0; i < toDoList.length; i++) {
            if(toDoList[i] && toDoList[i].isCompleted) {
                display.innerHTML += '<div class=\'row-container-completed\' draggable=\'false\' id=\''+i+'\'>' + 
                '<div class=\'todo-item\' >'+ toDoList[i].itemText +'</div><button class=\'button-completed\'onclick=\'completeRemove('+i+')\'>Completed</button>'
                + '</div>';
            }
            
        }
    }
    
    toDoInput.value = '';
    draggables = document.querySelectorAll('.row-container');

    draggables.forEach(draggable => {
        draggable.addEventListener('dragstart', event => {
            console.log('DRAG START');
            draggable.classList.add('dragging');
            ondrag = draggable.id;
            console.log(ondrag);
        })

        draggable.addEventListener('dragend', () => {
            draggable.classList.remove('dragging');
        })
        
        draggable.addEventListener('drop', () => {
            console.log('ondrag is ' + ondrag + ' and overdrag is ' + targetdrag)
            draggable.classList.remove('dragging');

            // Removing ondrag from list
            let tempList = toDoList.slice()

            if(targetdrag) {
                let moved = toDoList[ondrag];
                toDoList.splice(ondrag, 1);
                toDoList = toDoList.slice(0, targetdrag).concat([moved]).concat(toDoList.slice(targetdrag, ));
                console.log(toDoList);
            }

            ondrag = undefined;
            targetdrag = undefined;

            
            updateDisplay(selectedType);
        })

        draggable.addEventListener('dragenter', event => {
            event.preventDefault();
            targetdrag = draggable.id;
            console.log(draggable.id);
        })

        draggable.addEventListener('dragover', event => {
            event.preventDefault();
            targetdrag = draggable.id;
            draggable.classList.add('dragging');
        })
        
        draggable.addEventListener('dragleave', () => {
            if(draggable.id != ondrag) {
                draggable.classList.remove('dragging');
            }
            
        })
    })
    
}

addButton.addEventListener('click', () => {
    add(toDoInput.value);
    updateDisplay(selectedType);
});

toDoInput.addEventListener('keyup', event => {
    if(event.keyCode == 13) {
        add(toDoInput.value);
        updateDisplay(selectedType);
    };
});

viewSelector.addEventListener('change', () => {
    let viewOption = viewSelector.value;
    selectedType = viewOption;
    updateDisplay(selectedType);
})

