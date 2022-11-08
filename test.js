const { remap } = require('.');

const schema = {
  _id: 'id',
  some_name: 'someName',
  some_object: {
    name: 'someObject',
    properties: {
      _id: 'id',
      some_ref: {
        name: 'someRef',
        properties: {
          name: 'name',
        },
      },
    },
  },
  some_array: {
    name: 'someArray',
    items: {
      _id: 'id',
      some_ref: {
        name: 'someRef',
        properties: {
          name: 'name',
        },
      },
    },
  },
};

const source = {
  _id: '123',
  some_name: 'Sergey',
  some_object: {
    _id: '456',
    some_ref: {
      name: 'lorem',
    },
  },
  some_array: [
    { _id: '789', some_ref: { name: 'ipsum' } },
    { _id: '789', some_ref: { name: 'ipsum' } },
    { _id: '789', some_ref: { name: 'ipsum' } },
    { _id: '789', some_ref: { name: 'ipsum' } },
  ],
  skipped: true,
};

console.log(remap(source, schema));
