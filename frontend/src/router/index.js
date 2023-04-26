import { createRouter, createWebHistory } from 'vue-router'
// make all paths and names lowercase for consistency
const routes = [
  {
    path: '/loginPage',
    name: 'loginPage',
    props: true,
    component: () => import('../components/loginPage.vue'),
    meta: { requiresAuth: false}
  },
  {
    path: '/',
    name: 'home',
    props: true,
    component: () => import('../components/homePage.vue'),
    meta: { requiresAuth: true}
  },
  {
    path: '/addService',
    name: 'addService',
    props: true,
    component: () => import('../components/addService.vue'),
    meta: { requiresAuth: true, role: 1 }
  },
    {
      path: '/intakeform',
      name: 'intakeform',
      props: true,
      component: () => import('../components/intakeForm.vue'),
      meta: { requiresAuth: true, role: 1 }
    },
    {
      path: '/findclient',
      name: 'findclient',
      component: () => import('../components/findClient.vue'),
      meta: { requiresAuth: true}
    },
    {
      path: '/updateclient/:id',
      name: 'updateclient',
      props: true,
      component: () => import('../components/updateClient.vue'),
      meta: { requiresAuth: true, role: 1 }
    },
    {
      path: '/eventform',
      name: 'eventform',
      component: () => import('../components/eventForm.vue'),
      meta: { requiresAuth: true}
    },
    {
      path: '/findevents',
      name: 'findevents',
      component: () => import('../components/findEvents.vue'),
      meta: { requiresAuth: true, role: 1}
    },
    {
      path: '/eventdetails/:id',
      name: 'eventdetails',
      props: true,
      component: () => import('../components/eventDetails.vue'),
      meta: { requiresAuth: true}
    }, 
    {
      path: '/findservices',
      name: 'findservices',
      component: () => import('../components/findServices.vue'),
      meta: { requiresAuth: true}
    },
    {
      path: '/editservice/:id',
      name: 'editservice',
      props: true,
      component: () => import('../components/editservice.vue'),
      meta: { requiresAuth: true, role: 1 }
    }

  ]
  const router = createRouter({
    history: createWebHistory(),
    routes
  })

  export default router