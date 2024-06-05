# Web Development Bootcamp - Change Color Randomly via JS

This is a solution to randomly creation an RGB color code and change the box color with this color.

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

This is a basic DOM Manipulation, DOM Event Listener project with HTML, CSS, and JS.

### The challenge

Users should be able to:

- Changing the color with a click button
- Hover and onclick action

### Screenshot

<img src="./assets/projectcolor.gif" alt="this project click moves"  width="450" />

## My Process

### Built with

- Semantic HTML5 markup
- CSS custom properties
- CSS Grid
- Vanilla JS
- DOM Manipulation, DOM Event listener

### What I learned

```html
<h1>Some HTML code I'm proud of</h1>
```

```css
.container {
    display: grid;
    grid-template-columns: auto;
```

```js
function rgbFounder() {
  const num1 = getRandomInt(255);
  const num2 = getRandomInt(255);
  const num3 = getRandomInt(255);
  const newText = `rgb(${num1}, ${num2}, ${num3})`;
  document.getElementById("test").style.backgroundColor = newText;
  text.innerText = newText;
}

button.addEventListener("click", rgbFounder);
```

### Useful resources

- [Web Development Bootcamp](https://www.udemy.com/course/the-web-developer-bootcamp/learn/lecture/22051276?start=420#overview) - This helped me for understanding DOM Events and DOM Manipulation.

## Author

- Twitter - [@fly_pixie](https://twitter.com/fly_pixie)
