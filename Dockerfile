FROM java:8
#FROM logicalspark/docker-tikaserver
#FROM apache/tika:1.25-full
MAINTAINER Tuomas Kassila <tuomas.kassila@gmail.com>

RUN mkdir /setup
ADD install.sh /setup/install.sh
ADD tika-server-1.25.jar /srv/tika-server-1.25.jar
RUN /setup/install.sh
#http://localhost:8080
ENTRYPOINT java -jar /srv/tika-server-1.25.jar -host 0.0.0.0 --cors http://localhost:8080 
#--cors "all"

EXPOSE 9998