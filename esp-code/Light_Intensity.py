from machine import ADC, Pin
import time

# Use GPIO 36 for the adc pin
light_sensor = ADC(Pin(36)) 
#light_sensor.atten(ADC.ATTN_11DB)
light_sensor.width(ADC.WIDTH_12BIT)  

# Read_light
# a function that reads the value measured from the lgiht sensor
# and returns the light value and then sleep for X seconds(default 2 seconds)
def read_light(time_sleep=2):
    light_val = light_sensor.read()
    print("Light intensity:", light_val)
    time.sleep(time_sleep)
    return light_val