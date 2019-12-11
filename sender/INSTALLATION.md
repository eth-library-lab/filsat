# Installation guide

The installation guide aims to provide information to install and configure locally the [sender app](https://github.com/eth-library-lab/filsat/tree/master/sender) of the [Filsat](https://github.com/eth-library-lab/filsat) prototype.

## Prerequisite

You will need to use [NodeJS](https://nodejs.org/en/) v10 or higher.

## Development

The following command aims to help you set up a local development environment.

## Installation

In order to install this application, clone the project.

```bash
git clone https://github.com/eth-library-lab/filsat
```

Go to `filsat/src/filsat-github.ts` and `filsat/lib/filsat-github.js` and replace the empty string declared as `githubToken` by your personal GitHub authentication token.

Once this is done, install the dependencies.

```bash
cd filsat/sender
npm install
```
