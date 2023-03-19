module.exports = function (err, req, res, next) {
  console.log(res, "res");
  return res
    .status(res.status)
    .json({ success: !!res.success, data: res.body });
};
