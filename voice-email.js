mode = 0;
$("#switch").click(function(){
    if (mode==0){
         $("body").addClass("invert");
        mode = 1;
    }
    else {
        $("body").removeClass("invert");
        mode = 0;
    }
});

$("#btnInc").click(function(){
	var fontSize = parseInt($("#main").css("font-size"));
	var fontSize2 = parseInt($(".tabButtons").css("font-size"))
	fontSize = fontSize + 1 + "px";
	
	$("#main").css({'font-size':fontSize});
	
});

$("#btnDec").click(function(){
	var fontSize = parseInt($("#main").css("font-size"));
	fontSize = fontSize - 1 + "px";
	$("#main").css({'font-size':fontSize});
	
});

$(document).ready(function(){
    // Hides all new badges
    var noEmail = $(".new-email-badge");
    console.log(noEmail.hide());
    addNew(); 
})
// Adds "NEW" badge left of an unread email or new email 
function addNew(){
   var elements= $(".unread");
   var newEmail = $(".new-email-badge");

    console.log(elements.find(newEmail).show());
}