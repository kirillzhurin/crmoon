module.exports.getAll = (req, res) => {
  res.status(200).json({
    category: 'get all'
  });
}

module.exports.getById = (req, res) => {
  res.status(200).json({
    category: 'get by id'
  });
}

module.exports.remove = (req, res) => {
  res.status(200).json({
    category: 'remove'
  });
}

module.exports.create = (req, res) => {
  res.status(200).json({
    category: 'create'
  });
}

module.exports.update = (req, res) => {
  res.status(200).json({
    category: 'update'
  });
}
