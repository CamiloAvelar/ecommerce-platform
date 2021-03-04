FROM node:14.16-alpine as dev

ENV PATH="/application/node_modules/.bin:${PATH}"
RUN apk add bash sudo
RUN echo "node ALL=(ALL) NOPASSWD:ALL" > /etc/sudoers.d/node && chmod 0440 /etc/sudoers.d/node

CMD cd "/application" && \
    npm install && \
    if [ "$WATCH_FILES" == "1" ]; then npm start; else npm start; fi