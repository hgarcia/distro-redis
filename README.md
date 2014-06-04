# "Distro-redis" the Redis transport for Distro

[![Build Status](https://travis-ci.org/hgarcia/distro-redis.png?branch=master)](https://travis-ci.org/hgarcia/distro-redis)

### UPDATES

0.1.0 Initial release

### What's distro?

The distro module is intended to simplify the way services communicate with each other. It abstracts several different transports while providing a consistent interface. It also specifies a message format and comes with some helper factories to create and parse those messages.

It comes with some pre-packaged trasports for udp4 and udp6, tcp and redis (using pub-sub).
You can easily create your own transports as plug-ins (more details below).
Note that there is not inter-operability between transports. Both clients and servers have to use the same transport to be able to talk to each other.


### Install

Simple do `npm install distro distro-redis`

### Usage

Pass the distro-redis module to distro when creating a new server or client


    var distro = require('distro');
    var redis = require('distro-redis');

    var factory = distro.create(redis);


For up to date documentation on distro please visit the distro repository [Distro](https://github.com/hgarcia/distro)