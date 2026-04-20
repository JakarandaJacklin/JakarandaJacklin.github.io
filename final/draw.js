const volLabel = document.querySelector("#vol-label")


const canvas = document.querySelector("#bar")
const ctx = canvas.getContext('2d', { willReadFrequently: true })
const toolBut = document.querySelector("#button-tool")
const subBut = document.querySelector("#submit")
const indicator = document.querySelector("#indicator")
const inctx = indicator.getContext('2d', { willReadFrequently: true })

let erase = false
let draw = false

let state = true
let volNum = 0
let submitting = false

const brush = 10

const colors = ["red", "blue", "green", "pink"]
let ind = 0

const barW = 200
const barH = 20

const yStart = (canvas.height - barH) / 2
const xStart = (canvas.width - barW) / 2


canvas.addEventListener('mousedown', mouseDown)
document.addEventListener('mouseup', mouseUp)
canvas.addEventListener('mousemove', drawPixel)
toolBut.addEventListener("click", toolButton)
subBut.addEventListener("click", submitButton)

let thisCol = []
let globalPerc = 0



function drawBounds(){
    ctx.globalAlpha = 1
    ctx.strokeStyle = "green"
    ctx.strokeRect(xStart + 0.5, yStart + 0.5, barW + 1, barH)
}


function drawPixel(event) {
    if (draw == true && state == true){
        if (erase == false){
            ctx.fillStyle = 'black'
            ctx.fillRect(event.clientX - canvas.offsetLeft - (brush / 2), event.clientY - canvas.offsetTop - (brush/2), brush, brush)
            drawBounds()
        } else {
            ctx.clearRect(event.clientX - canvas.offsetLeft - (brush / 2), event.clientY - canvas.offsetTop - (brush/2), brush, brush)
            drawBounds()
        }
    }
}

function mouseDown(event){
    draw = true
    drawPixel(event)
}

function mouseUp(){
    draw = false

    let per = calcVolumePercent()
    //volLabel.textContent = "Volume: " + (per * 100).toFixed(0)
}

function calcVolumePercent(){
    width = canvas.width + 0
    height = canvas.height

    ind = 0

    //console.log(width)
    
    const imgData = ctx.getImageData(0, 0, width, height)
    const pxs = imgData.data

    fillpx = 0
    
    let i = 0

    let prevCol = []
    
    for (i = 0; i < xStart; i++){
        globalPerc = i
        prevCol = thisCol
        col = scanEmptyCol(i, width, height, pxs)
        if (col == false) {
            return (fillpx / width)
        }
    }

    for (i = xStart + 1; i < (xStart + barW + 1); i++){
        prevCol = thisCol 
        col = scanCol(i, width, height, pxs)
        globalPerc = i
        if (col == false) {
            return (fillpx / barW)
        } else {
            ctx.fillStyle = "red"
            //ctx.fillRect(i, yStart + 1, 1, 19)
            fillpx = fillpx + 1
        }
    }

    globalPerc = globalPerc + 1

    for (i = xStart + barW + 2; i < width; i++){
        
        col = scanEmptyCol(i, width, height, pxs)
        if (col == false) {
            globalPerc = 1
            return 0
            
        }
    }

    //console.log(fillpx)
    

    return (fillpx / barW)

}


function getPixelColor(x, y, width, px) {
    const i = (y * width + x) * 4
    return {
        r: px[i],
        g: px[i + 1],
        b: px[i + 2],
        a: px[i + 3]
    }
}

function scanCol(x, width, height, px){
    //console.log(height)
    for (let i = 0; i < (height + 1); i++){
        color = getPixelColor(x, i, width, px)
        thisCol.push(color)
        //console.log(color)
        if (i < yStart){
            if (color.a > 0){
                //console.log("Above")
                //ctx.fillStyle = "red"
                //ctx.fillRect(x, i, 1, 1)
                return false
            }

        } else if (i > (yStart + barH)){
            if (color.a > 0) {
                //console.log("below")
                return false
            }
        } else {
            if (color.a == 0){
                // This returns if the pixel is NOT filled in the correct area
                //console.log("koffe")
                return false
            }
        }
        
    }
    //console.log("peep")
    
    //ind = ind + 1
    //if (ind == 5) { ind = 0 }
    // This returns if the pixel IS filled
    return true
}



function scanEmptyCol(x, width, height, px){
    //console.log(height)
    
    for (let i = 0; i < (height + 1); i++){
        color = getPixelColor(x, i, width, px)
        thisCol.push(color)
        if (color.a > 0){
            return false
        }
    }
    return true
}


function toolButton(){
    if (state == false){
        state = true
        subBut.textContent = "Check"
        toolBut.textContent = "Draw"
        erase = false
        inctx.clearRect(0, 0, 1, 50)

    } else {
        if (erase == false){
            erase = true
            toolBut.textContent = "Erase"
        } else {
            erase = false
            toolBut.textContent = "Draw"
        }
    }

}

function submitButton(){
    if (state == true) {
        check()
        state = false
        subBut.textContent = "Submit"
        toolBut.textContent = "Tweak"
    } else {
        if (submitting == false){
            submittt()
        }
    }
}


function check(){
    let perc = calcVolumePercent()
    volNum = Number((perc * 100).toFixed(0))

    console.log(globalPerc)
    indicator.width = 1
    inctx.fillStyle = "red"
    inctx.fillRect(0, 0, 1, indicator.height)
    indicator.animate([
        { transform: 'translateX(0px)' },
        { transform: `translateX(${globalPerc}px)` }
        ], {
        duration: 300, // Speed in milliseconds
        fill: 'forwards' // Keeps the element at the 5px position after moving
        });
    //volLabel.textContent = "Volume: " + (perc * 100).toFixed(0)

}

waitingNumber = 0
waitingint = 0

function submittt(){
    if (volNum == 0) {
        submitting = false
        state = true
        subBut.textContent = "Check"
        toolBut.textContent = "Draw"
        erase = false
        inctx.clearRect(0, 0, 1, 50)
        ctx.clearRect(0, 0, canvas.width, canvas.height)
        drawBounds()
        volLabel.textContent = "Volume: 0%"


    } else {
        submitting = true
        waitingNumber = 0
        waitingint = setInterval(() => {
        //console.log(waitingNumber)
        //console.log(volNum)
        volLabel.textContent = "Volume: " + waitingNumber + "%"
        ctx.fillStyle = "blue"
        ctx.clearRect(0, 0, (waitingNumber + 1) * (canvas.width / (volNum + 1)), canvas.height)
        //ctx.clearRect(0, 0, waitingNumber * (canvas.width / volNum), canvas.height) //- ((canvas.width / volNum) * waitingNumber), canvas.height)
        drawBounds()
        if (waitingNumber == volNum){
            clearInterval(waitingint)
            submitting = false
            state = true
            subBut.textContent = "Check"
            toolBut.textContent = "Draw"
            erase = false
            inctx.clearRect(0, 0, 1, 50)
        }
        waitingNumber = waitingNumber + 1

        }, 1500 / (volNum + 1));
    }
}



drawBounds()