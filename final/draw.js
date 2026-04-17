const volLabel = document.querySelector("#vol-label")


const canvas = document.querySelector("#bar")
const ctx = canvas.getContext('2d', { willReadFrequently: true })
let draw = false

const brush = 20

const colors = ["red", "blue", "green", "pink"]
let ind = 0


canvas.addEventListener('mousedown', mouseDown)
document.addEventListener('mouseup', mouseUp)
canvas.addEventListener('mousemove', drawPixel)

function drawPixel(event) {
    if (draw == true){
        ctx.fillStyle = 'black'
        ctx.fillRect(event.clientX - canvas.offsetLeft - (brush / 2), event.clientY - canvas.offsetTop - (brush/2), brush, brush)
    }
}

function mouseDown(event){
    draw = true
    ctx.fillStyle = 'black'
    ctx.fillRect(event.clientX - canvas.offsetLeft - (brush / 2), event.clientY - canvas.offsetTop - (brush/2), brush, brush)
}

function mouseUp(){
    draw = false

    let per = calcVolumePercent()
    volLabel.textContent = (per * 100)
}

function calcVolumePercent(){
    width = canvas.width + 0
    height = canvas.height

    ind = 0

    //console.log(width)
    
    const imgData = ctx.getImageData(0, 0, width, height)
    const pxs = imgData.data

    fillpx = 0
    
    for (let i = 0; i < width; i++){
        col = scanCol(i, width, height, pxs)
        if (col == false) {
            return (fillpx / width)
        } else {
            ctx.fillStyle = "red"
            ctx.fillRect(i, 0, 1, height)
            fillpx = fillpx + 1
        }
    }

    //console.log(fillpx)
    

    return (fillpx / width)

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
    console.log(height)
    for (let i = 0; i < (height + 1); i++){
        color = getPixelColor(x, i, width, px)
        console.log(color)
        if (color.a == 0){
            // This returns if the pixel is NOT filled
            console.log("koffe")
            return false
            
        }
        
    }
    console.log("peep")
    
    //ind = ind + 1
    //if (ind == 5) { ind = 0 }
    // This returns if the pixel IS filled
    return true
}