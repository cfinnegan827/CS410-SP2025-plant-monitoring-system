import Temperature_Humidity as TR
import Light_Intensity as LI
import Soil_Moisture as SM
from send_data import send_data_db
import time
import network
import time
import Connect


# main
# the main function for the entire esp system. 
# checs if users are connnected to the wifi and if they are then the sensors start collecting data
# then they send the data to the send data function and then the process sleeps for 5 minutes
def main():
    if Connect.connect_wifi():
        print("Main program start here!")
        while True:
            temp, humidity = TR.get_temp()
            light_intensity = LI.read_light()
            soil_moisture= SM.read_soil_moisture()
            data = [temp, humidity, light_intensity, soil_moisture]
            send_data_db(data)
            time.sleep(300)

main()

