import Vue from 'vue'
import Router from 'vue-router'
import Home from '@/components/home/Home'
import chCity from '@/components/change/chCity'
import elmHome from '@/components/food/elmHome'
import Menus from '@/components/menu/Menus'
import Detail from '@/components/detail/Detail'
import Shoptypes from '@/components/detail/Shoptypes'
import Shoprecent from '@/components/detail/Shoprecent'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path:'/',
      redirect:'/home'
    },
    {
      path: '/home',
      name: 'Home',
      component: Home
    },
    {
      path: '/city',
      name: 'chCity',
      component: chCity
    },
    {
      path: '/elmHome/:id',
      name: 'elmHome',
      component: elmHome
    },
    {
      path: '/menu',
      name: 'Menus',
      component: Menus
    },
    {
      path: '/detail',
      name: 'Detail',
      component: Detail,
      children:[
        {
          path: 'shoptypes',
          name: 'Shoptypes',
          component: Shoptypes
        },
        {
          path: 'shoprecent',
          name: 'Shoprecent',
          component: Shoprecent
        },
        {
          path:'/detail',
          redirect:"/detail/shoptypes"
        }
      ]
    }
  ]
})
