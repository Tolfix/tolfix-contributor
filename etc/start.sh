#!/bin/bash

# Start nginx
nginx
# Start backend
node /backend/build/Main.js

exec "$@"