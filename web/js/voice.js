var init = function() {
    //init checks speechsynthesis capability and sets available voices
    if (window.speechSynthesis) {
        if ("onvoiceschanged" in speechSynthesis) {
            speechSynthesis.onvoiceschanged = setVoices;
        } else {
            setVoices();
        }
    }
};

var play = function() {
    var self = this;
    this.disabled = true;
    let voices = speechSynthesis.getVoices();
    let speech = new SpeechSynthesisUtterance();
    let selectedVoice = document.getElementById("voiceSelect");
    let tts = document.getElementById("textToSpeech");
    speech.text = tts.value;
    speech.voice = voices[selectedVoice.value];
    speechSynthesis.speak(speech);
    speech.onend = function() {
        self.disabled = false;
    };
};

// get voices, populate them on the select tag
var setVoices = function() {
    let voices = speechSynthesis.getVoices();
    let voicesSelect = document.getElementById("voiceSelect");
    for (let index in voices) {
        let option = document.createElement("OPTION");
        option.value = index;
        console.log(index)
        option.innerHTML = voices[index].name;
        voicesSelect.appendChild(option);
    }
};

//initialize on window load
window.onload = function() {
    init();
};