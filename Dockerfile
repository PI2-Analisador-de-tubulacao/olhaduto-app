FROM olhaduto_base

COPY --chown=olhaduto . .

RUN . /opt/ros/foxy/setup.sh \
  && yarn --network-timeout 1000000000

CMD /bin/bash -l -c "yarn start"
