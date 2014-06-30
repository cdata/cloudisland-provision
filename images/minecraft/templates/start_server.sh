#!/bin/sh

cd {{ minecraft_root }}/volume
ln -fs {{ minecraft_root }}/eula.txt
java -Xmx1024M -Xms1024M -jar {{ minecraft_root }}/minecraft_server.{{ minecraft_version }}.jar
