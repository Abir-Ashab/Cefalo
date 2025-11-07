# Docker Basics

This document provides a brief overview of Docker, a popular platform for developing, shipping, and running applications in containers. Containers allow developers to package an application with all its dependencies into a standardized unit for software development.

## What is Docker?

Docker is an open-source platform that automates the deployment of applications inside lightweight, portable containers.

## Basic Docker Commands

Here are some common Docker commands:

### Run commands

- `docker run <image>`: Create and start a container. If the image is not available locally, Docker will pull it from the Docker Hub. To pull a specific image, use `docker pull <image>`. Then run it with `docker run <image>`.
- `docker run -i <image> /bin/bash`: Start a container in interactive mode. For example, you can run `docker run -i ubuntu /bin/bash` to start an Ubuntu container and get a bash shell. However, this won't show the bash prompt unless you add `-t` to allocate a pseudo-TTY.
- `docker run -it <image> /bin/bash`: Start a container in interactive mode with a terminal session. For example you ran `docker run -i ubuntu /bin/bash`, it won't show the bash prompt, you need to add `-t` to allocate a pseudo-TTY. Here `-i` stands for interactive, and `-t` allocates a terminal.Here interactive modes mean you can interact with the container's shell.
- `docker run -d <image>`: Run a container in detached mode (in the background).
- `docker exec -it <container id/name> /bin/bash`: Access a running container's shell.

### Manage containers and images

- `docker ps`: List running containers.
- `docker ps -a`: List all containers (running and stopped).
- `docker stop <container id/name>`: Stop a running container.
- `docker rm <container id/name>`: Remove a stopped container.
- `docker images`: List available images.
- `docker rmi <image>`: Remove an image.

### Inspect and logs

- `docker inspect <container id/name>`: View detailed information about a container. (get container id by `docker ps`)
- `docker logs <container id/name>`: View logs of a container.

### Accessing a Container From the Host and Browser

To access a running container from the host machine or a web browser, you need to map the container's ports to the host's ports. This is done using the `-p` option when you run the container.

For example, to run a web server in a container and access it from your host machine, you can use the following command:

```bash
docker run -d -p 8080:8080 <image>
```

In this example, the container's port 8080 (the default port) is mapped to the host's port 8080. You can then access the web server by navigating to `http://localhost:8080` in your web browser.
