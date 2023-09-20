# Project Setup
A guide showing how to setup the project.

## Prerequisites

- git set up
  - Download git
  - set up git environment (git config)
    - learn about 
      - git status (check what files are tracked by git)
      - git add (add files to staging area)
      - git commit ( commit changes)
      - git push (push changes to remote repository after commmiting)
      - git clone (clone a repository)
      - git pull (pull changes from remote repository)
      - git branch (view all branches) 
      - git checkout (go into another branch)
- gitHub Account Set up
  - Try making a repo on your personal github account and then play with it before working with group project. If already have a good knowledge about git github then skip this step.
- NodeJS
  - Download NodeJS from official website.
  - Make sure it is installed correctly.
  - learn about npm, package.json and basic structure of node app.
- An IDE ( VS Code, Webstorm, etc )
- Terminal
  - for windows -> use git bash


### Step 1
Create a new folder and go into that folder. Type the command ```git clone git@github.com:TummyTales/TummyTales.git``` into your terminal.\
This will clone the gitHub remote repository into your local machine. To make sure everything is right run the application.

### Step 2
This repository has 2 branches i.e. *main* and *dev*.\
**main** branch is the main branch of the repository. No one will work on this branch directly. **dev** is the working branch of this repository, only work on the dev branch and I will merge it in the main branch when needed.\
Now by default when you clone the repository, only main branch will exists. But you have to create new branch called *dev* by following - 
1. view all the branches ```git branch``` ( * at main ) .
2. make a new branch and switch to it ```git checkout dev```.\
Now You are in dev branch.
3. to check type ```git branch```. (  *  at dev)

### Step 3
Edit changes what you want. Then add the files to staging area, then commit, then push using ```git push origin dev```. This will push it to the dev branch (not main).
After pushing your changes you can view it in the github in dev branch.

### Step 4
If new changes are made in remote repository (github) by someone else other than you, then you want that new changes in you system . You can do that by ```git pull origin dev``` for dev branch and ```git pull origin main``` for main branch.

# Happy Coding !!
