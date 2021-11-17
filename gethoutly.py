import requests
url = 'http://192.168.1.247/hourlycases/l6'
myobj = {'somekey': 'somevalue'}

x = requests.get(url)

print(x)