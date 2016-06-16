#!/usr/bin/bash

# remove all migrations
find . -path "*/migrations/*.py*" -exec rm {} \;


./manage.py makemigrations jspsych
./manage.py makemigrations experiments
# ./manage.py makemigrations publications

./manage.py migrate



PASS="alis1212"
expect -c "
spawn python manage.py createsuperuser --username da352 --email da352@cam.ac.uk
expect \"Password: \"
send \"$PASS\r\"
expect \"Password \(again\): \"
send \"$PASS\r\"
expect eof
"
