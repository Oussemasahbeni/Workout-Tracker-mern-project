# Workout Tracker MERN Project

[![Owner](https://img.shields.io/badge/owner-oussema--sahbeni-blue)](https://github.com/Oussemasahbeni)
[![Admin](https://img.shields.io/badge/admin-oussema--sahbeni-red)](https://github.com/Oussemasahbeni)
[![Open issues](https://img.shields.io/github/issues/oussema-sahbeni/Workout_tracker)](https://github.com/Oussemasahbeni/Workout-Tracker-mern-project/issues)
[![Analytics](https://img.shields.io/badge/analytics-ossinsight-red)](https://ossinsight.io/analyze/Oussemasahbeni/Oussemasahbeni)
[![Views](https://hits.seeyoufarm.com/api/count/incr/badge.svg?url=https%3A%2F%2Fgithub.com%2FOussemasahbeni%2FOussemasahbeni&count_bg=%2379C83D&title_bg=%23555555&icon=&icon_color=%23E7E7E7&title=hits&edge_flat=false)](https://hits.seeyoufarm.com)

<br>

## Project 🌐 Overview:

#### 1. Introduction: <br>
  - This is a full-stack MERN project that allows users to track their workouts. Users can log exercises, view their workout history, and monitor their progress over time.
 <br>

#### 2. Problem Statement: <br>
  - Traditional workout tracking methods lack cohesion and accessibility, leading to disjointed exercise monitoring and limited progress analysis for users.. <br>

#### 3. Solution: <br>
  - <b>Introducing a comprehensive MERN-based platform, enabling seamless exercise logging, comprehensive workout history tracking, and personalized progress visualization, empowering users to optimize their fitness journey efficiently. <br>

<br>

## Project Features 🚀:

## Features
### Authentication and Authorization:
- [x] Secure user registration and login.
- [X] Role-based access control for trainers, athletes, and administrators.

### Profile Management:
- [X] Easy creation and maintenance of user profiles with essential details.
- [X] Trainers can input workout plans and progress updates.

### Workout Tracking:
- [X] Detailed display of exercise routines and performance metrics.
- [X] Comprehensive tracking of workout history and progress.

### Goal Setting:
- [X] Setting and monitoring fitness goals for better progress tracking.

### Non-Functional Requirements:
- Security: Implementing robust measures to protect user data.
- User Experience: Providing a seamless and intuitive interface.
- Performance: Ensuring swift response times and system efficiency for optimal user experience.

<be>

## Technologies Used 🛠️:

#### Backend:
| Tool           | Version  | Description                          | Logo |
| -------------- | -------- | ------------------------------------ | ---- |
| Node.js (back) | 1.0.0    | Server-side JavaScript runtime       | <img height="27" src="https://img.shields.io/badge/node.js-%23339933.svg?style=for-the-badge&logo=node.js&logoColor=white" alt="Node.js" title="Node.js"> |
| Express        | 4.18.2   | Web application framework for Node.js| <img height="27" src="https://img.shields.io/badge/express-%23404d59.svg?style=for-the-badge&logo=express&logoColor=white" alt="Express" title="Express"> |
| MongoDB        | 8.0.0    | NoSQL database                       | <img height="27" src="https://img.shields.io/badge/mongodb-%234ea94b.svg?style=for-the-badge&logo=mongodb&logoColor=white" alt="MongoDB" title="MongoDB"> |
| JWT            | 9.0.2    | JSON Web Token for authentication    | <img height="27" src="https://img.shields.io/badge/jwt-%232C3E50.svg?style=for-the-badge&logo=json-web-tokens&logoColor=white" alt="JWT" title="JWT">  |
| Cypress        | 13.6.0   | End-to-end testing framework         | <img height="27" src="https://img.shields.io/badge/cypress-%23E44D27.svg?style=for-the-badge&logo=cypress&logoColor=white" alt="Cypress" title="Cypress"> |
| Bcrypt.js      | 2.4.3    | Password hashing library             | -    |

#### Frontend:
| Tool                      | Version  | Description                             | Logo |
| ------------------------- | -------- | --------------------------------------- | ---- |
| React (front)             | 18.2.0   | Javascript web application framework    | <img height="27" src="https://img.shields.io/badge/React-%23DD0031.svg?style=for-the-badge&logo=React&logoColor=white" alt="react" title="React"> |
| PrimeReact                | 10.1.0   | React UI component library              | <img height="27" src="https://img.shields.io/badge/primeReact-%23323330.svg?style=for-the-badge&logo=React&logoColor=white" alt="PrimeReact" title="PrimeReact"> |
| tailwindcss               | 3.3.5    | CSS freamework                          | <img height="27" src="https://img.shields.io/badge/tailwindcss-%23004A5F.svg?style=for-the-badge&logo=tailwindcss&logoColor=white" alt="tailwindcss" title="tailwindcss"> |
| Cypress                   | 13.6.0    | End-to-end testing framework            | <img height="27" src="https://img.shields.io/badge/cypress-%23E44D27.svg?style=for-the-badge&logo=cypress&logoColor=white" alt="Cypress" title="Cypress"> |

#### Additional Libraries 📚:
  - **Cypress Slow Down**: 1.3.1 - Middleware to slow down responses during testing.
  - **PrimeFlex**: 3.3.0 - A lightweight flexbox CSS utility library.
  - **PrimeIcons**: 6.0.1 - Icon library for PrimeNG.

### Prerequisites

- Node.js installed on your machine
- MongoDB instance (local or remote)

## Installation 📥 :

Follow these steps to set up and run the PharmaLab project locally: <br>

#### Clone the Repository:
```
https://github.com/Oussemasahbeni/Workout-Tracker-mern-project.git
```

#### Install and Set Up the Backend:

1. Navigate to the Backend Directory:
```
cd Workout-Tracker-mern-project/backend
```

2. Install Backend Dependencies:
```
npm install
```

3. Configure Environment Variables:
  - Create a .env file in the back directory.
  - Set up necessary variables such as database connection details, JWT secret, etc.

  
4. Run the Express Backend:
```
npm start
```

<br>

> The Express backend should be running at http://4000 or the port you set up in your .env file

#### Install and Set Up the Frontend:

1. Navigate to the Frontend Directory:
```
cd Workout-Tracker-mern-project/frontend
```

2. Install Frontend Dependencies:
```
npm install
```

3. Configure React Environment::
  - Update configuration in the .env with backend API URL, etc.

  
4. Run the React Frontend:
```
npm start
```

<br>

> The react frontend should be running at http://localhost:3000.

> Now, the project is cloned, and both the Express backend and react frontend are set up locally. Adjust the instructions based on your project structure and requirements.

<br>


<br>

## Contributing 🤝:

We welcome contributions to PharmaLab! Follow these guidelines to get started:

### Coding Standards:
Follow the coding standards and conventions outlined in the <a href="https://github.com/Oussemasahbeni/Workout-Tracker-mern-project/blob/main/CONTRIBUTING">CONTRIBUTING.md</a> file. <br>
Maintain code readability and consistency.
<br>

### Submitting Pull Requests:

1. Create a New Branch:
```
git checkout -b feature/your-feature-name
```
   
2. Make Changes and Commit:
  - Implement your changes and commit them.
```
git commit -m "Add feature: your-feature-name"
```
   
3. Push Changes to Your Fork:
```
git push origin feature/your-feature-name
```
   
4. Submit a Pull Request:
  - Open a pull request against the **`main`** branch on the <a href="https://github.com/Oussemasahbeni/Workout-Tracker-mern-project">Workout-Tracker GitHub repository</a>.
   
5. Review and Merge:
   - The maintainers will review your pull request, provide feedback, and merge it once approved.

### GitHub Issues:
If you find any issues or have feature requests, please open an issue on the Workout-Tracker GitHub Issues page.
<br>

> Thank you for contributing to Workout-Tracker! Your efforts help make this project better.

<br>

## License 📄 :

This project is licensed under the [MIT License](LICENSE.md).

🚀 **Feel free to use, modify, and distribute the codebase. Contributions are welcome!**

[MIT License](https://opensource.org/licenses/MIT)

<br>

## Acknowledgments 🙏 :

I extend my sincere appreciation to the following tools, libraries, and resources that have been instrumental in shaping and enhancing this project:

- <a href="https://nodejs.org/en">Node.js</a>: The JavaScript runtime that powers the server-side of our application.
- <a href="https://expressjs.com/">Express.js</a>: The fast, unopinionated, minimalist web framework for Node.js.
- <a href="https://react.dev/">Reactr</a>: The framework empowering the development of our dynamic frontend.
- <a href="https://www.mongodb.com/">MongoDB</a>: The flexible and scalable NoSQL database that stores our data.
- <a href="https://github.com/">GitHub</a>: The platform that facilitates collaborative coding and version control.
- <a href="https://www.cypress.io/">Cypress</a>: The end-to-end testing framework ensuring the reliability of our application.
- <a href="https://primereact.org/">PrimeReact</a>: The UI component library for react that enhances the aesthetics and functionality of our user interface.

> These tools and resources have played a crucial role in bringing our vision to fruition. We express our gratitude to the dedicated individuals behind these projects and the broader open-source community. 🙌

<br>

## Contact 📧:
For any questions, issues, or collaboration inquiries related to PharmaLab, feel free to reach out to us:
  - Email: oussemasahbeni300@gmail.com
  - GitHub Issues: <a href="https://github.com/Oussemasahbeni/Workout-Tracker-mern-project/issues"> Workout-Tracker GitHub Issues </a>
  - Collaboration: We welcome contributions! Check out our <a href="https://github.com/Oussemasahbeni/Workout-Tracker-mern-project/blob/main/CONTRIBUTING">Contribution Guidelines</a> for details.


> Connect with me and be a part of enhancing Workout-Tracker! We appreciate your feedback and contributions.





