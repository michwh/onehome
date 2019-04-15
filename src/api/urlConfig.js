const serverRoot = 'http://127.0.0.1:8000';
//const serverRoot = 'https://www.fanfei.site';

//聊天
//export const chat = 'wss://www.fanfei.site/ws/chat';
export const chat = 'ws://127.0.0.1:8000/ws/chat';

//消息推送
//export const messagePush = 'wss://www.fanfei.site/push';
export const messagePush = 'ws://127.0.0.1:8000/push';

//登录
export const login = `${serverRoot}/users/login`;

//注册
export const register = `${serverRoot}/users/register`;

//获取商品列表
export const getList = `${serverRoot}/product/getList/?page=`;

//上传学生证图片
//export const uploadStudentCard = `${serverRoot}/users/uploadStudentCard/`;

//获取图片的上传token
export const getImgUploadToken = `${serverRoot}/users/getImgUploadToken/`;

//发布交易信息
export const publish = `${serverRoot}/product/publish/`;

//改变收藏状态
export const changeCollectState = `${serverRoot}/collect/changeCollectState/`;

//获取收藏列表
export const getCollectionList = `${serverRoot}/collect/getCollectionList/`;

//获取搜索列表
export const search = `${serverRoot}/product/getSearchList/?key=`;

//上传用户头像
export const changeAvatar = `${serverRoot}/users/changeAvatar/`;

//修改密码
export const changePassword = `${serverRoot}/users/changePassword/`;

//获取我的发布列表
export const getMyPublishList = `${serverRoot}/product/getMyPublishList/`;
