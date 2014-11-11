# DDNS usage

先在index.js中修改`email`, `passw`, `doamins`

然后

```
node index.js subdomain [ip]
```

* subdomain必填
* 如果不填ip会自动读取网卡的ip
