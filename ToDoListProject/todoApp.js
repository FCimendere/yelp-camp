let userSelect = prompt("Please make a selection (enter or quit): ").toLowerCase();

const toDoList = [];
while(userSelect !== "quit" && userSelect !== "q") {
    userSelect = prompt("Please make a selection (new, list, delete, quit): ").toLowerCase();
    if (userSelect === "new"){
        let selection = prompt("Please enter a toDo to add your list.").toLowerCase();
        toDoList.push(selection)
        console.log("************************************");
        console.log (`You added "${selection}" to your ToDo List.`)
    } else if (userSelect === "list"){
        console.log("************************************");
        console.log("These are your all ToDo's for today:");
        for (let i=0; i<toDoList.length; i++) {
            console.log(`${i} : ${toDoList[i]}`);
        }
    } else if (userSelect === "delete"){
        let delSelect = parseInt(prompt("Please enter the ToDo's NUMBER to delete it from your list. "));
        // another option to control the user entry and finding its index number.
        // if (!toDoList.includes(delSelect)){
        //     delSelect = prompt("Please enter correctly a toDo to delete it from your list. ").toLowerCase();
        // } 
        // let index = toDoList.indexOf(delSelect);
        if (!Number.isNaN(delSelect)){
            let deleted = toDoList.splice(delSelect,1);
            console.log("************************************");
            console.log (`You deleted "${deleted}" from your ToDo List.`)
            if (toDoList.length == 0) {
                console.log("************************************");
                console.log("Congrats! You completed all ToDos for today. ")
            } else {
                console.log("************************************");
                console.log("These are your rest ToDo's for today: ")
            
                for (let i=0; i<toDoList.length; i++) {
                    console.log(`${i} : ${toDoList[i]}`);
                }
            }
        } else {
            console.log("Unknown number.")
        }

    }
}
console.log("You QUIT the app!")