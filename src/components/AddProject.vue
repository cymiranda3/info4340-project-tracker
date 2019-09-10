<template>

  <div class="add-container">
    <nav>
      <router-link to="/"><a href="" id="back"><img src='../assets/arrow-back.svg' /></a></router-link>
      <p>New Project </p>
    </nav>


    <div class="add-form-container">
      <form id="add-form">
        <div class="input-row">
          <div class="add-label"><div >Name </div></div>
          <div class="add-input">
            <input type="text" name="name" @change="nameInput()" @input ="nameInput()" id="name-input"/>
          </div>
        </div>
        <div class="input-row">
          <div class="add-label" id="label_desc"><div >Description </div></div>
          <div class="add-input"><textarea name="description" /></div>
        </div>
        <div class="input-row">
          <div class="add-label" ><div >Measure </div></div>
          <div class="add-input">
            <select name="measure" id="measure" @change="dropdownSelect()">
              <option value="hours">Hours</option>
              <option value="minutes">Minutes</option>
              <option value="calories">Calories</option>
              <option value="miles">Miles</option>
              <option value="dollars">Dollars</option>
              <option value="none">None</option>
              <option value="newmeasure" id="newmeasure">Add New Measure</option>

            </select>
            
          </div>
        </div>
      </form>
      <router-link :to="{ name: 'addentry', query: {index: index } }"><button class="btn-submit" id="btn-submit" @click="getForm()">Start Tracking! </button></router-link>
    </div>

    <div class="pop-modal" id="add-new-modal">
      <h1>New measurement </h1>
      <form id="new-measure-form">
        <input type="text" name="new_measurement" id="new_measurement"/>
      </form>
      <div class="button-row">
        <button id="cancel" class='btn' @click="cancel()">Cancel</button>
        <button id="add" class='btn' @click="add()">Add </button>
      </div>
    </div>
  </div>
  
</template>

<script>
export default {
  name: 'AddProject',
  props: ['addProject'],
  data(){
    return {
      isOpen: this.addProject,
      index: Number
    }
  },
  methods: {
      nameInput(){
        if(document.getElementById("name-input").value.length > 0){
          document.getElementById("name-input").classList.remove("incomplete-field");
          document.getElementById("btn-submit").style.opacity = 1;
          document.getElementById("btn-submit").style.color = "black";
          document.getElementById("btn-submit").style.boxShadow = "0 9px 20px rgba(0, 0, 0, .2)";
        } 
        else {
          document.getElementById("btn-submit").style.opacity = .6;
          document.getElementById("btn-submit").style.boxShadow = "none";
        }
      },
      dropdownSelect(){
        if(document.getElementById("measure").value === "newmeasure"){
          console.log('add new!');
          document.getElementById("add-new-modal").classList.add("visible");
        }
      },
      cancel(){
        document.getElementById("add-new-modal").classList.remove("visible");
      },
      add(){
        var new_measure = document.getElementById("new_measurement").value;
        document.getElementById("newmeasure").innerText = new_measure;
         document.getElementById("newmeasure").value = new_measure;
         document.getElementById("add-new-modal").classList.remove("visible");
      },
      getIndex(){
         if(localStorage.getItem("projects") === null) { 
           this.index = 0
         }
         else {
            var projects = localStorage.getItem("projects");
            var parsed = JSON.parse(projects)
            this.index = parsed.length;
         }
        

      },
      getForm() {
        var colors = [["#E945E3", "#FD353B"], ["#D46CFF", "#813FCC"], ["#1FADFF", "#B220FF"], ["#c3f0c8", "#509bf5"], ["#f037a6", "#ffc867"]];
        var projects = localStorage.getItem("projects");
        if(localStorage.getItem("projects") === null) { current_num = 0}
        else { 
          if(localStorage.getItem("archive")=== null){
              var current_num =  JSON.parse(projects).length; 
          }
          else {
            var len = JSON.parse(localStorage.getItem("archive")).length;
            console.log(len)
            var current_num = JSON.parse(projects).length + len;
          }
          
        }
        var color_index = current_num <5 ? current_num :  current_num%5;
        var all_complete = true;
        var elements = document.getElementById("add-form").elements;
        var obj ={};
        var current_entries = [];
        if(localStorage.getItem("projects") === null){
          localStorage.setItem("projects", JSON.stringify([]));
          localStorage.setItem("archive", JSON.stringify([]));
          localStorage.setItem("entryArchive", JSON.stringify([]));
        }
        for(var i = 0 ; i < elements.length ; i++){
            var item = elements.item(i);
            obj[item.name] = item.value;
            if(item.name == "name" && item.value==""){
              item.classList.add("incomplete-field");
              all_complete = false;
            }
        }
        obj["colors"] = colors[color_index];
        obj["entries"] = [];
        if (all_complete === true) {
          var project = JSON.stringify(obj)
          current_entries = JSON.parse(localStorage.getItem("projects"))
          current_entries.push(obj)

          var all_entries = JSON.stringify(current_entries);
          localStorage.setItem("projects", all_entries);
          this.isOpen = false;
          this.$emit('hideScreen', 'addProject');
        }
    }
  },
  mounted(){
    this.getIndex();
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

body{
color: #2c3e50; 
}

nav p{
  color: black;
  margin: 0;
}


</style>
