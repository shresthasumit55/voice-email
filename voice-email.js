var emailDetailedList=[{
    "id":1,
    "sender": "mark_one@gmail.com",
    "cc":[],
    "bcc":[],
    "read": true,
    "subject": "Meeting rescheduled",
    "body": "Hi, \
    The meeting has been cancelled. You will be notified about further changes.\
    Regards,\
    Mark",
    "date":"06-23-2019"
  },
  {
    "id":2,
    "sender": "mark_two@gmail.com",
    "cc":[],
    "bcc":[],
    "read":true,
    "subject": "Event postponed",
    "body": "Hi,\
    The event has been postponed to 8th July. You will be notified about further changes.\
    Regards,\
    Mark",
    "date":"06-20-2019"
  },
  {
    "id":3,
    "sender": "mark_three@gmail.com",
    "cc":[],
    "bcc":[],
    "read":true,
    "subject": "project status",
    "body": "Hi,\
    Please meet with me by the end of the day to discuss the current status of the project.\
    Regards,\
    Mark",
    "date":"06-13-2019"
  }]

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
    var emailListHtml="";

    emailDetailedList.forEach(element => {
        emailListHtml+='<div class="row email-each unread" id="emailId'+element.id+'">\
        <div class="col" ><span class="badge badge-danger new-email-badge">New</span></div>\
        <div class="col-3" id="email-from"> '+element.sender+'</div>\
        <div class="col-5" id="email-subject">'+element.subject+' </div>\
        <div class="col-3" id="email-date">'+element.date+'</div>\
      </div>'
      });
    $( "#emailList" ).html( emailListHtml );

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



