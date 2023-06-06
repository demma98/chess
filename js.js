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
                cell.style.backgroundColor = "#000000"
                cell.style.color = "#000000"
            }
            else{
                cell.style.backgroundColor = "#FFFFFF"
                cell.style.color = "#FFFFFF"
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

let rows = 0
const new_piece = () => {
    const pieces = document.getElementById("pieces")
    const row = pieces.insertRow(0)

    const input_name = document.createElement("input")
    const input_symbol = document.createElement("input")
    const input_movement = document.createElement("input")
    const input_position = document.createElement("input")
    const input_player = document.createElement("input")
    input_name.type = "text"
    input_name.placeholder = "name"
    input_name.id = "in" + rows
    input_symbol.type = "text"
    input_symbol.placeholder = "symbol"
    input_symbol.id = "is" + rows
    input_movement.type = "text"
    input_movement.placeholder = "movement"
    input_movement.id = "im" + rows
    input_position.type = "text"
    input_position.placeholder = "start position"
    input_position.id = "ip" + rows
    input_player.type = "number"
    input_player.max = 2
    input_player.min = 1
    input_player.placeholder = "player"
    input_player.id = "iP" + rows

    input_symbol.maxLength = 2

    const vars = [input_name,input_symbol,input_movement,input_position,input_player]

    for(let i = 0; i < vars.length; i++){
        const cell = document.createElement("td")
        cell.appendChild(vars[i])
        row.appendChild(cell)
    }
    
    rows++
}

let pieces = []
const save_pieces = () => {
    const table = document.getElementById("pieces")
    pieces = []
    for(let i = 0; i < table.rows.length; i++){
        pieces[i] = [document.getElementById("in"+i).value
        ,document.getElementById("is"+i).value
        ,document.getElementById("im"+i).value
        ,document.getElementById("ip"+i).value.toUpperCase()
        ,document.getElementById("iP"+i).value
        ,0]
    }
    console.log(pieces)
}

const refresh_pieces = () => {
    create_board()
    
    for(let i = 0; i < pieces.length; i++){
        const cell = document.getElementById(pieces[i][3].toUpperCase())
        cell.textContent = pieces[i][1]
        if(pieces[i][4] == 1){
            cell.style.color = "#FF0000"
        }
        else{
            cell.style.color = "#0000FF"
        }
        document.getElementById(pieces[i][3].toUpperCase()).innerHTML = cell.innerHTML
    }
}

const place_pieces = () => {
    save_pieces()
    refresh_pieces()
}

const valid = (movement, from, to, count) => {
    let resp = true

    const moves = movement.split(",")
    const from_div = from.match(/[a-zA-Z]+|[0-9]+/g)
    const from_x = from_div[0].charCodeAt(0) - 65
    const from_y = from_div[1] - 1
    
    const to_div = to.match(/[a-zA-Z]+|[0-9]+/g)
    const to_x = to_div[0].charCodeAt(0) - 65
    const to_y = to_div[1] - 1

    for(let i = 0; i < moves.length; i++){
        let parms = moves[i]
        //here's where the magic happens
        if(resp){
            console.log(parms)
            let directions = [true,true,true,true,true,true,true,true]  //like a clock
            let condition = true
            let capture = false
            if(/^i*$/.test(parms)){
                if(count > 0){
                    condition = false
                }
            }

            
            if(/<>/.test(parms)){
                directions = [true,true,false,true,true,true,false,true]
            }
            else if(/>=/.test(parms)){
                directions = [true,true,true,false,false,false,true,true]
            }
            else if(/<=/.test(parms)){
                directions = [false,false,true,true,true,true,true,false]
            }
            else if(/X>/.test(parms)){
                directions = [false,true,false,false,false,false,false,true]
            }
            else if(/X</.test(parms)){
                directions = [false,false,false,true,false,true,false,false]
            }
            else if(/\*/.test(parms)){
                directions = [true,true,true,true,true,true,true,true]
            }
            else if(/\+/.test(parms)){
                directions = [true,false,true,false,true,false,true,false]
            }
            else if(/>/.test(parms)){
                directions = [true,true,false,false,false,false,false,true]
            }
            else if(/</.test(parms)){
                directions = [false,false,false,true,true,true,false,false]
            }
            else if(/=/.test(parms)){
                directions = [false,false,true,false,false,false,true,false]
            }
            else if(/X/.test(parms)){
                directions = [false,true,false,true,false,true,false,true]
            }
            if(condition){
                if(/^~*$/.test(parms)){
                }
                else if(/^\^*$/.test(parms)){
                }
                else {
                    if(is_piece(to)){
                        capture = true
                    }
                }

                if(/^c*$/.test(parms) && capture){
                    resp = false
                }
            }

            resp = condition
        }
    }

    return resp
}

const move = () => {
    const from_RAW = document.getElementById("from").value.toUpperCase()
    const to_RAW = document.getElementById("to").value.toUpperCase()

    for(let i = 0; i < pieces.length; i++){
        if(pieces[i][3] == from_RAW){
            console.log(valid(pieces[i][2],from_RAW,to_RAW,pieces[i][5]))
            if(valid(pieces[i][2],from_RAW,to_RAW,pieces[i][5])){
                pieces[i][5] = pieces[i][5] + 1
                console.log(pieces[i][3] +"="+ to_RAW)
                pieces[i][3] = to_RAW
                console.log(pieces[i][3] +"="+ to_RAW)
                refresh_pieces()
            }
        }
    }
}

const is_piece = (cell) => {
    let resp = false
    cell = cell.toUpperCase()
    for(let i = 0; i < pieces.length; i++){
        if(pieces[i][3] == cell){
            resp = true
        }
    }
    return resp
}

const boot = () => {
    document.getElementById("create_board").onclick = create_board
    document.getElementById("new_piece").onclick = new_piece
    document.getElementById("place_pieces").onclick = place_pieces
    document.getElementById("move").onclick = move
}

boot()