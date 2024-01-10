import { APIGatewayProxyEvent, APIGatewayProxyResult, Context } from 'aws-lambda';
import { S3Client } from '@aws-sdk/client-s3'; 
const s3 = new S3Client();
import OpenAI from "openai";
import dotenv = require('dotenv'); 

dotenv.config();

export async function handler(event: APIGatewayProxyEvent, context: Context): Promise<APIGatewayProxyResult> {

    const sample:String = "David Smith 大卫 斯密斯, Yueling Wang 月林张, Huawen Wu 华文吴,Annie Lee 李安妮";
    const openai = new OpenAI({
        apiKey: "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" // Api_Key_which store in env file
      });


    //User's input
    const userMessage: string = "时谜四"; 
    

    const chatCompletion = await openai.chat.completions.create({
            model: "gpt-4",
            messages: [
                {
                    role: "system",
                    content: `Your task is to match Chinese names with their English counterparts and vice versa. 
                    For example, given the user's input 吴华文 or Wu HuaWen, find the corresponding match, 
                    such as Huawen Wu or 华文吴. You will be provided with a list of names: ${sample}, 
                    and your goal is to return the full name, even if the user provides a simplified version. 
                    The output format should always be in the form of "English Name + space + Chinese Name," 
                    for example, "Yueling Wang 月林张." Make sure to provide the most similar result, even if the user's 
                    input contains errors.`
                },
                {
                    role: "assistant",
                    content: `You are a assistant help to match the name, You will be provided with a list of names: ${sample}, 
                    and your goal is to return the full name, even if the user provides a simplified version. 
                    The output format should always be in the form of "English Name + space + Chinese Name,Make sure to provide the most similar result, even if the user's 
                    input contains errors.`
                },
                {
                    role: "user",
                    content: userMessage
                }
            ],
        });

      const aiMessage = chatCompletion.choices[0].message.content;


    return {
            statusCode: 200,
            body: JSON.stringify({message:"The user input is " + userMessage + " \nAI response " + aiMessage}),
            headers: {
                "Content-Type": "application/json"
        }
    };
}
