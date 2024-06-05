# Web Development Bootcamp - Pingpong Score Keeper via JavaScript and BULMA framework

This is a game where two players can increase their scores by clicking buttons until one of the players reaches the maximum winning score.

## Table of contents

- [Overview](#overview)
  - [The challenge](#the-challenge)
  - [Screenshot](#screenshot)
- [My process](#my-process)
  - [Built with](#built-with)
  - [What I learned](#what-i-learned)
  - [Continued development](#continued-development)
  - [Useful resources](#useful-resources)
- [Author](#author)

## Overview

This is a DOM Events practise with HTML, CSS, JavaScript & BULMA Framework.

### The challenge

Users should be able to:

- Changing the score by clicking buttons
- Reset the score by clicking the reset button, completing the game, or changing the dropdown number

### Screenshot

<img src="./assets/PingPong Score Keeper Video.gif" alt="PingPong Score Keeper Video.gif"  width="450" />

## My Process

### Built with

- Semantic HTML5 markup
- BULMA Framework Application
- Vanilla JS
- DOM Manipulation, DOM Events Application

### What I learned

```html
<h1>Some HTML code I'm proud of</h1>
```

```js
//function for updates scores until one of the user reach to the winner score.
function updatesScores(player, opponent){
    if (!isGameOver){
        player.score +=1;
        if(player.score === winningScore){
            isGameOver = true;
            player.display.classList.add('has-text-success');
            opponent.display.classList.add('has-text-danger');
            player.button.disabled = true;
            opponent.button.disabled = true;

        };
        player.display.textContent = player.score;
    };
}

//event listener for updating player1 score
p1Button.addEventListener('click', function(){
    updatesScores(p1,p2);
})
```

### Useful resources

- [Web Development Bootcamp](https://www.udemy.com/course/the-web-developer-bootcamp/learn/lecture/22051276?start=420#overview) - This helped me for understanding DOM Events and DOM Manipulation.

## Author

- Twitter - [@fly_pixie](https://twitter.com/fly_pixie)
