
<template>

    <div>
        <div class="project-details-container">
        <nav>
        <router-link to="/" id="back"><img src='../assets/arrow-back.svg' /></router-link>
        <p>All Entries </p>
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
            <router-link :to="{ name: 'projectdetailslist', query: {index: index } }"><div class="toggle"><div >list </div></div></router-link>
            <router-link :to="{ name: 'calendarview', query: {index: index } }"><div class="toggle highlighted-toggle"><div >calendar </div></div></router-link>
        </div>
        </div>

        <div class="project-container" id="project-container-cal">
        <div class="project-title-container" v-bind:style="{ backgroundImage: 'linear-gradient(to left, ' + projectColor +' , ' + projectColor2+ ')' }">
            <div class="smile"> <img v-bind:src="this.face" id="face"/> </div>
            <div class="project-info">
                <div class="project-info-name"> {{projectName}} </div>
                <div class="project-info-average"> {{projectDesc}}</div>
            </div>
        </div>
    </div>
    <div id='calendar-container'>
        <span >
        <!-- <b-field>
            <b-switch v-model="bars">Bars</b-switch>
        </b-field> -->
        <b-datepicker
            v-on:input="getSpecificEntries"
            inline
            v-model="date"
            :events="events"
            :indicators="indicators"
            >
        </b-datepicker>
        </span>

        
    </div>
    <div v-if="project_entries.length >0" class="entries">
            <div class="entry-panel" v-for="entry in specificEntries" >
                <span v-if="isMeasure" id="panel-title" v-bind:style="{ color: projectColor2 }"> {{entry.measure}} {{projectMeasure}} </span>
                <p> {{entry.notes}} </p>
                <span id="panel-date"> {{entry.date}}</span>
            </div>
        </div>
    <div id='specificEntries'>

    </div>
  </div>

</template>




<script>
import smile from '../assets/smile-fill.svg';
import flat from '../assets/flat-fill.svg';
import frown from '../assets/frown-fill.svg';

import $ from "jquery";

