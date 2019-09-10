<template>
  <div class="add-container">
    <nav>
      <a href="" id="back"><img src='../assets/arrow-back.svg' /></a>
      <p>New Entry </p>
    </nav>

    <div class="add-form-container">
      <form id="add-form">
        <div class="input-row">
          <div class="add-label"><lable >Name </lable></div>
          <div class="add-input"><input type="text" name="name" /></div>
        </div>
        <div class="input-row">
          <div class="add-label" id="label_desc"><lable >Description </lable></div>
          <div class="add-input"><textarea name="description" /></div>
        </div>
        <div class="input-row">
          <div class="add-label" ><lable >Measure </lable></div>
          <div class="add-input">
            <select name="measure">
              <option value="hours">Hours</option>
              <option value="minutes">Minutes</option>
              <option value="calories">Calories</option>
              <option value="miles">Miles</option>
            </select>
          </div>
        </div>
      </form>
      <button class="btn-submit" @click="getForm()">Start Tracking! </button>
    </div>
  </div>
  
</template>

<script>
export default {
  name: 'NewEntry',
  props: {
    msg: String
  },
  methods: {
    getForm() {
    var all_complete = true;
    var elements = document.getElementById("add-form").elements;
    var obj ={};
    for(var i = 0 ; i < elements.length ; i++){
        var item = elements.item(i);
        obj[item.name] = item.value;
        if(item.name == "name" && item.value==""){
          item.classList.add("incomplete-field");
          all_complete = false;
        }
    }
    if (all_complete === true) {
      //add project to json file
      console.log(JSON.stringify(obj))
    }
}
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

</style>
