var logo;
var font;
var peopleData;
var iss;
var people = [];
var totalPeople;
var iconSet;
var distFromCenter = 200;
var textSpacing = 0;
var hoverDistance = 0;
var infoField;
var craftInfoField;
function preload() {
    logo = loadImage('assets/logo.png');
    font = loadFont('assets/OpenSansCondensed-Bold.ttf');
    iconSet = [loadImage('assets/planet1.png'), 
                loadImage('assets/planet2.png'), loadImage('assets/planet3.png'), loadImage('assets/planet4.png'), loadImage('assets/planet5.png'), loadImage('assets/planet6.png'), loadImage('assets/planet7.png'), loadImage('assets/planet8.png'),
                loadImage('assets/planet9.png')];
    peopleData = loadJSON('http://api.open-notify.org/astros.json');
    iss = loadJSON('http://api.open-notify.org/iss-now.json');
    infoField = select('#astroInfo');
    craftInfoField = select('#craftInfo');
}

function setup() {
    let window = createCanvas(500, 500);
    window.parent('displayWindow');
    imageMode(CENTER);
    angleMode(DEGREES);
    textAlign(CENTER, CENTER);
    //Setting font for names
    fill('#FFFF00');
    textFont(font);
    textSize(12);
    totalPeople = peopleData.number;
    //Instantiate people in space
    for (let i = 0; i < peopleData.number; i++) {
        people.push(new Person(i));
    }
}

function draw() {
    clear();
    cursor();
    //Update ISS data every 10 seconds (needs callback)
    /*if (frameCount % 600 === 0) {
        iss = loadJSON('http://api.open-notify.org/iss-now.json');
        console.log('Updated ISS data.');
        console.log(iss.timestamp);
        console.log(iss.iss_position.latitude);
        console.log(iss.iss_position.longitude);
    }*/
    //Draw center image
    drawLogo();

    //Draw people, with names above and craft below (on hover)
    for (let i = 0; i < totalPeople; i++) {
        textSpacing = (people[i].icon.height / 2) + 10;
        hoverDistance = people[i].icon.width / 2;
        drawPerson(i);
        text(people[i].name, people[i].x, people[i].y - textSpacing);
        if (dist(mouseX, mouseY, people[i].x, people[i].y) < hoverDistance) {
            push();
            fill('rgba(255, 255, 0, 0.5)');
            text(people[i].craft, people[i].x, people[i].y + textSpacing);
            cursor(HAND);
            pop();
        }
    }
}

function mouseReleased() {
    for (let i = 0; i < totalPeople; i++) {
        if (dist(mouseX, mouseY, people[i].x, people[i].y) < hoverDistance) {
            //Show people[i].info, people[i].craftInfo, people[i].nameURL, people[i].craftURL
            removeElements();
            createA(people[i].nameURL, people[i].info, '_blank').parent(infoField);
            createA(people[i].craftURL, people[i].craftInfo, '_blank').parent(craftInfoField);
        }
    }
}

class Person {
    constructor(index) {
        this.x = 250 + distFromCenter * cos(index * (360 / peopleData.number));
        this.y = 250 + distFromCenter * sin(index * (360 / peopleData.number));
        //Don't really like the random distribution of this, but it works.
        this.icon = iconSet[round(random(0, (iconSet.length - 1)))];
        this.name = peopleData.people[index].name.toUpperCase();
        this.craft = peopleData.people[index].craft.toUpperCase();
        this.nameURL = getSearchString(peopleData.people[index].name);
        this.craftURL = getSearchString(peopleData.people[index].craft);
        this.info = getInfo(peopleData.people[index].name, true);
        this.craftInfo = getInfo(peopleData.people[index].craft, false);
    }
}

function getSearchString(text) {
    //Returns a Google search string
    //Format: https://www.google.com/search?q=[word]+[word]
    let base = 'https://www.google.com/search?q='
    let search = text.replace(/ /g, "+");
    return base + search;
}

