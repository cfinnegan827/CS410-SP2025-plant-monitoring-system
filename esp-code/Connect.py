import network
import time
import Setup
import machine



def write_credentials(ssid, password):
    with open("wifi.txt", "w") as file:
        file.write(f"{ssid}\n")
        file.write(f"{password}")
    print("File contents:")
    file.close()
    return





def get_credentials():
    '''
    Get credentials reads the credentials from a file wifi.txt
    
    returns the ssid and password for the wifi the product connects too
    '''
    with open('wifi.txt', 'r') as file:
        ssid = file.readline().rstrip("\n").rstrip()
        password = file.readline().rstrip("\n").rstrip()
    file.close()
    return ssid,password




def connect_wifi():
    '''
    Attempts to connect the product to wifi given the credentials read in
    from wifi.txt. If the product can not connect to wifi the product enters setup
    mode
    '''
    ssid,password = get_credentials()
    
    # Create a station interface
    sta = network.WLAN(network.STA_IF)
    sta.active(True)

    # Connect to your Wi-Fi network (WPA/WPA2 works here)
    sta.connect(ssid, password)

    # Wait for connection
    timeout = 10
    for _ in range(timeout):
        if sta.isconnected():
            break
        print("Connecting...")
        time.sleep(1)
        
    if sta.isconnected():
        print('connected')
        return True
    else:
        print("Failed to connect.")
        ssid, password = Setup.setup_mode()
        print('ssis: ', ssid)
        print('password: ', password)
        write_credentials(ssid, password)
        time.sleep(2)
        machine.reset()
        

    

