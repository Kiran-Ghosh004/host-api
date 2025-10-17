const Product = require('../models/Product');

const getAllProducts = async (req, res) => {
  try {
    const { company, name, price, rating, featured, select, sort } = req.query;

    const queryObject = {};

    if (company) queryObject.company = company;
    if (name) queryObject.name = { $regex: name, $options: 'i' };
    if (price) queryObject.price = Number(price); // convert to number
    if (rating) queryObject.rating = Number(rating);
    if (featured) queryObject.featured = featured === 'true'; // convert string to boolean

    let result = Product.find(queryObject);

    // OPTIONAL: apply select only if you explicitly want to filter fields
    // Comment this out if you always want all fields
    if (select) {
      const fields = select.split(',').join(' ');
      result = result.select(fields);
    }

    // SORT
    if (sort) {
      const sortList = sort.split(',').join(' ');
      result = result.sort(sortList);
    }

    let page=Number(req.query.page) || 1;
    let limit=Number(req.query.limit )|| 10;
    let skip=(page-1)*limit;
    result=result.skip(skip).limit(limit);

    const productsData = await result;

    res.status(200).json({ productsData, length: productsData.length });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

const getAllProductsTesting = async (req, res) => {
  try {
    const { company, name, price, rating, featured, select, sort } = req.query;
    const queryObject = {};

    if (company) queryObject.company = company;
    if (name) queryObject.name = { $regex: name, $options: 'i' };
    if (price) queryObject.price = Number(price);
    if (rating) queryObject.rating = Number(rating);
    if (featured) queryObject.featured = featured === 'true';

    let result = Product.find(queryObject);

    // OPTIONAL: apply select only if you explicitly want to filter fields
    if (select) {
      const fields = select.split(',').join(' ');
      result = result.select(fields);
    }

    // SORT (optional)
    if (sort) {
      const sortList = sort.split(',').join(' ');
      result = result.sort(sortList);
    }
    let page=Number(req.query.page) || 1;
    let limit=Number(req.query.limit )|| 10;
    let skip=(page-1)*limit;
    result=result.skip(skip).limit(limit);

    const productsData = await result;

    res.status(200).json({
      products: productsData,
      length: productsData.length,
      msg: 'get all products testing',
    });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

module.exports = { getAllProducts, getAllProductsTesting };
