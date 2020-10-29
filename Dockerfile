FROM ubuntu:20.04

env DEBIAN_FRONTEND noninteractive

RUN apt update -y \
    && apt install -y \
        nodejs \
        yarnpkg \
        npm \
        chromium-browser \
        libnss3 \
        libxss1 \
        npm \
        libgdk-pixbuf2.0-0 \
        libgtk-3-0 \
        libasound2 \
    && useradd -m -s /bin/bash -p olhaduto olhaduto

WORKDIR /home/olhaduto
