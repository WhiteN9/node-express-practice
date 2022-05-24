function validateZip(req, res, next) {
  const zipcode = req.params.zip;
  if (zipcode.length === 5 && Number.isInteger(parseInt(zipcode))) {
    next();
  } else {
    next(`Zip (${zipcode}) is invalid!`);
  }
}

module.exports = validateZip;
