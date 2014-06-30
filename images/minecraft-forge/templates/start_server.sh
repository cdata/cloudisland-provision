#!/bin/sh

set -x

minecraft_forge_version={{ minecraft_forge_version }}
minecraft_root={{ minecraft_root }}
volume_root=$minecraft_root/volume
world_root=$minecraft_root/volume/world

tar -c $minecraft_root/mods/*.jar > $volume_root/mods.tar
cp $minecraft_root/mod-manifest.json $volume_root/mod-manifest.json

mkdir -p $world_root
ln -fs $minecraft_root/mods $world_root/mods
ln -fs $minecraft_root/eula.txt $world_root/eula.txt

cd $world_root

java -Xmx1024M -Xms1024M -jar $minecraft_root/forge-$minecraft_forge_version-universal.jar

set +x
