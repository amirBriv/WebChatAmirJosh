var id = "";
userName = "";

$(document).ready(function () {
    $('#sendText').click(sendText);
    $('#checkText').click(getMessage);
    $('#sendName').click(sendName);

    var input = document.getElementById("textinput");
    var name = document.getElementById("userinput");

    // Respond to enter key
    input.addEventListener("keyup", function(event) {
      // Number 13 is the "Enter" key on the keyboard
      if (event.keyCode === 13) {
        // Cancel the default action, if needed
        event.preventDefault();
        // Trigger the button element with a click
        sendText();
      }
    });


    id=makeid(10);
    console.log("ID:",id);

});

function sendName(){
  console.log("getting name");
  userName = $('#userinput').val();
  $('#userinput').val("");
}


function makeid(length) {
   var result           = '';
   var characters       = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
   var charactersLength = characters.length;
   for ( var i = 0; i < length; i++ ) {
      result += characters.charAt(Math.floor(Math.random() * charactersLength));
   }
   return result;
}

// Function to force scrollable window at bottom
function updateScroll(){
    var element = document.getElementById("chatBox");
    element.scrollTop = element.scrollHeight;
}
function getMessage(){
  console.log("Getting Message")
  inText = ""
  // Clear the input text
  //$('#textinput').val("");
  //updateScroll();
  message=inText.replace("","+");
  $.ajax(
    {
    type: "get",
    url: "/cgi-bin/team5_webchat.py?message=" + message + "&id="+id,
    dataType: "text",
    success:  processResults,
    error: function(request, ajaxOptions, thrownError)
    {
        $("#debug").text("error with get:"+request+thrownError);
    }
  });
}

 // Respond to send button
function sendText() {
  console.log("sendText");
  // Get the text from the text box
  inText = userName + ": "+$('#textinput').val();
  // Clear the input text
  $('#textinput').val("");

  //document.getElementById('chatBox').innerHTML += "<font color='red'>You: </font>" + inText+"<br />";
  // force to bottom
  updateScroll();

  message=inText.replace("","+");
  $.ajax(
    {
    type: "get",
    url: "/cgi-bin/team5_webchat.py?message=" + message + "&id="+id,
    dataType: "text",
    success:  processResults,
    error: function(request, ajaxOptions, thrownError)
    {
        $("#debug").text("error with get:"+request+thrownError);
    }
  });
}

function processResults(data) {
  // add to the bottom of the chat box
  //setTimeout(function(){getMessage();}, 2000);
  console.log("got:"+data);
  $('#chatBox').append(data);

}
