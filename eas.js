const btnNewGrid = document.querySelector("#btnNewGrid");

window.addEventListener("DOMContentLoaded", (e) => {
    generateGrid(16,16);
});

btnNewGrid.addEventListener("click", (e) => { 
    let rows = prompt("Generating new grid. Number of rows?", 16);
    let cols = prompt("Number of columns?", 16);
    if (parseInt(rows) < 1 
    || parseInt(cols) < 1 
    || isNaN(rows)
    || isNaN(cols)) {
        alert("Bad input. Please try again.");
        return;
    }
    if (rows > 100) {
        alert("Maximum row limit exceeded. Setting rows to 100.");
        rows = 100;
    }
    if (cols > 100) {
        alert("Maximum column limit exceeded. Setting columns to 100.");
        cols = 100;
    }
    generateGrid(cols, rows);
});

// generates a new grid with x cells horizontally and y cells vertically.
function generateGrid(x, y) {
    const container = document.querySelector("#grid-container");
    container.innerHTML = "";
    for (i = 1; i <= y; i++) {
        const gridRow = document.createElement("div");
        gridRow.classList.add("gridrow");
        container.appendChild(gridRow);
        for (j = 1; j <= x; j++) {
            const gridCell = document.createElement("div");
            gridCell.classList.add("gridcell", "row-"+i, "col-"+j);
            gridCell.addEventListener("mouseenter", (e) => { colorCell(gridCell)});
            gridRow.appendChild(gridCell);
        }
    }
}

function colorCell(element) {
    element.classList.add("colored");
}

