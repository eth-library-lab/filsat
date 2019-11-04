# Create a root folder for the project

mkdir filsat_api

# Clone the dsyntdocs

git clone https://github.com/WatKey/dsyntdocs

# Installation virtual environment

```bash
python3 -m venv env
```

# Activate virtual environment

```bash
source env/bin/activate
```

To go exit virtual environment run `deactivate`

# Go to source project folder

```bash
cd dsyntdocs
```

# Install requirements/dependencies

```bash
pip3 install -r requirements.txt
```

# Database tables initialization

```bash
python3 manage.py makemigrations code_references
python3 manage.py migrate
```
