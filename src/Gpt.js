const { Configuration, OpenAIApi } = require("openai");

const config = new Configuration({
	apiKey: "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",
});

const openai = new OpenAIApi(config);

export const runPrompt = async (question) => {
	document.getElementById("Submit")
	const prompt = `
    Is the following mathematical proof true: ${question}. Return response in the following parsable JSON format:
    {
        "Q": "question",
        "A": "answer"
		"COQ": "translate math proof into COQ"
    }
    `;

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
	console.log("COQ: ", parsedResponse.COQ);
};