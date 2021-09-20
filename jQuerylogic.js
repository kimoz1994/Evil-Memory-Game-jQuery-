       //memory game logic

//clicking on the start button:
//      1.change the text on the button to reset button
//      2.mode of the game is on
//      3.populate the boxes with fruit 
//      4.show the fruits for 3secs
//      5.hide the fruits
//      
//clicking on the reset button:
//     1.game mode is off
//     2.refresh the page
//     3.change the text to start 
//
//
//     
//clincking on a fuit box
//    1.show the click on fruit
//    2.wait till the player have clicked on the other fruit box
//    3.compare the two fruits
//         --if they are the same 
//              ---score++
//              ---show correct box         
//              ---play correct sound
//              ---keep the two correct fruits shown
//        -- if they are not the same 
//           ---hide both of them
//           ---show the wrong box
//           ---play the wrong sound
//           ---decrese the lives by one
//                    if that the last life
//                           ----show game over and write the score
//                    if not the last life 
//                           --- keep the game playing
//
//if the player get all of the fruits right (score is 8)
//       ------ the player move to level two 
//       ------ show congratulationg message
//       ------ increase the level by one
//       ------ wait 10 secs and start showing fruits
//       ------ show the fruits this time for 1.5 secs and then hide them 
//       repeat step one 
//       
//if the player get all the fruits right (score is 8)       
//                           
//           ---the player move to level three (last level)                
//           ---show congratulation message 
//           --- increase the level by one 
//           ---wait 10 secs and start shoing fruits
//           ---show the fruits this time for 0.5 secs and then hide them 
//           repeat step one 