const thisDay = new Date().getDate()
const thisMonth = new Date().getMonth()
const thisYear = new Date().getFullYear()
export default {
  computed: {
    indicators () {
      return this.bars ? 'bars' : 'dots'
    }
  },
  props: {
    index: Number
  },
  data () {
    return {
      projectColor: '',
      projectColor2: '',
      projectName: '',
      projectDesc: '',
      project_entries: [],
      specificEntries:"",
      projectMeasure:"",
      face: "",
      isMeasure: Boolean,
      date: new Date(thisYear, thisMonth, thisDay),
      events: [
        // new Date(2017, thisMonth, 2),
        // new Date(2017, thisMonth, 6),
        // {
        //     date: new Date(2017, thisMonth, 6),
        //     type: 'is-info'
        // },
        // {
        //     date: new Date(2017, thisMonth, 8),
        //     type: 'is-danger'
        // },  
      ],
      bars: false,
    }
  },
    methods: {
        getEntries() {
            var projects = localStorage.getItem("projects");
            var parsed = JSON.parse(projects);
            var project = parsed[this.index]
            this.project_entries = project.entries;
            var project_events = []
            this.project_entries.forEach(function(p){
                var dateStr = p.date
                var parts = dateStr.split("-")
                var new_date = new Date(parts[0], parts[1]-1, parts[2])
                var entry = {
                    date: new_date
                }
                project_events.push(entry);
            })
            this.events = project_events;
        },
    getProject(){
      var projects = localStorage.getItem("projects");
      var parsed = JSON.parse(projects);
      var project = parsed[this.index];
      return project;
    },
    getColor(){
      var project = this.getProject();
      this.projectColor2 = project.colors[1]
      this.projectColor = project.colors[0];

   //    $(".is-selected").css('background-color', 'red');

//$(".datepicker .datepicker-table .datepicker-body .datepicker-row .datepicker-cell.is-selected").css('background-color', 'red');

      //  $(".datepicker .datepicker-table .datepicker-body .datepicker-row .datepicker-cell.is-selected").css('background-color', this.projectColor2);
      //  $(".datepicker .datepicker-table .datepicker-body.has-events .datepicker-cell.has-event .events .event.is-primary").css('background-color', 'red !important;');

    },
    getName() {
      var last_project = this.getProject();
      this.projectName = last_project.name.charAt(0).toUpperCase() + last_project.name.slice(1)
    },
    getDesc(){
      var project = this.getProject();
      this.projectDesc = project.description;
    },
    getMeasure(){
      var project = this.getProject();
      this.projectMeasure = project.measure.charAt(0).toUpperCase() + project.measure.slice(1);
      if(project.measure == "none"){
            this.isMeasure = false;
        }
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
    getSpecificEntries() {
      //Dummy array to temporarily store all relevant dates to click.
      var eventArray = [];
      //Search through existing entries and match; Push to dummy array if they match.
      var compareDate = new Date(this.date);

      this.project_entries.forEach(function(p) {
        if(compareDate.getDate().toString().length < 2){
            var selectedDate = compareDate.getFullYear() + "-" + (compareDate.getMonth()+1) + "-0" + compareDate.getDate();
        }
        else {
            var selectedDate = compareDate.getFullYear() + "-" + (compareDate.getMonth()+1) + "-" + compareDate.getDate();
        }
        if (selectedDate == (p.date)) {
          eventArray.push(p)
        }
      })

      this.specificEntries = eventArray;
    },


    menu(){
        $(".dotmenu").show();
        
    },
},
mounted() {
    this.getEntries();
    this.getColor();
    this.getDesc();
    this.getName();
    this.getMeasure();
    this.getlastdate();
    this.getSpecificEntries();
  }
}

</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style>
#back {
    filter: invert(100%);
}
nav {
     border-bottom: .2px solid #D9D9D9;
    padding-bottom: 25px;
}
#calendar-container {
    margin: auto;
    width: 90%;
    margin-top: 40px;
}
#project-container-cal {
    padding: 0 36px;
    margin-top: -4px;
}
.project-title-container {
    color: #fff;
    box-shadow: 0 9px 20px rgba(0, 0, 0, .14);
    width: 100%;
}
.project-details-container {
    padding-bottom: 40px;
}
.dropdown-content {
    border-radius: 10px !important;
    box-shadow: 0 5px 16px 0 rgba(0, 0, 0, .13) !important;
}
.entry-panel {
    border-radius: 15px;
    padding: 25px;
    box-shadow: 0 5px 16px 0 rgba(0, 0, 0, .13);
    width: 80%;
    margin: auto auto 15px auto;
    text-align: left;
}   
.pagination {
    align-items: center !important;
}
.pagination-next{
    min-width: 2em !important;
    flex-grow: 0 !important;
    display: none !important;
}
.pagination-previous{
    min-width: 2em !important;
    flex-grow: 0 !important;
    display: none !important;
}
#face {
    height: 60px;
}
.entry-panel p {
    margin-bottom: 40px;
}

.entries {
    margin-top: 45px;
    overflow: scroll;
    margin-bottom: 50px;
}
#panel-title {
    font-weight: 600;
    font-size: 14px;
    text-transform: uppercase;
    letter-spacing: .5px;
}

#panel-date {
    float: right;
    color: #8E8E8E;
    font-size: 13px;
}
.datepicker .datepicker-table .datepicker-body.has-events .datepicker-cell {
    padding: 0.3rem 0.65rem 0.75rem !important;
}



.dropdown-item {
    width: 100%;
}
#calendar-container {
    width: 80% !important;
}


#dots-all .dropdown-content{
    position: absolute;
    background-color: white;
    min-width: 150px;
    overflow: auto;
    box-shadow: 0px 8px 16px 0px rgba(0,0,0,0.2);
    z-index: 1;
    border-radius: 10px;
    left:174px;
}
#dots-all  .dropdown-content li:hover {background-color: #f1f1f1;}
.dropdown-content li {
    color: black !important; 
    padding: 12px 16px;
    text-decoration: none;
    display: block;
    text-transform: uppercase;
    font-size: 14px;
    letter-spacing: 1px;
    text-align: left;
}
#dots-all a {
    color: black !important; 
}
nav p {
    margin-left: 65px;
}
#dots {
    float: right;
    width: 35px;
    margin-right: 30px;
}
#dots-all {
    display: inline;
}
</style>
