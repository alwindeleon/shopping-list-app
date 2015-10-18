$(document).ready(function(){
	$("#but-mod-1").on("click",function(){
		$("#modal-1").css("display","block");
		$("#modal-1").removeClass("hide");
     
	})
        
     
  	$("#but-mod-2").click(function(){
  	 $("#modal-2").css("display","block");
  	 $("#modal-2").removeClass("hide");
  	
  	});
  	$("#close-1").click(function(){
  		$("#modal-1").hide();
  	})
  	$("#close-2").click(function(){
  		$("#modal-2").hide();
  	})
  	$("#close-3").click(function(){
  		$("#modal-login").hide();
  	})
  	$("#log").click(function(){
  	 $("#modal-login").css("display","block");
  	 $("#modal-login").removeClass("hide");
  	 
  	});

    $("#login-button").click(function(){
      var username = $("#username-log").val();
      var password = $("#password-log").val();
      var JSONobj = {
        username: username,
        password: password
      };
      $.ajax({
            url: "/login",
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
    //when charity sign up button is clicked
    $('#char-sign-but').click(function(){
      var name = $("#name-char").val();
      var username = $("#username-char").val();
      var password = $("#password-char").val();
      var email = $("#email-char").val();
      var resources = $("#resources-char").val();
      var tags = $("#tags-char").val();
      var about = $("#aboutus-char").val();
      var link = $("#link-char").val();

      var JSONobj = {
        name: name,
        username: username,
        password: password,
        email: email,
        needs: resources,
        tags : tags,
        about: about,
        link: link
      };

      $.ajax({
            url: "/signup/charity",
            type: "POST",
            data: JSON.stringify(JSONobj),
            dataType:"json",
            contentType:'application/json'
            
      }).done(function(data){
        if(!data.message == "true"){
          $("#message-char").text("username already used")
        }else{
            $("#char-hid-form  > input").val(username);
            window.location.replace("/dashboard/charity/"+username);
        }
      })
    })
    //when volunteer sign up button is clicked
    $('#vol-sign-but').click(function(){
      var name = $("#name-vol").val();
      var username = $("#username-vol").val();
      var password = $("#password-vol").val();
      var email = $("#email-vol").val();
      var interests = $("#interests-vol").val();
      var tags = $("#tags-vol").val();


      var JSONobj = {
        name: name,
        username: username,
        password: password,
        email: email,
        interests: interests,
        tags : tags,
      };

      $.ajax({
            url: "/signup/volunteer",
            type: "POST",
            data: JSON.stringify(JSONobj),
            dataType:"json",
            contentType:'application/json'
            
      }).done(function(data){
        console.log(data);
        if(!data.message == "true"){
          $("#message-vol").text("username already used")
        }else{
            $("#vol-hid-form  > input").val(username);
            window.location.replace("/dashboard/volunteer/"+username);
          }
      })
    })
});