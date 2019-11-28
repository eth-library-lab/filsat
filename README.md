<div align="center">
  <a href="https://www.librarylab.ethz.ch"><img src="https://www.librarylab.ethz.ch/wp-content/uploads/2018/05/logo.svg" alt="Wooof logo" height="160"></a>
  
  <br/>
  
  <p><strong>Dsyntdocs</strong> - A transition platform for open source code and online coding tutorials.</p>
  
  <p>An Initiative for human-centered Innovation in the Knowledge Sphere of the <a href="https://www.librarylab.ethz.ch">ETH Library Lab</a>.</p>

</div>

# Abstract

Over the last years, open source software has successively replaced proprietary software and now runs on almost every major system. Open source software has become digital public infrastructure and as a consequence the amount and size of open source software projects have increased.

Due to its abundance, the main concern with open source software has shifted from availability to usability. Missing or bad code documentation makes good code hard to use and as a consequence users spend too much time trying to understand the software they run. However, documentation is not a priority for most developers and often hardly understandable or even non- existent.

On the other hand, developers need to be increasingly able to read and understand other people’s code, which is due to the increasing size of software projects and the collaborative nature of open source software. Reading foreign code, however, is not an easy task and should be taught and practiced in a structured way. Unfortunately, most coding tutorials and courses focus on code- creation and do not teach aspiring programmers how to efficiently parse and understand other people’s code.

Dsyntdocs aims at solving both issues simultaneously, providing a transition platform for open source code and online coding tutorials. The platform provides a standardised interface for loading up and requesting code, thus enabling a code flow from open source projects towards online learning tutorials. The uploaded open source code is requested by the tutorials and integrated into the learning experience as reading exercises. Once the code is understood, the learners write the documentation they would have needed in order to understand the code right-away. As a final step the documentation is provided back to the open source projects where it is integrated.

This approach benefits open source projects as well as the people writing the documentation. For projects without documentation, it is written, whereas the documentation for projects with prior documentation is improved. Code learners learn how to read other people’s code and solidify their understanding by writing down their newly acquired knowledge.

## Table of contents

- [Getting Started](#getting-started)
- [Blog](#blog)
- [Contact](#contact)

## Getting Started

This prototype is split in the following three distinct layers: 

| Layer | Description | Language |
|:-----:|:-----:|:-----:|
| [api](/api) | A GraphQL API for the server side | [Python](https://www.python.org) |
| [sender](/sender) | A server side batch to create and send the documentation as Pull Requests | [NodeJS](https://nodejs.org/en/) |
| [demo](/demo) | A demo application for tasks creation and edition | [StencilJS](https://stenciljs.com) |

## Blog

Some related blog posts published along the project by [Magnus Wuttke](http://github.com/WatKey).

* [Learning to code by creating open source documentation: a beneficial synergy](https://dev.to/watkey/learning-to-code-by-creating-open-source-documentation-a-beneficial-synergy-3e1p)
* [Exploration-Optimisation: the systematic improvement of user- generated solutions](https://dev.to/watkey/exploration-optimisation-the-systematic-improvement-of-user-generated-solutions-3ek0) 

## Contact

For any inquiries, use the ETH Library Lab [contact form](https://www.librarylab.ethz.ch/contact/).
