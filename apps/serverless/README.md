```
npm install
npm run dev
```

```
npm run deploy
```

add your own wrangler.toml
```
name = "app"
main="src/index.ts"
compatibility_date = "2023-12-01"
node_compat = true
dev.local_protocol = "http"
dev.port = 8080

[vars]
AUTH_TOKEN = "TOKEN"

[[kv_namespaces]]
binding = "app"
id = "YOUR_ID"
```