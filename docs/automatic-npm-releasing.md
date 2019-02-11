# Automatic npm releasing

When you create a release (and a tag is created) a Travis build will kick off and start building a npm bundle which will be deployed to npm. The task will also update the version value in the `package.json` on master automatically.

Currently the deploy to npm and git commits are deployed/pushed using API keys for Ben Meyrick's (`bameyrick@gmail.com`) GitHub account. If these need changing there are some prerequisites:

### npm account

- You must be a collaborator on the @ons/design-system package
- You may have 2FA enabled but only for authentication
- The API token **must** be encrypted using the Travis CLI

### GitHub account

- You must be an administrator of the repository
- The branch protection rules for `master` should be set to **not** apply to administrators, or Travis won't be able to update the package.json version with the latest tag
