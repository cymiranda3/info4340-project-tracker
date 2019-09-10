# Scenario Revisions from Milestone 2

## **Note to Instructors:** 
Upon review of our Milestone 2 Feedback, we have revised our scenarios. These changes ended up factoring into how we conducted our user testing, so we have included an updated list. 

## Scenario 1 for Persona 1:

- Goal: Log an individual data point.
- Successfully Passes Testing If: The test-user can add an individual entry to an existing project

- Scenario: Serena works as a software engineer at a large company. Serena has been smoking for 25 years and smokes almost every day. Despite her best attempts, Serena is constantly unaware of how much she smokes until she finishes her pack. To manage her work stress, Serena often steps out after her lunch for a smoke-break. To combat this, Serena has begun using a new phone tracking application, which has allowed her to become aware of her smoking schedule. Serena uses this application throughout the day to log individual smoking instances in order to later remind herself how often she is smoking. 

## Scenario 1 for Persona 2:

- Goal: Set up a new project to track.
- Successfully Passes Testing If: The test-user can create a new project to track data within.

- Scenario:  Jack, 16 years young, has been playing guitar for a couple months now. He got into guitar playing because he grew up with his dad playing the instrument, and he wants to improve. As much as he enjoys music and guitar, he feels like he hasn’t really been consistent with his playing. It is hard for him to commit to something when he doesn’t stick to a schedule, and thus Jack is compelled to track his guitar playing progress. The best part is that his new phone tracking application allows him to quickly create a project which he can later add entries to.

### Scenario 1 for Persona 3:

- Goal: Record multiple types of data within one project.
- Successfully Passes Testing If: The test-user can add multiple types of data to the same project.

- Scenario: Bill is a 20-year old Spring Football player at Cornell University. He often has to cut weight for his pre-game weigh-ins. However, Bill often cheats on weekends, binge eating food and drinking lots of water. He often grows frustrated with destroying his weekly progress and he uses his new phone tracking application to help him stay on track. The best part of his new application is that he can track multiple data-sets in the same project, from how much water he is drinking to the calories he has burned. 

# User testing results

# User Test 1: Ex-Sprint Football Player who still cuts on occasion.
## **Testing Scenario 1 for Persona 3**
## **Goal: Record multiple types of data within one project.**

User is at Intro Screen:
- Faces should be on an edge or corner to give room for more info
- But, if it’s just a face, then the center is fine. 
Selects “new project”

User is at New Project Screen:
- User was confused as to what the category selection would do. - Said he wanted some sort of indication of what it would do. 

User is at Calendar Screen:
- Thinks it makes sense. Nothing to add.

User is at Entries List:
- Had a hard time distinguishing where entries started and stopped
- He suggested using different colors for different types of entries

User is at New Entry Screen:
- User wanted to be able to input data into multiple categories in the same entry and then have it split up on summary view (entries list/calendar)
- He gave example of tracking calories and body fat percentage in the same entry

## **Takeaways:** 
We may need to think about the face-placement on the intro screen and whether we include more information at first glance. We also should consider adding some sort of indication to the user regarding the functionality of the “category” field on the “new project screen”. DIfferent colors may be important for usability later on. We will want to look into allowing users to input multiple data categories in the same entry (rather than how it is now where users must add multiple entries for multiple data categories). 


# User Test 2: Student Learning how to Play Guitar
## **Testing Scenario 1 for Persona 2**
## **Goal: Set up a new project to track.**
User is at Intro Screen:
- User selects “new project” button

User is at New Project Screen:
- User said that having the checkbox above didn’t make sense to him; He suggested that the checkbox be moved below the selector or to the bottom of the menu as “None”

User is at Calendar Screen:
- No comment

User is at New Entry Screen:
- He actually commented that he liked the default category suggestion from when he created the project, but that he could also change it in the entry. 

User is at Entries List:
- No comment

## **Takeaways:**
We may want to reconsider the placement of the checkbox on the “new project” screen. However, the default category suggestion on the “new entry” page (set by the project default category, can be changed) was something that the user especially liked and should probably keep that in future iterations.


# User Test 3: Person Quitting e-Cigarettes
## **Testing Scenario 1 for Persona 1**
## **Goal: Log an individual data point.**
User is at Intro Screen:
- User selects “smoking” project

User is at Calendar Screen:
- Was initially confused how to add a new entry. Tried clicking on the calendar day to add an entry to that day. 
- Finally saw the “+” button; Clicked.

User is at New Entry Screen:
- No comment

User is at Entries List
- No comment

## **Takeaways:**
We may want to either rethink the functionality of clicking on the calendar or resize/emphasize the “new entry” button so as to draw the users’ attention to it. This was a clear problem in this user test-scenario.


