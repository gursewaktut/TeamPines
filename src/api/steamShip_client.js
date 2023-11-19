import Steamship from "@steamship/client"
// steamship api call
const url = "https://gursewaktut.steamship.run/teampines-t91i66/teampines"

//const apiKey = "23A44372-4E75-4947-906B-A140E890BECA";
const steamship = new Steamship({
    apiKey : "23A44372-4E75-4947-906B-A140E890BECA"
});
export const fetchQuestion = () => {
    return JSON.stringify({API: "Steamship"});
}

export const checkAnswer = () => {
    return JSON.stringify({APIAnswer: "Steamship"});
}

export const sendMessageToSteamship = async (message) => {


    const response = await steamship.agent.respond({
        url: url,
        input: {
            prompt: `${message}`,
            context_id: "make tea" // Think of this as the chatroom name.
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
