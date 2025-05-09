from machine import ADC, Pin
import time

# Set up ADC on GPIO 34
soil_sensor = ADC(Pin(34))
soil_sensor.atten(ADC.ATTN_11DB)  # Full range: 0 - 3.3V


# Read Soil Moisture
# a function that reads in the value of soil moisture( ranged 0-4095)
# then computes the percentage of soil moisture and return the percentage val
# and sleeps for 2 seconds
def read_soil_moisture(time_sleep=2):
    soil_moist = soil_sensor.read()  # Range: 0 - 4095

    #computes the percetnage of osil mositure with basic percentage formula
    moisture_percent = 100 - (soil_moist / 4095 * 100)  
    
    print("Raw ADC:", soil_moist)
    print("Estimated Moisture: {:.1f}%".format(moisture_percent))
    
    time.sleep(time_sleep)
    return moisture_percent

