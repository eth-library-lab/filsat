## Prerequisite

You will need to use [NodeJS](https://nodejs.org/en/) v10 or higher.

I used v12 to develop this application.

## Development

The following command aims to help you set up a local development environment.

## Installation

In order to install this application, clone the project and install the dependencies.

```bash
git clone https://github.com/WatKey/dsyntdocs
cd dsyntdocs/demo
npm install
```

### Run

To run locally the application, run the following command:

````bash
npm run start
````

Once the server up and running, you could browse the application locally at the address [http://localhost:3333](http://localhost:3333).

## Production

To build a production ready version of this application run the following command:

```bash
npm run build
```

Once the build completed, you could now copy all the files contained in the folder `www` to your web server.