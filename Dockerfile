FROM ros:foxy-ros-base

env DEBIAN_FRONTEND noninteractive

RUN apt update -y \
    && apt install -y \
        nodejs \
        npm \
        chromium-browser \
        libnss3 \
        libxss1 \
        libgdk-pixbuf2.0-0 \
        libgtk-3-0 \
        libasound2 \
    && useradd -m -s /bin/bash -p olhaduto olhaduto \
    && npm install -g yarn@1.22.5 \
    && apt clean \
    && rm -rf /var/lib/apt/lists/*

WORKDIR /home/olhaduto
