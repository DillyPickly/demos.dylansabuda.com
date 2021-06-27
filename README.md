# Side Project Demos

## The main components of this app

- Docker
- Apache web server with PHP
- MySQL database
- Python Bokeh server

## Deployment

### Build Docker Images

``` bash
docker build -t my-php -f ./dockerfiles/php/dockerfile .
```

``` bash
docker build -t my-python -f ./dockerfiles/python/dockerfile .
```

### Run Docker Containers

``` bash
docker-compose up -d
```

## Useful Commands

### Setting Up Python

Getting python environment from Conda (I still had to modify requirements.txt)

``` bash
pip list --format=freeze > requirements.txt # pip env
conda env export --from-history > environment.yml # conda env
```

Creating new environment

```bash
conda env create -f environment.yml
```

Running Bokeh Server

``` bash
conda activate bokeh
bokeh serve . --port 5100
```

Finding Bokeh Static files for Apache (in python)

``` python
print(bokeh.util.paths.bokehjsdir())
```

### Setting Up Apache Envirnment

Apache VirtualHost is located at `/etc/apache2/sites-available`. Copy this to a config file in project directory.

Apache configuration is located at `/etc/apache2/`.

### Docker daemon not running?
``` bash
systemctl start docker
```

### Check Apache mods running
``` bash
apache2ctl -M
```

### Make sure to change allows origins in Bokeh command
Look in container logs to diagnose problems.# demos.dylansabuda.com
