# GitHub Users Search Engine

The engine uses [GitHub GraphQL API v4](https://developer.github.com/v4/explorer/) to display users based on programming languages.

## Prequisites (tested on)

- bash >= 3.2.57
- docker >= 19.03.8
- docker-compose >= 1.25.5
- make >= 3.81

## Task description

Dear Engineer

We ask you in this test to create a service which provides a single API endpoint to search for
GitHub users by specifying a programming language they use in their public repositories and a
username string.

Each user returned in the response of the search request should at least contain:

- Username
- Name
- Avatar URL
- Number of followers

Multiple programming languages should also be accepted in the API as a fallback. A fallback
should be considered when:

- There are zero results for a language
- A timeout occurred

Use the GitHub APIs (https://developer.github.com/v3/ or https://developer.github.com/v4/) to
retrieve the information.

Feel free to use any libraries (except for the GitHub client library) or tools you find suitable for
this task. The service should also be covered with tests.

Create a Dockerfile to run the service and include some short documentation to build and run
the service.

Please put the project on GitHub.

## [Installation](./Makefile)

```bash
git clone https://github.com/igrek8/moovel

# Builds docker image
make

# Runs tests
make test

# Run the service at http://localhost:8080/
make start

# Terminates the service
make stop
```

## Usage

**Get server info**

```js
// GET /api/status

{
  "hostname": "system.local",
  "version": "1.0.0",
  "dateTime": "2020-06-10T18:40:41.933Z",
  "locale": "en-GB"
}
```

**Search users**

```js
// Find users who use C as their language
// GET /api/users?langs[]=c

// Find users who use C and C++ as their languages
// GET /api/users?langs[]=c&langs[]=c++

// Find users who use C and C++ and whose login is like torvalds
// GET /api/users?langs[]=c&langs[]=c++&username=torvalds

{
  "users": [
    {
      "username": "string",
      "url": "string",
      "avatarUrl": "string",
      "followersCount": 1,
      "name": "string"
    }
    ...
  ]
}
```

## Troubleshoot

When running `make test` could result in some tests failing at first. Try `make` before `make test`
