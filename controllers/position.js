module.exports.getByCategoryId = (req, res) => {
  res.status(200).json({
    position: 'get by category id'
  });
}

module.exports.remove = (req, res) => {
  res.status(200).json({
    position: 'remove'
  });
}

module.exports.create = (req, res) => {
  res.status(200).json({
    position: 'create'
  });
}

module.exports.update = (req, res) => {
  res.status(200).json({
    position: 'update'
  });
}
