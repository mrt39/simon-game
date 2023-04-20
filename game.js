var userClickedPattern = []

var gamePattern = []

var buttonColours = ["red", "blue", "green", "yellow"]

var level = 0

function nextSequence() {
    var randomNumber = Math.floor(Math.random() * 4)

    console.log(randomNumber)

    chooseColor(randomNumber) 

    //increase the level 
    level++

    //change the text of the header according to the level
    $("h1").text("Level " + level);
}


function chooseColor(number) {
    var randomChosenColour = buttonColours[number]
    console.log("chosen color: " + randomChosenColour)
    
    gamePattern.push(randomChosenColour)
    console.log(gamePattern)

    //play the sound of the chosen color
    playSound(randomChosenColour)

    //flash the button with the corresponding color
    animatePress(randomChosenColour)

}

//function for the functions that will run when the user clicks on a button
function buttonClicked(userChosenColour) {
    //check if the user has clicked on buttons before the game started, do nothing if so
    if (level === 0){
        return
    }
    
    //add the clicked button color to the array named "userClickedPattern"
    userClickedPattern.push(userChosenColour)

    //console log
    console.log(userClickedPattern)

    
    //check if the user has clicked on the right button 
    if (userChosenColour === gamePattern[(level-1)]){

        console.log("you clicked on the right button")

        //play the sound that corresponds to the color of the clicked button
        playSound(userChosenColour)

        //flash the button with the corresponding color
        animatePress(userChosenColour)
    }

    // if the user has clicked on the wrong button
    else{
        console.log("you clicked on the wrong button")

        playSound("wrong")

    }

    


}

//function for playing sounds
function playSound(nameOfSound) {
    //play the sound of the given name
    var audio = new Audio(`sounds/${nameOfSound}.mp3`);
    audio.play();
}

//flash the button with the corresponding color
function animatePress(currentColour) {

    //add the class "pressed", which we define in style.css
    $(`#${currentColour}`).addClass("pressed")

    //wait 100 miliseconds AND
    setTimeout(function () {
        //remove the class "pressed" after 100 miliseconds
        $(`#${currentColour}`).removeClass("pressed")
    }, 100);

}


//event listener to buttons
$(".btn").click(function (){
    //get the color of the clicked button through its id
    var buttonColor = $(this).attr("id"); 

    console.log(buttonColor)
    
    buttonClicked(buttonColor)
})


//event listener in the entire document, for keyboard press.
//first keyboard press starts the game
$(document).keypress(function(event) {

    //activate the game only on the first keystroke
    //so if the game has started already, level will be > 0. and we do nothing.
    if (level > 0) {
        return
    }
    //start the game
    nextSequence()
})



