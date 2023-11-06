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

### Technology Stack


## Frontend:
 React.js: Chosen for its component-based architecture, JSX syntax, and easy integration with other libraries. 
 [ReactJS Tutorial](https://react.dev/learn)
 [React with API Tutorial](https://www.freecodecamp.org/news/how-to-consume-rest-apis-in-react/)
 Chakra UI: For its customizability, consistent design language, and seamless integration with React.
## Backend:
 Python: Primary language for backend to integrate with the Steamship API and other backend functionalities.
## Testing:
 Jest: A JavaScript testing framework for unit testing React components.
 Selenium: For end-to-end testing and ensuring cross-browser compatibility.
 [Jest Tutorial](https://www.digitalocean.com/community/tutorials/how-to-test-a-react-app-with-jest-and-react-testing-library)
## CI/CD:
 GitHub Actions: For its seamless integration with Git, easy configuration, and automation capabilities.
 [Jenkins with React and NPM](https://www.jenkins.io/doc/tutorials/build-a-node-js-and-react-app-with-npm/)
 [GitHub Actions](https://docs.github.com/en/actions/learn-github-actions)
## Hosting:
 Replit: For collaborative coding and rapid prototyping. [Replit](https://replit.com)
 Netlify: For hosting the frontend, given its ease of use and continuous deployment features.[Netlify](https://www.netlify.com)

### APIs Chosen

## HackerEarth:
Multi-Language Support: To cater to learners interested in different programming languages.
Code Execution and Compilation: To provide real-world coding experience.
Error Retrieval: To help learners understand and correct their coding mistakes.

## Steamship:
Tutor Character: To personalize the learning experience with various tutor personalities.
Images Evaluation: To allow learners to upload code snapshots for analysis.
Solution Bot: To provide interactive learning and problem-solving experiences.

## Planned features per API

# HackerEarth:
Interactive Coding Environment: Where users can write, execute, and see the output of their code in multiple languages.
Error Analysis and Feedback: Providing detailed explanations for any errors in the code.
Real-time Code Execution: Allowing users to experience the immediate results of their coding, mimicking a real-world coding environment.

# Steamship:
Tutor Personalization: Users can choose a tutor personality that aligns with their learning style.
Code Snapshot Analysis: Users can upload images of code, which will be analyzed and explained.
Interactive Solution Bot: A chatbot to guide users through coding challenges and explain complex concepts.

### Work breakdown structure (WBS)

## Link to WBS

[WBS](https://lucid.app/lucidchart/879f1dbb-78f5-41e1-a718-9a2486baef51/edit?viewport_loc=-1233%2C-201%2C6190%2C3565%2C0_0&invitationId=inv_f070db37-c5b0-478e-a40a-9de07e8b78b3)


Image Below 



### Project Schedule 

We are using Notion to keep us organized and to run our Sprints effectively. 


Screenshot from Notion Sprint Board 
Sprint 1: Initialization & Setup (Week 1)
Day 1: Team kickoff meeting, defining roles and responsibilities.
Day 2: Project setup and environment configuration for both frontend and backend.
Days 3-4: Initial setup of React.js and Chakra UI for the frontend.
Days 5-6: Basic integration of HackerEarth and Steamship APIs, ensuring connectivity and basic functionality.
Day 7: Initial UI mockups and design, creating wireframes for key screens.

Sprint 2: Core Features Development (Week 2)
Days 1-2: Development of the user authentication system (login, registration).
Days 3-4: Development of the interactive coding environment using HackerEarth API (code editor, execution environment).
Days 5-6: Implementation of tutor selection and personalization features using the Steamship API.
Day 7: Start Jest unit testing for developed features and setup continuous integration with GitHub Actions.

Sprint 3: Advanced Features & Integration (Week 3)
Days 1-2: Development of the image code analysis feature using Steamship API.
Days 3-4: Development and integration of error feedback systems for the coding environment.
Days 5-6: Enhancement of the interactive solution bot for a more engaging learning experience.
Day 7: Conducting end-to-end testing with Selenium and addressing any identified issues.

Sprint 4: Finalization & Deployment (Week 4)
Days 1-2: Finalization of all features and bug fixing based on testing results.
Days 3-4: Documentation of code and creation of user manuals.
Days 5-6: Deployment of the application on Replit and Netlify, ensuring smooth CI/CD with GitHub Actions.
Day 7: Collect feedback, conduct a project retrospective, and plan for post-launch maintenance and updates.

Additional Notes:
Regular stand-up meetings at the start of each day to discuss progress, roadblocks, and plans for the day.
End-of-sprint reviews and planning for the next sprint on the last day of each sprint.
Mid-sprint feedback sessions with stakeholders to validate features and gather early feedback.
Continuous risk assessment and contingency planning throughout the project.
This refined timeline offers a detailed breakdown of tasks and activities for each sprint, ensuring clarity and focus for the team. It also incorporates continuous testing, feedback, and risk management, aligning with Agile principles for a successful project execution.

### Wireframe and Prototype 

Link to Wireframes
[Wireframes](https://www.figma.com/file/0b3kDLGjrKQC88linKnlvs/Untitled?type=design&node-id=0%3A1&mode=design&t=QrM2IHbhpaON7RKV-1)

Image Below

### Data Flow Diagram

Using Lucidchart, the Level 0 and Level 1 DFDs provide adequate detail on interaction between different data on the web application. The link to the workspace as well as images for both levels (scaled down in size due to size limitation of the document) are below. 

[Links to DFDs for better view 🔗](https://lucid.app/lucidchart/fc61c0cc-849a-44a5-be1d-570bdcf4cd1d/edit?viewport_loc=-2511%2C-2633%2C5117%2C2537%2C0_0&invitationId=inv_77c6ab09-2a82-4f07-9478-5a536c7ff7d9)

