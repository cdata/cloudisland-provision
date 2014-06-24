#!/bin/sh

cd {{ minecraft_root }}/world_volume
java -Xmx1024M -Xms1024M -jar {{ minecraft_root }}/minecraft_server.{{ minecraft_version }}.jar
