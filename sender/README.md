<div align="center">
  <a href="https://www.librarylab.ethz.ch"><img src="https://www.librarylab.ethz.ch/wp-content/uploads/2018/05/logo.svg" alt="Wooof logo" height="160"></a>
  
  <br/>
  
  <p><strong>Filsat</strong> - A transition platform for open source code and online coding tutorials.</p>
  
  <p>An Initiative for human-centered Innovation in the Knowledge Sphere of the <a href="https://www.librarylab.ethz.ch">ETH Library Lab</a>.</p>

</div>

## Table of contents

- [Getting Started](#getting-started)
- [Installation](#installation)
- [Run](#run)
- [Production](#production)
- [License](#license)

## Getting Started

A batch to create and send the documentation as Pull Requests (PR).

## Installation

See [INSTALLATION.md](INSTALLATION.md).

## Run

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

## License

[MIT](./LICENSE.md)
