module.exports.overview = (req, res) => {
  res.status(200).json({
    analytics: 'overview'
  });
}

module.exports.analytics = (req, res) => {
  res.status(200).json({
    analytics: 'analytics'
  });
}