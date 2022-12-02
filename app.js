const form = document.getElementById("formid")      
const input = document.querySelector(".addItems-input")
const groceryList = document.querySelector(".grocery-list")
const submitBtn = document.querySelector(".addItems-submit")
const clearBtn = document.querySelector(".displayItems-clear")
const groceryItemTitle = document.querySelector(".grocery-item__title")
const alertDisplayTop = document.querySelector(".addItems-action")
const alertDisplayBottom = document.querySelector(".displayItems-action")

document.addEventListener('DOMContentLoaded', displayStorage);

function createItem(value){ 
    form.addEventListener("submit" , function(e){
        e.preventDefault();
        console.log(input.value)
        const value = input.value
        if(value !== ""){
            const element = document.createElement("div")
            element.classList.add("grocery-item")
            //add childeren to parent div
            element.innerHTML = `<h4 class="grocery-item__title">${value}</h4>
            <a href="#" class="grocery-item__link">
            <svg class="svg-inline--fa fa-trash-alt fa-w-14" aria-hidden="true" focusable="false" data-prefix="far" data-icon="trash-alt" role="img" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512" data-fa-i2svg=""><path fill="currentColor" d="M268 416h24a12 12 0 0 0 12-12V188a12 12 0 0 0-12-12h-24a12 12 0 0 0-12 12v216a12 12 0 0 0 12 12zM432 80h-82.41l-34-56.7A48 48 0 0 0 274.41 0H173.59a48 48 0 0 0-41.16 23.3L98.41 80H16A16 16 0 0 0 0 96v16a16 16 0 0 0 16 16h16v336a48 48 0 0 0 48 48h288a48 48 0 0 0 48-48V128h16a16 16 0 0 0 16-16V96a16 16 0 0 0-16-16zM171.84 50.91A6 6 0 0 1 177 48h94a6 6 0 0 1 5.15 2.91L293.61 80H154.39zM368 464H80V128h288zm-212-48h24a12 12 0 0 0 12-12V188a12 12 0 0 0-12-12h-24a12 12 0 0 0-12 12v216a12 12 0 0 0 12 12z"></path></svg></i>
            </a>`
            //add created element to grocery list
            groceryList.appendChild(element)
            updateStorage(value);
            //after adding the value to the Grocery Items now we should clear the input value 
            input.value = ""

            //Delete each button
            const groceryItems = groceryList.querySelectorAll(".grocery-item")
            for(let i = 0 ; i < groceryItems.length ; i++){
                const deleteEachBtn = document.querySelectorAll(".fa-trash-alt")      //each delete button
                console.log(deleteEachBtn)
                deleteEachBtn[i].addEventListener("click" , function(){
                    if(groceryList !== 0){
                        console.log(element.parentNode)   
                        console.log(groceryItems[i])
                        element.parentNode.removeChild(groceryItems[i])  
                        //delete each button in local storage
                        deleteStorage(value);         
                    }
                    //alert in bottom section
                    alertDisplayBottom.style.display = "block"
                    alertDisplayBottom.classList.add("success")
                    alertDisplayBottom.innerHTML = `${value} Removed From the List`
                    setTimeout(() => {
                        alertDisplayBottom.classList.remove("success")
                        alertDisplayBottom.style.display = "none"
                    }, 3000);
                }) 
            }

            //Clear all items
            clearBtn.addEventListener("click" , function(){
                groceryList.removeChild(element)
                alertDisplayBottom.style.display = "block"
                alertDisplayBottom.classList.add("alert")
                alertDisplayBottom.innerHTML = `All Items Deleted`
                setTimeout(() => {
                    alertDisplayBottom.classList.remove("alert")
                    alertDisplayBottom.style.display = "none"
                }, 3000);
                //remove the local storage table completly
                localStorage.removeItem('groceryList');
            })

            //alert on the top section
                alertDisplayTop.classList.add("success")
                alertDisplayTop.style.display = "block"
                alertDisplayTop.innerHTML= `${value} Added to the List`
                setTimeout(() => {
                    alertDisplayTop.classList.remove("success")
                    alertDisplayTop.style.display = "none"
                }, 3000);
        
        }else{
            alertDisplayTop.classList.add("alert")
            alertDisplayTop.style.display = "block"
            alertDisplayTop.innerHTML = `Please Add Grocery Item`
            setTimeout(() => {
                alertDisplayTop.classList.remove("alert")
                alertDisplayTop.style.display = "none"
            }, 3000);
        }
    })  

}createItem()


//*******Local Storage**********/
function updateStorage(value){
    let groceryList;
    groceryList = localStorage.getItem('groceryList') ? JSON.parse(localStorage.getItem('groceryList')) : [];
    groceryList.push(value);
    localStorage.setItem('groceryList', JSON.stringify(groceryList));
}
//display items in local storage
function displayStorage(){
    let exists = localStorage.getItem('groceryList');
    if(exists){
        let storageItems = JSON.parse(localStorage.getItem('groceryList'));
        storageItems.forEach(function(element){
            createItem(element);   
        })
    }
}
//delete each items of the list
function deleteStorage(item){
    let groceryItems = JSON.parse(localStorage.getItem('groceryList'));
    let index = groceryItems.indexOf(item);
    console.log(index)
    groceryItems.splice(index, 1);
    //first delete existing list
    localStorage.removeItem('groceryList');
    //add new updated/edited list
    localStorage.setItem('groceryList', JSON.stringify(groceryItems));
}