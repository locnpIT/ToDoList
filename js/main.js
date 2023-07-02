import { ToDo } from "./todo.js";
import { ToDoList } from "./todoList.js";

let todoList = new ToDoList();
let completeList = new ToDoList();

const getEle = (id) => {
    return document.getElementById(id);
}

// hàm thêm todo

const addToDo = () =>{
    let txtToDo = getEle("newTask").value;
    let ulToDo = getEle("todo");

    if(txtToDo != ""){
        let td = new ToDo(txtToDo, "todo");
        todoList.addToDo(td);
    }
    // console.log(todoList.tdList);
    showToDoList(ulToDo);
    // xóa value mỗi khi add task xong
    getEle("newTask").value = "";
        
}

getEle("addItem").addEventListener("click", ()=>{
    addToDo();
});

// hàm hiển thị todo

const showToDoList = (ulToDo) =>{
    ulToDo.innerHTML = todoList.renderToDo();
}

const showCompletedList = (ulCompleted) =>{
    ulCompleted.innerHTML = completeList.renderToDo();
}

// hàm delete todo
const deleteToDo = (e) =>{
    let tdIndex = e.currentTarget.getAttribute("data-index");
    let status = e.currentTarget.getAttribute("data-status");
    let ulToDo = getEle("todo");
    let ulCompleted = getEle("completed");

    if(status == "todo"){
        todoList.removeToDo(tdIndex);
        showToDoList(ulToDo); 
    }
    else if(status == "completed"){
        completeList.removeToDo(tdIndex);
        showCompletedList(ulCompleted);
    }
    else{
        alert("Cannot delete todo");
    }


}
window.deleteToDo = deleteToDo;


// hàm complete todo
const completeToDo = (e) =>{
    let tdIndex = e.currentTarget.getAttribute("data-index");
    let status = e.currentTarget.getAttribute("data-status");
    let ulToDo = getEle("todo");
    let ulCompleted = getEle("completed");

    if(status == "todo"){
        // slice: start <= index < end
        let completeItems = todoList.tdList.slice(tdIndex, tdIndex+1);
        let objToDo = new ToDo(completeItems[0].textTodo, "completed");
        moveToDo(todoList, completeList, objToDo, tdIndex); 
        showToDoList(ulToDo);
        showCompletedList(ulCompleted);
        
    }else if(status == "completed"){
        let undoItem = completeList.tdList.slice(tdIndex, tdIndex + 1);
        let objToDo = new ToDo(undoItem[0].textTodo, "todo");
        moveToDo(completeList, todoList, objToDo, tdIndex); 
        showToDoList(ulToDo);
        showCompletedList(ulCompleted);
    }
    else{
        alert("Cannot move todo!!!");
    }

}

window.completeToDo = completeToDo;

const moveToDo = (depart, arrival, obj, tdIndex) =>{
    // remove todo from depart 
    depart.removeToDo(tdIndex);

    // add todo complete to arrival
    arrival.addToDo(obj);

}

const sortASC = () =>{
    let ulToDo = getEle("todo");
    todoList.sortToDoList(false);
    showToDoList(ulToDo);
}
window.sortASC = sortASC;

const sortDES = () =>{
    let ulToDo = getEle("todo");
    todoList.sortToDoList(true);
    showToDoList(ulToDo);
}
window.sortDES = sortDES;