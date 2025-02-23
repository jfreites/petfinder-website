import PocketBase from 'pocketbase';

const pocketbaseUrl = process.env.POCKETBASE_DOMAIN_URL;
console.log(pocketbaseUrl);

//if (!pocketbaseUrl) throw new Error("Missing Pocketbase environment variables");

export const pb = new PocketBase('https://pocketbase.dp.ungravity.dev');
