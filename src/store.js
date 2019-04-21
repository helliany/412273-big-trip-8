export default class Store {
  constructor({key, storage}) {
    this._storage = storage;
    this._storeKey = key;
  }

  setItem({key, item}) {
    const items = this.getAll();
    items[key] = item;

    this._storage.setItem(this._storeKey, JSON.stringify(items));
  }

  getItem({key}) {
    const items = this.getAll();
    return items[key];
  }

  removeItem({key, id}) {
    const items = this.getAll();
    const itemsPoints = this.getItem({key});
    const index = itemsPoints.findIndex((el) => el.id === id);
    itemsPoints.splice(index, 1);
    items[key] = itemsPoints;

    this._storage.setItem(this._storeKey, JSON.stringify(items));
  }

  updateItem({key, id, data}) {
    const items = this.getAll();
    const itemsPoints = this.getItem({key});
    const index = itemsPoints.findIndex((el) => el.id === id);
    itemsPoints[index] = data;
    items[key] = itemsPoints;

    this._storage.setItem(this._storeKey, JSON.stringify(items));
  }

  createItem({key, data}) {
    const items = this.getAll();
    const itemsPoints = this.getItem({key});
    itemsPoints.push(data);
    const index = itemsPoints.indexOf(data);

    data.id = index.toString();
    items[key] = itemsPoints;

    this._storage.setItem(this._storeKey, JSON.stringify(items));
  }

  getAll() {
    const emptyItems = {};
    const items = this._storage.getItem(this._storeKey);

    if (!items) {
      return emptyItems;
    }

    try {
      return JSON.parse(items);
    } catch (e) {
      return emptyItems;
    }
  }
}
