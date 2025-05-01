import urequests
import json

def send_data_db(data):
    url = f"https://node_server/environment/{env_id}/readings"
    headers = {"Content-Type": "application/json"}
    response = urequests.post(url, headers=headers, data=json.dumps(data))
    print(response.status_code)
    print(response.text)
    response.close()
    return
