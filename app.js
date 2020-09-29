// Dino Classes

//** @description Represents a Height
/*   @constructor: Class Height
 */
 function Height(f,i) {
     this.feet = f;
     this.inches = i;

     return {
         feet: this.feet,
         inches: this.inches
     }
 }

//** @description Represents an Individual
/*   @constructor: Class Individual
 */
function Individual(w,f,i,d) {
     this.height = new Height()
     this.height.inches = i
     this.height.feet = f
     this.weight = w
     this.diet = d
     return {
         weight: this.weight,
         height: this.height,
         diet: this.diet
     }
 }
//** @description Represents the History of a particular Individual
/*   @constructor: Class History
 */
 function History () {
     this.when;
     this.where;
     this.fact;
     return {
         when: this.when,
         where: this.where,
         fact: this.fact
     }
 }

// Class Dino
// @constructor: Class Dino
 function Dino (sp,img,weight,feet,inches,diet,when,where,fact) {
     this.species = sp;
     this.image = img;
     this.weight = weight;
     this.height = new Height(feet, inches);
     this.diet = diet

     return Object.assign({}, Individual, History, {
         species: this.species,
         image: this.image,
         weight: this.weight,
         height: new Height(feet, inches),
         diet: this.diet,
         when: when,
         where: where,
         fact: fact

     })

 }

// Create Dino Compare Method 1
// NOTE: Weight in JSON file is in lbs, height in inches.
 Dino.prototype.compareWeight = function () {
     let fact;
     if (this.weight > human.weight) {
         fact = this.species + ' are heavier than ' + human.name;
     } else {
         fact = human.name + ' is heavier than ' + this.species;
     }
     return fact;
 }

// Create Dino Compare Method 2
// NOTE: Weight in JSON file is in lbs, height in inches.
Dino.prototype.compareHeight = function () {
    let fact;
    if (this.height > (human.height.feet * 12 + human.height.inches)) {
        fact = this.species + ' are higher than ' + human.name;
    } else {
        fact = human.name + ' is higher than ' + this.species;
    }
    return fact;
}

 // Create Dino Compare Method 3
 // NOTE: Weight in JSON file is in lbs, height in inches.
Dino.prototype.compareDiet = function () {
     let fact;
     if (this.diet.toLowerCase() === human.diet.toLowerCase()) {
         if (this.diet === 'herbabor') {
             fact = this.species + ' are herbavors like you ' + human.name;
         } else {
             fact = human.name + ' are carnivors like you' + this.species;
         }
     } else {
         fact = 'Unlike you ' + this.species + ' are ' + this.diet + '.'
     }
     return fact;
 }


//@constructor: Class Human
 function Human (namee,graphicc,weight,feet,inches) {
     this.name = namee;
     this.graphic = graphicc;

     return Object.assign({}, Individual, {

         name: namee,
         graphic: graphicc,
         weight: weight,
         height: new Height(feet, inches),

         //@description: extractHumanData used to extract info from the Human Form
         extractHumanData: function () {
             let name = document.getElementById("name").value;
             if (name) {
                 human.name = name
             }
             let feet = document.getElementById("feet").value;
             if (feet) {
                 human.height.feet = feet
             }
             let inches = document.getElementById("inches").value;
             if (inches) {
                 human.height.inches = inches
             }
             let weight = document.getElementById("weight").value;
             if (weight) {
                 human.weight = weight
             }
             let diet = document.getElementById("diet").value;
             if (diet) {
                 human.diet = diet
             }
         },

         //@description: fillHumanBox used to fill Human box with human details
         fillHumanBox: function () {

             let title = document.createElement("H2");                // Create a <h1> element
             let humanName = document.createTextNode(human.name); // Create a text node
             title.appendChild(humanName);
             let item = document.getElementById("human-item");
             item.appendChild(title);
             let img = document.createElement("img");
             img.setAttribute('src', "images/human.png");
             img.setAttribute('alt', "Human description");
             item.appendChild(img)

             let weight = document.createElement("H4");                // Create a <h1> element
             let weightText = document.createTextNode("Weight: " + human.weight); // Create a text node
             weight.appendChild(weightText);
             item.appendChild(weight)

             let height = document.createElement("h4")
             let heightText = document.createTextNode("Height: " + ((human.height.feet * 12) + human.height.inches)); // Create a text node
             height.appendChild(heightText)
             item.appendChild(height)

             let diet = document.createElement("h3")
             let dietText = document.createTextNode("Diet: "+human.diet); // Create a text node
             diet.appendChild(dietText)
             item.appendChild(diet)

         }

     })
 }


