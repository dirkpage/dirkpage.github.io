
# Create and Deploy a static site for a resume using create react app (CRA) and GitHub pages

Table of Contents
- [Create and Deploy a static site for a resume using create react app (CRA) and GitHub pages](#create-and-deploy-a-static-site-for-a-resume-using-create-react-app-cra-and-github-pages)
  - [Prerequisites](#prerequisites)
    - [Markdown resume](#markdown-resume)
    - [Open Shell application](#open-shell-application)
    - [Installing Nodejs and `npm`](#installing-nodejs-and-npm)
      - [macOS](#macos)
      - [Windows](#windows)
      - [After installation](#after-installation)
    - [Installing `nano`](#installing-nano)
      - [macOS](#macos-1)
      - [Windows](#windows-1)
    - [Installing `git`](#installing-git)
      - [macOS](#macos-2)
      - [Windows](#windows-2)
    - [Creating a GitHub account](#creating-a-github-account)
  - [Generate static site template](#generate-static-site-template)
    - [Navigate to development folder](#navigate-to-development-folder)
    - [Globally install `npx` using `npm`](#globally-install-npx-using-npm)
    - [Create static site template using `create-react-app`](#create-static-site-template-using-create-react-app)
    - [Change directory to the static site folder](#change-directory-to-the-static-site-folder)
  - [Installing project dependencies](#installing-project-dependencies)
    - [Install `react-markdown` and `remark-gfm`](#install-react-markdown-and-remark-gfm)
    - [Install `gh-pages`](#install-gh-pages)
  - [Create resume markdown file](#create-resume-markdown-file)
  - [Adding markdown to react renderer](#adding-markdown-to-react-renderer)
    - [Add markdown file type declaration](#add-markdown-file-type-declaration)
    - [Replace the contents of the main tsx file](#replace-the-contents-of-the-main-tsx-file)
    - [Changing static site title](#changing-static-site-title)
  - [Preparing GitHub pages](#preparing-github-pages)
    - [Adding GitHub remote to local repository](#adding-github-remote-to-local-repository)
    - [Add `predeploy` and `deploy` scripts](#add-predeploy-and-deploy-scripts)
    - [Set `homepage` property](#set-homepage-property)
  - [Developing and redeploying](#developing-and-redeploying)
    - [Development](#development)
    - [Building and testing build locally](#building-and-testing-build-locally)
    - [Committing and pushing](#committing-and-pushing)
    - [Deploy to GitHub pages](#deploy-to-github-pages)
  - [More Resources](#more-resources)
  - [Authors and Acknowledgments](#authors-and-acknowledgments)
  - [FAQ](#faq)

The purpose of this README is to describe the steps in creating and deploying your own static site resume using markdown, react, vscode, GitHub pages, and favorite shell application. Meanwhile giving the reader insight into the principles of Technical-Writing described by Andrew Etter.

## Prerequisites

* [Markdown resume][resume]
* Shell application
* Nodejs & `npm`
* `nano` Command line text editor
* `git` CLI
* GitHub account

### Markdown resume

If you don't have a markdown formatted resume yet you can use [mine][resume] as a template, however I strongly suggest you should learn to write markdown, which you can do so from the links in the [more resources](#more-resources) section.

### Open Shell application
Open your favourite shell application. For macOS, the default shell is terminal.  
To open terminal, 
* open the launchpad and type in 'terminal'
* select 'terminal' from the menu.

For windows, the default shell is command prompt.  
To open Command Prompt, 
* hit start and type in 'cmd',
* select 'Command Prompt' from the menu.

### Installing Nodejs and `npm`

#### macOS

On mac, we'll use homebrew to install our dependencies right from the command line.  
Install homebrew with:
``` shell
/usr/bin/ruby -e "$(curl -fsSL https://raw.GitHubusercontent.com/Homebrew/install/master/install)"
```

Then, check that you've installed homebrew correctly:
``` shell
brew -v
```

Now, use homebrew to install the latest version of nodejs and `npm`
``` shell
brew install node
```

#### Windows

On windows we'll instead use the browser to download and install the required prerequisites. Complete the following tutorial to install nodejs to your shell application

* [Install nodejs and `npm` on Windows](https://phoenixnap.com/kb/install-node-js-npm-on-windows)

#### After installation
In your shell application, run the following commands to verify your latest versions
``` shell
node --version
npm --version
```

### Installing `nano`

`nano` is a command line text editor that we will be using to write files

#### macOS

macOS should come with nano or a similar text editor named pico, to check simply run:
``` shell
nano -version
```

If for whatever reason you do not have `nano` or similar installed, you can use homebrew to install it:
``` shell
brew install nano
```

#### Windows

You can download and install `nano` onto a windows computer by completing the following tutorial:
- [Install `nano` on Windows](https://anto.online/tips-and-tools/install-nano-text-editor-on-windows/)

### Installing `git`
#### macOS
You can use homebrew to install git from your shell application
``` shell
brew install git
git --version
```

#### Windows
You can download and install git by completing the following tutorial:
* [Install `git` to Command Prompt on Windows](https://phoenixnap.com/kb/how-to-install-git-windows)

### Creating a GitHub account
To create a GitHub account, Go to [github.com/signup](https://github.com/signup) and follow the prompts to create an account.

For more information on creating an account, [see more](https://docs.github.com/en/get-started/signing-up-for-github/signing-up-for-a-new-github-account).

**⚠️ Important ⚠️ : Remember the username you chose as we will be using it later.**

## Generate static site template
### Navigate to development folder
The folder that you store your projects in is up to you. At this time, you should use your shell application to _change directory_ into that folder. If you aren't certain, not to worry. I like to have a development directory close to the default folder that your shell application starts in. simply call the following commands to:

1. create a folder titled `dev`
``` shell
mkdir dev
```

2. _change directory_ into the newly created folder.
``` shell
cd dev
```

### Globally install `npx` using `npm`

Continuing in your shell application, use the `-g` (global) flag to install the package `npx` right to your command line!

``` shell
npm install -g npx
```

### Create static site template using `create-react-app`
Use `npx` from the command line and call `create-react-app` to create the static site using the typescript template.
``` shell
npx create-react-app resume --template typescript
```
This will create a folder named `resume` with the contents of a react application single page static site.

### Change directory to the static site folder

``` shell
cd resume/
```

## Installing project dependencies
### Install `react-markdown` and `remark-gfm`
`react-markdown` and `remark-gfm` are packages with react components that we can use to help render our markdown file as html.

Install the dependencies to this project:
``` shell
npm install react-markdown remark-gfm
```

### Install `gh-pages`
We will use `gh-pages` package to deploy our site to our GitHub account when we prefer, from the command line (more on that later).

Install the dependency but use the `--save-dev` flag as this dependency does not need to be included in the production build (it is only needed for development)
``` shell
npm install gh-pages --save-dev
```

## Create resume markdown file
Still in your shell application, create a new markdown file with your resume, and put it in your static site's `src` folder.
``` shell
nano src/resume.md
```
With `nano` open you can copy and paste the contents of your markdown formatted resume into your shell application window.  
When you are done, save the file and close `nano` by pressing the keys `ctrl-x`, `y` then `enter`.

## Adding markdown to react renderer
### Add markdown file type declaration

Add a new file to your prject in the src folder titled `markdown.d.ts`.
``` shell
nano src/markdown.d.ts
```
Insert the contents:  
[`src/markdown.d.ts`](./src/markdown.d.ts)
``` ts
declare module '*.md'
```
This will ensure that importing markdown files elsewhere in our project won't cause a type error.  
Once again after you are done editing the file, close `nano` with `ctrl-x`, `y` then `enter`.

### Replace the contents of the main tsx file

Now we'll open the main component of the react application and change it so that it pulls the text from `resume.md` and renders it.
``` shell
nano src/App.tsx
```

The static site template has some basic react mumbo-jumbo but we don't need any of it, so replace the entire contents of the `App.tsx` file with the following:  
[`src/App.tsx`](./src/App.tsx)
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
Now anything you write to your markdown file will appear as the contents of your static site!

### Changing static site title

One more thing to remove from the template. The default tab name is "React App", which we'll want to edit, open the [`index.html`](./public/index.html) file to make the change.
``` shell
nano public/index.html
```
Change the line:
``` html
<title>React App</title>
```
to:
``` html
<title>Resume</title>
```
Or some other title of your choice.

## Preparing GitHub pages
### Adding GitHub remote to local repository

When you ran `create-react-app` the template initialized an empty git repository, now you need to hook it up with the remote at github.com

1. Create repository from github.com

Go to [github.com](https://github.com)

Click the button that says "New" on the left sidebar.

On this page, set your repository name to `<your GitHub username>.github.io`, make sure the "Public" tick box is selected, scroll to the bottom and click "Create Repository".

1. Add remote origin to project

Back in your shell application, run the following command:
``` shell
git remote add origin https://github.com/<your GitHub username>/<your GitHub username>.github.io.git
```

3. Change default branch name

By default, your branch name might be `master`, you can check by running:
``` shell
git branch
```

If the output is master and you want to change that, run:
``` shell
git branch -m main
```

### Add `predeploy` and `deploy` scripts

Add these two new scripts to your `package.json` file:
* `predeploy`: this command ensures that there is a fresh build before deployment occurs, the `pre` prefix dictates that the script will be trigged before the `deploy` command runs, and must complete without error for the `deploy` script to run.
* `deploy`: push the build folder to the `gh-pages` branch and update your GitHub pages site.

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
Run the static site in development using:
``` shell
npm start
```

You can access the static site at [http://localhost:3000](http://localhost:3000).

Once your site loads it should look like this:
![Running in Development Demo](./src/demo.gif)

While your static site is running, you can edit your markdown file. Whenever you save your changes they will appear automatically in your browser!

### Building and testing build locally

To run a production build of your static site locally you can: 

1. install the `serve` dependency globally using:
``` shell
npm install -g serve
```

2. run the `serve` command on the `build` folder and specify the port 3000 with the `-p 3000` flag:
``` shell
npm build
serve -s build/ -p 3000
```

You can access the production build at [http://localhost:3000](http://localhost:3000).

### Committing and pushing

After making changes, you will want to update your repository before re-deploying.

Use the following commands in your shell application to update your repository. You will need to write a `<commit message>`, a short synopsis of the changes that are staged.

The 3 git commands here are:
1. `add`, which adds a directory or file to staging, meaning the files will be prepared for the next commit.
2. `commit` which along with a message, saves your staged changes for good and takes a snapshot of your code.
3. `push` which will push any new commits to your remote repository.

``` shell
git add .
git commit -m "<commit message>"
git push origin main
```

### Deploy to GitHub pages

Lastly, use the script you added to the `package.json` file earlier to build and deploy your site to GitHub pages

``` shell
npm run deploy
```

You can check your build status by going to your repository dashboard on github.com and clicking on the "Actions" tab.  
Your site should be accessible at `https://<your GitHub username>.github.io/resume/`

## More Resources
If you don't already have a markdown resume or aren't familiar with markdown, check out some helpful resources for learning:
- [markdowntutorial.com][markdown-tutorial]
- [markdownguide.org][markdown-guide]
- [Markdown resume template][resume]
- [_Modern Technical Writing_ by Andrew Etter on Amazon](https://www.amazon.ca/Modern-Technical-Writing-Introduction-Documentation-ebook/dp/B01A2QL9SS)
- [_Technical Writing Courses for Engineers_ at google.com](https://developers.google.com/tech-writing)

[markdown-tutorial]: https://www.markdowntutorial.com
[markdown-guide]: https://www.markdownguide.org/
[resume]: ./src/resume.md

## Authors and Acknowledgments
Main author: Dirk Page ([paged1@myumanitoba.ca](mailto:paged1@myumanitoba.ca))  
Thanks for peer review from: Hamdi Elzard, Frieda Bi, and Dane Wanke. 

## FAQ

**Q**: Why is markdown better than a Word Processor?  
**A**: Markdown is a modern lightweight documenting language that can be quickly converted into a pdf style with any different styling applied. Wheras a word processor generates a document that is complex, and has a strictly defined style, making it impossible to re-style on the fly.

**Q**: Why is my resume not showing up?  
**A**: If your resume does not show up in your browser after running `npm start` in your shell application (commonly known to web developers as a white page), check if there are any errors being output in your shell application, if there are none, check that your resume file [`src/resume.md`][resume] exists, and has some text in it.

**Q**: Why can't I deploy my site to GitHub pages until I commit my changes?  
**A**: the `gh-pages` dependency requires you to have your changes committed before they are deployed as a means of protecting your deployment from using unwanted changes. If you have changes that you want to save for later you can use:
``` shell
git stash
```
to hide them while you commit or deploy, and:
``` shell
git stash apply
```
to bring them back.