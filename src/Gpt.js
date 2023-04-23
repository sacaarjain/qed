const { Configuration, OpenAIApi } = require("openai");

const config = new Configuration({
	apiKey: "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",
});

const openai = new OpenAIApi(config);

export const runPrompt = async (question, answer) => {
	const prompt = `
    I will be providing you with a Question and an Answer from a student that could be in Latex.
	The question is as follows: ${question}
	This is the student's Answer: ${answer}
	Please Return response regarding whether the student answered the question correctly in the following parsable JSON format. Do not include any backslash characters in your JSON formatting:
    {
        "Q": "given question without any backslashes and converting latex into plaintext. Make text readable for humans.",
        "A": "given answer without any backslashes and converting latex into plaintext. Make text readable for humans."
		"Result": "decide whether the answer provided is sufficient and accurate with respect to the question, and provide reason why. Do not answer the question yourself. Just check whether the answer provided is correct or not."
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