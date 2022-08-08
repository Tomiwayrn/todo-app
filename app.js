//declarations

const darkBtn = document.querySelector(".dark-button");
const lightBtn = document.querySelector(".light-button");
const audio = document.querySelector(".audio");
const root = document.querySelector(":root");
const submit = document.querySelector(".submit");
const input = document.querySelector(".input");
const errMessage = document.querySelector('.ErrMessage');
const todoContainer = document.querySelector(".todo-container");
const itemsLeft = document.querySelector(".task-left");
const AllBtn = document.querySelector(".allBtn")
const ActiveBtn = document.querySelector(".activeBtn")
const completedBtn = document.querySelector(".completedBtn")
const clearCompletedBtn = document.querySelector('.clear-btn')



let id;
let list;
let currentList;
let listArray = []
 




//function for theme functionality

let currentTheme = localStorage.getItem('to-do-theme');

//light button on click
    lightBtn.addEventListener("click", ()=>{
    currentTheme = `light`
    root.setAttribute('color-scheme' , `${currentTheme}`)
    audio.play()
    audio.currentTime = 0
    localStorage.setItem('to-do-theme', 'light' )
});



//dark button on click
    darkBtn.addEventListener("click", ()=>{
    currentTheme = `dark`;
    root.setAttribute('color-scheme' , `${currentTheme}`)
    audio.play()
    audio.currentTime = 0
    localStorage.setItem('to-do-theme', 'dark' )
});

//get user theme
function getTheme(){
    theme = root.getAttribute('color-scheme')
    currentTheme = window.matchMedia('(prefers-color-scheme:light)').matches?'light':'dark'
    return currentTheme
};
getTheme();



//Remember session on page load 

window.addEventListener("DOMContentLoaded" , ()=>{
    
    listArray = JSON.parse(localStorage.getItem('list'))?
    JSON.parse(localStorage.getItem('list')):[]
    addListOnLoad()
    checkCompleted()

    if (currentTheme = localStorage.getItem('to-do-theme')){
    root.setAttribute('color-scheme' , `${currentTheme}`)}
    else return
    
    
});


let listObj = {
    id ,
    list
}




//Add to the List
submit.addEventListener('click' , (e)=>{
   
 
    if (input.value.trim()== ""){
        
         setError(input , "Can't be blank")
    }
    else 
    newElement = document.createElement("li");
    const attr = document.createAttribute('data-id');
    id = new Date().getTime()
    attr.value = id.toString()
    newElement.setAttributeNode(attr);   
    id = new Date().getTime()
       
    listObj.id = id;
    listObj.list = input.value;
    listObj.complete = ''
    listArray.push(listObj)


    //set to local storage 
    setToLocal();
    

    //create list 

    newElement.classList.add('todo');
    newElement.classList.add('active');
    newElement.innerHTML = 
    `<button class="toggle-btn">
      <img src="./images/icon-check.svg" alt="check">
    </button>
    <p class="todo-value">${listObj.list}</p>
    <img src="./images/icon-cross.svg" class="delete-icon" alt="">
  `
  todoContainer.append(newElement);
  input.value = ''
 
  checkCompleted()
  

  newElement.addEventListener('click', (e)=>{
    addCompletedList(e)
    
    if (e.target.classList.contains('delete-icon')){
        deleteItem(e)
        checkCompleted()
    }
    
    if (e.target.classList.contains('toggle-btn')){
        addCompletedList(e)
      
    }
  })

});



function addCompletedList(e){
    //for list added to local storage

        let button = e.target.parentElement
       
    if  ((button.classList.contains('toggle-btn'))&&
        (!button.classList.contains('submit-btn'))){
            checkCompleted(e)

        button.nextElementSibling.classList.toggle('completed')
        button.parentElement.classList.toggle('complete')
           if (button.parentElement.classList.contains('active')){
            checkCompleted(e)
            button.parentElement.classList.remove('active') 
           }
           else if (!button.parentElement.classList.contains('active')){
            checkCompleted(e)
            button.parentElement.classList.add('active')
           }
         }  
    
     };



