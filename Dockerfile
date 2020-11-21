FROM olhaduto_base

COPY --chown=olhaduto . .

RUN . /opt/ros/foxy/setup.sh \
  && yarn

CMD /bin/bash -l -c "yarn start"
