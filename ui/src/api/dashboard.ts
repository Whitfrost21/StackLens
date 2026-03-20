import API from "./logs";

export async function Fetchdashboard() {
  const res = await API.get("/dashboard");
  return res.data;
}
