
# Create and Deploy a static site for a resume using create react app (CRA) and github pages

Table of Contents
- [Create and Deploy a static site for a resume using create react app (CRA) and github pages](#create-and-deploy-a-static-site-for-a-resume-using-create-react-app-cra-and-github-pages)
  - [Installing Nodejs and npm](#installing-nodejs-and-npm)
    - [Install nodejs for you system from the nodejs install page](#install-nodejs-for-you-system-from-the-nodejs-install-page)
    - [Check that `node` and `npm` installed successfully](#check-that-node-and-npm-installed-successfully)
  - [Use `create-react-app` to generate static site template](#use-create-react-app-to-generate-static-site-template)
    - [globally install `npx` using `npm`](#globally-install-npx-using-npm)
    - [Create static site template](#create-static-site-template)
    - [Change directory to the static site folder](#change-directory-to-the-static-site-folder)
  - [Installing dependencies](#installing-dependencies)
    - [Install `react-markdown` and `remark-gfm`](#install-react-markdown-and-remark-gfm)
    - [Install `gh-pages`](#install-gh-pages)
  - [Create resume markdown file](#create-resume-markdown-file)
  - [Adding markdown to react renderer](#adding-markdown-to-react-renderer)
    - [Add markdown file type declaration](#add-markdown-file-type-declaration)
    - [Replace the contents of the main tsx file](#replace-the-contents-of-the-main-tsx-file)
  - [Preparing github pages](#preparing-github-pages)
    - [Adding github remote to local repository](#adding-github-remote-to-local-repository)
    - [Add `predeploy` and `deploy` scripts](#add-predeploy-and-deploy-scripts)
    - [Set `homepage` property](#set-homepage-property)
  - [Developing and redeploying](#developing-and-redeploying)
    - [Development](#development)
    - [Building and testing build locally](#building-and-testing-build-locally)
    - [Committing and pushing](#committing-and-pushing)
    - [Deploy to github pages](#deploy-to-github-pages)


## Installing Nodejs and npm
### Install nodejs for you system from the nodejs install page

Open your favourite shell application. For macos, the default shell is terminal.  
To open terminal, 
- open the launchpad and type in 'terminal'
- select 'terminal' from the menu.

For windows, the default shell is command prompt.  
To open Command Prompt, 
- hit start and type in 'cmd',
- select 'Command Prompt' from the menu.

### Check that `node` and `npm` installed successfully
``` shell
node --version
npm --version
```

## Use `create-react-app` to generate static site template
### globally install `npx` using `npm`

Continuing in your shell application, use the `-g` (global) flag to install the package `npx` right to your command line!

``` shell
npm install -g npx
```

### Create static site template

use `npx` from the command line and call `create-react-app` to create the static site using the typescript template

``` shell
npx create-react-app resume --template typescript
```

this will create a folder named `resume` with the contents of a react application single page static site.

### Change directory to the static site folder

``` shell
cd resume/
```

## Installing dependencies
### Install `react-markdown` and `remark-gfm`

`react-markdown` and `remark-gfm` are packages with react components that we can use to help render our markdown file as html.

Install the dependencies to this project:
``` shell
npm install react-markdown remark-gfm
```

### Install `gh-pages`

We will use `gh-pages` package to deploy our site to our github account when we prefer, from the command line (more on that later)

install the dependency but use the `--save-dev` flag as this dependency does not need to be included in the production build (it is only needed for development)

``` shell
npm install gh-pages --save-dev
```

## Create resume markdown file

Still in your shell application, create a new markdown file with your resume, and put it in your static site's `src` folder

``` shell
touch src/resume.md
```

## Adding markdown to react renderer
### Add markdown file type declaration

Add a new file to your prject in the src folder titled `markdown.d.ts` and insert the contents:

``` ts
declare module '*.md'
```

this will ensure that importing markdown files elsewhere in our project won't cause a type error.

### Replace the contents of the main tsx file

The static site template has some basic react mumbo-jumbo but we don't need any of it, so replace the entire contents of the `App.tsx` file with the following:

[`./src/App.tsx`](./src/App.tsx)
``` tsx
import { useEffect, useState } from "react";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";

import resume from "./resume.md";

export default function App()  {

    const [resumeText, setResumeText] = useState("");

    useEffect(() => {
        fetch(resume)
            .then((response) => response.text())
            .then((text) => setResumeText(text));
    }, []);

    return (
        <div>
            <ReactMarkdown
                children={resumeText}
                remarkPlugins={[remarkGfm]}
            />
        </div>
    )
}
```

now anything you write to your markdown file will appear as the contents of your static site!

## Preparing github pages
### Adding github remote to local repository

When you ran `create-react-app` the template initialized an empty git repository, now you need to hook it up with the remote at github.com

1. Create repository from github.com

Go to [github.com](https://github.com)

Click the button that says "New" on the left sidebar.

On this page, set your repository name to "resume", make sure "Public" is selected, scroll to the bottom and click "Create Repository"

2. Add remote origin to project

Back in your shell application, run the following command 

``` shell
git remote add origin https://github.com/<your username>/resume.git
```

3. Change default branch name

By default, your branch name might be `master`, you can check by running:
``` shell
git branch
```

if the output is master and you want to change that, run:
``` shell
git branch -m main
```

### Add `predeploy` and `deploy` scripts

Add these two new scripts to your `package.json` file,

- `predeploy`: this command ensures that there is a fresh build before deployment occurs, the `pre` prefix dictates that the script will be trigged before the `deploy` command runs, and must complete without error for the `deploy` script to run.
- `deploy`: push the build folder to the `gh-pages` branch and update your github pages site.

The scripts object in your `package.json` file should look like this:

[`./package.json`](./package.json)
``` json
{
    ...
    "scripts": {
        "start": "react-scripts start",
        "build": "react-scripts build",
        "predeploy": "npm run build",
        "deploy": "gh-pages -d build",
        "test": "react-scripts test",
        "eject": "react-scripts eject"
    },
    ...
}
```

### Set `homepage` property

Still in your `package.json` file, add the following property to the highest scoped object.

[`./package.json`](./package.json)
``` json
{
    ...
    "homepage": "."
    ...
}
```

## Developing and redeploying
### Development
Run the static site in development using 
``` shell
npm start
```

You can access the static site at http://localhost:3000

while your static site is running, you can edit your markdown file. Whenever you save your changes they will appear automatically in your browser!

### Building and testing build locally

To run a production build of your static site locally you can: 

1. install the `serve` dependency globally using:
``` shell
npm install -g serve
```

2. run the `serve` command on the `build` folder and specify the port 3000 with the `-p 3000` flag
``` shell
npm build
serve -s build/ -p 3000
```

You can access the production build at http://localhost:3000

### Committing and pushing

After making changes, you will want to update your repository before re-deploying.

Use the following commands in your shell application to update your repository. You will need to write a `<commit message>`, a short synopsis of the changes that are staged.

the 3 git commands here are:
1. `add`, which adds a directory or file to staging, meaning the files will be prepared for the next commit.
2. `commit` which along with a message, saves your staged changes for good and takes a snapshot of your code.
3. `push` which will push any new commits to your remote repository.

``` shell
git add .
git commit -m "<commit message>"
git push origin main
```

### Deploy to github pages

Lastly, use the script you added to the `package.json` file earlier to build and deploy your site to github pages

``` shell
npm run deploy
```

You can check your build status by going to your repository dashboard on github.com and clicking on the "Actions" tab.

Your site should be accessible at `https://<your github username>.github.io/resume/`