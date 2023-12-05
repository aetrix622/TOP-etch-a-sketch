const btnNewGrid = document.querySelector("#btnNewGrid");
const chkColorMode = document.querySelector("#chkColors");
const chkProgMode = document.querySelector("#chkProgressive");
const chkShowGrid = document.querySelector("#chkShowGrid");
const gridSize = document.querySelector("#gridSize");

window.addEventListener("DOMContentLoaded", (e) => {
    generateGrid(50,50);
});

btnNewGrid.addEventListener("click", (e) => { 
    // verify input. Input type is already number, so 
    // we just need to check range:
    let outOfBounds = false
    for (const field of [tbGridX, tbGridY]) {
        if (field.value > 100) {
            outOfBounds = true;
            field.value = 100;
        }
        if (field.value < 0) {
            outOfBounds = true;
            field.value = 1;
        }
    }
    if (outOfBounds == true) {
        alert("Grid dimensions cannot be greater than 100 or less than 0. Please check your input.");
        return;
    }
    // bounds ok: generate the grid
    let rows = tbGridY.value;
    let cols = tbGridX.value;
    generateGrid(cols, rows);
});

// generates a new grid with x cells horizontally and y cells vertically.
function generateGrid(x, y) {
    const container = document.querySelector("#grid");
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
    const initialStyle = element.style.getPropertyValue("background-color");
    let r, g, b, a;
    if (initialStyle == "") {
        // no style is set. choose a color.
        if (chkColorMode.checked) {
            r = random(255);
            g = random(255);
            b = random(255);
        } else {
            r = 0;
            g = 0;
            b = 0;
        }
        // Progressive alpha starts at a=0.1 if set. Otherwise a=1.
        if (chkProgMode.checked) {
            a = 0.1;
        } else a = 1;
    } else {
        // style is already set. Keep old rgb values.
        // add 0.1 to alpha if progressive alpha on and less than 1.
        let oldRGBA = getRgbaCode(initialStyle);
        r = oldRGBA.r;
        g = oldRGBA.g;
        b = oldRGBA.b;
        if (chkProgMode.checked && oldRGBA.a < 1) {
            // add 0.1 to current alpha
            a = oldRGBA.a + 0.1;
        } else {
            a = 1;
        }
    }
    element.style.backgroundColor = `rgba(${r}, ${g}, ${b}, ${a})`
}

function random(ceiling) {
    const randomNumber = Math.floor(Math.random() * ceiling);
    return randomNumber;
}

function getRgbaCode(string) {
    // expects "rgba(r,g,b,a)"
    // returns object {r, g, b, a}
    const substring = string.slice(
        string.indexOf("(") + 1,
        string.indexOf(")")
    );
    const parts = substring.split(",");
    const code = {
        r: parseInt(parts[0]),
        g: parseInt(parts[1]),
        b: parseInt(parts[2]),
        a: parseFloat(parts[3])
    }
    return code;
}
