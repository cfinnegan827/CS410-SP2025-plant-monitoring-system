import time
import network
import socket
import ure

# setup mode
# a function that simulates a startup procedure where the esp32 will act as an accesspoint
# for the user to connect to. Then they will go to the webpage the esp32 is serving where they will
# then enter the correct wifi ssid and password where the esp then reboots and tries to connect again.
def setup_mode():
    
    #put the esp into access point mode 
    ap = network.WLAN(network.AP_IF)
    ap.active(True)
    #set the ssid and password for the network the esp is transmitting
    ap.config(essid='Plant Monitor', password='Plant-Monitoring123', authmode=3)

    addr = socket.getaddrinfo('0.0.0.0', 80)[0][-1]
    s = socket.socket()
    s.bind(addr)
    s.listen(5)

    print('Access Point active')
    print('Network config:', ap.ifconfig())

    ssid = None
    password = None

    #simple html form that will be sued for the credentials to be inputed
    html = """\
<!DOCTYPE html>
<html>
  <head>
    <title>WiFi Setup</title>
  </head>
  <body>
    <h2>Enter WiFi Credentials</h2>
    <form action="/" method="GET">
      SSID: <input type="text" name="ssid"><br>
      Password: <input type="password" name="password"><br>
      <input type="submit" value="Submit">
    </form>
  </body>
</html>
"""

    while True:
        cl, addr = s.accept()
        #output the address of the webpage
        print("Client connected from", addr)
        req = cl.recv(1024).decode()
        print("Request:", req)

        # Look for the query string
        if "GET /?" in req:
            try:
                #search for the ssid and password for the user entered credentials
                match = ure.search(r'GET /\?ssid=([^&]*)&password=([^ ]+)', req)
                if match:
                    ssid = match.group(1).replace('+', ' ').replace('%20', ' ')
                    password = match.group(2).replace('+', ' ').replace('%21', ' ')
                    print("SSID:", ssid)
                    print("Password:", password)
                    cl.send("HTTP/1.1 200 OK\r\nContent-Type: text/html\r\n\r\n")
                    cl.sendall("<h1>Credentials Received</h1><p>You can now reboot the device.</p>")
                    cl.close()
                    break
            except Exception as e:
                print("Error parsing request:", e)

        # Serve the HTML form
        cl.send("HTTP/1.1 200 OK\r\nContent-Type: text/html\r\n\r\n")
        cl.sendall(html)
        cl.close()

    s.close()
    ap.active(False)
    #return the user credentials
    return ssid, password
