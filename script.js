let index = 0;
const tasksArray = [];
const inputForm = document.getElementById("task-form");

document.addEventListener('DOMContentLoaded', () => {
    // Printing local storage value
    for (let i = 0; i < localStorage.length; i++) {
        const taskListFromLocalStorage = JSON.parse(localStorage.getItem(`taskList[${i}]`));
        if (taskListFromLocalStorage) {
            let localStorageDiv = document.createElement('div');
            localStorageDiv.innerHTML = taskListFromLocalStorage.innerHTML;
            if (taskListFromLocalStorage.completed) {
                // Style for completed task
                localStorageDiv.style.border = "2px solid #429142";
                localStorageDiv.style.backgroundColor = "#56ff5648";
            }
            document.getElementById('container').appendChild(localStorageDiv);
        }
    }
    // Restoring index from local storage
    index = parseInt(localStorage.getItem('indexINlocalStorage')) || 0;
});

// On click 'add task'
inputForm.addEventListener('submit', (e) => {
    e.preventDefault();
    const taskInput = document.getElementById("task-input");
    const dueDateInput = document.getElementById("due-date");
    const priortyInput = document.getElementById("priority");
    addTask(taskInput, dueDateInput, priortyInput);
    inputForm.reset();
});

// ADDING LIST ON CLICK OF ADD TASK
const addTask = (taskInput, dueDateInput, priortyInput) => {
    tasksArray[index] = document.createElement('div');
    tasksArray[index].id = `taskList[${index}]`;
    tasksArray[index].innerHTML = `<p id="added-val">${taskInput.value}</p>
    <p id="task-detail">Due : ${dueDateInput.value || 'Not set'} | Priority : ${priortyInput.value} </p>
    <button id="c${index}" onClick="markCompleted(${index})">Mark Completed</button>  
    <button id="${index}" onClick="deletBtn(${index})">Delete</button>`;
    
    document.getElementById('container').appendChild(tasksArray[index]);
    localStorage.setItem(`taskList[${index}]`, JSON.stringify({
        innerHTML: tasksArray[index].innerHTML,
        completed: false
    }));
    index++;
    localStorage.setItem('indexINlocalStorage', index);
}

// MARK COMPLETE ON CLICKING BUTTON
function markCompleted(index) {
    const completedBtn = document.getElementById("c" + index);
    completedBtn.textContent = 'Completed';
    completedBtn.disabled = true;
    completedBtn.style.backgroundColor = "#429142";

    const div = completedBtn.parentElement;
    div.style.border = "2px solid #429142";
    div.style.backgroundColor = "#56ff5648";

    // Save completed status in localStorage
    const divId = completedBtn.parentElement.id;

    // Get the existing task data
    const existingTask = JSON.parse(localStorage.getItem(divId)) || {};
    existingTask.completed = true;  // Update completed status
    existingTask.innerHTML = div.innerHTML;  // Update innerHTML

    // Store updated task data
    localStorage.setItem(divId, JSON.stringify(existingTask));
}


// REMOVING ONE LIST OF TASK ON CLICKING BUTTON
function deletBtn(id_del) {
    let taskList = document.getElementById(id_del);
    taskList = taskList.parentElement;
    taskList.remove();
    localStorage.removeItem(`taskList[${id_del}]`);
    if (index >= 1) {
        index--;
        localStorage.setItem('indexINlocalStorage', index);
    }
}
