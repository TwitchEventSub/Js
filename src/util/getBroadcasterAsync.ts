import uFetch from "./fetch";
interface User {
  id: string;
  login: string;
  display_name: string;
  type: "" | "admin" | "global_mod" | "staff";
  broadcaster_type: "" | "partner" | "affiliate";
  description: string;
  profile_image_url: string;
  offline_image_url: string;
  email?: string;
  created_at: string;
}

interface UserResponse {
  data: User[];
}

export default function getBroadcasterAsync(auth: string, broadcaster: string, clientId: string) {
  return uFetch(
    `https://api.twitch.tv/helix/users?login=${broadcaster}`,
    {
      headers: {
        Authorization: `Bearer ${auth}`,
        "Client-Id": clientId,
      },
    },
  )
  .then((res) => res.json() as Promise<UserResponse>);
}