//function to load list from local storage
    function addListOnLoad(){
    if (!listArray.length == 0){
        listArray = JSON.parse(localStorage.getItem('list'))
        listArray.forEach(item => {
            
    let newElement = document.createElement("li");
    const attr = document.createAttribute('data-id');
    id = item.id
    attr.value = id.toString()
    newElement.setAttributeNode(attr);   
    newElement.classList.add('todo');
    newElement.classList.add('active');



    checkCompleted()
    newElement.innerHTML = 
    `<button class="toggle-btn list">
      <img src="./images/icon-check.svg" alt="check">
    </button>
    <p class="todo-value">${item.list}</p>
    <img src="./images/icon-cross.svg" class="delete-icon" alt="">
  `
  todoContainer.append(newElement);
  newElement.addEventListener('click' , (e)=>{
    addCompletedList(e)
    checkCompleted()
  
     if(event.target.classList.contains('delete-icon')){
         deleteItem()
         checkCompleted()
        }  

    }) 
    
    });
    }
    };
    
    

//function to check for completed
function checkCompleted(){
   
      let numberOfList = todoContainer.childElementCount 
    let completedCounter ;
 
    let completedList = todoContainer.querySelectorAll('.completed')
     completedCounter = completedList.length 
     itemsLeft.innerText = (numberOfList) - (completedCounter )
    
     
    
    };


    AllBtn.addEventListener('click', ()=>{
        showAll()
    
    });

    ActiveBtn.addEventListener('click', ()=>{
    showActive()
    });

    completedBtn.addEventListener('click' ,()=>{
        showCompleted()
        
    });



//## function to  show or hide active or completed

    function showActive(newElement){
        let completedList = todoContainer.querySelectorAll('.complete')
        for (let i = 0; i < completedList.length; i++){
            completedList[i].style.display = 'none'
            
        }
        
        let activeList = todoContainer.querySelectorAll('.active')
        for (let i = 0; i < activeList.length; i++){
         activeList[i].style.display= ''
        
        }
    
 
    };

function showCompleted(){
    let completedList = todoContainer.querySelectorAll('.complete')
    for (let i = 0; i < completedList.length; i++){
        completedList[i].style.display = ''
        
    }

    let activeList = todoContainer.querySelectorAll('.active')
     for (let i = 0; i < activeList.length; i++){
         activeList[i].style.display= 'none'
        
     }
   
}

function showAll(){
    let Lists = todoContainer.querySelectorAll('.todo')
    for (let i = 0; i < Lists.length; i++){
        Lists[i].style.display = ''
        
    }
};


//### function to delete completed
clearCompletedBtn.addEventListener("click" , ()=>{
    clearCompleted()
});

function clearCompleted(){

    let todo = [...document.querySelectorAll('.todo')]
    listArray = []
    let completed = todoContainer.querySelectorAll('.complete');
    completed.forEach(element => {
     element.remove()
    });   

    //set remaining list to local storage 

    todo.forEach(element => {
        let listObj = {id,list}
        listObj.id = element.dataset.id
        listObj.list = element.firstElementChild.nextElementSibling.textContent
        listArray.push(listObj)
        setToLocal() })
   
}



//#### function to add to local storage  ####
    function setToLocal(){
    if (listArray){
    localStorage.setItem('list' , JSON.stringify(listArray));
         
    }};

    function removeLocalStorage(){
        let items = JSON.parse(localStorage.getItem('list'));

        items= items.filter(function(item){
            if (item.id == id){
                console.log('nice')
            }
        })
            }


document.addEventListener('click' , ()=>{
    hightLightBtn(event)
})

    
//fucntion to highlight btn

 function hightLightBtn (event){
    let button = event.target.parentElement
    if(button.classList.contains('toggle-btn')){
      button.classList.toggle('active-submit')
        button.firstElementChild.style.opacity = '1';
        if(button.classList.contains('submit')){
         
              setTimeout(()=>{
                 button.firstElementChild.style.opacity = '';
              button.classList.remove("active-submit");
              }, 2000)
         }
    }
   
        };


// fuction to delete selected list
function deleteItem(e){
    let items = JSON.parse(localStorage.getItem('list'))
         
    //filter to set items not deleted to local storage
   items =  items.filter(function(item){
        if (item.id !=
        event.target.parentElement.getAttribute('data-id')){
              return item
             
        }});
        localStorage.setItem('list' , JSON.stringify(items))
        todoContainer.removeChild(event.target.parentElement);
        };

        function removeCurrent(e){
        if (e.target.classList.contains("delete-icon")){
        let parent = e.target.parentElement
        console.log(parent)   
        }};


// error hadler for input
function setError(input, message){

  errMessage.innerText = message
  setTimeout(()=>{
    errMessage.innerText = ""    
}, 2000)
      
  }
  