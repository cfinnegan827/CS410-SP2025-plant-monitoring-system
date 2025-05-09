import urequests
import json

# send data  to database
#  a function that takes the users data from the sensor in dictionary format
# and converts the data to json which is then sent to mongodb
# using the url for the server, on local machine it is the machine ip
# and prints the status code.
def send_data_db(data):
    url = f"http://172.22.169.21:5001/device/devices/data"
    headers = {"Content-Type": "application/json"}
    response = urequests.post(url, headers=headers, data=json.dumps(data))
    print(response.status_code)
    print(response.text)
    response.close()
    return
