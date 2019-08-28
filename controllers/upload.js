module.exports.image = (req, res) => {
  console.log(req.file);
  res.status(200).json(req.file);
}