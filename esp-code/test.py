import temperature_reading as TR
import light_intensity as LI
import soil_moisture as SM
from send_data import send_data_db
import time
import network
import time
import Connect


def main():
    if Connect.connect_wifi():
        print("Device Connected Succesfully")
        while True:
            temp, humidity = TR.get_temp()
            light_intensity = LI.read_light()
            soil_moisture= SM.read_soil_moisture()
            unique_id = Connect.get_id()
            data = [unique_id, temp, humidity, light_intensity, soil_moisture]
            send_data_db(data)
            time.sleep(2)

main()

