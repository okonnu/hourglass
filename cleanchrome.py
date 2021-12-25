import subprocess

def cleanchrome():
    bashCommand = 'sed -i \'s/"exited_cleanly":false/"exited_cleanly":true/\' ~/.config/chromium/Default/Preferences;sed -i \'s/"exit_type": "Crashed"/"exit_type": "Normal"/\' ~/.config/chromium/Default/Preferences'
    process = subprocess.Popen(bashCommand.split(), stdout=subprocess.PIPE)
    output, error = process.communicate()
    
cleanchrome()