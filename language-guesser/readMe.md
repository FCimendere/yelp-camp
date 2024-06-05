# Web Development Bootcamp - Language Guess Challange

This is an app that you can guess the language of the sentence.

## Table of contents

- [Overview](#overview)
  - [Install](#install)
  - [The challenge](#the-challenge)
- [My process](#my-process)
  - [Built with](#built-with)
  - [What I learned](#what-i-learned)
  - [Useful resources](#useful-resources)
- [Author](#author)

## Overview

This is a JavaScript, Node.JS and NPM Modules application.

### Install

```
npm i franc@5.0.0
npm install colors
npm install langs
```

or (dependencies will be installed automatically)

```
npm install
```

### The challenge

Users should be able to:

- Run the node index.js file with a text.

```
node index.js 'The text that you want to know about.'
```

## My Process

### Built with

- JavaScript
- Node.JS

### What I learned

```js
/if (langCode == 'und') {
    console.log(colors.red("SORRY, COULDN'T FIGURE IT OUT! TRY WITH MORE SAMPLE TEXT!"));
} else {
    const language = langs.where("3", langCode);
    if (language) {
        console.log(colors.green(`Our best guess is: ${language.name}`));
    } else {
        console.log(colors.red(`SORRY, COULDN'T FIND A LANGUAGE FOR CODE: ${langCode}`));
    }
}
```

### Useful resources

- [Web Development Bootcamp](https://www.udemy.com/course/the-web-developer-bootcamp/learn/lecture/22051276?start=420#overview) - This helped me for understanding Node.JS and NPM modules.

## Author

- Twitter - [@fly_pixie](https://twitter.com/fly_pixie)
