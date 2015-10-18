$(document).ready(function(){
  $("#search-button").click(function(){
    var tag = $("#searchBar");
    var JSONobj = {
      tag: tag
    };
    $.ajax({
            url: "/charities",
            type: "POST",
            data: JSON.stringify(JSONobj),
            dataType:"json",
            contentType:'application/json'
            
      }).done(function(data){
        if(!data.message){
          $("#message-log").text("incorrect username or password")
        }else{
          if(data.kind == "vol"){
            console.log("IN VOLUNTEER");
            window.location.replace("/dashboard/volunteer/"+username);
          }else if (data.kind == "char"){
            console.log("IN CHAriTY");
            window.location.replace("/dashboard/charity/"+username);
          }
        }
      })
    })
  });
});