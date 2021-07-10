
// Creating array to store randomly generated numbers
let array = [];
// To create new array input size of array
let NumberOfBars = 50;
function createNewArray() {
    // calling helper function to delete old bars from dom
    deleteChild();

    // creating an array of random numbers 
    array = [];
    for (let i = 0; i < NumberOfBars; i++) {
        array.push(Math.floor(Math.random() * 250) + 5);
    }

    // select the div #bars element
    const bars = document.querySelector("#bars");

    // create multiple element div using loop and adding class 'bar col'
    for (let i = 0; i < NumberOfBars; i++) {
        const bar = document.createElement("div");
        bar.style.height = `${array[i]*2}px`;
        bar.classList.add('bar');
        bar.classList.add('flex-item');
        bar.classList.add(`bar_No${i}`);
        bars.appendChild(bar);
    }
}

// Helper function to delete all the previous bars so that new can be added
function deleteChild() {
    const bar = document.querySelector("#bars");
    bar.innerHTML = '';
}
let delay = 50;
// Used in async function so that we can so animations of sorting, takes input time in ms (1000 = 1s)
function setDelay(milisec) { 
    return new Promise(resolve => { 
        setTimeout(() => { resolve('') }, milisec); 
    }) 
}



const speedBtn = document.querySelector("#speed_sorting");
speedBtn.addEventListener('input', async function(){
    delay = parseInt(speedBtn.value);
});


const sizeBtn = document.querySelector("#array_size");
sizeBtn.addEventListener('input', async function(){
    NumberOfBars = parseInt(sizeBtn.value);
    createNewArray();
});