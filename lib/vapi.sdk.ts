import * as dotenv from 'dotenv';
dotenv.config({ path: '.env.local' });
import Vapi from '@vapi-ai/web';

export const vapi = new Vapi(process.env.NEXT_PUBLIC_VAPI_WEB_TOKEN!);

console.log(process.env.NEXT_PUBLIC_VAPI_WEB_TOKEN);
