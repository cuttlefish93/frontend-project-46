### Hexlet tests and linter status:
[![Actions Status](https://github.com/cuttlefish93/frontend-project-46/workflows/hexlet-check/badge.svg)](https://github.com/cuttlefish93/frontend-project-46/actions)

[![Node CI](https://github.com/cuttlefish93/frontend-project-46/actions/workflows/nodejs.yml/badge.svg)](https://github.com/cuttlefish93/frontend-project-46/actions/workflows/nodejs.yml)

[![Maintainability](https://api.codeclimate.com/v1/badges/fffe50d88ca5da64f207/maintainability)](https://codeclimate.com/github/cuttlefish93/frontend-project-46/maintainability)

[![Test Coverage](https://api.codeclimate.com/v1/badges/fffe50d88ca5da64f207/test_coverage)](https://codeclimate.com/github/cuttlefish93/frontend-project-46/test_coverage)

---

### Difference calculator - a training project for the frontend developer program at the hexlet programming school
***CLI tool to show difference between two files***
***Supports the following file extensions: json, yml(yaml)***
***Supports 3 types of diff format: stylish(default), plain, json***

## Usage:
`Clone repository on your local computer`

`Install dependencies` - **npm install**

`Give permission for the file to be executed:`
- chmod +x bin/gendiff.js

`Run the command from the root folder of the project to install the package globally` - **npm link**

`Run one of this commands to get diff output`
- gendiff filepath1 filepath2 --format stylish (works without option --format because stylish is default type of format)
- gendiff filepath1 filepath2 --format plain
- gendiff filepath1 filepath2 --format json

## gendiff filepath1 filepath2 [--format stylish]
[![asciicast](https://asciinema.org/a/cDYiXdBFh73nwzQrQrSLJnsBn.svg)](https://asciinema.org/a/cDYiXdBFh73nwzQrQrSLJnsBn)

## gendiff filepath1 filepath2 --format plain
[![asciicast](https://asciinema.org/a/2cd04ayXplI1aZmeXluXUhNE8.svg)](https://asciinema.org/a/2cd04ayXplI1aZmeXluXUhNE8)

## gendiff filepath1 filepath2 --format json
[![asciicast](https://asciinema.org/a/amR2yJzziTw7auQCeDXnd0e1i.svg)](https://asciinema.org/a/amR2yJzziTw7auQCeDXnd0e1i)