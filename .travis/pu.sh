#!/bin/sh

setup_git() {
    # Set the user name and email to match the API token holder
    # This will make sure the git commits will have the correct photo
    # and the user gets the credit for a checkin
    git config --global user.email "bameyrick@gmail.com"
    git config --global user.name "Ben Meyrick"
    git config --global push.default matching
    
    # Get the credentials from a file
    git config credential.helper "store --file=.git/credentials"
    
    # This associates the API Key with the account
    echo "https://${GITHUB_API_KEY}:@github.com" > .git/credentials
}

make_version() {
  git remote update
  git fetch
  git checkout --track origin/master
  
  # Echo the status to the log so that we can see it is OK
  git status
  
  # Run the deploy build and increment the package versions
  # %s is the placeholder for the created tag
  npm version $TRAVIS_BRANCH -m "chore: release version %s [skip ci]"
}

upload_files() {
  git add package.json
  git push origin master --quiet > /dev/null 2>&1
}

setup_git
make_version
upload_files
