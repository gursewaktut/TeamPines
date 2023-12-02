
import Steamship from "@steamship/client"
// steamship api call
//const url = "https://gursewaktut.steamship.run/teampines-t91i66/teampines"
const url = "https://gursewaktut.steamship.run/answer-agent-eja-byj64z/answer-agent-eja"

//const apiKey = "23A44372-4E75-4947-906B-A140E890BECA";
const steamship = new Steamship({
    apiKey : "23A44372-4E75-4947-906B-A140E890BECA"
});
// Mock function to represent the API call
export const fetchQuestion = async (index) => {
    // Array of 10 questions
    const questions = [
      { text: 'Given the head of a singly linked list, reverse the list, and return the reversed list.  \n Example: \n 1 -> 2 -> 3 -> 4 -> 5 \n\n ⬇️ \n\n 5 -> 4 -> 3 -> 2 -> 1'},
      { text: 'Given an array of integers nums which is sorted in ascending order, and an integer target, write a function to search target in nums. If target exists, then return its index. Otherwise, return -1.' },
      { text: `Given two strings needle and haystack, return the index of the first occurrence of needle in haystack, or -1 if needle is not part of haystack. 
        \nExample:
        \nInput: haystack = "sadbutsad", needle = "sad"
        \nOutput: 0
        \n Explanation: "sad" occurs at index 0 and 6.
        \n The first occurrence is at index 0, so we return 0.` },
      { text: `You are given an array prices where prices[i] is the price of a given stock on the ith day.
      \nYou want to maximize your profit by choosing a single day to buy one stock and choosing a different day in the future to sell that stock.
      \nReturn the maximum profit you can achieve from this transaction. If you cannot achieve any profit, return 0.
      \nExample:
      \n
      \n  Input: prices = [7,1,5,3,6,4]
      \n  Output: 5
      \n  Explanation: Buy on day 2 (price = 1) and sell on day 5 (price = 6), profit = 6-1 = 5.
      \n  Note that buying on day 2 and selling on day 1 is not allowed because you must buy before you sell.` },
      { text: `You are given an integer array cost where cost[i] is the cost of ith step on a staircase. Once you pay the cost, you can either climb one or two steps.
      \nYou can either start from the step with index 0, or the step with index 1.
      \nReturn the minimum cost to reach the top of the floor.
      \n
      \nExample:
      \n
      \n  Input: cost = [10,15,20]
      \n  Output: 15
      \n  Explanation: You will start at index 1.
      \n  - Pay 15 and climb two steps to reach the top.
      \n  The total cost is 15. ` },
      { text: `You are given an integer num. You can swap two digits at most once to get the maximum valued number.
      \nReturn the maximum valued number you can get.
      \n
      \nExample:
      \n
      \n  Input: num = 2736
      \n  Output: 7236
      \n  Explanation: Swap the number 2 and the number 7.` },
      { text: `You are given the head of a singly linked-list. The list can be represented as:
      \nL0 → L1 → … → Ln - 1 → Ln
      \nReorder the list to be on the following form:
      \n
      \nL0 → Ln → L1 → Ln - 1 → L2 → Ln - 2 → …
      \nYou may not modify the values in the list's nodes. Only nodes themselves may be changed.`},
      { text: `Given an integer n, return true if it is a power of two. Otherwise, return false.
      \nAn integer n is a power of two, if there exists an integer x such that n == 2x.
      \n
      \nExample:
      \n  Input: n = 1
      \n  Output: true
      \n  Explanation: 20 = 1` },
      { text: `Given an input string s, reverse the order of the words.
      \nA word is defined as a sequence of non-space characters. The words in s will be separated by at least one space.
      \nReturn a string of the words in reverse order concatenated by a single space.
      \nNote that s may contain leading or trailing spaces or multiple spaces between two words. The returned string should only have a single space separating the words. Do not include any extra spaces.
      \n
      \nExample:
      \n
      \n  Input: s = "the sky is blue"
      \n  Output: "blue is sky the"` },
      { text: `Given a triangle array, return the minimum path sum from top to bottom.
      \n
      \nFor each step, you may move to an adjacent number of the row below. More formally, if you are on index i on the current row, you may move to either index i or index i + 1 on the next row.
      \n
      \nExample:
      \n
      \n  Input: triangle = [[2],[3,4],[6,5,7],[4,1,8,3]]
      \n  Output: 11
      \n   Explanation: The triangle looks like:
      \n      2
      \n     3 4
      \n    6 5 7
      \n   4 1 8 3
      \n  The minimum path sum from top to bottom is 2 + 3 + 5 + 1 = 11 (underlined above).`}
    ];
    // Randomly select a question from the array
    const randomIndex = Math.floor(Math.random() * questions.length);
    const selectedQuestion = questions[index];

    //selectedQuestion.text = selectedQuestion.text.replace(/<br>/g, '\n');
  
    // Simulate an asynchronous operation
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve(selectedQuestion);
      }, 500); // Simulating a delay of 1 second
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

export const sendMessageToSteamshipTutor = async (message) => {

    const URL = "https://gursewaktut.steamship.run/personality-agent-66c-ue0w2e/personality-agent-66c";
    const response = await steamship.agent.respond({
        url: URL,
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

export const sendMessageToVisual = async (message) => {

    const URL = "https://gursewaktut.steamship.run/visual-agent-9g0cyb/visual-agent";
    const response = await steamship.agent.respond({
        url: URL,
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
