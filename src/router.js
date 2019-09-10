import Vue from 'vue'
import Router from 'vue-router'
import AddProject from './components/AddProject.vue'
import AddEntry from './components/AddEntry.vue'
import Homescreen from './components/Homescreen.vue'
// import NewEntry from './components/NewEntry.vue'
import calendarview from './components/calendarview.vue'
import style from './styles/style.css'
import ProjectDetailsList from './components/ProjectDetailsList.vue'

Vue.use(Router)

export default new Router({
  mode: 'history',
  base: process.env.BASE_URL,
  routes: [
    {
      path: '/',
      name: 'homescreen',
      component: Homescreen
    },
    // {
    //   path: '/homescreen',
    //   name: 'homescreen',
    //   component: Homescreen
    // },
    {
      path: '/calendarview',
      name: 'calendarview',
      component: calendarview,
      props(route) {
        return {  index: route.query.index }
      }
    },
    {
      path: '/projectdetailslist',
      name: 'projectdetailslist',
      component: ProjectDetailsList,
      props(route) {
        return {  index: route.query.index }
      }
    },
    {
      path: '/addproject',
      name: 'addproject',
      component: AddProject
    },
    {
      path: '/addentry',
      name: 'addentry',
      component: AddEntry,
      props(route) {
        return {  index: route.query.index }
      }
    }
  ]
})
