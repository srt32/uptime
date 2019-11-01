# uptime

GitHub Action to check the status of endpoints

## Inputs

### url-to-hit

**Required** The url to hit

### expected-statuses

Comma separated list of statuses that are okay. Defaults to `"200"`

## Outputs

### status

The status we got.

## Example usage

```
users: srt32/uptime
with:
  url-to-hit: 'https://myservice.example.com'
  expected-statuses: "200,301"
```
