//  shuffle img 
let landing = document.querySelector(".landing")
let imgsArr = ["/imgs/landing02.jpg", "/imgs/landing03.jpg", "/imgs/landing04.jpg", "/imgs/landing05.jpg", "/imgs/landing06.jpg"];
let myInterval = setInterval(function() {
    let randomNum = Math.floor(Math.random() * imgsArr.length)
    landing.style.backgroundImage = `url(${imgsArr[randomNum]})`
}, 10000)

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
// chaneg color
function changeColor(e) {
    chosenColor = e.target.dataset.color
    document.documentElement.style.setProperty("--main-color", `#${chosenColor}`)
}
// add color to localstorage
function addToLocalStorage() {
    window.localStorage.setItem("color", chosenColor)
}