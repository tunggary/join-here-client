import axios from "axios";

export default async function login(req, res) {
  const {
    body: { email, password },
  } = req;

  const data = await axios
    .post("http://13.125.66.90:3000/auth/signin", {
      member_id: email,
      password,
    })
    .catch((err) => {
      res.status(500);
    });
  if (data?.data) {
    res.setHeader("Set-Cookie", `joinhere=${data.data.accessToken}; path=/;`);
    res.status(200).json({ error: null });
  } else {
    res.status(200).json({ error: "not_matching" });
  }
}
