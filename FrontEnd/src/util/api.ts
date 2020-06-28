import { Methods } from "./type";

/**
 * API Request handler
 * @param url - api endpoint
 * @param method - http method
 * @param bodyParam - interface bodyParam
 * @return res.json
 * @thorws promise res
 * */

export interface bodyParams{
  username?: string;
  password?: string;
  task?:taskParams
}

export interface taskParams{
  taskTitle?: string;
  end_date?: string;
  taskContent?: string;
  taskType?: string;
  status?: string;
  important?: boolean;
  schedule?: boolean
}

interface headers{
  Accept: string,
  Authorization: string
}

export const fetch_API = async (url: string, method: Methods, bodyParam?:bodyParams,Authorization?:string) => {
  const res = await fetch(url, {
    method: method,
    headers: {
      "Content-Type": "application/json",
      "Authorization": Authorization === undefined? "":"Bearer "+Authorization,
    },
    body: bodyParam ? JSON.stringify(bodyParam) : undefined
  });
  if(res.ok) return res.json();
  
  throw res;

 };
