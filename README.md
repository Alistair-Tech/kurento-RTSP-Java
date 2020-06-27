# Kurento-WebRTC

The web application is capable of doing the following:
1. Receive an WebRTC media stream from a URI
2. Broadcast the media stream to multiple end users using WebRTC.
3. Ensure error handling in case of broken streams and add multiple streams
dynamically.
4. Allow the user to start or stop the incoming stream that is being displayed

I have managed to put the back-end in place. However, I am facing problems in getting my front-end working.

## Software dependencies

Kurento Media Server needs to be installed on the local computer for the application to work. Please visit the [installation guide](https://doc-kurento.readthedocs.io/en/6.10.0/user/installation.html) for further information.

## Steps to run the application

1. Clone the project to your local computer.
2. Go to the project folder.
3. Start the `coturn` and media servers.

      ```sudo service coturn start```
      
      ```sudo service kurento-media-server restart```

4. Start the application with the folowing command

      ```mvn -U clean spring-boot:run```
      
The application will start running on port 8080 in the localhost by default. Therefore, open the URL [https://localhost:8080/](https://localhost:8080/) in a WebRTC compliant browser
