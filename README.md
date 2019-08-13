# voice-email
Voice controlled email application

## Introduction
Voice-email is an accessible web based email application with voice control features that can be used to read incoming emails, compose or reply to existing emails, which will be helpful for blind or vision-impaired users. As most of the features are enabled through voice commands users with motor disabilities can also benefit from this application. Multiple options which includes bigger fonts, color contrast, speed and voice of reader can also be customized in the application.

## Project Files

1. all.css:
Contains all styles for Font Awesome (https://fontawesome.com).
2. all.js:
Contains all the javascript code for Font Awesome (https://fontawesome.com)
3. click-sound.mp3:
Sound for providing voice feedback when a component is clicked. The sounds files were taken from soundbible.com.
http://soundbible.com/1950-Button-Push.html
4. index.html:
Contains the html code for the project.
5. README.md:
A readme file that provides information about the project, libraries used, project files, etc.
6. focus-out.mp3:
Audio file that provides voice feedback when mode is changed from text mode to command. The sound is downloaded from soundbible.com.
http://soundbible.com/1252-Bleep.html
7. logo.png:
Graphics file which contains the logo of this application/project.
8. speech.js:
Javascript file that contains the logic of handling different speech commands that is used in the project. 
9. voice-email.css:
Contains all the styles used in our project.
10. voice-email.js:
Javascript file that contains all logic regarding navigation, performing actions, etc.  

## References to code libraries and resources used:
* Javascript Web Speech API
    https://w3c.github.io/speech-api/
For the actual speech recognition and text to speech, Web speech API documentation was referred and some of the sample codes from the API documentation are used in our system.
* Jquery 3.3.1 
https://code.jquery.com/jquery-3.3.1.slim.min.js
* Bootstrap 4.3.1 https://stackpath.bootstrapcdn.com/bootstrap/4.3.1/js/bootstrap.min.js
* Font Awesome 5.9.0 
https://fontawesome.com
* Soundbible
http://soundbible.com/

## List of Keywords:

Given below are the list of keywords that can be used to perform email-based actions through voice commands.
 
### 1. Composing a New email: “COMPOSE”

The user needs to say “OVER OVER” or “OUT OUT” after each of the below command is entered and the user wants to move to the next action.

* Adding Recipient: “ENTER RECIPIENT” or “ENTER RECEIVER”
* Adding Subject: “ENTER SUBJECT”
* Adding CC: “ENTER CC”
* Adding BCC: “ENTER BCC”
* Adding the text of email: “START MESSAGE”
* Reading the message or the current entry position: “READ READ”
* Sending the current email: “SEND EMAIL” or “SEND MAIL”

### 2. Inbox
* To go to Inbox: INBOX
* Opening a particular Email: “OPEN EMAIL 1”
* Reading the open Email: “READ MAIL” or “READ EMAIL” or “READ”
* Stop reading: “STOP”

### 3. Actions under currently opened email

* Forwarding the current email: “FORWARD”
* Replying to the current email: “REPLY”
* Stop reading: “STOP”
* To delete the last said input (not command): BACK BACK
* Go to Sent Message: “SENT”
* Go to Trash: “TRASH”
* Change the Voice of the speaker: “CHANGE VOICE”
* Change the Speed of the speaker: “CHANGE SPEED”



