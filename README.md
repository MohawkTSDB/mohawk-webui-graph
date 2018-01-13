# Mohawk Web UI

Based on `create react app` (source: https://github.com/facebookincubator/create-react-app).

Run you're server using `yarn start` / `npm start`.

## Configuration

Default Mohawk endpoint is localhost:8080 which is the default endpoint we fetch data from - We allow changing endpoint using the Configuration Tab.

## Query Language

Currently we only support querying by metrics id.

## Example usage

Run you're Mohawk app (default port is 8080) and push some metrics to it (If you want to push some random metrics use the scripts provided in `src/server/examples`)

```
mohawk -V
push_metrics_example.sh
```

from you're mohawk-webui-graph run you're web ui

```
npm start
```

and finally query `free_memory` in the Metrics tab.
