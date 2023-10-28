# TeamPines

CMPT 276 project

# User Stories

## User Stories for SFU's API:

1. As a Course Explorer:
Scenario:

- A prospective student wants to explore the courses ofered by SFU.
- Student goes on to our website, and visits the course exploration page on the website.
- The student can check look at all the courses offered at SFU and filter the results based on various criteria.
- The website makes requests to the SFU API and displays all the results that it receives from the API.
- The results are shown to the user in a very well polished layout, which makes it easier for the student
    to understand what each course is about and the general layout of the course.

Acceptance Criteria:

- The website should have a visually appealing interface with a clear presentation of the courses.
- Each course should be displayed with its name, description, instructor, and prerequisites if any.

2. As a Schedule Planner:

Scenario:

- A student is trying to plan his upcoming semester.
- The student visits course planner website and navigates to the schedule planning section.
- The website requests SFU's API to fetch course schedules and present them in an organized manner, including class timings, locations, and details about associated labs or tutorials.
- The student adds the desired courses to his personalized list.
- The student then checks the schedule for the next semester from the personalized list.

Acceptance Criteria:

- The website should provide an intuitive interface for viewing and organizing the course schedule.
- Each course entry in the schedule should include details such as class timings, locations, and information about associated labs or tutorials.

## User Stories for ChatGPT's NLP AI:

1. As a Course Recommender:

Scenario:

- A student wants course recomendations based on his interests.
- The student goes on to the websites and visits the course recomender page.
- The student enters his interests and preferences through the website's recommendation form,
- The website then sends the form data and the SFU course offerings to the GPT's nlp API to get personalized recomendations for courses.
- The reponse received back from the GPT is then presented to the Student with a few options.
- The student can go through the recomended list and check the details of each course

Acceptance Criteria:

- The website's recommendation form should be easy to use and intuitive.
- The recommendations provided by ChatGPT should be integrated seamlessly into the website's interface.

2. As a Decision Support Tool:

Scenario:

- A student has some preferences and a shortlist of courses he would like to take but can't make a decision.
- The student goes on to the webiste decision assistance page and enters his preferences and the course shortlist in the form.
- The courses list and the preferences are sent to the GPT api to get a better informed decision.
- The student is presented with a list of recomended courses with most favorable course on the top and least favorable at the end of the list

Acceptance Criteria:

- The decision support feature on the website should guide the user through inputting relevant details.
- The results should be presented on the website in a user-friendly manner, summarizing the pros and cons of each course.

# TECH STACK

### Frontend

- React js [Basic react tutorial](https://react.dev/learn) | [React with api tutorials](https://www.freecodecamp.org/news/how-to-consume-rest-apis-in-react/)
- Chakra UI
- If needed Bootstrap and other css/js libraries
    
### Backend (if needed)

- Nodejs [Node js](https://nodejs.org/en/docs/guides/getting-started-guidehttps://nodejs.org/en/docs/guides/getting-started-guide)

### Testing

- Jest [Tutorial](https://www.digitalocean.com/community/tutorials/how-to-test-a-react-app-with-jest-and-react-testing-library)
- Selenium

### CI/CD

- [Jenkins with react and npm](https://www.jenkins.io/doc/tutorials/build-a-node-js-and-react-app-with-npm/) / [Github actions](https://docs.github.com/en/actions/learn-github-actions)

### Hosting

- [Replit](https://replit.com/)
- [Netlify](https://www.netlify.com/)

# Sample Work Breakdown Structure (created by Lucid-chart)

Here is a link to sample WBS structure created for milestone 1 of the CMPT276 project. 
[SampleWBS#1](https://lucid.app/lucidchart/879f1dbb-78f5-41e1-a718-9a2486baef51/edit?viewport_loc=-35%2C43%2C2492%2C1436%2C0_0&invitationId=inv_f070db37-c5b0-478e-a40a-9de07e8b78b3)