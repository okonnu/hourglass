import requests

def hcases(line):
    url = 'http://192.168.1.247/api/hourlycases/' + line
    x = requests.get(url)
    print('getting hourly for line'+ line)
    print('---------------')
    print(x.text)
    print('---------------')
    return (x.text)
    # return '{"data": [{"hr": 6,"line": "L6","cans": 4551,"cases": 189,"config_id": 2208},{"hr": 6,"line": "L6","cans": 4551,"cases": 189,"config_id": 2208}, {"hr": 7,"line": "L6","cans": 6020,"cases": 250,"config_id": 2208}]}'