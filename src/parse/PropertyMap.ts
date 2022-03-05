type PropertyMapValue = string | boolean;
/**
 * The mapping between semantic properties on the left, and arbitrary data paths on the right.
 * By getting the value of the key on the right and setting the key on the left a valid Input
 * should be constructed.
 */

export type PropertyMap = {
  msg: PropertyMapValue;
  level: PropertyMapValue;
  ns: PropertyMapValue;
  name: PropertyMapValue;
  "err.stack": PropertyMapValue;
  time: PropertyMapValue;
  "req.method": PropertyMapValue;
  "req.url": PropertyMapValue;
  "res.statusCode": PropertyMapValue;
  responseTime: PropertyMapValue;
};
