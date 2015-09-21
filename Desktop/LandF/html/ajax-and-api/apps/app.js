$(function(){
	$("#search-term").submit(function(event){
		event.preventDefault();
		var searchTerm = $("#query").val();
		getRequest(searchTerm);
	});
});
  


function showResults( data ){
	$("#search-results").children().remove();
	 for(var x = 0; x < data.length;x++){
    	$("#search-results").append("<p>"+data[x].Title+"</p>");
    }
}

function getRequest( searchTerm ){
	var params = {
		s:searchTerm,
		r:"json"
	};
	url = 'http://www.omdbapi.com';

	$.getJSON(url,params,function(data){
		console.log(data);
		showResults(data.Search);
	});
}

