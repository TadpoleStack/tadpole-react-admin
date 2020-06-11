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
      path: '/admin',
      component: React.lazy(() => import('@src/components/business/Admin'))
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
      component: React.lazy(() => import('@src/components/business/Start')),
      exact: true
   },
   {
      path: '/admin/iconpage',
      component: React.lazy(() => import('@src/components/business/UI/IconPage')),
      exact: true
   },
   {
      path: '/admin/typedplugin',
      component: React.lazy(() => import('@src/components/business/TypedPlugin')),
      exact: true
   },
   {
      path: '/admin/404',
      component: React.lazy(() => import('@src/components/basics/NotFound')),
      exact: true
   },
   {
      render: () => <Redirect to="/admin/404" />
   }
]