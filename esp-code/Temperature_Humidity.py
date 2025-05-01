import dht
import time
import machine

#set the data pin to gpio 15(d15) on the esp
dht_pin = machine.Pin(15)
sensor = dht.DHT11(dht_pin)

def get_temp(time_sleep=2):
    sensor.measure()
    temp = sensor.temperature()
    hum = sensor.humidity()
    temp = c_to_f(temp)
    print("Temperature:", temp, "°F")
    print("Humidity:", hum, "%")
    time.sleep(time_sleep)
    return temp,hum

#small function to switch from fahrenheit to celcius
def f_to_c(temp: int):
    final_temp = (temp - 32) / 1.8
    return final_temp

#small function to switch from celcius to fahrenheit
def c_to_f(temp: int):
    final_temp = (temp * 1.8) +32
    return final_temp


