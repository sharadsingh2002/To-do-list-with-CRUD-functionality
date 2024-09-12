let input = document.querySelector('#input')
let addBtn = document.querySelector('#addBtn')
let addBtnText = addBtn.innerText
let tbody = document.querySelector('tbody')
let deleteAll = document.querySelector('#deleteAll')
let showMsg = document.querySelector('span')

let list = JSON.parse(localStorage.getItem('list')) || []
let edit_id = null

display()


addBtn.addEventListener('click', addTask);

input.addEventListener('keydown', (event) => {
    if (event.key === 'Enter') {
        event.preventDefault();
        addTask();
    }
});

function addTask() {
    let values = input.value.trim();

    if (values === '') {
        alertMsg();
        return;
    }

    if (values.length > 20) {
        values = values.substring(0, 20) + "...";
    }

    let currentDate = new Date().toLocaleDateString('en-GB');

    if (edit_id !== null) {
        list.splice(edit_id, 1, { task: values, date: currentDate });
        edit_id = null;
    } else {
        list.push({ task: values, date: currentDate, status: false });
    }

    saveData(list);
    display();
    addTaskMsg();
    input.value = "";
    addBtn.innerText = addBtnText;
}

function saveData(userList) {
    localStorage.setItem('list', JSON.stringify(userList))
}


function display() {
    tbody.innerHTML = ''

    list.forEach((item, index) => {
        tbody.innerHTML += `

        <tr>
            <td>${index + 1}</td>
            <td>${item.task}</td>
            <td>${item.date}</td>
            <td>${item.status ? "Completed" : "Pending"}</td>
            <td>
                <button class="edit-btn" onclick="editTask(${index})"><i class="fa-solid fa-pen-to-square"></i></button>
                <button class="check-btn" onclick="checkStatus(${index})"><i class="fa-solid fa-check"></i></button>
                <button class="delete-btn" onclick="deleteList(${index})"><i class="fa-solid fa-trash"></i></button>
            </td>
        </tr>
`
    })

}


function checkStatus(getIndex) {
    list[getIndex].status = !list[getIndex].status

    saveData(list)
    display()
}

function deleteList(getIndex) {
    list.splice(getIndex, 1);

    saveData(list)
    deleteTaskMsg()
    display()
}

function editTask(getIndex) {
    edit_id = getIndex

    input.value = list[getIndex].task
    addBtn.innerText = 'Update'
}

function deleteAllList() {
    deleteAll.addEventListener('click', () => {
        list = [];
        saveData(list);
        display();
        allDeleteTaskMsg()
    })
}
deleteAllList()

function addTaskMsg() {
    setTimeout(() => {
        showMsg.innerText = 'Task added successfully'
        showMsg.style.backgroundColor = '#87D039'
        showMsg.style.opacity = '1'

        setTimeout(() => {
            showMsg.style.opacity = '0'

        }, 2000)

    }, 100)
}


function alertMsg() {
    setTimeout(() => {
        showMsg.innerText = 'please enter a task'
        showMsg.style.backgroundColor = '#DC3545'
        showMsg.style.opacity = '1'

        setTimeout(() => {
            showMsg.style.opacity = '0'

        }, 2000)

    }, 100)
}


function deleteTaskMsg() {
    setTimeout(() => {
        showMsg.innerText = 'Task deleted successfully'
        showMsg.style.backgroundColor = '#87D039'
        showMsg.style.opacity = '1'

        setTimeout(() => {
            showMsg.style.opacity = '0'

        }, 2000)

    }, 100)
}


function allDeleteTaskMsg() {
    setTimeout(() => {
        showMsg.innerText = 'All tasks deleted successfully'
        showMsg.style.backgroundColor = '#87D039'
        showMsg.style.opacity = '1'

        setTimeout(() => {
            showMsg.style.opacity = '0'

        }, 2000)

    }, 100)
}