# Docker

## Instance list

```
docker ps
```

## Show logs of an instance

```
docker logs -f INSTANCE_NAME
```

When only one instance on the machine

```
docker logs -f $(docker ps -q)
```

## Get bash on instance

```
docker exec -it INSTANCE_NAME bash
```

When only one instance on the machine

```
docker exec -it $(docker ps -q) bash
```

## Run an instance

```
docker run DOCKER_NAME
```

### As detach

```
docker run -d DOCKER_NAME
```

## Restart an instance

```
docker restart INSTANCE_NAME
```

When only one instance on the machine

```
docker restart $(docker ps -q)
```

## Stop an instance

```
docker stop INSTANCE_NAME
```

When only one instance on the machine

```
docker stop $(docker ps -q)
```
