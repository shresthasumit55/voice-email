var navMenuMappings = {"inbox":"anchor-inbox", "trash":"anchor-trash", "sent":"anchor-sent", "send":"anchor-sent","compose":"anchor-compose", "stop":"stopBtn"}
var voiceModes = {"navigation":1, "writer_command":2, "text_entry":3, "read_command":4}
Object.freeze(voiceModes)
var writerMenu = {"enter recipient":"recipientInput","enter receiver":"recipientInput","enter subject":"subjectInput","start message":"emailBodyArea", "enter cc":"ccField", "enter bcc":"bccField"}
var sendCommand = ["send email","send mail", "send the mail", "send the email"]
var currentVoiceMode = voiceModes.navigation;
var activeUIComponent="";
var endOfSectionText = "over over"
var readEmailCommands = ["read","read email", "read the email", "read mail", "read the mail"]
var currentEmail;

var SpeechRecognition = SpeechRecognition || webkitSpeechRecognition

  var recognizing;
  var recognition = new SpeechRecognition();
  recognition.continuous = true;
  recognition.onend = reset;
  recognition.interimResults = false;
  

  recognition.onresult = function (event) {
    if (currentVoiceMode==voiceModes.navigation){
        for (var i = event.resultIndex; i < event.results.length; ++i) {
      if (event.results[i].isFinal) {
        var command= event.results[i][0].transcript.trim();
        //command = command.replace(/\s+/g, '');

        if (command in navMenuMappings){

            $('#'+navMenuMappings[command]).trigger('click');
        }
        else if (readEmailCommands.includes(command)){
          findEmail(window.token.replace(/[^\d]+/, ''));
          
          narrateEmail(currentEmail)
        }

      }
    }

    }
    else if(currentVoiceMode==voiceModes.writer_command){
    for (var i = event.resultIndex; i < event.results.length; ++i) {
      if (event.results[i].isFinal) {
        var command= event.results[i][0].transcript.trim();
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
        if (spokenText==endOfSectionText){
            currentVoiceMode = voiceModes.writer_command;
            $('#labelMode').text("Command");
        }
        else {
        var text = $('#'+activeUIComponent).val();
        $('#'+activeUIComponent).val(text+" "+spokenText);
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
    var msg = new SpeechSynthesisUtterance();
    var voices = window.speechSynthesis.getVoices();
    msg.voice = voices[2]; 
    
    msg.volume = 1; // 0 to 1
    msg.voiceURI = 'native';
    msg.pitch = 1; //0 to 2
    msg.rate = 1; // 0.1 to 10
    msg.lang = 'en-US';
    msg.text = email.body;

  msg.onend = function(e) {
    console.log('Finished in ' + event.elapsedTime + ' seconds.');
  };

  speechSynthesis.speak(msg);  

  }

  function cancelSpeech(){
    speechSynthesis.cancel()
  }