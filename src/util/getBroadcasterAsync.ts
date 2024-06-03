import uFetch from "./fetch";
export interface User {
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

export default function getBroadcasterAsync(auth: string, broadcasterList: string[], clientId: string) {
  broadcasterList = broadcasterList.filter((x) => x.trim());
  if (broadcasterList.length === 0 || broadcasterList.length > 100) {
    throw new Error("broadcaster list must be between 1 and 100");
  }
  const broadcaster = broadcasterList.map((x) => "login=" + x)
  .join("&");

  return uFetch(
    `https://api.twitch.tv/helix/users?${broadcaster}`,
    {
      headers: {
        Authorization: `Bearer ${auth}`,
        "Client-Id": clientId,
      },
    },
  )
  .then((res) => res.json() as Promise<UserResponse>);
}
