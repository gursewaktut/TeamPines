import Steamship from "@steamship/client"
// steamship api call
const url = "https://gursewaktut.steamship.run/teampines-t91i66/teampines"

//const apiKey = "23A44372-4E75-4947-906B-A140E890BECA";
const steamship = new Steamship({
    apiKey : "23A44372-4E75-4947-906B-A140E890BECA"
});
// Mock function to represent the API call
export const fetchQuestion = async () => {
    // Array of 10 questions
    const questions = [
      { text: 'Given the head of a singly linked list, reverse the list, and return the reversed list.  <br/> Example: </br> 1 -> 2 -> 3 -> 4 -> 5 </br> ⬇️ </br> 5 -> 4 -> 3 -> 2 -> 1'},
      { text: 'Given an array of integers nums which is sorted in ascending order, and an integer target, write a function to search target in nums. If target exists, then return its index. Otherwise, return -1.' },
      { text: `Given two strings needle and haystack, return the index of the first occurrence of needle in haystack, or -1 if needle is not part of haystack. 
        <br/>Example:
        <br/>Input: haystack = "sadbutsad", needle = "sad"
        <br/>Output: 0
        <br/> Explanation: "sad" occurs at index 0 and 6.
        <br/> The first occurrence is at index 0, so we return 0.` },
      { text: `You are given an array prices where prices[i] is the price of a given stock on the ith day.
      <br/>You want to maximize your profit by choosing a single day to buy one stock and choosing a different day in the future to sell that stock.
      <br/>Return the maximum profit you can achieve from this transaction. If you cannot achieve any profit, return 0.
      <br/>Example:
      <br/>
      <br/>  Input: prices = [7,1,5,3,6,4]
      <br/>  Output: 5
      <br/>  Explanation: Buy on day 2 (price = 1) and sell on day 5 (price = 6), profit = 6-1 = 5.
      <br/>  Note that buying on day 2 and selling on day 1 is not allowed because you must buy before you sell.` },
      { text: `You are given an integer array cost where cost[i] is the cost of ith step on a staircase. Once you pay the cost, you can either climb one or two steps.
      <br/>You can either start from the step with index 0, or the step with index 1.
      <br/>Return the minimum cost to reach the top of the floor.
      <br/>
      <br/>Example:
      <br/>
      <br/>  Input: cost = [10,15,20]
      <br/>  Output: 15
      <br/>  Explanation: You will start at index 1.
      <br/>  - Pay 15 and climb two steps to reach the top.
      <br/>  The total cost is 15. ` },
      { text: `You are given an integer num. You can swap two digits at most once to get the maximum valued number.
      <br/>Return the maximum valued number you can get.
      <br/>
      <br/>Example:
      <br/>
      <br/>  Input: num = 2736
      <br/>  Output: 7236
      <br/>  Explanation: Swap the number 2 and the number 7.` },
      { text: `You are given the head of a singly linked-list. The list can be represented as:
      <br/>L0 → L1 → … → Ln - 1 → Ln
      <br/>Reorder the list to be on the following form:
      <br/>
      <br/>L0 → Ln → L1 → Ln - 1 → L2 → Ln - 2 → …
      <br/>You may not modify the values in the list's nodes. Only nodes themselves may be changed.`},
      { text: `Given an integer n, return true if it is a power of two. Otherwise, return false.
      <br/>An integer n is a power of two, if there exists an integer x such that n == 2x.
      <br/>
      <br/>Example:
      <br/>  Input: n = 1
      <br/>  Output: true
      <br/>  Explanation: 20 = 1` },
      { text: `Given an input string s, reverse the order of the words.
      <br/>A word is defined as a sequence of non-space characters. The words in s will be separated by at least one space.
      <br/>Return a string of the words in reverse order concatenated by a single space.
      <br/>Note that s may contain leading or trailing spaces or multiple spaces between two words. The returned string should only have a single space separating the words. Do not include any extra spaces.
      <br/>
      <br/>Example:
      <br/>
      <br/>  Input: s = "the sky is blue"
      <br/>  Output: "blue is sky the"` },
      { text: `Given a triangle array, return the minimum path sum from top to bottom.
      <br/>
      <br/>For each step, you may move to an adjacent number of the row below. More formally, if you are on index i on the current row, you may move to either index i or index i + 1 on the next row.
      <br/>
      <br/>Example:
      <br/>
      <br/>  Input: triangle = [[2],[3,4],[6,5,7],[4,1,8,3]]
      <br/>  Output: 11
      <br/>   Explanation: The triangle looks like:
      <br/>      2
      <br/>     3 4
      <br/>    6 5 7
      <br/>   4 1 8 3
      <br/>  The minimum path sum from top to bottom is 2 + 3 + 5 + 1 = 11 (underlined above).`}
    ];
    // Randomly select a question from the array
    const randomIndex = Math.floor(Math.random() * questions.length);
    const selectedQuestion = questions[randomIndex];

    selectedQuestion.text = selectedQuestion.text.replace(/<br>/g, '\n');
  
    // Simulate an asynchronous operation
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve(selectedQuestion);
      }, 1000); // Simulating a delay of 1 second
    });
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
