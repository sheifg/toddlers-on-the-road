module.exports = (err, req, res, next) => {
  return res.status(res?.errorStatusCode || 500).send({
    error: true,
    message: err.message,
    body: req.body,
  });
};
