/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> } 
 */

exports.seed = async function(knex) {
    await knex('questions').del();
    
    for (const questionData of questionsData) {
      const { incorrect_answers, ...question } = questionData;
      const insertedQuestion = await knex('questions').insert(question).returning('*');
      
      const answers = incorrect_answers.map(answer => ({ answer, is_correct: false }));
      answers.push({ answer: question.correct_answer, is_correct: true });
      
      for (const answerData of answers) {
        await knex('answers').insert({
          question_id: insertedQuestion[0].id,
          ...answerData
        });
      }
    }
  };

const questionsData = [
    { 
        category: 'Science', 
        difficulty: 'Easy', 
        question: 'What is the chemical symbol for water?', 
        correct_answer: 'H2O', 
        incorrect_answers: ['CO2', 'NaCl', 'O2'] 
    },
    { 
        category: 'Science', 
        difficulty: 'Intermediate', 
        question: 'What is the closest planet to the Sun?', 
        correct_answer: 'Mercury', 
        incorrect_answers: ['Venus', 'Earth', 'Mars'] 
    },
    { 
        category: 'Science', 
        difficulty: 'Hard', 
        question: 'What is the atomic number of carbon?', 
        correct_answer: '6', 
        incorrect_answers: ['8', '12', '16'] 
    },
    { 
        category: 'Science', 
        difficulty: 'Easy', 
        question: 'What is the chemical symbol for gold?', 
        correct_answer: 'Au', 
        incorrect_answers: ['Ag', 'Cu', 'Fe'] 
    },
    { 
        category: 'Science', 
        difficulty: 'Intermediate', 
        question: 'What is the largest mammal in the world?', 
        correct_answer: 'Blue Whale', 
        incorrect_answers: ['African Elephant', 'Giraffe', 'Hippopotamus'] 
    },
    { 
        category: 'Technology', 
        difficulty: 'Easy', 
        question: 'What is the most popular programming language?', 
        correct_answer: 'JavaScript', 
        incorrect_answers: ['Python', 'Java', 'C++'] 
    },
    { 
        category: 'Technology', 
        difficulty: 'Intermediate', 
        question: 'Who invented the World Wide Web?', 
        correct_answer: 'Tim Berners-Lee', 
        incorrect_answers: ['Bill Gates', 'Steve Jobs', 'Mark Zuckerberg'] 
    },
    { 
        category: 'Technology', 
        difficulty: 'Hard', 
        question: 'What is the fundamental unit of computing?', 
        correct_answer: 'Bit', 
        incorrect_answers: ['Byte', 'Megabyte', 'Gigabyte'] 
    },
    { 
        category: 'Technology', 
        difficulty: 'Easy', 
        question: 'What does HTML stand for?', 
        correct_answer: 'Hypertext Markup Language', 
        incorrect_answers: ['Hyperlinks and Text Markup Language', 'Home Tool Markup Language', 'Hypertext Multiple Language'] 
    },
    { 
        category: 'Technology', 
        difficulty: 'Intermediate', 
        question: 'Who is the CEO of Tesla?', 
        correct_answer: 'Elon Musk', 
        incorrect_answers: ['Jeff Bezos', 'Tim Cook', 'Mark Zuckerberg'] 
    },
    { 
        category: 'Technology', 
        difficulty: 'Hard', 
        question: 'What is the largest tech company by revenue?', 
        correct_answer: 'Apple Inc.', 
        incorrect_answers: ['Amazon', 'Alphabet Inc.', 'Microsoft'] 
    },
    { 
        category: 'Social Sciences', 
        difficulty: 'Easy', 
        question: 'Who wrote "The Wealth of Nations"?', 
        correct_answer: 'Adam Smith', 
        incorrect_answers: ['Karl Marx', 'John Maynard Keynes', 'Friedrich Hayek'] 
    },
    { 
        category: 'Social Sciences', 
        difficulty: 'Intermediate', 
        question: 'What is the world\'s oldest known written language?', 
        correct_answer: 'Sumerian', 
        incorrect_answers: ['Latin', 'Greek', 'Egyptian hieroglyphs'] 
    },
    { 
        category: 'Social Sciences', 
        difficulty: 'Hard', 
        question: 'Who proposed the theory of cognitive dissonance?', 
        correct_answer: 'Leon Festinger', 
        incorrect_answers: ['Sigmund Freud', 'B. F. Skinner', 'Jean Piaget'] 
    },
    { 
        category: 'Social Sciences', 
        difficulty: 'Easy', 
        question: 'What is the capital of France?', 
        correct_answer: 'Paris', 
        incorrect_answers: ['Berlin', 'London', 'Rome'] 
    },
    { 
        category: 'Social Sciences', 
        difficulty: 'Intermediate', 
        question: 'Who developed the theory of relativity?', 
        correct_answer: 'Albert Einstein', 
        incorrect_answers: ['Isaac Newton', 'Galileo Galilei', 'Stephen Hawking'] 
    },
    { 
        category: 'Social Sciences', 
        difficulty: 'Hard', 
        question: 'Which country has the longest coastline in the world?', 
        correct_answer: 'Canada', 
        incorrect_answers: ['Australia', 'United States', 'Russia'] 
    },
    { 
        category: 'Social Sciences', 
        difficulty: 'Intermediate', 
        question: 'In which year did the Berlin Wall fall?', 
        correct_answer: '1989', 
        incorrect_answers: ['1991', '1987', '1993'] 
    },
    { 
        category: 'Social Sciences', 
        difficulty: 'Hard', 
        question: 'What is the study of human populations called?', 
        correct_answer: 'Demography', 
        incorrect_answers: ['Anthropology', 'Sociology', 'Geography'] 
    },
    { 
        category: 'Math', 
        difficulty: 'Easy', 
        question: 'What is the sum of angles in a triangle?', 
        correct_answer: '180 degrees', 
        incorrect_answers: ['90 degrees', '270 degrees', '360 degrees'] 
    },
    { 
        category: 'Math', 
        difficulty: 'Intermediate', 
        question: 'What is the value of the mathematical constant "pi" (π) to two decimal places?', 
        correct_answer: '3.14', 
        incorrect_answers: ['2.71', '3.16', '4.20'] 
    },
    { 
        category: 'Math', 
        difficulty: 'Hard', 
        question: 'What is the Pythagorean theorem used for?', 
        correct_answer: 'Calculating the length of sides in a right triangle', 
        incorrect_answers: ['Solving quadratic equations', 'Finding the area of a circle', 'Determining the slope of a line'] 
    },
    { 
        category: 'Math', 
        difficulty: 'Intermediate', 
        question: 'What is the area of a circle with a radius of 5 units?', 
        correct_answer: '78.54 square units', 
        incorrect_answers: ['62.80 square units', '31.42 square units', '15.71 square units'] 
    },
    { 
        category: 'Math', 
        difficulty: 'Hard', 
        question: 'What is the square root of 196?', 
        correct_answer: '14', 
        incorrect_answers: ['12', '16', '18'] 
    },
    { 
        category: 'Math', 
        difficulty: 'Easy', 
        question: 'What is the next prime number after 31?', 
        correct_answer: '37', 
        incorrect_answers: ['33', '35', '39'] 
    },
    { 
        category: 'Math', 
        difficulty: 'Intermediate', 
        question: 'What is the value of x in the equation: 2x + 5 = 15?', 
        correct_answer: '5', 
        incorrect_answers: ['10', '15', '20'] 
    },
    { 
        category: 'Math', 
        difficulty: 'Hard', 
        question: 'What is the perimeter of a rectangle with length 8 units and width 6 units?', 
        correct_answer: '28 units', 
        incorrect_answers: ['24 units', '32 units', '40 units'] 
    },
    { 
        category: 'Language', 
        difficulty: 'Easy', 
        question: 'What is the past tense of "go"?', 
        correct_answer: 'Went', 
        incorrect_answers: ['Gone', 'Goed', 'Going'] 
    },
    { 
        category: 'Language', 
        difficulty: 'Intermediate', 
        question: 'What does the Latin phrase "carpe diem" mean?', 
        correct_answer: 'Seize the day', 
        incorrect_answers: ['Love conquers all', 'In the end', 'The end of the world'] 
    },
    { 
        category: 'Language', 
        difficulty: 'Hard', 
        question: 'What is the longest word in the English language?', 
        correct_answer: 'Pneumonoultramicroscopicsilicovolcanoconiosis', 
        incorrect_answers: ['Supercalifragilisticexpialidocious', 'Antidisestablishmentarianism', 'Hippopotomonstrosesquippedaliophobia'] 
    },
    { 
        category: 'Language', 
        difficulty: 'Easy', 
        question: 'Which of the following is a correct plural form of "child"?', 
        correct_answer: 'Children', 
        incorrect_answers: ['Childs', 'Childes', 'Childs\''] 
    },
    { 
        category: 'Language', 
        difficulty: 'Intermediate', 
        question: 'What is the past participle of the verb "swim"?', 
        correct_answer: 'Swum', 
        incorrect_answers: ['Swam', 'Swemed', 'Swom'] 
    },
    { 
        category: 'Language', 
        difficulty: 'Hard', 
        question: 'Which of the following sentences is grammatically correct?', 
        correct_answer: 'Neither John nor Mary was present at the meeting.', 
        incorrect_answers: ['Neither John nor Mary were present at the meeting.', 'Neither John nor Mary has present at the meeting.', 'Neither John or Mary was present at the meeting.'] 
    },
    { 
        category: 'Language', 
        difficulty: 'Easy', 
        question: 'Which of the following is an example of a compound sentence?', 
        correct_answer: 'I went to the store, and I bought some groceries.', 
        incorrect_answers: ['He enjoys reading books.', 'She runs fast.', 'They are playing outside.'] 
    },
    { 
        category: 'Language', 
        difficulty: 'Intermediate', 
        question: 'What is the correct spelling of the plural form of "cactus"?', 
        correct_answer: 'Cacti', 
        incorrect_answers: ['Cactuses', 'Cactuses', 'Cactuss'] 
    },
    { 
        category: 'Language', 
        difficulty: 'Hard', 
        question: 'Which of the following sentences is grammatically correct?', 
        correct_answer: 'The dog, which was black and white, chased the cat.', 
        incorrect_answers: ['The dog which was black and white chased the cat.', 'The dog which was black and white, chased the cat.', 'The dog which, was black and white, chased the cat.'] 
    },
    { 
        category: 'General Knowledge', 
        difficulty: 'Easy', 
        question: 'What is the capital of Canada?', 
        correct_answer: 'Ottawa', 
        incorrect_answers: ['Toronto', 'Montreal', 'Vancouver'] 
    },
    { 
        category: 'General Knowledge', 
        difficulty: 'Intermediate', 
        question: 'Who directed the movie "Jurassic Park"?', 
        correct_answer: 'Steven Spielberg', 
        incorrect_answers: ['George Lucas', 'James Cameron', 'Christopher Nolan'] 
    },
    { 
        category: 'General Knowledge', 
        difficulty: 'Hard', 
        question: 'Which planet is known as the "Red Planet"?', 
        correct_answer: 'Mars', 
        incorrect_answers: ['Venus', 'Jupiter', 'Saturn'] 
    },
    { 
        category: 'General Knowledge', 
        difficulty: 'Hard', 
        question: 'Which language has the most native speakers worldwide?', 
        correct_answer: 'Mandarin Chinese', 
        incorrect_answers: ['English', 'Spanish', 'Hindi'] 
    },
    { 
        category: 'General Knowledge', 
        difficulty: 'Easy', 
        question: 'What is the official language of Brazil?', 
        correct_answer: 'Portuguese', 
        incorrect_answers: ['Spanish', 'English', 'French'] 
    },
    
  ];
  

  