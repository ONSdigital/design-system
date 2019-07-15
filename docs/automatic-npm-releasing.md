# Automatic npm releasing

When you create a release (and a tag is created) a Travis build will kick off and start building a npm bundle which will be deployed to npm.

Currently the deployment to npm is done using API keys for Richard McCarthy's (`richard.mccarthy.ons@gmail.com`) npm account. If these need changing there are some prerequisites:

### npm account

- You must be a collaborator on the @ons/design-system package
- You may have 2FA enabled but only for authentication
- The API token **must** be encrypted using the Travis CLI
