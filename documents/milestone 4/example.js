// myObj = {
//     "name":"John",
//     "age":30,
//     "cars": {
//         "car1":"Ford",
//         "car2":"BMW",
//         "car3":"Fiat"
//     }
//  }

var myProjects = {
  project0 = {
    "projectName":"guitar",
    "projectID":1,
    "measure":"time",
    "description":"project description blah blah blah",
    "entries": {
        "entry0" : {
            "entryID": 1,
            "date":"10/12/18",
            "notes":"notes notes notes notes",
            "value":"18"
        },

        "entry1" : {
          "entryID": 2,
          "date": "10/13/18",
          "notes": "I did this and that today",
          "value": "15"
        },
      }
    },
    project1 = {
      "projectName":"smoking",
      "projectID":2,
      "measure":"smoke breaks",
      "description":"project description blah blah blah",
      "entries": {
          "entry0": {
              "entryID":1,
              "date":"1/12/18",
              "notes":"notes notes notes notes",
              "value":"2"
          },

          "entry1": {
            "entryID": 2,
            "date": "1/13/18",
            "notes": "I did this and that today",
            "value": "4"
          },
        }
      },
    }


// JSON can be accessed via "dot-notation" or "bracket-notation"
// x = myObj.cars.car2;
// or:
// x = myObj.cars["car2"];
