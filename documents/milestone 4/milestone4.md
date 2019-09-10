# Milestone 4: Implementation

# Object Structure
- projects
  - project[n]
    - projectName
    - projectID
    - measure
    - description
    - entries
        - entryID
        - date
        - notes
        - measure
        - value
  - project[n+1]
    - ...

**Example JSON Format:**

```
projects: {
  project0: {
    "projectName":"guitar",
    "projectID":1,
    "measure":"time",
    "description":"project description blah blah blah"
    "entries": {
        "entry0" = {
            "entryID":1,
            "date":"10/12/18",
            "notes":"notes notes notes notes",
            "value":"18"
        },

        "entry1" = {
          "entryID": 2,
          "date": "10/13/18",
          "notes": "I did this and that today",
          "value": "15"
        },
      }
    },

    project1: {
      "projectName":"smoking",
      "projectID":2,
      "measure":"smoke breaks",
      "description":"project description blah blah blah"
      "entries": {
          "entry0" = {
              "entryID":1,
              "date":"1/12/18",
              "notes":"notes notes notes notes",
              "value":"2"
          },

          "entry1" = {
            "entryID": 2,
            "date": "1/13/18",
            "notes": "I did this and that today",
            "value": "4"
          },
        }
      },
    }
```
# Branching Strategy

We will be using a feature-based approach, as multiple people may be working on the same feature. Make sure to write meaningful commits that explain each change.

[DOCUMENT BRANCHES AS YOU GO]:

For Example:
  - Project Creation
    - Duration: 2 weeks
    - Topic: Creating projects within the application
    - Description: ...