$(function(){
    
    //quick game tip
    
    window.alert("you have 3 secs to memorise all the tile and then they will all hide. use your memory to match the similar tiles!  CLICK START GAME");
    
    
    
    //at the beginning the game isn't working
    var mode =false;
    //random image number 
    var rimage;
    //radom box1 and box2 number
    var rbox1,rbox2;
    //array for image and boxes
    var imagearray = [];
    var boxarray = [];
    //variable for the timeout of the fruits
    var showfruits;
    //array to store the clicked images value and compare them 
    var imageclick = [];
    
    //two variables to save the images source attributes for use
    
    var attribute1;
    var attribute2;
    
    //the score variable initially is zero
    
    var score = 0;
    
    //setting a variable for the countdown interval
    var action;
    var timeremainning = 60; // the value of the timer at the beginning
    
    //variable for the trials left
    var trialsleft;
    
    
    
    
    
                   //clicking on the start reset button 
    
    
    
    
    
    
    $("#startreset").click(function(){
        
        //add hearts to the box
        trialsleft=3;
        addhearts();
        //if game not on
        if(mode == false){
//            now the game is on
            
            mode = true;
            
//            changing the text on the button
            
            
            $(this).text("Reset Game");
            
            //score to zero and scorevale to score
            
            score =0;
            
            $("#scorevalue").text(score);
            
            //start countdown 60secs
            
            startcountdown();
            
            //populate the boxes with fruits
                    populate();
          


            //show the fruits for 3s
            
                    showandhide(3000);            
            
        }
        
        //if game is on
        else(
        
       location.reload()
            
            
        )
        
        
        
    });
    
    
    
    
    
                          //clicking on a tile (playing)
    
    
    
    
    $(".box").click(function(){
        
        if (mode == true&& $("#gameover").is(':visible') == false  ){
            
           
            
            //get the source of the image
    var attribute = $(this).children(".icons").attr("src");
            
        //check if the image was hidden before the click
            
        if($(this).children(".icons").is(':visible') == false){
            
            //get the number of the image and put in array for comparison
            
            imageclick.push(attribute[7]);
        }
     //show the image when clicked on the box
         $(this).children(".icons").show();
           
            
            //if the length of the array is 2---> get the source attributes of the images for later use
            
        if(imageclick.length==2){
            
             attribute1 = "images/"+imageclick[0]+".png";
              attribute2 = "images/"+imageclick[1]+".png";
            
            
        }
            
            
            
            //if the length of the array is 2--> start comparing
            
      if(imageclick.length==2){ 
          
          //if the two images are identical
    if ( imageclick[0] == imageclick[1]){
        
        //clearing the images array
        
        imageclick=[];
        
        
        // updating score and scorevariable
        score++;
        $("#scorevalue").text(score);
        
        //checking if the game is finished
        if(score == 8){
            stopcountdown();
            $("#gameover").show();
                            
            $("#gameover").html("<p>Congratulations!</p><p>You have finished the Game!</p>");
                
            
        }
        
        //showing the correct box and hiding the worng box,then hiding the correct box after 1s
        
        $("#wrong").hide();
        $("#correct").show();
        document.getElementById("correctsound").play();

        setTimeout(function(){
        $("#correct").hide();
            
        },1000);
        
        
        
        }  
          
          //if the images are not identical
          
        else  {
            
            //clearing the images array  

            imageclick = [];
            // decreasing the lifes by one 
            trialsleft--;
            addhearts();
            
//            checking if any trials left
            if(trialsleft == 0 ){
                stopcountdown();
                $("#gameover").show();
                            
                $("#gameover").html("<p>Game over!</p><p>Your score is " + score + "</p>");
                
            }
            
            
            
           //showing the wrong box and hiding the correct box,then hiding the wrong box after 1s
             
            $("#wrong").show();
            document.getElementById("wrongsound").play();

            $("#correct").hide();
            setTimeout(function(){
                //hiding the wrong box
                $("#wrong").hide();
                
                //hiding the wrong choices
                //note that this part can be put in a seperate setimeout function.
            $('[src="'+attribute1+'"]').hide()
            $('[src="'+attribute2+'"]').hide()
                
            },500);
            
            
          
            
        }
      }
            
        }
        
       
        
        
      
        
    });
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
                        //functions definitions 
    
    
    function populate(){
      
     
        
        
       rimage = Math.floor(Math.random() * (8 - 1 + 1)) + 1; 
       rbox1 = Math.floor(Math.random() * (16 - 1 + 1)) + 1; 
       rbox2 = Math.floor(Math.random() * (16 - 1 + 1)) + 1;
       
        var i =0;
        
        while(i<=7){
        
        do {
      if(rbox1 != rbox2 && imagearray.indexOf(rimage) == -1 && boxarray.indexOf(rbox1) == -1 &&boxarray.indexOf(rbox2) == -1&&i<=7 ){
          
          $("#box" + rbox1 + " img").attr({"src" : "images/"+rimage+".png"});
          $("#box" + rbox2 + " img").attr({"src" : "images/"+rimage+".png"});
            
        imagearray.push(rimage);
          i++;
        boxarray.push(rbox1);
        boxarray.push(rbox2);
       rimage = Math.floor(Math.random() * (8 - 1 + 1)) + 1; 
       rbox1 = Math.floor(Math.random() * (16 - 1 + 1)) + 1; 
       rbox2 = Math.floor(Math.random() * (16 - 1 + 1)) + 1;
                  
      }
       else{
           
 rimage = Math.floor(Math.random() * (8 - 1 + 1)) + 1; 
    rbox1 = Math.floor(Math.random() * (16 - 1 + 1)) + 1; 
    rbox2 = Math.floor(Math.random() * (16 - 1 + 1)) + 1;       }
        }
        
    while (imagearray.indexOf(rimage)==-1 && boxarray.indexOf(rbox1)==-1&&boxarray.indexOf(rbox2)==-1&&i<=7)
        
        }
        
         
        
        
    }
    
    
    
        
function showandhide(number){
    $(".icons").show();
    
    var x = number;
    
    showfruits = setTimeout(function(){
        
        
        $(".icons").hide()
        
    },x);
    
    
}        
        
        

        
//start counter
    function startcountdown(){
        
        
         action = setInterval(function(){timeremainning-=1;
                    
                    $("#timeremainingvalue").text(timeremainning); 
                                     
                        if(timeremainning== 0) {//game over
                            
                            stopcountdown();
                            
                            //show gameover message
                            $("#gameover").show();
                            
                            $("#gameover").html("<p>Game over!</p><p>Your score is " + score + "</p>");
                            
                            $("#timeremaining").hide();                            
                            $("#correct").hide();
                            $("#wrong").hide();
                            
                            
                            
                            
                            
                            
                            
                        }                      
                                               
                                               
                                               
                                               ;},1000);

        
        
    }
    

// stop counting
    function stopcountdown(){
        
        clearInterval(action);
    }        
        
        
    //add hearts function
        
   function addhearts(){
    
    $("#trialsleft").empty();
    
    for(var i = 0 ; i < trialsleft; i++){
                
               $("#trialsleft").append(" <img class='life' src='images/heart.png'> "); 
            }
    
    
}     
        
        
        
    
    
    
    
});
