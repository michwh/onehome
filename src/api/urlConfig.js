const serverRoot = 'http://127.0.0.1:8000';

//登录
export const login = `${serverRoot}/users/login`;

//注册
export const register = `${serverRoot}/users/register`;

//获取商品列表
export const getList = `${serverRoot}/product/getList/`;

//获取商品图片
export const getImagesList = `${serverRoot}/product/getImagesList/`;

//获取商品图片的上传token
export const getProductUploadToken = `${serverRoot}/users/getProductUploadToken/`;

//发布图片
export const publishImages = `${serverRoot}/product/publishImages/`;

