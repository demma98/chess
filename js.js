const create_board = () => {
    console.log("create board")

    const width = parseInt(document.getElementById("width").value)
    const height = parseInt(document.getElementById("height").value)
    console.log(width, height)

    const board = document.createElement("table")
    const board_body = document.createElement("tbody")

    //number the columns
    const row = document.createElement("tr")
    const text = document.createTextNode("")
    const cell = document.createElement("td")
    cell.appendChild(text)
    row.appendChild(cell)
    for(let x = 0; x < width; x++){
        const text = document.createTextNode(String.fromCharCode(x + 65))
        const cell = document.createElement("td")
        cell.appendChild(text)
        row.appendChild(cell)
    }
    board_body.appendChild(row)

    
    let dark = false
    for(let y = 0; y < height; y++){
        const row = document.createElement("tr")
        //number the rows
        const rowNum = document.createTextNode(y + 1)
        const cell = document.createElement("td")
        cell.appendChild(rowNum)
        row.appendChild(cell)
        for(let x = 0; x < width; x++){
            const text = document.createTextNode(String.fromCharCode(x + 65) + (y + 1))
            const cell = document.createElement("td")

            if(dark){
                cell.className = "dark"
            }
            else{
                cell.className = "light"
            }
            dark = !dark

            cell.id = String.fromCharCode(x + 65) + (y + 1)

            cell.appendChild(text)
            row.appendChild(cell)
        }
        if(width % 2 == 0){
            dark = !dark
        }

        board_body.appendChild(row)
    }
    board.appendChild(board_body)
    document.getElementById("board").innerHTML = board.innerHTML
}

const place_pieces_western = () => {
    
}
let rows = 0
const new_piece = () => {
    const pieces = document.getElementById("pieces")
    const row = pieces.insertRow(0)

    const input_name = document.createElement("input")
    const input_symbol = document.createElement("input")
    const input_movement = document.createElement("input")
    input_name.type = "text"
    input_name.placeholder = "name"
    input_name.id = "in" + rows
    input_symbol.type = "text"
    input_symbol.placeholder = "symbol"
    input_symbol.id = "is" + rows
    input_movement.type = "text"
    input_movement.placeholder = "movement"
    input_movement.id = "im" + rows

    input_symbol.maxLength = 2

    const input_save = document.createElement("input")
    input_save.type = "button"
    input_save.value = "save"
    input_save.id = "save" + rows

    const name = document.createElement("p")
    const symbol = document.createElement("p")
    const movement = document.createElement("p")

    name.id = "n" + rows
    symbol.id = "s" + rows
    movement.id = "m" + rows

    const vars = [input_name,input_symbol,input_movement,input_save,name,symbol,movement]

    for(let i = 0; i < vars.length; i++){
        const cell = document.createElement("td")
        cell.appendChild(vars[i])
        row.appendChild(cell)
    }
    
    const rows_RAM = rows
    document.getElementById("save" + rows).onclick = () => {
        document.getElementById("n"+rows_RAM).innerHTML = document.getElementById("in"+rows_RAM).value
        document.getElementById("s"+rows_RAM).innerHTML = document.getElementById("is"+rows_RAM).value
        document.getElementById("m"+rows_RAM).innerHTML = document.getElementById("im"+rows_RAM).value
    }
    rows++
}

const boot = () => {
    document.getElementById("create_board").onclick = create_board
    document.getElementById("new_piece").onclick = new_piece
}

boot()