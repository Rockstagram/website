class InfoController {
  constructor() {}

  get prices() {
    return new Promise(async (resolve, reject) => {
      if (this._prices) return resolve(this._prices);
      return fetch("https://rockstagram-3ddd4.firebaseio.com/prices.json")
        .then(prices => prices.json())
        .then(prices => (this._prices = prices))
        .then(prices => resolve(prices))
        .catch(err => console.error(err));
    });
  }
}
