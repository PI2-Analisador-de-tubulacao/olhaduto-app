#!/bin/bash

source /opt/ros/foxy/setup.sh

PATH="${PATH}:$(yarn global bin)"
export PATH="${PATH}:${HOME}/node_modules/.bin"

exec "${@}"
