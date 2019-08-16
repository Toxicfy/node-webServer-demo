<!-- cookie -->

1. 存储在浏览器中的字符串，同时浏览器为不同的域分别存储

因为字符串是非结构化的，所以我们使用 k1=v1；k2=v2；k3=v3 的方式结构化数据

http 请求携带的 cookie，取决于访问的服务器是什么
=> 比如淘宝嵌套了百度的一个请求，发送该请求浏览器使用的是百度域名下的 cookie，尽管所在页面是淘宝

2. js - 客户端修改 cookie 并不多

document.cookie 可以查看
给 document.cookie 赋值是对已有 cookie 的累加

3. node cookie
   获取：直接通过 req.header.token 获取对应的 token 值，同时使用字符串方法处理成 object 以供使用；
   修改：
   => res.setHeader('Set-Cookie',`key1=value1;`)；
   限制：
   => 我们可以通过 httpOnly 限制只能通过 http 请求修改 token，path 限制 cookie 作用范围以及通过 expires 限制 cookie 的过期时间
   res.setHeader('Set-Cookie'.`key2=value2;httpOnly;expires=${expiresTime}`)

<!-- session -->

在客户端直接存储 cookie 会暴露主要信息，所以使用 session；

=> 客户端 cookie 存储某个 id 值，服务端获取后对应其 username，即使用服务端存储用户主要信息
=> 流程是：
从客户端获取 id，并通过服务端对应映射获取，并将获取的内容写入 session 中,

- 如果客户端没有 id（也就是没有 cookie）的情况下发起 http 请求，那么就进行 cookie 的设置，其中 id 为无意义随机数字，此时 session 为空，校验不通过；
- 有携带 id ，映射后 session （对象）有属性值后，校验通过

为什么需要 redis?
session 是放置在 node 进程中，占用进程可能过大

<!-- stream -->

可以节省资源，通过不断的发送接收从而完成资源的 IO
