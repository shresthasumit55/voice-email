var navMenuMappings = {"inbox":"anchor-inbox", "trash":"anchor-trash", "sent":"anchor-sent", "compose":"anchor-compose"}
var voiceModes = {"navigation":1, "writer_command":2, "text_entry":3}
Object.freeze(voiceModes)
var writerMenu = {"enter recipient":"recipientInput","enter subject":"subjectInput","start message":"emailBodyArea"}
var currentVoiceMode = voiceModes.navigation;
var activeUIComponent="";
var endOfSectionText = "over over"

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
        var command= event.results[i][0].transcript;
        command = command.replace(/\s+/g, '');
        if (command in navMenuMappings){

            $('#'+navMenuMappings[command]).trigger('click');
        }

      }
    }

    }
    else if(currentVoiceMode==voiceModes.writer_command){
    for (var i = event.resultIndex; i < event.results.length; ++i) {
      if (event.results[i].isFinal) {
        var command= event.results[i][0].transcript.trim();
        if (command in writerMenu){
            currentVoiceMode = voiceModes.text_entry;
            $('#labelMode').text("Text Entry");
            activeUIComponent = writerMenu[command];
            $('#'+activeUIComponent).focus();
        }
      }
    }
}

else if(currentVoiceMode==voiceModes.text_entry){
    for (var i = event.resultIndex; i < event.results.length; ++i) {
      if (event.results[i].isFinal) {
        var spokenText= event.results[i][0].transcript.trim();
        //debugger
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
      recognition.start()
      recognizing = true;
  }

  function stopRecord(){
      recognition.stop()
      recognizing = false;
  }