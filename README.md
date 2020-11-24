# OlhaDuto - Desktop

![CI](https://github.com/PI2-Analisador-de-tubulacao/olhaduto-app/workflows/CI/badge.svg)

## Development

### Building and Launching (Docker)

1. Download the Deep Learning model from [here](https://drive.google.com/file/d/1Avpujsj9DdBQHZzhZjv2P9wtba67A8ih/view?usp=sharing).

2. Unzip the directory `unet_js` in the `resources` directory.

3. Run:

```bash
$ sudo docker-compose up
```

### Testing

While `docker-compose up` is running:

```bash
$ sudo docker-compose exec olhaduto-desktop bash -l -c 'yarn test-all'
```
