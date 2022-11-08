function remap(e, t) {
  let r = {};
  if (!e) return r;
  if (!t) return e;
  for (let i in t) {
    if ('object' == typeof t[i]) {
      if (!t[i].name)
        throw Error(
          `${i} is tying to mapped as object or array but missing "name" field`,
        );
      if (t[i].properties) {
        r[t[i].name] = remap(e[i], t[i].properties);
        continue;
      }
      if (t[i].items) {
        for (let n of ((r[t[i].name] = []), e[i]))
          r[t[i].name].push(remap(n, t[i].items));
        continue;
      }
      r[t[i].name] = {};
      continue;
    }
    r[t[i]] = e[i];
  }
  return r;
}
module.exports = { remap };
