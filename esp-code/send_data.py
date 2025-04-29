import urequests
import json

def send_data_db(data):
    url = 'https://node_server'
    headers = {"Content-Type": "application/json"}
    response = urequests.post(url, headers=headers, data=json.dumps(data))
    print(response.status_code)
    print(response.text)
    response.close()
    return