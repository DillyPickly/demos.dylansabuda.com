#!/bin/bash --login

# The --login ensures the bash configuration is loaded,
# enabling Conda.

set -euo pipefail
conda activate bokeh
bokeh serve . --port 5100 --allow-websocket-origin={'localhost','127.0.0.1:5100','localhost:5100'}
# nohup bokeh serve buffalo_sales --port 5100 --log-level=info --allow-websocket-origin='dylansabuda.com' &