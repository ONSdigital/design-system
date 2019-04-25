#### Login to Concourse

```
fly -t main login -c CONCOURSE_URL
```

#### Add design system Pipeline

```
fly -t main set-pipeline -p design-system -c concourse.yml --load-vars-from secrets.yml
```

```
fly -t main unpause-pipeline --pipeline design-system
```
