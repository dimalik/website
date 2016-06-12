#!/bin/bash

PASS="alis1212"
expect -c "
spawn python manage.py createsuperuser --username da352 --email da352@cam.ac.uk
expect \"Password: \"
send \"$PASS\r\"
expect \"Password \(again\): \"
send \"$PASS\r\"
"
