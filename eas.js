const chkColorMode = document.querySelector("#chkColors");
const chkProgMode = document.querySelector("#chkProgressive");
const chkShowGrid = document.querySelector("#chkShowGrid");
const gridSize = document.querySelector("#gridSize");
const txtGridSize = document.querySelector("#txtGridSize");

window.addEventListener("DOMContentLoaded", (e) => {
    generateGrid(50,50);
});

gridSize.addEventListener("change", (e) => {
    // fires only on release. use this to generate the grid
    generateGrid(gridSize.value, gridSize.value);
    showGrid();
});

gridSize.addEventListener("input", (e) => {
    // fires repeatedly while dragging control. Use this to continously
    // update the grid size display text
    txtGridSize.textContent = `${gridSize.value} X ${gridSize.value}`;
});

chkShowGrid.addEventListener("change", showGrid);

function showGrid() {
    const gridCells = Array.from(document.querySelectorAll(".gridcell"));
    for (const gridCell of gridCells) {
        if (chkShowGrid.checked) {
            gridCell.style.border = "1px solid darkgray";
        } else {
            gridCell.style.border = "0px solid darkgray";
        }
    }
}

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
