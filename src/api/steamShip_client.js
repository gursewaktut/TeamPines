
import Steamship from "@steamship/client"
// steamship api call
const url = "https://gursewaktut.steamship.run/teampines-t91i66/teampines"

//const apiKey = "23A44372-4E75-4947-906B-A140E890BECA";
const steamship = new Steamship({
    apiKey : "23A44372-4E75-4947-906B-A140E890BECA"
});
const questions = [
    { id: 1, text: " Write a program to print the given number is odd or even." },
    { id: 2, text: " Write a program to find the given number is positive or negative." },
    { id: 3, text: " Write a program to find the sum of two numbers." },
    { id: 4, text: " Write a program to find if the given number is prime or not." },
    { id: 5, text: " Write a program to check if the given number is palindrome or not." }
]

export const fetchQuestion = async () => 
{

    try 
    {
        console.log('fetching question');
        const randomInteger = Math.floor(Math.random() * 5);
        console.log(randomInteger);
        console.log(questions[randomInteger]);
        return JSON.stringify({ API: "Steamship", question: questions[randomInteger] });
      } 
      
      catch (error) 
      {
        // Handle errors during the API call
        console.error('Error fetching question:', error);
    
        // Return a JSON string with an error message
        return JSON.stringify({ error: 'Failed to fetch question' });
      }
};


export const checkAnswer = () => {
    return JSON.stringify({APIAnswer: "Steamship"});
}

export const sendMessageToSteamship = async (message) => {


    const response = await steamship.agent.respond({
        url: url,
        input: {
            prompt: `${message}`,
            context_id: "4444" // Think of this as the chatroom name.
        }
    });

    //const json = await response.json();
    //        var newCode = response[0].text.match(/```python([^`]*)```/)[1];
    //        setCode(newCode);
    //        console.log(newCode);

    //console.log(response[0].text);
    //const json = await JSON.parse(response);
    return response[0].text;
    //return JSON.stringify({text: "hello"});
};
