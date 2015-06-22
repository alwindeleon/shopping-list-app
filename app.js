

$(document).ready(function(){
	$(document).on("click",".buttonDone", function(){
		
		$(this).siblings().addBack().css({"transform":"scale(.9)","background":"lawngreen"});
	});


	$(document).on("click",".buttonRemove", function(){
		$(this).parent().animate(
			{left: "40em", background: "black"},
			1000,
			function(){
				$(this).remove();
			});
	});


	// $(".buttonRemove").click(function(){
	// 	$(this).parent().remove();
	// });


});


function addItem(){
	
	var item = $(".itemToAdd");
	
	var itemName  = item.val();

	$("section").append("<div class='block'><button class='buttonDone'  type = 'button'>a</button><div class='item'>"+itemName+ "</div><button class='buttonRemove' type='button'>a</button></div>");
	$(".itemToAdd").val('');

}

