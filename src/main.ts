import AFRAME from 'aframe';

AFRAME; // Put this so it gets included in the bundle

const xCoeffInput = document.getElementById("x-coeff") as HTMLInputElement;
const yCoeffInput = document.getElementById("y-coeff") as HTMLInputElement;
const zCoeffInput = document.getElementById("z-coeff") as HTMLInputElement;
const operatorSelect = document.getElementById("operator") as HTMLSelectElement;
const graphButton = document.getElementById("graph-button") as HTMLButtonElement;
const graphContainer = document.getElementById("graph-container") as HTMLDivElement;

function drawGraph() {
    graphContainer.innerHTML = "";

    const xCoeff = parseFloat(xCoeffInput.value);
    const yCoeff = parseFloat(yCoeffInput.value);
    const zCoeff = parseFloat(zCoeffInput.value);
    const operator = operatorSelect.value;

    const graphSize = 20;

    for (let x = -graphSize; x <= graphSize; x++) {
        for (let y = -graphSize; y <= graphSize; y++) {

            let leftSideOfEquation;

            if (operator === "+") {
                leftSideOfEquation = (xCoeff * x) + (yCoeff * y);
            } else if (operator === "-") {
                leftSideOfEquation = (xCoeff * x) - (yCoeff * y);
            } else if (operator === "*") {
                leftSideOfEquation = (xCoeff * x) * (yCoeff * y);
            } else if (operator === "/") {
                // Zero division error prevention
                if (yCoeff === 0 || y === 0) continue;
                leftSideOfEquation = (xCoeff * x) / (yCoeff * y);
            }

            if (zCoeff === 0) continue;

            const z = leftSideOfEquation / zCoeff;

            const point = document.createElement("a-sphere");

            point.setAttribute("position", `${x} ${z} ${y}`);
            point.setAttribute("radius", "0.1");
            point.setAttribute("color", "yellow");

            graphContainer.appendChild(point);
        }
    }
}

graphButton.addEventListener("click", drawGraph);

drawGraph();