const { Configuration, OpenAIApi } = require("openai");

const config = new Configuration({
	apiKey: "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",
});

const openai = new OpenAIApi(config);

export const runPrompt = async (question, answer) => {
	const prompt = `
    I will give you a Question and the Answer that a student has attempted to answer the Question with. Do not answer the question. Grade the answer to that question. Is the student's Answer correct?
	This is the question from the textbook: ${question}
	This is the student's Answer: ${answer}
	Return response regarding whether the student answered the question correctly in the following parsable JSON format:
    {
        "Q": "given question",
        "A": "given answer"
		"Result": "decide whether answer is correct or not, and provide reason why"
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
	console.log("Result: ", parsedResponse.Result);

	var retvalue = "Question: " + parsedResponse.Q + "\nAnswer: " + parsedResponse.A + "\nResult: " + parsedResponse.Result + "\n"
	return retvalue;
};