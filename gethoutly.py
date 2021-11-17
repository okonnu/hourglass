import requests
url = 'http://192.168.1.247/hourlycases/L6'

x = requests.get(url)

print(x.text)