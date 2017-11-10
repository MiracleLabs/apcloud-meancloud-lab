# NodeJSCloudantCRUDApp

This application uses to demonstrate the operations of Create, Retrieve, Update and Delete into Cloudant database using NodeJS runtime. 

## Technologies Involved

* Server Side - NodeJS 
* Client Side Technologies (HTML,CSS, Bootstrap)
* Database - IBM Cloudant

## Prerequisties 

* If you have not already, download node.js and install it on your local machine. 
	- NodeJS Installation - https://nodejs.org/en/
* Create an IBM Bluemix account - https://console.bluemix.net/
* Create an IBM Cloudant account - https://cloudant.com/sign-up/

## Running the app locally

* Clone the application from the repository 
* cd into the project folder and if required by any modules, run
```
		npm install
```		
* Start the application by typing
```
		node app.js
```		
* When the application executes, the first line will say:
```
		http://localhost:<port_number>
```		
Paste this URL in the browser to open the application.

## Running the app on Bluemix
* Download and install Cloud Foundry CLI to be used on the terminal.
* Open the command prompt where the application exists
* On the Terminal, Connect to Bluemix using the CF CLI and follow the prompts to log in. 
* Once you're in the same space as the app,
```
    cf api https://api.ng.bluemix.net
    cf login
```
* Create the manifest.yml file and change the <Unique_Name> parameter to something unique.
```
    applications:
    - path: .
    name: <Unique_Name>
    host: <Unique_Name>
    framework: node
    memory:256M
    instances: 1
    services:
    - <service-name>
```  

## Troubleshooting

To troubleshoot your Bluemix app the main useful source of information are the logs, to see them, run:

  ```
  $ cf logs <application-name> --recent
  ```
## Repository Contents

This repository contains the completed application files for the tutorial and are intended to assist with the training videos prepared for MEANHack '16.

## Lab Contributors

The following people have contributed to the development and delivery of this lab. This Lab is created and owned by the Miracle Innovation Labs Team.

* Manasa Sutapalli - Lead Researcher IoT/Cloud Apps
* Venkatesh Voona  - Lead Researcher NextGen
* Chanakya Lokam   - Director Innovation
* Aditya Chinni    - Lead Innovation