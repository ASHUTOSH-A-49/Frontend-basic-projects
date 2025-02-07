document.addEventListener('DOMContentLoaded',()=>{

    
const todoinput = document.getElementById('to-do-input');
const addtaskbtn = document.getElementById('add-task-btn');
// const donetaskbtn = document.getElementsByClassName('done-btn');
const todolist = document.getElementById('tasks-list');



// the task array 
let tasks = JSON.parse(localStorage.getItem('tasks')) || [];
// if it already has item in local storage then tasks variable will hold those else it will be empty 

tasks.forEach(task => rendertask(task));
// this loop will do is for each element in the Array, it will get to each element one by one and then run the render function onto it 


addtaskbtn.addEventListener('click',function () {
    const taskinp = todoinput.value.trim()
    // trim is used to trim leading or trailing whitespaces 

    // creating task obj 
    if(taskinp === "")return ;
    const taskdesc = {
        id: Date.now(),
        text: taskinp,
        completed : false
    };

    // pushing into task array 
    tasks.push(taskdesc)
    savetask();
    rendertask(taskdesc);
    todoinput.value = ""  //clear the input after adding 



})


function savetask(){
    // push array to local storage 
    //  setitem takes input in key value pair key can be anything for set item but value should strictly be a "stringgg!!!!"
    localStorage.setItem('tasks',JSON.stringify(tasks));

}


function rendertask(task){
    // const tasktxt = document.getElementsByClassName('task-text');
    const li = document.createElement('li');
    li.setAttribute('data-id',task.id);
    if(task.completed) li.classList.add('strikethrough')
    li.innerHTML = `<p class="task-text">${task.text}</p> <button class="done-btn">Done</button><button class = "deletebtn">Delete</button>`;


 todolist.appendChild(li);

li.addEventListener('click',(e)=>{
    if(e.target.className === 'done-btn'){
        task.completed = !task.completed;
        li.classList.toggle('strikethrough');
        savetask()
        
    }
    
})

    li.querySelector('.deletebtn').addEventListener('click',(e) =>{
        // to stop event bubbling
        e.stopPropagation

        // filter array method -  learn more from  docs 
        tasks = tasks.filter(t => t.id != task.id)
        li.remove();
        savetask();

        let a = tasks.filter(t=> t.id = task.id);
        console.log(a)

        
        
        
    })

   
}

// donetaskbtn.addEventListener('click',()=>{
//     tasktxt.classList.toggle('strikethrough');
// })



})