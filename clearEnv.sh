#!/bin/bash

echo "Deleting following node_modules folders:"
find . -name 'node_modules' -type d -prune
find . -name 'node_modules' -type d -prune -exec rm -rf '{}' +

echo "Deleting dist folder inside shmi-webserver"

rm -rf ./shmi-webserver/public/*
