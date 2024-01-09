import { APIGatewayProxyEvent, APIGatewayProxyResult, Context } from 'aws-lambda';
import { S3Client } from '@aws-sdk/client-s3'; 
const s3 = new S3Client();
import OpenAI from "openai";
import dotenv = require('dotenv'); 

dotenv.config();

export async function handler(event: APIGatewayProxyEvent, context: Context): Promise<APIGatewayProxyResult> {

    const sample:String = "David Smith 大卫 斯密斯, Yueling Wang 月林张, Huawen Wu 华文吴,Annie Lee 李安妮";
    const openai = new OpenAI({
        apiKey: process.env.OPENAI_API_KEY // Api_Key_which store in env file
      });


    //User's input
    const userMessage = "话温";


    const chatCompletion = await openai.chat.completions.create({
        model: "gpt-4",
        messages: [
            {
                role: "system",
                content: `Now you will be assigned the tasks related to matching the chinese name with English name, 
                and you also need to match the English name with Chinese name, for example Given user's input 吴华文 or Wu HuaWen， 
                find the match Huawen Wu or 华文吴, here is the list and you need to give the full name even if user give simplfied name
                 ${sample}, and the output format always be like: Yueling Wang 月林张, which is like Matching English name + space + Matching Chinese name, and 
                 you need to return the most similar result even if user input the wrong name`
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
        body: JSON.stringify({message:"The user input is " + userMessage + " The output is tset" + aiMessage}),
        headers: {
            "Content-Type": "application/json"
        }
    };
}
