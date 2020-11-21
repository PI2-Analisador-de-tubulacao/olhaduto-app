# OlhaDuto - Desktop

![CI](https://github.com/PI2-Analisador-de-tubulacao/olhaduto-app/workflows/CI/badge.svg)

## Development

### Building and Launching (Docker)

## Model

First, download the Deep Learning model from [here](https://drive.google.com/file/d/1Avpujsj9DdBQHZzhZjv2P9wtba67A8ih/view?usp=sharing).

Unzip the directory `unet_js` in the `resources` directory.

After that, simply run:

```bash
$ sudo docker-compose up
```

### Testing

While `up` is running:

```bash
$ sudo docker-compose olhaduto-desktop yarn prestart
$ sudo docker-compose olhaduto-desktop yarn test
```
