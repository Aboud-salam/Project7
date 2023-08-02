//  shuffle img 
let landing = document.querySelector(".landing")
let originalImg = landing.dataset.img
let imgsArr = ["/imgs/landing02.jpg", "/imgs/landing03.jpg", "/imgs/landing04.jpg", "/imgs/landing05.jpg", "/imgs/landing06.jpg"];
let myInterval;
let randomizeOption = true;
let backgroundBtns = document.querySelectorAll(".background-shuffle .btns span")
let backgroundLocalStoarage = localStorage.getItem("randomize-option")
if (backgroundLocalStoarage !== null) {
    if (localStorage.getItem("randomize-option") !== "true") {
        randomizeOption = false
        localClassesHan(backgroundBtns, document.querySelector(".background-shuffle .btns .no"))
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
let randomBackground;
backgroundBtns.forEach(btn => {
    btn.addEventListener("click", function(e) {
        handleClasses(e)
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
        handleClasses(e)
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
function handleClasses(e) {
    e.target.parentElement.querySelectorAll(".active").forEach(e => {
        e.classList.remove("active")
    })
    e.target.classList.add("active")
}
// nav toggle 
let barIcon = document.querySelector(".icon")
let links = document.querySelector(".nav-area .links")
let loginbBtn = document.querySelector(".login-btn")
let nav = document.querySelector(".nav-area")
const mediaQueryNav = window.matchMedia('(min-width: 768px)')
let arr = [];
arr.push(links,loginbBtn,nav)
barIcon.addEventListener("click", e => {
    arr.forEach(e => {
        e.classList.toggle("open")
    })
})
// stop the propagation to prevent the parent element from accessing the event.
// Basically, this method is used to prevent the propagation of the same event from being called
nav.onclick = function (e) {
    e.stopPropagation()
}
document.addEventListener("click", e => {
    if (e.target !== nav) {
        if (nav.classList.contains("open")) {
            arr.forEach(e => {
                e.classList.toggle("open")
            })
        }
    }
})
// skills progress on scroll
let ourSkills = document.querySelector(".skills")
let spans = document.querySelectorAll(".progress span")
let started = false
window.onscroll = function() {
    if (scrollY > (ourSkills.offsetTop + ourSkills.offsetHeight - this.innerHeight)) {
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
// imgs pop up
let gallery = document.querySelector(".gallery")
let galleryImgs = document.querySelectorAll(".gallery .container img")
const mediaQueryImgs = window.matchMedia('(min-width: 768px)')
galleryImgs.forEach(img => {
    img.addEventListener("click", (e) => {
        if (mediaQueryImgs.matches) {
            let src = img.src
            let overlay = document.createElement("div")
            overlay.classList.add("gallery-over")
            let overlayContent = document.createElement("div")
            overlayContent.classList.add("overlay-content")
            let overImg = document.createElement("img")
            overImg.src = `${src}`
            overlayContent.appendChild(overImg)
            let iconDiv = document.createElement("div")
            iconDiv.classList.add("x-btn")
            let xIcon = document.createElement("i")
            xIcon.classList.add("fa-solid", "fa-x")
            iconDiv.appendChild(xIcon)
            overlayContent.appendChild(iconDiv)
            if (img.alt !== null) {
                let imgHeading = document.createElement("h3")
                imgHeading.appendChild(document.createTextNode(img.alt))
                overlayContent.prepend(imgHeading)
            }
            overlay.appendChild(overlayContent)
            gallery.prepend(overlay)
            iconDiv.onclick = function() {
                overlay.remove()
            }
        }
    })
})
// scroll to sections function
let sectionsArr = ["about", "skills", "gallery", "timeline", "features", "testimonials", "contact"];
let navBullets = document.querySelector(".nav-bullets")
sectionsArr.forEach(sec => {
    let bullet = document.createElement("div")
    bullet.classList.add("bullet")
    bullet.dataset.section = `.${sec}`
    let tipTool = document.createElement("div")
    tipTool.classList.add("tip-tool")
    tipTool.appendChild(document.createTextNode(`${sec}`))
    bullet.appendChild(tipTool)
    navBullets.appendChild(bullet)
})
let bullets = document.querySelectorAll(".nav-bullets .bullet")
let navLinks = document.querySelectorAll(".links a")
function scrollTO(elements) {
    elements.forEach(el => {
        el.addEventListener("click", (e) => {
            // prevent default to disable the a tag click as its a link originally
            e.preventDefault();
            document.querySelector(e.target.dataset.section).scrollIntoView({
                behavior: 'smooth'
            })
        })
    })
}
scrollTO(bullets)
scrollTO(navLinks)

// bullets option
let bulletsBtns = document.querySelectorAll(".bullets-option .btns span")
let bulletsOption = true;

// local storage handling
if (localStorage.getItem("bullets-option")) {
    if (localStorage.getItem("bullets-option") !== "true") {
        bulletsOption = false;
        bulletsHandler()
        localClassesHan(bulletsBtns, document.querySelector(".bullets-option .btns .no"))
    }
}
bulletsBtns.forEach(btn => {
    btn.addEventListener("click", e => {
        handleClasses(e)
        if (e.target.dataset.bullets === "yes") {
            bulletsOption = true;
            localStorage.setItem("bullets-option", bulletsOption)
            bulletsHandler()
        }
        if (e.target.dataset.bullets === "no") {
            bulletsOption = false;
            localStorage.setItem("bullets-option", bulletsOption)
            bulletsHandler()
        }
    })
})
function bulletsHandler() {
    if (bulletsOption === true) {
        document.querySelector(".nav-bullets").style.display = "block"
    } else {
        document.querySelector(".nav-bullets").style.display = "none"
    }
}
function localClassesHan(elements, noBtn) {
    elements.forEach(e => {
        e.classList.remove("active")
    })
    noBtn.classList.add("active")
}
// reset btn 
let resetBtn = document.querySelector(".reset-btn")
resetBtn.onclick = function () {
    localStorage.clear()
    location.reload()
}