var msg = new SpeechSynthesisUtterance();
var voices = window.speechSynthesis.getVoices();
msg.volume = 1; // 0 to 1
msg.voiceURI = 'native';
msg.voice = voices[2]; 
msg.lang = 'en-US';
var emailDetailedList=[{
    "id":1,
    "sender": "mark_one@gmail.com",
    "cc":[],
    "bcc":[],
    "read": false,
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

  var audio = new Audio('click-sound.mp3');

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
    speakMsg("Color Mode Switched");
});

function speakMsg(message){
    
	msg  = new SpeechSynthesisUtterance();
	msg.volume = 1; // 0 to 1
	msg.voiceURI = 'native';
	msg.voice = voices[2]; 
	msg.lang = 'en-US';
    voiceControl = parseInt($("#voiceControl").val());
	speedControl = parseFloat($("#speedControl").val());
    msg.pitch = voiceControl; //0 to 2
    msg.rate = speedControl; // 0.1 to 10
    msg.text = message;

	speechSynthesis.speak(msg);  
}
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
	//speechSynthesis.cancel();
    speakMsg("Font size increased");
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
	//speechSynthesis.cancel();
	speakMsg("Font size Decreased");
});

$(document).ready(function(){
    $("#anchor-inbox").click();
    $("#sentScreen").hide();
    $("#trashScreen").hide();
    $("#composeScreen").hide();
    $("#readMail").hide();

});

$("#anchor-inbox").click(function () {
    //currentVoiceMode = voiceModes.navigation;
    var getActive = $(".active").removeClass('active');
    $("#anchor-inbox").addClass("active");
    $("#emailList").show();
    $("#sentScreen").hide();
    $("#trashScreen").hide();
    $("#composeScreen").hide();
    $("#readMail").hide();
   
    var emailListHtml="";

    emailDetailedList.forEach(element => {
        emailListHtml+='<div class="row email-each '; 
        emailListHtml += (element.read)?'"': 'unread"';
       
        emailListHtml += 'id="emailId'+element.id+'" onClick = "openEmail(this.id)">';
        emailListHtml += '&nbsp;'+element.id+'<div class="col width-5"><span class="badge badge-danger new-email-badge">New</span></div>';
        emailListHtml +='<div class="col width-30 align-center" id="email-from"> '+element.sender+'</div>\
        <div class="col width-40 align-center" id="email-subject">'+element.subject+' </div>\
        <div class="col width-20" id="email-date">'+element.date+'</div>\
      </div>'
      });
    $( "#emailList" ).html( emailListHtml );
    var noEmail = $(".new-email-badge").hide();
    addNew();
	speechSynthesis.cancel();
    speakMsg(" Currently in Inbox");
})

$("#anchor-sent").click(function () {
    var getActive = $(".active").removeClass('active');
    $("#anchor-sent").addClass("active");
    $("#emailList").hide();
    $("#sentScreen").show();
    $("#trashScreen").hide();
    $("#readMail").hide();
    $("#composeScreen").hide();
	speechSynthesis.cancel();
    speakMsg("Currently in Sent Emails");
})
$("#anchor-trash").click(function () {
    var getActive = $(".active").removeClass('active');
    $("#anchor-trash").addClass("active");
    $("#emailList").hide();
    $("#sentScreen").hide();
    $("#trashScreen").show();
    $("#readMail").hide();
    $("#composeScreen").hide();
	speechSynthesis.cancel();
    speakMsg("Currently in to trash.");
})
$("#anchor-compose").click(function () {
    var getActive = $(".active").removeClass('active');
    $("#anchor-compose").addClass("active");
    $("#emailList").hide();
    $("#sentScreen").hide();
    $("#trashScreen").hide();
    $("#readMail").hide();
    $("#composeScreen").show();
	speechSynthesis.cancel();
    speakMsg("Compose a new email.");
})

function resetCompose(){
    $("#recipientInput").val("");
    $("#subjectInput").val("");
    $("#ccField").val("");
    $("#bccField").val("");
    $("#emailBodyArea").val("");
}

$("#btnSendEmail").click(function () {
    
	speakMsg("Email Sent");

	setTimeout(() => {$("#anchor-inbox").trigger('click');},4000);
    setTimeout(resetCompose, 4000);    
	
	//alert("email sent");

})
// Adds "NEW" badge left of an unread email or new email 
function addNew(){
   var elements= $(".unread").find(".new-email-badge").show();   
}
function getId(str)
{
    return str.replace(/[^\d]+/, '');
}
function openEmail(id){
    
    $("#emailList").hide();
    $("#sentScreen").hide();
    $("#trashScreen").hide();
    $("#composeScreen").hide();
    $("#readMail").show();
    window.token = id; 
    var emailId = getId(id)-1;
    var singleEmail = emailDetailedList[emailId];
    var emailShow ="";
    emailShow += '<div id ="openEmail" style="margin: 10px;">\
    <button id="stopBtn" style="display: none;" onClick="cancelSpeech()">Stop Reading</button>\
    <h3> Subject: '+ singleEmail.subject +' </h3>\
    From:<strong>'+singleEmail.sender+' </strong> on '+singleEmail.date+'\
    <p>to me</p>\
    <div class="col email-read-body">\
    <p>\ '+singleEmail.body +'\
        <div id="reply" class="col" style:"margin-top:20px;>\
            <button type="button" onClick = "replyMail()" class="btn btn-link"  id = "replyButton'+id+'"><i class="fas fa-reply"></i> Reply </button>\
            <button type="button" onClick = "forwardEmail()" class="btn btn-link" id = "forwardButton'+id+'"> <i class="fas fa-share-square"></i> Forward </button>\
        </div></div></div>';
    $("#readMail").html(emailShow);
    singleEmail.read = true;
    speakMsg("Email from " +singleEmail.sender+ ", Subject" + singleEmail.subject);
};
$("#recipientInput").focus(function(){
	speechSynthesis.cancel();
    audio.play()
});
$("#subjectInput").focus(function(){
	speechSynthesis.cancel();
    audio.play()
});
$("#ccField").focus(function(){
	speechSynthesis.cancel();
    audio.play()
});
$("#bccField").focus(function(){
	speechSynthesis.cancel();
    audio.play()
});
$("#emailBodyArea").focus(function(){
	speechSynthesis.cancel();
    audio.play()
});




