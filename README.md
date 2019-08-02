# Troubleshooting

You can all needed information from [8thWall console](https://console.8thwall.com/web)

* If you are creating new app:  
  * Click "Create a new Web App" in a console  
  * Enter Application Name and click "Create"

* If you need to change App Key
  * Select needed project 
  * Copy My App Key from 8thWall console
  * Paste it into `imagetarget/index.html` file (There will be line "Replace the app key here with your own app key")

* If you moved to different domain
  * Select needed project 
  * Click "Connect an allowed origin" 
  * Paste needed domain name
  * Click "Plus icon"

* If you need to add or replace marker
  * Click "Add an image target" or "Manage image targets"
  * Upload an image (it should be at aspect 3:4 and had resolution minimum 480x640)
  * Add metadata in JSON format (for example `{ "id": "castel" }`)
  * This id should be used in `imagetarget/index.html` file

# How to run in a Docker

Firstly you will need to generate ssl certificate for https (8thWall will not work through http)  
Then expected that you'll have certificates in folder `/etc/letsencrypt/live/[yourdomain]`

To build docker image:  
1. Open folder with project  
2. `docker build -t wine-vr .`  

To run docker image on https port (443):  
You can use next command after you built docker image.
`docker run --rm -it -p 443:8080 -v "/etc/letsencrypt:/etc/letsencrypt" wine-vr`  
