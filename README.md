# stepping-Stone

## Table of Contents

- [stepping-Stone](#stepping-Stone)
  - [Table of Contents](#Table-of-Contents)
  - [Installation](#Installation)
  - [Create React App](#Create-React-App)
    - [Basic usage](#Basic-usage)
    - [Build](#Build)
    - [Deploy](#Deploy)
  - [Creators](#Creators)

## Installation

``` bash
# clone the repo
$ git clone https://github.com/damcs/stepping-stone

# go into app's directory
$ cd stepping-stone

# install app's dependencies
$ npm install
```

## Create React App
This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app)

see also:
[User Guide](CRA.md)

### Basic usage

``` bash
# dev server  with hot reload at http://localhost:3000
$ npm start
```

Navigate to [http://localhost:3000](http://localhost:3000). The app will automatically reload if you change any of the source files.

### Build

Run `build` to build the project. The build artifacts will be stored in the `build/` directory.

```bash
# build for production with minification
$ npm run build
```

### Deploy

Run `deploy` to deploy project. The build artificats created by the predeploy script in the `build/` directy will be published to the `homepage` set in your [package.json](package.json).

```bash
# deploy to gh-pages
$ npm run deploy
```

You can also deploy through TravisCI, here is an [example](.travis.yml).

## Creators

**Aakash Hemadri**
* [GitHub Profile](<https://github.com/aakashhemadri>)
* [Personal Website](<https://aakashhemadri.github.io>)

**Akhilesh Ramakrishnan**
* [GitHub Profile](<https://github.com/akhilramkee>)


