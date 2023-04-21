const jsonServer = require("json-server");
const { forEach } = require("lodash");
const server = jsonServer.create();
const _ = require("lodash");
const router = jsonServer.router("./db.json");
const middlewares = jsonServer.defaults();

server.use(middlewares);
server.use(jsonServer.bodyParser);

const ROBOTS = "robots";
const SHIPMENT = "shipment";
const ON_FIRE = "on fire";

const extinguish = (db, data) => {
  const table = db.get(ROBOTS);
  const robots = table.value();

  const statuses = robots
    .find((item) => +item.id === +data.id)
    ?.statuses.filter((status) => status !== ON_FIRE);

  table.find({ id: +data.id }).assign({ statuses: statuses }).write();
  return table.find({ id: +data.id }).value();
};

const remove = (db, data, key) => {
  const table = db.get(ROBOTS);
  data?.[key]?.forEach((id) => {
    table.remove({ id: +id }).write();
  });
  return table.value();
};

server.post("/robots/:id/extinguish", (req, res) => {
  console.log(req.body, req.params);
  const db = router.db; // Assign the lowdb instance

  const data = extinguish(db, req.params);
  res.status(200).jsonp({
    code: 200,
    message: "Success",
    data,
  });
});

server.post("/robots/recycle", (req, res) => {
  console.log(req.body, req.params);
  const db = router.db;

  const data = remove(db, req.body, "recycleRobots");
  res.status(200).jsonp({
    code: 200,
    message: "Success",
    data,
  });
});

server.put("/robots/shipments/create", (req, res) => {
  console.log(req.body, req.params);
  const db = router.db;

  remove(db, req.body, "shipments");
  res.sendStatus(200);
});

server.use(router);
server.listen(3100, () => {
  console.log("JSON Server is running");
});
