const body = document.querySelector("body")
const container = document.createElement("div");
container.className = "container";
container.id = "container";
body.insertBefore(container,body.firstChild);

document.getElementById("slider").addEventListener("change", function(){
    let size = slider.value;
    clearGrid();
    createGrid(size);
})

var mode = "black";

function clearGrid(){
    container.innerHTML = "";
}

function createGrid(size){
    var squaresize = (329.4435-size*1.111)/size;
    for(let i=0;i<size;i++){
        let divContainer = document.createElement("div");
        divContainer.className = "divContainer";
        container.appendChild(divContainer);
        for(let j=0;j<size;j++){
            let square = document.createElement("div");
            square.className = "square";
            square.style.backgroundColor = "rgb(255,255,255)";
            divContainer.appendChild(square);
            square.onmouseover = function(){
                switch(mode) {
                    case "black":
                        square.style.backgroundColor = "black";
                        break;
                    case "rainbow":
                        square.style.backgroundColor = "#" + Math.floor(Math.random()*16777215).toString(16);
                        break;
                    case "shade":
                        const rgb = window.getComputedStyle(square).backgroundColor;
                        colors = rgb.match(/\d+/g).map(Number);
                        for(let i=0;i<3;i++){
                            colors[i] -= 25.5;
                        }
                        square.style.backgroundColor = "rgb("+colors[0]+","+colors[1]+","+colors[2]+")";
                    default:
                      // code block
                }
            };
            square.style.padding = squaresize + "px";
        }
    }
}

function makeButtons(){
    const buttons = document.getElementById("buttons");
    
    const clear = document.createElement("button");
    clear.textContent = "Clear";
    clear.onclick = function(){
        clearGrid();
        createGrid(document.getElementById("slider").value);
    };
    buttons.appendChild(clear);

    const rainbow = document.createElement("button");
    rainbow.textContent = "Rainbow Mode";
    rainbow.onclick = function(){
        if(mode == "rainbow"){
            mode = "black";
        }else{
            mode = "rainbow";
        }
    };
    buttons.appendChild(rainbow);

    const shade = document.createElement("button");
    shade.textContent = "Shade Mode";
    shade.onclick = function(){
        if(mode == "shade"){
            mode = "black";
        }else{
            mode = "shade";
        }
    };
    buttons.appendChild(shade);
}


createGrid(16);
makeButtons();