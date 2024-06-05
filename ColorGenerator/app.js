class ColorMaker {
    //contructor for colormaker class
    constructor(r,g,b) {
        this.r = r;
        this.g = g;
        this.b = b;
    }

    rgb() {
        const {r,g,b} = this;
        return [r,g,b]
    }

    //HEX color calculator from RGB 
    hex() {
        let rr = this.r.toString(16);
        let gg= this.g.toString(16) ;
        let bb = this.b.toString(16);
        rr = rr.length < 2 ? "0"+rr : rr;
        gg = gg.length < 2 ? "0"+gg : gg;
        bb = bb.length < 2 ? "0"+bb : bb;
        return `#${rr}${gg}${bb}`;
    }
    
    //HSL color calculator from RGB 
    hsl() {
        const myArray = [{
            id:"r",
            calc: (this.r/255).toFixed(2)
        },{
            id:"g",
            calc: (this.g/255).toFixed(2)
        },{
            id:"b",
            calc: (this.b/255).toFixed(2)
        }];

        const min = Math.min(...myArray.map(item => item.calc));
        const max = Math.max(...myArray.map(item => item.calc));
        
        //  Luminace value calculation
        const lum = Math.round(((min+max)/2) * 100);

        //  saturation value calculation
        let sat = 0 ;
        if(lum <= 0.5){
            sat = ((max-min)/(max+min)).toFixed(2);
        } else if (lum > 0.5){
            sat = ((max-min)/(2.0-max-min)).toFixed(2);
        } else {
            sat = 0;
        }
        sat = Math.round(sat * 100); // %
 

        // hue value calculation
        let H = null;
        for (let item of myArray){
            
            if (max == item.calc){
                if(item.id == "b"){
                    H = (this.r/255) - (this.g/255) / (max-min) + 4;

                } else if(item.id == "r"){
                    H = ((this.g/255 - this.b/255) / (max-min)) % 6; 
                }else if(item.id == "g"){
                    H = ((this.b/255) - (this.r/255)) / (max-min) + 2;
                }
            }

        }
        let hue = Math.round(H * 60); 
        if (hue < 0){
            hue +=360;// °
        }
        return [hue, sat, lum];
    }
    
    //Opposite(complementary) color calculator from RGB 
    complementary() {

        let RR = this.r - 255; 
        let GG = this.g - 255; 
        let BB = this.b - 255; 
        RR < 0 ? RR *= -1 : RR;
        GG < 0 ? GG *= -1 : GG;
        BB < 0 ? BB *= -1 : BB;
        
        return [RR,GG,BB];
    }

    //First Adjacent color(Analogous) color calculator from HSL
    adjacentColor(){
        const a1 = this.hsl();
        let hue = (a1[0]+30)-360;
        if (hue < 0){
            hue +=360;// °
        }
        return `hsl(${hue},${a1[1]}%,${a1[2]}%)`;
    }

}

//function to crate random number (0-255)
function randomise() {
    const randNum = Math.floor(Math.random() * 255);
    return randNum;
}

const btn = document.querySelector("#randomBtn2");
//event for click button
btn.addEventListener('click', ()=>{
    //create a object for main color
    const c1 = new ColorMaker(randomise(),randomise(),randomise());

    //change background color of main color
    const mainBox = document.getElementById("color1")
    const RGB = `rgb(${c1.rgb()[0]},${c1.rgb()[1]},${c1.rgb()[2]})`;
    mainBox.style.backgroundColor = RGB;
    //change  of main color text for RGB
    const mainBoxRgb = document.getElementById('rgbCode1');
    mainBoxRgb.innerText = RGB;
    //change  of main color text for HEX
    const mainBoxHex = document.getElementById('hexCode1');
    mainBoxHex.innerText= (c1.hex());
    //change  of main color text for HSL 
    const mainBoxHsl = document.getElementById('hslCode1');
    const test = c1.hsl(); //[hue, sat, lum]
    const hsl = `hsl(${test[0]}, ${test[1]}%,${test[2]}%)`;
    mainBoxHsl.innerText = hsl;

    //create a new object for opposite finding
    const cOpposite = new ColorMaker(c1.rgb()[0],c1.rgb()[1],c1.rgb()[2]);

    //get opposite of the object 
    const opposite = cOpposite.complementary(); //[RR,GG,BB]
    const c2 = new ColorMaker(opposite[0],opposite[1],opposite[2]);
    console.log(c2);

    //change background color and colors of texts  of the opposite box
    const color2 = document.getElementById('color2');
    const opRGB = `rgb(${c2.rgb()[0]},${c2.rgb()[1]},${c2.rgb()[2]})`;
    color2.style.backgroundColor = opRGB;
    color2.style.color = RGB;
    mainBox.style.color = opRGB;

    // change innertext of the color codes
    const mainBoxRgb2 = document.getElementById('rgbCode2');
    mainBoxRgb2.innerText = opRGB;
    const mainBoxHsl2 = document.getElementById('hslCode2');
    const hslDemo = c2.hsl();//[hue, sat, lum]
    const hsl2 = `hsl(${hslDemo[0]}, ${hslDemo[1]}%,${hslDemo[2]}%)`;
    mainBoxHsl2.innerText = hsl2;

    //change  of main color text for HEX
    const mainBoxHex2 = document.getElementById('hexCode2');
    mainBoxHex2.innerText= (c2.hex());

    //change  of adjacent color's background
    const color3 = document.getElementById('color3');
    color3.style.backgroundColor =  c1.adjacentColor();
    const hslCode3 = document.getElementById('hslCode3');
    hslCode3.innerText = c1.adjacentColor();
    color3.style.color = opRGB;

});
    