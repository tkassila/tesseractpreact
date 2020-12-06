# tesseractpreact
Docker for Tika-Tesseract server install/run and (p)react fornt end (ui) for document (also orc) conversation to text

This project contains two tings: Dockerfile and install.sh files, which creates a docker image to run (ocrdocker.sh). When docker instance is running, start preact app in . location with comamand: preact watch . And use web address: http://localhost:8080 to start document conversation into text. Converted and showed text can be copyed into a clipboad.

Prerequirements

1. Install npm (like )
2. In project dir, give command: npm i 
3. Install preact-cli: npm i -g preact-cli (3.03 or later)
4. chmod + *.sh
5. Install docker

Docker image installation

1. Give command: docker build . --tag tika

Run

1. ./ocrdocker.sh (starts docker server)
2. To check that docker server is running: docker ps
2. In project location: preact watch (starts preact dev web app)
3. New page in browser and give a web address: htpp://localhost:8080
4. Convert documents into text by selecting files to convert
5. Press copy button to copy converted text into a clipboad for further handlling

Tuomas Kassila