//@description: used to set form with default values
let defaultValues = (function() {
     document.getElementById("name").setAttribute("placeholder", "Introduzca su nombre");
     document.getElementById("feet").setAttribute("placeholder", '0');
     document.getElementById("inches").setAttribute("placeholder", '0');
     document.getElementById("weight").setAttribute("placeholder", '0');
 })();

//Object Human
 const human = new Human();


//@description: used to extract Json data and display it
 function extractDrawJsonData () {
     let promise = import("./data.js")
         .then(data => {
             let dinosList = data['Data'][0]['Dinos']
             console.log(dinosList)

             // fill pigeon data
             for (let i = 0; i < 8; i++) {
                 drawDinoData(dinosList, i)
             }
         });
 }


//@description: used to draw dino data at Dom
 function drawDinoData (d,id) {
     //Pigeon
     let item = document.getElementById(id + "-dino")
     let title = document.createElement("H2");                // Create a <h1> element
     let species = document.createTextNode(d[id].species); // Create a text node
     title.appendChild(species);
     item.appendChild(title)

     let img = document.createElement("img");
     img.setAttribute('src', "images/" + d[id].species.toLowerCase() + ".png");
     img.setAttribute('alt', d[id].species.toLowerCase() + " details");
     item.appendChild(img)

     let height = document.createElement("h4")
     let heightText = document.createTextNode("Height: " + d[id].height + " inches"); // Create a text node
     height.appendChild(heightText)

     let weight = document.createElement("h4")
     let weightText = document.createTextNode("Weight: " + d[id].weight + " lb"); // Create a text node
     weight.appendChild(weightText)

     let diet = document.createElement("h3")
     let dietText = document.createTextNode("Diet: " + d[id].diet); // Create a text node
     diet.appendChild(dietText)

     let whenWhere = document.createElement("h5")
     let whenWhereText = document.createTextNode("When: " + d[id].when + " Where: " + d[id].where); // Create a text node
     whenWhere.appendChild(whenWhereText)

     //Choosing the fact
     let fact = document.createElement("h3")
     let factText;

     let optionFact = Math.floor(Math.random() * 4);
     switch (optionFact) {
         case 1:
             factText = document.createTextNode(Dino.prototype.compareWeight.call(d[id]))
             break;
         case 2:
             factText = document.createTextNode(Dino.prototype.compareHeight.call(d[id]))
             break;
         case 3:
             factText = document.createTextNode(Dino.prototype.compareDiet.call(d[id]))

             break;
         case 0:
             factText = document.createTextNode("Fact: " + d[id].fact);
             break;
     }
     if (d[id].species==='Pigeon') {
         factText = document.createTextNode("Fact: " + "All birds are Dinosaurs.");
     }


     fact.appendChild(factText)
     item.appendChild(weight)
     item.appendChild(height)
     item.appendChild(diet)
     item.appendChild(whenWhere)
     item.appendChild(fact)

 }


//@description: used to set form with default values
// On button click, prepare and display infographic
// Remove form from screen
 function showGrid() {
     document.getElementById("section-form-dino").hidden = true;
     document.getElementById("section-main-dino").hidden = false;

     human.extractHumanData();
     human.fillHumanBox();
     extractDrawJsonData();
 }
