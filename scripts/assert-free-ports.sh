#!/bin/bash

lsof -i :3000 > /dev/null && echo 'Refusing to run because port 3000 is already in use' && exit 0
lsof -i :3883 > /dev/null && echo 'Refusing to run because port 3883 is already in use' && exit 0