# Trivia Game 🧩

## Project Context 💡

Quiz game with varying topics and a local ranking. The game consists of a round of 5 questions where the user can choose the theme, difficulty, and type of questions, which can be multiple choice or true/false. At the end of a round, the player can view their performance, and if it is good, they will be registered in a local ranking.
This application supports two languages: English (en) and Portuguese (pt-BR). The translations were done mixing dynamic and static translation files. I used i18next for the static translations and Google Translate API for the dynamic translations (reference to APIs below).

## Main Technologies used in this project 🧰

<img
    alt="Static Badge"
    src="https://img.shields.io/badge/typescript-%23007ACC.svg?style=for-the-badge&logo=typescript&logoColor=white" 
    style="margin-bottom: 4px;" 
    height="30px" 
/>
<img
    alt="Static Badge"
    src="https://img.shields.io/badge/react-%2320232a.svg?style=for-the-badge&logo=react&logoColor=%2361DAFB" 
    style="margin-bottom: 4px;" 
    height="30px"
/>
<br>
<img
    alt="Static Badge"
    src="https://img.shields.io/badge/Styled%20Components-black?style=for-the-badge&logo=styledcomponents&logoColor=%23DB7093"
    style="margin-bottom: 4px;"
    height="30px"
/>
<img 
    alt="Static Badge" 
    src="https://img.shields.io/badge/Redux-%23764ABC?style=for-the-badge&logo=redux&logoColor=white"
    style="margin-bottom: 4px;"
    height="30px"
/>
<img 
    alt="Static Badge" 
    src="https://img.shields.io/badge/i18next-%2326A69A?style=for-the-badge&logo=i18next&logoColor=white"
    style="margin-bottom: 4px;"
    height="30px"
/>
<br>
<img
    alt="Static Badge"
    src="https://img.shields.io/badge/Testing%20Library-%23E33332?style=for-the-badge&logo=testinglibrary&logoColor=white" 
    style="margin-bottom: 4px;" 
    height="30px"
/>
<img
    alt="Static Badge"
    src="https://img.shields.io/badge/vitest-%236E9F18?style=for-the-badge&logo=vitest&logoColor=white"
    style="margin-bottom: 4px;" 
    height="30px"
/>

## APIs used in this project 🌐
- [Open Trivia Database](https://opentdb.com/): The core API used in this project. that's where the questions for the game is coming from!
- [Gravatar](https://docs.gravatar.com/): Used for getting players' image in an easy way.
- [Google translate](https://cloud.google.com/translate/docs/reference/rest): Used to translate some dynamic texts.

## Running the application ⚙️

1. Cloning and entering the repository
    ```sh
    git clone git@github.com:ImVictorM/Trivia-Game.git && cd Trivia-Game
    ```

2. Install dependencies
   ```sh
   npm install
   ```

3. Start the application
  - To start in development mode:
    ```sh
    npm run dev
    ```

  - To start in production mode:
    ```sh
    npm run build && npm run preview
    ```

## Testing 🛠️
- Running all tests:
    ```sh
    npm test
    ```
- Running a specific test:
    ```sh
    npm test -t {test_file_name}
    ```
- Running test coverage:
    ```sh
    npm run test:coverage
    ```
- Running tests in the browser:
    ```sh
    npm run test:ui
    ```

