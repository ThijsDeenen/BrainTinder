let ideas = ["Hoi", "Doei", "Hallo", "Joe"];
let chosenLeftIdeas = [];
let chosenRightIdeas = [];
let seenIdeas = [];
let detectCount = 0;
const socket = io.connect("http://localhost:8000");

const start = document.getElementById("startButton");


function getRandomIdea(){

    let idea = ideas[Math.floor(Math.random() * ideas.length)];
    if (seenIdeas.includes(idea) && seenIdeas.length < 4){
        getRandomIdea();
    }
    else
    {
        document.getElementById("idea").innerHTML = idea;
        seenIdeas.push(document.getElementById("idea").innerHTML);
        document.getElementById("leftList").innerHTML = chosenLeftIdeas;
        document.getElementById("rightList").innerHTML = chosenRightIdeas;
        document.getElementById("idea").className = 'idea';
    }
        
    if(seenIdeas.length > 4){
        document.getElementById("idea").innerHTML = "";
        document.getElementById("chooseButtonL").style.display = "none";
        document.getElementById("chooseButtonR").style.display = "none";
    }
    document.getElementById("startButton").style.display = 'none';
}

socket.on("right", function(){
    detectCount ++;
    if (detectCount == 1){
        chooseRight();
    }
})
socket.on("left", function(){
    detectCount ++;
    if (detectCount == 1){
    chooseLeft();
    }
})


function chooseLeft(){
    document.getElementById("idea").className = 'left';
    if (seenIdeas.length < 5){
        chosenLeftIdeas.push(document.getElementById("idea").innerHTML);
        setTimeout(getRandomIdea, 500);
    }
    setTimeout(resetDetectCount, 500);
}

function chooseRight(){
    document.getElementById("idea").className = 'right';
    if (seenIdeas.length < 5){
        chosenRightIdeas.push(document.getElementById("idea").innerHTML);
        setTimeout(getRandomIdea, 500);
    }
    setTimeout(resetDetectCount, 500);
}

if (swipeCounter == ideas.length){
    document.getElementById("leftList").innerHTML = chosenLeftIdeas;
}

function resetDetectCount(){
    detectCount = 0;
}
