const inputEl = document.getElementById("input")
const buttonEl = document.getElementById("button")
const ulEl = document.getElementById("list-container")
const delbuttonEl = document.getElementById("clear")

get()

buttonEl.addEventListener("click", function () {
    if (inputEl.value == '') {
        alert("Can not add an empty task")
    }
    else {
        let li = document.createElement("li")
        let taskName = document.createElement("span");
        taskName.setAttribute('id','taskspan')
        taskName.textContent = inputEl.value  
        // taskName.style.maxWidth = "10%"    
        // taskName.style.overflowWrap = "break-word";
        taskName.style.whiteSpace = "pre-wrap";
        SetListItems(li)
        li.appendChild(taskName)
        ulEl.appendChild(li)
        inputEl.value = ''
    }
    save()
})

ulEl.addEventListener("click", function (e) {
    if (e.target.classList.contains("fas", "fa-pencil")) {
            let taskName;
            let listItem = e.target.parentElement
            console.log(listItem)
            taskName = listItem.querySelector("span#taskspan");
            const dateParagraph = listItem.querySelector(".para")
            const newTaskName = prompt("Enter the new task name:", taskName.textContent)

            if (newTaskName !== null) {
                if (newTaskName !== "") {
                    const originalIndex = Array.from(ulEl.children).indexOf(listItem); // Get the original index
                    taskName.textContent = newTaskName;
                    dateParagraph.remove();

                    SetListItems(listItem);
                    // Reinsert the edited li at the original position
                    const parent = listItem.parentElement;
                    parent.removeChild(listItem);
                    if (originalIndex < parent.children.length) {
                        parent.insertBefore(listItem, parent.children[originalIndex]);
                    } else {
                        parent.appendChild(listItem);
                    }

                    const imageElement = document.createElement("img");
                    imageElement.setAttribute('id','edit-complete')
                    imageElement.title = "task was previously edited"
                    imageElement.src = "done.jpg"; // Replace with the path to your JPG image
                    listItem.appendChild(imageElement);
                } else {
                    alert("Task name cannot be empty");
                }
                save();
            } else {
                alert("Edit canceled or no input provided");
            }
        }
        
    else if (e.target.tagName === "LI" ) {
        e.target.classList.toggle("checked")
        console.log("li")
        save()
    }
    
    else if(e.target.classList.contains("cross")){
        console.log("delete")
        e.target.parentElement.remove()
        save()
    }
    
})

delbuttonEl.addEventListener("click", function () {
    if (ulEl.innerHTML == "") {
        alert("List is already empty")
    }
    else {
        const confirmDelete = confirm("Are you sure you want to delete all tasks?");

    if (confirmDelete) {
        localStorage.removeItem("data");
        ulEl.innerHTML = "";
        save();
        alert("All tasks have been cleared!");
    }
    }
})


function save() {
    localStorage.setItem("data", ulEl.innerHTML)
}
function get() {
    if (localStorage.getItem("data") !== null) {
        ulEl.innerHTML += localStorage.getItem("data")
    }
    else { }
}

function SetListItems(parent){
    var edit = document.createElement("button")
    edit.setAttribute('class',"fas fa-pencil")
    let button = document.createElement("button")
    button.textContent = "x"
    button.setAttribute('class',"cross")
    let time_paragraph = document.createElement("p")
    time_paragraph.setAttribute('class',"para")
    let d = new Date
    let x = d.getDay() + "/" + d.getMonth()
            + "/" + d.getFullYear() + " @ " + d.getHours() + ":" + d.getMinutes()
    time_paragraph.textContent = x
    parent.appendChild(time_paragraph)
    parent.appendChild(edit)
    parent.appendChild(button)
}
