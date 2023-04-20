var userClickedPattern = []

var gamePattern = []

var buttonColours = ["red", "blue", "green", "yellow"]

var level = 0

var currentNumberOfClicks = 0

function nextSequence() {
    var randomNumber = Math.floor(Math.random() * 4)

    chooseColor(randomNumber) 

    //increase the level 
    level++

    //change the text of the header according to the level
    $("h1").text("Level " + level);
}


function chooseColor(number) {
    var randomChosenColour = buttonColours[number]

    //append the chosen color to the gamepattern array
    gamePattern.push(randomChosenColour)

    //play the sound of the chosen color
    playSound(randomChosenColour)

    //flash the button with the corresponding color
    $(`#${randomChosenColour}`).fadeOut(100).fadeIn(100)

}

//function for the functions that will run when the user clicks on a button
function buttonClicked(userChosenColour) {
    //check if the user has clicked on buttons before the game started, do nothing if so
    if (level === 0){
        return
    }
    


    
    //check if the user has clicked on the right button 
    if (userChosenColour === gamePattern[currentNumberOfClicks]){

        
        correctClick(userChosenColour);



    }

    // if the user has clicked on the wrong button
    else{

        wrongClick()
        
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

function wrongClick(){
    console.log("you clicked on the wrong button")

    playSound("wrong")

    //to add an animation effect, add the class "gameover" to body for 100 miliseconds
    $("body").addClass("game-over")
    //wait 100 miliseconds AND
    setTimeout(function () {
        //remove the class "pressed" after 100 miliseconds
        $("body").removeClass("game-over")
    }, 100);

    //change the text of the header to announce game over
    $("h1").text("Game Over, Press Any Key to Restart");

    //set the level to 0
    //so the user can start from the beginning after clicking on a button
    level = 0 

    //empty the contents of two arrays, gamepattern and userclickedpattern
    userClickedPattern = []
    gamePattern = []
}

function correctClick(colorByUser) {
    console.log("you clicked on the correct button")

    //add the clicked button color to the array named "userClickedPattern"
    userClickedPattern.push(colorByUser);

    currentNumberOfClicks++

    //if the user has clicked on the right colors right amount of time, proceed to the next level
    if (currentNumberOfClicks === gamePattern.length){
        currentNumberOfClicks = 0
        
        //wait 1 second and proceed to the next sequence
        setTimeout(function () {
            nextSequence()
        }, 1000);
        
    }

    //play the sound that corresponds to the color of the clicked button
    playSound(colorByUser)

    //flash the button with the corresponding color
    animatePress(colorByUser)
    

}


//event listener to buttons
$(".btn").click(function (){
    //get the color of the clicked button through its id
    var buttonColor = $(this).attr("id"); 
    
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



