<template>
  <div class="add-container">
    <nav class = "white">
      <router-link :to="{ name: 'projectdetailslist', query: {index: index } }" id="back"><img src='../assets/arrow-back.svg' /></router-link>
      <p>New Entry </p>
         {{ $route.params.name }}
    </nav>
    <div class="project-container">
        <div class="project-title-container" v-bind:style="{ backgroundImage: 'linear-gradient(to left, ' + projectColor +' , ' + projectColor2+ ')' }">
            <div class="smile"> <img v-bind:src="this.face" id="face" /> </div>
            <div class="project-info"> 
                <div class="project-info-name"> {{projectName}} </div>
                <div class="project-info-average"> {{projectDesc}}</div>
            </div>    
        </div>
    </div>
    <div class="add-form-container">
        <form id="add-form">
        <div class="input-row">
          <div class="add-label"><div v-bind:style="{ color: projectColor2}">Date </div></div>
            <div class="add-input"> <input id="date" type="date" name="date" v-model="date"> </div>
        </div>
        <div class="input-row">
          <div class="add-label" id="label_desc"><div v-bind:style="{ color: projectColor2}">Notes </div></div>
          <div class="add-input" style="height: 90px"><textarea name="notes"/></div>
        </div>
        <div v-if="isMeasure" class="input-row">
          <div class="add-label" ><div v-bind:style="{ color: projectColor2}">{{projectMeasure}} </div></div>
            <div class="add-input"> <input type="text" name="measure" @change="measureInput()" @input ="measureInput()" id="measure-input"> </div>
        </div>
      </form>
      <router-link :to="{ name: 'projectdetailslist', query: {index: index } }"><button v-bind:style="{ color: projectColor2}" id="btn-submit" class="btn-submit" @click="getForm()">Submit </button></router-link>

    </div>
  </div>
</template>

<script>
import smile from '../assets/smile-fill.svg';
import flat from '../assets/flat-fill.svg';
import frown from '../assets/frown-fill.svg';

import $ from "jquery";

export default {
  name: 'AddEntry',
  props: {
    index: Number
  },
  data() {
    return {
      date: new Date().toISOString().slice(0,10),
      projectName: '',
      projectMeasure: '',
      projectDesc: '',
      projectColor: '',
      projectColor2: '',
      isMeasure: Boolean,
      face: '',

    };
  },
  methods: {
    getlastdate(){
      var projects = localStorage.getItem("projects");
      var parsed = JSON.parse(projects);
      var project = parsed[this.index];

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

            localStorage.setItem("project", JSON.stringify(parsed));
            this.face = project.smile
        }
        else {
            this.face= flat;
        }
       
    },
    measureInput(){
      if(document.getElementById("measure-input").value.length > 0){
          document.getElementById("measure-input").classList.remove("incomplete-field");
          document.getElementById("btn-submit").style.opacity = 1;
          document.getElementById("btn-submit").style.boxShadow = "0 9px 20px rgba(0, 0, 0, .2)";
        } 
      else {
          document.getElementById("btn-submit").style.opacity = .6;
          document.getElementById("btn-submit").style.boxShadow = "none";
        }
      },
    getTodaysDate() {
        var now = new Date();
        var month = (now.getMonth() + 1);               
        var day = now.getDate();
        if (month < 10) 
            month = "0" + month;
        if (day < 10) 
            day = "0" + day;
        var today = now.getFullYear() + '-' + month + '-' + day;
        this.date = today;
    },
    getProject(){
      var projects = localStorage.getItem("projects");
      var parsed = JSON.parse(projects);
      var project = parsed[this.index];
      return project;
    },
    getName() {
      var project = this.getProject();
      this.projectName = project.name.charAt(0).toUpperCase() + project.name.slice(1);
    },
    getMeasure() {
      var project = this.getProject();
      this.projectMeasure = project.measure.charAt(0).toUpperCase() + project.measure.slice(1);
      if(project.measure == "none"){
        this.isMeasure = false;
        document.getElementById("btn-submit").style.opacity = 1;
        document.getElementById("btn-submit").style.boxShadow = "0 9px 20px rgba(0, 0, 0, .2)";
      }
    },

    getColor(){
      var project = this.getProject();
      this.projectColor2 = project.colors[1]
      this.projectColor = project.colors[0];
    },
    getDesc(){
        var project = this.getProject();
        this.projectDesc = project.description;
    },
    getForm() {
    var all_complete = true;
    var elements = document.getElementById("add-form").elements;
    var obj = {};
    for(var i = 0 ; i < elements.length ; i++){
        var item = elements.item(i);
        obj[item.name] = item.value;
        if(item.name == "name" && item.value==""){
          item.classList.add("incomplete-field");
          all_complete = false;
        }
    }
    if (all_complete === true) {

      var projects = JSON.parse(localStorage.getItem("projects"));
      projects[this.index].entries.push(obj);
      
      var updated_projects = JSON.stringify(projects);
      localStorage.setItem("projects", updated_projects);
    }
}
  },

  mounted() {
    this.getName();
    this.getMeasure();
    this.getDesc();
    this.getColor();
    this.getlastdate();
  }

}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->

<style scoped>
h3 {
  margin: 40px 0 0;
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
  color: #42b983;
}

nav p{
  color: black;
  margin: 0;
}
.project-info-name, .project-info-average {
  color: white;
}



</style>
