    
import paho.mqtt.client as mqtt # mosquitto.py is deprecated
import time
import random

cans1 = 0
cans2 = 0
mqttc = mqtt.Client("ioana")
mqttc.connect("127.0.0.1", 1883, 60)
#mqttc.subscribe("test/", 2) # <- pointless unless you include a subscribe callback
mqttc.loop_start()
while True:
    lspeed1 = random.randint(1, 5)
    lspeed2 = random.randint(1, 5)
    cans1 = cans1 + lspeed1
    cans2 = cans2 + lspeed2
    payload1 = '{"clientID":"l6","cans":"'+str(cans1)+'","packs":"0","lcases":"'+str(lspeed1)+'","cases":"0","lspeed":"'+str(lspeed1)+'","tstamp":"13917942","targetcases":"240","canspercase":"24","unitspercase":"1","hr_output":"0,0,0,0,0,0,0,0,0"}'
    mqttc.publish("test",payload1)
    payload2 = '{"clientID":"l5","cans":"'+str(cans2)+'","packs":"0","lcases":"'+str(lspeed2)+'","cases":"0","lspeed":"'+str(lspeed2)+'","tstamp":"13917942","targetcases":"240","canspercase":"24","unitspercase":"1","hr_output":"0,0,0,0,0,0,0,0,0"}'
    mqttc.publish("test",payload2)
   
    time.sleep(1)# sleep for 10 seconds before next call
