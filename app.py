import eel
from paho.mqtt import client as mqtt
import threading
import time
from getshift import getshift
import gethourly


eel.init('web')

def on_connect(client, userdata, flags, rc):  # The callback for when the client connects to the broker
    print("Connected with result code {0}".format(str(rc)))  # Print result of connection attempt
    client.subscribe("test")  # Subscribe to the topic “digitest/test1”, receive any messages published on it


def on_message(client, userdata, msg):  # The callback for when a PUBLISH message is received from the server.
    # print("Message received-> " + msg.topic + " " + str(msg.payload))  # Print a received msg
    eel.set_metrics(str(msg.payload))
    

client = mqtt.Client("l6l5")  # Create instance of client with client ID “digi_mqtt_test”
client.on_connect = on_connect  # Define callback function for successful connection
client.on_message = on_message  # Define callback function for receipt of a message
username = 'dmkl'
password = 'delmo'
client.username_pw_set(username, password)
client.connect('192.168.1.247', 1883, 60)
client.loop_start()  #Start loop

# {"clientID":"L1","cans":"0","packs":"0","lcases":"0","cases":"0","lspeed":"0","tstamp":"13917942","targetcases":"240","canspercase":"24","unitspercase":"1","hr_output":"0,0,0,0,0,0,0,0,0"}

@eel.expose
def set_pyconfigs(jclient_id, jteam, jcanspercase, jtarget):
    client_id = jclient_id
    team = jteam
    shift = getshift()
    eel.set_jsconfigs(client_id, team, shift)
    
@eel.expose
def get_hcases(l, r):
    threading.Timer(60 * 15, sendcans).start()
    lcase = hcases(l)
    eel.hcases_left(lcase)
    time.sleep(5)
    rcase = hcases(r)
    eel.hcases_right(rcase)
    
    
   

eel.start('index.html', host='localhost', port=27011, size=(1280, 960), position=(0,0), cmdline_args=['--disable-web-security --user-data-dir="/home/pi"'] )
