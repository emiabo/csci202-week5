var logo;
var font;
var peopleData;
var totalPeople;
var iconSet;
var distFromCenter = 200;
function preload() {
    logo = loadImage('assets/spacestation.png');
    font = loadFont('assets/OpenSansCondensed-Bold.ttf');
    iconSet = [loadImage('assets/planet1.png'), loadImage('assets/planet2.png'), loadImage('assets/planet3.png'), loadImage('assets/planet4.png'), loadImage('assets/planet5.png'), loadImage('assets/planet6.png'), loadImage('assets/planet7.png'), loadImage('assets/planet8.png')];
    peopleData = loadJSON('http://api.open-notify.org/astros.json');
}

function setup() {
    let window = createCanvas(500, 500);
    window.parent('displayWindow');
    imageMode(CENTER);
    angleMode(DEGREES);
    //Setting font for names
    fill('#FFFF00');
    textFont(font);
    textSize(12);

}

function draw() {
    //Draw center image (consider warping in some way with ISS coordinate data)
    image(logo, 250, 250);

    //TODO Instantiate people and draw them, with names above and craft below on hover


    //TODO On click of any icons, show Wikipedia snippets and links down below
}

class Person {
    constructor(index) {
        this.x = 250 + distFromCenter * cos(index * (360 / peopleData.number));
        this.y = 250 + distFromCenter * sin(index * (360 / peopleData.number));
        this.icon = iconSet[round(random(0, 8))];
        this.name = peopleData.people[index].name;
        this.craft = peopleData.people[index].craft;
    }
}

function makeSearchString(text) {
    //Returns a Google search string
    //Format: https://www.google.com/search?q=[word]+[word]
    let base = 'https://www.google.com/search?q='
    let search = text.replace(/ /g, "+");
    return base + search;
}