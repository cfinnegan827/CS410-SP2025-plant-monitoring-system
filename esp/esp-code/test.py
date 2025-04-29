import Temperature_Humidity as TR
import Light_Intensity as LI
import Soil_Moisture as SM
import time
import network
import time
import Connect


def main():
    if Connect.connect_wifi():
        print("Main program start here!")
        while True:
            TR.get_temp()
            LI.read_light()
            SM.read_soil_moisture()
            time.sleep(2)

main()
