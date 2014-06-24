#!/bin/sh

cd {{ minecraft_root }}/world_volume
ln -fs ../mods mods
java -Xmx1024M -Xms1024M -jar {{ minecraft_root }}/forge-{{ minecraft_forge_version }}-universal.jar
