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
    var width = parseInt($(".logo").css("width"));
    var height = parseInt($(".logo").css("height"));
	fontSize = fontSize + 1 + "px";
    width = (width < 210) ? width + 5 + "px" : "210px";
    height =(height < 210) ? height + 5 + "px" : "210px";
	$("#main").css({'font-size':fontSize});
    $(".logo").css({'width':width});
    $(".logo").css({'height':height});
});

$("#btnDec").click(function(){
	var fontSize = parseInt($("#main").css("font-size"));
	var width = parseInt($(".logo").css("width"));
    var height = parseInt($(".logo").css("height"));
	fontSize = fontSize - 1 + "px";
    width = (width >70) ? width -5 + "px" : "70px";
    height =(height > 70) ? height - 5 + "px" : "70px";
    $("#main").css({'font-size':fontSize});
    $(".logo").css({'width':width});
    $(".logo").css({'height':height});
	
});

$(document).ready(function(){
    // Hides all new badges
    var noEmail = $(".new-email-badge");
    addNew();
    $("#emailList").show();
    $("#sentScreen").hide();
    $("#trashScreen").hide();
    $("#composeScreen").hide();
})

$("#anchor-inbox").click(function () {
    $("#emailList").show();
    $("#sentScreen").hide();
    $("#trashScreen").hide();
    $("#composeScreen").hide();
})

$("#anchor-sent").click(function () {
    $("#emailList").hide();
    $("#sentScreen").show();
    $("#trashScreen").hide();
    $("#composeScreen").hide();
})
$("#anchor-trash").click(function () {
    $("#emailList").hide();
    $("#sentScreen").hide();
    $("#trashScreen").show();
    $("#composeScreen").hide();
})
$("#anchor-compose").click(function () {
    $("#emailList").hide();
    $("#sentScreen").hide();
    $("#trashScreen").hide();
    $("#composeScreen").show();
})
// Adds "NEW" badge left of an unread email or new email 
function addNew(){
   var elements= $(".unread");
   var newEmail = $(".new-email-badge");

}