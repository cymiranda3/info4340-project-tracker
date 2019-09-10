<template>  
  <div class="project-details-container">
     <nav>
       <router-link to="/" id="back"><img src='../assets/arrow-back.svg' /></router-link>
      <p>All Entries </p>
      <!-- <router-link :to="{ name: 'addentry', query: {index: index } }" id="plus"><img src='../assets/plus.svg' /></router-link> -->
      
      <div id="dots-all"><a id="dots"><img @click="menu()" src='../assets/3-dot-black.svg' /></a>
        <div class = "dotmenu" style="display: none">
        <ul class = "dropdown-content">
            <!-- <li >edit</li> -->
            <!-- ask if the user wants to delete project, then take to home page -->
            <li @click="archive()"><router-link to="/" >delete project</router-link> </li>

        </ul>
        </div>
        </div>
    </nav>
    <div class="list-cal-container">
        <div class="toggle highlighted-toggle"><div >list </div></div>
        <router-link :to="{ name: 'calendarview', query: {index: index } }"><div class="toggle"><div >calendar </div></div></router-link>
    </div>
    <div class="project-container">
        <div class="project-title-container" v-bind:style="{ backgroundImage: 'linear-gradient(to left, ' + projectColor + ' , ' + projectColor2 + ')' }">
            <div class="smile"> <img v-bind:src="this.face" id="face"/> </div>
            <div class="project-info">
                <div class="project-info-name"> {{projectName}} </div>
                <div class="project-info-average"> {{projectDesc}}</div>
            </div>    
        </div>
    </div>
    <div v-if="projectEntries.length >0" class="entries">
        <div class="entry-panel" v-for="(entry, i) in projectEntries" > 
            <span v-if="isMeasure" id="panel-title" v-bind:style="{ color: projectColor2 }"> {{entry.measure}} {{projectMeasure}} </span>
            <img src="../assets/trash.svg" id="trash" @click="archiveEntry(i)"/>
            <p> {{entry.notes}} </p>
            <span id="panel-date"> {{entry.date}}</span>
        </div>
    </div>
    <router-link :to="{ name: 'addentry', query: {index: index } }" id="plus">
        <div class="add-entry-btn" v-bind:style="{ background: projectColor2 }">Add Entry</div>
    </router-link>
    </div>
</template>

<script>
import smile from '../assets/smile-fill.svg';
import flat from '../assets/flat-fill.svg';
import frown from '../assets/frown-fill.svg';

import $ from "jquery";


