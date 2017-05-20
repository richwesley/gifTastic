// JavaScript Document
 var topics = ["Godzilla", "Mothra", "Gamera", "Rodan", "Knifehead"];
      	   
      function displayMonsterInfo() {
		
        var monster = $(this).attr("data-monster");
        var queryURL = "http://api.giphy.com/v1/gifs/search?q=" +
        monster + "&api_key=dc6zaTOxFJmzC&limit=10";
		$('#showMonsters').css('background-image', 'none'); 
        
		 
        $.ajax({
          url: queryURL,
          method: "GET"
        }).done(function(response) {
          $('#showMonsters').empty();
          var results = response.data;
         
          for (var i = 0; i < results.length; i++) {
                 
              var gifDiv = $("<div class='kaiju'>");
              var rating = results[i].rating; 
              var p = $("<p id='rating'>").text("Rating: " + rating);
              var monsterImage = $("<img id='giphy'>");             
             
			  monsterImage.attr("src", results[i].images.fixed_height_still.url);
			  monsterImage.attr("data-still", results[i].images.fixed_height_still.url);		monsterImage.attr("data-terrorize", results[i].images.fixed_height.url);
							
              gifDiv.append(monsterImage);
			  gifDiv.append(p);
				
                console.log(results);
				console.log(monsterImage);
				
              $("#showMonsters").prepend(gifDiv);           
          }
        });
      }
     	
      function renderButtons() {
      
        $("#buttons-view").empty();
       
        for (var i = 0; i < topics.length; i++) {
         
          var a = $("<button>");
          
          a.addClass("showMonsterButton");       
          a.attr("data-monster", topics[i]);         
          a.text(topics[i]);		
		  a.attr("data-state", topics[i]);	
          
          $("#buttons-view").append(a);
		 }
      }
		
      
      $("#add-monster").on("click", function(event) {
        event.preventDefault(); 
        var monster = $("#input").val().trim(); 
        topics.push(monster);
        renderButtons();
      });
		
		  
      $(document).on("click", ".showMonsterButton", displayMonsterInfo);
      renderButtons();
		
	  
		$("#showMonsters").on("click", "img", function() {   
      		var state = $(this).attr("data-state");
        	console.log($(this));

        		if(state === "still"){
          			$(this).attr("src", $(this).attr("data-terrorize"));
          			$(this).attr("data-state", "terrorize");
       			} else {
          			$(this).attr("src", $(this).attr("data-still"));
          			$(this).attr("data-state", "still");
				}		 			 
    });	