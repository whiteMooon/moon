import { Req } from './index'

//当前城市
export const nowCity = data=> Req.getData({
    url:"/url/v1/cities?type=guess",
    method:"get",
    data,
})

//热门城市
export const hotCity = data=> Req.getData({
    url:"/url/v1/cities?type=hot",
    method:"get",
    data,
})

//全部城市
export const allCity = data=> Req.getData({
    url:"/url/v1/cities?type=group",
    method:"get",
    data,
})

//详情城市
export const city = (data,id)=> Req.getData({
    url:"/url/v1/cities/"+id,
    method:"get",
    data,
})

//搜索
export const search = data=> Req.getData({
    url:"/url/v1/pois",
    method:"get",
    data,
})

//商品首页地址
export const elmHomeAds = (data,id)=> Req.getData({
    url:"/url/v2/pois/"+id,
    method:"get",
    data,
})

//商品首页菜单
export const elmHomeMenu = data=> Req.getData({
    url:"/url/v2/index_entry",
    method:"get",
    data,
})

//商品首页商品
export const elmHomeShoies = data=> Req.getData({
    url:"/url/shopping/restaurants",
    method:"get",
    data,
})

//菜单详情
export const menuTypes = data=> Req.getData({
    url:"/url/shopping/v2/restaurant/category",
    method:"get",
    data,
})

//商品详情
export const detailTop = (data,id)=> Req.getData({
    url:"/url/shopping/restaurant/"+id,
    method:"get",
    data,
})

//商品分类
export const shopTypes = data=> Req.getData({
    url:"/url/shopping/v2/menu",
    method:"get",
    data,
})