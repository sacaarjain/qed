const { Configuration, OpenAIApi } = require("openai");

const config = new Configuration({
	apiKey: "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",
});

const openai = new OpenAIApi(config);

export const runPrompt = async (question, answer) => {
	const prompt = `
    I will give you a question and an answer attempt, you will tell me if the answer is corect or not.
	Question: ${question}
	Answer: ${answer}
	Return response in the following parsable JSON format:
    {
        "Q": "given question",
        "A": "given answer"
		"Result": "decide whether answer is correct or not, and provide reason why"
    }
    `;
	console.log(prompt)
	const response = await openai.createCompletion({
		model: "text-davinci-003",
		prompt: prompt,
		max_tokens: 2048,
		temperature: 1,
	});

	const parsableJSONresponse = response.data.choices[0].text;
	const parsedResponse = JSON.parse(parsableJSONresponse);


	console.log("Question: ", parsedResponse.Q);
	console.log("Answer: ", parsedResponse.A);
	console.log("Result: ", parsedResponse.Result);

	var retvalue = "Question: " + parsedResponse.Q + "\nAnswer: " + parsedResponse.A + "\nResult: " + parsedResponse.Result + "\n"
	return retvalue;
};