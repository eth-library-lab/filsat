# Installation

see [Installation guide](INSTALLATION.md)

# Run

Run the server in your virtual environment (`source env/bin/activate`)

```bash
python3 manage.py runserver
```

# Query and mutation throuhg GraphQL

[http://localhost:8000/graphql/](http://localhost:8000/graphql/)

# Queries

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
