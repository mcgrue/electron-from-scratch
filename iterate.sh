#!/usr/bin/bash

./kill_iteration.sh

echo "spawning new iteration."
echo "stdout > ./.out"
echo "stderr > ./.err"
echo "pid > ./.iterate_pidfile"
yarn iterate > .out 2> .err & echo $! > .iterate_pidfile