function getInfo(text, isPerson) {
    //Returns a text snippet from Wikipedia about a given astronaut or craft.
    //NOTE: This is a proof of concept, if I could I would pull this info from a Wikipedia or Google API, but that is tricky and probably costs $$$
    if (!isPerson) {
        if (text == "ISS") {
            return "The International Space Station is a modular space station in low Earth orbit. It is a multinational collaborative project involving five participating space agencies: NASA, Roscosmos, JAXA, ESA, and CSA. The ownership and use of the space station is established by intergovernmental treaties and agreements."
        } else if (text == "Tiangong") {
            return "Tiangong (Chinese: 天宫; pinyin: Tiāngōng; lit. 'Heavenly Palace') is a space station placed in low Earth orbit between 340 and 450 km (210 and 280 mi) above the surface. The Tiangong Space Station, once completed, will be roughly one-fifth the mass of the International Space Station and about the size of the decommissioned Russian Mir space station."
        } else {
            return "This spacecraft is not known in the database. Click here to search for it!";
        }
    } else {
        if (text == "Mark Vande Hei") {
            return "Mark Thomas Vande Hei is a retired United States Army officer and NASA astronaut who served as a flight Engineer for Expedition 53 and 54 on the International Space Station.";
        } else if (text == "Oleg Novitskiy") {
            return "Oleg Viktorovich Novitskiy is a former Lieutenant Colonel in the Russian Air Force who logged over 700 hours of flight time and was awarded for bravery. He is currently serving as a Russian cosmonaut with Roscosmos and has participated in multiple expeditions, during which he has spent over 340 days in space.";
        } else if (text == "Pyotr Dubrov") {
            return "Pyotr Valerievich Dubrov is a Russian engineer and cosmonaut selected by Roscosmos in 2012.";
        } else if (text == "Thomas Pesquet") {
            return "Thomas Gautier Pesquet is a French aerospace engineer, pilot, and European Space Agency astronaut. Pesquet was selected by ESA as a candidate in May 2009, and he successfully completed his basic training in November 2010.";
        } else if (text == "Megan McArthur") {
            return "Katherine Megan McArthur is an American oceanographer, engineer, and a National Aeronautics and Space Administration astronaut. She has served as a Capsule Communicator for both the Space Shuttle and International Space Station.";
        } else if (text == "Shane Kimbrough") {
            return "Robert Shane Kimbrough is a retired United States Army officer, and a NASA astronaut. He was part of the first group of candidates selected for NASA astronaut training following the Space Shuttle Columbia disaster.";
        } else if (text == "Akihiko Hoshide") {
            return "Akihiko Hoshide is a Japanese engineer, JAXA astronaut, and current Commander of the International Space Station. On August 30, 2012, Hoshide became the third Japanese astronaut to walk in space.";
        } else if (text == "Nie Haisheng") {
            return "Nie Haisheng is a major general of the Chinese People's Liberation Army Strategic Support Force in active service as an astronaut and the third commander of the PLA Astronaut Corps. He was a PLA Air Force fighter pilot and director of navigation.";
        } else if (text == "Liu Boming") {
            return "Liu Boming is a major general in the People's Liberation Army Strategic Support Force. A fighter pilot in the PLA Air Force, he was selected into the PLA Astronaut Corps in 1998. A Shenzhou 7 veteran, he is currently working in the Tiangong space station during the Shenzhou 12 mission since June 2021.";
        } else if (text == "Tang Hongbo") {
            return "Senior Colonel Tang Hongbo is a Chinese fighter pilot and People's Liberation Army Astronaut Corps astronaut. He is currently working in the Tiangong space station during the Shenzhou 12 mission.";
        } else {
            return "This person is not known in the database. Click here to search for them!";
        }
    }
}

function drawPerson(i) {
    if (dist(mouseX, mouseY, people[i].x, people[i].y) < hoverDistance) {
        //rotates icon
        push();
        translate(people[i].x, people[i].y);
        rotate(frameCount);
        image(people[i].icon, 0, 0);
        pop();

    } else {
        image(people[i].icon, people[i].x, people[i].y);
    }
}

function drawLogo() {
    if (dist(mouseX, mouseY, 250, 250) < 100) {
        //Effect that takes iss data as parameters
        push();
        translate(250, 250);
        rotate(iss.timestamp);
        tint((iss.timestamp % 255), round(abs(iss.iss_position.latitude)), round(abs(iss.iss_position.longitude)))
        image(logo, 0, 0);
        pop();
    } else {
        image(logo, 250, 250);
    }
}
/*ISS values:
iss.timestamp = int with value >1626807284, increases every second
iss.iss_position.latitude = 4 decimal float (possibly string) with value -90 to 90
iss.iss_position.longitude = 4 decimal float (possibly string) with value -180 to 180
*/