//create main variables
const text = document.querySelector('h1');
const button = document.querySelector('#btn');

//function to create a random number for RGB color code between 0~255
function getRandomInt(max) {
    return Math.floor(Math.random() * max);
}

//function to control random num less than 20. 
//level under 20 is darkish color in RGB color chart. 
function checkLevel(num1,num2,num3){
    if((num1<20)|| (num2<20) || (num3<20)){
        return 0;
    } else{
        return 1;
    }
}

//main function to change the color of the box and text color. 
function rgbFounder() {
    const num1 = getRandomInt(255);
    const num2 = getRandomInt(255);
    const num3 = getRandomInt(255);
    const newText = `rgb(${num1}, ${num2}, ${num3})`;
    // change the background color of the box, the name is #test
    document.getElementById('test').style.backgroundColor = newText;
    // call the color control function
    const control = checkLevel(num1,num2,num3);
    // change the text's inner text with RGB color code 
    text.innerText = newText;
    // if background color is too darkish, text will shown lightish. or opposite. 
    if (control === 0){
        text.style.color = "rgb(248, 252, 255)";  
    } else{
        text.style.color = "rgb(1, 14, 20)";
    }     
}
// after click the button if will call main function ~ rgbfounder
button.addEventListener('click', rgbFounder);







