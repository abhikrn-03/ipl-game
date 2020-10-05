let buttonColors = ["red", "blue", "green", "yellow", "grey", "cyan"];
let gamePattern = [];
let userClickedPattern = [];
let level = 0;
let start = false;

$("#level-title").on("click", function(){
  if (!start){
    $("#level-title").text("Level " + level);
    nextSequence();
    start = true;
    alert("Click on Boxes, or use keys [Q-W-E ; A-S-D]");
  }
});

// if (screen.width<550){
//   $(document).on("click", function(){
//     if (!start){
//       $("#level-title").text("Level " + level);
//       nextSequence();
//       start = true;
//   });
// }

function nextSequence(){
  userClickedPattern = [];
  level++;
  $("#level-title").text("Level " + level);
  let randomNumber = Math.floor(Math.random() * 6);
  let randomChosenColor = buttonColors[randomNumber];
  gamePattern.push(randomChosenColor);
  $("#" + randomChosenColor).fadeIn(100).fadeOut(100).fadeIn(100);
  playSound(randomChosenColor);
}

$(".btn").click(function(){
  if (start == true){
    let userChosenColor = $(this).attr("id");
    userClickedPattern.push(userChosenColor);
    playSound(userChosenColor);
    animatePress(userChosenColor);
    checkAnswer(userClickedPattern.length-1);
  }
});

$(document).on("keypress", function(ev){
  if (start == true){
    if (ev.which == 81 || ev.which == 113){
      userChosenColor = "green";
    }
    if (ev.which == 87 || ev.which == 119) {
      userChosenColor = "grey";
    }
    if (ev.which == 69 || ev.which == 101) {
      userChosenColor = "red";
    }
    if (ev.which == 65 || ev.which == 97) {
      userChosenColor = "yellow";
    }
    if (ev.which == 83 || ev.which == 115) {
      userChosenColor = "cyan";
    }
    if (ev.which == 68 || ev.which == 100) {
      userChosenColor = "blue";
    }
    userClickedPattern.push(userChosenColor);
    playSound(userChosenColor);
    animatePress(userChosenColor);
    checkAnswer(userClickedPattern.length-1);
  }
});

function playSound(name) {
  let audio = new Audio("sounds/" + name + ".mp3");
  audio.play();
}

function animatePress(currentColor){
  $("#" + currentColor).addClass("pressed");
  setTimeout(function(){
    $("#" + currentColor).removeClass("pressed");
  }, 100);
}

function checkAnswer(currentLevel){
  if (gamePattern[currentLevel] === userClickedPattern[currentLevel]) {
      if (userClickedPattern.length === gamePattern.length){
        setTimeout(function () {
          nextSequence();
        }, 1000);
      }
    }
  else {
    playSound("wrong");
    $("body").addClass("game-over");
    $("#level-title").text("Game Over, Press ctrl + R to restart");
    setTimeout(function(){
      $("body").removeClass("game-over");
    }, 200);
    startOver();
  }
}

function startOver(){
  start = false;
  level = 0;
  gamePattern = [];
}

$(".theme").on("click", function(){
  $("body").toggleClass("light");
  $(".footer-link").toggleClass("gray");
  $(".footer").toggleClass("gray");
});
