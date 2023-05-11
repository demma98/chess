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
            const text = document.createTextNode("a")
            const cell = document.createElement("td")

            if(dark){
                cell.className = "dark"
            }
            else{
                cell.className = "light"
            }
            dark = !dark

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

const boot = () => {
    document.getElementById("create_board").onclick = create_board
}

boot()