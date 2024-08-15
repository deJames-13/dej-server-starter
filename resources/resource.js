export default class Resource {
  constructor(data) {
    this.data = data;
    return this;
  }

  static make(data) {
    return new this(data).toArray();
  }

  toArray() {
    if (Array.isArray(this.data)) {
      return this.data.map((item) => this.transform(item?.toJSON()));
    }
    return this.transform(this.data?.toJSON());
  }

  toJson() {
    return JSON.stringify(this.toArray());
  }

  transform(item) {
    return item;
  }

  formatDate(date, format = 'D, M d, Y - H:m:s a') {
    const formatMapping = {
      M: { month: 'short' }, // Jan
      d: { day: '2-digit' }, // 01
      Y: { year: 'numeric' }, // 2023
      H: { hour: '2-digit' }, // 12
      m: { minute: '2-digit' }, // 00
      s: { second: '2-digit' }, // 00
      a: { hour12: true }, // PM
      D: { weekday: 'short' }, // Mon
    };
    const options = {};

    for (const char of format) {
      if (formatMapping[char]) {
        Object.assign(options, formatMapping[char]);
      }
    }
    return new Date(date).toLocaleString('en-US', options);
  }

  static collection(data) {
    if (!data) return [];
    return data.map((item) => new this(item).toArray());
  }
}
