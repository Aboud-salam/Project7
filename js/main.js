//  shuffle img 
let landing = document.querySelector(".landing")
let originalImg = landing.dataset.img
let imgsArr = ["/imgs/landing02.jpg", "/imgs/landing03.jpg", "/imgs/landing04.jpg", "/imgs/landing05.jpg", "/imgs/landing06.jpg"];
let myInterval;
let randomizeOption = true;
let backgroundLocalStoarage = localStorage.getItem("randomize-option")
if (backgroundLocalStoarage !== null) {
    if (localStorage.getItem("randomize-option") !== "true") {
        randomizeOption = false
        document.querySelector(".option-box .btns .active").classList.remove("active")
        document.querySelector(".option-box .btns .no").classList.add("active")
    }
}
function shuffleFun() {
    if (randomizeOption === true) {
        myInterval = setInterval(function() {
            let randomNum = Math.floor(Math.random() * imgsArr.length)
            landing.style.backgroundImage = `url(${imgsArr[randomNum]})`
        }, 10000)
    }
}
shuffleFun()
// random background option
let btnsArr = document.querySelectorAll(".option-box .btns span")
let randomBackground;
btnsArr.forEach(btn => {
    btn.addEventListener("click", function(e) {
        e.target.parentElement.querySelectorAll(".active").forEach(el => el.classList.remove("active"))
        e.target.classList.add("active")
        if (e.target.dataset.background === "yes") {
            randomizeOption = true;
            shuffleFun()
            localStorage.setItem("randomize-option", randomizeOption)
        } else {
            randomizeOption = false;
            clearInterval(myInterval)
            landing.style.backgroundImage = `url(${originalImg})`
            localStorage.setItem("randomize-option", randomizeOption)
        }
    })
})

//color settings
let settingsIcon = document.querySelector(".settings .settings-icon")
let colorsArr = Array.from(document.querySelectorAll(".option-box .colors li"))
// settings menu toggle
let chosenColor = ""; 
settingsIcon.onclick = function() {
    document.querySelector(".settings").classList.toggle("clicked")
}

// handling  localstorage
if (window.localStorage.getItem("color")) {
    document.documentElement.style.setProperty("--main-color", `#${localStorage.getItem("color")}`)
    colorsArr.forEach(element => {
        if (element.dataset.color == localStorage.getItem("color")) {
            element.parentElement.querySelectorAll(".active").forEach(e => e.classList.remove("active"))
            element.classList.add("active")
        }
    })
}
// handling colors
colorsArr.forEach(color => {
    color.addEventListener("click", function(e) {
        // other way to delete active class from all elements
        // e.target.parentElement.querySelectorAll(".active").forEach(element => {element.classList.remove("active")})
        colorsArr.forEach(c => {
            c.classList.remove("active")
        })
        e.target.classList.add("active")
        changeColor(e)
        addToLocalStorage()
    })
})
// change color
function changeColor(e) {
    chosenColor = e.target.dataset.color
    document.documentElement.style.setProperty("--main-color", `#${chosenColor}`)
}
// add color to localstorage
function addToLocalStorage() {
    window.localStorage.setItem("color", chosenColor)
}
// nav toggle 
let barIcon = document.querySelector(".icon")
let links = document.querySelector(".nav-area .links")
let loginbBtn = document.querySelector(".login-btn")
let nav = document.querySelector(".nav-area")
let arr = [];
arr.push(links,loginbBtn,nav)
barIcon.onclick = function() {
    arr.forEach(e => {
        e.classList.toggle("open")
    })
}
// skills progress on scroll
let ourSkills = document.querySelector(".our-skills")
let spans = document.querySelectorAll(".progress span")
let started = false
window.onscroll = function() {
    if (scrollY >= ourSkills.offsetTop) {
        spans.forEach(e => {
            let width = e.dataset.progress
            e.style.width = `${width}%`
        })
        if (!started) {
            spans.forEach(element => increaseNums(element))
        }
        started = true
    }
}
function increaseNums(element) {
    let counter = 0
    let dataProgress = element.dataset.progress
    let progInterval = setInterval(()=> {
        counter++
        element.dataset.width = `${counter}%`
        if (counter == dataProgress) {
            clearInterval(progInterval)
        }
    }, 1000 / dataProgress)
}