/**
 * @param {any} source
 * @param {import("./source").Schema} schema
 *
 * @returns {any} Remapped object using schema
 */
function remap(source, schema) {
  /**
   * @type {any}
   */
  const response = {};

  /**
   * If source is not provided, return an empty object
   */
  if (!source) return response;

  /**
   * If schema is not provided, return an "source" object
   */
  if (!schema) return source;

  for (const key in schema) {
    /**
     * Process schema as non-primitive type
     */
    if (typeof schema[key] === 'object') {
      if (!schema[key].name) {
        throw new Error(
          `${key} is tying to mapped as object or array but missing "name" field`,
        );
      }

      /**
       * Object
       */
      if (schema[key].properties) {
        response[schema[key].name] = remap(source[key], schema[key].properties);

        continue;
      }

      /**
       * Array
       */
      if (schema[key].items) {
        response[schema[key].name] = [];

        for (const item of source[key]) {
          response[schema[key].name].push(remap(item, schema[key].items));
        }

        continue;
      }

      /**
       * Fallback
       */
      response[schema[key].name] = {};

      continue;
    }

    /**
     * Process schema as primitive type
     */
    response[schema[key]] = source[key];
  }

  return response;
}

module.exports = { remap };
