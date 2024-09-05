#!/bin/bash

SECURE_PASSWORD="SuperAdmin@123"

if [[ "$SECURE_PASSWORD" == "$1" ]]; then
    echo "true"
else
    echo "false"
fi
