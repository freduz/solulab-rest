class ApiFeatures {
  constructor(query, queryString) {
    this.query = query;
    this.queryString = queryString;
    console.log(this.queryString);
  }

  fliter() {
    const queryObject = { ...this.queryString };
    const excludeFields = ['fields', 'sort', 'page', 'limit'];
    excludeFields.forEach((el) => delete queryObject[el]);
    const queryValue = JSON.stringify(queryObject).replace(
      /\b(gt|gte|lt|lte)\b/g,
      (match) => `$${match}`
    );

    this.query = this.query.find(JSON.parse(queryValue));
    return this;
  }

  sort() {
    if (this.queryString.sort) {
      this.query = this.query.sort(this.queryString.sort.split(',').join(' '));
    } else {
      this.query = this.query.sort('-price');
    }

    return this;
  }

  fields() {
    if (this.queryString.fields) {
      this.query = this.query.select(
        this.queryString.fields.split(',').join(' ')
      );
    } else {
      this.query = this.query.select('-__v');
    }

    return this;
  }

  paginate() {
    if (this.queryString.page || this.queryString.limit) {
      const page = this.queryString.page * 1 || 1;
      const limit = this.queryString.limit * 1 || 5;
      const skipValue = (page - 1) * limit;
      this.query = this.query.skip(skipValue).limit(limit);
    }
    return this;
  }
}

module.exports = ApiFeatures;
