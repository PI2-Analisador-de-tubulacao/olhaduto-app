#!/bin/bash

source ~/.profile

PATH="${PATH}:$(yarn global bin)"
export PATH="${PATH}:${HOME}/node_modules/.bin"

exec "${@}"
