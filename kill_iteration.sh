#!/usr/bin/bash

if [ -f .iterate_pidfile ]; then
    echo "killing previous iteration..."
    echo "Ashaman... KILL!"
    kill $(cat .iterate_pidfile)
    rm .iterate_pidfile
else
    echo "pidfile '.iterate_pidfile' not present"
fi