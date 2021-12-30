#!/bin/sh   
sed -i 's/"exited_cleanly":false/"exited_cleanly":true/' /home/pi/.config/chromium/Default/Preferences
sed -i 's/"exit_type": "Crashed"/"exit_type": "Normal"/' /home/pi/.config/chromium/Default/Preferences
echo "cleaned chromium error reports"