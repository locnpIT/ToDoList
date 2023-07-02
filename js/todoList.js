export class ToDoList{
    constructor(){
        this.tdList = [];
    }
    addToDo(todo){
        this.tdList.push(todo);
    }
    removeToDo(index){
        // xóa từ vị trí index 1 phần tử, chính là xóa phần tử index
        this.tdList.splice(index, 1);
    }
    sortToDoList(isDES){
        this.tdList.sort((todo, nextToDo)=>{
            const textA = todo.textTodo.toLowerCase();
            const textB = nextToDo.textTodo.toLowerCase();
            // accending, localeCompare sẽ giúp chúng ta so sánh các dấu trong tiếng việt
            return textB.localeCompare(textA);
          
        });
        if(isDES){
            this.tdList.reverse();
        }
    }

    renderToDo(){
        let content = "";
        // reduce duyệt mảng từ phải qua trái có nghĩa là bắt đầu từ phần tử cuối cùng của mảng
        content = this.tdList.reduceRight((tdContent, item, index)=>{
            tdContent += `
                <li> 
                    <span>${item.textTodo}</span>
                    <div class = "buttons">
                        <button class = "remove" data-index = "${index}" data-status = ${item.status} onclick = "deleteToDo(event)"> 
                            <i class="fa-solid fa-trash-can"></i>
                        </button>
                        <button class = "complete" data-index = "${index}" data-status = ${item.status} onclick = "completeToDo(event)"> 
                            <i class="far fa-check-circle"></i>
                            <i class="fas fa-check-circle"></i>
                        </button>
                    </div>


                </li>
            
            `;
            return tdContent;

        },"");
        return content;
    }


}