vue+django+mysql实现的移动端二手交易应用前端部分

# 效果展示

![1](img/1.gif)

# 相关仓库

- [onehome](https://github.com/michwh/onehome)：项目前端部分

- [onehomeServer](https://github.com/michwh/onehome-server)：项目后端部分

- [onehomeDoc](https://github.com/michwh/onehomeDoc)：项目的一些文档

# 技术栈

- axios

- element-ui

- qiniu-js

- vue

- vuex

# 使用说明

src/store/state.js 下修改：

```js
domain: 'https://upload-z2.qiniup.com', //七牛云对应地域的上传地址
qiniuaddr: 'qiniu.fanfei.site', //下载地址，七牛给的测试域名或者自己绑定的域名
```

src/store/mutation.js 下修改：

```js
uploadImg(state, msg) {
  const config = {
      useCdnDomain: true,
      region: qiniu.region.z2 // 你的七牛存储区域
  }
  ...
}
```

# 已完成功能

- [x] 登录

- [x] 注册

- [x] 首页展示

- [x] 发布商品信息（支持多图片上传）

- [x] 收藏/取消收藏

- [x] 私聊

- [x] 搜索

- [x] 消息提醒

- [x] 上传图像

- [x] 我的收藏

- [x] 我的发布

- [x] 修改密码

- [x] 退出登录