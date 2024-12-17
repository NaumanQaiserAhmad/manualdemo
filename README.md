***App Overview***

The app includes a Landing Screen, where the user chooses between "Learn More" and taking the Quiz.
Quiz Questions are dynamically loaded from a JSON file and displayed to the user with options (images/text).
The user’s answers will guide them to a Result Screen, either recommending a treatment or advising against it based on the answers.


***Features:***

***Landing Screen:***
Users can navigate to either the "Learn More" section or the quiz.

***Learn More Screen:***
Displays the information about the hair loss treatment.

***Quiz Screen:***
Displays quiz questions loaded from a JSON file.
Options are presented dynamically as either images or text.

***Result Screen:***
Shows the result after completing the quiz.
Informs the user whether they qualify for the treatment based on their answers.
Data Flow

***Presentation Layer:*** Contains UI components and screens such as landingscreen.js, LearnMoreScreen.js, QuizScreen.js, ResultScreen.js.

These interact with the domain layer to fetch data and display it to the user.

***Domain Layer:*** Contains use cases (GetLearnMoreData.js, GetQuizData.js) that define business logic for fetching data.

The use cases interact with repositories to fetch the data from the data layer.

***Data Layer:*** Manages data, interacting with local data sources (LocalLearnMoreDataSource.js, LocalQuizDataSource.js).

***Repositories*** (LearnMoreRepository.js, QuizRepository.js) fetch the data and pass it to the domain layer.


***Directory Structure***

<img width="550" alt="Screenshot 2024-12-17 at 02 50 53" src="https://github.com/user-attachments/assets/98aeb4be-fda3-4f27-ae1e-7d6fed01b065" />
