quickdraw_Dataset = ["aircraft, airplane,alarm clock,ambulance", "apple", "arm",  "axe", "backpack", "banana", "bandage",  "baseball", "baseball bat", "basket", "basketball", "bat", "bathtub", "beach", "beard", "bed", "belt", "bench", "bicycle", "binoculars", "bird", "birthday cake", "blackberry", "blueberry", "book", "boomerang", "bottlecap", "bowtie", "bracelet", "brain", "bread", "bridge", "broom", "bucket","bus", "bush", "butterfly", "cactus", "cake", "calculator", "calendar",  "camera",  "campfire", "candle", "car", "carrot", "castle",  "ceiling fan",  "cell phone", "chair", "chandelier", "circle", "clock", "cloud", "coffee cup", "compass", "computer", "cookie", "cooler", "couch", "crayon",  "crown", "cup", "diamond",  "dog", "donut", "door",  "drums", "ear", "elephant", "envelope", "eraser", "eye", "eyeglasses", "face", "fan", "feather", "fence", "finger", "fire", "fish", "flashlight",  "floor lamp", "flower",  "foot", "fork", "frying pan", "garden", "garden hose",  "grapes", "grass", "guitar", "hamburger", "hammer", "hand",  "hat", "headphones",  "helicopter", "helmet", "hexagon", "hockey stick", "hospital", "hot air balloon", "hot dog", "hot tub", "hourglass", "house",  "ice cream", "jacket", "jail", "key", "keyboard", "knee", "knife", "ladder", "lantern", "laptop", "leaf", "leg", "light, bulb", "lighter", "lighthouse", "lightning", "line",  "lipstick",  "lollipop", "mailbox", "map", "marker", "matches",  "microphone", "microwave",  "moon",  "motorbike", "mountain", "moustache", "mouth", "mug", "mushroom", "nail", "necklace", "nose", "ocean", "octagon", "octopus", "onion", "oven", "paintbrush", "paint can", "palm tree",  "pants", "paper clip", "parachute",  "passport", "peanut", "pear", "peas", "pencil", "piano",  "picture frame",  "pillow", "pineapple", "pizza", "police car", "pond", "pool", "popsicle", "postcard", "potato", "poweroutlet", "purse", "radio", "rain", "rainbow", "remote control", "river",  "sailboat", "sandwich", "saw", "saxophone", "school bus", "scissors",  "screwdriver", "sea turtle", "see saw", "shark", "sheep", "shoe", "shorts", "sink", "skateboard", "skull", "skyscraper", "sleeping bag", "smiley face", "snail", "snake", "snowflake", "snowman", "soccer ball", "sock", "speedboat", "spider", "spoon", "spreadsheet", "square", "stairs", "star", "stethoscope", "stitches", "stop sign", "strawberry", "streetlight", "string "];
random_number = Math.floor((Math.random() * quickdraw_Dataset.length) + 1); //generates random number
console.log(quickdraw_Dataset[random_number]) //console the random name
sketch = quickdraw_Dataset[random_number];
document.getElementById("sketch_tbd").innerHTML = "Sketch to be drawn: "+sketch; //sketch name shown on the screen

timer_counter = 0; //timer var
timer_check = ""; //time check var
drawn_sketch = ""; //name of the drawn sketch var
answer_holder = ""; //holds the answer var 
score = 0; //score var

function updateCanvas() { //updates the canvas
    background("white"); //bg color to white
    random_number = Math.floor((Math.random() * quickdraw_Dataset.length) + 1); //same code of line 1-5 copied
    console.log(quickdraw_Dataset[random_number])
    sketch = quickdraw_Dataset[random_number];
    document.getElementById("sketch_tbd").innerHTML = "Sketch to be drawn: "+sketch;
  
}

function preload() {
    classifier = ml5.imageClassifier("DoodleNet"); //connected with Doodle Net
}

function setup() {
    canvas = createCanvas(280, 280); //canvas drawn of size 280 x 280
    canvas.center(); //position set to center
    background("white"); //bg color to white
    canvas.mouseReleased(classifyCanvas); //when mouse is released, classifyCanvas function is called
}

function draw() {
    check_sketch(); //function called
    if (drawn_sketch == sketch) {
        answer_holder = "set";
        score++;
        document.getElementById("score").innerHTML = "Score: " + score;
      
    }
    strokeWeight(10); //weight of the line drawn
    stroke(0); //stroke color set as black
    if(mouseIsPressed){
        line(pmouseX, pmouseY, mouseX, mouseY) //if mouse is pressed, this function gets the previous x, y positions and the current x,y positions of the line drawn
    }
}



function check_sketch() {
    timer_counter++;
    document.getElementById("timer").innerHTML = "Timer: " + timer_counter;
    if (timer_counter > 700){
       
        timer_counter = 0;
        timer_check = "completed";
    }
    if(timer_check=="completed" || answer_holder=="set"){
        timer_check = "";
        answer_holder = "";
        updateCanvas();
    }
}

function classifyCanvas(){
    classifier.classify(canvas, gotResult) //predifined function of ml5.js library
}

function gotResult(error, results){
    if(error){  
        console.log(error); //if there is an error in the code then console.log the error
    }
    else{
        console.log(results); //if there is no error then console.log the results
        drawn_sketch = results[0].label; //getting results from [0].label and saved to var drawn_sketch
        document.getElementById("your_sketch").innerHTML = "Your Sketch: "+drawn_sketch; //drawn sketch displayed on the screen
        document.getElementById("confidence").innerHTML = "Confidence: "+Math.floor(results[0].confidence*100)+"%"; //confidence displayed on the screen (Math.floor done to remove the decimals and make it into a smaller number)
    }
}

function clearcanvas(){
    background("white");
}