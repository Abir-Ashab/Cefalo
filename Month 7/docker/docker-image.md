# Docker Images and Dockerfile

A Dockerfile is a plain text file defining a series of instructions and arguments that Docker interprets to create an image.

## Creating a Simple Flask Application Image

### Step 1: Create the Flask Application (app.py)

```python
import os
from flask import Flask
app = Flask(__name__)

@app.route("/")
def main():
    return "Welcome!"

@app.route('/how are you')
def hello():
    return 'I am good, how about you?'

if __name__ == "__main__":
    app.run(host='0.0.0.0', port=5000)
```

### Step 2: Create the Dockerfile

```Dockerfile
FROM ubuntu

RUN apt-get update 
RUN apt-get install -y python3 python3-pip
RUN pip3 install flask --break-system-packages

COPY app.py /opt/app.py

ENTRYPOINT ["sh", "-c", "FLASK_APP=/opt/app.py flask run --host=0.0.0.0"]
```

**Important Notes:**

- Use `python3` and `pip3` instead of deprecated `python` and `python-pip`
- Add `--break-system-packages` flag to bypass externally-managed-environment error
- Set `host='0.0.0.0'` to allow connections from outside the container

### Understanding the Dockerfile structure

The structure (layered) of a Dockerfile is as follows:

![alt text](image.png)

- `FROM`: Sets the base image—in this case, Ubuntu. Every Dockerfile begins with a FROM instruction referencing an existing image on Docker Hub.
- `RUN`: Executes commands in the container. In the Dockerfile, the first RUN command updates the package lists and installs necessary packages. Combining commands with && minimizes the image layers.
- `COPY`: Transfers files from your local system into the image. Here, it copies the source code to /opt/source-code.
- `ENTRYPOINT`: Specifies the command that runs when the container starts. In this example, it sets the environment variable FLASK_APP and starts the Flask web server.

## Building and Running the Docker Image

### Step 3: Build the Docker Image

**Important:** Always build Docker images from your host machine, NOT from inside a Docker container!

Navigate to your project directory containing the Dockerfile:

```bash
cd "C:\Cefalo Days\Month 7\docker\create-an-img"
```

Build the image with a tag:

```bash
docker build -t my-flask-app .
```

Alternative commands:
- If directory contains only this Dockerfile: `docker build .`
- From different directory: `docker build -t <image_name> -f /path/to/Dockerfile .`

The `.` indicates the current directory containing the Dockerfile.

### Step 4: Run the Docker Container

For a web application, map the ports:

```bash
docker run -p 5000:5000 my-flask-app
```

For background execution:

```bash
docker run -d -p 5000:5000 my-flask-app
```

Your Flask app will be accessible at:
- http://localhost:5000 - Shows "Welcome!"
- http://localhost:5000/how%20are%20you - Shows "I am good, how about you?"

### Step 5: View Your Images

```bash
docker images
```

## Pushing the Image to Docker Hub

Sharing your application on Docker Hub is simple. Follow these steps:

Tag your image using your Docker Hub username (e.g., if your username is niloy):

```bash
docker build . -t niloy/<image_name>
```

Log in to Docker Hub:

```bash
docker login
```

Enter your username and password when prompted. You can get your Docker Hub credentials from [Docker Hub](https://hub.docker.com/).

Push the image to Docker Hub:

```bash
docker push niloy/<image_name>
```

If you encounter an error like **“requested access to the resource is denied,”** ensure that you have tagged your image with your Docker Hub account name and that you are logged in.

Upon a successful push, your image will be available in your Docker Hub repository. You can view it on your Docker Hub dashboard.

## Docker environment variables

You can set environment variables in your Dockerfile using the `ENV` instruction. For example:

```Dockerfile
ENV FLASK_ENV=development
```

This sets the `FLASK_ENV` variable to `development`, which can be useful for configuring your Flask application.

## Complete Example Process

Here's the complete step-by-step process we followed:

1. **Created Flask app** (`app.py`) with proper host configuration
2. **Fixed Dockerfile** with modern Python3 and pip3 commands
3. **Built image** from Windows host: `docker build -t my-flask-app .`
4. **Ran container** with port mapping: `docker run -p 5000:5000 my-flask-app`
5. **Tested application** at <http://localhost:5000>