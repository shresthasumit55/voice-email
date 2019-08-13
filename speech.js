var navMenuMappings = {"inbox":"anchor-inbox", "trash":"anchor-trash", "sent":"anchor-sent", "send":"anchor-sent","compose":"anchor-compose", "stop":"stopBtn"}
var voiceModes = {"navigation":1, "writer_command":2, "text_entry":3, "read_command":4}
Object.freeze(voiceModes)
var writerMenu = {"enter recipient":"recipientInput","enter receiver":"recipientInput","enter subject":"subjectInput","start message":"emailBodyArea", "enter cc":"ccField", "enter bcc":"bccField"}
var sendCommand = ["send email","send mail", "send the mail", "send the email", "sent email", "sent mail"]
var currentVoiceMode = voiceModes.navigation;
var activeUIComponent="";
var endOfSectionText = ["over over","out out"];
var readEmailCommands = ["read","read email", "read the email", "read mail", "read the mail"];
var backCommands = ["back back"];
var readInput = ["read input"];
var stopReading = ["stop","stop reading"];
var currentEmail;
var previousTranscript=""; // this variables holds the transcript before the last change was added
var SpeechRecognition = SpeechRecognition || webkitSpeechRecognition
var specialSymbols = {"at at":"@", "comma comma ":",","question question":"?", "pling pling":"!", "dollar dollar":"$"}
var bodyText=[];
var numberConversion = {"one":1,"two":2,"too":2, "to":2,"three":3,"four":4}

var openEmailCommands = "open email";

  var recognizing;
  var recognition = new SpeechRecognition();
  recognition.continuous = true;
  recognition.onend = reset;
  recognition.interimResults = false;


  recognition.onresult = function (event) {
    debugger
    if (currentVoiceMode==voiceModes.navigation){
      
        for (var i = event.resultIndex; i < event.results.length; ++i) {
      if (event.results[i].isFinal) {
        var command= event.results[i][0].transcript.trim();
        //command = command.replace(/\s+/g, '');

        if (command in navMenuMappings){

            $('#'+navMenuMappings[command]).trigger('click');
        }
        else if (command.includes(openEmailCommands)){
            var lastword = command.split(" ").pop();
            var emailId = numberConversion[lastword]
            openEmail('emailId'+emailId)
            
        }
        else if (readEmailCommands.includes(command)){
          
          findEmail(window.token.replace(/[^\d]+/, ''));          
          narrateEmail(currentEmail)
        }
        else if(command=="reply"){
          replyMail()
        }
        else if(["forward","forward mail", "forward email"].includes(command)){

          forwardEmail();
        }
        else if(stopReading.includes(command)){
          
          cancelSpeech()
        }

      }
    }

    }
    else if(currentVoiceMode==voiceModes.writer_command){
    for (var i = event.resultIndex; i < event.results.length; ++i) {
      if (event.results[i].isFinal) {
        var command= event.results[i][0].transcript.trim();
        command = command.toLowerCase();
        if (sendCommand.includes[command]){
          $('#btnSendEmail').trigger('click');
        }
        else if (command in writerMenu){
            
            currentVoiceMode = voiceModes.text_entry;
            $('#labelMode').text("Text Entry");
            activeUIComponent = writerMenu[command];
            $('#'+activeUIComponent).focus();
        }
        else if (command in navMenuMappings){
          currentVoiceMode = voiceModes.navigation;
          $('#'+navMenuMappings[command]).trigger('click');
      }
      }
    }
}

else if(currentVoiceMode==voiceModes.text_entry){
  
    for (var i = event.resultIndex; i < event.results.length; ++i) {
      if (event.results[i].isFinal) {
        var spokenText= event.results[i][0].transcript.trim();
        if (endOfSectionText.includes(spokenText)){
            currentVoiceMode = voiceModes.writer_command;
            $('#labelMode').text("Command");
        }
        else if (backCommands.includes(spokenText)){
          var body = bodyText.pop().join(' ');
          $('#'+activeUIComponent).val();
        }
        else if(spokenText=="read read"){
          provideFeedback()
        }
        else {
        var text = $('#'+activeUIComponent).val();
        bodyText.push(spokenText)
        previousTranscript = text;

        $('#'+activeUIComponent).val(bodyText.join(' '));
        }
      }
    }
}
  }

  //startRecord()

  $("#mic-on-btn").click(function(){
      startRecord();
  })
  
  $("#anchor-compose").click(function() {
    currentVoiceMode = voiceModes.writer_command;
  });

  function reset() {

    recognizing = false;
  }

  function startRecord(){
      if(!recognizing){
      recognition.start()
      recognizing = true;
      }
  }

  function stopRecord(){
      recognition.stop()
      recognizing = false;
  }

  function findEmail(id){
    id=Number(id)
    emailDetailedList.forEach(item =>{
      if(item.id==id){
      currentEmail = item;
      return
      }
    })
  }

  function narrateEmail(email){
   
	var voiceControl = parseInt($("#voiceControl").val());
	var speedControl = parseFloat($("#speedControl").val());
    msg.pitch = voiceControl; //0 to 2
    msg.rate = speedControl; // 0.1 to 10
   
    msg.text = email.body;

  msg.onend = function(e) {
    console.log('Finished in ' + event.elapsedTime + ' seconds.');
  };

  speechSynthesis.speak(msg);  

  }
//TODO: Stop reading email after stop command 
  function stopReading(){

  }
  function cancelSpeech(){
    speechSynthesis.cancel()
  }

  function replyMail(){
    resetCompose();
    var getActive = $(".active").removeClass('active');
    $("#anchor-compose").addClass("active");
    $("#emailList").hide();
    $("#sentScreen").hide();
    $("#trashScreen").hide();
    $("#readMail").hide();
    $("#composeScreen").show();
    findEmail(window.token.replace(/[^\d]+/, ''));
    $("#recipientInput").val(currentEmail.sender);
    $("#subjectInput").val("RE: "+currentEmail.subject);
    currentVoiceMode=voiceModes.writer_command;
  }

  function forwardEmail(){
    resetCompose();
    var getActive = $(".active").removeClass('active');
    $("#anchor-compose").addClass("active");
    $("#emailList").hide();
    $("#sentScreen").hide();
    $("#trashScreen").hide();
    $("#readMail").hide();
    $("#composeScreen").show();
    findEmail(window.token.replace(/[^\d]+/, ''));
    emailBody = "\n----------------------------------------------\n\From: " + currentEmail.sender + "\nTo: me@gmail.com\nSubject: " + currentEmail.subject + "\n";
    $("#emailBodyArea").val(emailBody + currentEmail.body);
    $("#subjectInput").val("FW: "+currentEmail.subject);
    currentVoiceMode=voiceModes.writer_command;

  }
  // Run this command when User says "READ MY INPUT"
  function provideFeedback(){ 
    var inputText =  $(":focus").val();
    speakMsg(inputText);
  }