export default {
  name: 'ProjectDetailsList',
  props: {
    msg: String,
    index: Number
  },
  data() {
    return{
        projectName: '',
        projectDesc: '',
        projectEntries: '',
        projectMeasure: '',
        projectColor: '',
        projectColor2: '',
        isMeasure: Boolean,
        face: '',
    }
  },
  methods: {
      getProject() {
      var projects = localStorage.getItem("projects");
      var parsed = JSON.parse(projects);
      var project = parsed[this.index];
      return project;
    },
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
    getName() {
      var last_project = this.getProject();
      this.projectName = last_project.name.charAt(0).toUpperCase() + last_project.name.slice(1);
    },
    getDesc() {
        var project = this.getProject();
        this.projectDesc = project.description;
    },
    getMeasure() {
        var project = this.getProject();
        this.projectMeasure = project.measure.charAt(0).toUpperCase() + project.measure.slice(1);
        if(project.measure == "none"){
            this.isMeasure = false;
        }
    },
    getColor(){
        var project = this.getProject();
        this.projectColor2 = project.colors[1]
        this.projectColor = project.colors[0];
    },
    getEntries() {
        var project = this.getProject();
        this.projectEntries = project.entries;
    },
    archive() {
        var archive = JSON.parse(localStorage.getItem("archive"));
        var projects = JSON.parse(localStorage.getItem("projects"));

        archive.push(projects[this.index]);
        projects.splice(this.index, 1);
        
        localStorage.setItem("projects", JSON.stringify(projects));
        localStorage.setItem("archive", JSON.stringify(archive));
    },
    archiveEntry(i) {
        // var entry_archive = JSON.parse(localStorage.getItem("entryArchive"));
        var entries = this.projectEntries;
        // entry_archive.push(entries[i]);
        entries.splice(i, 1);
        var projects = JSON.parse(localStorage.getItem("projects"));
        projects[this.index].entries = entries;
        localStorage.setItem("projects", JSON.stringify(projects)); 
        this.getlastdate();
    },
    menu(){
        $(".dotmenu").show();
    },
    
},


  mounted() {
    this.getName();
    this.getDesc();
    this.getEntries();
    this.getMeasure();
    this.getColor();
    this.getlastdate();
  }
}
$(document).mouseup(function (e){
	var container = $("#dots-all");

	if (!container.is(e.target) && container.has(e.target).length === 0){
        $(".dotmenu").hide()
	}
}); 
</script>
<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
body,html{
    font-family: "proxima-nova", sans-serif;
}
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
  text-transform: uppercase;
    font-size: 14px;
    letter-spacing: 1px;
    text-align: left;
}
a {
  color: black;
}
#back {
    filter: invert(100%);
    width: 20px;
}
#face {
    height: 60px;
}
nav {
    border-bottom: .2px solid #D9D9D9;
    padding-bottom: 25px;
}
nav p {
    margin-left: 65px;
}
.add-entry-btn {
    border-radius: 15px;
    padding: 18px;
    box-shadow: 0 5px 16px 0 rgba(0, 0, 0, .13);
    width: 82%;
    margin: auto auto 15px auto;
    text-align: center;
    position: fixed;
    left: 9%;
    font-weight: 500;
    bottom: 1%;
    color: white;
}
.project-title-container {
    color: #fff;
    box-shadow: 0 9px 20px rgba(0, 0, 0, .14);
    width: 100%;
}
.project-details-container {
    padding-bottom: 40px;
}
.entry-panel {
    border-radius: 15px;
    padding: 25px;
    box-shadow: 0 5px 16px 0 rgba(0, 0, 0, .13);
    width: 82%;
    margin: auto auto 15px auto;
    text-align: left;
}

.entry-panel p {
    margin-bottom: 25px;
}

.entries {
    margin-top: 45px;
    height: 360px;
    overflow: scroll;
}

/* .entries::after {
    background-image: linear-gradient( top, rgba( 255, 255, 255, 0 ) 0%, rgba( 255, 255, 255, 1 ) 100% );
    background-image: -moz-linear-gradient( top, rgba( 255, 255, 255, 0 ) 0%, rgba( 255, 255, 255, 1 ) 100% );
    background-image: -ms-linear-gradient( top, rgba( 255, 255, 255, 0 ) 0%, rgba( 255, 255, 255, 1 ) 100% );
    background-image: -o-linear-gradient( top, rgba( 255, 255, 255, 0 ) 0%, rgba( 255, 255, 255, 1 ) 100% );
    background-image: -webkit-linear-gradient( top, rgba( 255, 255, 255, 0 ) 0%, rgba( 255, 255, 255, 1 ) 100% );
    content: "\00a0";
    height: 10%;
    position: absolute;
    width: 100%;
    bottom: 100px;
    left: 0;
} */

.plus {
    transform: rotate(45deg);
}

#panel-title {
    font-weight: 600;
    font-size: 14px;
    text-transform: uppercase;
    letter-spacing: .5px;
}
#dots {
    float: right;
    width: 35px;
    margin-right: 30px;
}
#dots-all {
    display: inline;
}
#panel-date {
    float: right;
    color: #8E8E8E;
    font-size: 13px;
    margin-top: -10px;
}
#trash {
    height: 21px;
    float: right;
    opacity: .6;
}
.dropdown-content{
    position: absolute;
    background-color: white;
    min-width: 150px;
    overflow: auto;
    box-shadow: 0px 8px 16px 0px rgba(0,0,0,0.2);
    z-index: 1;
    border-radius: 10px;
    left:174px;
}
 .dropdown-content li:hover {background-color: #f1f1f1;}
.dropdown-content li {
    color: black;
    padding: 12px 16px;
    text-decoration: none;
    display: block;
}
</style>
