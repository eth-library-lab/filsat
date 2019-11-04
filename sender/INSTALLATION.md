## Prerequisite

You will need to use [NodeJS](https://nodejs.org/en/) v10 or higher.

I used v12 to develop this application.

## Development

The following command aims to help you set up a local development environment.

## Installation

In order to install this application, clone the project and install the dependencies.

```bash
git clone https://github.com/WatKey/dsyntdocs
cd dsyntdocs/sender
npm install
```

### Run

To run locally the application once, run the following command:

````bash
npm run start
````

If you would like to run this batch as a cronjob, run the following command:

```bash
npm run cron
```

## Production

To automate this batch on a server, either use above cronjob command `cron` or add the `start` command to the server scheduler.
