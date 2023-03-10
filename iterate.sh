#!/usr/bin/bash

if [ -f .iterate_pidfile ]; then
    echo "killing previous iteration..."
    kill $(cat .iterate_pidfile)
    rm .iterate_pidfile
else
    echo "pidfile '.iterate_pidfile' not present"
fi

echo "spawning new iteration."
echo "stdout > ./.out"
echo "stderr > ./.err"
echo "pid > ./.iterate_pidfile"
yarn iterate > .out 2> .err & echo $! > .iterate_pidfile
