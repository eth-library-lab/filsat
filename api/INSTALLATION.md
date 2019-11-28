# Installation guide

The installation guide aims to provide you a step by step tutorial to install and configure locally the [api](https://github.com/eth-library-lab/filsat/tree/master/api) of the project [Dsyntdocs](https://github.com/eth-library-lab/filsat)

## Create a root folder for the project

```bash
mkdir filsat_api
```

## Clone the dsyntdocs

```bash
git clone https://github.com/eth-library-lab/filsat
```

## Installation virtual environment

```bash
python3 -m venv env
```

## Activate virtual environment

```bash
source env/bin/activate
```

To exit virtual environment run `deactivate`

## Go to source project folder

```bash
cd filsat
```

## Install requirements/dependencies

```bash
pip3 install -r requirements.txt
```

## Database tables initialization

```bash
python3 manage.py makemigrations code_references
python3 manage.py migrate
```
