async function getMyTasks() {
    const username = document.getElementById('usernameInput').value;
    const taskListDiv = document.getElementById('taskList');

    if (!username) return alert("กรุณาพิมพ์ชื่อก่อนนะ!");

    try {
        // ยิง Fetch ไปที่ Backend ที่เราเพิ่งสร้าง
        const response = await fetch(`http://localhost:3000/tasks/${username}`);
        const data = await response.json();

        if (response.status !== 200) {
            taskListDiv.innerHTML = `<p class="text-red-500">${data.error}</p>`;
            return;
        }

        // ล้างข้อมูลเก่าแล้ววนลูปแสดงผลใหม่
        taskListDiv.innerHTML = ""; 
        data.forEach(task => {
            taskListDiv.innerHTML += `
                <div class="p-3 border rounded shadow-sm bg-white flex justify-between">
                    <span>${task.title}</span>
                    <span class="${task.is_completed ? 'text-green-500' : 'text-orange-500'}">
                        ${task.is_completed ? '✅ สำเร็จ' : '⏳ รอดำเนินการ'}
                    </span>
                </div>
            `;
        });
    } catch (error) {
        console.error("Error:", error);
        alert("เชื่อมต่อ Server ไม่ได้!");
    }
}

// Learn Zone

// Show text
//document.write("Jame.com")
//document.write("<br>")
//document.write("jame.com")

//alert("you found Jame.com!!!") // pop up alert

// Show info in console of browser (click F12 to navigate console browser)
//console.log("have some one found Jame.com")
//console.error("Found Jame.com VIrus")
//console.warn("Be carefull")

//Variaable
/*var num = 6
let name = "jame"
const $num = 5

console.log("Name is "+name)
document.write(num)
//alert("Your lucky number to day is " + $num + " !")

let nb = "6", x
console.log("nb is "+typeof(nb))

x = parseInt(nb)
console.log("X is "+typeof(x))
console.log("X is "+typeof(x.toString()))

let my_array = [1,2,3,4,5,6,7,8,9,"10"], thing = Array("jame", "Khim", "New Boyfriend")
let my_object = {one:1, two:2, three:3, four:4, five:5}

console.log(thing[0])
thing[0] = "New second Boyfriend"
console.log(thing[0])
console.log(thing)


/*for (let index = 0; index < my_array.length; index++) {
    const element = my_array[index];
    element == "10" ? console.log(element) : console.log(element);
}*/

/*for (let index = 0; index < 14; index++) {
    const month = index
    switch(month){
        case 1:console.log("January")
        break

        case 2:console.log("Febuary")
        break

        case 3:console.log("March")
        break

        case 4:console.log("April")
        break

        case 5:console.log("May")
        break

        case 6:console.log("June")
        break

        case 7:console.log("July")
        break

        case 8:console.log("Augus")
        break

        case 9:console.log("September")
        break

        case 10:console.log("October")
        break

        case 11:console.log("November")
        break

        case 12:console.log("December")
        break

        default: console.log("that month do not exits")
    }
}*/

/*let count
while (true) {
    console.log(count + "Hello Jame!")
}*/

/*function $thing(num){
    console.log("Jame is comming in " + num + " minute")
}

function Sum(a, b){
    return a + b
}

$thing(Sum(5,8))*/

/*let object = {
    name : "jame",
    age : 19,
    heigh : 163,
    weight : 60,
    getInfo:function(){
        return "Name is " + this.name + "| Age is " + this.age
        +"| Heigh is " + this.heigh + "| Weight " + this.weight
    }
}

console.log(object.getInfo())*/


/*let result, a = document.querySelector('#dontknow')

function displaytextTrue(){
    a.innerText="What the Fu**, Why u change the text!!!"
}

function displaytextFalse(){
    a.innerHTML="Why aren't u click the other one?"
}

function showAlert(){
    //alert("Yeah")
    result = confirm("Are u sure, U want to change text below?")

    try{
        result == true ? displaytextTrue() : displaytextFalse()
    }catch{
        console.log("Error What ???")
    }
}*/

/*const p1 = document.getElementById('p1');

function showAlert(){
    p1.style.color = "red";
    p1.style.background = "yellow";
}*/

const box = document.getElementById('box');
const addStyle = document.getElementById('AddStyle');
const deleteStyle = document.getElementById('DeleteStyle');
const swapStyle = document.getElementById('SwapStyle');
let status;

addStyle.addEventListener('click', AddStyle);
deleteStyle.addEventListener('click', DeleteStyle);
swapStyle.addEventListener('click', SwapStyle);

function AddStyle(){
    box.classList.add("darkMode");
}

function DeleteStyle(){
    box.classList.remove("darkMode");
}

function SwapStyle(){
    box.classList.toggle("darkMode");
    status = box.classList.contains("darkMode");
    console.log(status);
}