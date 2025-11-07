
# **A Journey Through the OSI Layers: How our Data Travels from Device to Server**

Imagine Alex wants to visit `example.com` from his PC, which is connected via a mobile hotspot(Grameenphone SIM) or wifi / ethernet. Alex clicks “submit” on a form, sending the request. What actually happens under the hood? Let’s follow the journey, layer by layer, from the browser to the server and back.

---

## **Layer 7: Application Layer – Preparing the Request**


The browser, acting as a user agent, creates the POST request. For example:

```bash
POST /login HTTP/1.1
Host: example.com
User-Agent: Mozilla/5.0
Content-Type: application/x-www-form-urlencoded
```

At this stage, the request is just data in memory. It is not yet tied to any specific network medium—whether you are connected via mobile data, Wi-Fi, or Ethernet, the process is the same.

---

## **Layer 6: Presentation Layer – Encryption & Formatting**


Because the site uses HTTPS, the browser encrypts the request using TLS. This encryption ensures that anyone intercepting the request—even towers, routers, or switches—cannot read the content. This process is identical for mobile data, Wi-Fi, and Ethernet. Sometimes, optional compression also happens at this layer, regardless of the network type.

---

## **Layer 5: Session Layer – Managing the Connection**


At this point, after the data is encrypted and formatted by the presentation layer, the session layer does not perform any active role yet because the connection has not been established. This is true for all network types: mobile data, Wi-Fi, and Ethernet. The session layer's main job begins only after the lower layers have established the connection and encryption. Once the connection (TCP handshake) and encryption (TLS handshake) are in place, the session layer manages the ongoing session between our browser and the server—tracking things like login states, cookies, and session tokens during the communication, no matter which network you use.

---

## **Layer 4: Transport Layer – Segmenting Data**


The encrypted request is split into TCP segments. TCP adds a port number (443 for HTTPS, 80 for HTTP) and ensures reliable, ordered delivery with error checking. This segmentation and reliability process is the same for mobile data, Wi-Fi, and Ethernet.

---

## **Layer 3: Network Layer – Adding IP Addresses**


TCP segments are wrapped in IP packets. The source IP and routing details depend on our network:
- On mobile data, our phone’s public IP (assigned by our mobile provider) is used.
- On Wi-Fi, our router’s public IP (assigned by our ISP) is used, and our device has a local IP.
- On Ethernet, the process is similar to Wi-Fi, with the router or switch assigning local IPs and using the public IP for internet routing.

In all cases, routers use these IPs to forward the packets toward the destination server in Norway.

---

## **Layer 2: Data Link Layer – Local Frames**

Our PC converts IP packets into frames for the local network. Here’s what happens for each network type:
- For mobile data: frames are sent from our device to our phone’s modem, which acts as a router to the mobile network.
- For Wi-Fi: frames contain our PC’s MAC address and the Wi-Fi router’s MAC address.
- For Ethernet: frames contain our PC’s NIC (Network Interface Card) MAC address and the router’s or switch’s MAC address.

Each method ensures the data is properly addressed for the local segment before being sent onward.

---

## **Layer 1: Physical Layer – Signals in Motion**

Now the bits become physical signals to travel across the air or wires. Here’s how it works for each network type:

- For mobile data: inside our phone’s antenna, electrons are pushed back and forth, creating an oscillating electric field. This field generates a magnetic field, and together they form an electromagnetic wave moving at the speed of light. The phone creates a carrier wave at a fixed frequency and modulates it to transmit data. Modern LTE/5G uses QAM (Quadrature Amplitude Modulation) to encode multiple bits per wave symbol. A DAC (Digital-to-Analog Converter) in our phone’s radio/modem chip turns binary bits into an electrical signal, which the antenna converts into radio waves.
- For Wi-Fi: similar modulation is used, usually at 2.4 GHz or 5 GHz. The PC or phone’s Wi-Fi chip converts bits into radio waves, and the router antenna receives the wave, demodulates it into bits, and forwards it.
- For Ethernet: bits are sent as voltage changes in twisted-pair copper cables, and NICs convert bits to voltages and back.
Each method physically transmits the data to the next device in the path.

## Beyond the OSI Layers: The Real-World Journey

Once the data leaves our device, the nearest Grameenphone tower receives the radio wave. The tower uses ADCs (Analog-to-Digital Converters) to convert the incoming analog radio signal back into digital bits so the core network can route them. The tower cannot read encrypted content; it only forwards bits. These bits are sent via fiber or microwave links to Grameenphone’s core network, which handles routing, IP management, authentication, and forwarding our packets to the global internet.

Across the internet backbone, packets travel through multiple routers, switches, and undersea fiber cables. Each router reads the destination IP and forwards the packet to the next hop. This process repeats until the packets reach the server in Norway. Throughout the journey, packets remain encrypted; only the destination server can decrypt them.

On the server side, the server receives TCP packets and reassembles them. TLS decrypts the content, and the server reads our POST data and processes it. The server then prepares an HTTP response, encrypts it, and sends it back.

The response travels back through the internet backbone, Grameenphone core network, tower, phone, and finally to our PC. The physical layer converts waves back into bits, and the browser decrypts and reassembles the response.

Finally, the browser parses the HTML, requests images, CSS, and JavaScript, and displays the page on Alex’s screen.