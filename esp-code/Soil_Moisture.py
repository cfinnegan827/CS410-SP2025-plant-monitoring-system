from machine import ADC, Pin
import time

# Set up ADC on GPIO 34
soil_sensor = ADC(Pin(34))
soil_sensor.atten(ADC.ATTN_11DB)  # Full range: 0 - 3.3V


def read_soil_moisture(time_sleep=2):
    soil_moist = soil_sensor.read()  # Range: 0 - 4095
    moisture_percent = 100 - (soil_moist / 4095 * 100)  
    
    print("Raw ADC:", soil_moist)
    print("Estimated Moisture: {:.1f}%".format(moisture_percent))
    
    time.sleep(time_sleep)
    return soil_moist

