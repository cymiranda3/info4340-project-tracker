<template>
  <div >
    <nav class = "home">
      <p>My Projects </p>
  
    </nav>
  <div class="projects">
    <div class='add-button' v-for='(p, i) in projects' >
     <router-link :to="{ name: 'projectdetailslist', query: {index: i } }">
      <div class="add-button-btn" v-bind:style="{ backgroundImage: 'linear-gradient(to bottom left, ' + p.colors[0] +' , ' + p.colors[1]+ ')' }">
        <div class="btn-content">
          <img v-bind:src="p.smile" id="home-emoji"/>
          {{p.name}}
        </div>
       
      </div></router-link>
    </div>

    <router-link to="/addproject" >
      <div class='add-button' >
        <div class="add-button-btn"><img id="plus-project" src='../assets/plus.svg' /></div>
      </div>
    </router-link>
  </div>
</div>
</template>
<script>

import smile from '../assets/smile-fill.svg';
import flat from '../assets/flat-fill.svg';
import frown from '../assets/frown-fill.svg';

export default {
  name: 'Homescreen',
  props: {
    msg: String
  },
  data() {
    return {
      projects: "",
      projectColor: "",
      projectColor1:"",
      date:"",
    }
  },
  methods: {
      getlastdate(){
      if (localStorage.getItem("projects") === null) {
        console.log('nothing to show');
      }
      else {

      var projects = localStorage.getItem("projects");
      var parsed = JSON.parse(projects); 
      parsed.forEach(function(project){
        var projects_array = []
        var entries = project.entries
        if(project.entries.length>0){
          entries.sort (function(a, b){
          return new Date(a.date) - new Date(b.date);
        })

          var today = new Date();
          var len = entries.length;
          var last_entry = new Date(entries[len-1].date)
          var time_diff = Math.abs(today-last_entry)
          var days_diff = time_diff / (1000 * 3600 * 24)
          if(days_diff <= 2){
            project.smile = smile
          }
          else if (days_diff > 2 && days_diff < 5){
            project.smile = flat
          }
          else {
            project.smile = frown
          }
          project.frequency = days_diff;
        }
        else {
          project.smile = flat
        }
      })
      localStorage.setItem("projects", JSON.stringify(parsed));
      }
    },
    display(){
      var projects = localStorage.getItem("projects");
      var parsed = JSON.parse(projects);
      this.projects = parsed;
    },
  
    getColor(){
      var project = this.getProject();
      this.projectColor1 = project.colors[1]
      this.projectColor = project.colors[0];

    },
  },

  mounted(){
    this.getlastdate();
    this.display();
  },
  
  }

</script>
<style scoped>
body,html{
    font-family: "proxima-nova", sans-serif;
}
h3 {
  margin: 40px 0 0;
}
nav {
      padding: 35px 0;
      border: none;
}
nav p {
      float: left;
    margin-left: 45px;
    font-size: 32px;
    font-weight: 800;
    margin-bottom: 20px;
}
ul {
  list-style-type: none;
  padding: 0;
}
li {
  display: inline-block;
  margin: 0 10px;
}
a {
  text-decoration: none;
}
#plus-project {
  width: 25px;
}

#dotmenu{
  display: block;
  margin: 0 auto 12px 90px;
}
.add-button:focus {
    transform: scale(.95);
    transition: all .05s ease-in-out;
    outline: none;
}
.add-button:active {
    transform: scale(.95);
    transition: all .05s ease-in-out;
    outline: none;
}

.add-button {
  height: 130px;
  width: 130px;
  margin: 0 15px 22px 15px;
  border-radius: 20%;
  -webkit-box-pack: center;
  -webkit-justify-content: center;
  -ms-flex-pack: center;
  justify-content: center;
  -webkit-box-align: center;
  -webkit-align-items: center;
  -ms-flex-align: center;
  align-items: center;
  font-size: 17px;
  font-weight: 500;
  z-index: 5;
  display: -webkit-box;
  display: -webkit-flex;
  display: -ms-flexbox;
  display: flex;
  box-shadow: 0px 2px 10px 0px rgba(0, 0, 0, 0.25);
  transition: all .1s ease-in-out;
  cursor: pointer;
  display: inline-block;
   vertical-align:top;
   text-align: center;
}
.btn-content {
  max-width: 85%;
    line-height: 19px;
}

#home-emoji{
  display: block;
  margin: 0 auto 12px auto;
}

</style>
