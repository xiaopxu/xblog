import Vue from 'vue'
import Router from 'vue-router'
import Sign from './../views/sign'
import Index from './../views/index'
import Writer from './../views/writer'
import ArticleList from '././../views/child_view/article_list'
import ArticleView from './../views/child_view/article_view'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'index',
      component: Index,
      children: [{
        path: '/',
        name: 'article-list',
        component: ArticleList
      },
        {
          path: '/article-view/:id',
          name: 'article-view',
          component: ArticleView
        }
      ]
    },
    {
      path: '/sign/:signType',
      name: 'sign',
      component: Sign
    },
    {
      path: '/writer/:id',
      name: 'writer',
      component: Writer
    }
  ]
})
