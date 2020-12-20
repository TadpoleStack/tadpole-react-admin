import React from 'react';
import { Redirect } from 'react-router-dom'

export const mainRoutes = [
   {
      path: '/',
      render: () => <Redirect to="/login" push />,
      exact: true
   },
   {
      path: '/login',
      component: React.lazy(() => import('@src/components/basics/Login')),
      exact: true
   },
   {
      path: '/404',
      component: React.lazy(() => import('@src/components/basics/NotFound')),
      exact: true
   },
   {
      render: () => <Redirect to="/404" />
   }
]

/**
 * admin view routes
 */
export const adminRoutes = [
   {
      path: '/admin',
      meta:{title:'后台'},
      children: [
         {
            path:'/',
            component: React.lazy(() => import('@src/components/business/Start')),
            exact: true,
            meta:{title:'开始'}
         },
         {
            path: '/ui',
            meta:{title:'UI'},
            children: [
               {
                  path:'/iconpage',
                  component: React.lazy(() => import('@src/components/business/UI/IconPage')),
                  exact: true ,
                  meta:{title:'图标'}        
               }
            ]
         },
         {
            path: '/charts',
            meta:{title:'图表'},
            children: [
               {
                  path:'/echarts',
                  meta:{title:'Echarts'},
                  children:[
                     {
                        path:'/chinamap',
                        component: React.lazy(() => import('@src/components/business/Charts/EchartsMap')),
                        meta:{title:'中国地图'},
                        exact:true
                     }
                  ]
               }    
            ]
         },
         {
            path: '/edit',
            meta:{title:'编辑'},
            children:[
               {
                  path:'/braft',
                  component: React.lazy(() => import('@src/components/business/Rich/Braft')),
                  exact:true,
                  meta:{title:'富文本braft'}
               },
               {
                  path:'/reactquill',
                  component: React.lazy(() => import('@src/components/business/Rich/ReactQuill')),
                  exact:true,
                  meta:{title:'富文本reactquill'}
               },
               {
                  path:'vditormarkdown',
                  component: React.lazy(() => import('@src/components/business/Rich/VditorMarkdown')),
                  exact:true,
                  meta:{title:'vditormarkdown渲染'}
               }
            ]
         },
         {
            path:'/table',
            meta:{title:'表格'},
            children:[
                  {
                     path: '/simpletable',
                     component: React.lazy(() => import('@src/components/business/Table/SimpleTable')),
                     exact: true,
                     meta:{title:'简单表格'}
                  },
                  {
                     path: '/sortablehoctable',
                     component: React.lazy(() => import('@src/components/business/Table/SortableHocTable')),
                     exact: true,
                     meta:{title:'表格拖拽'}
                  },
                  {
                     path: '/editabletable',
                     component: React.lazy(() => import('@src/components/business/Table/EditableTable')),
                     exact: true,
                     meta:{title:'编辑表格'}
                  },
            ]
         },
         {
            path: '/dataexport',
            component: React.lazy(() => import('@src/components/business/DataExport')),
            exact: true,
            meta:{title:'数据导出'}
         },
         {
            path: '/typedplugin',
            component: React.lazy(() => import('@src/components/business/TypedPlugin')),
            exact: true,
            meta:{title:'打字机效果'}
         },
         {
            path: '/404',
            component: React.lazy(() => import('@src/components/basics/NotFound')),
            exact: true,
            meta:{title:'404'}
         }
      ]
   }
   // {
   //    path: '/admin/404',
   //    component: React.lazy(() => import('@src/components/basics/NotFound')),
   //    exact: true
   // },
   // {
   //    component: React.lazy(() => import('@src/components/basics/NotFound'))
   // }
]