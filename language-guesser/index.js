//npm package to detect language
const franc = require('franc');
//npm package to write colorful text
const colors = require('colors');
//npm package provides ISO 639-1/2/3 language codes with English and local names.
const langs = require('langs');

const text = require('./text');
const langCode = franc(text.sentence[0]);

if (langCode == 'und') {
    console.log(colors.red("SORRY, COULDN'T FIGURE IT OUT! TRY WITH MORE SAMPLE TEXT!"));
} else {
    const language = langs.where("3", langCode);
    if (language) {
        console.log(colors.green(`Our best guess is: ${language.name}`));
    } else {
        console.log(colors.red(`SORRY, COULDN'T FIND A LANGUAGE FOR CODE: ${langCode}`));
    }
}
