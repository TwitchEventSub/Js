import fetch from "./fetch";


export interface UserValidation {
  client_id: string;
  scopes: string[];
}

export default async function getUserAsync(auth: string) {
  return fetch(
    "https://id.twitch.tv/oauth2/validate",
    {
      headers: {
        Authorization: `Bearer ${auth}`,
      },
    },
  )
  .then((res) => res.json() as Promise<UserValidation>);
}
