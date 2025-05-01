from machine import ADC, Pin
import time

# Use GPIO 36
light_sensor = ADC(Pin(36)) 
#light_sensor.atten(ADC.ATTN_11DB)
light_sensor.width(ADC.WIDTH_12BIT)  

def read_light(time_sleep=2):
    light_val = light_sensor.read()
    print("Light intensity:", light_val)
    time.sleep(time_sleep)
    return light_val