var express = require('express');
var router = express.Router();
var Counters = require("../lib/Counters");

// [json] GET /counters
// => [
// =>   {id: "asdf", title: "boop",  count: 4},
// =>   {id: "zxcv", title: "steve", count: 3}
// => ]
router.get("/counters", function(req, res, next) {
  res.json(Counters.all())
});

// [json] POST {title: "bob"} /counters
// => [
// =>   {id: "asdf", title: "boop",  count: 4},
// =>   {id: "zxcv", title: "steve", count: 3},
// =>   {id: "qwer", title: "bob",   count: 0}
// => ]
router.post("/counter", function(req, res, next) {
  res.json(Counters.create(req.body.title));
})

// [json] DELETE {id: "asdf"} /counter
// => [
// =>   {id: "zxcv", title: "steve", count: 3},
// =>   {id: "qwer", title: "bob",   count: 0}
// => ]
router.delete("/counter", function(req, res, next) {
  res.json(Counters.delete(req.body.id));
});

// [json] POST {id: "qwer"} /counter/inc
// => [
// =>   {id: "zxcv", title: "steve", count: 3},
// =>   {id: "qwer", title: "bob",   count: 1}
// => ]
router.post("/counter/inc", function(req, res, next) {
  res.json(Counters.inc(req.body.id));
});

// [json] POST {id: "zxcv"} /counter/dec
// => [
// =>   {id: "zxcv", title: "steve", count: 2},
// =>   {id: "qwer", title: "bob",   count: 1}
// => ]
router.post("/counter/dec", function(req, res, next) {
  res.json(Counters.dec(req.body.id));
});

module.exports = router;