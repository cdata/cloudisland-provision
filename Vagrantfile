# -*- mode: ruby -*-
# vi: set ft=ruby :

# Vagrantfile API/syntax version. Don't touch unless you know what you're doing!
VAGRANTFILE_API_VERSION = "2"

Vagrant.configure(VAGRANTFILE_API_VERSION) do |config|

  config.vm.provision "ansible" do |ansible|
    ansible.groups = {
      "gateway" => ["gateway"],
      "storage" => ["storage"],
      "factory" => ["factory"],
      "compute" => ["compute"]
    }
    ansible.extra_vars = {
      docker_secret: ENV['DOCKER_SECRET']
    }
    ansible.playbook = "playbook.yml"
  end

  config.vm.provider "virtualbox" do |vb|
    vb.customize ["modifyvm", :id, "--memory", "4096"]
    vb.customize ["modifyvm", :id, "--cpus", "4"]
    vb.customize ["modifyvm", :id, "--pae", "on"]
  end

  {
    "gateway" => ["cloudisland", "101"],
    "storage" => ["cumulo", "102"],
    "factory" => ["corymbus", "103"],
    "compute" => ["colossus", "104"]
  }.each do |type, net|
    hostname = net[0]
    ip = net[1]

    config.vm.define type do |instance|
      instance.vm.box = "ubuntu/trusty64"

      instance.vm.hostname = hostname
      instance.vm.network "private_network", ip: "172.17.42.#{ip}"
      if hostname == "colossus"
        instance.vm.network "forwarded_port", guest: 25565, host: 25565
      end
    end
  end

  # Someday, when CoreOS makes sense..
  #{
    ##"factory" => ["corymbus", "103"],
    #"compute" => ["colossus", "104"]
  #}.each do |group, net|
    #config.vm.define group do |core|
      #hostname = net[0]
      #ip = net[1]

      #core.vm.box = "coreos-beta"
      #core.vm.box_version = ">= 308.0.1"
      #core.vm.box_url = "http://beta.release.core-os.net/amd64-usr/current/coreos_production_vagrant.json"

      #core.vm.hostname = hostname
      #core.vm.network "private_network", ip: "172.17.42.#{ip}"

      #core.vm.provider "virtualbox" do |vb|
        #vb.check_guest_additions = false
        #vb.functional_vboxsf = false
      #end

      #if Vagrant.has_plugin?("vagrant-vbguest") then
        #core.vbguest.auto_update = false
      #end
    #end
  #end
end
