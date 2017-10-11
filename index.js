const store = { employers: [], customers: [], meals: [], deliveries: [] };
let empId = 1;
let custId = 1;
let mId = 1;
let deliveryId = 1;

class Employer {
  constructor(name) {
    this.name = name;
    this.id = empId++;
    store["employers"].push(this);
  }

  employees() {
    return store["customers"].filter(x => x["employerId"] === this.id);
  }

  deliveries() {
    const beeboop = this.employees();
    const deliveryboop = [];
    for (const ele of beeboop) {
      deliveryboop.push(ele.deliveries());
    }
    const flattened = deliveryboop.reduce(function(a, b) {
      return a.concat(b);
    });
    return flattened;
  }

  meals() {
    const beeboop = this.employees();
    const mealboop = [];
    for (const ele of beeboop) {
      mealboop.push(ele.meals());
    }
    const flattened = mealboop.reduce(function(a, b) {
      return a.concat(b);
    });
    return [...new Set(flattened)];
  }

  mealTotals() {
    const beeboop = this.employees();
    const mealboop = [];
    for (const ele of beeboop) {
      mealboop.push(ele.meals());
    }
    const flattened = mealboop.reduce(function(a, b) {
      return a.concat(b);
    });
    const obj = {};
    for (const ele of flattened) {
      if (obj[ele["id"]]) {
        obj[ele["id"]] += 1;
      } else {
        obj[ele["id"]] = 1;
      }
    }
    return obj;
  }
}

class Customer {
  constructor(name, employer) {
    if (employer) {
      this.employer = function() {
        return employer;
      };
      this.employerId = employer.id;
    }
    this.name = name;
    this.id = custId++;
    store["customers"].push(this);
  }

  deliveries() {
    return store["deliveries"].filter(x => x["customerId"] === this.id);
  }

  meals() {
    const newArray = [];
    const beeboop = this.deliveries();
    for (const ele of beeboop) {
      newArray.push(ele.meal());
    }
    return newArray;
  }

  totalSpent() {
    const beeboop = this.meals();
    let total = 0;
    for (const ele of beeboop) {
      total += ele.price;
    }
    return total;
  }
}

class Meal {
  constructor(title, price) {
    this.title = title;
    this.price = price;
    store["meals"].push(this);
    this.id = mId++;
  }

  deliveries() {
    return store["deliveries"].filter(x => x["mealId"] === this.id);
  }

  customers() {
    const newArray = [];
    const beeboop = this.deliveries();
    for (const ele of beeboop) {
      newArray.push(ele.customer());
    }
    return newArray;
  }

  static byPrice() {
    const prices = store["meals"].sort(function(a, b) {
      return b.price - a.price;
    });
    return prices;
  }
}

class Delivery {
  constructor(meal, customer) {
    if (meal) {
      this.mealId = meal["id"];
      this.meal = function() {
        return meal;
      };
    }
    if (customer) {
      this.customerId = customer["id"];
      this.customer = function() {
        return customer;
      };
    }
    store["deliveries"].push(this);
    this.id = deliveryId++;
  }

  // meal() {}
  //
  // customer() {
  //
  // }
}
