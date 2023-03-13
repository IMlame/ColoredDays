const boxCanvas = document.getElementById('boxCanvas')
const c2 = boxCanvas.getContext('2d')
const num_cols = 7
const num_rows = 5

boxCanvas.addEventListener("contextmenu", function (e) {
    e.preventDefault()
}, false)

var box_tracker = new Array(num_cols)
for(var i = 0; i < box_tracker.length; i++) {
    box_tracker[i] = new Array(num_rows).fill(0)
}

var block_size
var square_size

function calendarBoxes() {
    boxCanvas.width = window.innerWidth
    boxCanvas.height = window.innerHeight - 100

    // detrmine size of blocks
    block_size = boxCanvas.width/num_cols
    square_size = boxCanvas.width/(1.5 * num_cols)
    if(block_size * num_rows > boxCanvas.height) {
        block_size = boxCanvas.height/num_rows
        square_size = boxCanvas.height/(1.5 * num_rows)
    }

    // black background
    c2.fillStyle = 'black'
    c2.fillRect(0, 0, boxCanvas.width, boxCanvas.height)

    // draw squares
    for(let i = 0; i < num_cols; i++) {
        for(let j = 0;j < num_rows; j++) {
            x = i * block_size + (boxCanvas.width - block_size * num_cols + block_size - square_size) / 2
            y = j * block_size + (boxCanvas.height - block_size * num_rows + block_size - square_size) / 2
            
            
            c2.fillStyle = 'rgb(' + box_tracker[i][j] * 10 + ','  + box_tracker[i][j] * 10 + ',' + box_tracker[i][j] * 10 + ')'

            c2.fillRect(x, y, square_size, square_size)

            c2.fillStyle = 'green'
            c2.font = '24px serif'

            c2.fillText((i + 1) + j * num_cols, x + 6, y + 24)
        }
    }

    setTimeout(calendarBoxes, 50)
}

calendarBoxes()


// create calendar header
const headerCanvas = document.getElementById('headerCanvas')
const c1 = headerCanvas.getContext('2d')

function calendarHeader() {
    headerCanvas.width = window.innerWidth
    headerCanvas.height = 100
    c1.fillStyle = 'black'
    c1.fillRect(0, 0, headerCanvas.width, headerCanvas.height)

    c1.fillStyle = 'purple'
    c1.font = block_size/1.7 + 'px serif'
    c1.textAlign = 'center'
    c1.fillText("September 2022", headerCanvas.width/2, headerCanvas.height - headerCanvas.height/4)
    setTimeout(calendarHeader, 50)
}

calendarHeader()

boxCanvas.addEventListener('mousedown', function(event) {
    var elem = document.getElementById('boxCanvas')
    var click_x = event.pageX - elem.offsetLeft - elem.clientLeft
    var click_y = event.pageY - elem.offsetTop - elem.clientTop

    var x_squares = (click_x - (boxCanvas.width - block_size * num_cols + block_size - square_size) / 2) / block_size
    var y_squares = (click_y - (boxCanvas.height - block_size * num_rows + block_size - square_size) / 2) / block_size

    if(x_squares >= 0 && x_squares % 1 < square_size/block_size && y_squares % 1 < square_size/block_size) {
        if(event.button == 0) {
            box_tracker[Math.trunc(x_squares)][Math.trunc(y_squares)] = (box_tracker[Math.trunc(x_squares)][Math.trunc(y_squares)] + 1) % 10
        } else {
            box_tracker[Math.trunc(x_squares)][Math.trunc(y_squares)] = (box_tracker[Math.trunc(x_squares)][Math.trunc(y_squares)] - 1) % 10
        }

    }
}, false);

function getDays({year, month}) {
    return new Date(year, month, 0).getDate()
}