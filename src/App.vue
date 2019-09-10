<template>
  <div id="app">
    <!-- <Homescreen /> -->
    <!-- <calendarview/> -->
    <!-- <AddProject  v-if="isOpen" @hideScreen="hideScreen"/> -->
    <!-- <AddEntry /> -->
    <!-- <AddProject /> -->
    <!-- <ProjectDetailsList v-bind:index="1"/> -->
    <div id="nav">
    </div>
    <router-view/>
  </div>
</template>
<script>
import AddProject from './components/AddProject.vue'
import AddEntry from './components/AddEntry.vue'
import Homescreen from './components/Homescreen.vue'
import NewEntry from './components/NewEntry.vue'
import style from './styles/style.css'
import ProjectDetailsList from './components/ProjectDetailsList.vue'
// import 'fullcalendar/dist/fullcalendar.css'
import calendarview from './components/calendarview.vue'
import Vue from 'vue'
import Buefy from 'buefy'
import 'buefy/dist/buefy.css'

Vue.use(Buefy)

export default {
  name: 'app',
  components: {
    AddProject,
    AddEntry,
    AddProject, 
    ProjectDetailsList,
    calendarview,
    Homescreen
  },
  props: {
    showHome : {
      type: Boolean,
      default: true
    },
    addProject : {
      type: Boolean,
      default: true
    }
  },
  data () {
    return {
      isOpen: this.addProject
    }
  },
  methods: {
    hideScreen(screen){
      this.isOpen = !this.isOpen;
    },
    showScreen(){
      screen=true
     }
   }
}

</script>
<style>
#app {
  font-family: 'Metropolis', 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  margin-top: 60px;
}
</style>
