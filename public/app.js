// Grab the articles as a json


// Whenever someone clicks a p tag
$(document).on("click", "h3", function() {
  // Empty the notes from the note section
  $("#notes").empty();
  // Save the id from the p tag
  var thisId = $(this).attr("data-id");

  // Now make an ajax call for the Article
  $.ajax({
    method: "GET",
    url: "/articles/" + thisId
  })
    // With that done, add the note information to the page
    .then(function(data) {
      console.log(data);
      // The title of the article
      $("#notes").append("<h2>" + data.title + "</h2>");
      // An input to enter a new title
      $("#notes").append("<input id='titleinput' name='title' >");
      // A textarea to add a new note body
      $("#notes").append("<textarea id='bodyinput' name='body'></textarea>");
      // A button to submit a new note, with the id of the article saved to it
      $("#notes").append("<button data-id='" + data._id + "' id='savenote'>Save Note</button>");

      // If there's a note in the article
      if (data.note) {
         $("#notes").append("<br>");
         $("#notes").append("<hr>");
         $("#notes").append("<br>");
         $("#notes").append("<h2>" + "Saved Title" + "</h2>");
         $("#notes").append("<p>" + data.note.title + "</p>");
         $("#notes").append("<h2>" + "Saved Notes" + "</h2>");
         $("#notes").append("<p>" + data.note.body + "</p>");
         $("#notes").append("<button data-id='" + data.note._id + "' class='deleteNote'>Delete</button>");

      }
    });
});

$(document).on("click", ".deleteNote", function() {
  var thisId = $(this).attr("data-id");
  console.log(thisId);
  
  $.ajax({
    method: "delete",
    url:"/articles/" + thisId,
  }).then (function(data){

    // res.json(data)
    $("#notes").empty();
  });
});

// When you click the savenote button
$(document).on("click", "#savenote", function() {
  // Grab the id associated with the article from the submit button
  var thisId = $(this).attr("data-id");

  // Run a POST request to change the note, using what's entered in the inputs
  $.ajax({
    method: "POST",
    url: "/articles/" + thisId,
    data: {
      // Value taken from title input
      title: $("#titleinput").val(),
      // Value taken from note textarea
      body: $("#bodyinput").val()
    }
  })
    // With that done
    .then(function(data) {
      // Log the response
      console.log(data);
      // Empty the notes section
      $("#notes").empty();
    });

  // Also, remove the values entered in the input and textarea for note entry
  $("#titleinput").val("");
  $("#bodyinput").val("");
});


$("#scrape").on("click", function () {
  $.ajax({
      type:"GET",
      url:"/scrape"
  }).then(function(response) {
      console.log(response);

      $.getJSON("/articles", function(data) {
        // For each one
        for (var i = 0; i < data.length; i++) {
          // Display the apropos information on the page
          $("#articles").append("<h3 data-id='" + data[i]._id + "'>" + data[i].title + "</h3><br /> <a href='" + data[i].link + "'>"+data[i].link+"</a><hr>");
        }
      });
  });
});


