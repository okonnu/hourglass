import eel
from gtts import gTTS
from playsound import playsound

eel.init('web')
@eel.expose
def txttospeech(txt,indx):
    tts = gTTS(text=txt, lang='en', slow=False)
    tts.save(str(indx)+"voice.mp3")
    playsound(str(indx)+"voice.mp3")

# txttospeech('three minutes remaining')
eel.start('index.html', host='localhost', port=27011, size=(250,150), position=(0,0), cmdline_args=['--disable-infobars','--Kiosk'] )
