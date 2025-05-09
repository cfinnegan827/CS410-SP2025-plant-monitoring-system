import network
import time
import Setup
import machine


# writes the users ssid and password to wifi.txt
def write_credentials(ssid, password):
    with open("wifi.txt", "w") as file:
        file.write(f"{ssid}\n")
        file.write(f"{password}")
    print("File contents:")
    file.close()
    return

# write the unique id to the unique_id.txt file which in this case
# is the users email
def write_id(unique_id):
    with open("unique_id.txt", "w") as file:
        file.write(f"{unique_id}\n")
    print("File contents:")
    file.close()
    return

# get credentials gets the credentials from wifi.txt
# and returns the ssid and password
def get_credentials():
    with open('wifi.txt', 'r') as file:
        ssid = file.readline().rstrip("\n").rstrip()
        password = file.readline().rstrip("\n").rstrip()
    file.close()
    return ssid,password

# gets the unique id from unique_id.txt which is the email of the user
# and returns the unique id
def get_id():
    with open('unique_id.txt', 'r') as file:
        unique_id = file.readline().rstrip("\n").rstrip()
    file.close()
    return unique_id



# Attempts to connect the product to wifi given the credentials read in
# from wifi.txt. If the product can not connect to wifi the product enters setup
# mode
def connect_wifi():
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
        

    

