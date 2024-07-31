const { users } = require("./server");
const express = require("express");
const app = express();
const cors = require("cors");

app.use(express.json());
app.use(cors());

app.get("/users", (req, res) => {
  if (!users.length) {
    return res.status(400).json({
      msg: "User mavjud emas",
      variant: "error",
      payload: null,
    });
  }
  res.status(200).json({
    msg: "Barcha malumotlar",
    variant: "succes",
    payload: users,
    total: users.length,
  });
});

app.post("/users", (req, res) => {
  let existUsers = users.find((user) => user.username === req.body.username);
  if (existUsers) {
    return res.status(400).json({
      msg: "Bunday username mavjud",
      variant: "warning",
      payload: null,
    });
  }

  let newUsers = {
    id: new Date().getTime(),
    ...req.body,
  };
  users.push(newUsers);

  res.status(200).json({
    msg: "user qoshildi",
    variant: "success",
    payload: users,
  });
});

app.delete("/users/:id", (req, res) => {
  let existUsers = users.findIndex(
    (user) => user.id === parseInt(req.params.id)
  );
  if (existUsers < 0) {
    return res.status(400).json({
      msg: "user topilmadi",
      variant: "error",
      payload: null,
    });
  }

  users.splice(existUsers, 1);
  res.status(200).json({
    msg: "malumot o'chirildi",
    variant: "success",
    payload: null,
  });
});

app.put("/users/:id", (req, res) => {
  let id = +req.params.id;
  const userIndex = users.findIndex((user) => user.id === id);
  if (userIndex) {
    return res.status(400).json({
      msg: "user topilmadi",
      variant: "error",
      payload: null,
    });
  }

  let updeteUser = {
    id,
    ...req.body,
  };
  users.splice(userIndex, 1, updeteUser);
  res.status(200).json({
    msg: "user o'zgardi",
    variant: "success",
    payload: users,
  });
});

const PORT = 8000;
app.listen(PORT, () => console.log(`${PORT}  Malumoti topildi`));
