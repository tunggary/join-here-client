import axios from "axios";

export default async function login(req, res) {
  const {
    body: { loginId, password },
  } = req;

  const data = await axios
    .post("http://3.36.36.87:8080/members/login", {
      id: loginId,
      password,
    })
    .catch((err) => {
      console.log(err.message);
      res.status(500);
    });
  res.setHeader("Set-Cookie", `user_id=${data.data.id}; path=/;`);
  res.status(200).json({ error: null });
}
