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
- [Query and mutation through GraphQL](#query-and-mutation-through-graphql)
- [License](#license)

## Getting Started

This project is a GraphQL API for the server side of the project [Filsat](https://github.com/eth-library-lab/filsat) developed in [Python](https://www.python.org).

## Installation

See [Installation guide](INSTALLATION.md).

## Run

To run the server locally in your virtual environment (`source env/bin/activate`):

```bash
python3 manage.py runserver
```

## Query and mutation through GraphQL

[http://localhost:8000/graphql/](http://localhost:8000/graphql/)

### Examples of queries

The following are some examples of queries you could use to populate or query your local project.

## Create a project

```
mutation CreateProject {
  createProject(input: {
    repoName: "web-photo-filter",
    verNum: "2.2.1",
    link: "https://github.com/fluster/web-photo-filter",
    repoSize: 1,
    progLang: "javascript",
    description: "A Web Component to apply Instagram-like WebGL filters to photos"
  }) {
    project {
      id
      repoName
      verNum
      link
      description
      repoSize
      progLang
      description
    }
  }
}
```

## Query projects

```
query Projects {
  projects {
    id
      repoName
      verNum
      link
      description
      repoSize
      progLang
      description
    	taskSet {
        id
      }
  }
}
```

## Query a project

```
query Project {
  project(id: 1) {
    id
    repoName
    verNum
    link
    description
    repoSize
    progLang
    description
    taskSet {
      id
    }
  }
}
```

## Create a task

```
mutation CreateTask {
  createTask(input: {
    description: "Please help me document my Web Components",
    state: 1
    complexity: 1
    project: { 
      id: "2"
    }
  }) {
    task {
      id
      description
      state
      complexity
    }
  }
}
```

## Query tasks

```
query Tasks {
  tasks {
    id
    description
    state
    complexity
    docSet {
      id
    }
  }
}
```

## Query a task

```
query Task {
  task(id: 1) {
    id
    description
    state
    complexity
    docSet {
      id
      content
      rating
    }
  }
}
```

## Query all tasks for a specific state

```
query Tasks {
  tasks(search: 1) {
    id
    description
    state
    complexity
    docSet {
      id
    }
  }
}
```

## Update a task

```
mutation UpdateTask {
  updateTask(id: 2, input: {
    description: "Plz help me document this task"
    state: 1
    complexity: 4
    project: { 
      id: "2"
    }
  }) {
    task {
      id
      description
      state
      complexity
      docSet {
        id
        content
        rating
      }
    }
  }
}
```

## Create a doc

```
mutation CreateDoc {
  createDoc(input: {
    content: "Please help me document my component",
    rating: 0
    task: { 
      id: "2"
    }
  }) {
    doc {
      id
      content
      rating
    }
  }
}
```

## Update a doc

```
mutation UpdateDoc {
  updateDoc(id: 13, input: {
    content: "Please help plz me document my component",
    rating: 0
    task: { 
      id: "2"
    }
  }) {
    doc {
      id
      content
      rating
    }
  }
}
```

## License

[MIT](https://github.com/eth-library-lab/filsat/LICENSE.md)
