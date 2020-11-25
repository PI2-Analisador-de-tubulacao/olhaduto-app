#!/bin/sh

. /opt/ros/foxy/setup.sh

/opt/ros2-web-bridge/bin/rosbridge.js &

exec "${@}"
