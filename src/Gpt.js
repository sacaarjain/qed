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