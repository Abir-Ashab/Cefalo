# Docker Registry

This article explores the Docker Registry—a central repository for storing and managing Docker images. Docker images serve as the foundation for containers; registries provide the source from which these images are pulled.

## Running a Simple Nginx Container

To run an Nginx container, use:

```sh
docker run nginx
```

Here, `nginx` is the repository name. By default, Docker interprets this as `library/nginx`, where `library` denotes official images on Docker Hub.

**Fully qualified image reference:**

```
docker.io/library/nginx
```

If you create your own images, your username or organization name will prefix the image name.

## Docker Hub and Other Registries

Docker uses [Docker Hub](https://hub.docker.com/) (`docker.io`) by default for pulling images. When you push or update an image, it is stored in the registry and can be pulled for deployments.

Other popular registries include:

- **Google Container Registry (GCR.io):** Hosts Kubernetes-related images.
- **AWS, Azure, GCP:** Offer private registry services for restricted access.

Private registries allow you to keep images secure and require valid credentials for access.

## Working with Private Registries

To use images from a private registry, log in first:

```sh
docker login private-registry.io
Username: registry-user
Password:
```

> **Note:** Your password will be stored unencrypted in `~/.docker/config.json`.

After logging in, run containers by specifying the registry in the image name:

```sh
docker run private-registry.io/a
```

If you do not log in, you may encounter errors indicating the image cannot be found.

**Example for cloud provider login:**

```sh
docker login private-registry.io
Username: registry-user
Password:
```

Then run an internal application:

```sh
docker run private-registry.io/apps/internal-app
```

## Setting Up a Custom On-Premises Docker Registry

For on-premises deployments, you can host your own Docker registry using the official `registry` image, which exposes its API on port 5000.

Start your registry:

```sh
docker run -d -p 5000:5000 --name registry registry:2
```

Tag your image to include the registry URL:

```sh
docker image tag my-image localhost:5000/my-image
```

Push the image to your local registry:

```sh
docker push localhost:5000/my-image
```

Pull the image from your registry:

```sh
docker pull localhost:5000/my-image
docker pull 192.168.56.100:5000/my-image
```

## Conclusion

Docker registries are essential for storing, sharing, and managing container images—whether using public registries like Docker Hub or setting up private registries for secure, internal use.