#!/bin/bash

# The --login ensures the bash configuration is loaded,
# enabling Conda.

a2enmod proxy
a2enmod proxy_http
a2enmod proxy_balancer
a2enmod lbmethod_byrequests

systemctl restart apache2