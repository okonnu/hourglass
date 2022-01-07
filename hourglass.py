import eel
from gtts import gTTS
from playsound import playsound
import random
import string
import os

eel.init('web')

def get_random_string(length):
    # choose from all lowercase letter
    letters = string.ascii_lowercase
    result_str = ''.join(random.choice(letters) for i in range(length))
    return result_str

@eel.expose
def txttospeech(txt):
    
    try:
        tts = gTTS(text=txt, lang='en', slow=False)
        voice_name ="voice.mp3"
        tts.save(voice_name)
        playsound(voice_name)
        os.remove(voice_name)
    except Exception as e:
        print(e)
        eel.texttospeech(txt)

# txttospeech('three minutes remaining')
eel.start('index.html', host='localhost', port=27011, size=(250,150), position=(0,0), cmdline_args=['--disable-infobars','--Kiosk'] )
