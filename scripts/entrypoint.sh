#!/bin/sh

. /opt/ros/foxy/setup.sh

ros2-web-bridge/bin/rosbridge.js &

exec "${@}"
