module.exports.getAll = (req, res) => {
  res.status(200).json({
    order: 'get all'
  });
}

module.exports.create = (req, res) => {
  res.status(200).json({
    order: 'create'
  });
}