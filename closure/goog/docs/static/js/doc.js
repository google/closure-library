var a, goog = goog || {};
goog.global = this;
goog.DEBUG = true;
goog.LOCALE = "en";
goog.evalWorksForGlobals_ = null;
goog.provide = function(name) {
  goog.exportPath_(name)
};
goog.exportPath_ = function(name, opt_object, opt_objectToExportTo) {
  var parts = name.split("."), cur = opt_objectToExportTo || goog.global;
  !(parts[0] in cur) && cur.execScript && cur.execScript("var " + parts[0]);
  for(var part;parts.length && (part = parts.shift());)if(!parts.length && goog.isDef(opt_object))cur[part] = opt_object;
  else cur = cur[part] ? cur[part] : (cur[part] = {})
};
goog.getObjectByName = function(name, opt_obj) {
  for(var parts = name.split("."), cur = opt_obj || goog.global, part;part = parts.shift();)if(cur[part])cur = cur[part];
  else return null;
  return cur
};
goog.globalize = function(obj, opt_global) {
  var global = opt_global || goog.global;
  for(var x in obj)global[x] = obj[x]
};
goog.addDependency = function() {
};
goog.require = function() {
};
goog.useStrictRequires = false;
goog.basePath = "";
goog.nullFunction = function() {
};
goog.identityFunction = function() {
  return arguments[0]
};
goog.abstractMethod = function() {
  throw Error("unimplemented abstract method");
};
goog.addSingletonGetter = function(ctor) {
  ctor.getInstance = function() {
    return ctor.instance_ || (ctor.instance_ = new ctor)
  }
};
goog.typeOf = function(value) {
  var s = typeof value;
  if(s == "object")if(value) {
    if(value instanceof Array || !(value instanceof Object) && Object.prototype.toString.call(value) == "[object Array]" || typeof value.length == "number" && typeof value.splice != "undefined" && typeof value.propertyIsEnumerable != "undefined" && !value.propertyIsEnumerable("splice"))return"array";
    if(!(value instanceof Object) && (Object.prototype.toString.call(value) == "[object Function]" || typeof value.call != "undefined" && typeof value.propertyIsEnumerable != "undefined" && !value.propertyIsEnumerable("call")))return"function"
  }else return"null";
  else if(s == "function" && typeof value.call == "undefined")return"object";
  return s
};
goog.propertyIsEnumerableCustom_ = function(object, propName) {
  if(propName in object)for(var key in object)if(key == propName && Object.prototype.hasOwnProperty.call(object, propName))return true;
  return false
};
goog.propertyIsEnumerable_ = function(object, propName) {
  return object instanceof Object ? Object.prototype.propertyIsEnumerable.call(object, propName) : goog.propertyIsEnumerableCustom_(object, propName)
};
goog.isDef = function(val) {
  return val !== undefined
};
goog.isNull = function(val) {
  return val === null
};
goog.isDefAndNotNull = function(val) {
  return val != null
};
goog.isArray = function(val) {
  return goog.typeOf(val) == "array"
};
goog.isArrayLike = function(val) {
  var type = goog.typeOf(val);
  return type == "array" || type == "object" && typeof val.length == "number"
};
goog.isDateLike = function(val) {
  return goog.isObject(val) && typeof val.getFullYear == "function"
};
goog.isString = function(val) {
  return typeof val == "string"
};
goog.isBoolean = function(val) {
  return typeof val == "boolean"
};
goog.isNumber = function(val) {
  return typeof val == "number"
};
goog.isFunction = function(val) {
  return goog.typeOf(val) == "function"
};
goog.isObject = function(val) {
  var type = goog.typeOf(val);
  return type == "object" || type == "array" || type == "function"
};
goog.getHashCode = function(obj) {
  if(obj.hasOwnProperty && obj.hasOwnProperty(goog.HASH_CODE_PROPERTY_))return obj[goog.HASH_CODE_PROPERTY_];
  obj[goog.HASH_CODE_PROPERTY_] || (obj[goog.HASH_CODE_PROPERTY_] = ++goog.hashCodeCounter_);
  return obj[goog.HASH_CODE_PROPERTY_]
};
goog.removeHashCode = function(obj) {
  "removeAttribute" in obj && obj.removeAttribute(goog.HASH_CODE_PROPERTY_);
  try {
    delete obj[goog.HASH_CODE_PROPERTY_]
  }catch(ex) {
  }
};
goog.HASH_CODE_PROPERTY_ = "closure_hashCode_" + Math.floor(Math.random() * 2147483648).toString(36);
goog.hashCodeCounter_ = 0;
goog.cloneObject = function(proto) {
  var type = goog.typeOf(proto);
  if(type == "object" || type == "array") {
    if(proto.clone)return proto.clone.call(proto);
    var clone = type == "array" ? [] : {};
    for(var key in proto)clone[key] = goog.cloneObject(proto[key]);
    return clone
  }return proto
};
goog.bind = function(fn, selfObj) {
  var context = selfObj || goog.global;
  if(arguments.length > 2) {
    var boundArgs = Array.prototype.slice.call(arguments, 2);
    return function() {
      var newArgs = Array.prototype.slice.call(arguments);
      Array.prototype.unshift.apply(newArgs, boundArgs);
      return fn.apply(context, newArgs)
    }
  }else return function() {
    return fn.apply(context, arguments)
  }
};
goog.partial = function(fn) {
  var args = Array.prototype.slice.call(arguments, 1);
  return function() {
    var newArgs = Array.prototype.slice.call(arguments);
    newArgs.unshift.apply(newArgs, args);
    return fn.apply(this, newArgs)
  }
};
goog.mixin = function(target, source) {
  for(var x in source)target[x] = source[x]
};
goog.now = Date.now || function() {
  return+new Date
};
goog.globalEval = function(script) {
  if(goog.global.execScript)goog.global.execScript(script, "JavaScript");
  else if(goog.global.eval) {
    if(goog.evalWorksForGlobals_ == null) {
      goog.global.eval("var _et_ = 1;");
      if(typeof goog.global._et_ != "undefined") {
        delete goog.global._et_;
        goog.evalWorksForGlobals_ = true
      }else goog.evalWorksForGlobals_ = false
    }if(goog.evalWorksForGlobals_)goog.global.eval(script);
    else {
      var doc = goog.global.document, scriptElt = doc.createElement("script");
      scriptElt.type = "text/javascript";
      scriptElt.defer = false;
      scriptElt.appendChild(doc.createTextNode(script));
      doc.body.appendChild(scriptElt);
      doc.body.removeChild(scriptElt)
    }
  }else throw Error("goog.globalEval not available");
};
goog.typedef = true;
goog.getCssName = function(className, opt_modifier) {
  var cssName = className + (opt_modifier ? "-" + opt_modifier : "");
  return goog.cssNameMapping_ && cssName in goog.cssNameMapping_ ? goog.cssNameMapping_[cssName] : cssName
};
goog.setCssNameMapping = function(mapping) {
  goog.cssNameMapping_ = mapping
};
goog.getMsg = function(str, opt_values) {
  var values = opt_values || {};
  for(var key in values)str = str.replace(new RegExp("\\{\\$" + key + "\\}", "gi"), values[key]);
  return str
};
goog.exportSymbol = function(publicPath, object, opt_objectToExportTo) {
  goog.exportPath_(publicPath, object, opt_objectToExportTo)
};
goog.exportProperty = function(object, publicName, symbol) {
  object[publicName] = symbol
};
goog.inherits = function(childCtor, parentCtor) {
  function tempCtor() {
  }
  tempCtor.prototype = parentCtor.prototype;
  childCtor.superClass_ = parentCtor.prototype;
  childCtor.prototype = new tempCtor;
  childCtor.prototype.constructor = childCtor
};
goog.base = function() {
};
goog.MODIFY_FUNCTION_PROTOTYPES = true;
if(goog.MODIFY_FUNCTION_PROTOTYPES) {
  Function.prototype.bind = function(selfObj) {
    if(arguments.length > 1) {
      var args = Array.prototype.slice.call(arguments, 1);
      args.unshift(this, selfObj);
      return goog.bind.apply(null, args)
    }else return goog.bind(this, selfObj)
  };
  Function.prototype.partial = function() {
    var args = Array.prototype.slice.call(arguments);
    args.unshift(this, null);
    return goog.bind.apply(null, args)
  };
  Function.prototype.inherits = function(parentCtor) {
    goog.inherits(this, parentCtor)
  };
  Function.prototype.mixin = function(source) {
    goog.mixin(this.prototype, source)
  }
};goog.array = {};
goog.array.ArrayLike = goog.typedef;
goog.array.peek = function(array) {
  return array[array.length - 1]
};
goog.array.ARRAY_PROTOTYPE_ = Array.prototype;
goog.array.indexOf = goog.array.ARRAY_PROTOTYPE_.indexOf ? function(arr, obj, opt_fromIndex) {
  return goog.array.ARRAY_PROTOTYPE_.indexOf.call(arr, obj, opt_fromIndex)
} : function(arr, obj, opt_fromIndex) {
  var fromIndex = opt_fromIndex == null ? 0 : opt_fromIndex < 0 ? Math.max(0, arr.length + opt_fromIndex) : opt_fromIndex;
  if(goog.isString(arr)) {
    if(!goog.isString(obj) || obj.length != 1)return-1;
    return arr.indexOf(obj, fromIndex)
  }for(var i = fromIndex;i < arr.length;i++)if(i in arr && arr[i] === obj)return i;
  return-1
};
goog.array.lastIndexOf = goog.array.ARRAY_PROTOTYPE_.lastIndexOf ? function(arr, obj, opt_fromIndex) {
  return goog.array.ARRAY_PROTOTYPE_.lastIndexOf.call(arr, obj, opt_fromIndex == null ? arr.length - 1 : opt_fromIndex)
} : function(arr, obj, opt_fromIndex) {
  var fromIndex = opt_fromIndex == null ? arr.length - 1 : opt_fromIndex;
  if(fromIndex < 0)fromIndex = Math.max(0, arr.length + fromIndex);
  if(goog.isString(arr)) {
    if(!goog.isString(obj) || obj.length != 1)return-1;
    return arr.lastIndexOf(obj, fromIndex)
  }for(var i = fromIndex;i >= 0;i--)if(i in arr && arr[i] === obj)return i;
  return-1
};
goog.array.forEach = goog.array.ARRAY_PROTOTYPE_.forEach ? function(arr, f, opt_obj) {
  goog.array.ARRAY_PROTOTYPE_.forEach.call(arr, f, opt_obj)
} : function(arr, f, opt_obj) {
  for(var l = arr.length, arr2 = goog.isString(arr) ? arr.split("") : arr, i = 0;i < l;i++)i in arr2 && f.call(opt_obj, arr2[i], i, arr)
};
goog.array.forEachRight = function(arr, f, opt_obj) {
  for(var l = arr.length, arr2 = goog.isString(arr) ? arr.split("") : arr, i = l - 1;i >= 0;--i)i in arr2 && f.call(opt_obj, arr2[i], i, arr)
};
goog.array.filter = goog.array.ARRAY_PROTOTYPE_.filter ? function(arr, f, opt_obj) {
  return goog.array.ARRAY_PROTOTYPE_.filter.call(arr, f, opt_obj)
} : function(arr, f, opt_obj) {
  for(var l = arr.length, res = [], resLength = 0, arr2 = goog.isString(arr) ? arr.split("") : arr, i = 0;i < l;i++)if(i in arr2) {
    var val = arr2[i];
    if(f.call(opt_obj, val, i, arr))res[resLength++] = val
  }return res
};
goog.array.map = goog.array.ARRAY_PROTOTYPE_.map ? function(arr, f, opt_obj) {
  return goog.array.ARRAY_PROTOTYPE_.map.call(arr, f, opt_obj)
} : function(arr, f, opt_obj) {
  for(var l = arr.length, res = [], resLength = 0, arr2 = goog.isString(arr) ? arr.split("") : arr, i = 0;i < l;i++)if(i in arr2)res[resLength++] = f.call(opt_obj, arr2[i], i, arr);
  return res
};
goog.array.reduce = function(arr, f, val, opt_obj) {
  if(arr.reduce)return opt_obj ? arr.reduce(goog.bind(f, opt_obj), val) : arr.reduce(f, val);
  var rval = val;
  goog.array.forEach(arr, function(val, index) {
    rval = f.call(opt_obj, rval, val, index, arr)
  });
  return rval
};
goog.array.reduceRight = function(arr, f, val, opt_obj) {
  if(arr.reduceRight)return opt_obj ? arr.reduceRight(goog.bind(f, opt_obj), val) : arr.reduceRight(f, val);
  var rval = val;
  goog.array.forEachRight(arr, function(val, index) {
    rval = f.call(opt_obj, rval, val, index, arr)
  });
  return rval
};
goog.array.some = goog.array.ARRAY_PROTOTYPE_.some ? function(arr, f, opt_obj) {
  return goog.array.ARRAY_PROTOTYPE_.some.call(arr, f, opt_obj)
} : function(arr, f, opt_obj) {
  for(var l = arr.length, arr2 = goog.isString(arr) ? arr.split("") : arr, i = 0;i < l;i++)if(i in arr2 && f.call(opt_obj, arr2[i], i, arr))return true;
  return false
};
goog.array.every = goog.array.ARRAY_PROTOTYPE_.every ? function(arr, f, opt_obj) {
  return goog.array.ARRAY_PROTOTYPE_.every.call(arr, f, opt_obj)
} : function(arr, f, opt_obj) {
  for(var l = arr.length, arr2 = goog.isString(arr) ? arr.split("") : arr, i = 0;i < l;i++)if(i in arr2 && !f.call(opt_obj, arr2[i], i, arr))return false;
  return true
};
goog.array.find = function(arr, f, opt_obj) {
  var i = goog.array.findIndex(arr, f, opt_obj);
  return i < 0 ? null : goog.isString(arr) ? arr.charAt(i) : arr[i]
};
goog.array.findIndex = function(arr, f, opt_obj) {
  for(var l = arr.length, arr2 = goog.isString(arr) ? arr.split("") : arr, i = 0;i < l;i++)if(i in arr2 && f.call(opt_obj, arr2[i], i, arr))return i;
  return-1
};
goog.array.findRight = function(arr, f, opt_obj) {
  var i = goog.array.findIndexRight(arr, f, opt_obj);
  return i < 0 ? null : goog.isString(arr) ? arr.charAt(i) : arr[i]
};
goog.array.findIndexRight = function(arr, f, opt_obj) {
  for(var l = arr.length, arr2 = goog.isString(arr) ? arr.split("") : arr, i = l - 1;i >= 0;i--)if(i in arr2 && f.call(opt_obj, arr2[i], i, arr))return i;
  return-1
};
goog.array.contains = function(arr, obj) {
  return goog.array.indexOf(arr, obj) >= 0
};
goog.array.isEmpty = function(arr) {
  return arr.length == 0
};
goog.array.clear = function(arr) {
  if(!goog.isArray(arr))for(var i = arr.length - 1;i >= 0;i--)delete arr[i];
  arr.length = 0
};
goog.array.insert = function(arr, obj) {
  goog.array.contains(arr, obj) || arr.push(obj)
};
goog.array.insertAt = function(arr, obj, opt_i) {
  goog.array.splice(arr, opt_i, 0, obj)
};
goog.array.insertArrayAt = function(arr, elementsToAdd, opt_i) {
  goog.partial(goog.array.splice, arr, opt_i, 0).apply(null, elementsToAdd)
};
goog.array.insertBefore = function(arr, obj, opt_obj2) {
  var i;
  arguments.length == 2 || (i = goog.array.indexOf(arr, opt_obj2)) < 0 ? arr.push(obj) : goog.array.insertAt(arr, obj, i)
};
goog.array.remove = function(arr, obj) {
  var i = goog.array.indexOf(arr, obj), rv;
  if(rv = i >= 0)goog.array.removeAt(arr, i);
  return rv
};
goog.array.removeAt = function(arr, i) {
  return goog.array.ARRAY_PROTOTYPE_.splice.call(arr, i, 1).length == 1
};
goog.array.removeIf = function(arr, f, opt_obj) {
  var i = goog.array.findIndex(arr, f, opt_obj);
  if(i >= 0) {
    goog.array.removeAt(arr, i);
    return true
  }return false
};
goog.array.clone = function(arr) {
  if(goog.isArray(arr))return arr.concat();
  else {
    for(var rv = [], i = 0, len = arr.length;i < len;i++)rv[i] = arr[i];
    return rv
  }
};
goog.array.toArray = function(object) {
  if(goog.isArray(object))return object.concat();
  return goog.array.clone(object)
};
goog.array.extend = function(arr1) {
  for(var i = 1;i < arguments.length;i++) {
    var arr2 = arguments[i];
    if(goog.isArrayLike(arr2)) {
      arr2 = goog.array.toArray(arr2);
      arr1.push.apply(arr1, arr2)
    }else arr1.push(arr2)
  }
};
goog.array.splice = function(arr) {
  return goog.array.ARRAY_PROTOTYPE_.splice.apply(arr, goog.array.slice(arguments, 1))
};
goog.array.slice = function(arr, start, opt_end) {
  return arguments.length <= 2 ? goog.array.ARRAY_PROTOTYPE_.slice.call(arr, start) : goog.array.ARRAY_PROTOTYPE_.slice.call(arr, start, opt_end)
};
goog.array.removeDuplicates = function(arr, opt_rv) {
  for(var rv = opt_rv || arr, seen = {}, cursorInsert = 0, cursorRead = 0;cursorRead < arr.length;) {
    var current = arr[cursorRead++], hc = goog.isObject(current) ? goog.getHashCode(current) : current;
    if(!Object.prototype.hasOwnProperty.call(seen, hc)) {
      seen[hc] = true;
      rv[cursorInsert++] = current
    }
  }rv.length = cursorInsert
};
goog.array.binarySearch = function(arr, target, opt_compareFn) {
  for(var left = 0, right = arr.length - 1, compareFn = opt_compareFn || goog.array.defaultCompare;left <= right;) {
    var mid = left + right >> 1, compareResult = compareFn(target, arr[mid]);
    if(compareResult > 0)left = mid + 1;
    else if(compareResult < 0)right = mid - 1;
    else return mid
  }return-(left + 1)
};
goog.array.sort = function(arr, opt_compareFn) {
  goog.array.ARRAY_PROTOTYPE_.sort.call(arr, opt_compareFn || goog.array.defaultCompare)
};
goog.array.stableSort = function(arr, opt_compareFn) {
  function stableCompareFn(obj1, obj2) {
    return valueCompareFn(obj1.value, obj2.value) || obj1.index - obj2.index
  }
  for(var i = 0;i < arr.length;i++)arr[i] = {index:i, value:arr[i]};
  var valueCompareFn = opt_compareFn || goog.array.defaultCompare;
  goog.array.sort(arr, stableCompareFn);
  for(i = 0;i < arr.length;i++)arr[i] = arr[i].value
};
goog.array.sortObjectsByKey = function(arr, key, opt_compareFn) {
  var compare = opt_compareFn || goog.array.defaultCompare;
  goog.array.sort(arr, function(a, b) {
    return compare(a[key], b[key])
  })
};
goog.array.equals = function(arr1, arr2, opt_equalsFn) {
  if(!goog.isArrayLike(arr1) || !goog.isArrayLike(arr2) || arr1.length != arr2.length)return false;
  for(var l = arr1.length, equalsFn = opt_equalsFn || goog.array.defaultCompareEquality, i = 0;i < l;i++)if(!equalsFn(arr1[i], arr2[i]))return false;
  return true
};
goog.array.compare = function(arr1, arr2, opt_equalsFn) {
  return goog.array.equals(arr1, arr2, opt_equalsFn)
};
goog.array.defaultCompare = function(a, b) {
  return a > b ? 1 : a < b ? -1 : 0
};
goog.array.defaultCompareEquality = function(a, b) {
  return a === b
};
goog.array.binaryInsert = function(array, value, opt_compareFn) {
  var index = goog.array.binarySearch(array, value, opt_compareFn);
  if(index < 0) {
    goog.array.insertAt(array, value, -(index + 1));
    return true
  }return false
};
goog.array.binaryRemove = function(array, value, opt_compareFn) {
  var index = goog.array.binarySearch(array, value, opt_compareFn);
  return index >= 0 ? goog.array.removeAt(array, index) : false
};
goog.array.bucket = function(array, sorter) {
  for(var buckets = {}, i = 0;i < array.length;i++) {
    var value = array[i], key = sorter(value, i, array);
    if(goog.isDef(key))(buckets[key] || (buckets[key] = [])).push(value)
  }return buckets
};
goog.array.repeat = function(value, n) {
  for(var array = [], i = 0;i < n;i++)array[i] = value;
  return array
};
goog.array.flatten = function() {
  for(var result = [], i = 0;i < arguments.length;i++) {
    var element = arguments[i];
    goog.isArray(element) ? result.push.apply(result, goog.array.flatten.apply(null, element)) : result.push(element)
  }return result
};
goog.array.rotate = function(array, n) {
  if(array.length) {
    n %= array.length;
    if(n > 0)goog.array.ARRAY_PROTOTYPE_.unshift.apply(array, array.splice(-n, n));
    else n < 0 && goog.array.ARRAY_PROTOTYPE_.push.apply(array, array.splice(0, -n))
  }return array
};goog.dom = {};
goog.dom.classes = {};
goog.dom.classes.set = function(element, className) {
  element.className = className
};
goog.dom.classes.get = function(element) {
  var className = element.className;
  return className && typeof className.split == "function" ? className.split(" ") : []
};
goog.dom.classes.add = function(element) {
  var classes = goog.dom.classes.get(element), args = goog.array.slice(arguments, 1), b = goog.dom.classes.add_(classes, args);
  element.className = classes.join(" ");
  return b
};
goog.dom.classes.remove = function(element) {
  var classes = goog.dom.classes.get(element), args = goog.array.slice(arguments, 1), b = goog.dom.classes.remove_(classes, args);
  element.className = classes.join(" ");
  return b
};
goog.dom.classes.add_ = function(classes, args) {
  for(var rv = 0, i = 0;i < args.length;i++)if(!goog.array.contains(classes, args[i])) {
    classes.push(args[i]);
    rv++
  }return rv == args.length
};
goog.dom.classes.remove_ = function(classes, args) {
  for(var rv = 0, i = 0;i < classes.length;i++)if(goog.array.contains(args, classes[i])) {
    goog.array.splice(classes, i--, 1);
    rv++
  }return rv == args.length
};
goog.dom.classes.swap = function(element, fromClass, toClass) {
  for(var classes = goog.dom.classes.get(element), removed = false, i = 0;i < classes.length;i++)if(classes[i] == fromClass) {
    goog.array.splice(classes, i--, 1);
    removed = true
  }if(removed) {
    classes.push(toClass);
    element.className = classes.join(" ")
  }return removed
};
goog.dom.classes.addRemove = function(element, classesToRemove, classesToAdd) {
  var classes = goog.dom.classes.get(element);
  if(goog.isString(classesToRemove))goog.array.remove(classes, classesToRemove);
  else goog.isArray(classesToRemove) && goog.dom.classes.remove_(classes, classesToRemove);
  if(goog.isString(classesToAdd) && !goog.array.contains(classes, classesToAdd))classes.push(classesToAdd);
  else goog.isArray(classesToAdd) && goog.dom.classes.add_(classes, classesToAdd);
  element.className = classes.join(" ")
};
goog.dom.classes.has = function(element, className) {
  return goog.array.contains(goog.dom.classes.get(element), className)
};
goog.dom.classes.enable = function(element, className, enabled) {
  enabled ? goog.dom.classes.add(element, className) : goog.dom.classes.remove(element, className)
};
goog.dom.classes.toggle = function(element, className) {
  var add = !goog.dom.classes.has(element, className);
  goog.dom.classes.enable(element, className, add);
  return add
};goog.math = {};
goog.math.Coordinate = function(opt_x, opt_y) {
  this.x = goog.isDef(opt_x) ? opt_x : 0;
  this.y = goog.isDef(opt_y) ? opt_y : 0
};
goog.math.Coordinate.prototype.clone = function() {
  return new goog.math.Coordinate(this.x, this.y)
};
if(goog.DEBUG)goog.math.Coordinate.prototype.toString = function() {
  return"(" + this.x + ", " + this.y + ")"
};
goog.math.Coordinate.equals = function(a, b) {
  if(a == b)return true;
  if(!a || !b)return false;
  return a.x == b.x && a.y == b.y
};
goog.math.Coordinate.distance = function(a, b) {
  var dx = a.x - b.x, dy = a.y - b.y;
  return Math.sqrt(dx * dx + dy * dy)
};
goog.math.Coordinate.squaredDistance = function(a, b) {
  var dx = a.x - b.x, dy = a.y - b.y;
  return dx * dx + dy * dy
};
goog.math.Coordinate.difference = function(a, b) {
  return new goog.math.Coordinate(a.x - b.x, a.y - b.y)
};
goog.math.Coordinate.sum = function(a, b) {
  return new goog.math.Coordinate(a.x + b.x, a.y + b.y)
};goog.math.Size = function(width, height) {
  this.width = width;
  this.height = height
};
goog.math.Size.equals = function(a, b) {
  if(a == b)return true;
  if(!a || !b)return false;
  return a.width == b.width && a.height == b.height
};
goog.math.Size.prototype.clone = function() {
  return new goog.math.Size(this.width, this.height)
};
if(goog.DEBUG)goog.math.Size.prototype.toString = function() {
  return"(" + this.width + " x " + this.height + ")"
};
goog.math.Size.prototype.area = function() {
  return this.width * this.height
};
goog.math.Size.prototype.isEmpty = function() {
  return!this.area()
};
goog.math.Size.prototype.floor = function() {
  this.width = Math.floor(this.width);
  this.height = Math.floor(this.height);
  return this
};
goog.math.Size.prototype.round = function() {
  this.width = Math.round(this.width);
  this.height = Math.round(this.height);
  return this
};goog.object = {};
goog.object.forEach = function(obj, f, opt_obj) {
  for(var key in obj)f.call(opt_obj, obj[key], key, obj)
};
goog.object.filter = function(obj, f, opt_obj) {
  var res = {};
  for(var key in obj)if(f.call(opt_obj, obj[key], key, obj))res[key] = obj[key];
  return res
};
goog.object.map = function(obj, f, opt_obj) {
  var res = {};
  for(var key in obj)res[key] = f.call(opt_obj, obj[key], key, obj);
  return res
};
goog.object.some = function(obj, f, opt_obj) {
  for(var key in obj)if(f.call(opt_obj, obj[key], key, obj))return true;
  return false
};
goog.object.every = function(obj, f, opt_obj) {
  for(var key in obj)if(!f.call(opt_obj, obj[key], key, obj))return false;
  return true
};
goog.object.getCount = function(obj) {
  var rv = 0;
  for(var key in obj)rv++;
  return rv
};
goog.object.getAnyKey = function(obj) {
  for(var key in obj)return key
};
goog.object.getAnyValue = function(obj) {
  for(var key in obj)return obj[key]
};
goog.object.contains = function(obj, val) {
  return goog.object.containsValue(obj, val)
};
goog.object.getValues = function(obj) {
  var res = [], i = 0;
  for(var key in obj)res[i++] = obj[key];
  return res
};
goog.object.getKeys = function(obj) {
  var res = [], i = 0;
  for(var key in obj)res[i++] = key;
  return res
};
goog.object.containsKey = function(obj, key) {
  return key in obj
};
goog.object.containsValue = function(obj, val) {
  for(var key in obj)if(obj[key] == val)return true;
  return false
};
goog.object.findKey = function(obj, f, opt_this) {
  for(var key in obj)if(f.call(opt_this, obj[key], key, obj))return key
};
goog.object.findValue = function(obj, f, opt_this) {
  var key = goog.object.findKey(obj, f, opt_this);
  return key && obj[key]
};
goog.object.isEmpty = function(obj) {
  for(var key in obj)return false;
  return true
};
goog.object.clear = function(obj) {
  for(var keys = goog.object.getKeys(obj), i = keys.length - 1;i >= 0;i--)goog.object.remove(obj, keys[i])
};
goog.object.remove = function(obj, key) {
  var rv;
  if(rv = key in obj)delete obj[key];
  return rv
};
goog.object.add = function(obj, key, val) {
  if(key in obj)throw Error('The object already contains the key "' + key + '"');goog.object.set(obj, key, val)
};
goog.object.get = function(obj, key, opt_val) {
  if(key in obj)return obj[key];
  return opt_val
};
goog.object.set = function(obj, key, value) {
  obj[key] = value
};
goog.object.setIfUndefined = function(obj, key, value) {
  return key in obj ? obj[key] : (obj[key] = value)
};
goog.object.clone = function(obj) {
  var res = {};
  for(var key in obj)res[key] = obj[key];
  return res
};
goog.object.transpose = function(obj) {
  var transposed = {};
  for(var key in obj)transposed[obj[key]] = key;
  return transposed
};
goog.object.PROTOTYPE_FIELDS_ = ["constructor", "hasOwnProperty", "isPrototypeOf", "propertyIsEnumerable", "toLocaleString", "toString", "valueOf"];
goog.object.extend = function(target) {
  for(var key, source, i = 1;i < arguments.length;i++) {
    source = arguments[i];
    for(key in source)target[key] = source[key];
    for(var j = 0;j < goog.object.PROTOTYPE_FIELDS_.length;j++) {
      key = goog.object.PROTOTYPE_FIELDS_[j];
      if(Object.prototype.hasOwnProperty.call(source, key))target[key] = source[key]
    }
  }
};
goog.object.create = function() {
  var argLength = arguments.length;
  if(argLength == 1 && goog.isArray(arguments[0]))return goog.object.create.apply(null, arguments[0]);
  if(argLength % 2)throw Error("Uneven number of arguments");for(var rv = {}, i = 0;i < argLength;i += 2)rv[arguments[i]] = arguments[i + 1];
  return rv
};
goog.object.createSet = function() {
  var argLength = arguments.length;
  if(argLength == 1 && goog.isArray(arguments[0]))return goog.object.createSet.apply(null, arguments[0]);
  for(var rv = {}, i = 0;i < argLength;i++)rv[arguments[i]] = true;
  return rv
};goog.string = {};
goog.string.Unicode = {NBSP:"\u00a0"};
goog.string.startsWith = function(str, prefix) {
  return str.indexOf(prefix) == 0
};
goog.string.endsWith = function(str, suffix) {
  var l = str.length - suffix.length;
  return l >= 0 && str.lastIndexOf(suffix, l) == l
};
goog.string.caseInsensitiveStartsWith = function(str, prefix) {
  return goog.string.caseInsensitiveCompare(prefix, str.substr(0, prefix.length)) == 0
};
goog.string.caseInsensitiveEndsWith = function(str, suffix) {
  return goog.string.caseInsensitiveCompare(suffix, str.substr(str.length - suffix.length, suffix.length)) == 0
};
goog.string.subs = function(str) {
  for(var i = 1;i < arguments.length;i++) {
    var replacement = String(arguments[i]).replace(/\$/g, "$$$$");
    str = str.replace(/\%s/, replacement)
  }return str
};
goog.string.collapseWhitespace = function(str) {
  return str.replace(/[\s\xa0]+/g, " ").replace(/^\s+|\s+$/g, "")
};
goog.string.isEmpty = function(str) {
  return/^[\s\xa0]*$/.test(str)
};
goog.string.isEmptySafe = function(str) {
  return goog.string.isEmpty(goog.string.makeSafe(str))
};
goog.string.isBreakingWhitespace = function(str) {
  return!/[^\t\n\r ]/.test(str)
};
goog.string.isAlpha = function(str) {
  return!/[^a-zA-Z]/.test(str)
};
goog.string.isNumeric = function(str) {
  return!/[^0-9]/.test(str)
};
goog.string.isAlphaNumeric = function(str) {
  return!/[^a-zA-Z0-9]/.test(str)
};
goog.string.isSpace = function(ch) {
  return ch == " "
};
goog.string.isUnicodeChar = function(ch) {
  return ch.length == 1 && ch >= " " && ch <= "~" || ch >= "\u0080" && ch <= "\ufffd"
};
goog.string.stripNewlines = function(str) {
  return str.replace(/(\r\n|\r|\n)+/g, " ")
};
goog.string.canonicalizeNewlines = function(str) {
  return str.replace(/(\r\n|\r|\n)/g, "\n")
};
goog.string.normalizeWhitespace = function(str) {
  return str.replace(/\xa0|\s/g, " ")
};
goog.string.normalizeSpaces = function(str) {
  return str.replace(/\xa0|[ \t]+/g, " ")
};
goog.string.trim = function(str) {
  return str.replace(/^[\s\xa0]+|[\s\xa0]+$/g, "")
};
goog.string.trimLeft = function(str) {
  return str.replace(/^[\s\xa0]+/, "")
};
goog.string.trimRight = function(str) {
  return str.replace(/[\s\xa0]+$/, "")
};
goog.string.caseInsensitiveCompare = function(str1, str2) {
  var test1 = String(str1).toLowerCase(), test2 = String(str2).toLowerCase();
  return test1 < test2 ? -1 : test1 == test2 ? 0 : 1
};
goog.string.numerateCompareRegExp_ = /(\.\d+)|(\d+)|(\D+)/g;
goog.string.numerateCompare = function(str1, str2) {
  if(str1 == str2)return 0;
  if(!str1)return-1;
  if(!str2)return 1;
  for(var tokens1 = str1.toLowerCase().match(goog.string.numerateCompareRegExp_), tokens2 = str2.toLowerCase().match(goog.string.numerateCompareRegExp_), count = Math.min(tokens1.length, tokens2.length), i = 0;i < count;i++) {
    var a = tokens1[i], b = tokens2[i];
    if(a != b) {
      var num1 = parseInt(a, 10);
      if(!isNaN(num1)) {
        var num2 = parseInt(b, 10);
        if(!isNaN(num2) && num1 - num2)return num1 - num2
      }return a < b ? -1 : 1
    }
  }if(tokens1.length != tokens2.length)return tokens1.length - tokens2.length;
  return str1 < str2 ? -1 : 1
};
goog.string.encodeUriRegExp_ = /^[a-zA-Z0-9\-_.!~*'()]*$/;
goog.string.urlEncode = function(str) {
  str = String(str);
  if(!goog.string.encodeUriRegExp_.test(str))return encodeURIComponent(str);
  return str
};
goog.string.urlDecode = function(str) {
  return decodeURIComponent(str.replace(/\+/g, " "))
};
goog.string.newLineToBr = function(str, opt_xml) {
  return str.replace(/(\r\n|\r|\n)/g, opt_xml ? "<br />" : "<br>")
};
goog.string.htmlEscape = function(str, opt_isLikelyToContainHtmlChars) {
  if(opt_isLikelyToContainHtmlChars)return str.replace(goog.string.amperRe_, "&amp;").replace(goog.string.ltRe_, "&lt;").replace(goog.string.gtRe_, "&gt;").replace(goog.string.quotRe_, "&quot;");
  else {
    if(!goog.string.allRe_.test(str))return str;
    if(str.indexOf("&") != -1)str = str.replace(goog.string.amperRe_, "&amp;");
    if(str.indexOf("<") != -1)str = str.replace(goog.string.ltRe_, "&lt;");
    if(str.indexOf(">") != -1)str = str.replace(goog.string.gtRe_, "&gt;");
    if(str.indexOf('"') != -1)str = str.replace(goog.string.quotRe_, "&quot;");
    return str
  }
};
goog.string.amperRe_ = /&/g;
goog.string.ltRe_ = /</g;
goog.string.gtRe_ = />/g;
goog.string.quotRe_ = /\"/g;
goog.string.allRe_ = /[&<>\"]/;
goog.string.unescapeEntities = function(str) {
  if(goog.string.contains(str, "&"))return"document" in goog.global && !goog.string.contains(str, "<") ? goog.string.unescapeEntitiesUsingDom_(str) : goog.string.unescapePureXmlEntities_(str);
  return str
};
goog.string.unescapeEntitiesUsingDom_ = function(str) {
  var el = goog.global.document.createElement("a");
  el.innerHTML = str;
  el[goog.string.NORMALIZE_FN_] && el[goog.string.NORMALIZE_FN_]();
  str = el.firstChild.nodeValue;
  el.innerHTML = "";
  return str
};
goog.string.unescapePureXmlEntities_ = function(str) {
  return str.replace(/&([^;]+);/g, function(s, entity) {
    switch(entity) {
      case "amp":
        return"&";
      case "lt":
        return"<";
      case "gt":
        return">";
      case "quot":
        return'"';
      default:
        if(entity.charAt(0) == "#") {
          var n = Number("0" + entity.substr(1));
          if(!isNaN(n))return String.fromCharCode(n)
        }return s
    }
  })
};
goog.string.NORMALIZE_FN_ = "normalize";
goog.string.whitespaceEscape = function(str, opt_xml) {
  return goog.string.newLineToBr(str.replace(/  /g, " &#160;"), opt_xml)
};
goog.string.stripQuotes = function(str, quoteChars) {
  for(var length = quoteChars.length, i = 0;i < length;i++) {
    var quoteChar = length == 1 ? quoteChars : quoteChars.charAt(i);
    if(str.charAt(0) == quoteChar && str.charAt(str.length - 1) == quoteChar)return str.substring(1, str.length - 1)
  }return str
};
goog.string.truncate = function(str, chars, opt_protectEscapedCharacters) {
  if(opt_protectEscapedCharacters)str = goog.string.unescapeEntities(str);
  if(str.length > chars)str = str.substring(0, chars - 3) + "...";
  if(opt_protectEscapedCharacters)str = goog.string.htmlEscape(str);
  return str
};
goog.string.truncateMiddle = function(str, chars, opt_protectEscapedCharacters) {
  if(opt_protectEscapedCharacters)str = goog.string.unescapeEntities(str);
  if(str.length > chars) {
    var half = Math.floor(chars / 2), endPos = str.length - half;
    half += chars % 2;
    str = str.substring(0, half) + "..." + str.substring(endPos)
  }if(opt_protectEscapedCharacters)str = goog.string.htmlEscape(str);
  return str
};
goog.string.jsEscapeCache_ = {"\u0008":"\\b", "\u000c":"\\f", "\n":"\\n", "\r":"\\r", "\t":"\\t", "\u000b":"\\x0B", '"':'\\"', "'":"\\'", "\\":"\\\\"};
goog.string.quote = function(s) {
  s = String(s);
  if(s.quote)return s.quote();
  else {
    for(var sb = ['"'], i = 0;i < s.length;i++)sb[i + 1] = goog.string.escapeChar(s.charAt(i));
    sb.push('"');
    return sb.join("")
  }
};
goog.string.escapeChar = function(c) {
  if(c in goog.string.jsEscapeCache_)return goog.string.jsEscapeCache_[c];
  var rv = c, cc = c.charCodeAt(0);
  if(cc > 31 && cc < 127)rv = c;
  else {
    if(cc < 256) {
      rv = "\\x";
      if(cc < 16 || cc > 256)rv += "0"
    }else {
      rv = "\\u";
      if(cc < 4096)rv += "0"
    }rv += cc.toString(16).toUpperCase()
  }return goog.string.jsEscapeCache_[c] = rv
};
goog.string.toMap = function(s) {
  for(var rv = {}, i = 0;i < s.length;i++)rv[s.charAt(i)] = true;
  return rv
};
goog.string.contains = function(s, ss) {
  return s.indexOf(ss) != -1
};
goog.string.removeAt = function(s, index, stringLength) {
  var resultStr = s;
  if(index >= 0 && index < s.length && stringLength > 0)resultStr = s.substr(0, index) + s.substr(index + stringLength, s.length - index - stringLength);
  return resultStr
};
goog.string.remove = function(s, ss) {
  var re = new RegExp(goog.string.regExpEscape(ss), "");
  return s.replace(re, "")
};
goog.string.removeAll = function(s, ss) {
  var re = new RegExp(goog.string.regExpEscape(ss), "g");
  return s.replace(re, "")
};
goog.string.regExpEscape = function(s) {
  return String(s).replace(/([-()\[\]{}+?*.$\^|,:#<!\\])/g, "\\$1").replace(/\x08/g, "\\x08")
};
goog.string.repeat = function(string, length) {
  return(new Array(length + 1)).join(string)
};
goog.string.padNumber = function(num, length, opt_precision) {
  var s = goog.isDef(opt_precision) ? num.toFixed(opt_precision) : String(num), index = s.indexOf(".");
  if(index == -1)index = s.length;
  return goog.string.repeat("0", Math.max(0, length - index)) + s
};
goog.string.makeSafe = function(obj) {
  return obj == null ? "" : String(obj)
};
goog.string.buildString = function() {
  return Array.prototype.join.call(arguments, "")
};
goog.string.getRandomString = function() {
  return Math.floor(Math.random() * 2147483648).toString(36) + (Math.floor(Math.random() * 2147483648) ^ (new Date).getTime()).toString(36)
};
goog.string.compareVersions = function(version1, version2) {
  for(var order = 0, v1Subs = goog.string.trim(String(version1)).split("."), v2Subs = goog.string.trim(String(version2)).split("."), subCount = Math.max(v1Subs.length, v2Subs.length), subIdx = 0;order == 0 && subIdx < subCount;subIdx++) {
    var v1Sub = v1Subs[subIdx] || "", v2Sub = v2Subs[subIdx] || "", v1CompParser = new RegExp("(\\d*)(\\D*)", "g"), v2CompParser = new RegExp("(\\d*)(\\D*)", "g");
    do {
      var v1Comp = v1CompParser.exec(v1Sub) || ["", "", ""], v2Comp = v2CompParser.exec(v2Sub) || ["", "", ""];
      if(v1Comp[0].length == 0 && v2Comp[0].length == 0)break;
      order = goog.string.compareElements_(v1Comp[1].length == 0 ? 0 : parseInt(v1Comp[1], 10), v2Comp[1].length == 0 ? 0 : parseInt(v2Comp[1], 10)) || goog.string.compareElements_(v1Comp[2].length == 0, v2Comp[2].length == 0) || goog.string.compareElements_(v1Comp[2], v2Comp[2])
    }while(order == 0)
  }return order
};
goog.string.compareElements_ = function(left, right) {
  if(left < right)return-1;
  else if(left > right)return 1;
  return 0
};
goog.string.HASHCODE_MAX_ = 4294967296;
goog.string.hashCode = function(str) {
  for(var result = 0, i = 0;i < str.length;++i) {
    result = 31 * result + str.charCodeAt(i);
    result %= goog.string.HASHCODE_MAX_
  }return result
};
goog.string.uniqueStringCounter_ = goog.now();
goog.string.createUniqueString = function() {
  return"goog_" + goog.string.uniqueStringCounter_++
};
goog.string.toNumber = function(str) {
  var num = Number(str);
  if(num == 0 && goog.string.isEmpty(str))return NaN;
  return num
};goog.userAgent = {};
goog.userAgent.ASSUME_IE = false;
goog.userAgent.ASSUME_GECKO = false;
goog.userAgent.ASSUME_WEBKIT = false;
goog.userAgent.ASSUME_MOBILE_WEBKIT = false;
goog.userAgent.ASSUME_OPERA = false;
goog.userAgent.BROWSER_KNOWN_ = goog.userAgent.ASSUME_IE || goog.userAgent.ASSUME_GECKO || goog.userAgent.ASSUME_MOBILE_WEBKIT || goog.userAgent.ASSUME_WEBKIT || goog.userAgent.ASSUME_OPERA;
goog.userAgent.getUserAgentString = function() {
  return goog.global.navigator ? goog.global.navigator.userAgent : null
};
goog.userAgent.getNavigator = function() {
  return goog.global.navigator
};
goog.userAgent.init_ = function() {
  goog.userAgent.detectedOpera_ = false;
  goog.userAgent.detectedIe_ = false;
  goog.userAgent.detectedWebkit_ = false;
  goog.userAgent.detectedMobile_ = false;
  goog.userAgent.detectedGecko_ = false;
  var ua;
  if(!goog.userAgent.BROWSER_KNOWN_ && (ua = goog.userAgent.getUserAgentString())) {
    var navigator = goog.userAgent.getNavigator();
    goog.userAgent.detectedOpera_ = ua.indexOf("Opera") == 0;
    goog.userAgent.detectedIe_ = !goog.userAgent.detectedOpera_ && ua.indexOf("MSIE") != -1;
    goog.userAgent.detectedWebkit_ = !goog.userAgent.detectedOpera_ && ua.indexOf("WebKit") != -1;
    goog.userAgent.detectedMobile_ = goog.userAgent.detectedWebkit_ && ua.indexOf("Mobile") != -1;
    goog.userAgent.detectedGecko_ = !goog.userAgent.detectedOpera_ && !goog.userAgent.detectedWebkit_ && navigator.product == "Gecko"
  }
};
goog.userAgent.BROWSER_KNOWN_ || goog.userAgent.init_();
goog.userAgent.OPERA = goog.userAgent.BROWSER_KNOWN_ ? goog.userAgent.ASSUME_OPERA : goog.userAgent.detectedOpera_;
goog.userAgent.IE = goog.userAgent.BROWSER_KNOWN_ ? goog.userAgent.ASSUME_IE : goog.userAgent.detectedIe_;
goog.userAgent.GECKO = goog.userAgent.BROWSER_KNOWN_ ? goog.userAgent.ASSUME_GECKO : goog.userAgent.detectedGecko_;
goog.userAgent.WEBKIT = goog.userAgent.BROWSER_KNOWN_ ? goog.userAgent.ASSUME_WEBKIT || goog.userAgent.ASSUME_MOBILE_WEBKIT : goog.userAgent.detectedWebkit_;
goog.userAgent.MOBILE = goog.userAgent.ASSUME_MOBILE_WEBKIT || goog.userAgent.detectedMobile_;
goog.userAgent.SAFARI = goog.userAgent.WEBKIT;
goog.userAgent.determinePlatform_ = function() {
  var navigator = goog.userAgent.getNavigator();
  return navigator && navigator.platform || ""
};
goog.userAgent.PLATFORM = goog.userAgent.determinePlatform_();
goog.userAgent.ASSUME_MAC = false;
goog.userAgent.ASSUME_WINDOWS = false;
goog.userAgent.ASSUME_LINUX = false;
goog.userAgent.ASSUME_X11 = false;
goog.userAgent.PLATFORM_KNOWN_ = goog.userAgent.ASSUME_MAC || goog.userAgent.ASSUME_WINDOWS || goog.userAgent.ASSUME_LINUX || goog.userAgent.ASSUME_X11;
goog.userAgent.initPlatform_ = function() {
  goog.userAgent.detectedMac_ = goog.string.contains(goog.userAgent.PLATFORM, "Mac");
  goog.userAgent.detectedWindows_ = goog.string.contains(goog.userAgent.PLATFORM, "Win");
  goog.userAgent.detectedLinux_ = goog.string.contains(goog.userAgent.PLATFORM, "Linux");
  goog.userAgent.detectedX11_ = !!goog.userAgent.getNavigator() && goog.string.contains(goog.userAgent.getNavigator().appVersion || "", "X11")
};
goog.userAgent.PLATFORM_KNOWN_ || goog.userAgent.initPlatform_();
goog.userAgent.MAC = goog.userAgent.PLATFORM_KNOWN_ ? goog.userAgent.ASSUME_MAC : goog.userAgent.detectedMac_;
goog.userAgent.WINDOWS = goog.userAgent.PLATFORM_KNOWN_ ? goog.userAgent.ASSUME_WINDOWS : goog.userAgent.detectedWindows_;
goog.userAgent.LINUX = goog.userAgent.PLATFORM_KNOWN_ ? goog.userAgent.ASSUME_LINUX : goog.userAgent.detectedLinux_;
goog.userAgent.X11 = goog.userAgent.PLATFORM_KNOWN_ ? goog.userAgent.ASSUME_X11 : goog.userAgent.detectedX11_;
goog.userAgent.determineVersion_ = function() {
  var version = "", re;
  if(goog.userAgent.OPERA && goog.global.opera) {
    var operaVersion = goog.global.opera.version;
    version = typeof operaVersion == "function" ? operaVersion() : operaVersion
  }else {
    if(goog.userAgent.GECKO)re = /rv\:([^\);]+)(\)|;)/;
    else if(goog.userAgent.IE)re = /MSIE\s+([^\);]+)(\)|;)/;
    else if(goog.userAgent.WEBKIT)re = /WebKit\/(\S+)/;
    if(re) {
      var arr = re.exec(goog.userAgent.getUserAgentString());
      version = arr ? arr[1] : ""
    }
  }return version
};
goog.userAgent.VERSION = goog.userAgent.determineVersion_();
goog.userAgent.compare = function(v1, v2) {
  return goog.string.compareVersions(v1, v2)
};
goog.userAgent.isVersionCache_ = {};
goog.userAgent.isVersion = function(version) {
  return goog.userAgent.isVersionCache_[version] || (goog.userAgent.isVersionCache_[version] = goog.string.compareVersions(goog.userAgent.VERSION, version) >= 0)
};goog.dom.TagName = {A:"A", ABBR:"ABBR", ACRONYM:"ACRONYM", ADDRESS:"ADDRESS", APPLET:"APPLET", AREA:"AREA", B:"B", BASE:"BASE", BASEFONT:"BASEFONT", BDO:"BDO", BIG:"BIG", BLOCKQUOTE:"BLOCKQUOTE", BODY:"BODY", BR:"BR", BUTTON:"BUTTON", CAPTION:"CAPTION", CENTER:"CENTER", CITE:"CITE", CODE:"CODE", COL:"COL", COLGROUP:"COLGROUP", DD:"DD", DEL:"DEL", DFN:"DFN", DIR:"DIR", DIV:"DIV", DL:"DL", DT:"DT", EM:"EM", FIELDSET:"FIELDSET", FONT:"FONT", FORM:"FORM", FRAME:"FRAME", FRAMESET:"FRAMESET", H1:"H1", 
H2:"H2", H3:"H3", H4:"H4", H5:"H5", H6:"H6", HEAD:"HEAD", HR:"HR", HTML:"HTML", I:"I", IFRAME:"IFRAME", IMG:"IMG", INPUT:"INPUT", INS:"INS", ISINDEX:"ISINDEX", KBD:"KBD", LABEL:"LABEL", LEGEND:"LEGEND", LI:"LI", LINK:"LINK", MAP:"MAP", MENU:"MENU", META:"META", NOFRAMES:"NOFRAMES", NOSCRIPT:"NOSCRIPT", OBJECT:"OBJECT", OL:"OL", OPTGROUP:"OPTGROUP", OPTION:"OPTION", P:"P", PARAM:"PARAM", PRE:"PRE", Q:"Q", S:"S", SAMP:"SAMP", SCRIPT:"SCRIPT", SELECT:"SELECT", SMALL:"SMALL", SPAN:"SPAN", STRIKE:"STRIKE", 
STRONG:"STRONG", STYLE:"STYLE", SUB:"SUB", SUP:"SUP", TABLE:"TABLE", TBODY:"TBODY", TD:"TD", TEXTAREA:"TEXTAREA", TFOOT:"TFOOT", TH:"TH", THEAD:"THEAD", TITLE:"TITLE", TR:"TR", TT:"TT", U:"U", UL:"UL", VAR:"VAR"};goog.dom.ASSUME_QUIRKS_MODE = false;
goog.dom.ASSUME_STANDARDS_MODE = false;
goog.dom.COMPAT_MODE_KNOWN_ = goog.dom.ASSUME_QUIRKS_MODE || goog.dom.ASSUME_STANDARDS_MODE;
goog.dom.NodeType = {ELEMENT:1, ATTRIBUTE:2, TEXT:3, CDATA_SECTION:4, ENTITY_REFERENCE:5, ENTITY:6, PROCESSING_INSTRUCTION:7, COMMENT:8, DOCUMENT:9, DOCUMENT_TYPE:10, DOCUMENT_FRAGMENT:11, NOTATION:12};
goog.dom.getDomHelper = function(opt_element) {
  return opt_element ? new goog.dom.DomHelper(goog.dom.getOwnerDocument(opt_element)) : goog.dom.defaultDomHelper_ || (goog.dom.defaultDomHelper_ = new goog.dom.DomHelper)
};
goog.dom.getDocument = function() {
  return document
};
goog.dom.getElement = function(element) {
  return goog.isString(element) ? document.getElementById(element) : element
};
goog.dom.$ = goog.dom.getElement;
goog.dom.getElementsByTagNameAndClass = function(opt_tag, opt_class, opt_el) {
  return goog.dom.getElementsByTagNameAndClass_(document, opt_tag, opt_class, opt_el)
};
goog.dom.getElementsByTagNameAndClass_ = function(doc, opt_tag, opt_class, opt_el) {
  var parent = opt_el || doc, tagName = opt_tag && opt_tag != "*" ? opt_tag.toLowerCase() : "";
  if(parent.querySelectorAll && (tagName || opt_class) && (!goog.userAgent.WEBKIT || goog.dom.isCss1CompatMode_(doc) || goog.userAgent.isVersion("528")))return parent.querySelectorAll(tagName + (opt_class ? "." + opt_class : ""));
  if(opt_class && parent.getElementsByClassName) {
    var els = parent.getElementsByClassName(opt_class);
    if(tagName) {
      for(var arrayLike = {}, len = 0, i = 0, el;el = els[i];i++)if(tagName == el.nodeName.toLowerCase())arrayLike[len++] = el;
      arrayLike.length = len;
      return arrayLike
    }else return els
  }els = parent.getElementsByTagName(tagName || "*");
  if(opt_class) {
    arrayLike = {};
    for(i = len = 0;el = els[i];i++) {
      var className = el.className;
      if(typeof className.split == "function" && goog.array.contains(className.split(" "), opt_class))arrayLike[len++] = el
    }arrayLike.length = len;
    return arrayLike
  }else return els
};
goog.dom.$$ = goog.dom.getElementsByTagNameAndClass;
goog.dom.setProperties = function(element, properties) {
  goog.object.forEach(properties, function(val, key) {
    if(key == "style")element.style.cssText = val;
    else if(key == "class")element.className = val;
    else if(key == "for")element.htmlFor = val;
    else if(key in goog.dom.DIRECT_ATTRIBUTE_MAP_)element.setAttribute(goog.dom.DIRECT_ATTRIBUTE_MAP_[key], val);
    else element[key] = val
  })
};
goog.dom.DIRECT_ATTRIBUTE_MAP_ = {cellpadding:"cellPadding", cellspacing:"cellSpacing", colspan:"colSpan", rowspan:"rowSpan", valign:"vAlign", height:"height", width:"width", usemap:"useMap", frameborder:"frameBorder", type:"type"};
goog.dom.getViewportSize = function(opt_window) {
  return goog.dom.getViewportSize_(opt_window || window)
};
goog.dom.getViewportSize_ = function(win) {
  var doc = win.document;
  if(goog.userAgent.WEBKIT && !goog.userAgent.isVersion("500") && !goog.userAgent.MOBILE) {
    if(typeof win.innerHeight == "undefined")win = window;
    var innerHeight = win.innerHeight, scrollHeight = win.document.documentElement.scrollHeight;
    if(win == win.top)if(scrollHeight < innerHeight)innerHeight -= 15;
    return new goog.math.Size(win.innerWidth, innerHeight)
  }var el = goog.dom.isCss1CompatMode_(doc) && (!goog.userAgent.OPERA || goog.userAgent.OPERA && goog.userAgent.isVersion("9.50")) ? doc.documentElement : doc.body;
  return new goog.math.Size(el.clientWidth, el.clientHeight)
};
goog.dom.getDocumentHeight = function() {
  return goog.dom.getDocumentHeight_(window)
};
goog.dom.getDocumentHeight_ = function(win) {
  var doc = win.document, height = 0;
  if(doc) {
    var vh = goog.dom.getViewportSize_(win).height, body = doc.body, docEl = doc.documentElement;
    if(goog.dom.isCss1CompatMode_(doc) && docEl.scrollHeight)height = docEl.scrollHeight != vh ? docEl.scrollHeight : docEl.offsetHeight;
    else {
      var sh = docEl.scrollHeight, oh = docEl.offsetHeight;
      if(docEl.clientHeight != oh) {
        sh = body.scrollHeight;
        oh = body.offsetHeight
      }height = sh > vh ? sh > oh ? sh : oh : sh < oh ? sh : oh
    }
  }return height
};
goog.dom.getPageScroll = function(opt_window) {
  return goog.dom.getDomHelper((opt_window || goog.global || window).document).getDocumentScroll()
};
goog.dom.getDocumentScroll = function() {
  return goog.dom.getDocumentScroll_(document)
};
goog.dom.getDocumentScroll_ = function(doc) {
  var el = goog.dom.getDocumentScrollElement_(doc);
  return new goog.math.Coordinate(el.scrollLeft, el.scrollTop)
};
goog.dom.getDocumentScrollElement = function() {
  return goog.dom.getDocumentScrollElement_(document)
};
goog.dom.getDocumentScrollElement_ = function(doc) {
  return!goog.userAgent.WEBKIT && goog.dom.isCss1CompatMode_(doc) ? doc.documentElement : doc.body
};
goog.dom.getWindow = function(opt_doc) {
  return opt_doc ? goog.dom.getWindow_(opt_doc) : window
};
goog.dom.getWindow_ = function(doc) {
  if(doc.parentWindow)return doc.parentWindow;
  if(goog.userAgent.WEBKIT && !goog.userAgent.isVersion("500") && !goog.userAgent.MOBILE) {
    var scriptElement = doc.createElement("script");
    scriptElement.innerHTML = "document.parentWindow=window";
    var parentElement = doc.documentElement;
    parentElement.appendChild(scriptElement);
    parentElement.removeChild(scriptElement);
    return doc.parentWindow
  }return doc.defaultView
};
goog.dom.createDom = function() {
  return goog.dom.createDom_(document, arguments)
};
goog.dom.createDom_ = function(doc, args) {
  var tagName = args[0], attributes = args[1];
  if(goog.userAgent.IE && attributes && (attributes.name || attributes.type)) {
    var tagNameArr = ["<", tagName];
    attributes.name && tagNameArr.push(' name="', goog.string.htmlEscape(attributes.name), '"');
    if(attributes.type) {
      tagNameArr.push(' type="', goog.string.htmlEscape(attributes.type), '"');
      attributes = goog.cloneObject(attributes);
      delete attributes.type
    }tagNameArr.push(">");
    tagName = tagNameArr.join("")
  }var element = doc.createElement(tagName);
  if(attributes)if(goog.isString(attributes))element.className = attributes;
  else goog.dom.setProperties(element, attributes);
  if(args.length > 2)for(var childHandler = function(child) {
    if(child)element.appendChild(goog.isString(child) ? doc.createTextNode(child) : child)
  }, i = 2;i < args.length;i++) {
    var arg = args[i];
    goog.isArrayLike(arg) && !goog.dom.isNodeLike(arg) ? goog.array.forEach(goog.dom.isNodeList(arg) ? goog.array.clone(arg) : arg, childHandler) : childHandler(arg)
  }return element
};
goog.dom.$dom = goog.dom.createDom;
goog.dom.createElement = function(name) {
  return document.createElement(name)
};
goog.dom.createTextNode = function(content) {
  return document.createTextNode(content)
};
goog.dom.htmlToDocumentFragment = function(htmlString) {
  return goog.dom.htmlToDocumentFragment_(document, htmlString)
};
goog.dom.htmlToDocumentFragment_ = function(doc, htmlString) {
  var tempDiv = doc.createElement("div");
  tempDiv.innerHTML = htmlString;
  if(tempDiv.childNodes.length == 1)return tempDiv.firstChild;
  else {
    for(var fragment = doc.createDocumentFragment();tempDiv.firstChild;)fragment.appendChild(tempDiv.firstChild);
    return fragment
  }
};
goog.dom.getCompatMode = function() {
  return goog.dom.isCss1CompatMode() ? "CSS1Compat" : "BackCompat"
};
goog.dom.isCss1CompatMode = function() {
  return goog.dom.isCss1CompatMode_(document)
};
goog.dom.isCss1CompatMode_ = function(doc) {
  if(goog.dom.COMPAT_MODE_KNOWN_)return goog.dom.ASSUME_STANDARDS_MODE;
  return doc.compatMode == "CSS1Compat"
};
goog.dom.canHaveChildren = function(node) {
  if(node.nodeType != goog.dom.NodeType.ELEMENT)return false;
  if("canHaveChildren" in node)return node.canHaveChildren;
  switch(node.tagName) {
    case goog.dom.TagName.APPLET:
    ;
    case goog.dom.TagName.AREA:
    ;
    case goog.dom.TagName.BASE:
    ;
    case goog.dom.TagName.BR:
    ;
    case goog.dom.TagName.COL:
    ;
    case goog.dom.TagName.FRAME:
    ;
    case goog.dom.TagName.HR:
    ;
    case goog.dom.TagName.IMG:
    ;
    case goog.dom.TagName.INPUT:
    ;
    case goog.dom.TagName.IFRAME:
    ;
    case goog.dom.TagName.ISINDEX:
    ;
    case goog.dom.TagName.LINK:
    ;
    case goog.dom.TagName.NOFRAMES:
    ;
    case goog.dom.TagName.NOSCRIPT:
    ;
    case goog.dom.TagName.META:
    ;
    case goog.dom.TagName.OBJECT:
    ;
    case goog.dom.TagName.PARAM:
    ;
    case goog.dom.TagName.SCRIPT:
    ;
    case goog.dom.TagName.STYLE:
      return false
  }
  return true
};
goog.dom.appendChild = function(parent, child) {
  parent.appendChild(child)
};
goog.dom.removeChildren = function(node) {
  for(var child;child = node.firstChild;)node.removeChild(child)
};
goog.dom.insertSiblingBefore = function(newNode, refNode) {
  refNode.parentNode && refNode.parentNode.insertBefore(newNode, refNode)
};
goog.dom.insertSiblingAfter = function(newNode, refNode) {
  refNode.parentNode && refNode.parentNode.insertBefore(newNode, refNode.nextSibling)
};
goog.dom.removeNode = function(node) {
  return node && node.parentNode ? node.parentNode.removeChild(node) : null
};
goog.dom.replaceNode = function(newNode, oldNode) {
  var parent = oldNode.parentNode;
  parent && parent.replaceChild(newNode, oldNode)
};
goog.dom.flattenElement = function(element) {
  var child, parent = element.parentNode;
  if(parent && parent.nodeType != goog.dom.NodeType.DOCUMENT_FRAGMENT)if(element.removeNode)return element.removeNode(false);
  else {
    for(;child = element.firstChild;)parent.insertBefore(child, element);
    return goog.dom.removeNode(element)
  }
};
goog.dom.getFirstElementChild = function(node) {
  return goog.dom.getNextElementNode_(node.firstChild, true)
};
goog.dom.getLastElementChild = function(node) {
  return goog.dom.getNextElementNode_(node.lastChild, false)
};
goog.dom.getNextElementSibling = function(node) {
  return goog.dom.getNextElementNode_(node.nextSibling, true)
};
goog.dom.getPreviousElementSibling = function(node) {
  return goog.dom.getNextElementNode_(node.previousSibling, false)
};
goog.dom.getNextElementNode_ = function(node, forward) {
  for(;node && node.nodeType != goog.dom.NodeType.ELEMENT;)node = forward ? node.nextSibling : node.previousSibling;
  return node
};
goog.dom.isNodeLike = function(obj) {
  return goog.isObject(obj) && obj.nodeType > 0
};
goog.dom.BAD_CONTAINS_WEBKIT_ = goog.userAgent.WEBKIT && goog.userAgent.isVersion("522");
goog.dom.contains = function(parent, descendant) {
  if(typeof parent.contains != "undefined" && !goog.dom.BAD_CONTAINS_WEBKIT_ && descendant.nodeType == goog.dom.NodeType.ELEMENT)return parent == descendant || parent.contains(descendant);
  if(typeof parent.compareDocumentPosition != "undefined")return parent == descendant || Boolean(parent.compareDocumentPosition(descendant) & 16);
  for(;descendant && parent != descendant;)descendant = descendant.parentNode;
  return descendant == parent
};
goog.dom.compareNodeOrder = function(node1, node2) {
  if(node1 == node2)return 0;
  if(node1.compareDocumentPosition)return node1.compareDocumentPosition(node2) & 2 ? 1 : -1;
  if("sourceIndex" in node1 || node1.parentNode && "sourceIndex" in node1.parentNode) {
    var isElement1 = node1.nodeType == goog.dom.NodeType.ELEMENT, isElement2 = node2.nodeType == goog.dom.NodeType.ELEMENT;
    if(isElement1 && isElement2)return node1.sourceIndex - node2.sourceIndex;
    else {
      var parent1 = node1.parentNode, parent2 = node2.parentNode;
      if(parent1 == parent2)return goog.dom.compareSiblingOrder_(node1, node2);
      if(!isElement1 && goog.dom.contains(parent1, node2))return-1 * goog.dom.compareParentsDescendantNodeIe_(node1, node2);
      if(!isElement2 && goog.dom.contains(parent2, node1))return goog.dom.compareParentsDescendantNodeIe_(node2, node1);
      return(isElement1 ? node1.sourceIndex : parent1.sourceIndex) - (isElement2 ? node2.sourceIndex : parent2.sourceIndex)
    }
  }var doc = goog.dom.getOwnerDocument(node1), range1, range2;
  range1 = doc.createRange();
  range1.selectNode(node1);
  range1.collapse(true);
  range2 = doc.createRange();
  range2.selectNode(node2);
  range2.collapse(true);
  return range1.compareBoundaryPoints(goog.global.Range.START_TO_END, range2)
};
goog.dom.compareParentsDescendantNodeIe_ = function(textNode, node) {
  var parent = textNode.parentNode;
  if(parent == node)return-1;
  for(var sibling = node;sibling.parentNode != parent;)sibling = sibling.parentNode;
  return goog.dom.compareSiblingOrder_(sibling, textNode)
};
goog.dom.compareSiblingOrder_ = function(node1, node2) {
  for(var s = node2;s = s.previousSibling;)if(s == node1)return-1;
  return 1
};
goog.dom.findCommonAncestor = function() {
  var i, count = arguments.length;
  if(count) {
    if(count == 1)return arguments[0]
  }else return null;
  var paths = [], minLength = Infinity;
  for(i = 0;i < count;i++) {
    for(var ancestors = [], node = arguments[i];node;) {
      ancestors.unshift(node);
      node = node.parentNode
    }paths.push(ancestors);
    minLength = Math.min(minLength, ancestors.length)
  }var output = null;
  for(i = 0;i < minLength;i++) {
    for(var first = paths[0][i], j = 1;j < count;j++)if(first != paths[j][i])return output;
    output = first
  }return output
};
goog.dom.getOwnerDocument = function(node) {
  return node.nodeType == goog.dom.NodeType.DOCUMENT ? node : node.ownerDocument || node.document
};
goog.dom.getFrameContentDocument = function(frame) {
  return goog.userAgent.WEBKIT ? frame.document || frame.contentWindow.document : frame.contentDocument || frame.contentWindow.document
};
goog.dom.getFrameContentWindow = function(frame) {
  return frame.contentWindow || goog.dom.getWindow_(goog.dom.getFrameContentDocument(frame))
};
goog.dom.setTextContent = function(element, text) {
  if("textContent" in element)element.textContent = text;
  else if(element.firstChild && element.firstChild.nodeType == goog.dom.NodeType.TEXT) {
    for(;element.lastChild != element.firstChild;)element.removeChild(element.lastChild);
    element.firstChild.data = text
  }else {
    goog.dom.removeChildren(element);
    var doc = goog.dom.getOwnerDocument(element);
    element.appendChild(doc.createTextNode(text))
  }
};
goog.dom.getOuterHtml = function(element) {
  if("outerHTML" in element)return element.outerHTML;
  else {
    var div = goog.dom.getOwnerDocument(element).createElement("div");
    div.appendChild(element.cloneNode(true));
    return div.innerHTML
  }
};
goog.dom.findNode = function(root, p) {
  var rv = [];
  return goog.dom.findNodes_(root, p, rv, true) ? rv[0] : undefined
};
goog.dom.findNodes = function(root, p) {
  var rv = [];
  goog.dom.findNodes_(root, p, rv, false);
  return rv
};
goog.dom.findNodes_ = function(root, p, rv, findOne) {
  if(root != null)for(var i = 0, child;child = root.childNodes[i];i++) {
    if(p(child)) {
      rv.push(child);
      if(findOne)return true
    }if(goog.dom.findNodes_(child, p, rv, findOne))return true
  }return false
};
goog.dom.TAGS_TO_IGNORE_ = {SCRIPT:1, STYLE:1, HEAD:1, IFRAME:1, OBJECT:1};
goog.dom.PREDEFINED_TAG_VALUES_ = {IMG:" ", BR:"\n"};
goog.dom.isFocusableTabIndex = function(element) {
  var attrNode = element.getAttributeNode("tabindex");
  if(attrNode && attrNode.specified) {
    var index = element.tabIndex;
    return goog.isNumber(index) && index >= 0
  }return false
};
goog.dom.setFocusableTabIndex = function(element, enable) {
  if(enable)element.tabIndex = 0;
  else element.removeAttribute("tabIndex")
};
goog.dom.getTextContent = function(node) {
  var textContent;
  if(goog.userAgent.IE && "innerText" in node)textContent = goog.string.canonicalizeNewlines(node.innerText);
  else {
    var buf = [];
    goog.dom.getTextContent_(node, buf, true);
    textContent = buf.join("")
  }textContent = textContent.replace(/\xAD/g, "");
  textContent = textContent.replace(/ +/g, " ");
  if(textContent != " ")textContent = textContent.replace(/^\s*/, "");
  return textContent
};
goog.dom.getRawTextContent = function(node) {
  var buf = [];
  goog.dom.getTextContent_(node, buf, false);
  return buf.join("")
};
goog.dom.getTextContent_ = function(node, buf, normalizeWhitespace) {
  if(!(node.nodeName in goog.dom.TAGS_TO_IGNORE_))if(node.nodeType == goog.dom.NodeType.TEXT)normalizeWhitespace ? buf.push(String(node.nodeValue).replace(/(\r\n|\r|\n)/g, "")) : buf.push(node.nodeValue);
  else if(node.nodeName in goog.dom.PREDEFINED_TAG_VALUES_)buf.push(goog.dom.PREDEFINED_TAG_VALUES_[node.nodeName]);
  else for(var child = node.firstChild;child;) {
    goog.dom.getTextContent_(child, buf, normalizeWhitespace);
    child = child.nextSibling
  }
};
goog.dom.getNodeTextLength = function(node) {
  return goog.dom.getTextContent(node).length
};
goog.dom.getNodeTextOffset = function(node, opt_offsetParent) {
  for(var root = opt_offsetParent || goog.dom.getOwnerDocument(node).body, buf = [];node && node != root;) {
    for(var cur = node;cur = cur.previousSibling;)buf.unshift(goog.dom.getTextContent(cur));
    node = node.parentNode
  }return goog.string.trimLeft(buf.join("")).replace(/ +/g, " ").length
};
goog.dom.getNodeAtOffset = function(parent, offset, opt_result) {
  for(var stack = [parent], pos = 0, cur;stack.length > 0 && pos < offset;) {
    cur = stack.pop();
    if(!(cur.nodeName in goog.dom.TAGS_TO_IGNORE_))if(cur.nodeType == goog.dom.NodeType.TEXT) {
      var text = cur.nodeValue.replace(/(\r\n|\r|\n)/g, "").replace(/ +/g, " ");
      pos += text.length
    }else if(cur.nodeName in goog.dom.PREDEFINED_TAG_VALUES_)pos += goog.dom.PREDEFINED_TAG_VALUES_[cur.nodeName].length;
    else for(var i = cur.childNodes.length - 1;i >= 0;i--)stack.push(cur.childNodes[i])
  }if(goog.isObject(opt_result)) {
    opt_result.remainder = cur ? cur.nodeValue.length + offset - pos - 1 : 0;
    opt_result.node = cur
  }return cur
};
goog.dom.isNodeList = function(val) {
  if(val && typeof val.length == "number")if(goog.isObject(val))return typeof val.item == "function" || typeof val.item == "string";
  else if(goog.isFunction(val))return typeof val.item == "function";
  return false
};
goog.dom.getAncestorByTagNameAndClass = function(element, opt_tag, opt_class) {
  return goog.dom.getAncestor(element, function(node) {
    return(!opt_tag || node.nodeName == opt_tag) && (!opt_class || goog.dom.classes.has(node, opt_class))
  }, true)
};
goog.dom.getAncestor = function(element, matcher, opt_includeNode, opt_maxSearchSteps) {
  if(!opt_includeNode)element = element.parentNode;
  for(var ignoreSearchSteps = opt_maxSearchSteps == null, steps = 0;element && (ignoreSearchSteps || steps <= opt_maxSearchSteps);) {
    if(matcher(element))return element;
    element = element.parentNode;
    steps++
  }return null
};
goog.dom.DomHelper = function(opt_document) {
  this.document_ = opt_document || goog.global.document || document
};
a = goog.dom.DomHelper.prototype;
a.getDomHelper = goog.dom.getDomHelper;
a.getDocument = function() {
  return this.document_
};
a.getElement = function(element) {
  return goog.isString(element) ? this.document_.getElementById(element) : element
};
a.$ = goog.dom.DomHelper.prototype.getElement;
a.getElementsByTagNameAndClass = function(opt_tag, opt_class, opt_el) {
  return goog.dom.getElementsByTagNameAndClass_(this.document_, opt_tag, opt_class, opt_el)
};
a.$$ = goog.dom.DomHelper.prototype.getElementsByTagNameAndClass;
a.setProperties = goog.dom.setProperties;
a.getViewportSize = function(opt_window) {
  return goog.dom.getViewportSize(opt_window || this.getWindow())
};
a.getDocumentHeight = function() {
  return goog.dom.getDocumentHeight_(this.getWindow())
};
a.createDom = function() {
  return goog.dom.createDom_(this.document_, arguments)
};
a.$dom = goog.dom.DomHelper.prototype.createDom;
a.createElement = function(name) {
  return this.document_.createElement(name)
};
a.createTextNode = function(content) {
  return this.document_.createTextNode(content)
};
a.htmlToDocumentFragment = function(htmlString) {
  return goog.dom.htmlToDocumentFragment_(this.document_, htmlString)
};
a.getCompatMode = function() {
  return this.isCss1CompatMode() ? "CSS1Compat" : "BackCompat"
};
a.isCss1CompatMode = function() {
  return goog.dom.isCss1CompatMode_(this.document_)
};
a.getWindow = function() {
  return goog.dom.getWindow_(this.document_)
};
a.getDocumentScrollElement = function() {
  return goog.dom.getDocumentScrollElement_(this.document_)
};
a.getDocumentScroll = function() {
  return goog.dom.getDocumentScroll_(this.document_)
};
a.appendChild = goog.dom.appendChild;
a.removeChildren = goog.dom.removeChildren;
a.insertSiblingBefore = goog.dom.insertSiblingBefore;
a.insertSiblingAfter = goog.dom.insertSiblingAfter;
a.removeNode = goog.dom.removeNode;
a.replaceNode = goog.dom.replaceNode;
a.flattenElement = goog.dom.flattenElement;
a.getFirstElementChild = goog.dom.getFirstElementChild;
a.getLastElementChild = goog.dom.getLastElementChild;
a.getNextElementSibling = goog.dom.getNextElementSibling;
a.getPreviousElementSibling = goog.dom.getPreviousElementSibling;
a.isNodeLike = goog.dom.isNodeLike;
a.contains = goog.dom.contains;
a.getOwnerDocument = goog.dom.getOwnerDocument;
a.getFrameContentDocument = goog.dom.getFrameContentDocument;
a.getFrameContentWindow = goog.dom.getFrameContentWindow;
a.setTextContent = goog.dom.setTextContent;
a.findNode = goog.dom.findNode;
a.findNodes = goog.dom.findNodes;
a.getTextContent = goog.dom.getTextContent;
a.getNodeTextLength = goog.dom.getNodeTextLength;
a.getNodeTextOffset = goog.dom.getNodeTextOffset;
a.getAncestorByTagNameAndClass = goog.dom.getAncestorByTagNameAndClass;
a.getAncestor = goog.dom.getAncestor;goog.json = {};
goog.json.isValid_ = function(s) {
  if(/^\s*$/.test(s))return false;
  return/^[\],:{}\s\u2028\u2029]*$/.test(s.replace(/\\["\\\/bfnrtu]/g, "@").replace(/"[^"\\\n\r\u2028\u2029\x00-\x08\x10-\x1f\x80-\x9f]*"|true|false|null|-?\d+(?:\.\d*)?(?:[eE][+\-]?\d+)?/g, "]").replace(/(?:^|:|,)(?:[\s\u2028\u2029]*\[)+/g, ""))
};
goog.json.parse = function(s) {
  var o = String(s);
  if(goog.json.isValid_(o))try {
    return eval("(" + o + ")")
  }catch(ex) {
  }throw Error("Invalid JSON string: " + o);
};
goog.json.unsafeParse = function(s) {
  return eval("(" + s + ")")
};
goog.json.serialize = function(object) {
  return(new goog.json.Serializer).serialize(object)
};
goog.json.Serializer = function() {
};
goog.json.Serializer.prototype.serialize = function(object) {
  var sb = [];
  this.serialize_(object, sb);
  return sb.join("")
};
goog.json.Serializer.prototype.serialize_ = function(object, sb) {
  switch(typeof object) {
    case "string":
      this.serializeString_(object, sb);
      break;
    case "number":
      this.serializeNumber_(object, sb);
      break;
    case "boolean":
      sb.push(object);
      break;
    case "undefined":
      sb.push("null");
      break;
    case "object":
      if(object == null) {
        sb.push("null");
        break
      }if(goog.isArray(object)) {
        this.serializeArray_(object, sb);
        break
      }this.serializeObject_(object, sb);
      break;
    case "function":
      break;
    default:
      throw Error("Unknown type: " + typeof object);
  }
};
goog.json.Serializer.charToJsonCharCache_ = {'"':'\\"', "\\":"\\\\", "/":"\\/", "\u0008":"\\b", "\u000c":"\\f", "\n":"\\n", "\r":"\\r", "\t":"\\t", "\u000b":"\\u000b"};
goog.json.Serializer.charsToReplace_ = /\uffff/.test("\uffff") ? /[\\\"\x00-\x1f\x7f-\uffff]/g : /[\\\"\x00-\x1f\x7f-\xff]/g;
goog.json.Serializer.prototype.serializeString_ = function(s, sb) {
  sb.push('"', s.replace(goog.json.Serializer.charsToReplace_, function(c) {
    if(c in goog.json.Serializer.charToJsonCharCache_)return goog.json.Serializer.charToJsonCharCache_[c];
    var cc = c.charCodeAt(0), rv = "\\u";
    if(cc < 16)rv += "000";
    else if(cc < 256)rv += "00";
    else if(cc < 4096)rv += "0";
    return goog.json.Serializer.charToJsonCharCache_[c] = rv + cc.toString(16)
  }), '"')
};
goog.json.Serializer.prototype.serializeNumber_ = function(n, sb) {
  sb.push(isFinite(n) && !isNaN(n) ? n : "null")
};
goog.json.Serializer.prototype.serializeArray_ = function(arr, sb) {
  var l = arr.length;
  sb.push("[");
  for(var sep = "", i = 0;i < l;i++) {
    sb.push(sep);
    this.serialize_(arr[i], sb);
    sep = ","
  }sb.push("]")
};
goog.json.Serializer.prototype.serializeObject_ = function(obj, sb) {
  sb.push("{");
  var sep = "";
  for(var key in obj)if(obj.hasOwnProperty(key)) {
    var value = obj[key];
    if(typeof value != "function") {
      sb.push(sep);
      this.serializeString_(key, sb);
      sb.push(":");
      this.serialize_(value, sb);
      sep = ","
    }
  }sb.push("}")
};goog.Disposable = function() {
};
goog.Disposable.prototype.disposed_ = false;
goog.Disposable.prototype.isDisposed = function() {
  return this.disposed_
};
goog.Disposable.prototype.dispose = function() {
  if(!this.disposed_) {
    this.disposed_ = true;
    this.disposeInternal()
  }
};
goog.Disposable.prototype.disposeInternal = function() {
};
goog.dispose = function(obj) {
  obj && typeof obj.dispose == "function" && obj.dispose()
};goog.structs = {};
goog.structs.SimplePool = function(initialCount, maxCount) {
  this.maxCount_ = maxCount;
  this.freeQueue_ = [];
  this.createInitial_(initialCount)
};
goog.inherits(goog.structs.SimplePool, goog.Disposable);
a = goog.structs.SimplePool.prototype;
a.createObjectFn_ = null;
a.disposeObjectFn_ = null;
a.setCreateObjectFn = function(createObjectFn) {
  this.createObjectFn_ = createObjectFn
};
a.getObject = function() {
  if(this.freeQueue_.length)return this.freeQueue_.pop();
  return this.createObject()
};
a.releaseObject = function(obj) {
  this.freeQueue_.length < this.maxCount_ ? this.freeQueue_.push(obj) : this.disposeObject(obj)
};
a.createInitial_ = function(initialCount) {
  if(initialCount > this.maxCount_)throw Error("[goog.structs.SimplePool] Initial cannot be greater than max");for(var i = 0;i < initialCount;i++)this.freeQueue_.push(this.createObject())
};
a.createObject = function() {
  return this.createObjectFn_ ? this.createObjectFn_() : {}
};
a.disposeObject = function(obj) {
  if(this.disposeObjectFn_)this.disposeObjectFn_(obj);
  else if(goog.isFunction(obj.dispose))obj.dispose();
  else for(var i in obj)delete obj[i]
};
a.disposeInternal = function() {
  goog.structs.SimplePool.superClass_.disposeInternal.call(this);
  for(var freeQueue = this.freeQueue_;freeQueue.length;)this.disposeObject(freeQueue.pop());
  delete this.freeQueue_
};goog.debug = {};
goog.debug.errorHandlerWeakDep = {protectEntryPoint:function(fn) {
  return fn
}};goog.events = {};
goog.events.Event = function(type, opt_target) {
  this.type = type;
  this.currentTarget = this.target = opt_target
};
goog.inherits(goog.events.Event, goog.Disposable);
a = goog.events.Event.prototype;
a.disposeInternal = function() {
  delete this.type;
  delete this.target;
  delete this.currentTarget
};
a.propagationStopped_ = false;
a.returnValue_ = true;
a.stopPropagation = function() {
  this.propagationStopped_ = true
};
a.preventDefault = function() {
  this.returnValue_ = false
};goog.events.BrowserEvent = function(opt_e, opt_currentTarget) {
  opt_e && this.init(opt_e, opt_currentTarget)
};
goog.inherits(goog.events.BrowserEvent, goog.events.Event);
goog.events.BrowserEvent.MouseButton = {LEFT:0, MIDDLE:1, RIGHT:2};
goog.events.BrowserEvent.IEButtonMap_ = [1, 4, 2];
a = goog.events.BrowserEvent.prototype;
a.target = null;
a.relatedTarget = null;
a.offsetX = 0;
a.offsetY = 0;
a.clientX = 0;
a.clientY = 0;
a.screenX = 0;
a.screenY = 0;
a.button = 0;
a.keyCode = 0;
a.charCode = 0;
a.ctrlKey = false;
a.altKey = false;
a.shiftKey = false;
a.metaKey = false;
a.event_ = null;
a.init = function(e, opt_currentTarget) {
  var type = this.type = e.type;
  this.target = e.target || e.srcElement;
  this.currentTarget = opt_currentTarget;
  var relatedTarget = e.relatedTarget;
  if(relatedTarget) {
    if(goog.userAgent.GECKO)try {
      relatedTarget = relatedTarget.nodeName && relatedTarget
    }catch(err) {
    }
  }else if(type == "mouseover")relatedTarget = e.fromElement;
  else if(type == "mouseout")relatedTarget = e.toElement;
  this.relatedTarget = relatedTarget;
  this.offsetX = e.offsetX !== undefined ? e.offsetX : e.layerX;
  this.offsetY = e.offsetY !== undefined ? e.offsetY : e.layerY;
  this.clientX = e.clientX !== undefined ? e.clientX : e.pageX;
  this.clientY = e.clientY !== undefined ? e.clientY : e.pageY;
  this.screenX = e.screenX || 0;
  this.screenY = e.screenY || 0;
  this.button = e.button;
  this.keyCode = e.keyCode || 0;
  this.charCode = e.charCode || (type == "keypress" ? e.keyCode : 0);
  this.ctrlKey = e.ctrlKey;
  this.altKey = e.altKey;
  this.shiftKey = e.shiftKey;
  this.metaKey = e.metaKey;
  this.event_ = e;
  delete this.returnValue_;
  delete this.propagationStopped_
};
a.isButton = function(button) {
  return goog.userAgent.IE ? this.type == "click" ? button == goog.events.BrowserEvent.MouseButton.LEFT : !!(this.event_.button & goog.events.BrowserEvent.IEButtonMap_[button]) : this.event_.button == button
};
a.stopPropagation = function() {
  this.propagationStopped_ = true;
  if(this.event_.stopPropagation)this.event_.stopPropagation();
  else this.event_.cancelBubble = true
};
goog.events.BrowserEvent.IE7_SET_KEY_CODE_TO_PREVENT_DEFAULT_ = goog.userAgent.IE && !goog.userAgent.isVersion("8");
goog.events.BrowserEvent.prototype.preventDefault = function() {
  this.returnValue_ = false;
  var be = this.event_;
  if(be.preventDefault)be.preventDefault();
  else {
    be.returnValue = false;
    if(goog.events.BrowserEvent.IE7_SET_KEY_CODE_TO_PREVENT_DEFAULT_)try {
      if(be.ctrlKey || be.keyCode >= 112 && be.keyCode <= 123)be.keyCode = -1
    }catch(ex) {
    }
  }
};
goog.events.BrowserEvent.prototype.getBrowserEvent = function() {
  return this.event_
};
goog.events.BrowserEvent.prototype.disposeInternal = function() {
  goog.events.BrowserEvent.superClass_.disposeInternal.call(this);
  this.relatedTarget = this.currentTarget = this.target = this.event_ = null
};goog.events.EventWrapper = function() {
};
goog.events.EventWrapper.prototype.listen = function() {
};
goog.events.EventWrapper.prototype.unlisten = function() {
};goog.userAgent.jscript = {};
goog.userAgent.jscript.ASSUME_NO_JSCRIPT = false;
goog.userAgent.jscript.init_ = function() {
  goog.userAgent.jscript.DETECTED_HAS_JSCRIPT_ = "ScriptEngine" in goog.global && goog.global.ScriptEngine() == "JScript";
  goog.userAgent.jscript.DETECTED_VERSION_ = goog.userAgent.jscript.DETECTED_HAS_JSCRIPT_ ? goog.global.ScriptEngineMajorVersion() + "." + goog.global.ScriptEngineMinorVersion() + "." + goog.global.ScriptEngineBuildVersion() : "0"
};
goog.userAgent.jscript.ASSUME_NO_JSCRIPT || goog.userAgent.jscript.init_();
goog.userAgent.jscript.HAS_JSCRIPT = goog.userAgent.jscript.ASSUME_NO_JSCRIPT ? false : goog.userAgent.jscript.DETECTED_HAS_JSCRIPT_;
goog.userAgent.jscript.VERSION = goog.userAgent.jscript.ASSUME_NO_JSCRIPT ? "0" : goog.userAgent.jscript.DETECTED_VERSION_;
goog.userAgent.jscript.isVersion = function(version) {
  return goog.string.compareVersions(goog.userAgent.jscript.VERSION, version) >= 0
};goog.events.Listener = function() {
};
goog.events.Listener.counter_ = 0;
a = goog.events.Listener.prototype;
a.key = 0;
a.removed = false;
a.callOnce = false;
a.init = function(listener, proxy, src, type, capture, opt_handler) {
  if(goog.isFunction(listener))this.isFunctionListener_ = true;
  else if(listener && listener.handleEvent && goog.isFunction(listener.handleEvent))this.isFunctionListener_ = false;
  else throw Error("Invalid listener argument");this.listener = listener;
  this.proxy = proxy;
  this.src = src;
  this.type = type;
  this.capture = !!capture;
  this.handler = opt_handler;
  this.callOnce = false;
  this.key = ++goog.events.Listener.counter_;
  this.removed = false
};
a.handleEvent = function(eventObject) {
  if(this.isFunctionListener_)return this.listener.call(this.handler || this.src, eventObject);
  return this.listener.handleEvent.call(this.listener, eventObject)
};goog.events.pools = {};
(function() {
  function getObject() {
    return{count_:0, remaining_:0}
  }
  function getArray() {
    return[]
  }
  function getProxy() {
    var f = function(eventObject) {
      return proxyCallbackFunction.call(f.src, f.key, eventObject)
    };
    return f
  }
  function getListener() {
    return new goog.events.Listener
  }
  function getEvent() {
    return new goog.events.BrowserEvent
  }
  var BAD_GC = goog.userAgent.jscript.HAS_JSCRIPT && !goog.userAgent.jscript.isVersion("5.7"), proxyCallbackFunction;
  goog.events.pools.setProxyCallbackFunction = function(cb) {
    proxyCallbackFunction = cb
  };
  if(BAD_GC) {
    goog.events.pools.getObject = function() {
      return objectPool.getObject()
    };
    goog.events.pools.releaseObject = function(obj) {
      objectPool.releaseObject(obj)
    };
    goog.events.pools.getArray = function() {
      return arrayPool.getObject()
    };
    goog.events.pools.releaseArray = function(obj) {
      arrayPool.releaseObject(obj)
    };
    goog.events.pools.getProxy = function() {
      return proxyPool.getObject()
    };
    goog.events.pools.releaseProxy = function() {
      proxyPool.releaseObject(getProxy())
    };
    goog.events.pools.getListener = function() {
      return listenerPool.getObject()
    };
    goog.events.pools.releaseListener = function(obj) {
      listenerPool.releaseObject(obj)
    };
    goog.events.pools.getEvent = function() {
      return eventPool.getObject()
    };
    goog.events.pools.releaseEvent = function(obj) {
      eventPool.releaseObject(obj)
    };
    var objectPool = new goog.structs.SimplePool(0, 600);
    objectPool.setCreateObjectFn(getObject);
    var arrayPool = new goog.structs.SimplePool(0, 600);
    arrayPool.setCreateObjectFn(getArray);
    var proxyPool = new goog.structs.SimplePool(0, 600);
    proxyPool.setCreateObjectFn(getProxy);
    var listenerPool = new goog.structs.SimplePool(0, 600);
    listenerPool.setCreateObjectFn(getListener);
    var eventPool = new goog.structs.SimplePool(0, 600);
    eventPool.setCreateObjectFn(getEvent)
  }else {
    goog.events.pools.getObject = getObject;
    goog.events.pools.releaseObject = goog.nullFunction;
    goog.events.pools.getArray = getArray;
    goog.events.pools.releaseArray = goog.nullFunction;
    goog.events.pools.getProxy = getProxy;
    goog.events.pools.releaseProxy = goog.nullFunction;
    goog.events.pools.getListener = getListener;
    goog.events.pools.releaseListener = goog.nullFunction;
    goog.events.pools.getEvent = getEvent;
    goog.events.pools.releaseEvent = goog.nullFunction
  }
})();goog.events.listeners_ = {};
goog.events.listenerTree_ = {};
goog.events.sources_ = {};
goog.events.onString_ = "on";
goog.events.onStringMap_ = {};
goog.events.keySeparator_ = "_";
goog.events.listen = function(src, type, listener, opt_capt, opt_handler) {
  if(type)if(goog.isArray(type)) {
    for(var i = 0;i < type.length;i++)goog.events.listen(src, type[i], listener, opt_capt, opt_handler);
    return null
  }else {
    var capture = !!opt_capt, map = goog.events.listenerTree_;
    type in map || (map[type] = goog.events.pools.getObject());
    map = map[type];
    if(!(capture in map)) {
      map[capture] = goog.events.pools.getObject();
      map.count_++
    }map = map[capture];
    var srcHashCode = goog.getHashCode(src), listenerArray, listenerObj;
    map.remaining_++;
    if(map[srcHashCode]) {
      listenerArray = map[srcHashCode];
      for(i = 0;i < listenerArray.length;i++) {
        listenerObj = listenerArray[i];
        if(listenerObj.listener == listener && listenerObj.handler == opt_handler) {
          if(listenerObj.removed)break;
          return listenerArray[i].key
        }
      }
    }else {
      listenerArray = map[srcHashCode] = goog.events.pools.getArray();
      map.count_++
    }var proxy = goog.events.pools.getProxy();
    proxy.src = src;
    listenerObj = goog.events.pools.getListener();
    listenerObj.init(listener, proxy, src, type, capture, opt_handler);
    var key = listenerObj.key;
    proxy.key = key;
    listenerArray.push(listenerObj);
    goog.events.listeners_[key] = listenerObj;
    goog.events.sources_[srcHashCode] || (goog.events.sources_[srcHashCode] = goog.events.pools.getArray());
    goog.events.sources_[srcHashCode].push(listenerObj);
    if(src.addEventListener) {
      if(src == goog.global || !src.customEvent_)src.addEventListener(type, proxy, capture)
    }else src.attachEvent(goog.events.getOnString_(type), proxy);
    return key
  }else throw Error("Invalid event type");
};
goog.events.listenOnce = function(src, type, listener, opt_capt, opt_handler) {
  if(goog.isArray(type)) {
    for(var i = 0;i < type.length;i++)goog.events.listenOnce(src, type[i], listener, opt_capt, opt_handler);
    return null
  }var key = goog.events.listen(src, type, listener, opt_capt, opt_handler);
  goog.events.listeners_[key].callOnce = true;
  return key
};
goog.events.listenWithWrapper = function(src, wrapper, listener, opt_capt, opt_handler) {
  wrapper.listen(src, listener, opt_capt, opt_handler)
};
goog.events.unlisten = function(src, type, listener, opt_capt, opt_handler) {
  if(goog.isArray(type)) {
    for(var i = 0;i < type.length;i++)goog.events.unlisten(src, type[i], listener, opt_capt, opt_handler);
    return null
  }var capture = !!opt_capt, listenerArray = goog.events.getListeners_(src, type, capture);
  if(!listenerArray)return false;
  for(i = 0;i < listenerArray.length;i++)if(listenerArray[i].listener == listener && listenerArray[i].capture == capture && listenerArray[i].handler == opt_handler)return goog.events.unlistenByKey(listenerArray[i].key);
  return false
};
goog.events.unlistenByKey = function(key) {
  if(!goog.events.listeners_[key])return false;
  var listener = goog.events.listeners_[key];
  if(listener.removed)return false;
  var src = listener.src, type = listener.type, proxy = listener.proxy, capture = listener.capture;
  if(src.removeEventListener) {
    if(src == goog.global || !src.customEvent_)src.removeEventListener(type, proxy, capture)
  }else src.detachEvent && src.detachEvent(goog.events.getOnString_(type), proxy);
  var srcHashCode = goog.getHashCode(src), listenerArray = goog.events.listenerTree_[type][capture][srcHashCode];
  if(goog.events.sources_[srcHashCode]) {
    var sourcesArray = goog.events.sources_[srcHashCode];
    goog.array.remove(sourcesArray, listener);
    sourcesArray.length == 0 && delete goog.events.sources_[srcHashCode]
  }listener.removed = true;
  listenerArray.needsCleanup_ = true;
  goog.events.cleanUp_(type, capture, srcHashCode, listenerArray);
  delete goog.events.listeners_[key];
  return true
};
goog.events.unlistenWithWrapper = function(src, wrapper, listener, opt_capt, opt_handler) {
  wrapper.unlisten(src, listener, opt_capt, opt_handler)
};
goog.events.cleanUp_ = function(type, capture, srcHashCode, listenerArray) {
  if(!listenerArray.locked_)if(listenerArray.needsCleanup_) {
    for(var oldIndex = 0, newIndex = 0;oldIndex < listenerArray.length;oldIndex++)if(listenerArray[oldIndex].removed) {
      var proxy = listenerArray[oldIndex].proxy;
      proxy.src = null;
      goog.events.pools.releaseProxy(proxy);
      goog.events.pools.releaseListener(listenerArray[oldIndex])
    }else {
      if(oldIndex != newIndex)listenerArray[newIndex] = listenerArray[oldIndex];
      newIndex++
    }listenerArray.length = newIndex;
    listenerArray.needsCleanup_ = false;
    if(newIndex == 0) {
      goog.events.pools.releaseArray(listenerArray);
      delete goog.events.listenerTree_[type][capture][srcHashCode];
      goog.events.listenerTree_[type][capture].count_--;
      if(goog.events.listenerTree_[type][capture].count_ == 0) {
        goog.events.pools.releaseObject(goog.events.listenerTree_[type][capture]);
        delete goog.events.listenerTree_[type][capture];
        goog.events.listenerTree_[type].count_--
      }if(goog.events.listenerTree_[type].count_ == 0) {
        goog.events.pools.releaseObject(goog.events.listenerTree_[type]);
        delete goog.events.listenerTree_[type]
      }
    }
  }
};
goog.events.removeAll = function(opt_obj, opt_type, opt_capt) {
  var count = 0, noObj = opt_obj == null, noType = opt_type == null, noCapt = opt_capt == null;
  opt_capt = !!opt_capt;
  if(noObj)goog.object.forEach(goog.events.sources_, function(listeners) {
    for(var i = listeners.length - 1;i >= 0;i--) {
      var listener = listeners[i];
      if((noType || opt_type == listener.type) && (noCapt || opt_capt == listener.capture)) {
        goog.events.unlistenByKey(listener.key);
        count++
      }
    }
  });
  else {
    var srcHashCode = goog.getHashCode(opt_obj);
    if(goog.events.sources_[srcHashCode])for(var sourcesArray = goog.events.sources_[srcHashCode], i = sourcesArray.length - 1;i >= 0;i--) {
      var listener = sourcesArray[i];
      if((noType || opt_type == listener.type) && (noCapt || opt_capt == listener.capture)) {
        goog.events.unlistenByKey(listener.key);
        count++
      }
    }
  }return count
};
goog.events.getListeners = function(obj, type, capture) {
  return goog.events.getListeners_(obj, type, capture) || []
};
goog.events.getListeners_ = function(obj, type, capture) {
  var map = goog.events.listenerTree_;
  if(type in map) {
    map = map[type];
    if(capture in map) {
      map = map[capture];
      var objHashCode = goog.getHashCode(obj);
      if(map[objHashCode])return map[objHashCode]
    }
  }return null
};
goog.events.getListener = function(src, type, listener, opt_capt, opt_handler) {
  var capture = !!opt_capt, listenerArray = goog.events.getListeners_(src, type, capture);
  if(listenerArray)for(var i = 0;i < listenerArray.length;i++)if(listenerArray[i].listener == listener && listenerArray[i].capture == capture && listenerArray[i].handler == opt_handler)return listenerArray[i];
  return null
};
goog.events.hasListener = function(obj, opt_type, opt_capture) {
  var objHashCode = goog.getHashCode(obj), listeners = goog.events.sources_[objHashCode];
  if(listeners) {
    var hasType = goog.isDef(opt_type), hasCapture = goog.isDef(opt_capture);
    if(hasType && hasCapture) {
      var map = goog.events.listenerTree_[opt_type];
      return!!map && !!map[opt_capture] && objHashCode in map[opt_capture]
    }else return hasType || hasCapture ? goog.array.some(listeners, function(listener) {
      return hasType && listener.type == opt_type || hasCapture && listener.capture == opt_capture
    }) : true
  }return false
};
goog.events.expose = function(e) {
  var str = [];
  for(var key in e)e[key] && e[key].id ? str.push(key + " = " + e[key] + " (" + e[key].id + ")") : str.push(key + " = " + e[key]);
  return str.join("\n")
};
goog.events.EventType = {CLICK:"click", DBLCLICK:"dblclick", MOUSEDOWN:"mousedown", MOUSEUP:"mouseup", MOUSEOVER:"mouseover", MOUSEOUT:"mouseout", MOUSEMOVE:"mousemove", SELECTSTART:"selectstart", KEYPRESS:"keypress", KEYDOWN:"keydown", KEYUP:"keyup", BLUR:"blur", FOCUS:"focus", DEACTIVATE:"deactivate", FOCUSIN:goog.userAgent.IE ? "focusin" : "DOMFocusIn", FOCUSOUT:goog.userAgent.IE ? "focusout" : "DOMFocusOut", CHANGE:"change", SELECT:"select", SUBMIT:"submit", CONTEXTMENU:"contextmenu", DRAGSTART:"dragstart", 
ERROR:"error", HASHCHANGE:"hashchange", HELP:"help", LOAD:"load", LOSECAPTURE:"losecapture", READYSTATECHANGE:"readystatechange", RESIZE:"resize", SCROLL:"scroll", UNLOAD:"unload"};
goog.events.getOnString_ = function(type) {
  if(type in goog.events.onStringMap_)return goog.events.onStringMap_[type];
  return goog.events.onStringMap_[type] = goog.events.onString_ + type
};
goog.events.fireListeners = function(obj, type, capture, eventObject) {
  var map = goog.events.listenerTree_;
  if(type in map) {
    map = map[type];
    if(capture in map)return goog.events.fireListeners_(map[capture], obj, type, capture, eventObject)
  }return true
};
goog.events.fireListeners_ = function(map, obj, type, capture, eventObject) {
  var retval = 1, objHashCode = goog.getHashCode(obj);
  if(map[objHashCode]) {
    map.remaining_--;
    var listenerArray = map[objHashCode];
    if(listenerArray.locked_)listenerArray.locked_++;
    else listenerArray.locked_ = 1;
    try {
      for(var length = listenerArray.length, i = 0;i < length;i++) {
        var listener = listenerArray[i];
        if(listener && !listener.removed)retval &= goog.events.fireListener(listener, eventObject) !== false
      }
    }finally {
      listenerArray.locked_--;
      goog.events.cleanUp_(type, capture, objHashCode, listenerArray)
    }
  }return Boolean(retval)
};
goog.events.fireListener = function(listener, eventObject) {
  var rv = listener.handleEvent(eventObject);
  listener.callOnce && goog.events.unlistenByKey(listener.key);
  return rv
};
goog.events.getTotalListenerCount = function() {
  return goog.object.getCount(goog.events.listeners_)
};
goog.events.dispatchEvent = function(src, e) {
  if(goog.isString(e))e = new goog.events.Event(e, src);
  else if(e instanceof goog.events.Event)e.target = e.target || src;
  else {
    var oldEvent = e;
    e = new goog.events.Event(e.type, src);
    goog.object.extend(e, oldEvent)
  }var rv = 1, ancestors, type = e.type, map = goog.events.listenerTree_;
  if(!(type in map))return true;
  map = map[type];
  var hasCapture = true in map, targetsMap;
  if(hasCapture) {
    ancestors = [];
    for(var parent = src;parent;parent = parent.getParentEventTarget())ancestors.push(parent);
    targetsMap = map[true];
    targetsMap.remaining_ = targetsMap.count_;
    for(var i = ancestors.length - 1;!e.propagationStopped_ && i >= 0 && targetsMap.remaining_;i--) {
      e.currentTarget = ancestors[i];
      rv &= goog.events.fireListeners_(targetsMap, ancestors[i], e.type, true, e) && e.returnValue_ != false
    }
  }if(false in map) {
    targetsMap = map[false];
    targetsMap.remaining_ = targetsMap.count_;
    if(hasCapture)for(i = 0;!e.propagationStopped_ && i < ancestors.length && targetsMap.remaining_;i++) {
      e.currentTarget = ancestors[i];
      rv &= goog.events.fireListeners_(targetsMap, ancestors[i], e.type, false, e) && e.returnValue_ != false
    }else for(var current = src;!e.propagationStopped_ && current && targetsMap.remaining_;current = current.getParentEventTarget()) {
      e.currentTarget = current;
      rv &= goog.events.fireListeners_(targetsMap, current, e.type, false, e) && e.returnValue_ != false
    }
  }return Boolean(rv)
};
goog.events.protectBrowserEventEntryPoint = function(errorHandler, opt_tracers) {
  goog.events.handleBrowserEvent_ = errorHandler.protectEntryPoint(goog.events.handleBrowserEvent_, opt_tracers);
  goog.events.pools.setProxyCallbackFunction(goog.events.handleBrowserEvent_)
};
goog.events.handleBrowserEvent_ = function(key, opt_evt) {
  if(!goog.events.listeners_[key])return true;
  var listener = goog.events.listeners_[key], type = listener.type, map = goog.events.listenerTree_;
  if(!(type in map))return true;
  map = map[type];
  var retval, targetsMap;
  if(goog.userAgent.IE) {
    var ieEvent = opt_evt || goog.getObjectByName("window.event"), hasCapture = true in map, hasBubble = false in map;
    if(hasCapture) {
      if(goog.events.isMarkedIeEvent_(ieEvent))return true;
      goog.events.markIeEvent_(ieEvent)
    }var evt = goog.events.pools.getEvent();
    evt.init(ieEvent, this);
    retval = true;
    try {
      if(hasCapture) {
        for(var ancestors = goog.events.pools.getArray(), parent = evt.currentTarget;parent;parent = parent.parentNode)ancestors.push(parent);
        targetsMap = map[true];
        targetsMap.remaining_ = targetsMap.count_;
        for(var i = ancestors.length - 1;!evt.propagationStopped_ && i >= 0 && targetsMap.remaining_;i--) {
          evt.currentTarget = ancestors[i];
          retval &= goog.events.fireListeners_(targetsMap, ancestors[i], type, true, evt)
        }if(hasBubble) {
          targetsMap = map[false];
          targetsMap.remaining_ = targetsMap.count_;
          for(i = 0;!evt.propagationStopped_ && i < ancestors.length && targetsMap.remaining_;i++) {
            evt.currentTarget = ancestors[i];
            retval &= goog.events.fireListeners_(targetsMap, ancestors[i], type, false, evt)
          }
        }
      }else retval = goog.events.fireListener(listener, evt)
    }finally {
      if(ancestors) {
        ancestors.length = 0;
        goog.events.pools.releaseArray(ancestors)
      }evt.dispose();
      goog.events.pools.releaseEvent(evt)
    }return retval
  }var be = new goog.events.BrowserEvent(opt_evt, this);
  try {
    retval = goog.events.fireListener(listener, be)
  }finally {
    be.dispose()
  }return retval
};
goog.events.pools.setProxyCallbackFunction(goog.events.handleBrowserEvent_);
goog.events.markIeEvent_ = function(e) {
  var useReturnValue = false;
  if(e.keyCode == 0)try {
    e.keyCode = -1;
    return
  }catch(ex) {
    useReturnValue = true
  }if(useReturnValue || e.returnValue == undefined)e.returnValue = true
};
goog.events.isMarkedIeEvent_ = function(e) {
  return e.keyCode < 0 || e.returnValue != undefined
};
goog.events.uniqueIdCounter_ = 0;
goog.events.getUniqueId = function(identifier) {
  return identifier + "_" + goog.events.uniqueIdCounter_++
};goog.events.EventHandler = function(opt_handler) {
  this.handler_ = opt_handler
};
goog.inherits(goog.events.EventHandler, goog.Disposable);
goog.events.EventHandler.KEY_POOL_INITIAL_COUNT = 0;
goog.events.EventHandler.KEY_POOL_MAX_COUNT = 100;
goog.events.EventHandler.keyPool_ = new goog.structs.SimplePool(goog.events.EventHandler.KEY_POOL_INITIAL_COUNT, goog.events.EventHandler.KEY_POOL_MAX_COUNT);
goog.events.EventHandler.keys_ = null;
goog.events.EventHandler.key_ = null;
a = goog.events.EventHandler.prototype;
a.listen = function(src, type, opt_fn, opt_capture, opt_handler) {
  if(goog.isArray(type))for(var i = 0;i < type.length;i++)this.listen(src, type[i], opt_fn, opt_capture, opt_handler);
  else this.recordListenerKey_(goog.events.listen(src, type, opt_fn || this, opt_capture || false, opt_handler || this.handler_ || this));
  return this
};
a.listenOnce = function(src, type, opt_fn, opt_capture, opt_handler) {
  if(goog.isArray(type))for(var i = 0;i < type.length;i++)this.listenOnce(src, type[i], opt_fn, opt_capture, opt_handler);
  else this.recordListenerKey_(goog.events.listenOnce(src, type, opt_fn || this, opt_capture || false, opt_handler || this.handler_ || this));
  return this
};
a.listenWithWrapper = function(src, wrapper, listener, opt_capt, opt_handler) {
  wrapper.listen(src, listener, opt_capt, opt_handler || this.handler_, this);
  return this
};
a.recordListenerKey_ = function(key) {
  if(this.keys_)this.keys_[key] = true;
  else if(this.key_) {
    this.keys_ = goog.events.EventHandler.keyPool_.getObject();
    this.keys_[this.key_] = true;
    this.key_ = null;
    this.keys_[key] = true
  }else this.key_ = key
};
a.unlisten = function(src, type, opt_fn, opt_capture, opt_handler) {
  if(this.key_ || this.keys_)if(goog.isArray(type))for(var i = 0;i < type.length;i++)this.unlisten(src, type[i], opt_fn, opt_capture, opt_handler);
  else {
    var listener = goog.events.getListener(src, type, opt_fn || this, opt_capture || false, opt_handler || this.handler_ || this);
    if(listener) {
      var key = listener.key;
      goog.events.unlistenByKey(key);
      if(this.keys_)goog.object.remove(this.keys_, key);
      else if(this.key_ == key)this.key_ = null
    }
  }return this
};
a.unlistenWithWrapper = function(src, wrapper, listener, opt_capt, opt_handler) {
  wrapper.unlisten(src, listener, opt_capt, opt_handler || this.handler_, this);
  return this
};
a.removeAll = function() {
  if(this.keys_) {
    for(var key in this.keys_) {
      goog.events.unlistenByKey(key);
      delete this.keys_[key]
    }goog.events.EventHandler.keyPool_.releaseObject(this.keys_);
    this.keys_ = null
  }else this.key_ && goog.events.unlistenByKey(this.key_)
};
a.disposeInternal = function() {
  goog.events.EventHandler.superClass_.disposeInternal.call(this);
  this.removeAll()
};
a.handleEvent = function() {
  throw Error("EventHandler.handleEvent not implemented");
};goog.events.EventTarget = function() {
};
goog.inherits(goog.events.EventTarget, goog.Disposable);
a = goog.events.EventTarget.prototype;
a.customEvent_ = true;
a.parentEventTarget_ = null;
a.getParentEventTarget = function() {
  return this.parentEventTarget_
};
a.setParentEventTarget = function(parent) {
  this.parentEventTarget_ = parent
};
a.addEventListener = function(type, handler, opt_capture, opt_handlerScope) {
  goog.events.listen(this, type, handler, opt_capture, opt_handlerScope)
};
a.removeEventListener = function(type, handler, opt_capture, opt_handlerScope) {
  goog.events.unlisten(this, type, handler, opt_capture, opt_handlerScope)
};
a.dispatchEvent = function(e) {
  return goog.events.dispatchEvent(this, e)
};
a.disposeInternal = function() {
  goog.events.EventTarget.superClass_.disposeInternal.call(this);
  goog.events.removeAll(this);
  this.parentEventTarget_ = null
};goog.net = {};
goog.net.EventType = {COMPLETE:"complete", SUCCESS:"success", ERROR:"error", ABORT:"abort", READY:"ready", READY_STATE_CHANGE:"readystatechange", TIMEOUT:"timeout", INCREMENTAL_DATA:"incrementaldata"};goog.net.ImageLoader = function(opt_parent) {
  this.images_ = {};
  this.handler_ = new goog.events.EventHandler(this);
  this.parent_ = opt_parent
};
goog.inherits(goog.net.ImageLoader, goog.events.EventTarget);
a = goog.net.ImageLoader.prototype;
a.addImage = function(id, image) {
  var src = goog.isString(image) ? image : image.src;
  if(src)this.images_[id] = src
};
a.start = function() {
  goog.object.forEach(this.images_, this.loadImage_, this)
};
a.loadImage_ = function(src, id) {
  var image;
  image = this.parent_ ? goog.dom.getDomHelper(this.parent_).createDom("img") : new Image;
  this.images_[id] = image;
  this.handler_.listen(image, [goog.userAgent.IE ? goog.net.EventType.READY_STATE_CHANGE : goog.events.EventType.LOAD, goog.net.EventType.ABORT, goog.net.EventType.ERROR], this.onNetworkEvent_);
  image.id = id;
  image.src = src
};
a.onNetworkEvent_ = function(evt) {
  var image = evt.currentTarget;
  if(image) {
    if(evt.type == goog.net.EventType.READY_STATE_CHANGE)if(image.readyState == goog.net.EventType.COMPLETE)evt.type = goog.events.EventType.LOAD;
    else return;
    if(typeof image.naturalWidth == "undefined")if(evt.type == goog.events.EventType.LOAD) {
      image.naturalWidth = image.width;
      image.naturalHeight = image.height
    }else {
      image.naturalWidth = 0;
      image.naturalHeight = 0
    }this.dispatchEvent({type:evt.type, target:image});
    goog.object.remove(this.images_, image.id);
    if(goog.object.isEmpty(this.images_)) {
      this.dispatchEvent(goog.net.EventType.COMPLETE);
      this.handler_ && this.handler_.removeAll()
    }
  }
};
a.disposeInternal = function() {
  this.images_ && delete this.images_;
  if(this.handler_) {
    this.handler_.dispose();
    this.handler_ = null
  }goog.net.ImageLoader.superClass_.disposeInternal.call(this)
};goog.iter = {};
goog.iter.Iterable = goog.typedef;
goog.iter.StopIteration = "StopIteration" in goog.global ? goog.global.StopIteration : Error("StopIteration");
goog.iter.Iterator = function() {
};
goog.iter.Iterator.prototype.next = function() {
  throw goog.iter.StopIteration;
};
goog.iter.Iterator.prototype.__iterator__ = function() {
  return this
};
goog.iter.toIterator = function(iterable) {
  if(iterable instanceof goog.iter.Iterator)return iterable;
  if(typeof iterable.__iterator__ == "function")return iterable.__iterator__(false);
  if(goog.isArrayLike(iterable)) {
    var i = 0, newIter = new goog.iter.Iterator;
    newIter.next = function() {
      for(;1;) {
        if(i >= iterable.length)throw goog.iter.StopIteration;if(i in iterable)return iterable[i++];
        else i++
      }
    };
    return newIter
  }throw Error("Not implemented");
};
goog.iter.forEach = function(iterable, f, opt_obj) {
  if(goog.isArrayLike(iterable))try {
    goog.array.forEach(iterable, f, opt_obj)
  }catch(ex) {
    if(ex !== goog.iter.StopIteration)throw ex;
  }else {
    iterable = goog.iter.toIterator(iterable);
    try {
      for(;1;)f.call(opt_obj, iterable.next(), undefined, iterable)
    }catch(ex$$5) {
      if(ex$$5 !== goog.iter.StopIteration)throw ex$$5;
    }
  }
};
goog.iter.filter = function(iterable, f, opt_obj) {
  iterable = goog.iter.toIterator(iterable);
  var newIter = new goog.iter.Iterator;
  newIter.next = function() {
    for(;1;) {
      var val = iterable.next();
      if(f.call(opt_obj, val, undefined, iterable))return val
    }
  };
  return newIter
};
goog.iter.range = function(startOrStop, opt_stop, opt_step) {
  var start = 0, stop = startOrStop, step = opt_step || 1;
  if(arguments.length > 1) {
    start = startOrStop;
    stop = opt_stop
  }if(step == 0)throw Error("Range step argument must not be zero");var newIter = new goog.iter.Iterator;
  newIter.next = function() {
    if(step > 0 && start >= stop || step < 0 && start <= stop)throw goog.iter.StopIteration;var rv = start;
    start += step;
    return rv
  };
  return newIter
};
goog.iter.join = function(iterable, deliminator) {
  return goog.iter.toArray(iterable).join(deliminator)
};
goog.iter.map = function(iterable, f, opt_obj) {
  iterable = goog.iter.toIterator(iterable);
  var newIter = new goog.iter.Iterator;
  newIter.next = function() {
    for(;1;) {
      var val = iterable.next();
      return f.call(opt_obj, val, undefined, iterable)
    }
  };
  return newIter
};
goog.iter.reduce = function(iterable, f, val, opt_obj) {
  var rval = val;
  goog.iter.forEach(iterable, function(val) {
    rval = f.call(opt_obj, rval, val)
  });
  return rval
};
goog.iter.some = function(iterable, f, opt_obj) {
  iterable = goog.iter.toIterator(iterable);
  try {
    for(;1;)if(f.call(opt_obj, iterable.next(), undefined, iterable))return true
  }catch(ex) {
    if(ex !== goog.iter.StopIteration)throw ex;
  }return false
};
goog.iter.every = function(iterable, f, opt_obj) {
  iterable = goog.iter.toIterator(iterable);
  try {
    for(;1;)if(!f.call(opt_obj, iterable.next(), undefined, iterable))return false
  }catch(ex) {
    if(ex !== goog.iter.StopIteration)throw ex;
  }return true
};
goog.iter.chain = function() {
  var args = arguments, length = args.length, i = 0, newIter = new goog.iter.Iterator;
  newIter.next = function() {
    try {
      if(i >= length)throw goog.iter.StopIteration;return goog.iter.toIterator(args[i]).next()
    }catch(ex) {
      if(ex !== goog.iter.StopIteration || i >= length)throw ex;else {
        i++;
        return this.next()
      }
    }
  };
  return newIter
};
goog.iter.dropWhile = function(iterable, f, opt_obj) {
  iterable = goog.iter.toIterator(iterable);
  var newIter = new goog.iter.Iterator, dropping = true;
  newIter.next = function() {
    for(;1;) {
      var val = iterable.next();
      if(!(dropping && f.call(opt_obj, val, undefined, iterable))) {
        dropping = false;
        return val
      }
    }
  };
  return newIter
};
goog.iter.takeWhile = function(iterable, f, opt_obj) {
  iterable = goog.iter.toIterator(iterable);
  var newIter = new goog.iter.Iterator, taking = true;
  newIter.next = function() {
    for(;1;)if(taking) {
      var val = iterable.next();
      if(f.call(opt_obj, val, undefined, iterable))return val;
      else taking = false
    }else throw goog.iter.StopIteration;
  };
  return newIter
};
goog.iter.toArray = function(iterable) {
  if(goog.isArrayLike(iterable))return goog.array.toArray(iterable);
  iterable = goog.iter.toIterator(iterable);
  var array = [];
  goog.iter.forEach(iterable, function(val) {
    array.push(val)
  });
  return array
};
goog.iter.equals = function(iterable1, iterable2) {
  iterable1 = goog.iter.toIterator(iterable1);
  iterable2 = goog.iter.toIterator(iterable2);
  var b1, b2;
  try {
    for(;1;) {
      b1 = b2 = false;
      var val1 = iterable1.next();
      b1 = true;
      var val2 = iterable2.next();
      b2 = true;
      if(val1 != val2)return false
    }
  }catch(ex) {
    if(ex !== goog.iter.StopIteration)throw ex;else {
      if(b1 && !b2)return false;
      if(!b2)try {
        iterable2.next();
        return false
      }catch(ex1) {
        if(ex1 !== goog.iter.StopIteration)throw ex1;return true
      }
    }
  }return false
};
goog.iter.nextOrValue = function(iterable, defaultValue) {
  try {
    return goog.iter.toIterator(iterable).next()
  }catch(e) {
    if(e != goog.iter.StopIteration)throw e;return defaultValue
  }
};goog.structs.getCount = function(col) {
  if(typeof col.getCount == "function")return col.getCount();
  if(goog.isArrayLike(col) || goog.isString(col))return col.length;
  return goog.object.getCount(col)
};
goog.structs.getValues = function(col) {
  if(typeof col.getValues == "function")return col.getValues();
  if(goog.isString(col))return col.split("");
  if(goog.isArrayLike(col)) {
    for(var rv = [], l = col.length, i = 0;i < l;i++)rv.push(col[i]);
    return rv
  }return goog.object.getValues(col)
};
goog.structs.getKeys = function(col) {
  if(typeof col.getKeys == "function")return col.getKeys();
  if(typeof col.getValues != "function") {
    if(goog.isArrayLike(col) || goog.isString(col)) {
      for(var rv = [], l = col.length, i = 0;i < l;i++)rv.push(i);
      return rv
    }return goog.object.getKeys(col)
  }
};
goog.structs.contains = function(col, val) {
  if(typeof col.contains == "function")return col.contains(val);
  if(typeof col.containsValue == "function")return col.containsValue(val);
  if(goog.isArrayLike(col) || goog.isString(col))return goog.array.contains(col, val);
  return goog.object.containsValue(col, val)
};
goog.structs.isEmpty = function(col) {
  if(typeof col.isEmpty == "function")return col.isEmpty();
  if(goog.isArrayLike(col) || goog.isString(col))return goog.array.isEmpty(col);
  return goog.object.isEmpty(col)
};
goog.structs.clear = function(col) {
  if(typeof col.clear == "function")col.clear();
  else goog.isArrayLike(col) ? goog.array.clear(col) : goog.object.clear(col)
};
goog.structs.forEach = function(col, f, opt_obj) {
  if(typeof col.forEach == "function")col.forEach(f, opt_obj);
  else if(goog.isArrayLike(col) || goog.isString(col))goog.array.forEach(col, f, opt_obj);
  else for(var keys = goog.structs.getKeys(col), values = goog.structs.getValues(col), l = values.length, i = 0;i < l;i++)f.call(opt_obj, values[i], keys && keys[i], col)
};
goog.structs.filter = function(col, f, opt_obj) {
  if(typeof col.filter == "function")return col.filter(f, opt_obj);
  if(goog.isArrayLike(col) || goog.isString(col))return goog.array.filter(col, f, opt_obj);
  var rv, keys = goog.structs.getKeys(col), values = goog.structs.getValues(col), l = values.length;
  if(keys) {
    rv = {};
    for(var i = 0;i < l;i++)if(f.call(opt_obj, values[i], keys[i], col))rv[keys[i]] = values[i]
  }else {
    rv = [];
    for(i = 0;i < l;i++)f.call(opt_obj, values[i], undefined, col) && rv.push(values[i])
  }return rv
};
goog.structs.map = function(col, f, opt_obj) {
  if(typeof col.map == "function")return col.map(f, opt_obj);
  if(goog.isArrayLike(col) || goog.isString(col))return goog.array.map(col, f, opt_obj);
  var rv, keys = goog.structs.getKeys(col), values = goog.structs.getValues(col), l = values.length;
  if(keys) {
    rv = {};
    for(var i = 0;i < l;i++)rv[keys[i]] = f.call(opt_obj, values[i], keys[i], col)
  }else {
    rv = [];
    for(i = 0;i < l;i++)rv[i] = f.call(opt_obj, values[i], undefined, col)
  }return rv
};
goog.structs.some = function(col, f, opt_obj) {
  if(typeof col.some == "function")return col.some(f, opt_obj);
  if(goog.isArrayLike(col) || goog.isString(col))return goog.array.some(col, f, opt_obj);
  for(var keys = goog.structs.getKeys(col), values = goog.structs.getValues(col), l = values.length, i = 0;i < l;i++)if(f.call(opt_obj, values[i], keys && keys[i], col))return true;
  return false
};
goog.structs.every = function(col, f, opt_obj) {
  if(typeof col.every == "function")return col.every(f, opt_obj);
  if(goog.isArrayLike(col) || goog.isString(col))return goog.array.every(col, f, opt_obj);
  for(var keys = goog.structs.getKeys(col), values = goog.structs.getValues(col), l = values.length, i = 0;i < l;i++)if(!f.call(opt_obj, values[i], keys && keys[i], col))return false;
  return true
};goog.structs.Map = function(opt_map) {
  this.map_ = {};
  this.keys_ = [];
  var argLength = arguments.length;
  if(argLength > 1) {
    if(argLength % 2)throw Error("Uneven number of arguments");for(var i = 0;i < argLength;i += 2)this.set(arguments[i], arguments[i + 1])
  }else opt_map && this.addAll(opt_map)
};
a = goog.structs.Map.prototype;
a.count_ = 0;
a.version_ = 0;
a.getCount = function() {
  return this.count_
};
a.getValues = function() {
  this.cleanupKeysArray_();
  for(var rv = [], i = 0;i < this.keys_.length;i++)rv.push(this.map_[this.keys_[i]]);
  return rv
};
a.getKeys = function() {
  this.cleanupKeysArray_();
  return this.keys_.concat()
};
a.containsKey = function(key) {
  return goog.structs.Map.hasKey_(this.map_, key)
};
a.containsValue = function(val) {
  for(var i = 0;i < this.keys_.length;i++) {
    var key = this.keys_[i];
    if(goog.structs.Map.hasKey_(this.map_, key) && this.map_[key] == val)return true
  }return false
};
a.equals = function(otherMap, opt_equalityFn) {
  if(this === otherMap)return true;
  if(this.count_ != otherMap.getCount())return false;
  var equalityFn = opt_equalityFn || goog.structs.Map.defaultEquals;
  this.cleanupKeysArray_();
  for(var key, i = 0;key = this.keys_[i];i++)if(!equalityFn(this.get(key), otherMap.get(key)))return false;
  return true
};
goog.structs.Map.defaultEquals = function(a, b) {
  return a === b
};
a = goog.structs.Map.prototype;
a.isEmpty = function() {
  return this.count_ == 0
};
a.clear = function() {
  this.map_ = {};
  this.version_ = this.count_ = this.keys_.length = 0
};
a.remove = function(key) {
  if(goog.structs.Map.hasKey_(this.map_, key)) {
    delete this.map_[key];
    this.count_--;
    this.version_++;
    this.keys_.length > 2 * this.count_ && this.cleanupKeysArray_();
    return true
  }return false
};
a.cleanupKeysArray_ = function() {
  if(this.count_ != this.keys_.length) {
    for(var srcIndex = 0, destIndex = 0;srcIndex < this.keys_.length;) {
      var key = this.keys_[srcIndex];
      if(goog.structs.Map.hasKey_(this.map_, key))this.keys_[destIndex++] = key;
      srcIndex++
    }this.keys_.length = destIndex
  }if(this.count_ != this.keys_.length) {
    var seen = {};
    for(destIndex = srcIndex = 0;srcIndex < this.keys_.length;) {
      key = this.keys_[srcIndex];
      if(!goog.structs.Map.hasKey_(seen, key)) {
        this.keys_[destIndex++] = key;
        seen[key] = 1
      }srcIndex++
    }this.keys_.length = destIndex
  }
};
a.get = function(key, opt_val) {
  if(goog.structs.Map.hasKey_(this.map_, key))return this.map_[key];
  return opt_val
};
a.set = function(key, value) {
  if(!goog.structs.Map.hasKey_(this.map_, key)) {
    this.count_++;
    this.keys_.push(key);
    this.version_++
  }this.map_[key] = value
};
a.addAll = function(map) {
  var keys, values;
  if(map instanceof goog.structs.Map) {
    keys = map.getKeys();
    values = map.getValues()
  }else {
    keys = goog.object.getKeys(map);
    values = goog.object.getValues(map)
  }for(var i = 0;i < keys.length;i++)this.set(keys[i], values[i])
};
a.clone = function() {
  return new goog.structs.Map(this)
};
a.transpose = function() {
  for(var transposed = new goog.structs.Map, i = 0;i < this.keys_.length;i++) {
    var key = this.keys_[i];
    transposed.set(this.map_[key], key)
  }return transposed
};
a.__iterator__ = function(opt_keys) {
  this.cleanupKeysArray_();
  var i = 0, keys = this.keys_, map = this.map_, version = this.version_, selfObj = this, newIter = new goog.iter.Iterator;
  newIter.next = function() {
    for(;1;) {
      if(version != selfObj.version_)throw Error("The map has changed since the iterator was created");if(i >= keys.length)throw goog.iter.StopIteration;var key = keys[i++];
      return opt_keys ? key : map[key]
    }
  };
  return newIter
};
goog.structs.Map.hasKey_ = function(obj, key) {
  return Object.prototype.hasOwnProperty.call(obj, key)
};
goog.structs.Map.getCount = function(map) {
  return goog.structs.getCount(map)
};
goog.structs.Map.getValues = function(map) {
  return goog.structs.getValues(map)
};
goog.structs.Map.getKeys = function(map) {
  if(typeof map.getKeys == "function")return map.getKeys();
  var rv = [];
  if(goog.isArrayLike(map))for(var i = 0;i < map.length;i++)rv.push(i);
  else return goog.object.getKeys(map);
  return rv
};
goog.structs.Map.containsKey = function(map, key) {
  if(typeof map.containsKey == "function")return map.containsKey(key);
  if(goog.isArrayLike(map))return Number(key) < map.length;
  return goog.object.containsKey(map, key)
};
goog.structs.Map.containsValue = function(map, val) {
  return goog.structs.contains(map, val)
};
goog.structs.Map.isEmpty = function(map) {
  return goog.structs.isEmpty(map)
};
goog.structs.Map.clear = function(map) {
  goog.structs.clear(map)
};
goog.structs.Map.remove = function(map, key) {
  if(typeof map.remove == "function")return map.remove(key);
  if(goog.isArrayLike(map))return goog.array.removeAt(map, Number(key));
  return goog.object.remove(map, key)
};
goog.structs.Map.add = function(map, key, val) {
  if(typeof map.add == "function")map.add(key, val);
  else if(goog.structs.Map.containsKey(map, key))throw Error('The collection already contains the key "' + key + '"');else goog.structs.Map.set(map, key, val)
};
goog.structs.Map.get = function(map, key, opt_val) {
  if(typeof map.get == "function")return map.get(key, opt_val);
  if(goog.structs.Map.containsKey(map, key))return map[key];
  return opt_val
};
goog.structs.Map.set = function(map, key, val) {
  if(typeof map.set == "function")map.set(key, val);
  else map[key] = val
};goog.structs.Set = function(opt_values) {
  this.map_ = new goog.structs.Map;
  opt_values && this.addAll(opt_values)
};
goog.structs.Set.getKey_ = function(val) {
  var type = typeof val;
  return type == "object" && val || type == "function" ? "o" + goog.getHashCode(val) : type.substr(0, 1) + val
};
a = goog.structs.Set.prototype;
a.getCount = function() {
  return this.map_.getCount()
};
a.add = function(obj) {
  this.map_.set(goog.structs.Set.getKey_(obj), obj)
};
a.addAll = function(set) {
  for(var values = goog.structs.getValues(set), l = values.length, i = 0;i < l;i++)this.add(values[i])
};
a.removeAll = function(set) {
  for(var values = goog.structs.getValues(set), l = values.length, i = 0;i < l;i++)this.remove(values[i])
};
a.remove = function(obj) {
  return this.map_.remove(goog.structs.Set.getKey_(obj))
};
a.clear = function() {
  this.map_.clear()
};
a.isEmpty = function() {
  return this.map_.isEmpty()
};
a.contains = function(obj) {
  return this.map_.containsKey(goog.structs.Set.getKey_(obj))
};
a.intersection = function(set) {
  for(var result = new goog.structs.Set, values = goog.structs.getValues(set), i = 0;i < values.length;i++) {
    var value = values[i];
    this.contains(value) && result.add(value)
  }return result
};
a.getValues = function() {
  return this.map_.getValues()
};
a.clone = function() {
  return new goog.structs.Set(this)
};
a.equals = function(col) {
  return this.getCount() == goog.structs.getCount(col) && this.isSubsetOf(col)
};
a.isSubsetOf = function(col) {
  var colCount = goog.structs.getCount(col);
  if(this.getCount() > colCount)return false;
  if(!(col instanceof goog.structs.Set) && colCount > 5)col = new goog.structs.Set(col);
  return goog.structs.every(this, function(value) {
    return goog.structs.contains(col, value)
  })
};
a.__iterator__ = function() {
  return this.map_.__iterator__(false)
};goog.debug.catchErrors = function(opt_logger, opt_cancel, opt_target) {
  var logger = opt_logger || goog.debug.LogManager.getRoot(), target = opt_target || goog.global, oldErrorHandler = target.onerror;
  target.onerror = function(message, url, line) {
    oldErrorHandler && oldErrorHandler(message, url, line);
    var file = String(url).split(/[\/\\]/).pop();
    goog.isFunction(logger) ? logger({message:message, fileName:file, line:line}) : logger.severe("Error: " + message + " (" + file + " @ Line: " + line + ")");
    return Boolean(opt_cancel)
  }
};
goog.debug.expose = function(obj, opt_showFn) {
  if(typeof obj == "undefined")return"undefined";
  if(obj == null)return"NULL";
  var str = [];
  for(var x in obj)if(!(!opt_showFn && goog.isFunction(obj[x]))) {
    var s = x + " = ";
    try {
      s += obj[x]
    }catch(e) {
      s += "*** " + e + " ***"
    }str.push(s)
  }return str.join("\n")
};
goog.debug.deepExpose = function(obj, opt_showFn) {
  var previous = new goog.structs.Set, str = [], helper = function(obj, space) {
    var nestspace = space + "  ";
    try {
      if(goog.isDef(obj))if(goog.isNull(obj))str.push("NULL");
      else if(goog.isString(obj))str.push('"' + obj.replace(/\n/g, "\n" + space) + '"');
      else if(goog.isFunction(obj))str.push(String(obj).replace(/\n/g, "\n" + space));
      else if(goog.isObject(obj))if(previous.contains(obj))str.push("*** reference loop detected ***");
      else {
        previous.add(obj);
        str.push("{");
        for(var x in obj)if(!(!opt_showFn && goog.isFunction(obj[x]))) {
          str.push("\n");
          str.push(nestspace);
          str.push(x + " = ");
          helper(obj[x], nestspace)
        }str.push("\n" + space + "}")
      }else str.push(obj);
      else str.push("undefined")
    }catch(e) {
      str.push("*** " + e + " ***")
    }
  };
  helper(obj, "");
  return str.join("")
};
goog.debug.exposeArray = function(arr) {
  for(var str = [], i = 0;i < arr.length;i++)goog.isArray(arr[i]) ? str.push(goog.debug.exposeArray(arr[i])) : str.push(arr[i]);
  return"[ " + str.join(", ") + " ]"
};
goog.debug.exposeException = function(err, opt_fn) {
  try {
    var e = goog.debug.normalizeErrorObject(err);
    return"Message: " + goog.string.htmlEscape(e.message) + '\nUrl: <a href="view-source:' + e.fileName + '" target="_new">' + e.fileName + "</a>\nLine: " + e.lineNumber + "\n\nBrowser stack:\n" + goog.string.htmlEscape(e.stack + "-> ") + "[end]\n\nJS stack traversal:\n" + goog.string.htmlEscape(goog.debug.getStacktrace(opt_fn) + "-> ")
  }catch(e2) {
    return"Exception trying to expose exception! You win, we lose. " + e2
  }
};
goog.debug.normalizeErrorObject = function(err) {
  var href = goog.getObjectByName("window.location.href");
  return typeof err == "string" ? {message:err, name:"Unknown error", lineNumber:"Not available", fileName:href, stack:"Not available"} : !err.lineNumber || !err.fileName || !err.stack ? {message:err.message, name:err.name, lineNumber:err.lineNumber || err.line || "Not available", fileName:err.fileName || err.filename || err.sourceURL || href, stack:err.stack || "Not available"} : err
};
goog.debug.enhanceError = function(err, opt_message) {
  var error = typeof err == "string" ? Error(err) : err;
  if(!error.stack)error.stack = goog.debug.getStacktrace(arguments.callee.caller);
  if(opt_message) {
    for(var x = 0;error["message" + x];)++x;
    error["message" + x] = String(opt_message)
  }return error
};
goog.debug.getStacktraceSimple = function(opt_depth) {
  for(var sb = [], fn = arguments.callee.caller, depth = 0;fn && (!opt_depth || depth < opt_depth);) {
    sb.push(goog.debug.getFunctionName(fn));
    sb.push("()\n");
    try {
      fn = fn.caller
    }catch(e) {
      sb.push("[exception trying to get caller]\n");
      break
    }depth++;
    if(depth >= goog.debug.MAX_STACK_DEPTH) {
      sb.push("[...long stack...]");
      break
    }
  }opt_depth && depth >= opt_depth ? sb.push("[...reached max depth limit...]") : sb.push("[end]");
  return sb.join("")
};
goog.debug.MAX_STACK_DEPTH = 50;
goog.debug.getStacktrace = function(opt_fn) {
  return goog.debug.getStacktraceHelper_(opt_fn || arguments.callee.caller, [])
};
goog.debug.getStacktraceHelper_ = function(fn, visited) {
  var sb = [];
  if(goog.array.contains(visited, fn))sb.push("[...circular reference...]");
  else if(fn && visited.length < goog.debug.MAX_STACK_DEPTH) {
    sb.push(goog.debug.getFunctionName(fn) + "(");
    for(var args = fn.arguments, i = 0;i < args.length;i++) {
      i > 0 && sb.push(", ");
      var argDesc, arg = args[i];
      switch(typeof arg) {
        case "object":
          argDesc = arg ? "object" : "null";
          break;
        case "string":
          argDesc = arg;
          break;
        case "number":
          argDesc = String(arg);
          break;
        case "boolean":
          argDesc = arg ? "true" : "false";
          break;
        case "function":
          argDesc = (argDesc = goog.debug.getFunctionName(arg)) ? argDesc : "[fn]";
          break;
        case "undefined":
        ;
        default:
          argDesc = typeof arg;
          break
      }
      if(argDesc.length > 40)argDesc = argDesc.substr(0, 40) + "...";
      sb.push(argDesc)
    }visited.push(fn);
    sb.push(")\n");
    try {
      sb.push(goog.debug.getStacktraceHelper_(fn.caller, visited))
    }catch(e) {
      sb.push("[exception trying to get caller]\n")
    }
  }else fn ? sb.push("[...long stack...]") : sb.push("[end]");
  return sb.join("")
};
goog.debug.getFunctionName = function(fn) {
  var functionSource = String(fn);
  if(!goog.debug.fnNameCache_[functionSource]) {
    var matches = /function ([^\(]+)/.exec(functionSource);
    goog.debug.fnNameCache_[functionSource] = matches ? matches[1] : "[Anonymous]"
  }return goog.debug.fnNameCache_[functionSource]
};
goog.debug.makeWhitespaceVisible = function(string) {
  return string.replace(/ /g, "[_]").replace(/\f/g, "[f]").replace(/\n/g, "[n]\n").replace(/\r/g, "[r]").replace(/\t/g, "[t]")
};
goog.debug.fnNameCache_ = {};goog.debug.LogRecord = function(level, msg, loggerName, opt_time, opt_sequenceNumber) {
  this.sequenceNumber_ = typeof opt_sequenceNumber == "number" ? opt_sequenceNumber : goog.debug.LogRecord.nextSequenceNumber_++;
  this.time_ = opt_time || goog.now();
  this.level_ = level;
  this.msg_ = msg;
  this.loggerName_ = loggerName
};
goog.debug.LogRecord.prototype.exception_ = null;
goog.debug.LogRecord.prototype.exceptionText_ = null;
goog.debug.LogRecord.nextSequenceNumber_ = 0;
goog.debug.LogRecord.prototype.setException = function(exception) {
  this.exception_ = exception
};
goog.debug.LogRecord.prototype.setExceptionText = function(text) {
  this.exceptionText_ = text
};
goog.debug.LogRecord.prototype.getLevel = function() {
  return this.level_
};
goog.debug.LogRecord.prototype.setLevel = function(level) {
  this.level_ = level
};goog.debug.Logger = function(name) {
  this.name_ = name;
  this.parent_ = null;
  this.children_ = {};
  this.handlers_ = []
};
goog.debug.Logger.prototype.level_ = null;
goog.debug.Logger.Level = function(name, value) {
  this.name = name;
  this.value = value
};
goog.debug.Logger.Level.prototype.toString = function() {
  return this.name
};
goog.debug.Logger.Level.OFF = new goog.debug.Logger.Level("OFF", Infinity);
goog.debug.Logger.Level.SHOUT = new goog.debug.Logger.Level("SHOUT", 1200);
goog.debug.Logger.Level.SEVERE = new goog.debug.Logger.Level("SEVERE", 1E3);
goog.debug.Logger.Level.WARNING = new goog.debug.Logger.Level("WARNING", 900);
goog.debug.Logger.Level.INFO = new goog.debug.Logger.Level("INFO", 800);
goog.debug.Logger.Level.CONFIG = new goog.debug.Logger.Level("CONFIG", 700);
goog.debug.Logger.Level.FINE = new goog.debug.Logger.Level("FINE", 500);
goog.debug.Logger.Level.FINER = new goog.debug.Logger.Level("FINER", 400);
goog.debug.Logger.Level.FINEST = new goog.debug.Logger.Level("FINEST", 300);
goog.debug.Logger.Level.ALL = new goog.debug.Logger.Level("ALL", 0);
goog.debug.Logger.Level.PREDEFINED_LEVELS = [goog.debug.Logger.Level.OFF, goog.debug.Logger.Level.SHOUT, goog.debug.Logger.Level.SEVERE, goog.debug.Logger.Level.WARNING, goog.debug.Logger.Level.INFO, goog.debug.Logger.Level.CONFIG, goog.debug.Logger.Level.FINE, goog.debug.Logger.Level.FINER, goog.debug.Logger.Level.FINEST, goog.debug.Logger.Level.ALL];
goog.debug.Logger.Level.predefinedLevelsCache_ = null;
goog.debug.Logger.Level.createPredefinedLevelsCache_ = function() {
  goog.debug.Logger.Level.predefinedLevelsCache_ = {};
  for(var i = 0, level;level = goog.debug.Logger.Level.PREDEFINED_LEVELS[i];i++) {
    goog.debug.Logger.Level.predefinedLevelsCache_[level.value] = level;
    goog.debug.Logger.Level.predefinedLevelsCache_[level.name] = level
  }
};
goog.debug.Logger.Level.getPredefinedLevel = function(name) {
  goog.debug.Logger.Level.predefinedLevelsCache_ || goog.debug.Logger.Level.createPredefinedLevelsCache_();
  return goog.debug.Logger.Level.predefinedLevelsCache_[name] || null
};
goog.debug.Logger.Level.getPredefinedLevelByValue = function(value) {
  goog.debug.Logger.Level.predefinedLevelsCache_ || goog.debug.Logger.Level.createPredefinedLevelsCache_();
  if(value in goog.debug.Logger.Level.predefinedLevelsCache_)return goog.debug.Logger.Level.predefinedLevelsCache_[value];
  for(var i = 0;i < goog.debug.Logger.Level.PREDEFINED_LEVELS.length;++i) {
    var level = goog.debug.Logger.Level.PREDEFINED_LEVELS[i];
    if(level.value <= value)return level
  }return null
};
goog.debug.Logger.getLogger = function(name) {
  return goog.debug.LogManager.getLogger(name)
};
a = goog.debug.Logger.prototype;
a.getName = function() {
  return this.name_
};
a.getParent = function() {
  return this.parent_
};
a.getChildren = function() {
  return this.children_
};
a.setLevel = function(level) {
  this.level_ = level
};
a.getLevel = function() {
  return this.level_
};
a.isLoggable = function(level) {
  if(this.level_)return level.value >= this.level_.value;
  if(this.parent_)return this.parent_.isLoggable(level);
  return false
};
a.log = function(level, msg, opt_exception) {
  this.isLoggable(level) && this.logRecord(this.getLogRecord(level, msg, opt_exception))
};
a.getLogRecord = function(level, msg, opt_exception) {
  var logRecord = new goog.debug.LogRecord(level, String(msg), this.name_);
  if(opt_exception) {
    logRecord.setException(opt_exception);
    logRecord.setExceptionText(goog.debug.exposeException(opt_exception, arguments.callee.caller))
  }return logRecord
};
a.severe = function(msg, opt_exception) {
  this.log(goog.debug.Logger.Level.SEVERE, msg, opt_exception)
};
a.warning = function(msg, opt_exception) {
  this.log(goog.debug.Logger.Level.WARNING, msg, opt_exception)
};
a.fine = function(msg, opt_exception) {
  this.log(goog.debug.Logger.Level.FINE, msg, opt_exception)
};
a.finest = function(msg, opt_exception) {
  this.log(goog.debug.Logger.Level.FINEST, msg, opt_exception)
};
a.logRecord = function(logRecord) {
  if(this.isLoggable(logRecord.getLevel()))for(var target = this;target;) {
    target.callPublish_(logRecord);
    target = target.getParent()
  }
};
a.callPublish_ = function(logRecord) {
  for(var i = 0;i < this.handlers_.length;i++)this.handlers_[i](logRecord)
};
a.setParent_ = function(parent) {
  this.parent_ = parent
};
a.addChild_ = function(name, logger) {
  this.children_[name] = logger
};
goog.debug.LogManager = {};
goog.debug.LogManager.loggers_ = {};
goog.debug.LogManager.rootLogger_ = null;
goog.debug.LogManager.initialize = function() {
  if(!goog.debug.LogManager.rootLogger_) {
    goog.debug.LogManager.rootLogger_ = new goog.debug.Logger("");
    goog.debug.LogManager.loggers_[""] = goog.debug.LogManager.rootLogger_;
    goog.debug.LogManager.rootLogger_.setLevel(goog.debug.Logger.Level.CONFIG)
  }
};
goog.debug.LogManager.getLoggers = function() {
  return goog.debug.LogManager.loggers_
};
goog.debug.LogManager.getRoot = function() {
  goog.debug.LogManager.initialize();
  return goog.debug.LogManager.rootLogger_
};
goog.debug.LogManager.getLogger = function(name) {
  goog.debug.LogManager.initialize();
  return name in goog.debug.LogManager.loggers_ ? goog.debug.LogManager.loggers_[name] : goog.debug.LogManager.createLogger_(name)
};
goog.debug.LogManager.createLogger_ = function(name) {
  var logger = new goog.debug.Logger(name), parts = name.split("."), leafName = parts[parts.length - 1];
  parts.length -= 1;
  var parentName = parts.join("."), parentLogger = goog.debug.LogManager.getLogger(parentName);
  parentLogger.addChild_(leafName, logger);
  logger.setParent_(parentLogger);
  return goog.debug.LogManager.loggers_[name] = logger
};goog.Timer = function(opt_interval, opt_timerObject) {
  this.interval_ = opt_interval || 1;
  this.timerObject_ = opt_timerObject || goog.Timer.defaultTimerObject;
  this.boundTick_ = goog.bind(this.tick_, this);
  this.last_ = goog.now()
};
goog.inherits(goog.Timer, goog.events.EventTarget);
goog.Timer.MAX_TIMEOUT_ = 2147483647;
goog.Timer.prototype.enabled = false;
goog.Timer.defaultTimerObject = goog.global.window;
goog.Timer.intervalScale = 0.8;
a = goog.Timer.prototype;
a.timer_ = null;
a.tick_ = function() {
  if(this.enabled) {
    var elapsed = goog.now() - this.last_;
    if(elapsed > 0 && elapsed < this.interval_ * goog.Timer.intervalScale)this.timer_ = this.timerObject_.setTimeout(this.boundTick_, this.interval_ - elapsed);
    else {
      this.dispatchTick();
      if(this.enabled) {
        this.timer_ = this.timerObject_.setTimeout(this.boundTick_, this.interval_);
        this.last_ = goog.now()
      }
    }
  }
};
a.dispatchTick = function() {
  this.dispatchEvent(goog.Timer.TICK)
};
a.start = function() {
  this.enabled = true;
  if(!this.timer_) {
    this.timer_ = this.timerObject_.setTimeout(this.boundTick_, this.interval_);
    this.last_ = goog.now()
  }
};
a.stop = function() {
  this.enabled = false;
  if(this.timer_) {
    this.timerObject_.clearTimeout(this.timer_);
    this.timer_ = null
  }
};
a.disposeInternal = function() {
  goog.Timer.superClass_.disposeInternal.call(this);
  this.stop();
  delete this.timerObject_
};
goog.Timer.TICK = "tick";
goog.Timer.callOnce = function(listener, opt_interval, opt_handler) {
  if(goog.isFunction(listener)) {
    if(opt_handler)listener = goog.bind(listener, opt_handler)
  }else if(listener && typeof listener.handleEvent == "function")listener = goog.bind(listener.handleEvent, listener);
  else throw Error("Invalid listener argument");return opt_interval > goog.Timer.MAX_TIMEOUT_ ? -1 : goog.Timer.defaultTimerObject.setTimeout(listener, opt_interval || 0)
};
goog.Timer.clear = function(timerId) {
  goog.Timer.defaultTimerObject.clearTimeout(timerId)
};goog.net.ErrorCode = {NO_ERROR:0, ACCESS_DENIED:1, FILE_NOT_FOUND:2, FF_SILENT_ERROR:3, CUSTOM_ERROR:4, EXCEPTION:5, HTTP_ERROR:6, ABORT:7, TIMEOUT:8, OFFLINE:9};
goog.net.ErrorCode.getDebugMessage = function(errorCode) {
  switch(errorCode) {
    case goog.net.ErrorCode.NO_ERROR:
      return"No Error";
    case goog.net.ErrorCode.ACCESS_DENIED:
      return"Access denied to content document";
    case goog.net.ErrorCode.FILE_NOT_FOUND:
      return"File not found";
    case goog.net.ErrorCode.FF_SILENT_ERROR:
      return"Firefox silently errored";
    case goog.net.ErrorCode.CUSTOM_ERROR:
      return"Application custom error";
    case goog.net.ErrorCode.EXCEPTION:
      return"An exception occurred";
    case goog.net.ErrorCode.HTTP_ERROR:
      return"Http response at 400 or 500 level";
    case goog.net.ErrorCode.ABORT:
      return"Request was aborted";
    case goog.net.ErrorCode.TIMEOUT:
      return"Request timed out";
    case goog.net.ErrorCode.OFFLINE:
      return"The resource is not available offline";
    default:
      return"Unrecognized error code"
  }
};goog.net.XhrMonitor_ = function() {
  if(goog.userAgent.GECKO) {
    this.contextsToXhr_ = {};
    this.xhrToContexts_ = {};
    this.stack_ = []
  }
};
goog.net.XhrMonitor_.getKey = function(obj) {
  return goog.isString(obj) ? obj : goog.isObject(obj) ? goog.getHashCode(obj) : ""
};
a = goog.net.XhrMonitor_.prototype;
a.logger_ = goog.debug.Logger.getLogger("goog.net.xhrMonitor");
a.enabled_ = goog.userAgent.GECKO;
a.setEnabled = function(val) {
  this.enabled_ = goog.userAgent.GECKO && val
};
a.pushContext = function(context) {
  if(this.enabled_) {
    var key = goog.net.XhrMonitor_.getKey(context);
    this.logger_.finest("Pushing context: " + context + " (" + key + ")");
    this.stack_.push(key)
  }
};
a.popContext = function() {
  if(this.enabled_) {
    var context = this.stack_.pop();
    this.logger_.finest("Popping context: " + context);
    this.updateDependentContexts_(context)
  }
};
a.markXhrOpen = function(xhr) {
  if(this.enabled_) {
    var hc = goog.getHashCode(xhr);
    this.logger_.fine("Opening XHR : " + hc);
    for(var i = 0;i < this.stack_.length;i++) {
      var context = this.stack_[i];
      this.addToMap_(this.contextsToXhr_, context, hc);
      this.addToMap_(this.xhrToContexts_, hc, context)
    }
  }
};
a.markXhrClosed = function(xhr) {
  if(this.enabled_) {
    var hc = goog.getHashCode(xhr);
    this.logger_.fine("Closing XHR : " + hc);
    delete this.xhrToContexts_[hc];
    for(var context in this.contextsToXhr_) {
      goog.array.remove(this.contextsToXhr_[context], hc);
      this.contextsToXhr_[context].length == 0 && delete this.contextsToXhr_[context]
    }
  }
};
a.updateDependentContexts_ = function(xhrHc) {
  var contexts = this.xhrToContexts_[xhrHc], xhrs = this.contextsToXhr_[xhrHc];
  if(contexts && xhrs) {
    this.logger_.finest("Updating dependent contexts");
    goog.array.forEach(contexts, function(context) {
      goog.array.forEach(xhrs, function(xhr) {
        this.addToMap_(this.contextsToXhr_, context, xhr);
        this.addToMap_(this.xhrToContexts_, xhr, context)
      }, this)
    }, this)
  }
};
a.addToMap_ = function(map, key, value) {
  map[key] || (map[key] = []);
  goog.array.contains(map[key], value) || map[key].push(value)
};
goog.net.xhrMonitor = new goog.net.XhrMonitor_;goog.net.XmlHttp = function() {
  return goog.net.XmlHttp.factory_()
};
goog.net.XmlHttp.getOptions = function() {
  return goog.net.XmlHttp.cachedOptions_ || (goog.net.XmlHttp.cachedOptions_ = goog.net.XmlHttp.optionsFactory_())
};
goog.net.XmlHttp.factory_ = null;
goog.net.XmlHttp.optionsFactory_ = null;
goog.net.XmlHttp.cachedOptions_ = null;
goog.net.XmlHttp.setFactory = function(factory, optionsFactory) {
  goog.net.XmlHttp.factory_ = factory;
  goog.net.XmlHttp.optionsFactory_ = optionsFactory;
  goog.net.XmlHttp.cachedOptions_ = null
};
goog.net.XmlHttp.defaultFactory_ = function() {
  var progId = goog.net.XmlHttp.getProgId_();
  return progId ? new ActiveXObject(progId) : new XMLHttpRequest
};
goog.net.XmlHttp.defaultOptionsFactory_ = function() {
  var options = {};
  if(goog.net.XmlHttp.getProgId_()) {
    options[goog.net.XmlHttp.OptionType.USE_NULL_FUNCTION] = true;
    options[goog.net.XmlHttp.OptionType.LOCAL_REQUEST_ERROR] = true
  }return options
};
goog.net.XmlHttp.setFactory(goog.net.XmlHttp.defaultFactory_, goog.net.XmlHttp.defaultOptionsFactory_);
goog.net.XmlHttp.OptionType = {USE_NULL_FUNCTION:0, LOCAL_REQUEST_ERROR:1};
goog.net.XmlHttp.ReadyState = {UNINITIALIZED:0, LOADING:1, LOADED:2, INTERACTIVE:3, COMPLETE:4};
goog.net.XmlHttp.ieProgId_ = null;
goog.net.XmlHttp.getProgId_ = function() {
  if(!goog.net.XmlHttp.ieProgId_ && typeof XMLHttpRequest == "undefined" && typeof ActiveXObject != "undefined") {
    for(var ACTIVE_X_IDENTS = ["MSXML2.XMLHTTP.6.0", "MSXML2.XMLHTTP.3.0", "MSXML2.XMLHTTP", "Microsoft.XMLHTTP"], i = 0;i < ACTIVE_X_IDENTS.length;i++) {
      var candidate = ACTIVE_X_IDENTS[i];
      try {
        new ActiveXObject(candidate);
        return goog.net.XmlHttp.ieProgId_ = candidate
      }catch(e) {
      }
    }throw Error("Could not create ActiveXObject. ActiveX might be disabled, or MSXML might not be installed");
  }return goog.net.XmlHttp.ieProgId_
};goog.net.XhrIo = function() {
  this.headers = new goog.structs.Map
};
goog.inherits(goog.net.XhrIo, goog.events.EventTarget);
goog.net.XhrIo.prototype.logger_ = goog.debug.Logger.getLogger("goog.net.XhrIo");
goog.net.XhrIo.CONTENT_TYPE_HEADER = "Content-Type";
goog.net.XhrIo.FORM_CONTENT_TYPE = "application/x-www-form-urlencoded;charset=utf-8";
goog.net.XhrIo.sendInstances_ = [];
goog.net.XhrIo.send = function(url, opt_callback, opt_method, opt_content, opt_headers, opt_timeoutInterval) {
  var x = new goog.net.XhrIo;
  goog.net.XhrIo.sendInstances_.push(x);
  opt_callback && goog.events.listen(x, goog.net.EventType.COMPLETE, opt_callback);
  goog.events.listen(x, goog.net.EventType.READY, goog.partial(goog.net.XhrIo.cleanupSend_, x));
  opt_timeoutInterval && x.setTimeoutInterval(opt_timeoutInterval);
  x.send(url, opt_method, opt_content, opt_headers)
};
goog.net.XhrIo.cleanup = function() {
  for(var instances = goog.net.XhrIo.sendInstances_;instances.length;)instances.pop().dispose()
};
goog.net.XhrIo.protectEntryPoints = function(errorHandler, opt_tracers) {
  goog.net.XhrIo.prototype.onReadyStateChangeEntryPoint_ = errorHandler.protectEntryPoint(goog.net.XhrIo.prototype.onReadyStateChangeEntryPoint_, opt_tracers)
};
goog.net.XhrIo.cleanupSend_ = function(XhrIo) {
  XhrIo.dispose();
  goog.array.remove(goog.net.XhrIo.sendInstances_, XhrIo)
};
a = goog.net.XhrIo.prototype;
a.active_ = false;
a.xhr_ = null;
a.xhrOptions_ = null;
a.lastUri_ = "";
a.lastMethod_ = "";
a.lastErrorCode_ = goog.net.ErrorCode.NO_ERROR;
a.lastError_ = "";
a.errorDispatched_ = false;
a.inSend_ = false;
a.inOpen_ = false;
a.inAbort_ = false;
a.timeoutInterval_ = 0;
a.timeoutId_ = null;
a.setTimeoutInterval = function(ms) {
  this.timeoutInterval_ = Math.max(0, ms)
};
a.send = function(url, opt_method, opt_content, opt_headers) {
  if(this.active_)throw Error("[goog.net.XhrIo] Object is active with another request");var method = opt_method || "GET";
  this.lastUri_ = url;
  this.lastError_ = "";
  this.lastErrorCode_ = goog.net.ErrorCode.NO_ERROR;
  this.lastMethod_ = method;
  this.errorDispatched_ = false;
  this.active_ = true;
  this.xhr_ = new goog.net.XmlHttp;
  this.xhrOptions_ = goog.net.XmlHttp.getOptions();
  goog.net.xhrMonitor.markXhrOpen(this.xhr_);
  this.xhr_.onreadystatechange = goog.bind(this.onReadyStateChange_, this);
  try {
    this.logger_.fine(this.formatMsg_("Opening Xhr"));
    this.inOpen_ = true;
    this.xhr_.open(method, url, true);
    this.inOpen_ = false
  }catch(err) {
    this.logger_.fine(this.formatMsg_("Error opening Xhr: " + err.message));
    this.error_(goog.net.ErrorCode.EXCEPTION, err);
    return
  }var content = opt_content || "", headers = this.headers.clone();
  opt_headers && goog.structs.forEach(opt_headers, function(value, key) {
    headers.set(key, value)
  });
  method == "POST" && !headers.containsKey(goog.net.XhrIo.CONTENT_TYPE_HEADER) && headers.set(goog.net.XhrIo.CONTENT_TYPE_HEADER, goog.net.XhrIo.FORM_CONTENT_TYPE);
  goog.structs.forEach(headers, function(value, key) {
    this.xhr_.setRequestHeader(key, value)
  }, this);
  try {
    if(this.timeoutId_) {
      goog.Timer.defaultTimerObject.clearTimeout(this.timeoutId_);
      this.timeoutId_ = null
    }if(this.timeoutInterval_ > 0) {
      this.logger_.fine(this.formatMsg_("Will abort after " + this.timeoutInterval_ + "ms if incomplete"));
      this.timeoutId_ = goog.Timer.defaultTimerObject.setTimeout(goog.bind(this.timeout_, this), this.timeoutInterval_)
    }this.logger_.fine(this.formatMsg_("Sending request"));
    this.inSend_ = true;
    this.xhr_.send(content);
    this.inSend_ = false
  }catch(err$$5) {
    this.logger_.fine(this.formatMsg_("Send error: " + err$$5.message));
    this.error_(goog.net.ErrorCode.EXCEPTION, err$$5)
  }
};
a.dispatchEvent = function(e) {
  if(this.xhr_) {
    goog.net.xhrMonitor.pushContext(this.xhr_);
    try {
      return goog.net.XhrIo.superClass_.dispatchEvent.call(this, e)
    }finally {
      goog.net.xhrMonitor.popContext()
    }
  }else return goog.net.XhrIo.superClass_.dispatchEvent.call(this, e)
};
a.timeout_ = function() {
  if(typeof goog != "undefined")if(this.xhr_) {
    this.lastError_ = "Timed out after " + this.timeoutInterval_ + "ms, aborting";
    this.lastErrorCode_ = goog.net.ErrorCode.TIMEOUT;
    this.logger_.fine(this.formatMsg_(this.lastError_));
    this.dispatchEvent(goog.net.EventType.TIMEOUT);
    this.abort(goog.net.ErrorCode.TIMEOUT)
  }
};
a.error_ = function(errorCode, err) {
  this.active_ = false;
  if(this.xhr_) {
    this.inAbort_ = true;
    this.xhr_.abort();
    this.inAbort_ = false
  }this.lastError_ = err;
  this.lastErrorCode_ = errorCode;
  this.dispatchErrors_();
  this.cleanUpXhr_()
};
a.dispatchErrors_ = function() {
  if(!this.errorDispatched_) {
    this.errorDispatched_ = true;
    this.dispatchEvent(goog.net.EventType.COMPLETE);
    this.dispatchEvent(goog.net.EventType.ERROR)
  }
};
a.abort = function(opt_failureCode) {
  if(this.xhr_) {
    this.logger_.fine(this.formatMsg_("Aborting"));
    this.active_ = false;
    this.inAbort_ = true;
    this.xhr_.abort();
    this.inAbort_ = false;
    this.lastErrorCode_ = opt_failureCode || goog.net.ErrorCode.ABORT;
    this.dispatchEvent(goog.net.EventType.COMPLETE);
    this.dispatchEvent(goog.net.EventType.ABORT);
    this.cleanUpXhr_()
  }
};
a.disposeInternal = function() {
  if(this.xhr_) {
    if(this.active_) {
      this.active_ = false;
      this.inAbort_ = true;
      this.xhr_.abort();
      this.inAbort_ = false
    }this.cleanUpXhr_(true)
  }goog.net.XhrIo.superClass_.disposeInternal.call(this)
};
a.onReadyStateChange_ = function() {
  !this.inOpen_ && !this.inSend_ && !this.inAbort_ ? this.onReadyStateChangeEntryPoint_() : this.onReadyStateChangeHelper_()
};
a.onReadyStateChangeEntryPoint_ = function() {
  this.onReadyStateChangeHelper_()
};
a.onReadyStateChangeHelper_ = function() {
  if(this.active_)if(typeof goog != "undefined")if(this.xhrOptions_[goog.net.XmlHttp.OptionType.LOCAL_REQUEST_ERROR] && this.getReadyState() == goog.net.XmlHttp.ReadyState.COMPLETE && this.getStatus() == 2)this.logger_.fine(this.formatMsg_("Local request error detected and ignored"));
  else if(this.inSend_ && this.getReadyState() == goog.net.XmlHttp.ReadyState.COMPLETE)goog.Timer.defaultTimerObject.setTimeout(goog.bind(this.onReadyStateChange_, this), 0);
  else {
    this.dispatchEvent(goog.net.EventType.READY_STATE_CHANGE);
    if(this.isComplete()) {
      this.logger_.fine(this.formatMsg_("Request complete"));
      this.active_ = false;
      if(this.isSuccess()) {
        this.dispatchEvent(goog.net.EventType.COMPLETE);
        this.dispatchEvent(goog.net.EventType.SUCCESS)
      }else {
        this.lastErrorCode_ = goog.net.ErrorCode.HTTP_ERROR;
        this.lastError_ = this.getStatusText() + " [" + this.getStatus() + "]";
        this.dispatchErrors_()
      }this.cleanUpXhr_()
    }
  }
};
a.cleanUpXhr_ = function(opt_fromDispose) {
  if(this.xhr_) {
    var xhr = this.xhr_, clearedOnReadyStateChange = this.xhrOptions_[goog.net.XmlHttp.OptionType.USE_NULL_FUNCTION] ? goog.nullFunction : null;
    this.xhrOptions_ = this.xhr_ = null;
    if(this.timeoutId_) {
      goog.Timer.defaultTimerObject.clearTimeout(this.timeoutId_);
      this.timeoutId_ = null
    }if(!opt_fromDispose) {
      goog.net.xhrMonitor.pushContext(xhr);
      this.dispatchEvent(goog.net.EventType.READY);
      goog.net.xhrMonitor.popContext()
    }goog.net.xhrMonitor.markXhrClosed(xhr);
    try {
      xhr.onreadystatechange = clearedOnReadyStateChange
    }catch(e) {
      this.logger_.severe("Problem encountered resetting onreadystatechange: " + e.message)
    }
  }
};
a.isActive = function() {
  return this.active_
};
a.isComplete = function() {
  return this.getReadyState() == goog.net.XmlHttp.ReadyState.COMPLETE
};
a.isSuccess = function() {
  switch(this.getStatus()) {
    case 0:
    ;
    case 200:
    ;
    case 204:
    ;
    case 304:
      return true;
    default:
      return false
  }
};
a.getReadyState = function() {
  return this.xhr_ ? this.xhr_.readyState : goog.net.XmlHttp.ReadyState.UNINITIALIZED
};
a.getStatus = function() {
  try {
    return this.getReadyState() > goog.net.XmlHttp.ReadyState.LOADED ? this.xhr_.status : -1
  }catch(e) {
    this.logger_.warning("Can not get status: " + e.message);
    return-1
  }
};
a.getStatusText = function() {
  try {
    return this.getReadyState() > goog.net.XmlHttp.ReadyState.LOADED ? this.xhr_.statusText : ""
  }catch(e) {
    this.logger_.fine("Can not get status: " + e.message);
    return""
  }
};
a.getResponseText = function() {
  return this.xhr_ ? this.xhr_.responseText : ""
};
a.formatMsg_ = function(msg) {
  return msg + " [" + this.lastMethod_ + " " + this.lastUri_ + " " + this.getStatus() + "]"
};goog.ui = {};
goog.ui.AutoComplete = function(matcher, renderer, selectionHandler) {
  this.matcher_ = matcher;
  this.selectionHandler_ = selectionHandler;
  this.renderer_ = renderer;
  goog.events.listen(renderer, [goog.ui.AutoComplete.EventType.HILITE, goog.ui.AutoComplete.EventType.SELECT, goog.ui.AutoComplete.EventType.CANCEL_DISMISS, goog.ui.AutoComplete.EventType.DISMISS], this);
  this.token_ = null;
  this.rows_ = [];
  this.hiliteId_ = -1;
  this.firstRowId_ = 0;
  this.dismissTimer_ = this.target_ = null
};
goog.inherits(goog.ui.AutoComplete, goog.events.EventTarget);
goog.ui.AutoComplete.prototype.maxMatches_ = 10;
goog.ui.AutoComplete.prototype.autoHilite_ = true;
goog.ui.AutoComplete.prototype.allowFreeSelect_ = false;
goog.ui.AutoComplete.prototype.triggerSuggestionsOnUpdate_ = false;
goog.ui.AutoComplete.EventType = {HILITE:"hilite", SELECT:"select", DISMISS:"dismiss", CANCEL_DISMISS:"canceldismiss", UPDATE:"update"};
a = goog.ui.AutoComplete.prototype;
a.handleEvent = function(e) {
  if(e.target == this.renderer_)switch(e.type) {
    case goog.ui.AutoComplete.EventType.HILITE:
      this.hiliteId(e.row);
      break;
    case goog.ui.AutoComplete.EventType.SELECT:
      this.selectHilited();
      break;
    case goog.ui.AutoComplete.EventType.CANCEL_DISMISS:
      this.cancelDelayedDismiss();
      break;
    case goog.ui.AutoComplete.EventType.DISMISS:
      this.dismissOnDelay();
      break
  }
};
a.setMaxMatches = function(max) {
  this.maxMatches_ = max
};
a.setToken = function(token, opt_fullString) {
  if(this.token_ != token) {
    this.token_ = token;
    this.matcher_.requestMatchingRows(this.token_, this.maxMatches_, goog.bind(this.matchListener_, this), opt_fullString);
    this.cancelDelayedDismiss()
  }
};
a.getTarget = function() {
  return this.target_
};
a.setTarget = function(target) {
  this.target_ = target
};
a.isOpen = function() {
  return this.renderer_.isVisible()
};
a.hiliteNext = function() {
  if(this.hiliteId_ >= this.firstRowId_ && this.hiliteId_ < this.firstRowId_ + this.rows_.length - 1) {
    this.hiliteId(this.hiliteId_ + 1);
    return true
  }else if(this.hiliteId_ == -1) {
    this.hiliteId(this.firstRowId_);
    return true
  }return false
};
a.hilitePrev = function() {
  if(this.hiliteId_ > this.firstRowId_) {
    this.hiliteId(this.hiliteId_ - 1);
    return true
  }else this.allowFreeSelect_ && this.hiliteId_ == this.firstRowId_ && this.hiliteId(-1);
  return false
};
a.hiliteId = function(id) {
  this.hiliteId_ = id;
  this.renderer_.hiliteId(id);
  return this.getIndexOfId(id) != -1
};
a.selectHilited = function() {
  var index = this.getIndexOfId(this.hiliteId_);
  if(index != -1) {
    var selectedRow = this.rows_[index], suppressUpdate = this.selectionHandler_.selectRow(selectedRow);
    this.dismiss();
    if(!suppressUpdate) {
      this.dispatchEvent({type:goog.ui.AutoComplete.EventType.UPDATE, row:selectedRow});
      this.triggerSuggestionsOnUpdate_ && this.selectionHandler_.update(true)
    }return true
  }else {
    this.dismiss();
    this.dispatchEvent({type:goog.ui.AutoComplete.EventType.UPDATE, row:null});
    return false
  }
};
a.dismiss = function() {
  this.hiliteId_ = -1;
  this.token_ = null;
  this.firstRowId_ += this.rows_.length;
  this.rows_ = [];
  window.clearTimeout(this.dismissTimer_);
  this.dismissTimer_ = null;
  this.renderer_.dismiss()
};
a.dismissOnDelay = function() {
  if(!this.dismissTimer_)this.dismissTimer_ = window.setTimeout(goog.bind(this.dismiss, this), 100)
};
a.cancelDelayedDismiss = function() {
  window.setTimeout(goog.bind(function() {
    if(this.dismissTimer_) {
      window.clearTimeout(this.dismissTimer_);
      this.dismissTimer_ = null
    }
  }, this), 10)
};
a.disposeInternal = function() {
  goog.ui.AutoComplete.superClass_.disposeInternal.call(this);
  this.renderer_.dispose();
  this.selectionHandler_.dispose();
  this.matcher_ = null
};
a.matchListener_ = function(matchedToken, rows, opt_preserveHilited) {
  if(this.token_ == matchedToken) {
    var indexToHilite = opt_preserveHilited ? this.getIndexOfId(this.hiliteId_) : null;
    this.firstRowId_ += this.rows_.length;
    this.rows_ = rows;
    for(var rendRows = [], i = 0;i < rows.length;++i)rendRows.push({id:this.getIdOfIndex_(i), data:rows[i]});
    this.renderer_.renderRows(rendRows, this.token_, this.target_);
    if(this.autoHilite_ && rendRows.length != 0)this.hiliteId(indexToHilite != null ? this.getIdOfIndex_(indexToHilite) : this.firstRowId_);
    else this.hiliteId_ = -1
  }
};
a.getIndexOfId = function(id) {
  var index = id - this.firstRowId_;
  if(index < 0 || index >= this.rows_.length)return-1;
  return index
};
a.getIdOfIndex_ = function(index) {
  return this.firstRowId_ + index
};
a.attachInputs = function() {
  var inputHandler = this.selectionHandler_;
  inputHandler.attachInputs.apply(inputHandler, arguments)
};goog.ui.AutoComplete.ArrayMatcher = function(rows, opt_noSimilar) {
  this.rows_ = rows;
  this.useSimilar_ = !opt_noSimilar
};
goog.ui.AutoComplete.ArrayMatcher.prototype.requestMatchingRows = function(token, maxMatches, matchHandler) {
  var matches = this.getPrefixMatches(token, maxMatches);
  if(matches.length == 0 && this.useSimilar_)matches = this.getSimilarRows(token, maxMatches);
  matchHandler(token, matches)
};
goog.ui.AutoComplete.ArrayMatcher.prototype.getPrefixMatches = function(token, maxMatches) {
  var matches = [];
  if(token != "") {
    var escapedToken = goog.string.regExpEscape(token), matcher = new RegExp("(^|\\W+)" + escapedToken, "i");
    goog.iter.some(this.rows_, function(row) {
      String(row).match(matcher) && matches.push(row);
      return matches.length >= maxMatches
    })
  }return matches
};
goog.ui.AutoComplete.ArrayMatcher.prototype.getSimilarRows = function(token, maxMatches) {
  var results = [];
  goog.iter.forEach(this.rows_, function(row, index) {
    var str = token.toLowerCase(), txt = String(row).toLowerCase(), score = 0;
    if(txt.indexOf(str) != -1)score = parseInt((txt.indexOf(str) / 4).toString(), 10);
    else for(var arr = str.split(""), lastPos = -1, penalty = 10, i = 0, c;c = arr[i];i++) {
      var pos = txt.indexOf(c);
      if(pos > lastPos) {
        var diff = pos - lastPos - 1;
        if(diff > penalty - 5)diff = penalty - 5;
        score += diff;
        lastPos = pos
      }else {
        score += penalty;
        penalty += 5
      }
    }score < str.length * 6 && results.push({str:row, score:score, index:index})
  });
  results.sort(function(a, b) {
    var diff = a.score - b.score;
    if(diff != 0)return diff;
    return a.index - b.index
  });
  for(var matches = [], i = 0;i < maxMatches && i < results.length;i++)matches.push(results[i].str);
  return matches
};goog.dom.a11y = {};
goog.dom.a11y.State = {ACTIVEDESCENDANT:"activedescendant", AUTOCOMPLETE:"autocomplete", CHECKED:"checked", DISABLED:"disabled", EXPANDED:"expanded", HASPOPUP:"haspopup", LABELLEDBY:"labelledby", LEVEL:"level", PRESSED:"pressed", SELECTED:"selected", VALUEMAX:"valuemax", VALUEMIN:"valuemin", VALUENOW:"valuenow"};
goog.dom.a11y.Role = {BUTTON:"button", CHECKBOX:"checkbox", COMBOBOX:"combobox", DIALOG:"dialog", LINK:"link", LISTBOX:"listbox", MAIN:"main", MENU:"menu", MENUBAR:"menubar", MENU_ITEM:"menuitem", MENU_ITEM_CHECKBOX:"menuitemcheckbox", MENU_ITEM_RADIO:"menuitemradio", NAVIGATION:"navigation", OPTION:"option", GROUP:"group", SLIDER:"slider", TAB:"tab", TAB_LIST:"tablist", TAB_PANEL:"tabpanel", TOOLBAR:"toolbar"};
goog.dom.a11y.setRole = function(element, roleName) {
  if(goog.userAgent.GECKO || goog.dom.a11y.noBrowserCheck_) {
    element.setAttribute("role", roleName);
    element.roleName = roleName
  }
};
goog.dom.a11y.getRole = function(element) {
  return element.roleName || ""
};
goog.dom.a11y.setState = function(element, state, value) {
  if(goog.userAgent.GECKO || goog.dom.a11y.noBrowserCheck_)element.setAttribute("aria-" + state, value)
};
goog.dom.a11y.getState = function(element, stateName) {
  return element.getAttribute("aria-" + stateName) || ""
};
goog.dom.a11y.getNoBrowserCheck = function() {
  return!!goog.dom.a11y.noBrowserCheck_
};
goog.dom.a11y.setNoBrowserCheck = function(noBrowserCheck) {
  goog.dom.a11y.noBrowserCheck_ = noBrowserCheck
};
goog.dom.a11y.getActiveDescendant = function(element) {
  var id = goog.dom.a11y.getState(element, goog.dom.a11y.State.ACTIVEDESCENDANT);
  return goog.dom.getOwnerDocument(element).getElementById(id)
};
goog.dom.a11y.setActiveDescendant = function(element, activeElement) {
  goog.dom.a11y.setState(element, goog.dom.a11y.State.ACTIVEDESCENDANT, activeElement ? activeElement.id : "")
};goog.dom.selection = {};
goog.dom.selection.setStart = function(textfield, pos) {
  if(goog.dom.selection.useSelectionProperties_(textfield))textfield.selectionStart = pos;
  else if(goog.userAgent.IE) {
    var tmp = goog.dom.selection.getRangeIe_(textfield), range = tmp[0];
    if(range.inRange(tmp[1])) {
      pos = goog.dom.selection.canonicalizePositionIe_(textfield, pos);
      range.collapse(true);
      range.move("character", pos);
      range.select()
    }
  }
};
goog.dom.selection.getStart = function(textfield) {
  return goog.dom.selection.getEndPoints_(textfield, true)[0]
};
goog.dom.selection.getEndPointsTextareaIe_ = function(range, selRange, getOnlyStart) {
  for(var selectionRange = selRange.duplicate(), beforeSelectionText = range.text, untrimmedBeforeSelectionText = beforeSelectionText, selectionText = selectionRange.text, untrimmedSelectionText = selectionText, isRangeEndTrimmed = false;!isRangeEndTrimmed;)if(range.compareEndPoints("StartToEnd", range) == 0)isRangeEndTrimmed = true;
  else {
    range.moveEnd("character", -1);
    if(range.text == beforeSelectionText)untrimmedBeforeSelectionText += "\r\n";
    else isRangeEndTrimmed = true
  }if(getOnlyStart)return[untrimmedBeforeSelectionText.length, -1];
  for(var isSelectionRangeEndTrimmed = false;!isSelectionRangeEndTrimmed;)if(selectionRange.compareEndPoints("StartToEnd", selectionRange) == 0)isSelectionRangeEndTrimmed = true;
  else {
    selectionRange.moveEnd("character", -1);
    if(selectionRange.text == selectionText)untrimmedSelectionText += "\r\n";
    else isSelectionRangeEndTrimmed = true
  }return[untrimmedBeforeSelectionText.length, untrimmedBeforeSelectionText.length + untrimmedSelectionText.length]
};
goog.dom.selection.getEndPoints = function(textfield) {
  return goog.dom.selection.getEndPoints_(textfield, false)
};
goog.dom.selection.getEndPoints_ = function(textfield, getOnlyStart) {
  var startPos = 0, endPos = 0;
  if(goog.dom.selection.useSelectionProperties_(textfield)) {
    startPos = textfield.selectionStart;
    endPos = getOnlyStart ? -1 : textfield.selectionEnd
  }else if(goog.userAgent.IE) {
    var tmp = goog.dom.selection.getRangeIe_(textfield), range = tmp[0], selectionRange = tmp[1];
    if(range.inRange(selectionRange)) {
      range.setEndPoint("EndToStart", selectionRange);
      if(textfield.type == "textarea")return goog.dom.selection.getEndPointsTextareaIe_(range, selectionRange, getOnlyStart);
      startPos = range.text.length;
      endPos = getOnlyStart ? -1 : range.text.length + selectionRange.text.length
    }
  }return[startPos, endPos]
};
goog.dom.selection.setEnd = function(textfield, pos) {
  if(goog.dom.selection.useSelectionProperties_(textfield))textfield.selectionEnd = pos;
  else if(goog.userAgent.IE) {
    var tmp = goog.dom.selection.getRangeIe_(textfield), selectionRange = tmp[1];
    if(tmp[0].inRange(selectionRange)) {
      pos = goog.dom.selection.canonicalizePositionIe_(textfield, pos);
      var startCursorPos = goog.dom.selection.canonicalizePositionIe_(textfield, goog.dom.selection.getStart(textfield));
      selectionRange.collapse(true);
      selectionRange.moveEnd("character", pos - startCursorPos);
      selectionRange.select()
    }
  }
};
goog.dom.selection.getEnd = function(textfield) {
  return goog.dom.selection.getEndPoints_(textfield, false)[1]
};
goog.dom.selection.setCursorPosition = function(textfield, pos) {
  if(goog.dom.selection.useSelectionProperties_(textfield)) {
    textfield.selectionStart = pos;
    textfield.selectionEnd = pos
  }else if(goog.userAgent.IE) {
    pos = goog.dom.selection.canonicalizePositionIe_(textfield, pos);
    var sel = textfield.createTextRange();
    sel.collapse(true);
    sel.move("character", pos);
    sel.select()
  }
};
goog.dom.selection.setText = function(textfield, text) {
  if(goog.dom.selection.useSelectionProperties_(textfield)) {
    var value = textfield.value, oldSelectionStart = textfield.selectionStart;
    textfield.value = value.substr(0, oldSelectionStart) + text + value.substr(textfield.selectionEnd);
    textfield.selectionStart = oldSelectionStart;
    textfield.selectionEnd = oldSelectionStart + text.length
  }else if(goog.userAgent.IE) {
    var tmp = goog.dom.selection.getRangeIe_(textfield), selectionRange = tmp[1];
    if(tmp[0].inRange(selectionRange)) {
      var range2 = selectionRange.duplicate();
      selectionRange.text = text;
      selectionRange.setEndPoint("StartToStart", range2);
      selectionRange.select()
    }
  }else throw Error("Cannot set the selection end");
};
goog.dom.selection.getText = function(textfield) {
  if(goog.dom.selection.useSelectionProperties_(textfield))return textfield.value.substring(textfield.selectionStart, textfield.selectionEnd);
  if(goog.userAgent.IE) {
    var tmp = goog.dom.selection.getRangeIe_(textfield), selectionRange = tmp[1];
    if(tmp[0].inRange(selectionRange)) {
      if(textfield.type == "textarea")return goog.dom.selection.getSelectionRangeText_(selectionRange)
    }else return"";
    return selectionRange.text
  }throw Error("Cannot get the selection text");
};
goog.dom.selection.getSelectionRangeText_ = function(selRange) {
  for(var selectionRange = selRange.duplicate(), selectionText = selectionRange.text, untrimmedSelectionText = selectionText, isSelectionRangeEndTrimmed = false;!isSelectionRangeEndTrimmed;)if(selectionRange.compareEndPoints("StartToEnd", selectionRange) == 0)isSelectionRangeEndTrimmed = true;
  else {
    selectionRange.moveEnd("character", -1);
    if(selectionRange.text == selectionText)untrimmedSelectionText += "\r\n";
    else isSelectionRangeEndTrimmed = true
  }return untrimmedSelectionText
};
goog.dom.selection.getRangeIe_ = function(el) {
  var doc = el.ownerDocument || el.document, selectionRange = doc.selection.createRange(), range;
  if(el.type == "textarea") {
    range = doc.body.createTextRange();
    range.moveToElementText(el)
  }else range = el.createTextRange();
  return[range, selectionRange]
};
goog.dom.selection.canonicalizePositionIe_ = function(textfield, pos) {
  if(textfield.type == "textarea")pos = goog.string.canonicalizeNewlines(textfield.value.substring(0, pos)).length;
  return pos
};
goog.dom.selection.useSelectionProperties_ = function(el) {
  try {
    return typeof el.selectionStart == "number"
  }catch(e) {
    return false
  }
};goog.events.KeyCodes = {MAC_ENTER:3, BACKSPACE:8, TAB:9, NUM_CENTER:12, ENTER:13, SHIFT:16, CTRL:17, ALT:18, PAUSE:19, CAPS_LOCK:20, ESC:27, SPACE:32, PAGE_UP:33, PAGE_DOWN:34, END:35, HOME:36, LEFT:37, UP:38, RIGHT:39, DOWN:40, PRINT_SCREEN:44, INSERT:45, DELETE:46, ZERO:48, ONE:49, TWO:50, THREE:51, FOUR:52, FIVE:53, SIX:54, SEVEN:55, EIGHT:56, NINE:57, QUESTION_MARK:63, A:65, B:66, C:67, D:68, E:69, F:70, G:71, H:72, I:73, J:74, K:75, L:76, M:77, N:78, O:79, P:80, Q:81, R:82, S:83, T:84, U:85, 
V:86, W:87, X:88, Y:89, Z:90, META:91, CONTEXT_MENU:93, NUM_ZERO:96, NUM_ONE:97, NUM_TWO:98, NUM_THREE:99, NUM_FOUR:100, NUM_FIVE:101, NUM_SIX:102, NUM_SEVEN:103, NUM_EIGHT:104, NUM_NINE:105, NUM_MULTIPLY:106, NUM_PLUS:107, NUM_MINUS:109, NUM_PERIOD:110, NUM_DIVISION:111, F1:112, F2:113, F3:114, F4:115, F5:116, F6:117, F7:118, F8:119, F9:120, F10:121, F11:122, F12:123, NUMLOCK:144, SEMICOLON:186, DASH:189, EQUALS:187, COMMA:188, PERIOD:190, SLASH:191, APOSTROPHE:192, SINGLE_QUOTE:222, OPEN_SQUARE_BRACKET:219, 
BACKSLASH:220, CLOSE_SQUARE_BRACKET:221, WIN_KEY:224, MAC_FF_META:224, WIN_IME:229};
goog.events.KeyCodes.isTextModifyingKeyEvent = function(e) {
  if(e.altKey && !e.ctrlKey || e.metaKey || e.keyCode >= goog.events.KeyCodes.F1 && e.keyCode <= goog.events.KeyCodes.F12)return false;
  switch(e.keyCode) {
    case goog.events.KeyCodes.ALT:
    ;
    case goog.events.KeyCodes.SHIFT:
    ;
    case goog.events.KeyCodes.CTRL:
    ;
    case goog.events.KeyCodes.PAUSE:
    ;
    case goog.events.KeyCodes.CAPS_LOCK:
    ;
    case goog.events.KeyCodes.ESC:
    ;
    case goog.events.KeyCodes.PAGE_UP:
    ;
    case goog.events.KeyCodes.PAGE_DOWN:
    ;
    case goog.events.KeyCodes.HOME:
    ;
    case goog.events.KeyCodes.END:
    ;
    case goog.events.KeyCodes.LEFT:
    ;
    case goog.events.KeyCodes.RIGHT:
    ;
    case goog.events.KeyCodes.UP:
    ;
    case goog.events.KeyCodes.DOWN:
    ;
    case goog.events.KeyCodes.INSERT:
    ;
    case goog.events.KeyCodes.NUMLOCK:
    ;
    case goog.events.KeyCodes.CONTEXT_MENU:
    ;
    case goog.events.KeyCodes.PRINT_SCREEN:
      return false;
    default:
      return true
  }
};
goog.events.KeyCodes.firesKeyPressEvent = function(keyCode, opt_heldKeyCode, opt_shiftKey, opt_ctrlKey, opt_altKey) {
  if(!goog.userAgent.IE && !(goog.userAgent.WEBKIT && goog.userAgent.isVersion("525")))return true;
  if(goog.userAgent.MAC && opt_altKey)return goog.events.KeyCodes.isCharacterKey(keyCode);
  if(opt_altKey && !opt_ctrlKey)return false;
  if(goog.userAgent.IE && !opt_shiftKey && (opt_heldKeyCode == goog.events.KeyCodes.CTRL || opt_heldKeyCode == goog.events.KeyCodes.ALT))return false;
  if(goog.userAgent.IE && opt_ctrlKey && opt_heldKeyCode == keyCode)return false;
  switch(keyCode) {
    case goog.events.KeyCodes.ENTER:
      return true;
    case goog.events.KeyCodes.ESC:
      return!goog.userAgent.WEBKIT
  }
  return goog.events.KeyCodes.isCharacterKey(keyCode)
};
goog.events.KeyCodes.isCharacterKey = function(keyCode) {
  if(keyCode >= goog.events.KeyCodes.ZERO && keyCode <= goog.events.KeyCodes.NINE)return true;
  if(keyCode >= goog.events.KeyCodes.NUM_ZERO && keyCode <= goog.events.KeyCodes.NUM_MULTIPLY)return true;
  if(keyCode >= goog.events.KeyCodes.A && keyCode <= goog.events.KeyCodes.Z)return true;
  switch(keyCode) {
    case goog.events.KeyCodes.SPACE:
    ;
    case goog.events.KeyCodes.QUESTION_MARK:
    ;
    case goog.events.KeyCodes.NUM_PLUS:
    ;
    case goog.events.KeyCodes.NUM_MINUS:
    ;
    case goog.events.KeyCodes.NUM_PERIOD:
    ;
    case goog.events.KeyCodes.NUM_DIVISION:
    ;
    case goog.events.KeyCodes.SEMICOLON:
    ;
    case goog.events.KeyCodes.DASH:
    ;
    case goog.events.KeyCodes.EQUALS:
    ;
    case goog.events.KeyCodes.COMMA:
    ;
    case goog.events.KeyCodes.PERIOD:
    ;
    case goog.events.KeyCodes.SLASH:
    ;
    case goog.events.KeyCodes.APOSTROPHE:
    ;
    case goog.events.KeyCodes.SINGLE_QUOTE:
    ;
    case goog.events.KeyCodes.OPEN_SQUARE_BRACKET:
    ;
    case goog.events.KeyCodes.BACKSLASH:
    ;
    case goog.events.KeyCodes.CLOSE_SQUARE_BRACKET:
      return true;
    default:
      return false
  }
};goog.events.KeyHandler = function(opt_element) {
  opt_element && this.attach(opt_element)
};
goog.inherits(goog.events.KeyHandler, goog.events.EventTarget);
a = goog.events.KeyHandler.prototype;
a.element_ = null;
a.keyPressKey_ = null;
a.keyDownKey_ = null;
a.keyUpKey_ = null;
a.lastKey_ = -1;
a.keyCode_ = -1;
goog.events.KeyHandler.EventType = {KEY:"key"};
goog.events.KeyHandler.safariKey_ = {"3":goog.events.KeyCodes.ENTER, "12":goog.events.KeyCodes.NUMLOCK, "63232":goog.events.KeyCodes.UP, "63233":goog.events.KeyCodes.DOWN, "63234":goog.events.KeyCodes.LEFT, "63235":goog.events.KeyCodes.RIGHT, "63236":goog.events.KeyCodes.F1, "63237":goog.events.KeyCodes.F2, "63238":goog.events.KeyCodes.F3, "63239":goog.events.KeyCodes.F4, "63240":goog.events.KeyCodes.F5, "63241":goog.events.KeyCodes.F6, "63242":goog.events.KeyCodes.F7, "63243":goog.events.KeyCodes.F8, 
"63244":goog.events.KeyCodes.F9, "63245":goog.events.KeyCodes.F10, "63246":goog.events.KeyCodes.F11, "63247":goog.events.KeyCodes.F12, "63248":goog.events.KeyCodes.PRINT_SCREEN, "63272":goog.events.KeyCodes.DELETE, "63273":goog.events.KeyCodes.HOME, "63275":goog.events.KeyCodes.END, "63276":goog.events.KeyCodes.PAGE_UP, "63277":goog.events.KeyCodes.PAGE_DOWN, "63289":goog.events.KeyCodes.NUMLOCK, "63302":goog.events.KeyCodes.INSERT};
goog.events.KeyHandler.keyIdentifier_ = {Up:goog.events.KeyCodes.UP, Down:goog.events.KeyCodes.DOWN, Left:goog.events.KeyCodes.LEFT, Right:goog.events.KeyCodes.RIGHT, Enter:goog.events.KeyCodes.ENTER, F1:goog.events.KeyCodes.F1, F2:goog.events.KeyCodes.F2, F3:goog.events.KeyCodes.F3, F4:goog.events.KeyCodes.F4, F5:goog.events.KeyCodes.F5, F6:goog.events.KeyCodes.F6, F7:goog.events.KeyCodes.F7, F8:goog.events.KeyCodes.F8, F9:goog.events.KeyCodes.F9, F10:goog.events.KeyCodes.F10, F11:goog.events.KeyCodes.F11, 
F12:goog.events.KeyCodes.F12, "U+007F":goog.events.KeyCodes.DELETE, Home:goog.events.KeyCodes.HOME, End:goog.events.KeyCodes.END, PageUp:goog.events.KeyCodes.PAGE_UP, PageDown:goog.events.KeyCodes.PAGE_DOWN, Insert:goog.events.KeyCodes.INSERT};
goog.events.KeyHandler.mozKeyCodeToKeyCodeMap_ = {61:187, 59:186};
goog.events.KeyHandler.USES_KEYDOWN_ = goog.userAgent.IE || goog.userAgent.WEBKIT && goog.userAgent.isVersion("525");
a = goog.events.KeyHandler.prototype;
a.handleKeyDown_ = function(e) {
  if(goog.events.KeyHandler.USES_KEYDOWN_ && !goog.events.KeyCodes.firesKeyPressEvent(e.keyCode, this.lastKey_, e.shiftKey, e.ctrlKey, e.altKey))this.handleEvent(e);
  else this.keyCode_ = goog.userAgent.GECKO && e.keyCode in goog.events.KeyHandler.mozKeyCodeToKeyCodeMap_ ? goog.events.KeyHandler.mozKeyCodeToKeyCodeMap_[e.keyCode] : e.keyCode
};
a.handleKeyup_ = function() {
  this.keyCode_ = this.lastKey_ = -1
};
a.handleEvent = function(e) {
  var be = e.getBrowserEvent(), keyCode, charCode;
  if(goog.userAgent.IE && e.type == goog.events.EventType.KEYPRESS) {
    keyCode = this.keyCode_;
    charCode = keyCode != goog.events.KeyCodes.ENTER && keyCode != goog.events.KeyCodes.ESC ? be.keyCode : 0
  }else if(goog.userAgent.WEBKIT && e.type == goog.events.EventType.KEYPRESS) {
    keyCode = this.keyCode_;
    charCode = be.charCode >= 0 && be.charCode < 63232 && goog.events.KeyCodes.isCharacterKey(keyCode) ? be.charCode : 0
  }else if(goog.userAgent.OPERA) {
    keyCode = this.keyCode_;
    charCode = goog.events.KeyCodes.isCharacterKey(keyCode) ? be.keyCode : 0
  }else {
    keyCode = be.keyCode || this.keyCode_;
    charCode = be.charCode || 0;
    if(goog.userAgent.MAC && charCode == goog.events.KeyCodes.QUESTION_MARK && !keyCode)keyCode = goog.events.KeyCodes.SLASH
  }var key = keyCode, keyIdentifier = be.keyIdentifier;
  if(keyCode)if(keyCode >= 63232 && keyCode in goog.events.KeyHandler.safariKey_)key = goog.events.KeyHandler.safariKey_[keyCode];
  else {
    if(keyCode == 25 && e.shiftKey)key = 9
  }else if(keyIdentifier && keyIdentifier in goog.events.KeyHandler.keyIdentifier_)key = goog.events.KeyHandler.keyIdentifier_[keyIdentifier];
  var repeat = key == this.lastKey_;
  this.lastKey_ = key;
  var event = new goog.events.KeyEvent(key, charCode, repeat, be);
  try {
    this.dispatchEvent(event)
  }finally {
    event.dispose()
  }
};
a.attach = function(element) {
  this.keyUpKey_ && this.detach();
  this.element_ = element;
  this.keyPressKey_ = goog.events.listen(this.element_, goog.events.EventType.KEYPRESS, this);
  this.keyDownKey_ = goog.events.listen(this.element_, goog.events.EventType.KEYDOWN, this.handleKeyDown_, false, this);
  this.keyUpKey_ = goog.events.listen(this.element_, goog.events.EventType.KEYUP, this.handleKeyup_, false, this)
};
a.detach = function() {
  if(this.keyPressKey_) {
    goog.events.unlistenByKey(this.keyPressKey_);
    goog.events.unlistenByKey(this.keyDownKey_);
    goog.events.unlistenByKey(this.keyUpKey_);
    this.keyUpKey_ = this.keyDownKey_ = this.keyPressKey_ = null
  }this.element_ = null;
  this.lastKey_ = -1
};
a.disposeInternal = function() {
  goog.events.KeyHandler.superClass_.disposeInternal.call(this);
  this.detach()
};
goog.events.KeyEvent = function(keyCode, charCode, repeat, browserEvent) {
  goog.events.BrowserEvent.call(this, browserEvent);
  this.type = goog.events.KeyHandler.EventType.KEY;
  this.keyCode = keyCode;
  this.charCode = charCode;
  this.repeat = repeat
};
goog.inherits(goog.events.KeyEvent, goog.events.BrowserEvent);goog.ui.AutoComplete.InputHandler = function(opt_separators, opt_literals, opt_multi, opt_throttleTime) {
  var throttleTime = opt_throttleTime || 150;
  this.setSeparators(goog.isDefAndNotNull(opt_separators) ? opt_separators : goog.ui.AutoComplete.InputHandler.STANDARD_LIST_SEPARATORS);
  this.literals_ = opt_literals || "";
  this.preventDefaultOnTab_ = this.multi_ = opt_multi != null ? opt_multi : true;
  this.timer_ = throttleTime > 0 ? new goog.Timer(throttleTime) : null;
  this.eh_ = new goog.events.EventHandler(this);
  this.activateHandler_ = new goog.events.EventHandler(this);
  this.keyHandler_ = new goog.events.KeyHandler;
  this.lastKeyCode_ = -1
};
goog.inherits(goog.ui.AutoComplete.InputHandler, goog.Disposable);
goog.ui.AutoComplete.InputHandler.STANDARD_LIST_SEPARATORS = ",;";
goog.ui.AutoComplete.InputHandler.QUOTE_LITERALS = '"';
a = goog.ui.AutoComplete.InputHandler.prototype;
a.whitespaceWrapEntries_ = true;
a.generateNewTokenOnLiteral_ = true;
a.upsideDown_ = false;
a.separatorUpdates_ = true;
a.separatorSelects_ = true;
a.activeElement_ = null;
a.lastValue_ = "";
a.waitingForIme_ = false;
a.rowJustSelected_ = false;
a.updateDuringTyping_ = true;
a.attachAutoComplete = function(ac) {
  this.ac_ = ac
};
a.attachInput = function(el) {
  goog.dom.a11y.setState(el, "haspopup", true);
  this.eh_.listen(el, goog.events.EventType.FOCUS, this.onFocus_);
  this.eh_.listen(el, goog.events.EventType.BLUR, this.onBlur_);
  this.activeElement_ || this.activateHandler_.listen(el, goog.events.EventType.KEYDOWN, this.onKeyDownOnInactiveElement_)
};
a.attachInputs = function() {
  for(var i = 0;i < arguments.length;i++)this.attachInput(arguments[i])
};
a.selectRow = function(row, opt_multi) {
  var target = this.ac_.getTarget();
  if(goog.isDef(opt_multi) ? opt_multi : this.multi_) {
    var caret = goog.dom.selection.getStart(target), index = this.getTokenIndex_(target.value, caret), entries = this.splitInput_(target.value), replaceValue = row.toString();
    this.separatorCheck_.test(replaceValue) || (replaceValue = goog.string.trimRight(replaceValue) + this.defaultSeparator_);
    if(this.whitespaceWrapEntries_) {
      if(index != 0 && !goog.string.isEmpty(entries[index - 1]))replaceValue = " " + replaceValue;
      if(index < entries.length && !goog.string.isEmpty(entries[index + 1]))replaceValue += " "
    }if(replaceValue != entries[index]) {
      entries[index] = replaceValue;
      target.value = entries.join("");
      for(var pos = 0, i = 0;i <= index;i++)pos += entries[i].length;
      target.focus();
      goog.dom.selection.setStart(target, pos);
      goog.dom.selection.setEnd(target, pos)
    }
  }else target.value = row.toString();
  this.rowJustSelected_ = true;
  return false
};
a.disposeInternal = function() {
  goog.ui.AutoComplete.InputHandler.superClass_.disposeInternal.call(this);
  this.eh_.dispose();
  delete this.eh_;
  this.activateHandler_.dispose();
  this.activateHandler_ = null
};
a.setSeparators = function(separators) {
  this.separators_ = separators;
  this.defaultSeparator_ = this.separators_.substring(0, 1);
  var wspaceExp = this.multi_ ? "[\\s" + this.separators_ + "]+" : "[\\s]+";
  this.trimmer_ = new RegExp("^" + wspaceExp + "|" + wspaceExp + "$", "g");
  this.separatorCheck_ = new RegExp("\\s*[" + this.separators_ + "]$")
};
a.handleKeyEvent = function(e) {
  switch(e.keyCode) {
    case goog.events.KeyCodes.DOWN:
      if(this.ac_.isOpen()) {
        this.moveDown_();
        e.preventDefault();
        return true
      }else if(!this.multi_) {
        this.update(true);
        e.preventDefault();
        return true
      }break;
    case goog.events.KeyCodes.UP:
      if(this.ac_.isOpen()) {
        this.moveUp_();
        e.preventDefault();
        return true
      }break;
    case goog.events.KeyCodes.TAB:
      this.update();
      if(this.ac_.selectHilited() && this.preventDefaultOnTab_) {
        e.preventDefault();
        return true
      }break;
    case goog.events.KeyCodes.ENTER:
      this.update();
      if(this.ac_.selectHilited()) {
        e.preventDefault();
        return true
      }break;
    case goog.events.KeyCodes.ESC:
      if(this.ac_.isOpen()) {
        this.ac_.dismiss();
        return true
      }break;
    case goog.events.KeyCodes.WIN_IME:
      if(!this.waitingForIme_) {
        this.startWaitingForIme_();
        return true
      }break;
    default:
      if(this.timer_ && !this.updateDuringTyping_) {
        this.timer_.stop();
        this.timer_.start()
      }
  }
  return this.handleSeparator_(e)
};
a.handleSeparator_ = function(e) {
  var isSeparatorKey = this.multi_ && e.charCode && this.separators_.indexOf(String.fromCharCode(e.charCode)) != -1;
  this.separatorUpdates_ && isSeparatorKey && this.update();
  if(this.separatorSelects_ && isSeparatorKey)if(this.ac_.selectHilited()) {
    e.preventDefault();
    return true
  }return false
};
a.needKeyUpListener = function() {
  return false
};
a.handleKeyUp = function() {
  return false
};
a.addKeyEvents_ = function() {
  this.keyHandler_.attach(this.activeElement_);
  this.eh_.listen(this.keyHandler_, goog.events.KeyHandler.EventType.KEY, this.onKey_);
  this.needKeyUpListener() && this.eh_.listen(this.activeElement_, goog.events.EventType.KEYUP, this.handleKeyUp);
  goog.userAgent.IE && this.eh_.listen(this.activeElement_, goog.events.EventType.KEYPRESS, this.onIeKeyPress_)
};
a.removeKeyEvents_ = function() {
  this.eh_.unlisten(this.keyHandler_, goog.events.KeyHandler.EventType.KEY, this.onKey_);
  this.keyHandler_.detach();
  this.eh_.unlisten(this.activeElement_, goog.events.EventType.KEYUP, this.handleKeyUp);
  goog.userAgent.IE && this.eh_.unlisten(this.activeElement_, goog.events.EventType.KEYPRESS, this.onIeKeyPress_);
  this.waitingForIme_ && this.stopWaitingForIme_()
};
a.onFocus_ = function(e) {
  this.activateHandler_.removeAll();
  this.ac_ && this.ac_.cancelDelayedDismiss();
  if(e.target != this.activeElement_) {
    this.activeElement_ = e.target || null;
    if(this.timer_) {
      this.timer_.start();
      this.eh_.listen(this.timer_, goog.Timer.TICK, this.onTick_)
    }this.lastValue_ = this.activeElement_.value;
    this.addKeyEvents_()
  }
};
a.onBlur_ = function() {
  if(this.activeElement_) {
    this.removeKeyEvents_();
    this.activeElement_ = null;
    if(this.timer_) {
      this.timer_.stop();
      this.eh_.unlisten(this.timer_, goog.Timer.TICK, this.onTick_)
    }this.ac_ && this.ac_.dismissOnDelay()
  }
};
a.onTick_ = function() {
  this.update()
};
a.onKeyDownOnInactiveElement_ = function(e) {
  this.onFocus_(e)
};
a.onKey_ = function(e) {
  this.lastKeyCode_ = e.keyCode;
  this.ac_ && this.handleKeyEvent(e)
};
a.onKeyPress_ = function() {
  this.waitingForIme_ && this.lastKeyCode_ != goog.events.KeyCodes.WIN_IME && this.stopWaitingForIme_()
};
a.onKeyUp_ = function(e) {
  if(this.waitingForIme_ && (e.keyCode == goog.events.KeyCodes.ENTER || e.keyCode == goog.events.KeyCodes.M && e.ctrlKey))this.stopWaitingForIme_()
};
a.startWaitingForIme_ = function() {
  if(!this.waitingForIme_) {
    this.eh_.listen(this.activeElement_, goog.events.EventType.KEYUP, this.onKeyUp_);
    this.eh_.listen(this.activeElement_, goog.events.EventType.KEYPRESS, this.onKeyPress_);
    this.waitingForIme_ = true
  }
};
a.stopWaitingForIme_ = function() {
  if(this.waitingForIme_) {
    this.waitingForIme_ = false;
    this.eh_.unlisten(this.activeElement_, goog.events.EventType.KEYPRESS, this.onKeyPress_);
    this.eh_.unlisten(this.activeElement_, goog.events.EventType.KEYUP, this.onKeyUp_)
  }
};
a.onIeKeyPress_ = function(e) {
  this.handleSeparator_(e)
};
a.update = function(opt_force) {
  if(opt_force || this.activeElement_ && this.activeElement_.value != this.lastValue_) {
    if(opt_force || !this.rowJustSelected_) {
      var token = this.parseToken_();
      if(this.ac_) {
        this.ac_.setTarget(this.activeElement_);
        this.ac_.setToken(token, this.activeElement_.value)
      }
    }this.lastValue_ = this.activeElement_.value
  }this.rowJustSelected_ = false
};
a.moveUp_ = function() {
  return this.upsideDown_ ? this.ac_.hiliteNext() : this.ac_.hilitePrev()
};
a.moveDown_ = function() {
  return this.upsideDown_ ? this.ac_.hilitePrev() : this.ac_.hiliteNext()
};
a.parseToken_ = function() {
  var caret = goog.dom.selection.getStart(this.activeElement_), text = this.activeElement_.value;
  return this.trim_(this.splitInput_(text)[this.getTokenIndex_(text, caret)])
};
a.trim_ = function(text) {
  return this.trimmer_ ? String(text).replace(this.trimmer_, "") : text
};
a.getTokenIndex_ = function(text, caret) {
  var entries = this.splitInput_(text);
  if(caret == text.length)return entries.length - 1;
  for(var current = 0, i = 0, pos = 0;i < entries.length && pos < caret;i++) {
    pos += entries[i].length;
    current = i
  }return current
};
a.splitInput_ = function(text) {
  if(!this.multi_)return[text];
  for(var arr = String(text).split(""), parts = [], cache = [], i = 0, inLiteral = false;i < arr.length;i++)if(this.literals_ && this.literals_.indexOf(arr[i]) != -1) {
    if(this.generateNewTokenOnLiteral_ && !inLiteral) {
      parts.push(cache.join(""));
      cache.length = 0
    }cache.push(arr[i]);
    inLiteral = !inLiteral
  }else if(!inLiteral && this.separators_.indexOf(arr[i]) != -1) {
    cache.push(arr[i]);
    parts.push(cache.join(""));
    cache.length = 0
  }else cache.push(arr[i]);
  parts.push(cache.join(""));
  return parts
};goog.math.Box = function(top, right, bottom, left) {
  this.top = top;
  this.right = right;
  this.bottom = bottom;
  this.left = left
};
goog.math.Box.boundingBox = function() {
  for(var box = new goog.math.Box(arguments[0].y, arguments[0].x, arguments[0].y, arguments[0].x), i = 1;i < arguments.length;i++) {
    var coord = arguments[i];
    box.top = Math.min(box.top, coord.y);
    box.right = Math.max(box.right, coord.x);
    box.bottom = Math.max(box.bottom, coord.y);
    box.left = Math.min(box.left, coord.x)
  }return box
};
goog.math.Box.prototype.clone = function() {
  return new goog.math.Box(this.top, this.right, this.bottom, this.left)
};
if(goog.DEBUG)goog.math.Box.prototype.toString = function() {
  return"(" + this.top + "t, " + this.right + "r, " + this.bottom + "b, " + this.left + "l)"
};
goog.math.Box.prototype.contains = function(other) {
  return goog.math.Box.contains(this, other)
};
goog.math.Box.equals = function(a, b) {
  if(a == b)return true;
  if(!a || !b)return false;
  return a.top == b.top && a.right == b.right && a.bottom == b.bottom && a.left == b.left
};
goog.math.Box.contains = function(box, other) {
  if(!box || !other)return false;
  if(other instanceof goog.math.Box)return other.left >= box.left && other.right <= box.right && other.top >= box.top && other.bottom <= box.bottom;
  return other.x >= box.left && other.x <= box.right && other.y >= box.top && other.y <= box.bottom
};
goog.math.Box.distance = function(box, coord) {
  if(coord.x >= box.left && coord.x <= box.right) {
    if(coord.y >= box.top && coord.y <= box.bottom)return 0;
    return coord.y < box.top ? box.top - coord.y : coord.y - box.bottom
  }if(coord.y >= box.top && coord.y <= box.bottom)return coord.x < box.left ? box.left - coord.x : coord.x - box.right;
  return goog.math.Coordinate.distance(coord, new goog.math.Coordinate(coord.x < box.left ? box.left : box.right, coord.y < box.top ? box.top : box.bottom))
};goog.math.Rect = function(x, y, w, h) {
  this.left = x;
  this.top = y;
  this.width = w;
  this.height = h
};
goog.math.Rect.prototype.clone = function() {
  return new goog.math.Rect(this.left, this.top, this.width, this.height)
};
goog.math.Rect.createFromBox = function(box) {
  return new goog.math.Rect(box.left, box.top, box.right - box.left, box.bottom - box.top)
};
if(goog.DEBUG)goog.math.Rect.prototype.toString = function() {
  return"(" + this.left + ", " + this.top + " - " + this.width + "w x " + this.height + "h)"
};
goog.math.Rect.equals = function(a, b) {
  if(a == b)return true;
  if(!a || !b)return false;
  return a.left == b.left && a.width == b.width && a.top == b.top && a.height == b.height
};
goog.math.Rect.prototype.intersection = function(rect) {
  var x0 = Math.max(this.left, rect.left), x1 = Math.min(this.left + this.width, rect.left + rect.width);
  if(x0 <= x1) {
    var y0 = Math.max(this.top, rect.top), y1 = Math.min(this.top + this.height, rect.top + rect.height);
    if(y0 <= y1) {
      this.left = x0;
      this.top = y0;
      this.width = x1 - x0;
      this.height = y1 - y0;
      return true
    }
  }return false
};
goog.math.Rect.intersection = function(a, b) {
  var x0 = Math.max(a.left, b.left), x1 = Math.min(a.left + a.width, b.left + b.width);
  if(x0 <= x1) {
    var y0 = Math.max(a.top, b.top), y1 = Math.min(a.top + a.height, b.top + b.height);
    if(y0 <= y1)return new goog.math.Rect(x0, y0, x1 - x0, y1 - y0)
  }return null
};
goog.math.Rect.intersects = function(a, b) {
  if(Math.max(a.left, b.left) <= Math.min(a.left + a.width, b.left + b.width))if(Math.max(a.top, b.top) <= Math.min(a.top + a.height, b.top + b.height))return true;
  return false
};
goog.math.Rect.prototype.intersects = function(rect) {
  return goog.math.Rect.intersects(this, rect)
};
goog.math.Rect.difference = function(a, b) {
  var intersection = goog.math.Rect.intersection(a, b);
  if(!intersection || !intersection.height || !intersection.width)return[a.clone()];
  var result = [], top = a.top, height = a.height, ar = a.left + a.width, ab = a.top + a.height, br = b.left + b.width, bb = b.top + b.height;
  if(b.top > a.top) {
    result.push(new goog.math.Rect(a.left, a.top, a.width, b.top - a.top));
    top = b.top;
    height -= b.top - a.top
  }if(bb < ab) {
    result.push(new goog.math.Rect(a.left, bb, a.width, ab - bb));
    height = bb - top
  }b.left > a.left && result.push(new goog.math.Rect(a.left, top, b.left - a.left, height));
  br < ar && result.push(new goog.math.Rect(br, top, ar - br, height));
  return result
};
goog.math.Rect.prototype.difference = function(rect) {
  return goog.math.Rect.difference(this, rect)
};
goog.math.Rect.prototype.boundingRect = function(rect) {
  var right = Math.max(this.left + this.width, rect.left + rect.width), bottom = Math.max(this.top + this.height, rect.top + rect.height);
  this.left = Math.min(this.left, rect.left);
  this.top = Math.min(this.top, rect.top);
  this.width = right - this.left;
  this.height = bottom - this.top
};
goog.math.Rect.boundingRect = function(a, b) {
  if(!a || !b)return null;
  var clone = a.clone();
  clone.boundingRect(b);
  return clone
};
goog.math.Rect.prototype.contains = function(another) {
  return another instanceof goog.math.Rect ? this.left <= another.left && this.left + this.width >= another.left + another.width && this.top <= another.top && this.top + this.height >= another.top + another.height : another.x >= this.left && another.x <= this.left + this.width && another.y >= this.top && another.y <= this.top + this.height
};
goog.math.Rect.prototype.getSize = function() {
  return new goog.math.Size(this.width, this.height)
};goog.userAgent.product = {};
goog.userAgent.product.ASSUME_FIREFOX = false;
goog.userAgent.product.ASSUME_CAMINO = false;
goog.userAgent.product.ASSUME_IPHONE = false;
goog.userAgent.product.ASSUME_ANDROID = false;
goog.userAgent.product.ASSUME_CHROME = false;
goog.userAgent.product.ASSUME_SAFARI = false;
goog.userAgent.product.PRODUCT_KNOWN_ = goog.userAgent.ASSUME_IE || goog.userAgent.ASSUME_OPERA || goog.userAgent.product.ASSUME_FIREFOX || goog.userAgent.product.ASSUME_CAMINO || goog.userAgent.product.ASSUME_IPHONE || goog.userAgent.product.ASSUME_ANDROID || goog.userAgent.product.ASSUME_CHROME || goog.userAgent.product.ASSUME_SAFARI;
goog.userAgent.product.init_ = function() {
  goog.userAgent.product.detectedFirefox_ = false;
  goog.userAgent.product.detectedCamino_ = false;
  goog.userAgent.product.detectedIphone_ = false;
  goog.userAgent.product.detectedAndroid_ = false;
  goog.userAgent.product.detectedChrome_ = false;
  goog.userAgent.product.detectedSafari_ = false;
  var ua = goog.userAgent.getUserAgentString();
  if(ua)if(ua.indexOf("Firefox") != -1)goog.userAgent.product.detectedFirefox_ = true;
  else if(ua.indexOf("Camino") != -1)goog.userAgent.product.detectedCamino_ = true;
  else if(ua.indexOf("iPhone") != -1 || ua.indexOf("iPod") != -1)goog.userAgent.product.detectedIphone_ = true;
  else if(ua.indexOf("Android") != -1)goog.userAgent.product.detectedAndroid_ = true;
  else if(ua.indexOf("Chrome") != -1)goog.userAgent.product.detectedChrome_ = true;
  else if(ua.indexOf("Safari") != -1)goog.userAgent.product.detectedSafari_ = true
};
goog.userAgent.product.PRODUCT_KNOWN_ || goog.userAgent.product.init_();
goog.userAgent.product.OPERA = goog.userAgent.OPERA;
goog.userAgent.product.IE = goog.userAgent.IE;
goog.userAgent.product.FIREFOX = goog.userAgent.product.PRODUCT_KNOWN_ ? goog.userAgent.product.ASSUME_FIREFOX : goog.userAgent.product.detectedFirefox_;
goog.userAgent.product.CAMINO = goog.userAgent.product.PRODUCT_KNOWN_ ? goog.userAgent.product.ASSUME_CAMINO : goog.userAgent.product.detectedCamino_;
goog.userAgent.product.IPHONE = goog.userAgent.product.PRODUCT_KNOWN_ ? goog.userAgent.product.ASSUME_IPHONE : goog.userAgent.product.detectedIphone_;
goog.userAgent.product.ANDROID = goog.userAgent.product.PRODUCT_KNOWN_ ? goog.userAgent.product.ASSUME_ANDROID : goog.userAgent.product.detectedAndroid_;
goog.userAgent.product.CHROME = goog.userAgent.product.PRODUCT_KNOWN_ ? goog.userAgent.product.ASSUME_CHROME : goog.userAgent.product.detectedChrome_;
goog.userAgent.product.SAFARI = goog.userAgent.product.PRODUCT_KNOWN_ ? goog.userAgent.product.ASSUME_SAFARI : goog.userAgent.product.detectedSafari_;goog.style = {};
goog.style.setStyle = function(element, style, opt_value) {
  goog.isString(style) ? goog.style.setStyle_(element, opt_value, style) : goog.object.forEach(style, goog.partial(goog.style.setStyle_, element))
};
goog.style.setStyle_ = function(element, value, style) {
  element.style[goog.style.toCamelCase(style)] = value
};
goog.style.getStyle = function(element, style) {
  return element.style[goog.style.toCamelCase(style)]
};
goog.style.getComputedStyle = function(element, style) {
  var doc = goog.dom.getOwnerDocument(element);
  if(doc.defaultView && doc.defaultView.getComputedStyle) {
    var styles = doc.defaultView.getComputedStyle(element, "");
    if(styles)return styles[style]
  }return null
};
goog.style.getCascadedStyle = function(element, style) {
  return element.currentStyle ? element.currentStyle[style] : null
};
goog.style.getStyle_ = function(element, style) {
  return goog.style.getComputedStyle(element, style) || goog.style.getCascadedStyle(element, style) || element.style[style]
};
goog.style.getComputedPosition = function(element) {
  return goog.style.getStyle_(element, "position")
};
goog.style.getBackgroundColor = function(element) {
  return goog.style.getStyle_(element, "backgroundColor")
};
goog.style.getComputedOverflowX = function(element) {
  return goog.style.getStyle_(element, "overflowX")
};
goog.style.getComputedOverflowY = function(element) {
  return goog.style.getStyle_(element, "overflowY")
};
goog.style.getComputedZIndex = function(element) {
  return goog.style.getStyle_(element, "zIndex")
};
goog.style.getComputedTextAlign = function(element) {
  return goog.style.getStyle_(element, "textAlign")
};
goog.style.getComputedCursor = function(element) {
  return goog.style.getStyle_(element, "cursor")
};
goog.style.setPosition = function(el, arg1, opt_arg2) {
  var x, y, buggyGeckoSubPixelPos = goog.userAgent.GECKO && (goog.userAgent.MAC || goog.userAgent.X11) && goog.userAgent.isVersion("1.9");
  if(arg1 instanceof goog.math.Coordinate) {
    x = arg1.x;
    y = arg1.y
  }else {
    x = arg1;
    y = opt_arg2
  }el.style.left = typeof x == "number" ? (buggyGeckoSubPixelPos ? Math.round(x) : x) + "px" : x;
  el.style.top = typeof y == "number" ? (buggyGeckoSubPixelPos ? Math.round(y) : y) + "px" : y
};
goog.style.getPosition = function(element) {
  return new goog.math.Coordinate(element.offsetLeft, element.offsetTop)
};
goog.style.getClientViewportElement = function(opt_node) {
  var doc;
  doc = opt_node ? opt_node.nodeType == goog.dom.NodeType.DOCUMENT ? opt_node : goog.dom.getOwnerDocument(opt_node) : goog.dom.getDocument();
  if(goog.userAgent.IE && !goog.dom.getDomHelper(doc).isCss1CompatMode())return doc.body;
  return doc.documentElement
};
goog.style.getBoundingClientRect_ = function(el) {
  var rect = el.getBoundingClientRect();
  if(goog.userAgent.IE) {
    var doc = el.ownerDocument;
    rect.left -= doc.documentElement.clientLeft + doc.body.clientLeft;
    rect.top -= doc.documentElement.clientTop + doc.body.clientTop
  }return rect
};
goog.style.getOffsetParent = function(element) {
  if(goog.userAgent.IE)return element.offsetParent;
  for(var doc = goog.dom.getOwnerDocument(element), positionStyle = goog.style.getStyle_(element, "position"), skipStatic = positionStyle == "fixed" || positionStyle == "absolute", parent = element.parentNode;parent && parent != doc;parent = parent.parentNode) {
    positionStyle = goog.style.getStyle_(parent, "position");
    skipStatic = skipStatic && positionStyle == "static" && parent != doc.documentElement && parent != doc.body;
    if(!skipStatic && (parent.scrollWidth > parent.clientWidth || parent.scrollHeight > parent.clientHeight || positionStyle == "fixed" || positionStyle == "absolute"))return parent
  }return null
};
goog.style.getVisibleRectForElement = function(element) {
  for(var visibleRect = new goog.math.Box(0, Infinity, Infinity, 0), dom = goog.dom.getDomHelper(element), scrollEl = dom.getDocumentScrollElement(), inContainer, el = element;el = goog.style.getOffsetParent(el);)if((!goog.userAgent.IE || el.clientWidth != 0) && (el.scrollWidth != el.clientWidth || el.scrollHeight != el.clientHeight) && goog.style.getStyle_(el, "overflow") != "visible") {
    var pos = goog.style.getPageOffset(el), client = goog.style.getClientLeftTop(el);
    pos.x += client.x;
    pos.y += client.y;
    visibleRect.top = Math.max(visibleRect.top, pos.y);
    visibleRect.right = Math.min(visibleRect.right, pos.x + el.clientWidth);
    visibleRect.bottom = Math.min(visibleRect.bottom, pos.y + el.clientHeight);
    visibleRect.left = Math.max(visibleRect.left, pos.x);
    inContainer = inContainer || el != scrollEl
  }var scrollX = scrollEl.scrollLeft, scrollY = scrollEl.scrollTop;
  if(goog.userAgent.WEBKIT) {
    visibleRect.left += scrollX;
    visibleRect.top += scrollY
  }else {
    visibleRect.left = Math.max(visibleRect.left, scrollX);
    visibleRect.top = Math.max(visibleRect.top, scrollY)
  }if(!inContainer || goog.userAgent.WEBKIT) {
    visibleRect.right += scrollX;
    visibleRect.bottom += scrollY
  }var winSize = dom.getViewportSize();
  visibleRect.right = Math.min(visibleRect.right, scrollX + winSize.width);
  visibleRect.bottom = Math.min(visibleRect.bottom, scrollY + winSize.height);
  return visibleRect.top >= 0 && visibleRect.left >= 0 && visibleRect.bottom > visibleRect.top && visibleRect.right > visibleRect.left ? visibleRect : null
};
goog.style.scrollIntoContainerView = function(element, container, opt_center) {
  var elementPos = goog.style.getPageOffset(element), containerPos = goog.style.getPageOffset(container), containerBorder = goog.style.getBorderBox(container), relX = elementPos.x - containerPos.x - containerBorder.left, relY = elementPos.y - containerPos.y - containerBorder.top, spaceX = container.clientWidth - element.offsetWidth, spaceY = container.clientHeight - element.offsetHeight;
  if(opt_center) {
    container.scrollLeft += relX - spaceX / 2;
    container.scrollTop += relY - spaceY / 2
  }else {
    container.scrollLeft += Math.min(relX, Math.max(relX - spaceX, 0));
    container.scrollTop += Math.min(relY, Math.max(relY - spaceY, 0))
  }
};
goog.style.getClientLeftTop = function(el) {
  if(goog.userAgent.GECKO && !goog.userAgent.isVersion("1.9")) {
    var left = parseFloat(goog.style.getComputedStyle(el, "borderLeftWidth"));
    if(goog.style.isRightToLeft(el)) {
      var scrollbarWidth = el.offsetWidth - el.clientWidth - left - parseFloat(goog.style.getComputedStyle(el, "borderRightWidth"));
      left += scrollbarWidth
    }return new goog.math.Coordinate(left, parseFloat(goog.style.getComputedStyle(el, "borderTopWidth")))
  }return new goog.math.Coordinate(el.clientLeft, el.clientTop)
};
goog.style.getPageOffset = function(el) {
  var box, doc = goog.dom.getOwnerDocument(el), positionStyle = goog.style.getStyle_(el, "position"), BUGGY_GECKO_BOX_OBJECT = goog.userAgent.GECKO && doc.getBoxObjectFor && !el.getBoundingClientRect && positionStyle == "absolute" && (box = doc.getBoxObjectFor(el)) && (box.screenX < 0 || box.screenY < 0), pos = new goog.math.Coordinate(0, 0), viewportElement = goog.style.getClientViewportElement(doc);
  if(el == viewportElement)return pos;
  if(el.getBoundingClientRect) {
    box = goog.style.getBoundingClientRect_(el);
    var scrollCoord = goog.dom.getDomHelper(doc).getDocumentScroll();
    pos.x = box.left + scrollCoord.x;
    pos.y = box.top + scrollCoord.y
  }else if(doc.getBoxObjectFor && !BUGGY_GECKO_BOX_OBJECT) {
    box = doc.getBoxObjectFor(el);
    var vpBox = doc.getBoxObjectFor(viewportElement);
    pos.x = box.screenX - vpBox.screenX;
    pos.y = box.screenY - vpBox.screenY
  }else {
    var parent = el;
    do {
      pos.x += parent.offsetLeft;
      pos.y += parent.offsetTop;
      if(parent != el) {
        pos.x += parent.clientLeft || 0;
        pos.y += parent.clientTop || 0
      }if(goog.userAgent.WEBKIT && goog.style.getComputedPosition(parent) == "fixed") {
        pos.x += doc.body.scrollLeft;
        pos.y += doc.body.scrollTop;
        break
      }parent = parent.offsetParent
    }while(parent && parent != el);
    if(goog.userAgent.OPERA || goog.userAgent.WEBKIT && positionStyle == "absolute")pos.y -= doc.body.offsetTop;
    for(parent = el;(parent = goog.style.getOffsetParent(parent)) && parent != doc.body && parent != viewportElement;) {
      pos.x -= parent.scrollLeft;
      if(!goog.userAgent.OPERA || parent.tagName != "TR")pos.y -= parent.scrollTop
    }
  }return pos
};
goog.style.getPageOffsetLeft = function(el) {
  return goog.style.getPageOffset(el).x
};
goog.style.getPageOffsetTop = function(el) {
  return goog.style.getPageOffset(el).y
};
goog.style.getFramedPageOffset = function(el, relativeWin) {
  var position = new goog.math.Coordinate(0, 0), currentWin = goog.dom.getWindow(goog.dom.getOwnerDocument(el)), currentEl = el;
  do {
    var offset = currentWin == relativeWin ? goog.style.getPageOffset(currentEl) : goog.style.getClientPosition(currentEl);
    position.x += offset.x;
    position.y += offset.y
  }while(currentWin && currentWin != relativeWin && (currentEl = currentWin.frameElement) && (currentWin = currentWin.parent));
  return position
};
goog.style.translateRectForAnotherFrame = function(rect, origBase, newBase) {
  if(origBase.getDocument() != newBase.getDocument()) {
    var body = origBase.getDocument().body, pos = goog.style.getFramedPageOffset(body, newBase.getWindow());
    pos = goog.math.Coordinate.difference(pos, goog.style.getPageOffset(body));
    if(goog.userAgent.IE && !origBase.isCss1CompatMode())pos = goog.math.Coordinate.difference(pos, origBase.getDocumentScroll());
    rect.left += pos.x;
    rect.top += pos.y
  }
};
goog.style.getRelativePosition = function(a, b) {
  var ap = goog.style.getClientPosition(a), bp = goog.style.getClientPosition(b);
  return new goog.math.Coordinate(ap.x - bp.x, ap.y - bp.y)
};
goog.style.getClientPosition = function(el) {
  var pos = new goog.math.Coordinate;
  if(el.nodeType == goog.dom.NodeType.ELEMENT)if(el.getBoundingClientRect) {
    var box = goog.style.getBoundingClientRect_(el);
    pos.x = box.left;
    pos.y = box.top
  }else {
    var scrollCoord = goog.dom.getDomHelper(el).getDocumentScroll(), pageCoord = goog.style.getPageOffset(el);
    pos.x = pageCoord.x - scrollCoord.x;
    pos.y = pageCoord.y - scrollCoord.y
  }else {
    pos.x = el.clientX;
    pos.y = el.clientY
  }return pos
};
goog.style.setPageOffset = function(el, x, opt_y) {
  var cur = goog.style.getPageOffset(el);
  if(x instanceof goog.math.Coordinate) {
    opt_y = x.y;
    x = x.x
  }goog.style.setPosition(el, el.offsetLeft + (x - cur.x), el.offsetTop + (opt_y - cur.y))
};
goog.style.setSize = function(element, w, opt_h) {
  var h;
  if(w instanceof goog.math.Size) {
    h = w.height;
    w = w.width
  }else {
    if(opt_h == undefined)throw Error("missing height argument");h = opt_h
  }element.style.width = typeof w == "number" ? Math.round(w) + "px" : w;
  element.style.height = typeof h == "number" ? Math.round(h) + "px" : h
};
goog.style.getSize = function(element) {
  var hasOperaBug = goog.userAgent.OPERA && !goog.userAgent.isVersion("10");
  if(goog.style.getStyle_(element, "display") != "none")return hasOperaBug ? new goog.math.Size(element.offsetWidth || element.clientWidth, element.offsetHeight || element.clientHeight) : new goog.math.Size(element.offsetWidth, element.offsetHeight);
  var style = element.style, originalDisplay = style.display, originalVisibility = style.visibility, originalPosition = style.position;
  style.visibility = "hidden";
  style.position = "absolute";
  style.display = "inline";
  var originalWidth, originalHeight;
  if(hasOperaBug) {
    originalWidth = element.offsetWidth || element.clientWidth;
    originalHeight = element.offsetHeight || element.clientHeight
  }else {
    originalWidth = element.offsetWidth;
    originalHeight = element.offsetHeight
  }style.display = originalDisplay;
  style.position = originalPosition;
  style.visibility = originalVisibility;
  return new goog.math.Size(originalWidth, originalHeight)
};
goog.style.getBounds = function(element) {
  var o = goog.style.getPageOffset(element), s = goog.style.getSize(element);
  return new goog.math.Rect(o.x, o.y, s.width, s.height)
};
goog.style.toCamelCaseCache_ = {};
goog.style.toCamelCase = function(selector) {
  return goog.style.toCamelCaseCache_[selector] || (goog.style.toCamelCaseCache_[selector] = String(selector).replace(/\-([a-z])/g, function(all, match) {
    return match.toUpperCase()
  }))
};
goog.style.toSelectorCase = function(selector) {
  return selector.replace(/([A-Z])/g, "-$1").toLowerCase()
};
goog.style.getOpacity = function(el) {
  var style = el.style, result = "";
  if("opacity" in style)result = style.opacity;
  else if("MozOpacity" in style)result = style.MozOpacity;
  else if("filter" in style) {
    var match = style.filter.match(/alpha\(opacity=([\d.]+)\)/);
    if(match)result = String(match[1] / 100)
  }return result == "" ? result : Number(result)
};
goog.style.setOpacity = function(el, alpha) {
  var style = el.style;
  if("opacity" in style)style.opacity = alpha;
  else if("MozOpacity" in style)style.MozOpacity = alpha;
  else if("filter" in style)style.filter = alpha === "" ? "" : "alpha(opacity=" + alpha * 100 + ")"
};
goog.style.setTransparentBackgroundImage = function(el, src) {
  var style = el.style;
  if(goog.userAgent.IE && !goog.userAgent.isVersion("8"))style.filter = 'progid:DXImageTransform.Microsoft.AlphaImageLoader(src="' + src + '", sizingMethod="crop")';
  else {
    style.backgroundImage = "url(" + src + ")";
    style.backgroundPosition = "top left";
    style.backgroundRepeat = "no-repeat"
  }
};
goog.style.clearTransparentBackgroundImage = function(el) {
  var style = el.style;
  if("filter" in style)style.filter = "";
  else style.backgroundImage = "none"
};
goog.style.showElement = function(el, display) {
  el.style.display = display ? "" : "none"
};
goog.style.isElementShown = function(el) {
  return el.style.display != "none"
};
goog.style.installStyles = function(stylesString, opt_node) {
  var dh = goog.dom.getDomHelper(opt_node), styleSheet = null;
  if(goog.userAgent.IE) {
    styleSheet = dh.getDocument().createStyleSheet();
    goog.style.setStyles(styleSheet, stylesString)
  }else {
    var head = dh.getElementsByTagNameAndClass("head")[0];
    if(!head) {
      var body = dh.getElementsByTagNameAndClass("body")[0];
      head = dh.createDom("head");
      body.parentNode.insertBefore(head, body)
    }styleSheet = dh.createDom("style");
    goog.style.setStyles(styleSheet, stylesString);
    dh.appendChild(head, styleSheet)
  }return styleSheet
};
goog.style.uninstallStyles = function(styleSheet) {
  goog.dom.removeNode(styleSheet.ownerNode || styleSheet.owningElement || styleSheet)
};
goog.style.setStyles = function(element, stylesString) {
  if(goog.userAgent.IE)element.cssText = stylesString;
  else element[goog.userAgent.WEBKIT ? "innerText" : "innerHTML"] = stylesString
};
goog.style.setPreWrap = function(el) {
  var style = el.style;
  if(goog.userAgent.IE && !goog.userAgent.isVersion("8")) {
    style.whiteSpace = "pre";
    style.wordWrap = "break-word"
  }else style.whiteSpace = goog.userAgent.GECKO ? "-moz-pre-wrap" : goog.userAgent.OPERA ? "-o-pre-wrap" : "pre-wrap"
};
goog.style.setInlineBlock = function(el) {
  var style = el.style;
  style.position = "relative";
  if(goog.userAgent.IE && !goog.userAgent.isVersion("8")) {
    style.zoom = "1";
    style.display = "inline"
  }else style.display = goog.userAgent.GECKO ? goog.userAgent.isVersion("1.9a") ? "inline-block" : "-moz-inline-box" : "inline-block"
};
goog.style.isRightToLeft = function(el) {
  return"rtl" == goog.style.getStyle_(el, "direction")
};
goog.style.unselectableStyle_ = goog.userAgent.GECKO ? "MozUserSelect" : goog.userAgent.WEBKIT ? "WebkitUserSelect" : null;
goog.style.isUnselectable = function(el) {
  if(goog.style.unselectableStyle_)return el.style[goog.style.unselectableStyle_].toLowerCase() == "none";
  else if(goog.userAgent.IE || goog.userAgent.OPERA)return el.getAttribute("unselectable") == "on";
  return false
};
goog.style.setUnselectable = function(el, unselectable, opt_noRecurse) {
  var descendants = !opt_noRecurse ? el.getElementsByTagName("*") : null, name = goog.style.unselectableStyle_;
  if(name) {
    var value = unselectable ? "none" : "";
    el.style[name] = value;
    if(descendants)for(var i = 0, descendant;descendant = descendants[i];i++)descendant.style[name] = value
  }else if(goog.userAgent.IE || goog.userAgent.OPERA) {
    value = unselectable ? "on" : "";
    el.setAttribute("unselectable", value);
    if(descendants)for(i = 0;descendant = descendants[i];i++)descendant.setAttribute("unselectable", value)
  }
};
goog.style.getBorderBoxSize = function(element) {
  return new goog.math.Size(element.offsetWidth, element.offsetHeight)
};
goog.style.setBorderBoxSize = function(element, size) {
  var doc = goog.dom.getOwnerDocument(element), isCss1CompatMode = goog.dom.getDomHelper(doc).isCss1CompatMode();
  if(goog.userAgent.IE && (!isCss1CompatMode || !goog.userAgent.isVersion("8"))) {
    var style = element.style;
    if(isCss1CompatMode) {
      var paddingBox = goog.style.getPaddingBox(element), borderBox = goog.style.getBorderBox(element);
      style.pixelWidth = size.width - borderBox.left - paddingBox.left - paddingBox.right - borderBox.right;
      style.pixelHeight = size.height - borderBox.top - paddingBox.top - paddingBox.bottom - borderBox.bottom
    }else {
      style.pixelWidth = size.width;
      style.pixelHeight = size.height
    }
  }else goog.style.setBoxSizingSize_(element, size, "border-box")
};
goog.style.getContentBoxSize = function(element) {
  var doc = goog.dom.getOwnerDocument(element), ieCurrentStyle = goog.userAgent.IE && element.currentStyle;
  if(ieCurrentStyle && goog.dom.getDomHelper(doc).isCss1CompatMode() && ieCurrentStyle.width != "auto" && ieCurrentStyle.height != "auto" && !ieCurrentStyle.boxSizing) {
    var width = goog.style.getIePixelValue_(element, ieCurrentStyle.width, "width", "pixelWidth"), height = goog.style.getIePixelValue_(element, ieCurrentStyle.height, "height", "pixelHeight");
    return new goog.math.Size(width, height)
  }else {
    var borderBoxSize = goog.style.getBorderBoxSize(element), paddingBox = goog.style.getPaddingBox(element), borderBox = goog.style.getBorderBox(element);
    return new goog.math.Size(borderBoxSize.width - borderBox.left - paddingBox.left - paddingBox.right - borderBox.right, borderBoxSize.height - borderBox.top - paddingBox.top - paddingBox.bottom - borderBox.bottom)
  }
};
goog.style.setContentBoxSize = function(element, size) {
  var doc = goog.dom.getOwnerDocument(element), isCss1CompatMode = goog.dom.getDomHelper(doc).isCss1CompatMode();
  if(goog.userAgent.IE && (!isCss1CompatMode || !goog.userAgent.isVersion("8"))) {
    var style = element.style;
    if(isCss1CompatMode) {
      style.pixelWidth = size.width;
      style.pixelHeight = size.height
    }else {
      var paddingBox = goog.style.getPaddingBox(element), borderBox = goog.style.getBorderBox(element);
      style.pixelWidth = size.width + borderBox.left + paddingBox.left + paddingBox.right + borderBox.right;
      style.pixelHeight = size.height + borderBox.top + paddingBox.top + paddingBox.bottom + borderBox.bottom
    }
  }else goog.style.setBoxSizingSize_(element, size, "content-box")
};
goog.style.setBoxSizingSize_ = function(element, size, boxSizing) {
  var style = element.style;
  if(goog.userAgent.GECKO)style.MozBoxSizing = boxSizing;
  else if(goog.userAgent.WEBKIT)style.WebkitBoxSizing = boxSizing;
  else if(goog.userAgent.OPERA && !goog.userAgent.isVersion("9.50"))boxSizing ? style.setProperty("box-sizing", boxSizing) : style.removeProperty("box-sizing");
  else style.boxSizing = boxSizing;
  style.width = size.width + "px";
  style.height = size.height + "px"
};
goog.style.getIePixelValue_ = function(element, value, name, pixelName) {
  if(/^\d+px?$/.test(value))return parseInt(value, 10);
  else {
    var oldStyleValue = element.style[name], oldRuntimeValue = element.runtimeStyle[name];
    element.runtimeStyle[name] = element.currentStyle[name];
    element.style[name] = value;
    var pixelValue = element.style[pixelName];
    element.style[name] = oldStyleValue;
    element.runtimeStyle[name] = oldRuntimeValue;
    return pixelValue
  }
};
goog.style.getIePixelDistance_ = function(element, propName) {
  return goog.style.getIePixelValue_(element, goog.style.getCascadedStyle(element, propName), "left", "pixelLeft")
};
goog.style.getBox_ = function(element, stylePrefix) {
  if(goog.userAgent.IE) {
    var left = goog.style.getIePixelDistance_(element, stylePrefix + "Left"), right = goog.style.getIePixelDistance_(element, stylePrefix + "Right"), top = goog.style.getIePixelDistance_(element, stylePrefix + "Top"), bottom = goog.style.getIePixelDistance_(element, stylePrefix + "Bottom");
    return new goog.math.Box(top, right, bottom, left)
  }else {
    left = goog.style.getComputedStyle(element, stylePrefix + "Left");
    right = goog.style.getComputedStyle(element, stylePrefix + "Right");
    top = goog.style.getComputedStyle(element, stylePrefix + "Top");
    bottom = goog.style.getComputedStyle(element, stylePrefix + "Bottom");
    return new goog.math.Box(parseFloat(top), parseFloat(right), parseFloat(bottom), parseFloat(left))
  }
};
goog.style.getPaddingBox = function(element) {
  return goog.style.getBox_(element, "padding")
};
goog.style.getMarginBox = function(element) {
  return goog.style.getBox_(element, "margin")
};
goog.style.ieBorderWidthKeywords_ = {thin:2, medium:4, thick:6};
goog.style.getIePixelBorder_ = function(element, prop) {
  if(goog.style.getCascadedStyle(element, prop + "Style") == "none")return 0;
  var width = goog.style.getCascadedStyle(element, prop + "Width");
  if(width in goog.style.ieBorderWidthKeywords_)return goog.style.ieBorderWidthKeywords_[width];
  return goog.style.getIePixelValue_(element, width, "left", "pixelLeft")
};
goog.style.getBorderBox = function(element) {
  if(goog.userAgent.IE) {
    var left = goog.style.getIePixelBorder_(element, "borderLeft"), right = goog.style.getIePixelBorder_(element, "borderRight"), top = goog.style.getIePixelBorder_(element, "borderTop"), bottom = goog.style.getIePixelBorder_(element, "borderBottom");
    return new goog.math.Box(top, right, bottom, left)
  }else {
    left = goog.style.getComputedStyle(element, "borderLeftWidth");
    right = goog.style.getComputedStyle(element, "borderRightWidth");
    top = goog.style.getComputedStyle(element, "borderTopWidth");
    bottom = goog.style.getComputedStyle(element, "borderBottomWidth");
    return new goog.math.Box(parseFloat(top), parseFloat(right), parseFloat(bottom), parseFloat(left))
  }
};
goog.style.getFontFamily = function(el) {
  var doc = goog.dom.getOwnerDocument(el), font = "";
  if(doc.createTextRange) {
    var range = doc.body.createTextRange();
    range.moveToElementText(el);
    font = range.queryCommandValue("FontName")
  }if(!font) {
    font = goog.style.getStyle_(el, "fontFamily");
    if(goog.userAgent.OPERA && goog.userAgent.LINUX)font = font.replace(/ \[[^\]]*\]/, "")
  }var fontsArray = font.split(",");
  if(fontsArray.length > 1)font = fontsArray[0];
  return goog.string.stripQuotes(font, "\"'")
};
goog.style.lengthUnitRegex_ = /[^\d]+$/;
goog.style.getLengthUnits = function(value) {
  var units = value.match(goog.style.lengthUnitRegex_);
  return units && units[0] || null
};
goog.style.ABSOLUTE_CSS_LENGTH_UNITS_ = {cm:1, "in":1, mm:1, pc:1, pt:1};
goog.style.CONVERTIBLE_RELATIVE_CSS_UNITS_ = {em:1, ex:1};
goog.style.getFontSize = function(el) {
  var fontSize = goog.style.getStyle_(el, "fontSize"), sizeUnits = goog.style.getLengthUnits(fontSize);
  if(fontSize && "px" == sizeUnits)return parseInt(fontSize, 10);
  if(goog.userAgent.IE)if(sizeUnits in goog.style.ABSOLUTE_CSS_LENGTH_UNITS_)return goog.style.getIePixelValue_(el, fontSize, "left", "pixelLeft");
  else if(el.parentNode && el.parentNode.nodeType == goog.dom.NodeType.ELEMENT && sizeUnits in goog.style.CONVERTIBLE_RELATIVE_CSS_UNITS_) {
    var parentElement = el.parentNode, parentSize = goog.style.getStyle_(parentElement, "fontSize");
    return goog.style.getIePixelValue_(parentElement, fontSize == parentSize ? "1em" : fontSize, "left", "pixelLeft")
  }var sizeElement = goog.dom.createDom("span", {style:"visibility:hidden;position:absolute;line-height:0;padding:0;margin:0;border:0;height:1em;"});
  goog.dom.appendChild(el, sizeElement);
  fontSize = sizeElement.offsetHeight;
  goog.dom.removeNode(sizeElement);
  return fontSize
};
goog.style.parseStyleAttribute = function(value) {
  var result = {};
  goog.array.forEach(value.split(/\s*;\s*/), function(pair) {
    var keyValue = pair.split(/\s*:\s*/);
    if(keyValue.length == 2)result[goog.style.toCamelCase(keyValue[0].toLowerCase())] = keyValue[1]
  });
  return result
};
goog.style.toStyleAttribute = function(obj) {
  var buffer = [];
  goog.object.forEach(obj, function(value, key) {
    buffer.push(goog.style.toSelectorCase(key), ":", value, ";")
  });
  return buffer.join("")
};
goog.style.setFloat = function(el, value) {
  el.style[goog.userAgent.IE ? "styleFloat" : "cssFloat"] = value
};
goog.style.getFloat = function(el) {
  return el.style[goog.userAgent.IE ? "styleFloat" : "cssFloat"] || ""
};goog.ui.AutoComplete.Renderer = function(opt_parentNode, opt_customRenderer, opt_rightAlign, opt_useStandardHighlighting) {
  this.parent_ = opt_parentNode || goog.dom.getDocument().body;
  this.dom_ = goog.dom.getDomHelper(this.parent_);
  this.reposition_ = !opt_parentNode;
  this.element_ = null;
  this.token_ = "";
  this.rows_ = [];
  this.startRenderingRows_ = this.hilitedRow_ = -1;
  this.visible_ = false;
  this.className = "ac-renderer";
  this.rowClassName = "ac-row";
  this.legacyActiveClassName_ = "active";
  this.activeClassName = "ac-active";
  this.highlightedClassName = "ac-highlighted";
  this.customRenderer_ = opt_customRenderer || null;
  this.useStandardHighlighting_ = opt_useStandardHighlighting != null ? opt_useStandardHighlighting : true;
  this.rightAlign_ = opt_rightAlign != null ? opt_rightAlign : false;
  this.keepAligned_ = null;
  this.topAlign_ = false
};
goog.inherits(goog.ui.AutoComplete.Renderer, goog.events.EventTarget);
goog.ui.AutoComplete.Renderer.nextId_ = 0;
goog.ui.AutoComplete.Renderer.DELAY_BEFORE_MOUSEOVER = 300;
a = goog.ui.AutoComplete.Renderer.prototype;
a.renderRows = function(rows, token, opt_target) {
  this.token_ = token;
  this.rows_ = rows;
  this.hilitedRow_ = 0;
  this.startRenderingRows_ = goog.now();
  this.target_ = opt_target;
  this.rowDivs_ = [];
  this.redraw()
};
a.dismiss = function() {
  this.target_ && goog.dom.a11y.setActiveDescendant(this.target_, null);
  if(this.visible_) {
    this.visible_ = false;
    goog.style.showElement(this.element_, false)
  }
};
a.show = function() {
  if(!this.visible_) {
    this.visible_ = true;
    goog.style.showElement(this.element_, true)
  }
};
a.isVisible = function() {
  return this.visible_
};
a.hiliteRow = function(index) {
  this.hiliteNone();
  this.hilitedRow_ = index;
  if(index >= 0 && index < this.element_.childNodes.length) {
    var rowDiv = this.rowDivs_[index];
    goog.dom.classes.add(rowDiv, this.activeClassName, this.legacyActiveClassName_);
    this.target_ && goog.dom.a11y.setActiveDescendant(this.target_, rowDiv);
    goog.style.scrollIntoContainerView(rowDiv, this.element_)
  }
};
a.hiliteNone = function() {
  this.hilitedRow_ >= 0 && goog.dom.classes.remove(this.rowDivs_[this.hilitedRow_], this.activeClassName, this.legacyActiveClassName_)
};
a.hiliteId = function(id) {
  if(id == -1)this.hiliteRow(-1);
  else for(var i = 0;i < this.rows_.length;i++)if(this.rows_[i].id == id) {
    this.hiliteRow(i);
    return
  }
};
a.setMenuClasses_ = function(elt) {
  goog.dom.classes.add(elt, this.className)
};
a.maybeCreateElement_ = function() {
  if(!this.element_) {
    var el = this.dom_.createDom("div", {style:"display:none"});
    this.element_ = el;
    this.setMenuClasses_(el);
    goog.dom.a11y.setRole(el, goog.dom.a11y.Role.LISTBOX);
    el.id = "goog-acr-" + goog.ui.AutoComplete.Renderer.nextId_++;
    if(this.target_) {
      goog.dom.a11y.setRole(this.target_, goog.dom.a11y.Role.COMBOBOX);
      goog.dom.a11y.setState(this.target_, goog.dom.a11y.State.AUTOCOMPLETE, "list");
      goog.dom.a11y.setState(this.target_, goog.dom.a11y.State.HASPOPUP, true)
    }this.dom_.appendChild(this.parent_, el);
    goog.events.listen(el, goog.events.EventType.CLICK, this.handleClick_, false, this);
    goog.events.listen(el, goog.events.EventType.MOUSEDOWN, this.handleMouseDown_, false, this);
    goog.events.listen(this.dom_.getDocument(), goog.events.EventType.CLICK, this.handleDocumentClick_, false, this);
    goog.events.listen(el, goog.events.EventType.MOUSEOVER, this.handleMouseOver_, false, this)
  }
};
a.redraw = function() {
  this.maybeCreateElement_();
  if(this.topAlign_)this.element_.style.visibility = "hidden";
  this.rowDivs_.length = 0;
  this.dom_.removeChildren(this.element_);
  if(this.customRenderer_ && this.customRenderer_.render)this.customRenderer_.render(this, this.element_, this.rows_, this.token_);
  else {
    var curRow = null;
    goog.iter.forEach(this.rows_, function(row) {
      row = this.renderRowHtml(row, this.token_);
      this.topAlign_ ? this.element_.insertBefore(row, curRow) : this.dom_.appendChild(this.element_, row);
      curRow = row
    }, this)
  }if(this.rows_.length == 0)this.dismiss();
  else {
    this.show();
    this.preventMacScrollbarResurface_(this.element_);
    this.reposition();
    goog.style.setUnselectable(this.element_, true)
  }
};
a.reposition = function() {
  if(this.target_ && this.reposition_) {
    var topLeft = goog.style.getPageOffset(this.target_), locationNodeSize = goog.style.getSize(this.target_), viewSize = goog.style.getSize(goog.style.getClientViewportElement(this.target_)), elSize = goog.style.getSize(this.element_);
    topLeft.y = this.topAlign_ ? topLeft.y - elSize.height : topLeft.y + locationNodeSize.height;
    if((this.rightAlign_ || topLeft.x + elSize.width > viewSize.width) && this.keepAligned_ != "LEFT") {
      topLeft.x = topLeft.x + locationNodeSize.width - elSize.width;
      this.keepAligned_ = "RIGHT"
    }else this.keepAligned_ = "LEFT";
    goog.style.setPageOffset(this.element_, topLeft);
    if(this.topAlign_)this.element_.style.visibility = "visible"
  }
};
a.disposeInternal = function() {
  goog.ui.AutoComplete.Renderer.superClass_.disposeInternal.call(this);
  if(this.element_) {
    goog.events.unlisten(this.element_, goog.events.EventType.CLICK, this.handleClick_, false, this);
    goog.events.unlisten(this.element_, goog.events.EventType.MOUSEDOWN, this.handleMouseDown_, false, this);
    goog.events.unlisten(this.dom_.getDocument(), goog.events.EventType.CLICK, this.handleDocumentClick_, false, this);
    goog.events.unlisten(this.element_, goog.events.EventType.MOUSEOVER, this.handleMouseOver_, false, this);
    this.dom_.removeNode(this.element_);
    this.element_ = null;
    this.visible_ = false
  }delete this.parent_
};
a.preventMacScrollbarResurface_ = function(node) {
  if(goog.userAgent.GECKO && goog.userAgent.MAC) {
    node.style.width = "";
    node.style.overflow = "visible";
    node.style.width = node.offsetWidth;
    node.style.overflow = "auto"
  }
};
a.renderRowContents_ = function(row, token, node) {
  node.innerHTML = goog.string.htmlEscape(row.data.toString())
};
a.hiliteMatchingText_ = function(node, tokenOrArray) {
  if(node.nodeType == goog.dom.NodeType.TEXT) {
    var token, rest = null;
    if(goog.isArray(tokenOrArray)) {
      token = tokenOrArray.length > 0 ? tokenOrArray[0] : "";
      if(tokenOrArray.length > 1)rest = goog.array.slice(tokenOrArray, 1)
    }else token = tokenOrArray;
    if(token.length != 0) {
      var text = node.nodeValue;
      token = goog.string.regExpEscape(token);
      for(var re = new RegExp("(.*?)(^|\\W+)(" + token + ")", "gi"), textNodes = [], lastIndex = 0, match = re.exec(text);match;) {
        textNodes.push(match[1]);
        textNodes.push(match[2]);
        textNodes.push(match[3]);
        lastIndex = re.lastIndex;
        match = re.exec(text)
      }textNodes.push(text.substring(lastIndex));
      if(textNodes.length > 1) {
        node.nodeValue = textNodes[0] + textNodes[1];
        var boldTag = this.dom_.createElement("b");
        boldTag.className = this.highlightedClassName;
        this.dom_.appendChild(boldTag, this.dom_.createTextNode(textNodes[2]));
        boldTag = node.parentNode.insertBefore(boldTag, node.nextSibling);
        for(var i = textNodes.length - 1;i >= 3;i--)node.parentNode.insertBefore(this.dom_.createTextNode(textNodes[i]), boldTag.nextSibling)
      }else rest && this.hiliteMatchingText_(node, rest)
    }
  }else for(var child = node.firstChild;child;) {
    var nextChild = child.nextSibling;
    this.hiliteMatchingText_(child, tokenOrArray);
    child = nextChild
  }
};
a.renderRowHtml = function(row, token) {
  var node = this.dom_.createDom("div", {className:this.rowClassName, id:"goog-acri-" + goog.ui.AutoComplete.Renderer.nextId_++});
  goog.dom.a11y.setRole(node, goog.dom.a11y.Role.OPTION);
  this.customRenderer_ && this.customRenderer_.renderRow ? this.customRenderer_.renderRow(row, token, node) : this.renderRowContents_(row, token, node);
  token && this.useStandardHighlighting_ && this.hiliteMatchingText_(node, token);
  goog.dom.classes.add(node, this.rowClassName);
  this.rowDivs_.push(node);
  return node
};
a.getRowFromEventTarget_ = function(et) {
  for(;et && et != this.element_ && !goog.dom.classes.has(et, this.rowClassName);)et = et.parentNode;
  return et ? goog.array.indexOf(this.rowDivs_, et) : -1
};
a.handleClick_ = function(e) {
  var index = this.getRowFromEventTarget_(e.target);
  index >= 0 && this.dispatchEvent({type:goog.ui.AutoComplete.EventType.SELECT, row:this.rows_[index].id});
  e.stopPropagation()
};
a.handleMouseDown_ = function(e) {
  this.dispatchEvent(goog.ui.AutoComplete.EventType.CANCEL_DISMISS);
  e.stopPropagation();
  e.preventDefault()
};
a.handleDocumentClick_ = function() {
  this.dispatchEvent(goog.ui.AutoComplete.EventType.DISMISS)
};
a.handleMouseOver_ = function(e) {
  var index = this.getRowFromEventTarget_(e.target);
  if(index >= 0)goog.now() - this.startRenderingRows_ < goog.ui.AutoComplete.Renderer.DELAY_BEFORE_MOUSEOVER || this.dispatchEvent({type:goog.ui.AutoComplete.EventType.HILITE, row:this.rows_[index].id})
};
goog.ui.AutoComplete.Renderer.CustomRenderer = function() {
};
goog.ui.AutoComplete.Renderer.CustomRenderer.prototype.render = function() {
};
goog.ui.AutoComplete.Renderer.CustomRenderer.prototype.renderRow = function() {
};goog.ui.AutoComplete.Basic = function(data, input, opt_multi, opt_useSimilar) {
  var matcher = new goog.ui.AutoComplete.ArrayMatcher(data, !opt_useSimilar), renderer = new goog.ui.AutoComplete.Renderer, inputhandler = new goog.ui.AutoComplete.InputHandler(null, null, !!opt_multi);
  goog.ui.AutoComplete.call(this, matcher, renderer, inputhandler);
  inputhandler.attachAutoComplete(this);
  inputhandler.attachInputs(input)
};
goog.inherits(goog.ui.AutoComplete.Basic, goog.ui.AutoComplete);goog.fx = {};
goog.fx.easing = {};
goog.fx.TIMEOUT = 20;
goog.fx.easing.easeIn = function(t) {
  return t * t * t
};
goog.fx.easing.easeOut = function(t) {
  return 1 - Math.pow(1 - t, 3)
};
goog.fx.easing.inAndOut = function(t) {
  return 3 * t * t - 2 * t * t * t
};
goog.fx.Animation = function(start, end, duration, opt_acc) {
  if(!goog.isArray(start) || !goog.isArray(end))throw Error("Start and end parameters must be arrays");if(start.length != end.length)throw Error("Start and end points must be the same length");this.startPoint = start;
  this.endPoint = end;
  this.duration = duration;
  this.accel_ = opt_acc;
  this.coords = []
};
goog.inherits(goog.fx.Animation, goog.events.EventTarget);
goog.fx.Animation.EventType = {PLAY:"play", BEGIN:"begin", RESUME:"resume", END:"end", STOP:"stop", FINISH:"finish", PAUSE:"pause", ANIMATE:"animate", DESTROY:"destroy"};
goog.fx.Animation.State = {STOPPED:0, PAUSED:-1, PLAYING:1};
goog.fx.Animation.activeAnimations_ = {};
goog.fx.Animation.globalTimer_ = null;
goog.fx.Animation.cycleAnimations_ = function() {
  goog.Timer.defaultTimerObject.clearTimeout(goog.fx.Animation.globalTimer_);
  var now = goog.now();
  for(var hc in goog.fx.Animation.activeAnimations_)goog.fx.Animation.activeAnimations_[hc].cycle(now);
  goog.fx.Animation.globalTimer_ = goog.object.isEmpty(goog.fx.Animation.activeAnimations_) ? null : goog.Timer.defaultTimerObject.setTimeout(goog.fx.Animation.cycleAnimations_, goog.fx.TIMEOUT)
};
goog.fx.Animation.registerAnimation = function(animation) {
  var hc = goog.getHashCode(animation);
  hc in goog.fx.Animation.activeAnimations_ || (goog.fx.Animation.activeAnimations_[hc] = animation);
  if(!goog.fx.Animation.globalTimer_)goog.fx.Animation.globalTimer_ = goog.Timer.defaultTimerObject.setTimeout(goog.fx.Animation.cycleAnimations_, goog.fx.TIMEOUT)
};
goog.fx.Animation.unregisterAnimation = function(animation) {
  var hc = goog.getHashCode(animation);
  delete goog.fx.Animation.activeAnimations_[hc];
  if(goog.fx.Animation.globalTimer_ && goog.object.isEmpty(goog.fx.Animation.activeAnimations_)) {
    goog.Timer.defaultTimerObject.clearTimeout(goog.fx.Animation.globalTimer_);
    goog.fx.Animation.globalTimer_ = null
  }
};
a = goog.fx.Animation.prototype;
a.state_ = goog.fx.Animation.State.STOPPED;
a.fps_ = 0;
a.progress = 0;
a.startTime = null;
a.endTime = null;
a.lastFrame = null;
a.play = function(opt_restart) {
  if(opt_restart || this.state_ == goog.fx.Animation.State.STOPPED) {
    this.progress = 0;
    this.coords = this.startPoint
  }else if(this.state_ == goog.fx.Animation.State.PLAYING)return false;
  goog.fx.Animation.unregisterAnimation(this);
  this.startTime = goog.now();
  if(this.state_ == goog.fx.Animation.State.PAUSED)this.startTime -= this.duration * this.progress;
  this.endTime = this.startTime + this.duration;
  this.lastFrame = this.startTime;
  this.progress || this.onBegin();
  this.onPlay();
  this.state_ == goog.fx.Animation.State.PAUSED && this.onResume();
  this.state_ = goog.fx.Animation.State.PLAYING;
  goog.fx.Animation.registerAnimation(this);
  this.cycle(this.startTime);
  return true
};
a.stop = function(gotoEnd) {
  goog.fx.Animation.unregisterAnimation(this);
  this.state_ = goog.fx.Animation.State.STOPPED;
  if(gotoEnd)this.progress = 1;
  this.updateCoords_(this.progress);
  this.onStop();
  this.onEnd()
};
a.disposeInternal = function() {
  this.state_ != goog.fx.Animation.State.STOPPED && this.stop(false);
  this.onDestroy();
  goog.fx.Animation.superClass_.disposeInternal.call(this)
};
a.cycle = function(now) {
  this.progress = (now - this.startTime) / (this.endTime - this.startTime);
  if(this.progress >= 1)this.progress = 1;
  this.fps_ = 1E3 / (now - this.lastFrame);
  this.lastFrame = now;
  goog.isFunction(this.accel_) ? this.updateCoords_(this.accel_(this.progress)) : this.updateCoords_(this.progress);
  if(this.progress == 1) {
    this.state_ = goog.fx.Animation.State.STOPPED;
    goog.fx.Animation.unregisterAnimation(this);
    this.onFinish();
    this.onEnd()
  }else this.state_ == goog.fx.Animation.State.PLAYING && this.onAnimate()
};
a.updateCoords_ = function(t) {
  this.coords = new Array(this.startPoint.length);
  for(var i = 0;i < this.startPoint.length;i++)this.coords[i] = (this.endPoint[i] - this.startPoint[i]) * t + this.startPoint[i]
};
a.onAnimate = function() {
  this.dispatchAnimationEvent_(goog.fx.Animation.EventType.ANIMATE)
};
a.onBegin = function() {
  this.dispatchAnimationEvent_(goog.fx.Animation.EventType.BEGIN)
};
a.onDestroy = function() {
  this.dispatchAnimationEvent_(goog.fx.Animation.EventType.DESTROY)
};
a.onEnd = function() {
  this.dispatchAnimationEvent_(goog.fx.Animation.EventType.END)
};
a.onFinish = function() {
  this.dispatchAnimationEvent_(goog.fx.Animation.EventType.FINISH)
};
a.onPlay = function() {
  this.dispatchAnimationEvent_(goog.fx.Animation.EventType.PLAY)
};
a.onResume = function() {
  this.dispatchAnimationEvent_(goog.fx.Animation.EventType.RESUME)
};
a.onStop = function() {
  this.dispatchAnimationEvent_(goog.fx.Animation.EventType.STOP)
};
a.dispatchAnimationEvent_ = function(type) {
  this.dispatchEvent(new goog.fx.AnimationEvent(type, this))
};
goog.fx.AnimationEvent = function(type, anim) {
  goog.events.Event.call(this, type);
  this.coords = anim.coords;
  this.x = anim.coords[0];
  this.y = anim.coords[1];
  this.z = anim.coords[2];
  this.duration = anim.duration;
  this.progress = anim.progress;
  this.fps = anim.fps_;
  this.state = anim.state_;
  this.anim = anim
};
goog.inherits(goog.fx.AnimationEvent, goog.events.Event);goog.ui.Zippy = function(header, opt_content, opt_expanded) {
  this.elHeader_ = goog.dom.getElement(header) || null;
  this.elContent_ = opt_content ? goog.dom.getElement(opt_content) : null;
  this.expanded_ = opt_expanded == true;
  if(this.elHeader_) {
    this.elHeader_.tabIndex = 0;
    goog.events.listen(this.elHeader_, goog.events.EventType.CLICK, this.onHeaderClick_, false, this);
    goog.events.listen(this.elHeader_, goog.events.EventType.KEYDOWN, this.onHeaderKeyDown_, false, this)
  }this.setExpanded(this.expanded_)
};
goog.inherits(goog.ui.Zippy, goog.events.EventTarget);
goog.ui.Zippy.Events = {TOGGLE:"toggle"};
a = goog.ui.Zippy.prototype;
a.disposeInternal = function() {
  this.elHeader_ && goog.events.removeAll(this.elHeader_);
  goog.ui.Zippy.superClass_.disposeInternal.call(this)
};
a.collapse = function() {
  this.setExpanded(false)
};
a.toggle = function() {
  this.setExpanded(!this.expanded_)
};
a.setExpanded = function(expanded) {
  if(this.elContent_)this.elContent_.style.display = expanded ? "" : "none";
  this.updateHeaderClassName_(expanded);
  this.expanded_ = expanded;
  this.dispatchEvent(new goog.ui.ZippyEvent(goog.ui.Zippy.Events.TOGGLE, this, this.expanded_))
};
a.updateHeaderClassName_ = function(expanded) {
  if(this.elHeader_)if(expanded) {
    goog.dom.classes.remove(this.elHeader_, "goog-zippy-collapsed");
    goog.dom.classes.add(this.elHeader_, "goog-zippy-expanded")
  }else {
    goog.dom.classes.remove(this.elHeader_, "goog-zippy-expanded");
    goog.dom.classes.add(this.elHeader_, "goog-zippy-collapsed")
  }
};
a.onHeaderKeyDown_ = function(event) {
  if(event.keyCode == goog.events.KeyCodes.ENTER || event.keyCode == goog.events.KeyCodes.SPACE) {
    this.toggle();
    event.preventDefault();
    event.stopPropagation()
  }
};
a.onHeaderClick_ = function() {
  this.toggle()
};
goog.ui.ZippyEvent = function(type, target, expanded) {
  goog.events.Event.call(this, type, target);
  this.expanded = expanded
};
goog.inherits(goog.ui.ZippyEvent, goog.events.Event);goog.ui.AnimatedZippy = function(header, content, opt_expanded) {
  var elWrapper = goog.dom.createDom("div", {style:"overflow:hidden"}), elContent = goog.dom.getElement(content);
  elContent.parentNode.replaceChild(elWrapper, elContent);
  elWrapper.appendChild(elContent);
  this.elWrapper_ = elWrapper;
  this.anim_ = null;
  goog.ui.Zippy.call(this, header, elContent, opt_expanded);
  var expanded = this.expanded_;
  this.elWrapper_.style.display = expanded ? "" : "none";
  this.updateHeaderClassName_(expanded)
};
goog.inherits(goog.ui.AnimatedZippy, goog.ui.Zippy);
a = goog.ui.AnimatedZippy.prototype;
a.animationDuration = 500;
a.animationAcceleration = goog.fx.easing.easeOut;
a.setExpanded = function(expanded) {
  if(!(this.expanded_ == expanded && !this.anim_)) {
    if(this.elWrapper_.style.display == "none")this.elWrapper_.style.display = "";
    var h = this.elContent_.offsetHeight, startH = 0;
    if(this.anim_) {
      expanded = this.expanded_;
      goog.events.removeAll(this.anim_);
      this.anim_.stop(false);
      startH = h - Math.abs(parseInt(this.elContent_.style.marginTop, 10))
    }else startH = expanded ? 0 : h;
    this.updateHeaderClassName_(expanded);
    this.anim_ = new goog.fx.Animation([0, startH], [0, expanded ? h : 0], this.animationDuration, this.animationAcceleration);
    goog.events.listen(this.anim_, [goog.fx.Animation.EventType.BEGIN, goog.fx.Animation.EventType.ANIMATE, goog.fx.Animation.EventType.END], this.onAnimate_, false, this);
    goog.events.listen(this.anim_, goog.fx.Animation.EventType.END, goog.bind(this.onAnimationCompleted_, this, expanded));
    this.anim_.play(false)
  }
};
a.onAnimate_ = function(e) {
  this.elContent_.style.marginTop = e.y - this.elContent_.offsetHeight + "px"
};
a.onAnimationCompleted_ = function(expanded) {
  if(expanded)this.elContent_.style.marginTop = "0";
  goog.events.removeAll(this.anim_);
  this.expanded_ = expanded;
  this.anim_ = null;
  if(!expanded)this.elWrapper_.style.display = "none";
  this.dispatchEvent(new goog.ui.ZippyEvent(goog.ui.Zippy.Events.TOGGLE, this, expanded))
};goog.ui.IdGenerator = function() {
};
goog.addSingletonGetter(goog.ui.IdGenerator);
goog.ui.IdGenerator.prototype.nextId_ = 0;
goog.ui.IdGenerator.prototype.getNextUniqueId = function() {
  return":" + (this.nextId_++).toString(36)
};
goog.ui.IdGenerator.instance = goog.ui.IdGenerator.getInstance();goog.ui.Component = function(opt_domHelper) {
  this.dom_ = opt_domHelper || goog.dom.getDomHelper();
  this.rightToLeft_ = goog.ui.Component.defaultRightToLeft_
};
goog.inherits(goog.ui.Component, goog.events.EventTarget);
goog.ui.Component.prototype.idGenerator_ = goog.ui.IdGenerator.getInstance();
goog.ui.Component.defaultRightToLeft_ = null;
goog.ui.Component.EventType = {BEFORE_SHOW:"beforeshow", SHOW:"show", HIDE:"hide", DISABLE:"disable", ENABLE:"enable", HIGHLIGHT:"highlight", UNHIGHLIGHT:"unhighlight", ACTIVATE:"activate", DEACTIVATE:"deactivate", SELECT:"select", UNSELECT:"unselect", CHECK:"check", UNCHECK:"uncheck", FOCUS:"focus", BLUR:"blur", OPEN:"open", CLOSE:"close", ENTER:"enter", LEAVE:"leave", ACTION:"action", CHANGE:"change"};
goog.ui.Component.Error = {NOT_SUPPORTED:"Method not supported", DECORATE_INVALID:"Invalid element to decorate", ALREADY_RENDERED:"Component already rendered", PARENT_UNABLE_TO_BE_SET:"Unable to set parent component", CHILD_INDEX_OUT_OF_BOUNDS:"Child component index out of bounds", NOT_OUR_CHILD:"Child is not in parent component", NOT_IN_DOCUMENT:"Operation not supported while component is not in document", STATE_INVALID:"Invalid component state"};
goog.ui.Component.State = {ALL:255, DISABLED:1, HOVER:2, ACTIVE:4, SELECTED:8, CHECKED:16, FOCUSED:32, OPENED:64};
goog.ui.Component.getStateTransitionEvent = function(state, isEntering) {
  switch(state) {
    case goog.ui.Component.State.DISABLED:
      return isEntering ? goog.ui.Component.EventType.DISABLE : goog.ui.Component.EventType.ENABLE;
    case goog.ui.Component.State.HOVER:
      return isEntering ? goog.ui.Component.EventType.HIGHLIGHT : goog.ui.Component.EventType.UNHIGHLIGHT;
    case goog.ui.Component.State.ACTIVE:
      return isEntering ? goog.ui.Component.EventType.ACTIVATE : goog.ui.Component.EventType.DEACTIVATE;
    case goog.ui.Component.State.SELECTED:
      return isEntering ? goog.ui.Component.EventType.SELECT : goog.ui.Component.EventType.UNSELECT;
    case goog.ui.Component.State.CHECKED:
      return isEntering ? goog.ui.Component.EventType.CHECK : goog.ui.Component.EventType.UNCHECK;
    case goog.ui.Component.State.FOCUSED:
      return isEntering ? goog.ui.Component.EventType.FOCUS : goog.ui.Component.EventType.BLUR;
    case goog.ui.Component.State.OPENED:
      return isEntering ? goog.ui.Component.EventType.OPEN : goog.ui.Component.EventType.CLOSE;
    default:
  }
  throw Error(goog.ui.Component.Error.STATE_INVALID);
};
goog.ui.Component.setDefaultRightToLeft = function(rightToLeft) {
  goog.ui.Component.defaultRightToLeft_ = rightToLeft
};
a = goog.ui.Component.prototype;
a.id_ = null;
a.dom_ = null;
a.inDocument_ = false;
a.element_ = null;
a.rightToLeft_ = null;
a.model_ = null;
a.parent_ = null;
a.children_ = null;
a.childIndex_ = null;
a.wasDecorated_ = false;
a.getId = function() {
  return this.id_ || (this.id_ = this.idGenerator_.getNextUniqueId())
};
a.setId = function(id) {
  if(this.parent_ && this.parent_.childIndex_) {
    goog.object.remove(this.parent_.childIndex_, this.id_);
    goog.object.add(this.parent_.childIndex_, id, this)
  }this.id_ = id
};
a.getElement = function() {
  return this.element_
};
a.setElementInternal = function(element) {
  this.element_ = element
};
a.getHandler = function() {
  return this.googUiComponentHandler_ || (this.googUiComponentHandler_ = new goog.events.EventHandler(this))
};
a.setParent = function(parent) {
  if(this == parent)throw Error(goog.ui.Component.Error.PARENT_UNABLE_TO_BE_SET);if(parent && this.parent_ && this.id_ && this.parent_.getChild(this.id_) && this.parent_ != parent)throw Error(goog.ui.Component.Error.PARENT_UNABLE_TO_BE_SET);this.parent_ = parent;
  goog.ui.Component.superClass_.setParentEventTarget.call(this, parent)
};
a.getParent = function() {
  return this.parent_
};
a.setParentEventTarget = function(parent) {
  if(this.parent_ && this.parent_ != parent)throw Error(goog.ui.Component.Error.NOT_SUPPORTED);goog.ui.Component.superClass_.setParentEventTarget.call(this, parent)
};
a.getDomHelper = function() {
  return this.dom_
};
a.isInDocument = function() {
  return this.inDocument_
};
a.createDom = function() {
  this.element_ = this.dom_.createElement("div")
};
a.render = function(opt_parentElement) {
  this.render_(opt_parentElement)
};
a.render_ = function(opt_parentElement, opt_beforeElement) {
  if(this.inDocument_)throw Error(goog.ui.Component.Error.ALREADY_RENDERED);this.element_ || this.createDom();
  opt_parentElement ? opt_parentElement.insertBefore(this.element_, opt_beforeElement || null) : this.dom_.getDocument().body.appendChild(this.element_);
  if(!this.parent_ || this.parent_.isInDocument())this.enterDocument()
};
a.decorate = function(element) {
  if(this.inDocument_)throw Error(goog.ui.Component.Error.ALREADY_RENDERED);else if(element && this.canDecorate(element)) {
    this.wasDecorated_ = true;
    if(!this.dom_ || this.dom_.getDocument() != goog.dom.getOwnerDocument(element))this.dom_ = goog.dom.getDomHelper(element);
    this.decorateInternal(element);
    this.enterDocument()
  }else throw Error(goog.ui.Component.Error.DECORATE_INVALID);
};
a.canDecorate = function() {
  return true
};
a.decorateInternal = function(element) {
  this.element_ = element
};
a.enterDocument = function() {
  this.inDocument_ = true;
  this.forEachChild(function(child) {
    !child.isInDocument() && child.getElement() && child.enterDocument()
  })
};
a.exitDocument = function() {
  this.forEachChild(function(child) {
    child.isInDocument() && child.exitDocument()
  });
  this.googUiComponentHandler_ && this.googUiComponentHandler_.removeAll();
  this.inDocument_ = false
};
a.disposeInternal = function() {
  goog.ui.Component.superClass_.disposeInternal.call(this);
  this.inDocument_ && this.exitDocument();
  if(this.googUiComponentHandler_) {
    this.googUiComponentHandler_.dispose();
    delete this.googUiComponentHandler_
  }this.forEachChild(function(child) {
    child.dispose()
  });
  !this.wasDecorated_ && this.element_ && goog.dom.removeNode(this.element_);
  this.parent_ = this.model_ = this.element_ = this.childIndex_ = this.children_ = null
};
a.addChild = function(child, opt_render) {
  this.addChildAt(child, this.getChildCount(), opt_render)
};
a.addChildAt = function(child, index, opt_render) {
  if(child.inDocument_ && (opt_render || !this.inDocument_))throw Error(goog.ui.Component.Error.ALREADY_RENDERED);if(index < 0 || index > this.getChildCount())throw Error(goog.ui.Component.Error.CHILD_INDEX_OUT_OF_BOUNDS);if(!this.childIndex_ || !this.children_) {
    this.childIndex_ = {};
    this.children_ = []
  }if(child.getParent() == this) {
    goog.object.set(this.childIndex_, child.getId(), child);
    goog.array.remove(this.children_, child)
  }else goog.object.add(this.childIndex_, child.getId(), child);
  child.setParent(this);
  goog.array.insertAt(this.children_, child, index);
  if(child.inDocument_ && this.inDocument_ && child.getParent() == this) {
    var contentElement = this.getContentElement();
    contentElement.insertBefore(child.getElement(), contentElement.childNodes[index + 1] || null)
  }else if(opt_render) {
    this.element_ || this.createDom();
    var sibling = this.getChildAt(index + 1);
    child.render_(this.getContentElement(), sibling ? sibling.element_ : null)
  }else this.inDocument_ && !child.inDocument_ && child.element_ && child.enterDocument()
};
a.getContentElement = function() {
  return this.element_
};
a.isRightToLeft = function() {
  if(this.rightToLeft_ == null)this.rightToLeft_ = goog.style.isRightToLeft(this.inDocument_ ? this.element_ : this.dom_.getDocument().body);
  return this.rightToLeft_
};
a.setRightToLeft = function(rightToLeft) {
  if(this.inDocument_)throw Error(goog.ui.Component.Error.ALREADY_RENDERED);this.rightToLeft_ = rightToLeft
};
a.hasChildren = function() {
  return!!this.children_ && this.children_.length != 0
};
a.getChildCount = function() {
  return this.children_ ? this.children_.length : 0
};
a.getChild = function(id) {
  return this.childIndex_ && id ? goog.object.get(this.childIndex_, id) || null : null
};
a.getChildAt = function(index) {
  return this.children_ ? this.children_[index] || null : null
};
a.forEachChild = function(f, opt_obj) {
  this.children_ && goog.array.forEach(this.children_, f, opt_obj)
};
a.indexOfChild = function(child) {
  return this.children_ && child ? goog.array.indexOf(this.children_, child) : -1
};
a.removeChild = function(child, opt_unrender) {
  if(child) {
    var id = goog.isString(child) ? child : child.getId();
    child = this.getChild(id);
    if(id && child) {
      goog.object.remove(this.childIndex_, id);
      goog.array.remove(this.children_, child);
      if(opt_unrender) {
        child.exitDocument();
        child.element_ && goog.dom.removeNode(child.element_)
      }child.setParent(null)
    }
  }if(!child)throw Error(goog.ui.Component.Error.NOT_OUR_CHILD);return child
};
a.removeChildAt = function(index, opt_unrender) {
  return this.removeChild(this.getChildAt(index), opt_unrender)
};
a.removeChildren = function(opt_unrender) {
  for(;this.hasChildren();)this.removeChildAt(0, opt_unrender)
};goog.ui.Checkbox = function(opt_checked) {
  goog.ui.Component.call(this);
  if(goog.isDef(opt_checked))this.checked_ = opt_checked
};
goog.inherits(goog.ui.Checkbox, goog.ui.Component);
goog.ui.Checkbox.State = {CHECKED:true, UNCHECKED:false, UNDETERMINED:null};
goog.ui.Checkbox.CSS_CLASS = "goog-checkbox";
a = goog.ui.Checkbox.prototype;
a.checked_ = goog.ui.Checkbox.State.UNCHECKED;
a.enabled_ = true;
a.label_ = null;
a.isChecked = function() {
  return this.checked_ == goog.ui.Checkbox.State.CHECKED
};
a.isUnchecked = function() {
  return this.checked_ == goog.ui.Checkbox.State.UNCHECKED
};
a.isUndetermined = function() {
  return this.checked_ == goog.ui.Checkbox.State.UNDETERMINED
};
a.setChecked = function(checked) {
  if(checked != this.checked_) {
    this.checked_ = checked;
    this.updateView()
  }
};
a.isEnabled = function() {
  return this.enabled_
};
a.setEnabled = function(enabled) {
  if(enabled != this.enabled_) {
    this.enabled_ = enabled;
    this.updateView()
  }
};
a.toggle = function() {
  this.checked_ = this.checked_ ? goog.ui.Checkbox.State.UNCHECKED : goog.ui.Checkbox.State.CHECKED;
  this.updateView()
};
a.createDom = function() {
  this.decorateInternal(goog.dom.$dom("span"))
};
a.decorateInternal = function(element) {
  goog.ui.Checkbox.superClass_.decorateInternal.call(this, element);
  goog.dom.classes.add(element, goog.ui.Checkbox.CSS_CLASS);
  this.updateView()
};
a.enterDocument = function() {
  goog.ui.Checkbox.superClass_.enterDocument.call(this);
  this.getHandler().listen(this.label_ || this.getElement(), goog.events.EventType.CLICK, this.handleClick_)
};
a.updateView = function() {
  var el = this.getElement();
  if(el) {
    goog.dom.classes.enable(el, goog.ui.Checkbox.CSS_CLASS + "-unchecked", this.isUnchecked());
    goog.dom.classes.enable(el, goog.ui.Checkbox.CSS_CLASS + "-checked", this.isChecked());
    goog.dom.classes.enable(el, goog.ui.Checkbox.CSS_CLASS + "-undetermined", this.isUndetermined());
    goog.dom.classes.enable(el, goog.ui.Checkbox.CSS_CLASS + "-disabled", !this.enabled_)
  }
};
a.handleClick_ = function() {
  var eventType = this.checked_ ? goog.ui.Component.EventType.UNCHECK : goog.ui.Component.EventType.CHECK;
  if(this.enabled_ && this.dispatchEvent(eventType)) {
    this.toggle();
    this.dispatchEvent(goog.ui.Component.EventType.CHANGE)
  }
};goog.ui.registry = {};
goog.ui.registry.getDefaultRenderer = function(componentCtor) {
  for(var key, rendererCtor;componentCtor;) {
    key = goog.getHashCode(componentCtor);
    if(rendererCtor = goog.ui.registry.defaultRenderers_[key])break;
    componentCtor = componentCtor.superClass_ ? componentCtor.superClass_.constructor : null
  }if(rendererCtor)return goog.isFunction(rendererCtor.getInstance) ? rendererCtor.getInstance() : new rendererCtor;
  return null
};
goog.ui.registry.setDefaultRenderer = function(componentCtor, rendererCtor) {
  if(!goog.isFunction(componentCtor))throw Error("Invalid component class " + componentCtor);if(!goog.isFunction(rendererCtor))throw Error("Invalid renderer class " + rendererCtor);var key = goog.getHashCode(componentCtor);
  goog.ui.registry.defaultRenderers_[key] = rendererCtor
};
goog.ui.registry.getDecoratorByClassName = function(className) {
  return className in goog.ui.registry.decoratorFunctions_ ? goog.ui.registry.decoratorFunctions_[className]() : null
};
goog.ui.registry.setDecoratorByClassName = function(className, decoratorFn) {
  if(!className)throw Error("Invalid class name " + className);if(!goog.isFunction(decoratorFn))throw Error("Invalid decorator function " + decoratorFn);goog.ui.registry.decoratorFunctions_[className] = decoratorFn
};
goog.ui.registry.getDecorator = function(element) {
  for(var decorator, classNames = goog.dom.classes.get(element), i = 0, len = classNames.length;i < len;i++)if(decorator = goog.ui.registry.getDecoratorByClassName(classNames[i]))return decorator;
  return null
};
goog.ui.registry.reset = function() {
  goog.ui.registry.defaultRenderers_ = {};
  goog.ui.registry.decoratorFunctions_ = {}
};
goog.ui.registry.defaultRenderers_ = {};
goog.ui.registry.decoratorFunctions_ = {};goog.ui.ControlContent = goog.typedef;goog.ui.ControlRenderer = function() {
};
goog.addSingletonGetter(goog.ui.ControlRenderer);
goog.ui.ControlRenderer.getCustomRenderer = function(ctor, cssClassName) {
  var renderer = new ctor;
  renderer.getCssClass = function() {
    return cssClassName
  };
  return renderer
};
goog.ui.ControlRenderer.CSS_CLASS = "goog-control";
goog.ui.ControlRenderer.IE6_CLASS_COMBINATIONS = [];
a = goog.ui.ControlRenderer.prototype;
a.getAriaRole = function() {
};
a.createDom = function(control) {
  return control.getDomHelper().createDom("div", this.getClassNames(control).join(" "), control.getContent())
};
a.getContentElement = function(element) {
  return element
};
a.enableClassName = function(control, className, enable) {
  var element = control.getElement ? control.getElement() : control;
  if(element)if(goog.userAgent.IE && !goog.userAgent.isVersion("7")) {
    var combinedClasses = this.getAppliedCombinedClassNames_(goog.dom.classes.get(element), className);
    combinedClasses.push(className);
    goog.partial(enable ? goog.dom.classes.add : goog.dom.classes.remove, element).apply(null, combinedClasses)
  }else goog.dom.classes.enable(element, className, enable)
};
a.enableExtraClassName = function(control, className, enable) {
  this.enableClassName(control, className, enable)
};
a.canDecorate = function() {
  return true
};
a.decorate = function(control, element) {
  element.id && control.setId(element.id);
  var contentElem = this.getContentElement(element);
  contentElem && contentElem.firstChild ? control.setContentInternal(contentElem.firstChild.nextSibling ? goog.array.clone(contentElem.childNodes) : contentElem.firstChild) : control.setContentInternal(null);
  var state = 0, rendererClassName = this.getCssClass(), structuralClassName = this.getStructuralCssClass(), hasRendererClassName = false, hasStructuralClassName = false, hasCombinedClassName = false, classNames = goog.dom.classes.get(element);
  goog.array.forEach(classNames, function(className) {
    if(!hasRendererClassName && className == rendererClassName) {
      hasRendererClassName = true;
      if(structuralClassName == rendererClassName)hasStructuralClassName = true
    }else if(!hasStructuralClassName && className == structuralClassName)hasStructuralClassName = true;
    else state |= this.getStateFromClass(className)
  }, this);
  control.setStateInternal(state);
  if(!hasRendererClassName) {
    classNames.push(rendererClassName);
    if(structuralClassName == rendererClassName)hasStructuralClassName = true
  }hasStructuralClassName || classNames.push(structuralClassName);
  var extraClassNames = control.getExtraClassNames();
  extraClassNames && classNames.push.apply(classNames, extraClassNames);
  if(goog.userAgent.IE && !goog.userAgent.isVersion("7")) {
    var combinedClasses = this.getAppliedCombinedClassNames_(classNames);
    if(combinedClasses.length > 0) {
      classNames.push.apply(classNames, combinedClasses);
      hasCombinedClassName = true
    }
  }if(!hasRendererClassName || !hasStructuralClassName || extraClassNames || hasCombinedClassName)goog.dom.classes.set(element, classNames.join(" "));
  return element
};
a.initializeDom = function(control) {
  control.isRightToLeft() && this.setRightToLeft(control.getElement(), true);
  control.isEnabled() && this.setFocusable(control, control.isVisible())
};
a.setAriaRole = function(element) {
  if(goog.userAgent.GECKO) {
    var ariaRole = this.getAriaRole();
    ariaRole && goog.dom.a11y.setRole(element, ariaRole)
  }
};
a.setAllowTextSelection = function(element, allow) {
  goog.style.setUnselectable(element, !allow, !goog.userAgent.IE && !goog.userAgent.OPERA)
};
a.setRightToLeft = function(element, rightToLeft) {
  this.enableClassName(element, this.getStructuralCssClass() + "-rtl", rightToLeft)
};
a.isFocusable = function(control) {
  var keyTarget;
  if(control.isSupportedState(goog.ui.Component.State.FOCUSED) && (keyTarget = control.getKeyEventTarget()))return goog.dom.isFocusableTabIndex(keyTarget);
  return false
};
a.setFocusable = function(control, focusable) {
  var keyTarget;
  if(control.isSupportedState(goog.ui.Component.State.FOCUSED) && (keyTarget = control.getKeyEventTarget())) {
    if(!focusable && control.isFocused()) {
      try {
        keyTarget.blur()
      }catch(e) {
      }control.isFocused() && control.handleBlur(null)
    }goog.dom.isFocusableTabIndex(keyTarget) != focusable && goog.dom.setFocusableTabIndex(keyTarget, focusable)
  }
};
a.setVisible = function(element, visible) {
  goog.style.showElement(element, visible)
};
a.setState = function(control, state, enable) {
  var element = control.getElement();
  if(element) {
    var className = this.getClassForState(state);
    className && this.enableClassName(control, className, enable);
    this.updateAriaState(element, state, enable)
  }
};
a.updateAriaState = function(element, state, enable) {
  if(goog.userAgent.GECKO) {
    if(!goog.ui.ControlRenderer.ARIA_STATE_MAP_)goog.ui.ControlRenderer.ARIA_STATE_MAP_ = goog.object.create(goog.ui.Component.State.DISABLED, goog.dom.a11y.State.DISABLED, goog.ui.Component.State.ACTIVE, goog.dom.a11y.State.PRESSED, goog.ui.Component.State.SELECTED, goog.dom.a11y.State.SELECTED, goog.ui.Component.State.CHECKED, goog.dom.a11y.State.CHECKED, goog.ui.Component.State.OPENED, goog.dom.a11y.State.EXPANDED);
    var ariaState = goog.ui.ControlRenderer.ARIA_STATE_MAP_[state];
    ariaState && goog.dom.a11y.setState(element, ariaState, enable)
  }
};
a.getKeyEventTarget = function(control) {
  return control.getElement()
};
a.getCssClass = function() {
  return goog.ui.ControlRenderer.CSS_CLASS
};
a.getIe6ClassCombinations = function() {
  return[]
};
a.getStructuralCssClass = function() {
  return this.getCssClass()
};
a.getClassNames = function(control) {
  var cssClass = this.getCssClass(), classNames = [cssClass], structuralCssClass = this.getStructuralCssClass();
  structuralCssClass != cssClass && classNames.push(structuralCssClass);
  var classNamesForState = this.getClassNamesForState(control.getState());
  classNamesForState && classNames.push.apply(classNames, classNamesForState);
  var extraClassNames = control.getExtraClassNames();
  extraClassNames && classNames.push.apply(classNames, extraClassNames);
  goog.userAgent.IE && !goog.userAgent.isVersion("7") && classNames.push.apply(classNames, this.getAppliedCombinedClassNames_(classNames));
  return classNames
};
a.getAppliedCombinedClassNames_ = function(classes, opt_includedClass) {
  var toAdd = [];
  if(opt_includedClass)classes = classes.concat([opt_includedClass]);
  goog.array.forEach(this.getIe6ClassCombinations(), function(combo) {
    if(goog.array.every(combo, goog.partial(goog.array.contains, classes)) && (!opt_includedClass || goog.array.contains(combo, opt_includedClass)))toAdd.push(combo.join("_"))
  });
  return toAdd
};
a.getClassNamesForState = function(state) {
  if(state) {
    for(var classNames = [], mask = 1;state;mask <<= 1)if(state & mask) {
      classNames.push(this.getClassForState(mask));
      state &= ~mask
    }return classNames
  }return null
};
a.getClassForState = function(state) {
  this.classByState_ || this.createClassByStateMap_();
  return this.classByState_[state]
};
a.getStateFromClass = function(className) {
  this.stateByClass_ || this.createStateByClassMap_();
  var state = parseInt(this.stateByClass_[className], 10);
  return isNaN(state) ? 0 : state
};
a.createClassByStateMap_ = function() {
  var baseClass = this.getStructuralCssClass();
  this.classByState_ = goog.object.create(goog.ui.Component.State.DISABLED, baseClass + "-disabled", goog.ui.Component.State.HOVER, baseClass + "-hover", goog.ui.Component.State.ACTIVE, baseClass + "-active", goog.ui.Component.State.SELECTED, baseClass + "-selected", goog.ui.Component.State.CHECKED, baseClass + "-checked", goog.ui.Component.State.FOCUSED, baseClass + "-focused", goog.ui.Component.State.OPENED, baseClass + "-open")
};
a.createStateByClassMap_ = function() {
  this.classByState_ || this.createClassByStateMap_();
  this.stateByClass_ = goog.object.transpose(this.classByState_)
};goog.ui.decorate = function(element) {
  var decorator = goog.ui.registry.getDecorator(element);
  decorator && decorator.decorate(element);
  return decorator
};goog.ui.Control = function(content, opt_renderer, opt_domHelper) {
  goog.ui.Component.call(this, opt_domHelper);
  this.renderer_ = opt_renderer || goog.ui.registry.getDefaultRenderer(this.constructor);
  this.setContentInternal(content)
};
goog.inherits(goog.ui.Control, goog.ui.Component);
goog.ui.Control.registerDecorator = goog.ui.registry.setDecoratorByClassName;
goog.ui.Control.getDecorator = goog.ui.registry.getDecorator;
goog.ui.Control.decorate = goog.ui.decorate;
a = goog.ui.Control.prototype;
a.content_ = null;
a.state_ = 0;
a.supportedStates_ = goog.ui.Component.State.DISABLED | goog.ui.Component.State.HOVER | goog.ui.Component.State.ACTIVE | goog.ui.Component.State.FOCUSED;
a.autoStates_ = goog.ui.Component.State.ALL;
a.statesWithTransitionEvents_ = 0;
a.visible_ = true;
a.extraClassNames_ = null;
a.handleMouseEvents_ = true;
a.allowTextSelection_ = false;
a.isHandleMouseEvents = function() {
  return this.handleMouseEvents_
};
a.setHandleMouseEvents = function(enable) {
  this.isInDocument() && enable != this.handleMouseEvents_ && this.enableMouseEventHandling_(enable);
  this.handleMouseEvents_ = enable
};
a.getKeyEventTarget = function() {
  return this.renderer_.getKeyEventTarget(this)
};
a.getKeyHandler = function() {
  return this.keyHandler_ || (this.keyHandler_ = new goog.events.KeyHandler)
};
a.getRenderer = function() {
  return this.renderer_
};
a.getExtraClassNames = function() {
  return this.extraClassNames_
};
a.addClassName = function(className) {
  if(className) {
    if(this.extraClassNames_)goog.array.contains(this.extraClassNames_, className) || this.extraClassNames_.push(className);
    else this.extraClassNames_ = [className];
    this.renderer_.enableExtraClassName(this, className, true)
  }
};
a.removeClassName = function(className) {
  if(className && this.extraClassNames_) {
    goog.array.remove(this.extraClassNames_, className);
    if(this.extraClassNames_.length == 0)this.extraClassNames_ = null;
    this.renderer_.enableExtraClassName(this, className, false)
  }
};
a.enableClassName = function(className, enable) {
  enable ? this.addClassName(className) : this.removeClassName(className)
};
a.createDom = function() {
  var element = this.renderer_.createDom(this);
  this.setElementInternal(element);
  this.renderer_.setAriaRole(element);
  this.isAllowTextSelection() || this.renderer_.setAllowTextSelection(element, false);
  this.isVisible() || this.renderer_.setVisible(element, false)
};
a.getContentElement = function() {
  return this.renderer_.getContentElement(this.getElement())
};
a.canDecorate = function(element) {
  return this.renderer_.canDecorate(element)
};
a.decorateInternal = function(element) {
  element = this.renderer_.decorate(this, element);
  this.setElementInternal(element);
  this.renderer_.setAriaRole(element);
  this.isAllowTextSelection() || this.renderer_.setAllowTextSelection(element, false);
  this.visible_ = element.style.display != "none"
};
a.enterDocument = function() {
  goog.ui.Control.superClass_.enterDocument.call(this);
  this.renderer_.initializeDom(this);
  if(this.supportedStates_ & ~goog.ui.Component.State.DISABLED) {
    this.isHandleMouseEvents() && this.enableMouseEventHandling_(true);
    if(this.isSupportedState(goog.ui.Component.State.FOCUSED)) {
      var keyTarget = this.getKeyEventTarget();
      if(keyTarget) {
        var keyHandler = this.getKeyHandler();
        keyHandler.attach(keyTarget);
        this.getHandler().listen(keyHandler, goog.events.KeyHandler.EventType.KEY, this.handleKeyEvent).listen(keyTarget, goog.events.EventType.FOCUS, this.handleFocus).listen(keyTarget, goog.events.EventType.BLUR, this.handleBlur)
      }
    }
  }
};
a.enableMouseEventHandling_ = function(enable) {
  var handler = this.getHandler(), element = this.getElement();
  if(enable) {
    handler.listen(element, goog.events.EventType.MOUSEOVER, this.handleMouseOver).listen(element, goog.events.EventType.MOUSEDOWN, this.handleMouseDown).listen(element, goog.events.EventType.MOUSEUP, this.handleMouseUp).listen(element, goog.events.EventType.MOUSEOUT, this.handleMouseOut);
    goog.userAgent.IE && handler.listen(element, goog.events.EventType.DBLCLICK, this.handleDblClick)
  }else {
    handler.unlisten(element, goog.events.EventType.MOUSEOVER, this.handleMouseOver).unlisten(element, goog.events.EventType.MOUSEDOWN, this.handleMouseDown).unlisten(element, goog.events.EventType.MOUSEUP, this.handleMouseUp).unlisten(element, goog.events.EventType.MOUSEOUT, this.handleMouseOut);
    goog.userAgent.IE && handler.unlisten(element, goog.events.EventType.DBLCLICK, this.handleDblClick)
  }
};
a.exitDocument = function() {
  goog.ui.Control.superClass_.exitDocument.call(this);
  this.keyHandler_ && this.keyHandler_.detach();
  this.isVisible() && this.isEnabled() && this.renderer_.setFocusable(this, false)
};
a.disposeInternal = function() {
  goog.ui.Control.superClass_.disposeInternal.call(this);
  if(this.keyHandler_) {
    this.keyHandler_.dispose();
    delete this.keyHandler_
  }delete this.renderer_;
  this.extraClassNames_ = this.content_ = null
};
a.getContent = function() {
  return this.content_
};
a.setContentInternal = function(content) {
  this.content_ = content
};
a.getCaption = function() {
  var content = this.getContent();
  if(!content || goog.isString(content))return content;
  var caption = goog.isArray(content) ? goog.array.map(content, goog.dom.getTextContent).join("") : goog.dom.getTextContent(content);
  return caption && goog.string.trim(caption)
};
a.setRightToLeft = function(rightToLeft) {
  goog.ui.Control.superClass_.setRightToLeft.call(this, rightToLeft);
  var element = this.getElement();
  element && this.renderer_.setRightToLeft(element, rightToLeft)
};
a.isAllowTextSelection = function() {
  return this.allowTextSelection_
};
a.setAllowTextSelection = function(allow) {
  this.allowTextSelection_ = allow;
  var element = this.getElement();
  element && this.renderer_.setAllowTextSelection(element, allow)
};
a.isVisible = function() {
  return this.visible_
};
a.setVisible = function(visible, opt_force) {
  if(opt_force || this.visible_ != visible && this.dispatchEvent(visible ? goog.ui.Component.EventType.SHOW : goog.ui.Component.EventType.HIDE)) {
    var element = this.getElement();
    element && this.renderer_.setVisible(element, visible);
    this.isEnabled() && this.renderer_.setFocusable(this, visible);
    this.visible_ = visible;
    return true
  }return false
};
a.isEnabled = function() {
  return!this.hasState(goog.ui.Component.State.DISABLED)
};
a.isParentDisabled_ = function() {
  var parent = this.getParent();
  return!!parent && typeof parent.isEnabled == "function" && !parent.isEnabled()
};
a.setEnabled = function(enable) {
  if(!this.isParentDisabled_() && this.isTransitionAllowed(goog.ui.Component.State.DISABLED, !enable)) {
    if(!enable) {
      this.setActive(false);
      this.setHighlighted(false)
    }this.isVisible() && this.renderer_.setFocusable(this, enable);
    this.setState(goog.ui.Component.State.DISABLED, !enable)
  }
};
a.setHighlighted = function(highlight) {
  this.isTransitionAllowed(goog.ui.Component.State.HOVER, highlight) && this.setState(goog.ui.Component.State.HOVER, highlight)
};
a.isActive = function() {
  return this.hasState(goog.ui.Component.State.ACTIVE)
};
a.setActive = function(active) {
  this.isTransitionAllowed(goog.ui.Component.State.ACTIVE, active) && this.setState(goog.ui.Component.State.ACTIVE, active)
};
a.isSelected = function() {
  return this.hasState(goog.ui.Component.State.SELECTED)
};
a.setSelected = function(select) {
  this.isTransitionAllowed(goog.ui.Component.State.SELECTED, select) && this.setState(goog.ui.Component.State.SELECTED, select)
};
a.isChecked = function() {
  return this.hasState(goog.ui.Component.State.CHECKED)
};
a.setChecked = function(check) {
  this.isTransitionAllowed(goog.ui.Component.State.CHECKED, check) && this.setState(goog.ui.Component.State.CHECKED, check)
};
a.isFocused = function() {
  return this.hasState(goog.ui.Component.State.FOCUSED)
};
a.setFocused = function(focused) {
  this.isTransitionAllowed(goog.ui.Component.State.FOCUSED, focused) && this.setState(goog.ui.Component.State.FOCUSED, focused)
};
a.isOpen = function() {
  return this.hasState(goog.ui.Component.State.OPENED)
};
a.setOpen = function(open) {
  this.isTransitionAllowed(goog.ui.Component.State.OPENED, open) && this.setState(goog.ui.Component.State.OPENED, open)
};
a.getState = function() {
  return this.state_
};
a.hasState = function(state) {
  return!!(this.state_ & state)
};
a.setState = function(state, enable) {
  if(this.isSupportedState(state) && enable != this.hasState(state)) {
    this.renderer_.setState(this, state, enable);
    this.state_ = enable ? this.state_ | state : this.state_ & ~state
  }
};
a.setStateInternal = function(state) {
  this.state_ = state
};
a.isSupportedState = function(state) {
  return!!(this.supportedStates_ & state)
};
a.setSupportedState = function(state, support) {
  if(this.isInDocument() && this.hasState(state) && !support)throw Error(goog.ui.Component.Error.ALREADY_RENDERED);!support && this.hasState(state) && this.setState(state, false);
  this.supportedStates_ = support ? this.supportedStates_ | state : this.supportedStates_ & ~state
};
a.isAutoState = function(state) {
  return!!(this.autoStates_ & state) && this.isSupportedState(state)
};
a.setDispatchTransitionEvents = function(states, enable) {
  this.statesWithTransitionEvents_ = enable ? this.statesWithTransitionEvents_ | states : this.statesWithTransitionEvents_ & ~states
};
a.isTransitionAllowed = function(state, enable) {
  return this.isSupportedState(state) && this.hasState(state) != enable && (!(this.statesWithTransitionEvents_ & state) || this.dispatchEvent(goog.ui.Component.getStateTransitionEvent(state, enable))) && !this.isDisposed()
};
a.handleMouseOver = function(e) {
  e.relatedTarget && !goog.dom.contains(this.getElement(), e.relatedTarget) && this.dispatchEvent(goog.ui.Component.EventType.ENTER) && this.isEnabled() && this.isAutoState(goog.ui.Component.State.HOVER) && this.setHighlighted(true)
};
a.handleMouseOut = function(e) {
  if(e.relatedTarget && !goog.dom.contains(this.getElement(), e.relatedTarget) && this.dispatchEvent(goog.ui.Component.EventType.LEAVE)) {
    this.isAutoState(goog.ui.Component.State.ACTIVE) && this.setActive(false);
    this.isAutoState(goog.ui.Component.State.HOVER) && this.setHighlighted(false)
  }
};
a.handleMouseDown = function(e) {
  if(this.isEnabled()) {
    this.isAutoState(goog.ui.Component.State.HOVER) && this.setHighlighted(true);
    if(e.isButton(goog.events.BrowserEvent.MouseButton.LEFT)) {
      this.isAutoState(goog.ui.Component.State.ACTIVE) && this.setActive(true);
      this.renderer_.isFocusable(this) && this.getKeyEventTarget().focus()
    }
  }!this.isAllowTextSelection() && e.isButton(goog.events.BrowserEvent.MouseButton.LEFT) && e.preventDefault()
};
a.handleMouseUp = function(e) {
  if(this.isEnabled()) {
    this.isAutoState(goog.ui.Component.State.HOVER) && this.setHighlighted(true);
    this.isActive() && this.performActionInternal(e) && this.isAutoState(goog.ui.Component.State.ACTIVE) && this.setActive(false)
  }
};
a.handleDblClick = function(e) {
  this.isEnabled() && this.performActionInternal(e)
};
a.performActionInternal = function(e) {
  this.isAutoState(goog.ui.Component.State.CHECKED) && this.setChecked(!this.isChecked());
  this.isAutoState(goog.ui.Component.State.SELECTED) && this.setSelected(true);
  this.isAutoState(goog.ui.Component.State.OPENED) && this.setOpen(!this.isOpen());
  var actionEvent = new goog.events.Event(goog.ui.Component.EventType.ACTION, this);
  if(e)for(var properties = ["altKey", "ctrlKey", "metaKey", "shiftKey"], property, i = 0;property = properties[i];i++)actionEvent[property] = e[property];
  return this.dispatchEvent(actionEvent)
};
a.handleFocus = function() {
  this.isAutoState(goog.ui.Component.State.FOCUSED) && this.setFocused(true)
};
a.handleBlur = function() {
  this.isAutoState(goog.ui.Component.State.ACTIVE) && this.setActive(false);
  this.isAutoState(goog.ui.Component.State.FOCUSED) && this.setFocused(false)
};
a.handleKeyEvent = function(e) {
  if(this.isVisible() && this.isEnabled() && this.handleKeyEventInternal(e)) {
    e.preventDefault();
    e.stopPropagation();
    return true
  }return false
};
a.handleKeyEventInternal = function(e) {
  return e.keyCode == goog.events.KeyCodes.ENTER && this.performActionInternal(e)
};
goog.ui.registry.setDefaultRenderer(goog.ui.Control, goog.ui.ControlRenderer);
goog.ui.registry.setDecoratorByClassName(goog.ui.ControlRenderer.CSS_CLASS, function() {
  return new goog.ui.Control(null)
});goog.ui.MenuSeparatorRenderer = function() {
};
goog.inherits(goog.ui.MenuSeparatorRenderer, goog.ui.ControlRenderer);
goog.addSingletonGetter(goog.ui.MenuSeparatorRenderer);
goog.ui.MenuSeparatorRenderer.CSS_CLASS = "goog-menuseparator";
goog.ui.MenuSeparatorRenderer.prototype.createDom = function(separator) {
  return separator.getDomHelper().createDom("div", this.getCssClass())
};
goog.ui.MenuSeparatorRenderer.prototype.decorate = function(separator, element) {
  if(element.tagName == "HR") {
    var hr = element;
    element = this.createDom(separator);
    goog.dom.insertSiblingBefore(element, hr);
    goog.dom.removeNode(hr)
  }else goog.dom.classes.add(element, this.getCssClass());
  return element
};
goog.ui.MenuSeparatorRenderer.prototype.getCssClass = function() {
  return goog.ui.MenuSeparatorRenderer.CSS_CLASS
};goog.ui.Separator = function(opt_renderer, opt_domHelper) {
  goog.ui.Control.call(this, null, opt_renderer || goog.ui.MenuSeparatorRenderer.getInstance(), opt_domHelper);
  this.setSupportedState(goog.ui.Component.State.DISABLED, false);
  this.setSupportedState(goog.ui.Component.State.HOVER, false);
  this.setSupportedState(goog.ui.Component.State.ACTIVE, false);
  this.setSupportedState(goog.ui.Component.State.FOCUSED, false);
  this.setStateInternal(goog.ui.Component.State.DISABLED)
};
goog.inherits(goog.ui.Separator, goog.ui.Control);
goog.ui.Separator.prototype.enterDocument = function() {
  goog.ui.Separator.superClass_.enterDocument.call(this);
  goog.dom.a11y.setRole(this.getElement(), "separator")
};
goog.ui.registry.setDecoratorByClassName(goog.ui.MenuSeparatorRenderer.CSS_CLASS, function() {
  return new goog.ui.Separator
});goog.ui.ContainerRenderer = function() {
};
goog.addSingletonGetter(goog.ui.ContainerRenderer);
goog.ui.ContainerRenderer.getCustomRenderer = function(ctor, cssClassName) {
  var renderer = new ctor;
  renderer.getCssClass = function() {
    return cssClassName
  };
  return renderer
};
goog.ui.ContainerRenderer.CSS_CLASS = "goog-container";
a = goog.ui.ContainerRenderer.prototype;
a.getAriaRole = function() {
};
a.hasTabIndex = function(element) {
  if(element) {
    var attrNode = element.getAttributeNode("tabindex");
    if(attrNode && attrNode.specified) {
      var index = element.tabIndex;
      return goog.isNumber(index) && index >= 0
    }
  }return false
};
a.enableTabIndex = function(element, enable) {
  if(element)element.tabIndex = enable ? 0 : -1
};
a.createDom = function(container) {
  return container.getDomHelper().createDom("div", this.getClassNames(container).join(" "))
};
a.getContentElement = function(element) {
  return element
};
a.canDecorate = function(element) {
  return element.tagName == "DIV"
};
a.decorate = function(container, element) {
  element.id && container.setId(element.id);
  var baseClass = this.getCssClass(), hasBaseClass = false, classNames = goog.dom.classes.get(element);
  classNames && goog.array.forEach(classNames, function(className) {
    if(className == baseClass)hasBaseClass = true;
    else className && this.setStateFromClassName(container, className, baseClass)
  }, this);
  hasBaseClass || goog.dom.classes.add(element, baseClass);
  this.decorateChildren(container, element);
  return element
};
a.setStateFromClassName = function(container, className, baseClass) {
  if(className == baseClass + "-disabled")container.setEnabled(false);
  else if(className == baseClass + "-horizontal")container.setOrientation(goog.ui.Container.Orientation.HORIZONTAL);
  else className == baseClass + "-vertical" && container.setOrientation(goog.ui.Container.Orientation.VERTICAL)
};
a.decorateChildren = function(container, element) {
  if(element)for(var node = element.firstChild, next;node && node.parentNode == element;) {
    next = node.nextSibling;
    if(node.nodeType == goog.dom.NodeType.ELEMENT) {
      var child = this.getDecoratorForChild(node);
      if(child) {
        child.setElementInternal(node);
        container.isEnabled() || child.setEnabled(false);
        container.addChild(child);
        child.decorate(node)
      }
    }else if(!node.nodeValue || goog.string.trim(node.nodeValue) == "")element.removeChild(node);
    node = next
  }
};
a.getDecoratorForChild = function(element) {
  return goog.ui.registry.getDecorator(element)
};
a.initializeDom = function(container) {
  var elem = container.getElement();
  goog.style.setUnselectable(elem, true, goog.userAgent.GECKO);
  if(goog.userAgent.IE)elem.hideFocus = true;
  var ariaRole = this.getAriaRole();
  ariaRole && goog.dom.a11y.setRole(elem, ariaRole)
};
a.getKeyEventTarget = function(container) {
  return container.getElement()
};
a.getCssClass = function() {
  return goog.ui.ContainerRenderer.CSS_CLASS
};
a.getClassNames = function(container) {
  var baseClass = this.getCssClass(), classNames = [baseClass, container.getOrientation() == goog.ui.Container.Orientation.HORIZONTAL ? baseClass + "-horizontal" : baseClass + "-vertical"];
  container.isEnabled() || classNames.push(baseClass + "-disabled");
  return classNames
};
a.getDefaultOrientation = function() {
  return goog.ui.Container.Orientation.VERTICAL
};goog.ui.Container = function(opt_orientation, opt_renderer, opt_domHelper) {
  goog.ui.Component.call(this, opt_domHelper);
  this.renderer_ = opt_renderer || goog.ui.ContainerRenderer.getInstance();
  this.orientation_ = opt_orientation || this.renderer_.getDefaultOrientation()
};
goog.inherits(goog.ui.Container, goog.ui.Component);
goog.ui.Container.EventType = {AFTER_SHOW:"aftershow"};
goog.ui.Container.Orientation = {HORIZONTAL:"horizontal", VERTICAL:"vertical"};
a = goog.ui.Container.prototype;
a.keyEventTarget_ = null;
a.keyHandler_ = null;
a.renderer_ = null;
a.orientation_ = null;
a.visible_ = true;
a.enabled_ = true;
a.focusable_ = true;
a.highlightedIndex_ = -1;
a.openItem_ = null;
a.mouseButtonPressed_ = false;
a.allowFocusableChildren_ = false;
a.childElementIdMap_ = null;
a.getKeyEventTarget = function() {
  return this.keyEventTarget_ || this.renderer_.getKeyEventTarget(this)
};
a.getKeyHandler = function() {
  return this.keyHandler_ || (this.keyHandler_ = new goog.events.KeyHandler(this.getKeyEventTarget()))
};
a.getRenderer = function() {
  return this.renderer_
};
a.createDom = function() {
  this.setElementInternal(this.renderer_.createDom(this))
};
a.getContentElement = function() {
  return this.renderer_.getContentElement(this.getElement())
};
a.canDecorate = function(element) {
  return this.renderer_.canDecorate(element)
};
a.decorateInternal = function(element) {
  this.setElementInternal(this.renderer_.decorate(this, element));
  if(element.style.display == "none")this.visible_ = false
};
a.enterDocument = function() {
  goog.ui.Container.superClass_.enterDocument.call(this);
  this.forEachChild(function(child) {
    child.isInDocument() && this.registerChildId_(child)
  }, this);
  var elem = this.getElement();
  this.renderer_.initializeDom(this);
  this.setVisible(this.visible_, true);
  this.getHandler().listen(this, goog.ui.Component.EventType.ENTER, this.handleEnterItem).listen(this, goog.ui.Component.EventType.HIGHLIGHT, this.handleHighlightItem).listen(this, goog.ui.Component.EventType.UNHIGHLIGHT, this.handleUnHighlightItem).listen(this, goog.ui.Component.EventType.OPEN, this.handleOpenItem).listen(this, goog.ui.Component.EventType.CLOSE, this.handleCloseItem).listen(elem, goog.events.EventType.MOUSEDOWN, this.handleMouseDown).listen(goog.dom.getOwnerDocument(elem), goog.events.EventType.MOUSEUP, 
  this.handleDocumentMouseUp).listen(elem, [goog.events.EventType.MOUSEDOWN, goog.events.EventType.MOUSEUP, goog.events.EventType.MOUSEOVER, goog.events.EventType.MOUSEOUT], this.handleChildMouseEvents);
  this.isFocusable() && this.enableFocusHandling_(true)
};
a.enableFocusHandling_ = function(enable) {
  var handler = this.getHandler(), keyTarget = this.getKeyEventTarget();
  enable ? handler.listen(keyTarget, goog.events.EventType.FOCUS, this.handleFocus).listen(keyTarget, goog.events.EventType.BLUR, this.handleBlur).listen(this.getKeyHandler(), goog.events.KeyHandler.EventType.KEY, this.handleKeyEvent) : handler.unlisten(keyTarget, goog.events.EventType.FOCUS, this.handleFocus).unlisten(keyTarget, goog.events.EventType.BLUR, this.handleBlur).unlisten(this.getKeyHandler(), goog.events.KeyHandler.EventType.KEY, this.handleKeyEvent)
};
a.exitDocument = function() {
  this.setHighlightedIndex(-1);
  this.openItem_ && this.openItem_.setOpen(false);
  this.mouseButtonPressed_ = false;
  goog.ui.Container.superClass_.exitDocument.call(this)
};
a.disposeInternal = function() {
  goog.ui.Container.superClass_.disposeInternal.call(this);
  if(this.keyHandler_) {
    this.keyHandler_.dispose();
    this.keyHandler_ = null
  }this.renderer_ = this.openItem_ = this.childElementIdMap_ = null
};
a.handleEnterItem = function() {
  return true
};
a.handleHighlightItem = function(e) {
  var index = this.indexOfChild(e.target);
  if(index > -1 && index != this.highlightedIndex_) {
    var item = this.getHighlighted();
    item && item.setHighlighted(false);
    this.highlightedIndex_ = index;
    item = this.getHighlighted();
    this.isMouseButtonPressed() && item.setActive(true);
    if(this.openItem_ && item != this.openItem_)item.isSupportedState(goog.ui.Component.State.OPENED) ? item.setOpen(true) : this.openItem_.setOpen(false)
  }goog.dom.a11y.setState(this.getElement(), goog.dom.a11y.State.ACTIVEDESCENDANT, e.target.getElement().id)
};
a.handleUnHighlightItem = function(e) {
  if(e.target == this.getHighlighted())this.highlightedIndex_ = -1;
  goog.dom.a11y.setState(this.getElement(), goog.dom.a11y.State.ACTIVEDESCENDANT, "")
};
a.handleOpenItem = function(e) {
  var item = e.target;
  if(item && item != this.openItem_ && item.getParent() == this) {
    this.openItem_ && this.openItem_.setOpen(false);
    this.openItem_ = item
  }
};
a.handleCloseItem = function(e) {
  if(e.target == this.openItem_)this.openItem_ = null
};
a.handleMouseDown = function(e) {
  this.enabled_ && this.setMouseButtonPressed(true);
  var keyTarget = this.getKeyEventTarget();
  this.renderer_.hasTabIndex(keyTarget) ? keyTarget.focus() : e.preventDefault()
};
a.handleDocumentMouseUp = function() {
  this.setMouseButtonPressed(false)
};
a.handleChildMouseEvents = function(e) {
  var control = this.getOwnerControl(e.target);
  if(control)switch(e.type) {
    case goog.events.EventType.MOUSEDOWN:
      control.handleMouseDown(e);
      break;
    case goog.events.EventType.MOUSEUP:
      control.handleMouseUp(e);
      break;
    case goog.events.EventType.MOUSEOVER:
      control.handleMouseOver(e);
      break;
    case goog.events.EventType.MOUSEOUT:
      control.handleMouseOut(e);
      break
  }
};
a.getOwnerControl = function(node) {
  if(this.childElementIdMap_)for(var elem = this.getElement();node && node.parentNode && node != elem;) {
    var id = node.id;
    if(id in this.childElementIdMap_)return this.childElementIdMap_[id];
    node = node.parentNode
  }return null
};
a.handleFocus = function() {
};
a.handleBlur = function() {
  this.setHighlightedIndex(-1);
  this.setMouseButtonPressed(false);
  this.openItem_ && this.openItem_.setOpen(false)
};
a.handleKeyEvent = function(e) {
  if(this.isEnabled() && this.getChildCount() != 0 && this.handleKeyEventInternal(e)) {
    e.preventDefault();
    e.stopPropagation();
    return true
  }return false
};
a.handleKeyEventInternal = function(e) {
  var highlighted = this.getHighlighted();
  if(highlighted && typeof highlighted.handleKeyEvent == "function" && highlighted.handleKeyEvent(e))return true;
  if(this.openItem_ && this.openItem_ != highlighted && typeof this.openItem_.handleKeyEvent == "function" && this.openItem_.handleKeyEvent(e))return true;
  switch(e.keyCode) {
    case goog.events.KeyCodes.ESC:
      if(this.isFocusable())this.getKeyEventTarget().blur();
      else return false;
      break;
    case goog.events.KeyCodes.HOME:
      this.highlightFirst();
      break;
    case goog.events.KeyCodes.END:
      this.highlightLast();
      break;
    case goog.events.KeyCodes.UP:
      if(this.orientation_ == goog.ui.Container.Orientation.VERTICAL)this.highlightPrevious();
      else return false;
      break;
    case goog.events.KeyCodes.LEFT:
      if(this.orientation_ == goog.ui.Container.Orientation.HORIZONTAL)this.isRightToLeft() ? this.highlightNext() : this.highlightPrevious();
      else return false;
      break;
    case goog.events.KeyCodes.DOWN:
      if(this.orientation_ == goog.ui.Container.Orientation.VERTICAL)this.highlightNext();
      else return false;
      break;
    case goog.events.KeyCodes.RIGHT:
      if(this.orientation_ == goog.ui.Container.Orientation.HORIZONTAL)this.isRightToLeft() ? this.highlightPrevious() : this.highlightNext();
      else return false;
      break;
    default:
      return false
  }
  return true
};
a.registerChildId_ = function(child) {
  var childElem = child.getElement(), id = childElem.id || (childElem.id = child.getId());
  if(!this.childElementIdMap_)this.childElementIdMap_ = {};
  this.childElementIdMap_[id] = child
};
a.addChild = function(child, opt_render) {
  goog.ui.Container.superClass_.addChild.call(this, child, opt_render)
};
a.addChildAt = function(control, index, opt_render) {
  control.setDispatchTransitionEvents(goog.ui.Component.State.HOVER, true);
  control.setDispatchTransitionEvents(goog.ui.Component.State.OPENED, true);
  if(this.isFocusable() || !this.isFocusableChildrenAllowed())control.setSupportedState(goog.ui.Component.State.FOCUSED, false);
  control.setHandleMouseEvents(false);
  goog.ui.Container.superClass_.addChildAt.call(this, control, index, opt_render);
  opt_render && this.isInDocument() && this.registerChildId_(control);
  index <= this.highlightedIndex_ && this.highlightedIndex_++
};
a.removeChild = function(control, opt_unrender) {
  var index = this.indexOfChild(control);
  if(index != -1)if(index == this.highlightedIndex_)control.setHighlighted(false);
  else index < this.highlightedIndex_ && this.highlightedIndex_--;
  var childElem = control.getElement();
  childElem && childElem.id && goog.object.remove(this.childElementIdMap_, childElem.id);
  control = goog.ui.Container.superClass_.removeChild.call(this, control, opt_unrender);
  control.setHandleMouseEvents(true);
  return control
};
a.getOrientation = function() {
  return this.orientation_
};
a.setOrientation = function(orientation) {
  if(this.getElement())throw Error(goog.ui.Component.Error.ALREADY_RENDERED);this.orientation_ = orientation
};
a.isVisible = function() {
  return this.visible_
};
a.setVisible = function(visible, opt_force) {
  if(opt_force || this.visible_ != visible && this.dispatchEvent(visible ? goog.ui.Component.EventType.SHOW : goog.ui.Component.EventType.HIDE)) {
    this.visible_ = visible;
    var elem = this.getElement();
    if(elem) {
      goog.style.showElement(elem, visible);
      this.isFocusable() && this.renderer_.enableTabIndex(this.getKeyEventTarget(), this.enabled_ && this.visible_);
      this.visible_ && !opt_force && this.dispatchEvent(goog.ui.Container.EventType.AFTER_SHOW)
    }return true
  }return false
};
a.isEnabled = function() {
  return this.enabled_
};
a.setEnabled = function(enable) {
  if(this.enabled_ != enable && this.dispatchEvent(enable ? goog.ui.Component.EventType.ENABLE : goog.ui.Component.EventType.DISABLE)) {
    if(enable) {
      this.enabled_ = true;
      this.forEachChild(function(child) {
        if(child.wasDisabled)delete child.wasDisabled;
        else child.setEnabled(true)
      })
    }else {
      this.forEachChild(function(child) {
        if(child.isEnabled())child.setEnabled(false);
        else child.wasDisabled = true
      });
      this.enabled_ = false;
      this.setMouseButtonPressed(false)
    }this.isFocusable() && this.renderer_.enableTabIndex(this.getKeyEventTarget(), enable && this.visible_)
  }
};
a.isFocusable = function() {
  return this.focusable_
};
a.setFocusable = function(focusable) {
  focusable != this.focusable_ && this.isInDocument() && this.enableFocusHandling_(focusable);
  this.focusable_ = focusable;
  this.enabled_ && this.visible_ && this.renderer_.enableTabIndex(this.getKeyEventTarget(), focusable)
};
a.isFocusableChildrenAllowed = function() {
  return this.allowFocusableChildren_
};
a.setHighlightedIndex = function(index) {
  var child = this.getChildAt(index);
  if(child)child.setHighlighted(true);
  else this.highlightedIndex_ > -1 && this.getHighlighted().setHighlighted(false)
};
a.setHighlighted = function(item) {
  this.setHighlightedIndex(this.indexOfChild(item))
};
a.getHighlighted = function() {
  return this.getChildAt(this.highlightedIndex_)
};
a.highlightFirst = function() {
  this.highlightHelper(function(index, max) {
    return(index + 1) % max
  }, this.getChildCount() - 1)
};
a.highlightLast = function() {
  this.highlightHelper(function(index, max) {
    index--;
    return index < 0 ? max - 1 : index
  }, 0)
};
a.highlightNext = function() {
  this.highlightHelper(function(index, max) {
    return(index + 1) % max
  }, this.highlightedIndex_)
};
a.highlightPrevious = function() {
  this.highlightHelper(function(index, max) {
    index--;
    return index < 0 ? max - 1 : index
  }, this.highlightedIndex_)
};
a.highlightHelper = function(fn, startIndex) {
  var curIndex = startIndex < 0 ? this.indexOfChild(this.openItem_) : startIndex, numItems = this.getChildCount();
  curIndex = fn(curIndex, numItems);
  for(var visited = 0;visited <= numItems;) {
    var control = this.getChildAt(curIndex);
    if(control && this.canHighlightItem(control)) {
      this.setHighlightedIndexFromKeyEvent(curIndex);
      return true
    }visited++;
    curIndex = fn(curIndex, numItems)
  }return false
};
a.canHighlightItem = function(item) {
  return item.isVisible() && item.isEnabled() && item.isSupportedState(goog.ui.Component.State.HOVER)
};
a.setHighlightedIndexFromKeyEvent = function(index) {
  this.setHighlightedIndex(index)
};
a.isMouseButtonPressed = function() {
  return this.mouseButtonPressed_
};
a.setMouseButtonPressed = function(pressed) {
  this.mouseButtonPressed_ = pressed
};goog.ui.TabRenderer = function() {
};
goog.inherits(goog.ui.TabRenderer, goog.ui.ControlRenderer);
goog.addSingletonGetter(goog.ui.TabRenderer);
goog.ui.TabRenderer.CSS_CLASS = "goog-tab";
a = goog.ui.TabRenderer.prototype;
a.getCssClass = function() {
  return goog.ui.TabRenderer.CSS_CLASS
};
a.getAriaRole = function() {
  return goog.dom.a11y.Role.TAB
};
a.createDom = function(tab) {
  var element = goog.ui.TabRenderer.superClass_.createDom.call(this, tab), tooltip = tab.getTooltip();
  tooltip && this.setTooltip(element, tooltip);
  return element
};
a.decorate = function(tab, element) {
  element = goog.ui.TabRenderer.superClass_.decorate.call(this, tab, element);
  var tooltip = this.getTooltip(element);
  tooltip && tab.setTooltipInternal(tooltip);
  if(tab.isSelected()) {
    var tabBar = tab.getParent();
    if(tabBar && goog.isFunction(tabBar.setSelectedTab)) {
      tab.setState(goog.ui.Component.State.SELECTED, false);
      tabBar.setSelectedTab(tab)
    }
  }return element
};
a.getTooltip = function(element) {
  return element.title || ""
};
a.setTooltip = function(element, tooltip) {
  if(element)element.title = tooltip || ""
};goog.ui.Tab = function(content, opt_renderer, opt_domHelper) {
  goog.ui.Control.call(this, content, opt_renderer || goog.ui.TabRenderer.getInstance(), opt_domHelper);
  this.setSupportedState(goog.ui.Component.State.SELECTED, true);
  this.setDispatchTransitionEvents(goog.ui.Component.State.DISABLED | goog.ui.Component.State.SELECTED, true)
};
goog.inherits(goog.ui.Tab, goog.ui.Control);
goog.ui.Tab.prototype.getTooltip = function() {
  return this.tooltip_
};
goog.ui.Tab.prototype.setTooltip = function(tooltip) {
  this.getRenderer().setTooltip(this.getElement(), tooltip);
  this.setTooltipInternal(tooltip)
};
goog.ui.Tab.prototype.setTooltipInternal = function(tooltip) {
  this.tooltip_ = tooltip
};
goog.ui.registry.setDecoratorByClassName(goog.ui.TabRenderer.CSS_CLASS, function() {
  return new goog.ui.Tab(null)
});goog.ui.TabBarRenderer = function() {
};
goog.inherits(goog.ui.TabBarRenderer, goog.ui.ContainerRenderer);
goog.addSingletonGetter(goog.ui.TabBarRenderer);
goog.ui.TabBarRenderer.CSS_CLASS = "goog-tab-bar";
a = goog.ui.TabBarRenderer.prototype;
a.getCssClass = function() {
  return goog.ui.TabBarRenderer.CSS_CLASS
};
a.getAriaRole = function() {
  return goog.dom.a11y.Role.TAB_LIST
};
a.setStateFromClassName = function(tabBar, className, baseClass) {
  this.locationByClass_ || this.createLocationByClassMap_();
  var location = this.locationByClass_[className];
  location ? tabBar.setLocation(location) : goog.ui.TabBarRenderer.superClass_.setStateFromClassName.call(this, tabBar, className, baseClass)
};
a.getClassNames = function(tabBar) {
  var classNames = goog.ui.TabBarRenderer.superClass_.getClassNames.call(this, tabBar);
  this.classByLocation_ || this.createClassByLocationMap_();
  classNames.push(this.classByLocation_[tabBar.getLocation()]);
  return classNames
};
a.createClassByLocationMap_ = function() {
  var baseClass = this.getCssClass();
  this.classByLocation_ = goog.object.create(goog.ui.TabBar.Location.TOP, baseClass + "-top", goog.ui.TabBar.Location.BOTTOM, baseClass + "-bottom", goog.ui.TabBar.Location.START, baseClass + "-start", goog.ui.TabBar.Location.END, baseClass + "-end")
};
a.createLocationByClassMap_ = function() {
  this.classByLocation_ || this.createClassByLocationMap_();
  this.locationByClass_ = goog.object.transpose(this.classByLocation_)
};goog.ui.TabBar = function(opt_location, opt_renderer, opt_domHelper) {
  this.setLocation(opt_location || goog.ui.TabBar.Location.TOP);
  goog.ui.Container.call(this, this.getOrientation(), opt_renderer || goog.ui.TabBarRenderer.getInstance(), opt_domHelper);
  var handler = this.getHandler();
  handler.listen(this, goog.ui.Component.EventType.SELECT, this.handleTabSelect);
  handler.listen(this, goog.ui.Component.EventType.UNSELECT, this.handleTabUnselect);
  handler.listen(this, goog.ui.Component.EventType.DISABLE, this.handleTabDisable);
  handler.listen(this, goog.ui.Component.EventType.HIDE, this.handleTabHide)
};
goog.inherits(goog.ui.TabBar, goog.ui.Container);
goog.ui.TabBar.Location = {TOP:"top", BOTTOM:"bottom", START:"start", END:"end"};
a = goog.ui.TabBar.prototype;
a.autoSelectTabs_ = true;
a.selectedTab_ = null;
a.disposeInternal = function() {
  goog.ui.TabBar.superClass_.disposeInternal.call(this);
  this.selectedTab_ = null
};
a.removeChild = function(tab, opt_unrender) {
  this.deselectIfSelected(tab);
  return goog.ui.TabBar.superClass_.removeChild.call(this, tab, opt_unrender)
};
a.getLocation = function() {
  return this.location_
};
a.setLocation = function(location) {
  this.setOrientation(goog.ui.TabBar.getOrientationFromLocation(location));
  this.location_ = location
};
a.setHighlightedIndexFromKeyEvent = function(index) {
  goog.ui.TabBar.superClass_.setHighlightedIndexFromKeyEvent.call(this, index);
  this.autoSelectTabs_ && this.setSelectedTabIndex(index)
};
a.getSelectedTab = function() {
  return this.selectedTab_
};
a.setSelectedTab = function(tab) {
  if(tab)tab.setSelected(true);
  else this.getSelectedTab() && this.getSelectedTab().setSelected(false)
};
a.setSelectedTabIndex = function(index) {
  this.setSelectedTab(this.getChildAt(index))
};
a.deselectIfSelected = function(tab) {
  if(tab && tab == this.getSelectedTab()) {
    for(var index = this.indexOfChild(tab), i = index - 1;tab = this.getChildAt(i);i--)if(this.isSelectableTab(tab)) {
      this.setSelectedTab(tab);
      return
    }for(var j = index + 1;tab = this.getChildAt(j);j++)if(this.isSelectableTab(tab)) {
      this.setSelectedTab(tab);
      return
    }this.setSelectedTab(null)
  }
};
a.isSelectableTab = function(tab) {
  return tab.isVisible() && tab.isEnabled()
};
a.handleTabSelect = function(e) {
  this.selectedTab_ && this.selectedTab_ != e.target && this.selectedTab_.setSelected(false);
  this.selectedTab_ = e.target
};
a.handleTabUnselect = function(e) {
  if(e.target == this.selectedTab_)this.selectedTab_ = null
};
a.handleTabDisable = function(e) {
  this.deselectIfSelected(e.target)
};
a.handleTabHide = function(e) {
  this.deselectIfSelected(e.target)
};
a.handleFocus = function() {
  this.getHighlighted() || this.setHighlighted(this.getSelectedTab() || this.getChildAt(0))
};
goog.ui.TabBar.getOrientationFromLocation = function(location) {
  return location == goog.ui.TabBar.Location.START || location == goog.ui.TabBar.Location.END ? goog.ui.Container.Orientation.VERTICAL : goog.ui.Container.Orientation.HORIZONTAL
};
goog.ui.registry.setDecoratorByClassName(goog.ui.TabBarRenderer.CSS_CLASS, function() {
  return new goog.ui.TabBar
});goog.events.FocusHandler = function(element) {
  this.element_ = element;
  var typeOut = goog.userAgent.IE ? "focusout" : "blur";
  this.listenKeyIn_ = goog.events.listen(this.element_, goog.userAgent.IE ? "focusin" : "focus", this, !goog.userAgent.IE);
  this.listenKeyOut_ = goog.events.listen(this.element_, typeOut, this, !goog.userAgent.IE)
};
goog.inherits(goog.events.FocusHandler, goog.events.EventTarget);
goog.events.FocusHandler.EventType = {FOCUSIN:"focusin", FOCUSOUT:"focusout"};
goog.events.FocusHandler.prototype.handleEvent = function(e) {
  var event = new goog.events.BrowserEvent(e.getBrowserEvent());
  event.type = e.type == "focusin" || e.type == "focus" ? goog.events.FocusHandler.EventType.FOCUSIN : goog.events.FocusHandler.EventType.FOCUSOUT;
  try {
    this.dispatchEvent(event)
  }finally {
    event.dispose()
  }
};
goog.events.FocusHandler.prototype.disposeInternal = function() {
  goog.events.FocusHandler.superClass_.disposeInternal.call(this);
  goog.events.unlistenByKey(this.listenKeyIn_);
  goog.events.unlistenByKey(this.listenKeyOut_);
  delete this.element_
};goog.string.StringBuffer = function(opt_a1) {
  this.buffer_ = goog.userAgent.jscript.HAS_JSCRIPT ? [] : "";
  opt_a1 != null && this.append.apply(this, arguments)
};
goog.string.StringBuffer.prototype.set = function(s) {
  this.clear();
  this.append(s)
};
if(goog.userAgent.jscript.HAS_JSCRIPT) {
  goog.string.StringBuffer.prototype.bufferLength_ = 0;
  goog.string.StringBuffer.prototype.append = function(a1, opt_a2) {
    if(opt_a2 == null)this.buffer_[this.bufferLength_++] = a1;
    else {
      this.buffer_.push.apply(this.buffer_, arguments);
      this.bufferLength_ = this.buffer_.length
    }return this
  }
}else goog.string.StringBuffer.prototype.append = function(a1, opt_a2) {
  this.buffer_ += a1;
  if(opt_a2 != null)for(var i = 1;i < arguments.length;i++)this.buffer_ += arguments[i];
  return this
};
goog.string.StringBuffer.prototype.clear = function() {
  if(goog.userAgent.jscript.HAS_JSCRIPT)this.bufferLength_ = this.buffer_.length = 0;
  else this.buffer_ = ""
};
goog.string.StringBuffer.prototype.toString = function() {
  if(goog.userAgent.jscript.HAS_JSCRIPT) {
    var str = this.buffer_.join("");
    this.clear();
    str && this.append(str);
    return str
  }else return this.buffer_
};goog.ui.tree = {};
goog.ui.tree.BaseNode = function(html, opt_config, opt_domHelper) {
  goog.ui.Component.call(this, opt_domHelper);
  this.config_ = opt_config || goog.ui.tree.TreeControl.defaultConfig;
  this.html_ = html || this.config_.defaultHtml;
  this.clientData_ = null;
  goog.ui.tree.BaseNode.allNodes_[this.getId()] = this
};
goog.inherits(goog.ui.tree.BaseNode, goog.ui.Component);
goog.ui.tree.BaseNode.EventType = {BEFORE_EXPAND:"beforeexpand", EXPAND:"expand", BEFORE_COLLAPSE:"beforecollapse", COLLAPSE:"collapse"};
goog.ui.tree.BaseNode.idPrefix = "tn";
goog.ui.tree.BaseNode.allNodes_ = {};
a = goog.ui.tree.BaseNode.prototype;
a.selected_ = false;
a.expanded_ = false;
a.toolTip_ = null;
a.afterLabelHtml_ = "";
a.isUserCollapsible_ = true;
a.depth_ = -1;
a.disposeInternal = function() {
  goog.ui.tree.BaseNode.superClass_.disposeInternal.call(this);
  if(this.tree_) {
    this.tree_.removeNode(this);
    this.tree_ = null
  }this.setElementInternal(null);
  delete goog.ui.tree.BaseNode.allNodes_[this.getId()]
};
a.initAccessibility = function() {
  var el = this.getElement();
  if(el) {
    var label = this.getLabelElement();
    if(label && !label.id)label.id = this.getId() + ".label";
    goog.dom.a11y.setRole(el, "treeitem");
    goog.dom.a11y.setState(el, "selected", false);
    goog.dom.a11y.setState(el, "expanded", false);
    goog.dom.a11y.setState(el, "level", this.getDepth());
    label && goog.dom.a11y.setState(el, "labelledby", label.id);
    var img = this.getIconElement();
    img && goog.dom.a11y.setRole(img, "presentation");
    var ei = this.getExpandIconElement();
    ei && goog.dom.a11y.setRole(ei, "presentation");
    var ce = this.getChildrenElement();
    goog.dom.a11y.setRole(ce, "group");
    if(ce.hasChildNodes())for(var count = this.getChildCount(), i = 1;i <= count;i++) {
      var child = this.getChildAt(i - 1).getElement();
      goog.dom.a11y.setState(child, "setsize", count);
      goog.dom.a11y.setState(child, "posinset", i)
    }
  }
};
a.createDom = function() {
  var elt;
  if(goog.userAgent.IE) {
    var dummy = this.getDomHelper().createElement("div");
    dummy.style.display = "none";
    document.body.appendChild(dummy);
    var sb = new goog.string.StringBuffer;
    this.toHtml(sb);
    dummy.innerHTML = sb;
    var res = dummy.removeChild(dummy.firstChild);
    document.body.removeChild(dummy);
    elt = res
  }else {
    dummy = this.getDomHelper().createElement("div");
    sb = new goog.string.StringBuffer;
    this.toHtml(sb);
    dummy.innerHTML = sb;
    elt = dummy.removeChild(dummy.firstChild)
  }this.setElementInternal(elt);
  return elt
};
a.enterDocument = function() {
  goog.ui.tree.BaseNode.superClass_.enterDocument.call(this);
  this.initAccessibility()
};
a.add = function(child, opt_before) {
  var oldLast, emptyBefore = this.getChildCount() == 0, parent = child.getParent();
  if(opt_before) {
    if(opt_before.getParent() != this)throw Error("Can only add nodes before siblings");parent != null && parent.remove(child);
    this.addChildAt(child, this.indexOfChild(opt_before))
  }else {
    parent != null && parent.remove(child);
    oldLast = this.getLastChild();
    this.addChild(child)
  }if(opt_before) {
    if(opt_before == this.firstChild_) {
      this.firstChild_ = child;
      child.previousSibling_ = null
    }if(opt_before.previousSibling_) {
      child.previousSibling_ = opt_before.previousSibling_;
      opt_before.previousSibling_.nextSibling_ = child
    }opt_before.previousSibling_ = child;
    child.nextSibling_ = opt_before
  }else {
    if(!this.firstChild_) {
      this.firstChild_ = child;
      child.previousSibling_ = null
    }if(this.lastChild_)this.lastChild_.nextSibling_ = child;
    child.previousSibling_ = this.lastChild_;
    child.nextSibling_ = null;
    this.lastChild_ = child
  }var t = this.getTree();
  t && child.setTreeInternal(t);
  child.setDepth_(this.getDepth() + 1);
  if(this.isInDocument() && !t.getSuspendRedraw()) {
    var el = this.getChildrenElement(), newEl = child.getElement() || child.createDom(), refEl = opt_before ? opt_before.getElement() : null;
    el.insertBefore(newEl, refEl);
    this.isInDocument() && child.enterDocument();
    oldLast && oldLast.updateExpandIcon();
    if(emptyBefore) {
      el.style.display = "";
      this.setExpanded(this.getExpanded());
      t && t.getBehavior() != "classic" && this.updateIcon()
    }
  }return child
};
a.remove = function(child) {
  var tree = this.getTree(), selectedItem = tree ? tree.getSelectedItem() : null;
  if(selectedItem == child || child.contains(selectedItem))if(tree.hasFocus()) {
    this.select();
    goog.Timer.callOnce(this.onTimeoutSelect_, 10, this)
  }else this.select();
  if(child.getParent() != this)throw Error("Can only remove children");this.removeChild(child.getId());
  if(this.lastChild_ == child)this.lastChild_ = child.previousSibling_;
  if(this.firstChild_ == child)this.firstChild_ = child.nextSibling_;
  if(child.previousSibling_)child.previousSibling_.nextSibling_ = child.nextSibling_;
  if(child.nextSibling_)child.nextSibling_.previousSibling_ = child.previousSibling_;
  var wasLast = child.isLastSibling();
  child.tree_ = null;
  child.depth_ = -1;
  if(tree) {
    tree.removeNode(this);
    if(this.isInDocument() && !tree.getSuspendRedraw()) {
      var el = this.getChildrenElement();
      if(child.isInDocument()) {
        var childEl = child.getElement();
        el.removeChild(childEl);
        child.exitDocument()
      }if(wasLast) {
        var newLast = this.getLastChild();
        newLast && newLast.updateExpandIcon()
      }if(!this.hasChildren()) {
        el.style.display = "none";
        this.updateExpandIcon();
        this.updateIcon()
      }
    }
  }return child
};
a.onTimeoutSelect_ = function() {
  this.select()
};
a.getDepth = function() {
  var depth = this.depth_;
  if(depth < 0) {
    depth = this.computeDepth();
    this.setDepth_(depth)
  }return depth
};
a.computeDepth = function() {
  var parent = this.getParent();
  return parent ? parent.getDepth() + 1 : 0
};
a.setDepth_ = function(depth) {
  if(depth != this.depth_) {
    this.depth_ = depth;
    var row = this.getRowElement();
    if(row) {
      var indent = this.getPixelIndent_() + "px";
      if(this.isRightToLeft())row.style.paddingRight = indent;
      else row.style.paddingLeft = indent
    }this.forEachChild(function(child) {
      child.setDepth_(depth + 1)
    })
  }
};
a.contains = function(node) {
  for(;node;) {
    if(node == this)return true;
    node = node.getParent()
  }return false
};
goog.ui.tree.BaseNode.EMPTY_CHILDREN_ = [];
a = goog.ui.tree.BaseNode.prototype;
a.getChildren = function() {
  return this.children_ ? this.children_ : goog.ui.tree.BaseNode.EMPTY_CHILDREN_
};
a.getFirstChild = function() {
  return this.getChildAt(0)
};
a.getLastChild = function() {
  return this.getChildAt(this.getChildCount() - 1)
};
a.getPreviousSibling = function() {
  return this.previousSibling_
};
a.getNextSibling = function() {
  return this.nextSibling_
};
a.isLastSibling = function() {
  return!this.nextSibling_
};
a.isSelected = function() {
  return this.selected_
};
a.select = function() {
  this.setSelected_(true)
};
a.setSelected_ = function() {
  var t = this.getTree();
  t && t.setSelectedItem(this)
};
a.setSelectedInternal_ = function(selected) {
  if(this.selected_ != selected) {
    this.selected_ = selected;
    this.updateRow();
    var tree = this.getTree();
    tree.getBehavior() != "classic" && this.updateIcon();
    var el = this.getElement();
    if(el) {
      goog.dom.a11y.setState(el, "selected", selected);
      selected && goog.dom.a11y.setState(tree.getElement(), "activedescendant", this.getId())
    }
  }
};
a.getExpanded = function() {
  return this.expanded_
};
a.setExpanded = function(b) {
  var isStateChange = b != this.expanded_;
  if(isStateChange)if(!this.dispatchEvent(b ? goog.ui.tree.BaseNode.EventType.BEFORE_EXPAND : goog.ui.tree.BaseNode.EventType.BEFORE_COLLAPSE))return;
  var ce;
  this.expanded_ = b;
  var t = this.getTree(), el = this.getElement();
  if(this.hasChildren()) {
    var si = t ? t.getSelectedItem() : null;
    !b && this.contains(si) && this.select();
    if(el) {
      if(ce = this.getChildrenElement()) {
        ce.style.display = b ? "block" : "none";
        if(b && this.isInDocument() && !ce.hasChildNodes()) {
          var sb = new goog.string.StringBuffer;
          this.forEachChild(function(child) {
            child.toHtml(sb)
          });
          ce.innerHTML = sb.toString();
          this.forEachChild(function(child) {
            child.enterDocument()
          })
        }
      }this.updateExpandIcon()
    }
  }else if(ce = this.getChildrenElement())ce.style.display = "none";
  t && t.getBehavior() == "classic" && this.updateIcon();
  el && goog.dom.a11y.setState(el, "expanded", b);
  if(isStateChange)this.dispatchEvent(b ? goog.ui.tree.BaseNode.EventType.EXPAND : goog.ui.tree.BaseNode.EventType.COLLAPSE)
};
a.toggle = function() {
  this.setExpanded(!this.getExpanded())
};
a.collapse = function() {
  this.setExpanded(false)
};
a.reveal = function() {
  var p = this.getParent();
  if(p) {
    p.setExpanded(true);
    p.reveal()
  }
};
a.toHtml = function(sb) {
  var t = this.getTree(), childClass = !t.getShowLines() || t == this.getParent() && !t.getShowRootLines() ? this.config_.cssChildrenNoLines : this.config_.cssChildren, nonEmptyAndExpanded = this.getExpanded() && this.hasChildren();
  sb.append('<div class="', this.config_.cssItem, '" id="', this.getId(), '">', this.getRowHtml(), '<div class="', childClass, '" style="', this.getLineStyle(), nonEmptyAndExpanded ? "" : "display:none;", '">');
  nonEmptyAndExpanded && this.forEachChild(function(child) {
    child.toHtml(sb)
  });
  sb.append("</div></div>")
};
a.getPixelIndent_ = function() {
  return Math.max(0, (this.getDepth() - 1) * this.config_.indentWidth)
};
a.getRowHtml = function() {
  this.getTree();
  var sb = new goog.string.StringBuffer;
  sb.append('<div class="', this.getRowClassName(), '" style="padding-', this.isRightToLeft() ? "right:" : "left:", this.getPixelIndent_(), 'px">', this.getExpandIconHtml(), this.getIconHtml(), this.getLabelHtml(), "</div>");
  return sb.toString()
};
a.getRowClassName = function() {
  return this.config_.cssTreeRow + (this.isSelected() ? " selected" : "")
};
a.getLabelHtml = function() {
  var toolTip = this.getToolTip();
  this.getTree();
  var sb = new goog.string.StringBuffer;
  sb.append('<span class="', this.config_.cssItemLabel, '" ', toolTip ? ' title="' + goog.string.htmlEscape(toolTip) + '" ' : " ", ">", this.getHtml(), "</span>", "<span>", this.getAfterLabelHtml(), "</span>");
  return sb.toString()
};
a.getAfterLabelHtml = function() {
  return this.afterLabelHtml_
};
a.getIconHtml = function() {
  var iconClass = this.getCalculatedIconClass();
  return iconClass ? goog.string.buildString('<img class="', iconClass, '" src="', this.config_.cleardotPath, '">') : goog.string.buildString('<img style="display:none"', '" src="', this.config_.cleardotPath, '">')
};
a.getExpandIconHtml = function() {
  return goog.string.buildString('<img type="expand" class="', this.getExpandIconClass(), '" src="', this.config_.cleardotPath + '">')
};
a.getExpandIconClass = function() {
  var t = this.getTree(), hideLines = !t.getShowLines() || t == this.getParent() && !t.getShowRootLines(), config = this.config_, sb = new goog.string.StringBuffer;
  sb.append(this.config_.cssTreeIcon, " ", config.cssExpandTreeIcon, " ");
  if(this.hasChildren()) {
    var bits = 0;
    if(t && t.getShowExpandIcons() && this.isUserCollapsible_)bits = this.getExpanded() ? 2 : 1;
    if(t && !hideLines)bits += this.isLastSibling() ? 4 : 8;
    switch(bits) {
      case 1:
        sb.append(config.cssExpandTreeIconPlus);
        break;
      case 2:
        sb.append(config.cssExpandTreeIconMinus);
        break;
      case 4:
        sb.append(config.cssExpandTreeIconL);
        break;
      case 5:
        sb.append(config.cssExpandTreeIconLPlus);
        break;
      case 6:
        sb.append(config.cssExpandTreeIconLMinus);
        break;
      case 8:
        sb.append(config.cssExpandTreeIconT);
        break;
      case 9:
        sb.append(config.cssExpandTreeIconTPlus);
        break;
      case 10:
        sb.append(config.cssExpandTreeIconTMinus);
        break;
      default:
        sb.append(config.cssExpandTreeIconBlank)
    }
  }else if(t && hideLines)sb.append(config.cssExpandTreeIconBlank);
  else this.isLastSibling() ? sb.append(config.cssExpandTreeIconL) : sb.append(config.cssExpandTreeIconT);
  return sb.toString()
};
a.getLineStyle = function() {
  return goog.string.buildString("background-position:", this.getLineStyle2(), ";")
};
a.getLineStyle2 = function() {
  return(this.isLastSibling() ? "-100" : (this.getDepth() - 1) * this.config_.indentWidth) + "px 0"
};
a.getElement = function() {
  var el = goog.ui.tree.BaseNode.superClass_.getElement.call(this);
  if(!el) {
    el = this.getDomHelper().getElement(this.getId());
    this.setElementInternal(el)
  }return el
};
a.getRowElement = function() {
  var el = this.getElement();
  return el ? el.firstChild : null
};
a.getExpandIconElement = function() {
  var el = this.getRowElement();
  return el ? el.firstChild : null
};
a.getIconElement = function() {
  var el = this.getRowElement();
  return el ? el.childNodes[1] : null
};
a.getLabelElement = function() {
  var el = this.getRowElement();
  return el && el.lastChild ? el.lastChild.previousSibling : null
};
a.getChildrenElement = function() {
  var el = this.getElement();
  return el ? el.lastChild : null
};
a.setText = function(s) {
  this.setHtml(goog.string.htmlEscape(s))
};
a.getText = function() {
  return goog.string.unescapeEntities(this.getHtml())
};
a.setHtml = function(s) {
  this.html_ = s;
  var el = this.getLabelElement();
  if(el)el.innerHTML = s;
  var t = this.getTree();
  t && t.setNode(this)
};
a.getHtml = function() {
  return this.html_
};
a.getToolTip = function() {
  return this.toolTip_
};
a.update = function() {
  throw Error("Upate not yet supported");
};
a.updateRow = function() {
  var rowEl = this.getRowElement();
  if(rowEl)rowEl.className = this.getRowClassName()
};
a.updateExpandIcon = function() {
  if(!this.getTree().getSuspendRedraw()) {
    var img = this.getExpandIconElement();
    if(img)img.className = this.getExpandIconClass();
    var cel = this.getChildrenElement();
    if(cel)cel.style.backgroundPosition = this.getLineStyle2()
  }
};
a.updateIcon = function() {
  if(!this.getTree().getSuspendRedraw()) {
    var img = this.getIconElement();
    if(img)img.className = this.getCalculatedIconClass()
  }
};
a.onMouseDown = function(e) {
  if(e.target.getAttribute("type") == "expand" && this.hasChildren())this.isUserCollapsible_ && this.toggle();
  else {
    this.select();
    this.updateRow()
  }
};
a.onClick_ = function(e) {
  e.preventDefault()
};
a.onDoubleClick_ = function(e) {
  e.target.getAttribute("type") == "expand" && this.hasChildren() || this.isUserCollapsible_ && this.toggle()
};
a.onKeyDown_ = function(e) {
  var handled = true, n;
  switch(e.keyCode) {
    case goog.events.KeyCodes.RIGHT:
      if(e.altKey)break;
      if(this.hasChildren())this.getExpanded() ? this.getFirstChild().select() : this.setExpanded(true);
      break;
    case goog.events.KeyCodes.LEFT:
      if(e.altKey)break;
      if(this.hasChildren() && this.getExpanded() && this.isUserCollapsible_)this.setExpanded(false);
      else {
        var p = this.getParent(), t = this.getTree();
        if(p && (t.getShowRootNode() || p != t))p.select()
      }break;
    case goog.events.KeyCodes.DOWN:
      (n = this.getNextShownNode()) && n.select();
      break;
    case goog.events.KeyCodes.UP:
      (n = this.getPreviousShownNode()) && n.select();
      break;
    default:
      handled = false
  }
  if(handled) {
    e.preventDefault();
    (t = this.getTree()) && t.clearTypeAhead()
  }return handled
};
a.onKeyPress_ = function(e) {
  !e.altKey && e.keyCode >= goog.events.KeyCodes.LEFT && e.keyCode <= goog.events.KeyCodes.DOWN && e.preventDefault()
};
a.getLastShownDescendant = function() {
  if(!this.getExpanded() || !this.hasChildren())return this;
  return this.getLastChild().getLastShownDescendant()
};
a.getNextShownNode = function() {
  if(this.hasChildren() && this.getExpanded())return this.getFirstChild();
  else {
    for(var p = this, next;p != null;) {
      next = p.getNextSibling();
      if(next != null)return next;
      p = p.getParent()
    }return null
  }
};
a.getPreviousShownNode = function() {
  var ps = this.getPreviousSibling();
  if(ps != null)return ps.getLastShownDescendant();
  var p = this.getParent(), t = this.getTree();
  if(!t.getShowRootNode() && p == t)return null;
  return p
};
a.getConfig = function() {
  return this.config_
};
a.onTreeAvailable = function() {
  this.getTree().setNode(this)
};
a.setTreeInternal = function(tree) {
  if(this.tree_ != tree) {
    this.tree_ = tree;
    this.onTreeAvailable();
    for(var count = this.getChildCount(), i = 0;i < count;i++)this.getChildAt(i).setTreeInternal(tree)
  }
};goog.ui.tree.TreeNode = function(html, opt_config, opt_domHelper) {
  goog.ui.tree.BaseNode.call(this, html, opt_config, opt_domHelper)
};
goog.inherits(goog.ui.tree.TreeNode, goog.ui.tree.BaseNode);
goog.ui.tree.TreeNode.prototype.tree_ = null;
goog.ui.tree.TreeNode.prototype.getTree = function() {
  if(this.tree_)return this.tree_;
  var parent = this.getParent();
  if(parent) {
    var tree = parent.getTree();
    if(tree) {
      this.setTreeInternal(tree);
      return tree
    }
  }return null
};
goog.ui.tree.TreeNode.prototype.getCalculatedIconClass = function() {
  var config = this.getConfig(), behavior = this.getTree() ? this.getTree().getBehavior() : config.defaultBehavior, expanded = behavior == "classic" && this.getExpanded() || behavior != "classic" && this.isSelected();
  if(expanded && this.expandedIconClass_)return this.expandedIconClass_;
  if(!expanded && this.iconClass_)return this.iconClass_;
  if(this.hasChildren())if(expanded && config.cssExpandedFolderIcon)return config.cssTreeIcon + " " + config.cssExpandedFolderIcon;
  else {
    if(!expanded && config.cssCollapsedFolderIcon)return config.cssTreeIcon + " " + config.cssCollapsedFolderIcon
  }else if(config.cssFileIcon)return config.cssTreeIcon + " " + config.cssFileIcon;
  return""
};goog.structs.Trie = function(opt_trie) {
  this.childNodes_ = {};
  opt_trie && this.setAll(opt_trie)
};
a = goog.structs.Trie.prototype;
a.value_ = undefined;
a.set = function(key, value) {
  this.setOrAdd_(key, value, false)
};
a.add = function(key, value) {
  this.setOrAdd_(key, value, true)
};
a.setOrAdd_ = function(key, value, opt_add) {
  for(var node = this, characterPosition = 0;characterPosition < key.length;characterPosition++) {
    var currentCharacter = key.charAt(characterPosition);
    node.childNodes_[currentCharacter] || (node.childNodes_[currentCharacter] = new goog.structs.Trie);
    node = node.childNodes_[currentCharacter]
  }if(opt_add && node.value_ !== undefined)throw Error('The collection already contains the key "' + key + '"');else node.value_ = value
};
a.setAll = function(trie) {
  for(var keys = goog.structs.getKeys(trie), values = goog.structs.getValues(trie), i = 0;i < keys.length;i++)this.set(keys[i], values[i])
};
a.get = function(key) {
  for(var node = this, characterPosition = 0;characterPosition < key.length;characterPosition++) {
    var currentCharacter = key.charAt(characterPosition);
    if(!node.childNodes_[currentCharacter])return;
    node = node.childNodes_[currentCharacter]
  }return node.value_
};
a.getValues = function() {
  var allValues = [];
  this.getValuesInternal_(allValues);
  return allValues
};
a.getValuesInternal_ = function(allValues) {
  this.value_ !== undefined && allValues.push(this.value_);
  for(var childNode in this.childNodes_)this.childNodes_[childNode].getValuesInternal_(allValues)
};
a.getKeys = function(opt_prefix) {
  var allKeys = [];
  if(opt_prefix) {
    for(var node = this, characterPosition = 0;characterPosition < opt_prefix.length;characterPosition++) {
      var currentCharacter = opt_prefix.charAt(characterPosition);
      if(!node.childNodes_[currentCharacter])return[];
      node = node.childNodes_[currentCharacter]
    }node.getKeysInternal_(opt_prefix, allKeys)
  }else this.getKeysInternal_("", allKeys);
  return allKeys
};
a.getKeysInternal_ = function(keySoFar, allKeys) {
  this.value_ !== undefined && allKeys.push(keySoFar);
  for(var childNode in this.childNodes_)this.childNodes_[childNode].getKeysInternal_(keySoFar + childNode, allKeys)
};
a.containsKey = function(key) {
  return this.get(key) !== undefined
};
a.containsValue = function(value) {
  if(this.value_ === value)return true;
  for(var childNode in this.childNodes_)if(this.childNodes_[childNode].containsValue(value))return true;
  return false
};
a.clear = function() {
  this.childNodes_ = {};
  this.value_ = undefined
};
a.remove = function(key) {
  for(var node = this, parents = [], characterPosition = 0;characterPosition < key.length;characterPosition++) {
    var currentCharacter = key.charAt(characterPosition);
    if(!node.childNodes_[currentCharacter])throw Error('The collection does not have the key "' + key + '"');parents.push([node, currentCharacter]);
    node = node.childNodes_[currentCharacter]
  }var oldValue = node.value_;
  for(delete node.value_;parents.length > 0;) {
    var currentParentAndCharacter = parents.pop(), currentParent = currentParentAndCharacter[0];
    currentCharacter = currentParentAndCharacter[1];
    if(goog.object.isEmpty(currentParent.childNodes_[currentCharacter].childNodes_))delete currentParent.childNodes_[currentCharacter];
    else break
  }return oldValue
};
a.clone = function() {
  return new goog.structs.Trie(this)
};
a.getCount = function() {
  return goog.structs.getCount(this.getValues())
};
a.isEmpty = function() {
  return this.value_ === undefined && goog.structs.isEmpty(this.childNodes_)
};goog.ui.tree.TypeAhead = function() {
  this.nodeMap_ = new goog.structs.Trie
};
a = goog.ui.tree.TypeAhead.prototype;
a.buffer_ = "";
a.matchingLabels_ = null;
a.matchingNodes_ = null;
a.matchingLabelIndex_ = 0;
a.matchingNodeIndex_ = 0;
goog.ui.tree.TypeAhead.Offset = {DOWN:1, UP:-1};
a = goog.ui.tree.TypeAhead.prototype;
a.handleNavigation = function(e) {
  var handled = false;
  switch(e.keyCode) {
    case goog.events.KeyCodes.DOWN:
    ;
    case goog.events.KeyCodes.UP:
      if(e.ctrlKey) {
        this.jumpTo_(e.keyCode == goog.events.KeyCodes.DOWN ? goog.ui.tree.TypeAhead.Offset.DOWN : goog.ui.tree.TypeAhead.Offset.UP);
        handled = true
      }break;
    case goog.events.KeyCodes.BACKSPACE:
      var length = this.buffer_.length - 1;
      handled = true;
      if(length > 0) {
        this.buffer_ = this.buffer_.substring(0, length);
        this.jumpToLabel_(this.buffer_)
      }else if(length == 0)this.buffer_ = "";
      else handled = false;
      break;
    case goog.events.KeyCodes.ESC:
      this.buffer_ = "";
      handled = true;
      break
  }
  return handled
};
a.handleTypeAheadChar = function(e) {
  var handled = false;
  if(!e.ctrlKey && !e.altKey) {
    var ch = String.fromCharCode(e.keyCode).toLowerCase();
    if(goog.string.isUnicodeChar(ch) && (ch != " " || this.buffer_)) {
      this.buffer_ += ch;
      handled = this.jumpToLabel_(this.buffer_)
    }
  }return handled
};
a.setNodeInMap = function(node) {
  var labelText = node.getText();
  if(labelText && !goog.string.isEmptySafe(labelText)) {
    labelText = labelText.toLowerCase();
    var previousValue = this.nodeMap_.get(labelText);
    previousValue ? previousValue.push(node) : this.nodeMap_.set(labelText, [node])
  }
};
a.removeNodeFromMap = function(node) {
  var labelText = node.getText();
  if(labelText && !goog.string.isEmptySafe(labelText)) {
    labelText = labelText.toLowerCase();
    var nodeList = this.nodeMap_.get(labelText);
    if(nodeList) {
      goog.array.remove(nodeList, node);
      nodeList.length && this.nodeMap_.remove(labelText)
    }
  }
};
a.jumpToLabel_ = function(typeAhead) {
  var handled = false, labels = this.nodeMap_.getKeys(typeAhead);
  if(labels && labels.length) {
    this.matchingLabelIndex_ = this.matchingNodeIndex_ = 0;
    if(handled = this.selectMatchingNode_(this.nodeMap_.get(labels[0])))this.matchingLabels_ = labels
  }return handled
};
a.jumpTo_ = function(offset) {
  var handled = false, labels = this.matchingLabels_;
  if(labels) {
    var nodes = null, nodeIndexOutOfRange = false;
    if(this.matchingNodes_) {
      var newNodeIndex = this.matchingNodeIndex_ + offset;
      if(newNodeIndex >= 0 && newNodeIndex < this.matchingNodes_.length) {
        this.matchingNodeIndex_ = newNodeIndex;
        nodes = this.matchingNodes_
      }else nodeIndexOutOfRange = true
    }if(!nodes) {
      var newLabelIndex = this.matchingLabelIndex_ + offset;
      if(newLabelIndex >= 0 && newLabelIndex < labels.length)this.matchingLabelIndex_ = newLabelIndex;
      if(labels.length > this.matchingLabelIndex_)nodes = this.nodeMap_.get(labels[this.matchingLabelIndex_]);
      if(nodes && nodes.length && nodeIndexOutOfRange)this.matchingNodeIndex_ = offset == goog.ui.tree.TypeAhead.Offset.UP ? nodes.length - 1 : 0
    }if(handled = this.selectMatchingNode_(nodes))this.matchingLabels_ = labels
  }return handled
};
a.selectMatchingNode_ = function(nodes) {
  var node;
  if(nodes) {
    if(this.matchingNodeIndex_ < nodes.length) {
      node = nodes[this.matchingNodeIndex_];
      this.matchingNodes_ = nodes
    }if(node) {
      node.reveal();
      node.select()
    }
  }return!!node
};
a.clear = function() {
  this.buffer_ = ""
};goog.ui.tree.TreeControl = function(html, opt_config, opt_domHelper) {
  goog.ui.tree.BaseNode.call(this, html, opt_config, opt_domHelper);
  this.selectedItem_ = this;
  this.typeAhead_ = new goog.ui.tree.TypeAhead;
  if(goog.userAgent.IE && goog.userAgent.isVersion("6"))try {
    document.execCommand("BackgroundImageCache", false, true)
  }catch(e) {
    this.logger_.warning("Failed to enable background image cache")
  }
};
goog.inherits(goog.ui.tree.TreeControl, goog.ui.tree.BaseNode);
a = goog.ui.tree.TreeControl.prototype;
a.keyHandler_ = null;
a.focusHandler_ = null;
a.logger_ = goog.debug.Logger.getLogger("goog.ui.tree.TreeControl");
a.keyEventTarget_ = null;
a.expanded_ = true;
a.selected_ = true;
a.focused_ = false;
a.focusedNode_ = null;
a.showLines_ = true;
a.showExpandIcons_ = true;
a.showRootNode_ = true;
a.showRootLines_ = true;
a.typeAhead_ = null;
a.getTree = function() {
  return this
};
a.getDepth = function() {
  return 0
};
a.reveal = function() {
};
a.handleFocus_ = function() {
  this.focused_ = true;
  goog.dom.classes.add(this.getElement(), "focused");
  this.selectedItem_ && this.selectedItem_.select()
};
a.handleBlur_ = function() {
  this.focused_ = false;
  goog.dom.classes.remove(this.getElement(), "focused")
};
a.hasFocus = function() {
  return this.focused_
};
a.getExpanded = function() {
  return!this.showRootNode_ || goog.ui.tree.TreeControl.superClass_.getExpanded.call(this)
};
a.setExpanded = function(b) {
  if(this.showRootNode_)goog.ui.tree.TreeControl.superClass_.setExpanded.call(this, b);
  else this.expanded_ = b
};
a.getExpandIconHtml = function() {
  return""
};
a.getIconElement = function() {
  var el = this.getRowElement();
  return el ? el.firstChild : null
};
a.getExpandIconElement = function() {
  return null
};
a.updateExpandIcon = function() {
};
a.getRowClassName = function() {
  return goog.ui.tree.TreeControl.superClass_.getRowClassName.call(this) + (this.showRootNode_ ? "" : " " + this.getConfig().cssHideRoot)
};
a.getCalculatedIconClass = function() {
  var config = this.getConfig(), behavior = this.getTree() ? this.getTree().getBehavior() : config.defaultBehavior, expanded = behavior == "classic" && this.getExpanded() || behavior != "classic" && this.isSelected();
  if(expanded && this.expandedIconClass_)return this.expandedIconClass_;
  if(!expanded && this.iconClass_)return this.iconClass_;
  if(expanded && config.cssExpandedRootIcon)return config.cssTreeIcon + " " + config.cssExpandedRootIcon;
  else if(!expanded && config.cssCollapsedRootIcon)return config.cssTreeIcon + " " + config.cssCollapsedRootIcon;
  return""
};
a.setSelectedItem = function(o) {
  if(this.selectedItem_ != o) {
    var hadFocus = false;
    if(this.selectedItem_) {
      hadFocus = this.selectedItem_ == this.focusedNode_;
      this.selectedItem_.setSelectedInternal_(false)
    }if(this.selectedItem_ = o) {
      this.selectedItem_.setSelectedInternal_(true);
      hadFocus && this.selectedItem_.select()
    }this.dispatchEvent(goog.events.EventType.CHANGE)
  }
};
a.getSelectedItem = function() {
  return this.selectedItem_
};
a.getBehavior = function() {
  return this.getConfig().defaultBehavior
};
a.getShowLines = function() {
  return this.showLines_
};
a.getShowRootLines = function() {
  return this.showRootLines_
};
a.getShowExpandIcons = function() {
  return this.showExpandIcons_
};
a.getShowRootNode = function() {
  return this.showRootNode_
};
a.initAccessibility = function() {
  goog.ui.tree.TreeControl.superClass_.initAccessibility.call(this);
  var elt = this.getElement();
  goog.dom.a11y.setRole(elt, "tree");
  goog.dom.a11y.setState(elt, "labelledby", this.getLabelElement().id)
};
a.createDom = function() {
  var elt = goog.ui.tree.TreeControl.superClass_.createDom.call(this);
  this.keyEventTarget_ = this.keyEventTarget_ || elt;
  return elt
};
a.enterDocument = function() {
  goog.ui.tree.TreeControl.superClass_.enterDocument.call(this);
  var el = this.getElement();
  el.className = this.getConfig().cssRoot;
  el.setAttribute("hideFocus", "true");
  this.attachEvents_();
  this.initAccessibility()
};
a.exitDocument = function() {
  goog.ui.tree.TreeControl.superClass_.exitDocument.call(this);
  this.detachEvents_()
};
a.attachEvents_ = function() {
  var el = this.getElement();
  el.tabIndex = 0;
  var kh = this.keyHandler_ = new goog.events.KeyHandler(el), fh = this.focusHandler_ = new goog.events.FocusHandler(el);
  this.getHandler().listen(fh, goog.events.FocusHandler.EventType.FOCUSOUT, this.handleBlur_).listen(fh, goog.events.FocusHandler.EventType.FOCUSIN, this.handleFocus_).listen(kh, goog.events.KeyHandler.EventType.KEY, this.handleKeyEvent).listen(el, goog.events.EventType.MOUSEDOWN, this.handleMouseEvent_).listen(el, goog.events.EventType.CLICK, this.handleMouseEvent_).listen(el, goog.events.EventType.DBLCLICK, this.handleMouseEvent_)
};
a.detachEvents_ = function() {
  this.keyHandler_.dispose();
  this.keyHandler_ = null;
  this.focusHandler_.dispose();
  this.focusHandler_ = null
};
a.handleMouseEvent_ = function(e) {
  this.logger_.fine("Received event " + e.type);
  var node = this.getNodeFromEvent_(e);
  if(node)switch(e.type) {
    case goog.events.EventType.MOUSEDOWN:
      node.onMouseDown(e);
      break;
    case goog.events.EventType.CLICK:
      node.onClick_(e);
      break;
    case goog.events.EventType.DBLCLICK:
      node.onDoubleClick_(e);
      break
  }
};
a.handleKeyEvent = function(e) {
  var handled = false;
  (handled = this.typeAhead_.handleNavigation(e) || this.selectedItem_ && this.selectedItem_.onKeyDown_(e) || this.typeAhead_.handleTypeAheadChar(e)) && e.preventDefault();
  return handled
};
a.getNodeFromEvent_ = function(e) {
  for(var node = null, target = e.target;target != null;) {
    if(node = goog.ui.tree.BaseNode.allNodes_[target.id])return node;
    if(target == this.getElement())break;
    target = target.parentNode
  }return null
};
a.getSuspendRedraw = function() {
  return this.suspendRedraw
};
a.createNode = function(html) {
  return new goog.ui.tree.TreeNode(html, this.getConfig(), this.getDomHelper())
};
a.setNode = function(node) {
  this.typeAhead_ && this.typeAhead_.setNodeInMap(node)
};
a.removeNode = function(node) {
  this.typeAhead_ && this.typeAhead_.removeNodeFromMap(node)
};
a.clearTypeAhead = function() {
  this.typeAhead_ && this.typeAhead_.clear()
};
goog.ui.tree.TreeControl.defaultConfig = {cleardotPath:"images/cleardot.gif", defaultHtml:"Tree Item", defaultBehavior:"classic", indentWidth:19, cssRoot:"goog-tree-root goog-tree-item", cssHideRoot:"goog-tree-hide-root", cssItem:"goog-tree-item", cssChildren:"goog-tree-children", cssChildrenNoLines:"goog-tree-children-nolines", cssTreeRow:"goog-tree-row", cssItemLabel:"goog-tree-item-label", cssTreeIcon:"goog-tree-icon", cssExpandTreeIcon:"goog-tree-expand-icon", cssExpandTreeIconPlus:"goog-tree-expand-icon-plus", 
cssExpandTreeIconMinus:"goog-tree-expand-icon-minus", cssExpandTreeIconTPlus:"goog-tree-expand-icon-tplus", cssExpandTreeIconTMinus:"goog-tree-expand-icon-tminus", cssExpandTreeIconLPlus:"goog-tree-expand-icon-lplus", cssExpandTreeIconLMinus:"goog-tree-expand-icon-lminus", cssExpandTreeIconT:"goog-tree-expand-icon-t", cssExpandTreeIconL:"goog-tree-expand-icon-l", cssExpandTreeIconBlank:"goog-tree-expand-icon-blank", cssExpandedFolderIcon:"goog-tree-expanded-folder-icon", cssCollapsedFolderIcon:"goog-tree-collapsed-folder-icon", 
cssFileIcon:"goog-tree-file-icon", cssExpandedRootIcon:"goog-tree-expanded-folder-icon", cssCollapsedRootIcon:"goog-tree-collapsed-folder-icon"};goog.positioning = {};
goog.positioning.Corner = {TOP_LEFT:0, TOP_RIGHT:2, BOTTOM_LEFT:1, BOTTOM_RIGHT:3, TOP_START:4, TOP_END:6, BOTTOM_START:5, BOTTOM_END:7};
goog.positioning.CornerBit = {BOTTOM:1, RIGHT:2, FLIP_RTL:4};
goog.positioning.Overflow = {IGNORE:0, ADJUST_X:1, FAIL_X:2, ADJUST_Y:4, FAIL_Y:8, RESIZE_WIDTH:16, RESIZE_HEIGHT:32};
goog.positioning.OverflowStatus = {NONE:0, ADJUSTED_X:1, ADJUSTED_Y:2, WIDTH_ADJUSTED:4, HEIGHT_ADJUSTED:8, FAILED_LEFT:16, FAILED_RIGHT:32, FAILED_TOP:64, FAILED_BOTTOM:128, FAILED_OUTSIDE_VIEWPORT:256};
goog.positioning.OverflowStatus.FAILED = goog.positioning.OverflowStatus.FAILED_LEFT | goog.positioning.OverflowStatus.FAILED_RIGHT | goog.positioning.OverflowStatus.FAILED_TOP | goog.positioning.OverflowStatus.FAILED_BOTTOM | goog.positioning.OverflowStatus.FAILED_OUTSIDE_VIEWPORT;
goog.positioning.positionAtAnchor = function(anchorElement, anchorElementCorner, movableElement, movableElementCorner, opt_offset, opt_margin, opt_overflow, opt_preferredSize) {
  var moveableParentTopLeft, parent = movableElement.offsetParent;
  if(parent) {
    var isBody = parent.tagName == goog.dom.TagName.HTML || parent.tagName == goog.dom.TagName.BODY;
    if(!isBody || goog.style.getComputedPosition(parent) != "static") {
      moveableParentTopLeft = goog.style.getPageOffset(parent);
      isBody || (moveableParentTopLeft = goog.math.Coordinate.difference(moveableParentTopLeft, new goog.math.Coordinate(parent.scrollLeft, parent.scrollTop)))
    }
  }var anchorRect = goog.positioning.getVisiblePart_(anchorElement);
  goog.style.translateRectForAnotherFrame(anchorRect, goog.dom.getDomHelper(anchorElement), goog.dom.getDomHelper(movableElement));
  var corner = goog.positioning.getEffectiveCorner(anchorElement, anchorElementCorner), absolutePos = new goog.math.Coordinate(corner & goog.positioning.CornerBit.RIGHT ? anchorRect.left + anchorRect.width : anchorRect.left, corner & goog.positioning.CornerBit.BOTTOM ? anchorRect.top + anchorRect.height : anchorRect.top);
  if(moveableParentTopLeft)absolutePos = goog.math.Coordinate.difference(absolutePos, moveableParentTopLeft);
  if(opt_offset) {
    absolutePos.x += (corner & goog.positioning.CornerBit.RIGHT ? -1 : 1) * opt_offset.x;
    absolutePos.y += (corner & goog.positioning.CornerBit.BOTTOM ? -1 : 1) * opt_offset.y
  }var viewport;
  if(opt_overflow)if((viewport = goog.style.getVisibleRectForElement(movableElement)) && moveableParentTopLeft) {
    viewport.top = Math.max(0, viewport.top - moveableParentTopLeft.y);
    viewport.right -= moveableParentTopLeft.x;
    viewport.bottom -= moveableParentTopLeft.y;
    viewport.left = Math.max(0, viewport.left - moveableParentTopLeft.x)
  }return goog.positioning.positionAtCoordinate(absolutePos, movableElement, movableElementCorner, opt_margin, viewport, opt_overflow, opt_preferredSize)
};
goog.positioning.getVisiblePart_ = function(el) {
  var rect = goog.style.getBounds(el), visibleBox = goog.style.getVisibleRectForElement(el);
  visibleBox && rect.intersection(goog.math.Rect.createFromBox(visibleBox));
  return rect
};
goog.positioning.positionAtCoordinate = function(absolutePos, movableElement, movableElementCorner, opt_margin, opt_viewport, opt_overflow, opt_preferredSize) {
  absolutePos = absolutePos.clone();
  var status = goog.positioning.OverflowStatus.NONE, corner = goog.positioning.getEffectiveCorner(movableElement, movableElementCorner), elementSize = goog.style.getSize(movableElement), size = opt_preferredSize ? opt_preferredSize.clone() : elementSize;
  if(opt_margin || corner != goog.positioning.Corner.TOP_LEFT) {
    if(corner & goog.positioning.CornerBit.RIGHT)absolutePos.x -= size.width + (opt_margin ? opt_margin.right : 0);
    else if(opt_margin)absolutePos.x += opt_margin.left;
    if(corner & goog.positioning.CornerBit.BOTTOM)absolutePos.y -= size.height + (opt_margin ? opt_margin.bottom : 0);
    else if(opt_margin)absolutePos.y += opt_margin.top
  }if(opt_overflow) {
    status = opt_viewport ? goog.positioning.adjustForViewport(absolutePos, size, opt_viewport, opt_overflow) : goog.positioning.OverflowStatus.FAILED_OUTSIDE_VIEWPORT;
    if(status & goog.positioning.OverflowStatus.FAILED)return status
  }goog.style.setPosition(movableElement, absolutePos);
  goog.math.Size.equals(elementSize, size) || goog.style.setSize(movableElement, size);
  return status
};
goog.positioning.adjustForViewport = function(pos, size, viewport, overflow) {
  var status = goog.positioning.OverflowStatus.NONE;
  if(pos.x < viewport.left && overflow & goog.positioning.Overflow.ADJUST_X) {
    pos.x = viewport.left;
    status |= goog.positioning.OverflowStatus.ADJUSTED_X
  }if(pos.x < viewport.left && pos.x + size.width > viewport.right && overflow & goog.positioning.Overflow.RESIZE_WIDTH) {
    size.width -= pos.x + size.width - viewport.right;
    status |= goog.positioning.OverflowStatus.WIDTH_ADJUSTED
  }if(pos.x + size.width > viewport.right && overflow & goog.positioning.Overflow.ADJUST_X) {
    pos.x = Math.max(viewport.right - size.width, viewport.left);
    status |= goog.positioning.OverflowStatus.ADJUSTED_X
  }if(overflow & goog.positioning.Overflow.FAIL_X)status |= (pos.x < viewport.left ? goog.positioning.OverflowStatus.FAILED_LEFT : 0) | (pos.x + size.width > viewport.right ? goog.positioning.OverflowStatus.FAILED_RIGHT : 0);
  if(pos.y < viewport.top && overflow & goog.positioning.Overflow.ADJUST_Y) {
    pos.y = viewport.top;
    status |= goog.positioning.OverflowStatus.ADJUSTED_Y
  }if(pos.y >= viewport.top && pos.y + size.height > viewport.bottom && overflow & goog.positioning.Overflow.RESIZE_HEIGHT) {
    size.height -= pos.y + size.height - viewport.bottom;
    status |= goog.positioning.OverflowStatus.HEIGHT_ADJUSTED
  }if(pos.y + size.height > viewport.bottom && overflow & goog.positioning.Overflow.ADJUST_Y) {
    pos.y = Math.max(viewport.bottom - size.height, viewport.top);
    status |= goog.positioning.OverflowStatus.ADJUSTED_Y
  }if(overflow & goog.positioning.Overflow.FAIL_Y)status |= (pos.y < viewport.top ? goog.positioning.OverflowStatus.FAILED_TOP : 0) | (pos.y + size.height > viewport.bottom ? goog.positioning.OverflowStatus.FAILED_BOTTOM : 0);
  return status
};
goog.positioning.getEffectiveCorner = function(element, corner) {
  return(corner & goog.positioning.CornerBit.FLIP_RTL && goog.style.isRightToLeft(element) ? corner ^ goog.positioning.CornerBit.RIGHT : corner) & ~goog.positioning.CornerBit.FLIP_RTL
};
goog.positioning.flipCornerHorizontal = function(corner) {
  return corner ^ goog.positioning.CornerBit.RIGHT
};
goog.positioning.flipCornerVertical = function(corner) {
  return corner ^ goog.positioning.CornerBit.BOTTOM
};
goog.positioning.flipCorner = function(corner) {
  return corner ^ goog.positioning.CornerBit.BOTTOM ^ goog.positioning.CornerBit.RIGHT
};goog.positioning.AbstractPosition = function() {
};
goog.positioning.AbstractPosition.prototype.reposition = function() {
};goog.positioning.AnchoredPosition = function(anchorElement, corner) {
  this.element = anchorElement;
  this.corner = corner
};
goog.inherits(goog.positioning.AnchoredPosition, goog.positioning.AbstractPosition);
goog.positioning.AnchoredPosition.prototype.reposition = function(movableElement, movableCorner, opt_margin) {
  goog.positioning.positionAtAnchor(this.element, this.corner, movableElement, movableCorner, undefined, opt_margin)
};goog.positioning.ViewportPosition = function(arg1, opt_arg2) {
  this.coordinate = arg1 instanceof goog.math.Coordinate ? arg1 : new goog.math.Coordinate(arg1, opt_arg2)
};
goog.inherits(goog.positioning.ViewportPosition, goog.positioning.AbstractPosition);
goog.positioning.ViewportPosition.prototype.reposition = function(element, popupCorner, opt_margin, opt_preferredSize) {
  goog.positioning.positionAtAnchor(goog.style.getClientViewportElement(element), goog.positioning.Corner.TOP_LEFT, element, popupCorner, this.coordinate, opt_margin, null, opt_preferredSize)
};goog.positioning.AbsolutePosition = function(arg1, opt_arg2) {
  this.coordinate = arg1 instanceof goog.math.Coordinate ? arg1 : new goog.math.Coordinate(arg1, opt_arg2)
};
goog.inherits(goog.positioning.AbsolutePosition, goog.positioning.AbstractPosition);
goog.positioning.AbsolutePosition.prototype.reposition = function(movableElement, movableCorner, opt_margin, opt_preferredSize) {
  goog.positioning.positionAtCoordinate(this.coordinate, movableElement, movableCorner, opt_margin, null, null, opt_preferredSize)
};goog.positioning.AnchoredViewportPosition = function(anchorElement, corner, opt_adjust) {
  goog.positioning.AnchoredPosition.call(this, anchorElement, corner);
  this.adjust_ = opt_adjust
};
goog.inherits(goog.positioning.AnchoredViewportPosition, goog.positioning.AnchoredPosition);
goog.positioning.AnchoredViewportPosition.prototype.reposition = function(movableElement, movableCorner, opt_margin, opt_preferredSize) {
  var status = goog.positioning.positionAtAnchor(this.element, this.corner, movableElement, movableCorner, null, opt_margin, goog.positioning.Overflow.FAIL_X | goog.positioning.Overflow.FAIL_Y, opt_preferredSize) & goog.positioning.OverflowStatus.FAILED;
  if(status)if(status = goog.positioning.positionAtAnchor(this.element, movableCorner, movableElement, this.corner, null, opt_margin, goog.positioning.Overflow.FAIL_X | goog.positioning.Overflow.FAIL_Y, opt_preferredSize) & goog.positioning.OverflowStatus.FAILED)this.adjust_ ? goog.positioning.positionAtAnchor(this.element, this.corner, movableElement, movableCorner, null, opt_margin, goog.positioning.Overflow.ADJUST_X | goog.positioning.Overflow.ADJUST_Y, opt_preferredSize) : goog.positioning.positionAtAnchor(this.element, 
  this.corner, movableElement, movableCorner, null, opt_margin, goog.positioning.Overflow.IGNORE, opt_preferredSize)
};goog.positioning.ClientPosition = function(arg1, opt_arg2) {
  this.coordinate = arg1 instanceof goog.math.Coordinate ? arg1 : new goog.math.Coordinate(arg1, opt_arg2)
};
goog.inherits(goog.positioning.ClientPosition, goog.positioning.AbstractPosition);
goog.positioning.ClientPosition.prototype.reposition = function(element, popupCorner, opt_margin, opt_preferredSize) {
  var viewportElt = goog.style.getClientViewportElement(element);
  goog.positioning.positionAtAnchor(viewportElt, goog.positioning.Corner.TOP_LEFT, element, popupCorner, new goog.math.Coordinate(this.coordinate.x + viewportElt.scrollLeft, this.coordinate.y + viewportElt.scrollTop), opt_margin, null, opt_preferredSize)
};goog.positioning.ViewportClientPosition = function(arg1, opt_arg2) {
  goog.positioning.ClientPosition.call(this, arg1, opt_arg2)
};
goog.inherits(goog.positioning.ViewportClientPosition, goog.positioning.ClientPosition);
goog.positioning.ViewportClientPosition.prototype.reposition = function(element, popupCorner, opt_margin, opt_preferredSize) {
  var viewportElt = goog.style.getClientViewportElement(element), viewport = goog.style.getVisibleRectForElement(viewportElt), scrollEl = goog.dom.getDomHelper(element).getDocumentScrollElement(), clientPos = new goog.math.Coordinate(this.coordinate.x + scrollEl.scrollLeft, this.coordinate.y + scrollEl.scrollTop), failXY = goog.positioning.Overflow.FAIL_X | goog.positioning.Overflow.FAIL_Y, corner = popupCorner, status = goog.positioning.positionAtCoordinate(clientPos, element, corner, opt_margin, 
  viewport, failXY, opt_preferredSize);
  if((status & goog.positioning.OverflowStatus.FAILED) != 0) {
    if(status & goog.positioning.OverflowStatus.FAILED_LEFT || status & goog.positioning.OverflowStatus.FAILED_RIGHT)corner = goog.positioning.flipCornerHorizontal(corner);
    if(status & goog.positioning.OverflowStatus.FAILED_TOP || status & goog.positioning.OverflowStatus.FAILED_BOTTOM)corner = goog.positioning.flipCornerVertical(corner);
    status = goog.positioning.positionAtCoordinate(clientPos, element, corner, opt_margin, viewport, failXY, opt_preferredSize);
    (status & goog.positioning.OverflowStatus.FAILED) != 0 && goog.positioning.positionAtCoordinate(clientPos, element, popupCorner, opt_margin, viewport, undefined, opt_preferredSize)
  }
};goog.ui.PopupBase = function(opt_element, opt_type) {
  this.handler_ = new goog.events.EventHandler(this);
  this.setElement(opt_element || null);
  opt_type && this.setType(opt_type)
};
goog.inherits(goog.ui.PopupBase, goog.events.EventTarget);
goog.ui.PopupBase.Type = {TOGGLE_DISPLAY:"toggle_display", MOVE_OFFSCREEN:"move_offscreen"};
a = goog.ui.PopupBase.prototype;
a.element_ = null;
a.autoHide_ = true;
a.autoHideRegion_ = null;
a.isVisible_ = false;
a.shouldHideAsync_ = false;
a.lastShowTime_ = -1;
a.lastHideTime_ = -1;
a.hideOnEscape_ = false;
a.enableCrossIframeDismissal_ = true;
a.type_ = goog.ui.PopupBase.Type.TOGGLE_DISPLAY;
goog.ui.PopupBase.EventType = {BEFORE_SHOW:"beforeshow", SHOW:"show", BEFORE_HIDE:"beforehide", HIDE:"hide"};
goog.ui.PopupBase.DEBOUNCE_DELAY_MS = 150;
a = goog.ui.PopupBase.prototype;
a.getType = function() {
  return this.type_
};
a.setType = function(type) {
  this.type_ = type
};
a.getElement = function() {
  return this.element_
};
a.setElement = function(elt) {
  this.ensureNotVisible_();
  this.element_ = elt
};
a.ensureNotVisible_ = function() {
  if(this.isVisible_)throw Error("Can not change this state of the popup while showing.");
};
a.isVisible = function() {
  return this.isVisible_
};
a.setVisible = function(visible) {
  visible ? this.show_() : this.hide_()
};
a.reposition = goog.nullFunction;
a.show_ = function() {
  if(!this.isVisible_)if(this.onBeforeShow()) {
    if(!this.element_)throw Error("Caller must call setElement before trying to show the popup");this.reposition();
    var doc = goog.dom.getOwnerDocument(this.element_);
    this.hideOnEscape_ && this.handler_.listen(doc, goog.events.EventType.KEYDOWN, this.onDocumentKeyDown_, true);
    if(this.autoHide_) {
      this.handler_.listen(doc, goog.events.EventType.MOUSEDOWN, this.onDocumentMouseDown_, true);
      if(goog.userAgent.IE) {
        for(var activeElement = doc.activeElement;activeElement && activeElement.nodeName == "IFRAME";) {
          try {
            var tempDoc = goog.dom.getFrameContentDocument(activeElement)
          }catch(e) {
            break
          }doc = tempDoc;
          activeElement = doc.activeElement
        }this.handler_.listen(doc, goog.events.EventType.MOUSEDOWN, this.onDocumentMouseDown_, true);
        this.handler_.listen(doc, goog.events.EventType.DEACTIVATE, this.onDocumentBlur_)
      }else this.handler_.listen(doc, goog.events.EventType.BLUR, this.onDocumentBlur_)
    }if(this.type_ == goog.ui.PopupBase.Type.TOGGLE_DISPLAY)this.showPopupElement();
    else this.type_ == goog.ui.PopupBase.Type.MOVE_OFFSCREEN && this.reposition();
    this.isVisible_ = true;
    this.onShow_()
  }
};
a.hide_ = function(opt_target) {
  if(!this.isVisible_ || !this.onBeforeHide_(opt_target))return false;
  this.handler_ && this.handler_.removeAll();
  if(this.type_ == goog.ui.PopupBase.Type.TOGGLE_DISPLAY)this.shouldHideAsync_ ? goog.Timer.callOnce(this.hidePopupElement_, 0, this) : this.hidePopupElement_();
  else this.type_ == goog.ui.PopupBase.Type.MOVE_OFFSCREEN && this.moveOffscreen_();
  this.isVisible_ = false;
  this.onHide_(opt_target);
  return true
};
a.showPopupElement = function() {
  this.element_.style.visibility = "visible";
  goog.style.showElement(this.element_, true)
};
a.hidePopupElement_ = function() {
  this.element_.style.visibility = "hidden";
  goog.style.showElement(this.element_, false)
};
a.moveOffscreen_ = function() {
  this.element_.style.left = "-200px";
  this.element_.style.top = "-200px"
};
a.onBeforeShow = function() {
  return this.dispatchEvent(goog.ui.PopupBase.EventType.BEFORE_SHOW)
};
a.onShow_ = function() {
  this.lastShowTime_ = goog.now();
  this.lastHideTime_ = -1;
  this.dispatchEvent(goog.ui.PopupBase.EventType.SHOW)
};
a.onBeforeHide_ = function(opt_target) {
  return this.dispatchEvent({type:goog.ui.PopupBase.EventType.BEFORE_HIDE, target:opt_target})
};
a.onHide_ = function(opt_target) {
  this.lastHideTime_ = goog.now();
  this.dispatchEvent({type:goog.ui.PopupBase.EventType.HIDE, target:opt_target})
};
a.onDocumentMouseDown_ = function(e) {
  var target = e.target;
  if(!goog.dom.contains(this.element_, target) && (!this.autoHideRegion_ || goog.dom.contains(this.autoHideRegion_, target)) && !this.shouldDebounce_())this.hide_(target)
};
a.onDocumentKeyDown_ = function(e) {
  if(e.keyCode == goog.events.KeyCodes.ESC)if(this.hide_(e.target)) {
    e.preventDefault();
    e.stopPropagation()
  }
};
a.onDocumentBlur_ = function(e) {
  if(this.enableCrossIframeDismissal_) {
    var doc = goog.dom.getOwnerDocument(this.element_);
    if(goog.userAgent.IE || goog.userAgent.OPERA) {
      var activeElement = doc.activeElement;
      if(activeElement && goog.dom.contains(this.element_, activeElement))return
    }else if(e.target != doc)return;
    this.shouldDebounce_() || this.hide_()
  }
};
a.shouldDebounce_ = function() {
  return goog.now() - this.lastShowTime_ < goog.ui.PopupBase.DEBOUNCE_DELAY_MS
};
a.disposeInternal = function() {
  goog.ui.PopupBase.superClass_.disposeInternal.call(this);
  this.handler_.dispose();
  delete this.element_;
  delete this.handler_
};goog.ui.Popup = function(opt_element, opt_position) {
  this.popupCorner_ = goog.positioning.Corner.TOP_START;
  this.position_ = opt_position || undefined;
  goog.ui.PopupBase.call(this, opt_element)
};
goog.inherits(goog.ui.Popup, goog.ui.PopupBase);
goog.ui.Popup.Corner = goog.positioning.Corner;
goog.ui.Popup.Overflow = goog.positioning.Overflow;
goog.ui.Popup.prototype.getPosition = function() {
  return this.position_ || null
};
goog.ui.Popup.prototype.setPosition = function(position) {
  this.position_ = position || undefined;
  this.isVisible() && this.reposition()
};
goog.ui.Popup.prototype.reposition = function() {
  if(this.position_) {
    var hideForPositioning = !this.isVisible() && this.getType() != goog.ui.PopupBase.Type.MOVE_OFFSCREEN, el = this.getElement();
    if(hideForPositioning) {
      el.style.visibility = "hidden";
      goog.style.showElement(el, true)
    }this.position_.reposition(el, this.popupCorner_, this.margin_);
    hideForPositioning && goog.style.showElement(el, false)
  }
};
goog.ui.Popup.positionPopup = function(anchorElement, anchorElementCorner, movableElement, movableElementCorner, opt_offset, opt_margin, opt_overflow) {
  return(goog.positioning.positionAtAnchor(anchorElement, anchorElementCorner, movableElement, movableElementCorner, opt_offset, opt_margin, opt_overflow) & goog.positioning.OverflowStatus.FAILED) == 0
};
goog.ui.Popup.positionAtCoordinate = function(absolutePos, movableElement, movableElementCorner, opt_margin) {
  goog.positioning.positionAtCoordinate(absolutePos, movableElement, movableElementCorner, opt_margin);
  return true
};
goog.ui.Popup.AnchoredPosition = goog.positioning.AnchoredPosition;
goog.ui.Popup.AnchoredViewPortPosition = goog.positioning.AnchoredViewportPosition;
goog.ui.Popup.AbsolutePosition = goog.positioning.AbsolutePosition;
goog.ui.Popup.ViewPortPosition = goog.positioning.ViewportPosition;
goog.ui.Popup.ClientPosition = goog.positioning.ClientPosition;
goog.ui.Popup.ViewPortClientPosition = goog.positioning.ViewportClientPosition;goog.ui.Tooltip = function(opt_el, opt_str, opt_domHelper) {
  this.dom_ = opt_domHelper || (opt_el ? goog.dom.getDomHelper(goog.dom.getElement(opt_el)) : goog.dom.getDomHelper());
  goog.ui.Popup.call(this, this.dom_.createDom("div", {style:"position:absolute;display:none;"}));
  this.cursorPosition = new goog.math.Coordinate(1, 1);
  this.activeEl_ = null;
  this.elements_ = new goog.structs.Set;
  opt_el && this.attach(opt_el);
  opt_str != null && this.setText(opt_str)
};
goog.inherits(goog.ui.Tooltip, goog.ui.Popup);
goog.ui.Tooltip.activeInstances_ = [];
goog.ui.Tooltip.prototype.className = "goog-tooltip";
goog.ui.Tooltip.prototype.showDelayMs_ = 500;
goog.ui.Tooltip.prototype.hideDelayMs_ = 0;
goog.ui.Tooltip.State = {INACTIVE:0, WAITING_TO_SHOW:1, SHOWING:2, WAITING_TO_HIDE:3, UPDATING:4};
a = goog.ui.Tooltip.prototype;
a.getDomHelper = function() {
  return this.dom_
};
a.attach = function(el) {
  el = goog.dom.getElement(el);
  this.elements_.add(el);
  goog.events.listen(el, goog.events.EventType.MOUSEOVER, this.handleMouseOver, false, this);
  goog.events.listen(el, goog.events.EventType.MOUSEOUT, this.handleMouseOutAndBlur, false, this);
  goog.events.listen(el, goog.events.EventType.MOUSEMOVE, this.handleMouseMove, false, this);
  goog.events.listen(el, goog.events.EventType.FOCUS, this.handleFocus, false, this);
  goog.events.listen(el, goog.events.EventType.BLUR, this.handleMouseOutAndBlur, false, this)
};
a.detach = function(opt_el) {
  if(opt_el) {
    var el = goog.dom.getElement(opt_el);
    this.detachElement_(el);
    this.elements_.remove(el)
  }else {
    for(var a = this.elements_.getValues(), i = 0;el = a[i];i++)this.detachElement_(el);
    this.elements_.clear()
  }
};
a.detachElement_ = function(el) {
  goog.events.unlisten(el, goog.events.EventType.MOUSEOVER, this.handleMouseOver, false, this);
  goog.events.unlisten(el, goog.events.EventType.MOUSEOUT, this.handleMouseOutAndBlur, false, this);
  goog.events.unlisten(el, goog.events.EventType.MOUSEMOVE, this.handleMouseMove, false, this);
  goog.events.unlisten(el, goog.events.EventType.FOCUS, this.handleFocus, false, this);
  goog.events.unlisten(el, goog.events.EventType.BLUR, this.handleMouseOutAndBlur, false, this)
};
a.getHideDelayMs = function() {
  return this.hideDelayMs_
};
a.setText = function(str) {
  goog.dom.setTextContent(this.getElement(), str)
};
a.setHtml = function(str) {
  this.getElement().innerHTML = str
};
a.setElement = function(el) {
  var oldElement = this.getElement();
  oldElement && goog.dom.removeNode(oldElement);
  goog.ui.Tooltip.superClass_.setElement.call(this, el);
  if(el) {
    var body = this.dom_.getDocument().body;
    body.insertBefore(el, body.lastChild)
  }
};
a.getText = function() {
  return goog.dom.getTextContent(this.getElement())
};
a.getHtml = function() {
  return this.getElement().innerHTML
};
a.getState = function() {
  return this.showTimer ? this.isVisible() ? goog.ui.Tooltip.State.UPDATING : goog.ui.Tooltip.State.WAITING_TO_SHOW : this.hideTimer ? goog.ui.Tooltip.State.WAITING_TO_HIDE : this.isVisible() ? goog.ui.Tooltip.State.SHOWING : goog.ui.Tooltip.State.INACTIVE
};
a.onBeforeShow = function() {
  if(!goog.ui.PopupBase.prototype.onBeforeShow.call(this))return false;
  if(this.anchor)for(var tt, i = 0;tt = goog.ui.Tooltip.activeInstances_[i];i++)goog.dom.contains(tt.getElement(), this.anchor) || tt.setVisible(false);
  goog.array.insert(goog.ui.Tooltip.activeInstances_, this);
  var element = this.getElement();
  element.className = this.className;
  this.clearHideTimer_();
  goog.events.listen(element, goog.events.EventType.MOUSEOVER, this.handleTooltipMouseOver, false, this);
  goog.events.listen(element, goog.events.EventType.MOUSEOUT, this.handleTooltipMouseOut, false, this);
  this.clearShowTimer();
  return true
};
a.onHide_ = function() {
  goog.array.remove(goog.ui.Tooltip.activeInstances_, this);
  for(var element = this.getElement(), tt, i = 0;tt = goog.ui.Tooltip.activeInstances_[i];i++)tt.anchor && goog.dom.contains(element, tt.anchor) && tt.setVisible(false);
  this.parentTooltip_ && this.parentTooltip_.startHideTimer_();
  goog.events.unlisten(element, goog.events.EventType.MOUSEOVER, this.handleTooltipMouseOver, false, this);
  goog.events.unlisten(element, goog.events.EventType.MOUSEOUT, this.handleTooltipMouseOut, false, this);
  this.anchor = undefined;
  if(this.getState() == goog.ui.Tooltip.State.INACTIVE)this.seenInteraction_ = false;
  goog.ui.PopupBase.prototype.onHide_.call(this)
};
a.maybeShow = function(el, opt_pos) {
  if(this.anchor == el)if(this.seenInteraction_ || !this.requireInteraction_) {
    this.setVisible(false);
    this.isVisible() || this.positionAndShow_(el, opt_pos)
  }else this.anchor = undefined;
  this.showTimer = undefined
};
a.positionAndShow_ = function(el, opt_pos) {
  var pos;
  pos = opt_pos ? opt_pos : new goog.ui.Tooltip.CursorTooltipPosition(new goog.math.Coordinate(this.cursorPosition.x, this.cursorPosition.y));
  this.anchor = el;
  this.setPosition(pos);
  this.setVisible(true)
};
a.maybeHide = function(el) {
  this.hideTimer = undefined;
  if(el == this.anchor)if((this.activeEl_ == null || this.activeEl_ != this.getElement() && !this.elements_.contains(this.activeEl_)) && !this.hasActiveChild())this.setVisible(false)
};
a.hasActiveChild = function() {
  return!!(this.childTooltip_ && this.childTooltip_.activeEl_)
};
a.handleMouseOver = function(event) {
  var el = this.getAnchorFromElement(event.target);
  this.activeEl_ = el;
  this.clearHideTimer_();
  if(el != this.anchor) {
    this.anchor = el;
    this.startShowTimer(el);
    this.checkForParentTooltip_()
  }
};
a.getAnchorFromElement = function(el) {
  try {
    for(;el && !this.elements_.contains(el);)el = el.parentNode;
    return el
  }catch(e) {
    return null
  }
};
a.handleMouseMove = function(event) {
  var scroll = this.dom_.getDocumentScroll();
  this.cursorPosition.x = event.clientX + scroll.x;
  this.cursorPosition.y = event.clientY + scroll.y;
  this.seenInteraction_ = true
};
a.handleFocus = function(event) {
  var el = this.getAnchorFromElement(event.target);
  this.activeEl_ = el;
  this.seenInteraction_ = true;
  if(this.anchor != el) {
    this.anchor = el;
    var pos = new goog.ui.Tooltip.ElementTooltipPosition(this.activeEl_);
    this.clearHideTimer_();
    this.startShowTimer(el, pos);
    this.checkForParentTooltip_()
  }
};
a.checkForParentTooltip_ = function() {
  if(this.anchor)for(var tt, i = 0;tt = goog.ui.Tooltip.activeInstances_[i];i++)if(goog.dom.contains(tt.getElement(), this.anchor)) {
    tt.childTooltip_ = this;
    this.parentTooltip_ = tt
  }
};
a.handleMouseOutAndBlur = function(event) {
  var el = this.getAnchorFromElement(event.target), elTo = this.getAnchorFromElement(event.relatedTarget);
  if(el != elTo) {
    if(el == this.activeEl_)this.activeEl_ = null;
    this.clearShowTimer();
    this.seenInteraction_ = false;
    if(this.isVisible() && (!event.relatedTarget || !goog.dom.contains(this.getElement(), event.relatedTarget)))this.startHideTimer_();
    else this.anchor = undefined
  }
};
a.handleTooltipMouseOver = function() {
  var element = this.getElement();
  if(this.activeEl_ != element) {
    this.clearHideTimer_();
    this.activeEl_ = element
  }
};
a.handleTooltipMouseOut = function(event) {
  var element = this.getElement();
  if(this.activeEl_ == element && (!event.relatedTarget || !goog.dom.contains(element, event.relatedTarget))) {
    this.activeEl_ = null;
    this.startHideTimer_()
  }
};
a.startShowTimer = function(el, opt_pos) {
  if(!this.showTimer)this.showTimer = goog.Timer.callOnce(goog.bind(this.maybeShow, this, el, opt_pos), this.showDelayMs_)
};
a.clearShowTimer = function() {
  if(this.showTimer) {
    goog.Timer.clear(this.showTimer);
    this.showTimer = undefined
  }
};
a.startHideTimer_ = function() {
  if(this.getState() == goog.ui.Tooltip.State.SHOWING)this.hideTimer = goog.Timer.callOnce(goog.bind(this.maybeHide, this, this.anchor), this.getHideDelayMs())
};
a.clearHideTimer_ = function() {
  if(this.hideTimer) {
    goog.Timer.clear(this.hideTimer);
    this.hideTimer = undefined
  }
};
a.disposeInternal = function() {
  this.setVisible(false);
  this.clearShowTimer();
  this.detach();
  this.getElement() && goog.dom.removeNode(this.getElement());
  this.activeEl_ = null;
  delete this.dom_;
  goog.ui.Tooltip.superClass_.disposeInternal.call(this)
};
goog.ui.Tooltip.CursorTooltipPosition = function(arg1, opt_arg2) {
  goog.positioning.ViewportPosition.call(this, arg1, opt_arg2)
};
goog.inherits(goog.ui.Tooltip.CursorTooltipPosition, goog.positioning.ViewportPosition);
goog.ui.Tooltip.CursorTooltipPosition.prototype.reposition = function(element, popupCorner, opt_margin) {
  var viewportElt = goog.style.getClientViewportElement(element), viewport = goog.style.getVisibleRectForElement(viewportElt), margin = opt_margin ? new goog.math.Box(opt_margin.top + 10, opt_margin.right, opt_margin.bottom, opt_margin.left + 10) : new goog.math.Box(10, 0, 0, 10);
  goog.positioning.positionAtCoordinate(this.coordinate, element, goog.positioning.Corner.TOP_START, margin, viewport, goog.positioning.Overflow.ADJUST_X | goog.positioning.Overflow.FAIL_Y) & goog.positioning.OverflowStatus.FAILED && goog.positioning.positionAtCoordinate(this.coordinate, element, goog.positioning.Corner.TOP_START, margin, viewport, goog.positioning.Overflow.ADJUST_X | goog.positioning.Overflow.ADJUST_Y)
};
goog.ui.Tooltip.ElementTooltipPosition = function(element) {
  goog.positioning.AnchoredPosition.call(this, element, goog.positioning.Corner.BOTTOM_RIGHT)
};
goog.inherits(goog.ui.Tooltip.ElementTooltipPosition, goog.positioning.AnchoredPosition);
goog.ui.Tooltip.ElementTooltipPosition.prototype.reposition = function(element, popupCorner, opt_margin) {
  var offset = new goog.math.Coordinate(10, 0);
  goog.positioning.positionAtAnchor(this.element, this.corner, element, popupCorner, offset, opt_margin, goog.positioning.Overflow.ADJUST_X | goog.positioning.Overflow.FAIL_Y) & goog.positioning.OverflowStatus.FAILED && goog.positioning.positionAtAnchor(this.element, goog.positioning.Corner.TOP_RIGHT, element, goog.positioning.Corner.BOTTOM_LEFT, offset, opt_margin, goog.positioning.Overflow.ADJUST_X | goog.positioning.Overflow.ADJUST_Y)
};/*
 Copyright (C) 2006 Google Inc.

 Licensed under the Apache License, Version 2.0 (the "License");
 you may not use this file except in compliance with the License.
 You may obtain a copy of the License at

 http://www.apache.org/licenses/LICENSE-2.0

 Unless required by applicable law or agreed to in writing, software
 distributed under the License is distributed on an "AS IS" BASIS,
 WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 See the License for the specific language governing permissions and
 limitations under the License.
*/
window.PR_SHOULD_USE_CONTINUATION = true;
window.PR_TAB_WIDTH = 8;
window.PR_normalizedHtml = window.PR = window.prettyPrintOne = window.prettyPrint = void 0;
window._pr_isIE6 = function() {
  var isIE6 = navigator && navigator.userAgent && /\bMSIE 6\./.test(navigator.userAgent);
  window._pr_isIE6 = function() {
    return isIE6
  };
  return isIE6
};
(function() {
  function textToHtml(str) {
    return str.replace(pr_amp, "&amp;").replace(pr_lt, "&lt;").replace(pr_gt, "&gt;")
  }
  function normalizedHtml(node, out) {
    switch(node.nodeType) {
      case 1:
        var name = node.tagName.toLowerCase();
        out.push("<", name);
        for(var i = 0;i < node.attributes.length;++i) {
          var attr = node.attributes[i];
          if(attr.specified) {
            out.push(" ");
            normalizedHtml(attr, out)
          }
        }out.push(">");
        for(var child = node.firstChild;child;child = child.nextSibling)normalizedHtml(child, out);
        if(node.firstChild || !/^(?:br|link|img)$/.test(name))out.push("</", name, ">");
        break;
      case 2:
        out.push(node.name.toLowerCase(), '="', node.value.replace(pr_amp, "&amp;").replace(pr_lt, "&lt;").replace(pr_gt, "&gt;").replace(pr_quot, "&quot;"), '"');
        break;
      case 3:
      ;
      case 4:
        out.push(textToHtml(node.nodeValue));
        break
    }
  }
  function combinePrefixPatterns(regexs) {
    function decodeEscape(charsetPart) {
      if(charsetPart.charAt(0) !== "\\")return charsetPart.charCodeAt(0);
      switch(charsetPart.charAt(1)) {
        case "b":
          return 8;
        case "t":
          return 9;
        case "n":
          return 10;
        case "v":
          return 11;
        case "f":
          return 12;
        case "r":
          return 13;
        case "u":
        ;
        case "x":
          return parseInt(charsetPart.substring(2), 16) || charsetPart.charCodeAt(1);
        case "0":
        ;
        case "1":
        ;
        case "2":
        ;
        case "3":
        ;
        case "4":
        ;
        case "5":
        ;
        case "6":
        ;
        case "7":
          return parseInt(charsetPart.substring(1), 8);
        default:
          return charsetPart.charCodeAt(1)
      }
    }
    function encodeEscape(charCode) {
      if(charCode < 32)return(charCode < 16 ? "\\x0" : "\\x") + charCode.toString(16);
      var ch = String.fromCharCode(charCode);
      if(ch === "\\" || ch === "-" || ch === "[" || ch === "]")ch = "\\" + ch;
      return ch
    }
    function caseFoldCharset(charSet) {
      for(var charsetParts = charSet.substring(1, charSet.length - 1).match(new RegExp("\\\\u[0-9A-Fa-f]{4}|\\\\x[0-9A-Fa-f]{2}|\\\\[0-3][0-7]{0,2}|\\\\[0-7]{1,2}|\\\\[\\s\\S]|-|[^-\\\\]", "g")), groups = [], ranges = [], inverse = charsetParts[0] === "^", i = inverse ? 1 : 0, n = charsetParts.length;i < n;++i) {
        var p = charsetParts[i];
        switch(p) {
          case "\\B":
          ;
          case "\\b":
          ;
          case "\\D":
          ;
          case "\\d":
          ;
          case "\\S":
          ;
          case "\\s":
          ;
          case "\\W":
          ;
          case "\\w":
            groups.push(p);
            continue
        }
        var start = decodeEscape(p), end;
        if(i + 2 < n && "-" === charsetParts[i + 1]) {
          end = decodeEscape(charsetParts[i + 2]);
          i += 2
        }else end = start;
        ranges.push([start, end]);
        if(!(end < 65 || start > 122)) {
          end < 65 || start > 90 || ranges.push([Math.max(65, start) | 32, Math.min(end, 90) | 32]);
          end < 97 || start > 122 || ranges.push([Math.max(97, start) & -33, Math.min(end, 122) & -33])
        }
      }ranges.sort(function(a, b) {
        return a[0] - b[0] || b[1] - a[1]
      });
      var consolidatedRanges = [], lastRange = [NaN, NaN];
      for(i = 0;i < ranges.length;++i) {
        var range = ranges[i];
        if(range[0] <= lastRange[1] + 1)lastRange[1] = Math.max(lastRange[1], range[1]);
        else consolidatedRanges.push(lastRange = range)
      }var out = ["["];
      inverse && out.push("^");
      out.push.apply(out, groups);
      for(i = 0;i < consolidatedRanges.length;++i) {
        range = consolidatedRanges[i];
        out.push(encodeEscape(range[0]));
        if(range[1] > range[0]) {
          range[1] + 1 > range[0] && out.push("-");
          out.push(encodeEscape(range[1]))
        }
      }out.push("]");
      return out.join("")
    }
    function allowAnywhereFoldCaseAndRenumberGroups(regex) {
      var parts = regex.source.match(new RegExp("(?:\\[(?:[^\\x5C\\x5D]|\\\\[\\s\\S])*\\]|\\\\u[A-Fa-f0-9]{4}|\\\\x[A-Fa-f0-9]{2}|\\\\[0-9]+|\\\\[^ux0-9]|\\(\\?[:!=]|[\\(\\)\\^]|[^\\x5B\\x5C\\(\\)\\^]+)", "g")), n = parts.length, capturedGroups = [], groupIndex, i = 0;
      for(groupIndex = 0;i < n;++i) {
        var p = parts[i];
        if(p === "(")++groupIndex;
        else if("\\" === p.charAt(0)) {
          var decimalValue = +p.substring(1);
          if(decimalValue && decimalValue <= groupIndex)capturedGroups[decimalValue] = -1
        }
      }for(i = 1;i < capturedGroups.length;++i)if(-1 === capturedGroups[i])capturedGroups[i] = ++capturedGroupIndex;
      for(groupIndex = i = 0;i < n;++i) {
        p = parts[i];
        if(p === "(") {
          ++groupIndex;
          if(capturedGroups[groupIndex] === undefined)parts[i] = "(?:"
        }else if("\\" === p.charAt(0))if((decimalValue = +p.substring(1)) && decimalValue <= groupIndex)parts[i] = "\\" + capturedGroups[groupIndex]
      }for(groupIndex = i = 0;i < n;++i)if("^" === parts[i] && "^" !== parts[i + 1])parts[i] = "";
      if(regex.ignoreCase && needToFoldCase)for(i = 0;i < n;++i) {
        p = parts[i];
        var ch0 = p.charAt(0);
        if(p.length >= 2 && ch0 === "[")parts[i] = caseFoldCharset(p);
        else if(ch0 !== "\\")parts[i] = p.replace(/[a-zA-Z]/g, function(ch) {
          var cc = ch.charCodeAt(0);
          return"[" + String.fromCharCode(cc & -33, cc | 32) + "]"
        })
      }return parts.join("")
    }
    for(var capturedGroupIndex = 0, needToFoldCase = false, ignoreCase = false, i = 0, n = regexs.length;i < n;++i) {
      var regex = regexs[i];
      if(regex.ignoreCase)ignoreCase = true;
      else if(/[a-z]/i.test(regex.source.replace(/\\u[0-9a-f]{4}|\\x[0-9a-f]{2}|\\[^ux]/gi, ""))) {
        needToFoldCase = true;
        ignoreCase = false;
        break
      }
    }var rewritten = [];
    i = 0;
    for(n = regexs.length;i < n;++i) {
      regex = regexs[i];
      if(regex.global || regex.multiline)throw new Error("" + regex);rewritten.push("(?:" + allowAnywhereFoldCaseAndRenumberGroups(regex) + ")")
    }return new RegExp(rewritten.join("|"), ignoreCase ? "gi" : "g")
  }
  function makeTabExpander(tabWidth) {
    var charInLine = 0;
    return function(plainText) {
      for(var out = null, pos = 0, i = 0, n = plainText.length;i < n;++i)switch(plainText.charAt(i)) {
        case "\t":
          out || (out = []);
          out.push(plainText.substring(pos, i));
          var nSpaces = tabWidth - charInLine % tabWidth;
          for(charInLine += nSpaces;nSpaces >= 0;nSpaces -= 16)out.push("                ".substring(0, nSpaces));
          pos = i + 1;
          break;
        case "\n":
          charInLine = 0;
          break;
        default:
          ++charInLine
      }if(!out)return plainText;
      out.push(plainText.substring(pos));
      return out.join("")
    }
  }
  function appendDecorations(basePos, sourceCode, langHandler, out) {
    if(sourceCode) {
      var job = {source:sourceCode, basePos:basePos};
      langHandler(job);
      out.push.apply(out, job.decorations)
    }
  }
  function createSimpleLexer(shortcutStylePatterns, fallthroughStylePatterns) {
    var shortcuts = {}, tokenizer;
    (function() {
      for(var allPatterns = shortcutStylePatterns.concat(fallthroughStylePatterns), allRegexs = [], regexKeys = {}, i = 0, n = allPatterns.length;i < n;++i) {
        var patternParts = allPatterns[i], shortcutChars = patternParts[3];
        if(shortcutChars)for(var c = shortcutChars.length;--c >= 0;)shortcuts[shortcutChars.charAt(c)] = patternParts;
        var regex = patternParts[1], k = "" + regex;
        if(!regexKeys.hasOwnProperty(k)) {
          allRegexs.push(regex);
          regexKeys[k] = null
        }
      }allRegexs.push(/[\0-\uffff]/);
      tokenizer = combinePrefixPatterns(allRegexs)
    })();
    var nPatterns = fallthroughStylePatterns.length, decorate = function(job) {
      for(var basePos = job.basePos, decorations = [basePos, "pln"], pos = 0, tokens = job.source.match(tokenizer) || [], styleCache = {}, ti = 0, nTokens = tokens.length;ti < nTokens;++ti) {
        var token = tokens[ti], style = styleCache[token], match, isEmbedded;
        if(typeof style === "string")isEmbedded = false;
        else {
          var patternParts = shortcuts[token.charAt(0)];
          if(patternParts) {
            match = token.match(patternParts[1]);
            style = patternParts[0]
          }else {
            for(var i = 0;i < nPatterns;++i) {
              patternParts = fallthroughStylePatterns[i];
              if(match = token.match(patternParts[1])) {
                style = patternParts[0];
                break
              }
            }match || (style = "pln")
          }if((isEmbedded = style.length >= 5 && "lang-" === style.substring(0, 5)) && !(match && match[1])) {
            isEmbedded = false;
            style = "src"
          }isEmbedded || (styleCache[token] = style)
        }var tokenStart = pos;
        pos += token.length;
        if(isEmbedded) {
          var embeddedSource = match[1], embeddedSourceStart = token.indexOf(embeddedSource), embeddedSourceEnd = embeddedSourceStart + embeddedSource.length, lang = style.substring(5);
          appendDecorations(basePos + tokenStart, token.substring(0, embeddedSourceStart), decorate, decorations);
          appendDecorations(basePos + tokenStart + embeddedSourceStart, embeddedSource, langHandlerForExtension(lang, embeddedSource), decorations);
          appendDecorations(basePos + tokenStart + embeddedSourceEnd, token.substring(embeddedSourceEnd), decorate, decorations)
        }else decorations.push(basePos + tokenStart, style)
      }job.decorations = decorations
    };
    return decorate
  }
  function sourceDecorator(options) {
    var shortcutStylePatterns = [], fallthroughStylePatterns = [];
    if(options.tripleQuotedStrings)shortcutStylePatterns.push(["str", /^(?:\'\'\'(?:[^\'\\]|\\[\s\S]|\'{1,2}(?=[^\']))*(?:\'\'\'|$)|\"\"\"(?:[^\"\\]|\\[\s\S]|\"{1,2}(?=[^\"]))*(?:\"\"\"|$)|\'(?:[^\\\']|\\[\s\S])*(?:\'|$)|\"(?:[^\\\"]|\\[\s\S])*(?:\"|$))/, null, "'\""]);
    else options.multiLineStrings ? shortcutStylePatterns.push(["str", /^(?:\'(?:[^\\\']|\\[\s\S])*(?:\'|$)|\"(?:[^\\\"]|\\[\s\S])*(?:\"|$)|\`(?:[^\\\`]|\\[\s\S])*(?:\`|$))/, null, "'\"`"]) : shortcutStylePatterns.push(["str", /^(?:\'(?:[^\\\'\r\n]|\\.)*(?:\'|$)|\"(?:[^\\\"\r\n]|\\.)*(?:\"|$))/, null, "\"'"]);
    if(options.hashComments)options.cStyleComments ? shortcutStylePatterns.push(["com", /^#(?:[^\r\n\/]|\/(?!\*)|\/\*[^\r\n]*?\*\/)*/, null, "#"]) : shortcutStylePatterns.push(["com", /^#[^\r\n]*/, null, "#"]);
    if(options.cStyleComments) {
      fallthroughStylePatterns.push(["com", /^\/\/[^\r\n]*/, null]);
      fallthroughStylePatterns.push(["com", /^\/\*[\s\S]*?(?:\*\/|$)/, null])
    }options.regexLiterals && fallthroughStylePatterns.push(["lang-regex", new RegExp("^" + REGEXP_PRECEDER_PATTERN + "(/(?=[^/*])(?:[^/\\x5B\\x5C]|\\x5C[\\s\\S]|\\x5B(?:[^\\x5C\\x5D]|\\x5C[\\s\\S])*(?:\\x5D|$))+/)")]);
    var keywords = options.keywords.replace(/^\s+|\s+$/g, "");
    keywords.length && fallthroughStylePatterns.push(["kwd", new RegExp("^(?:" + keywords.replace(/\s+/g, "|") + ")\\b"), null]);
    shortcutStylePatterns.push(["pln", /^\s+/, null, " \r\n\t\u00a0"]);
    fallthroughStylePatterns.push(["lit", /^@[a-z_$][a-z_$@0-9]*/i, null, "@"], ["typ", /^@?[A-Z]+[a-z][A-Za-z_$@0-9]*/, null], ["pln", /^[a-z_$][a-z_$@0-9]*/i, null], ["lit", /^(?:0x[a-f0-9]+|(?:\d(?:_\d+)*\d*(?:\.\d*)?|\.\d\+)(?:e[+\-]?\d+)?)[a-z]*/i, null, "0123456789"], ["pun", /^.[^\s\w\.$@\'\"\`\/\#]*/, null]);
    return createSimpleLexer(shortcutStylePatterns, fallthroughStylePatterns)
  }
  function recombineTagsAndDecorations(job) {
    function emitTextUpTo(sourceIdx) {
      if(sourceIdx > outputIdx) {
        if(openDecoration && openDecoration !== currentDecoration) {
          html.push("</span>");
          openDecoration = null
        }if(!openDecoration && currentDecoration) {
          openDecoration = currentDecoration;
          html.push('<span class="', openDecoration, '">')
        }var htmlChunk = textToHtml(tabExpander(sourceText.substring(outputIdx, sourceIdx))).replace(lastWasSpace ? startOrSpaceRe : adjacentSpaceRe, "$1&nbsp;");
        lastWasSpace = trailingSpaceRe.test(htmlChunk);
        var lineBreakHtml = window._pr_isIE6() ? "&nbsp;<br />" : "<br />";
        html.push(htmlChunk.replace(newlineRe, lineBreakHtml));
        outputIdx = sourceIdx
      }
    }
    for(var sourceText = job.source, extractedTags = job.extractedTags, decorations = job.decorations, html = [], outputIdx = 0, openDecoration = null, currentDecoration = null, tagPos = 0, decPos = 0, tabExpander = makeTabExpander(window.PR_TAB_WIDTH), adjacentSpaceRe = /([\r\n ]) /g, startOrSpaceRe = /(^| ) /gm, newlineRe = /\r\n?|\n/g, trailingSpaceRe = /[ \r\n]$/, lastWasSpace = true;1;)if(tagPos < extractedTags.length ? decPos < decorations.length ? extractedTags[tagPos] <= decorations[decPos] : 
    true : false) {
      emitTextUpTo(extractedTags[tagPos]);
      if(openDecoration) {
        html.push("</span>");
        openDecoration = null
      }html.push(extractedTags[tagPos + 1]);
      tagPos += 2
    }else if(decPos < decorations.length) {
      emitTextUpTo(decorations[decPos]);
      currentDecoration = decorations[decPos + 1];
      decPos += 2
    }else break;
    emitTextUpTo(sourceText.length);
    openDecoration && html.push("</span>");
    job.prettyPrintedHtml = html.join("")
  }
  function registerLangHandler(handler, fileExtensions) {
    for(var i = fileExtensions.length;--i >= 0;) {
      var ext = fileExtensions[i];
      if(langHandlerRegistry.hasOwnProperty(ext))"console" in window && console.warn("cannot override language handler %s", ext);
      else langHandlerRegistry[ext] = handler
    }
  }
  function langHandlerForExtension(extension, source) {
    extension && langHandlerRegistry.hasOwnProperty(extension) || (extension = /^\s*</.test(source) ? "default-markup" : "default-code");
    return langHandlerRegistry[extension]
  }
  function applyDecorator(job) {
    var sourceCodeHtml = job.sourceCodeHtml, opt_langExtension = job.langExtension;
    job.prettyPrintedHtml = sourceCodeHtml;
    try {
      var sourceAndExtractedTags, JSCompiler_inline_matches = sourceCodeHtml.match(pr_chunkPattern), JSCompiler_inline_sourceBuf_15 = [], JSCompiler_inline_sourceBufLen_16 = 0, JSCompiler_inline_extractedTags_17 = [];
      if(JSCompiler_inline_matches)for(var JSCompiler_inline_i = 0, JSCompiler_inline_n = JSCompiler_inline_matches.length;JSCompiler_inline_i < JSCompiler_inline_n;++JSCompiler_inline_i) {
        var JSCompiler_inline_match = JSCompiler_inline_matches[JSCompiler_inline_i];
        if(JSCompiler_inline_match.length > 1 && JSCompiler_inline_match.charAt(0) === "<") {
          if(!pr_commentPrefix.test(JSCompiler_inline_match))if(pr_cdataPrefix.test(JSCompiler_inline_match)) {
            JSCompiler_inline_sourceBuf_15.push(JSCompiler_inline_match.substring(9, JSCompiler_inline_match.length - 3));
            JSCompiler_inline_sourceBufLen_16 += JSCompiler_inline_match.length - 12
          }else if(pr_brPrefix.test(JSCompiler_inline_match)) {
            JSCompiler_inline_sourceBuf_15.push("\n");
            ++JSCompiler_inline_sourceBufLen_16
          }else if(JSCompiler_inline_match.indexOf("nocode") >= 0 && JSCompiler_inline_match.replace(/\s(\w+)\s*=\s*(?:\"([^\"]*)\"|'([^\']*)'|(\S+))/g, ' $1="$2$3$4"').match(/[cC][lL][aA][sS][sS]=\"[^\"]*\bnocode\b/)) {
            var JSCompiler_inline_name = JSCompiler_inline_match.match(pr_tagNameRe)[2], JSCompiler_inline_depth = 1, JSCompiler_inline_j;
            JSCompiler_inline_j = JSCompiler_inline_i + 1;
            a:for(;JSCompiler_inline_j < JSCompiler_inline_n;++JSCompiler_inline_j) {
              var JSCompiler_inline_name2_24 = JSCompiler_inline_matches[JSCompiler_inline_j].match(pr_tagNameRe);
              if(JSCompiler_inline_name2_24 && JSCompiler_inline_name2_24[2] === JSCompiler_inline_name)if(JSCompiler_inline_name2_24[1] === "/") {
                if(--JSCompiler_inline_depth === 0)break a
              }else++JSCompiler_inline_depth
            }if(JSCompiler_inline_j < JSCompiler_inline_n) {
              JSCompiler_inline_extractedTags_17.push(JSCompiler_inline_sourceBufLen_16, JSCompiler_inline_matches.slice(JSCompiler_inline_i, JSCompiler_inline_j + 1).join(""));
              JSCompiler_inline_i = JSCompiler_inline_j
            }else JSCompiler_inline_extractedTags_17.push(JSCompiler_inline_sourceBufLen_16, JSCompiler_inline_match)
          }else JSCompiler_inline_extractedTags_17.push(JSCompiler_inline_sourceBufLen_16, JSCompiler_inline_match)
        }else {
          var JSCompiler_inline_literalText_25;
          var JSCompiler_inline_html = JSCompiler_inline_match, JSCompiler_inline_pos = JSCompiler_inline_html.indexOf("&");
          if(JSCompiler_inline_pos < 0)JSCompiler_inline_literalText_25 = JSCompiler_inline_html;
          else {
            for(--JSCompiler_inline_pos;(JSCompiler_inline_pos = JSCompiler_inline_html.indexOf("&#", JSCompiler_inline_pos + 1)) >= 0;) {
              var JSCompiler_inline_end = JSCompiler_inline_html.indexOf(";", JSCompiler_inline_pos);
              if(JSCompiler_inline_end >= 0) {
                var JSCompiler_inline_num = JSCompiler_inline_html.substring(JSCompiler_inline_pos + 3, JSCompiler_inline_end), JSCompiler_inline_radix_88 = 10;
                if(JSCompiler_inline_num && JSCompiler_inline_num.charAt(0) === "x") {
                  JSCompiler_inline_num = JSCompiler_inline_num.substring(1);
                  JSCompiler_inline_radix_88 = 16
                }var JSCompiler_inline_codePoint_89 = parseInt(JSCompiler_inline_num, JSCompiler_inline_radix_88);
                isNaN(JSCompiler_inline_codePoint_89) || (JSCompiler_inline_html = JSCompiler_inline_html.substring(0, JSCompiler_inline_pos) + String.fromCharCode(JSCompiler_inline_codePoint_89) + JSCompiler_inline_html.substring(JSCompiler_inline_end + 1))
              }
            }JSCompiler_inline_literalText_25 = JSCompiler_inline_html.replace(pr_ltEnt, "<").replace(pr_gtEnt, ">").replace(pr_aposEnt, "'").replace(pr_quotEnt, '"').replace(pr_nbspEnt, " ").replace(pr_ampEnt, "&")
          }JSCompiler_inline_sourceBuf_15.push(JSCompiler_inline_literalText_25);
          JSCompiler_inline_sourceBufLen_16 += JSCompiler_inline_literalText_25.length
        }
      }sourceAndExtractedTags = {source:JSCompiler_inline_sourceBuf_15.join(""), tags:JSCompiler_inline_extractedTags_17};
      var source = sourceAndExtractedTags.source;
      job.source = source;
      job.basePos = 0;
      job.extractedTags = sourceAndExtractedTags.tags;
      langHandlerForExtension(opt_langExtension, source)(job);
      recombineTagsAndDecorations(job)
    }catch(e) {
      if("console" in window) {
        console.log(e);
        console.trace()
      }
    }
  }
  function prettyPrintOne(sourceCodeHtml, opt_langExtension) {
    var job = {sourceCodeHtml:sourceCodeHtml, langExtension:opt_langExtension};
    applyDecorator(job);
    return job.prettyPrintedHtml
  }
  function prettyPrint(opt_whenDone) {
    function doWork() {
      for(var endTime = window.PR_SHOULD_USE_CONTINUATION ? clock.now() + 250 : Infinity;k < elements.length && clock.now() < endTime;k++) {
        var cs = elements[k];
        if(cs.className && cs.className.indexOf("prettyprint") >= 0) {
          var langExtension = cs.className.match(/\blang-(\w+)\b/);
          if(langExtension)langExtension = langExtension[1];
          for(var nested = false, p = cs.parentNode;p;p = p.parentNode)if((p.tagName === "pre" || p.tagName === "code" || p.tagName === "xmp") && p.className && p.className.indexOf("prettyprint") >= 0) {
            nested = true;
            break
          }if(!nested) {
            var content;
            if(null === PR_innerHtmlWorks) {
              var JSCompiler_inline_testNode_33 = document.createElement("PRE");
              JSCompiler_inline_testNode_33.appendChild(document.createTextNode('<!DOCTYPE foo PUBLIC "foo bar">\n<foo />'));
              PR_innerHtmlWorks = !/</.test(JSCompiler_inline_testNode_33.innerHTML)
            }if(PR_innerHtmlWorks) {
              var JSCompiler_inline_content = cs.innerHTML;
              if("XMP" === cs.tagName)JSCompiler_inline_content = textToHtml(JSCompiler_inline_content);
              else {
                var JSCompiler_inline_result_91;
                if("PRE" === cs.tagName)JSCompiler_inline_result_91 = true;
                else if(newlineRe.test(JSCompiler_inline_content)) {
                  var JSCompiler_inline_whitespace_97 = undefined;
                  if(cs.currentStyle)JSCompiler_inline_whitespace_97 = cs.currentStyle.whiteSpace;
                  else if(window.getComputedStyle)JSCompiler_inline_whitespace_97 = window.getComputedStyle(cs, null).whiteSpace;
                  JSCompiler_inline_result_91 = !JSCompiler_inline_whitespace_97 || JSCompiler_inline_whitespace_97 === "pre"
                }else JSCompiler_inline_result_91 = true;
                JSCompiler_inline_result_91 || (JSCompiler_inline_content = JSCompiler_inline_content.replace(/(<br\s*\/?>)[\r\n]+/g, "$1").replace(/(?:[\r\n]+[ \t]*)+/g, " "))
              }content = JSCompiler_inline_content
            }else {
              for(var JSCompiler_inline_out = [], JSCompiler_inline_child = cs.firstChild;JSCompiler_inline_child;JSCompiler_inline_child = JSCompiler_inline_child.nextSibling)normalizedHtml(JSCompiler_inline_child, JSCompiler_inline_out);
              content = JSCompiler_inline_out.join("")
            }content = content.replace(/(?:\r\n?|\n)$/, "");
            prettyPrintingJob = {sourceCodeHtml:content, langExtension:langExtension, sourceNode:cs};
            applyDecorator(prettyPrintingJob);
            var JSCompiler_inline_newContent_46 = prettyPrintingJob.prettyPrintedHtml;
            if(JSCompiler_inline_newContent_46) {
              var JSCompiler_inline_cs = prettyPrintingJob.sourceNode;
              if("XMP" === JSCompiler_inline_cs.tagName) {
                for(var JSCompiler_inline_pre_48 = document.createElement("PRE"), JSCompiler_inline_i = 0;JSCompiler_inline_i < JSCompiler_inline_cs.attributes.length;++JSCompiler_inline_i) {
                  var JSCompiler_inline_a = JSCompiler_inline_cs.attributes[JSCompiler_inline_i];
                  if(JSCompiler_inline_a.specified)if(JSCompiler_inline_a.name.toLowerCase() === "class")JSCompiler_inline_pre_48.className = JSCompiler_inline_a.value;
                  else JSCompiler_inline_pre_48.setAttribute(JSCompiler_inline_a.name, JSCompiler_inline_a.value)
                }JSCompiler_inline_pre_48.innerHTML = JSCompiler_inline_newContent_46;
                JSCompiler_inline_cs.parentNode.replaceChild(JSCompiler_inline_pre_48, JSCompiler_inline_cs);
                JSCompiler_inline_cs = JSCompiler_inline_pre_48
              }else JSCompiler_inline_cs.innerHTML = JSCompiler_inline_newContent_46;
              if(isIE6 && JSCompiler_inline_cs.tagName === "PRE")for(var JSCompiler_inline_lineBreaks_51 = JSCompiler_inline_cs.getElementsByTagName("br"), JSCompiler_inline_j = JSCompiler_inline_lineBreaks_51.length;--JSCompiler_inline_j >= 0;) {
                var JSCompiler_inline_lineBreak_53 = JSCompiler_inline_lineBreaks_51[JSCompiler_inline_j];
                JSCompiler_inline_lineBreak_53.parentNode.replaceChild(document.createTextNode("\r"), JSCompiler_inline_lineBreak_53)
              }
            }
          }
        }
      }if(k < elements.length)setTimeout(doWork, 250);
      else opt_whenDone && opt_whenDone()
    }
    for(var isIE6 = window._pr_isIE6(), codeSegments = [document.getElementsByTagName("pre"), document.getElementsByTagName("code"), document.getElementsByTagName("xmp")], elements = [], i = 0;i < codeSegments.length;++i)for(var j = 0, n = codeSegments[i].length;j < n;++j)elements.push(codeSegments[i][j]);
    codeSegments = null;
    var clock = Date;
    clock.now || (clock = {now:function() {
      return(new Date).getTime()
    }});
    var k = 0, prettyPrintingJob;
    doWork()
  }
  var REGEXP_PRECEDER_PATTERN = function() {
    for(var preceders = ["!", "!=", "!==", "#", "%", "%=", "&", "&&", "&&=", "&=", "(", "*", "*=", "+=", ",", "-=", "->", "/", "/=", ":", "::", ";", "<", "<<", "<<=", "<=", "=", "==", "===", ">", ">=", ">>", ">>=", ">>>", ">>>=", "?", "@", "[", "^", "^=", "^^", "^^=", "{", "|", "|=", "||", "||=", "~", "break", "case", "continue", "delete", "do", "else", "finally", "instanceof", "return", "throw", "try", "typeof"], pattern = "(?:^^|[+-]", i = 0;i < preceders.length;++i)pattern += "|" + preceders[i].replace(/([^=<>:&a-z])/g, 
    "\\$1");
    pattern += ")\\s*";
    return pattern
  }(), pr_amp = /&/g, pr_lt = /</g, pr_gt = />/g, pr_quot = /\"/g, pr_ltEnt = /&lt;/g, pr_gtEnt = /&gt;/g, pr_aposEnt = /&apos;/g, pr_quotEnt = /&quot;/g, pr_ampEnt = /&amp;/g, pr_nbspEnt = /&nbsp;/g, newlineRe = /[\r\n]/g, PR_innerHtmlWorks = null, pr_chunkPattern = new RegExp("[^<]+|<!--[\\s\\S]*?--\>|<!\\[CDATA\\[[\\s\\S]*?\\]\\]>|</?[a-zA-Z](?:[^>\"']|'[^']*'|\"[^\"]*\")*>|<", "g"), pr_commentPrefix = /^<\!--/, pr_cdataPrefix = /^<!\[CDATA\[/, pr_brPrefix = /^<br\b/i, pr_tagNameRe = /^<(\/?)([a-zA-Z][a-zA-Z0-9]*)/, 
  decorateSource = sourceDecorator({keywords:"break continue do else for if return while auto case char const default double enum extern float goto int long register short signed sizeof static struct switch typedef union unsigned void volatile catch class delete false import new operator private protected public this throw true try alignof align_union asm axiom bool concept concept_map const_cast constexpr decltype dynamic_cast explicit export friend inline late_check mutable namespace nullptr reinterpret_cast static_assert static_cast template typeid typename typeof using virtual wchar_t where break continue do else for if return while auto case char const default double enum extern float goto int long register short signed sizeof static struct switch typedef union unsigned void volatile catch class delete false import new operator private protected public this throw true try boolean byte extends final finally implements import instanceof null native package strictfp super synchronized throws transient as base by checked decimal delegate descending event fixed foreach from group implicit in interface internal into is lock object out override orderby params partial readonly ref sbyte sealed stackalloc string select uint ulong unchecked unsafe ushort var break continue do else for if return while auto case char const default double enum extern float goto int long register short signed sizeof static struct switch typedef union unsigned void volatile catch class delete false import new operator private protected public this throw true try debugger eval export function get null set undefined var with Infinity NaN caller delete die do dump elsif eval exit foreach for goto if import last local my next no our print package redo require sub undef unless until use wantarray while BEGIN END break continue do else for if return while and as assert class def del elif except exec finally from global import in is lambda nonlocal not or pass print raise try with yield False True None break continue do else for if return while alias and begin case class def defined elsif end ensure false in module next nil not or redo rescue retry self super then true undef unless until when yield BEGIN END break continue do else for if return while case done elif esac eval fi function in local set then until ", 
  hashComments:true, cStyleComments:true, multiLineStrings:true, regexLiterals:true}), langHandlerRegistry = {};
  registerLangHandler(decorateSource, ["default-code"]);
  registerLangHandler(createSimpleLexer([], [["pln", /^[^<?]+/], ["dec", /^<!\w[^>]*(?:>|$)/], ["com", /^<\!--[\s\S]*?(?:-\->|$)/], ["lang-", /^<\?([\s\S]+?)(?:\?>|$)/], ["lang-", /^<%([\s\S]+?)(?:%>|$)/], ["pun", /^(?:<[%?]|[%?]>)/], ["lang-", /^<xmp\b[^>]*>([\s\S]+?)<\/xmp\b[^>]*>/i], ["lang-js", /^<script\b[^>]*>([\s\S]+?)<\/script\b[^>]*>/i], ["lang-css", /^<style\b[^>]*>([\s\S]+?)<\/style\b[^>]*>/i], ["lang-in.tag", /^(<\/?[a-z][^<>]*>)/i]]), ["default-markup", "htm", "html", "mxml", "xhtml", 
  "xml", "xsl"]);
  registerLangHandler(createSimpleLexer([["pln", /^[\s]+/, null, " \t\r\n"], ["atv", /^(?:\"[^\"]*\"?|\'[^\']*\'?)/, null, "\"'"]], [["tag", /^^<\/?[a-z](?:[\w:-]*\w)?|\/?>$/], ["atn", /^(?!style\b|on)[a-z](?:[\w:-]*\w)?/], ["lang-uq.val", /^=\s*([^>\'\"\s]*(?:[^>\'\"\s\/]|\/(?=\s)))/], ["pun", /^[=<>\/]+/], ["lang-js", /^on\w+\s*=\s*\"([^\"]+)\"/i], ["lang-js", /^on\w+\s*=\s*\'([^\']+)\'/i], ["lang-js", /^on\w+\s*=\s*([^\"\'>\s]+)/i], ["lang-css", /^sty\w+\s*=\s*\"([^\"]+)\"/i], ["lang-css", /^sty\w+\s*=\s*\'([^\']+)\'/i], 
  ["lang-css", /^sty\w+\s*=\s*([^\"\'>\s]+)/i]]), ["in.tag"]);
  registerLangHandler(createSimpleLexer([], [["atv", /^[\s\S]+/]]), ["uq.val"]);
  registerLangHandler(sourceDecorator({keywords:"break continue do else for if return while auto case char const default double enum extern float goto int long register short signed sizeof static struct switch typedef union unsigned void volatile catch class delete false import new operator private protected public this throw true try alignof align_union asm axiom bool concept concept_map const_cast constexpr decltype dynamic_cast explicit export friend inline late_check mutable namespace nullptr reinterpret_cast static_assert static_cast template typeid typename typeof using virtual wchar_t where ", 
  hashComments:true, cStyleComments:true}), ["c", "cc", "cpp", "cxx", "cyc", "m"]);
  registerLangHandler(sourceDecorator({keywords:"null true false"}), ["json"]);
  registerLangHandler(sourceDecorator({keywords:"break continue do else for if return while auto case char const default double enum extern float goto int long register short signed sizeof static struct switch typedef union unsigned void volatile catch class delete false import new operator private protected public this throw true try boolean byte extends final finally implements import instanceof null native package strictfp super synchronized throws transient as base by checked decimal delegate descending event fixed foreach from group implicit in interface internal into is lock object out override orderby params partial readonly ref sbyte sealed stackalloc string select uint ulong unchecked unsafe ushort var ", 
  hashComments:true, cStyleComments:true}), ["cs"]);
  registerLangHandler(sourceDecorator({keywords:"break continue do else for if return while auto case char const default double enum extern float goto int long register short signed sizeof static struct switch typedef union unsigned void volatile catch class delete false import new operator private protected public this throw true try boolean byte extends final finally implements import instanceof null native package strictfp super synchronized throws transient ", cStyleComments:true}), ["java"]);
  registerLangHandler(sourceDecorator({keywords:"break continue do else for if return while case done elif esac eval fi function in local set then until ", hashComments:true, multiLineStrings:true}), ["bsh", "csh", "sh"]);
  registerLangHandler(sourceDecorator({keywords:"break continue do else for if return while and as assert class def del elif except exec finally from global import in is lambda nonlocal not or pass print raise try with yield False True None ", hashComments:true, multiLineStrings:true, tripleQuotedStrings:true}), ["cv", "py"]);
  registerLangHandler(sourceDecorator({keywords:"caller delete die do dump elsif eval exit foreach for goto if import last local my next no our print package redo require sub undef unless until use wantarray while BEGIN END ", hashComments:true, multiLineStrings:true, regexLiterals:true}), ["perl", "pl", "pm"]);
  registerLangHandler(sourceDecorator({keywords:"break continue do else for if return while alias and begin case class def defined elsif end ensure false in module next nil not or redo rescue retry self super then true undef unless until when yield BEGIN END ", hashComments:true, multiLineStrings:true, regexLiterals:true}), ["rb"]);
  registerLangHandler(sourceDecorator({keywords:"break continue do else for if return while auto case char const default double enum extern float goto int long register short signed sizeof static struct switch typedef union unsigned void volatile catch class delete false import new operator private protected public this throw true try debugger eval export function get null set undefined var with Infinity NaN ", cStyleComments:true, regexLiterals:true}), ["js"]);
  registerLangHandler(createSimpleLexer([], [["str", /^[\s\S]+/]]), ["regex"]);
  window.PR_normalizedHtml = normalizedHtml;
  window.prettyPrintOne = prettyPrintOne;
  window.prettyPrint = prettyPrint;
  window.PR = {combinePrefixPatterns:combinePrefixPatterns, createSimpleLexer:createSimpleLexer, registerLangHandler:registerLangHandler, sourceDecorator:sourceDecorator, PR_ATTRIB_NAME:"atn", PR_ATTRIB_VALUE:"atv", PR_COMMENT:"com", PR_DECLARATION:"dec", PR_KEYWORD:"kwd", PR_LITERAL:"lit", PR_NOCODE:"nocode", PR_PLAIN:"pln", PR_PUNCTUATION:"pun", PR_SOURCE:"src", PR_STRING:"str", PR_TAG:"tag", PR_TYPE:"typ"}
})();/*
 Copyright (C) 2009 Onno Hommes.

 Licensed under the Apache License, Version 2.0 (the "License");
 you may not use this file except in compliance with the License.
 You may obtain a copy of the License at

 http://www.apache.org/licenses/LICENSE-2.0

 Unless required by applicable law or agreed to in writing, software
 distributed under the License is distributed on an "AS IS" BASIS,
 WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 See the License for the specific language governing permissions and
 limitations under the License.
*/
PR.registerLangHandler(PR.createSimpleLexer([[PR.PR_COMMENT, /^#[^\r\n]*/, null, "#"], [PR.PR_PLAIN, /^[\t\n\r \xA0]+/, null, "\t\n\r \u00a0"], [PR.PR_STRING, /^\"(?:[^\"\\]|\\[\s\S])*(?:\"|$)/, null, '"']], [[PR.PR_KEYWORD, /^(?:ADS|AD|AUG|BZF|BZMF|CAE|CAF|CA|CCS|COM|CS|DAS|DCA|DCOM|DCS|DDOUBL|DIM|DOUBLE|DTCB|DTCF|DV|DXCH|EDRUPT|EXTEND|INCR|INDEX|NDX|INHINT|LXCH|MASK|MSK|MP|MSU|NOOP|OVSK|QXCH|RAND|READ|RELINT|RESUME|RETURN|ROR|RXOR|SQUARE|SU|TCR|TCAA|OVSK|TCF|TC|TS|WAND|WOR|WRITE|XCH|XLQ|XXALQ|ZL|ZQ|ADD|ADZ|SUB|SUZ|MPY|MPR|MPZ|DVP|COM|ABS|CLA|CLZ|LDQ|STO|STQ|ALS|LLS|LRS|TRA|TSQ|TMI|TOV|AXT|TIX|DLY|INP|OUT)\s/, 
null], [PR.PR_TYPE, /^(?:-?GENADR|=MINUS|2BCADR|VN|BOF|MM|-?2CADR|-?[1-6]DNADR|ADRES|BBCON|[SE]?BANK\=?|BLOCK|BNKSUM|E?CADR|COUNT\*?|2?DEC\*?|-?DNCHAN|-?DNPTR|EQUALS|ERASE|MEMORY|2?OCT|REMADR|SETLOC|SUBRO|ORG|BSS|BES|SYN|EQU|DEFINE|END)\s/, null], [PR.PR_LITERAL, /^\'(?:-*(?:\w|\\[\x21-\x7e])(?:[\w-]*|\\[\x21-\x7e])[=!?]?)?/], [PR.PR_PLAIN, /^-*(?:[!-z_]|\\[\x21-\x7e])(?:[\w-]*|\\[\x21-\x7e])[=!?]?/i], [PR.PR_PUNCTUATION, /^[^\w\t\n\r \xA0()\"\\\';]+/]]), ["apollo", "agc", "aea"]);/*
 Copyright (C) 2009 Google Inc.

 Licensed under the Apache License, Version 2.0 (the "License");
 you may not use this file except in compliance with the License.
 You may obtain a copy of the License at

 http://www.apache.org/licenses/LICENSE-2.0

 Unless required by applicable law or agreed to in writing, software
 distributed under the License is distributed on an "AS IS" BASIS,
 WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 See the License for the specific language governing permissions and
 limitations under the License.
*/
PR.registerLangHandler(PR.createSimpleLexer([[PR.PR_PLAIN, /^[ \t\r\n\f]+/, null, " \t\r\n\u000c"]], [[PR.PR_STRING, /^\"(?:[^\n\r\f\\\"]|\\(?:\r\n?|\n|\f)|\\[\s\S])*\"/, null], [PR.PR_STRING, /^\'(?:[^\n\r\f\\\']|\\(?:\r\n?|\n|\f)|\\[\s\S])*\'/, null], ["lang-css-str", /^url\(([^\)\"\']*)\)/i], [PR.PR_KEYWORD, /^(?:url|rgb|\!important|@import|@page|@media|@charset|inherit)(?=[^\-\w]|$)/i, null], ["lang-css-kw", /^(-?(?:[_a-z]|(?:\\[0-9a-f]+ ?))(?:[_a-z0-9\-]|\\(?:\\[0-9a-f]+ ?))*)\s*:/i], [PR.PR_COMMENT, 
/^\/\*[^*]*\*+(?:[^\/*][^*]*\*+)*\//], [PR.PR_COMMENT, /^(?:<!--|--\>)/], [PR.PR_LITERAL, /^(?:\d+|\d*\.\d+)(?:%|[a-z]+)?/i], [PR.PR_LITERAL, /^#(?:[0-9a-f]{3}){1,2}/i], [PR.PR_PLAIN, /^-?(?:[_a-z]|(?:\\[\da-f]+ ?))(?:[_a-z\d\-]|\\(?:\\[\da-f]+ ?))*/i], [PR.PR_PUNCTUATION, /^[^\s\w\'\"]+/]]), ["css"]);
PR.registerLangHandler(PR.createSimpleLexer([], [[PR.PR_KEYWORD, /^-?(?:[_a-z]|(?:\\[\da-f]+ ?))(?:[_a-z\d\-]|\\(?:\\[\da-f]+ ?))*/i]]), ["css-kw"]);
PR.registerLangHandler(PR.createSimpleLexer([], [[PR.PR_STRING, /^[^\)\"\']+/]]), ["css-str"]);/*
 Copyright (C) 2009 Google Inc.

 Licensed under the Apache License, Version 2.0 (the "License");
 you may not use this file except in compliance with the License.
 You may obtain a copy of the License at

 http://www.apache.org/licenses/LICENSE-2.0

 Unless required by applicable law or agreed to in writing, software
 distributed under the License is distributed on an "AS IS" BASIS,
 WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 See the License for the specific language governing permissions and
 limitations under the License.
*/
PR.registerLangHandler(PR.createSimpleLexer([[PR.PR_PLAIN, /^[\t\n\x0B\x0C\r ]+/, null, "\t\n\u000b\u000c\r "], [PR.PR_STRING, /^\"(?:[^\"\\\n\x0C\r]|\\[\s\S])*(?:\"|$)/, null, '"'], [PR.PR_STRING, /^\'(?:[^\'\\\n\x0C\r]|\\[^&])\'?/, null, "'"], [PR.PR_LITERAL, /^(?:0o[0-7]+|0x[\da-f]+|\d+(?:\.\d+)?(?:e[+\-]?\d+)?)/i, null, "0123456789"]], [[PR.PR_COMMENT, /^(?:(?:--+(?:[^\r\n\x0C]*)?)|(?:\{-(?:[^-]|-+[^-\}])*-\}))/], [PR.PR_KEYWORD, /^(?:case|class|data|default|deriving|do|else|if|import|in|infix|infixl|infixr|instance|let|module|newtype|of|then|type|where|_)(?=[^a-zA-Z0-9\']|$)/, 
null], [PR.PR_PLAIN, /^(?:[A-Z][\w\']*\.)*[a-zA-Z][\w\']*/], [PR.PR_PUNCTUATION, /^[^\t\n\x0B\x0C\r a-zA-Z0-9\'\"]+/]]), ["hs"]);/*
 Copyright (C) 2008 Google Inc.

 Licensed under the Apache License, Version 2.0 (the "License");
 you may not use this file except in compliance with the License.
 You may obtain a copy of the License at

 http://www.apache.org/licenses/LICENSE-2.0

 Unless required by applicable law or agreed to in writing, software
 distributed under the License is distributed on an "AS IS" BASIS,
 WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 See the License for the specific language governing permissions and
 limitations under the License.
*/
PR.registerLangHandler(PR.createSimpleLexer([["opn", /^\(/, null, "("], ["clo", /^\)/, null, ")"], [PR.PR_COMMENT, /^;[^\r\n]*/, null, ";"], [PR.PR_PLAIN, /^[\t\n\r \xA0]+/, null, "\t\n\r \u00a0"], [PR.PR_STRING, /^\"(?:[^\"\\]|\\[\s\S])*(?:\"|$)/, null, '"']], [[PR.PR_KEYWORD, /^(?:block|c[ad]+r|catch|cons|defun|do|eq|eql|equal|equalp|eval-when|flet|format|go|if|labels|lambda|let|load-time-value|locally|macrolet|multiple-value-call|nil|progn|progv|quote|require|return-from|setq|symbol-macrolet|t|tagbody|the|throw|unwind)\b/, 
null], [PR.PR_LITERAL, /^[+\-]?(?:0x[0-9a-f]+|\d+\/\d+|(?:\.\d+|\d+(?:\.\d*)?)(?:[ed][+\-]?\d+)?)/i], [PR.PR_LITERAL, /^\'(?:-*(?:\w|\\[\x21-\x7e])(?:[\w-]*|\\[\x21-\x7e])[=!?]?)?/], [PR.PR_PLAIN, /^-*(?:[a-z_]|\\[\x21-\x7e])(?:[\w-]*|\\[\x21-\x7e])[=!?]?/i], [PR.PR_PUNCTUATION, /^[^\w\t\n\r \xA0()\"\\\';]+/]]), ["cl", "el", "lisp", "scm"]);/*
 Copyright (C) 2008 Google Inc.

 Licensed under the Apache License, Version 2.0 (the "License");
 you may not use this file except in compliance with the License.
 You may obtain a copy of the License at

 http://www.apache.org/licenses/LICENSE-2.0

 Unless required by applicable law or agreed to in writing, software
 distributed under the License is distributed on an "AS IS" BASIS,
 WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 See the License for the specific language governing permissions and
 limitations under the License.
*/
PR.registerLangHandler(PR.createSimpleLexer([[PR.PR_PLAIN, /^[\t\n\r \xA0]+/, null, "\t\n\r \u00a0"], [PR.PR_STRING, /^(?:\"(?:[^\"\\]|\\[\s\S])*(?:\"|$)|\'(?:[^\'\\]|\\[\s\S])*(?:\'|$))/, null, "\"'"]], [[PR.PR_COMMENT, /^--(?:\[(=*)\[[\s\S]*?(?:\]\1\]|$)|[^\r\n]*)/], [PR.PR_STRING, /^\[(=*)\[[\s\S]*?(?:\]\1\]|$)/], [PR.PR_KEYWORD, /^(?:and|break|do|else|elseif|end|false|for|function|if|in|local|nil|not|or|repeat|return|then|true|until|while)\b/, null], [PR.PR_LITERAL, /^[+-]?(?:0x[\da-f]+|(?:(?:\.\d+|\d+(?:\.\d*)?)(?:e[+\-]?\d+)?))/i], 
[PR.PR_PLAIN, /^[a-z_]\w*/i], [PR.PR_PUNCTUATION, /^[^\w\t\n\r \xA0][^\w\t\n\r \xA0\"\-\+=]*/]]), ["lua"]);/*
 Copyright (C) 2008 Google Inc.

 Licensed under the Apache License, Version 2.0 (the "License");
 you may not use this file except in compliance with the License.
 You may obtain a copy of the License at

 http://www.apache.org/licenses/LICENSE-2.0

 Unless required by applicable law or agreed to in writing, software
 distributed under the License is distributed on an "AS IS" BASIS,
 WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 See the License for the specific language governing permissions and
 limitations under the License.
*/
PR.registerLangHandler(PR.createSimpleLexer([[PR.PR_PLAIN, /^[\t\n\r \xA0]+/, null, "\t\n\r \u00a0"], [PR.PR_COMMENT, /^#(?:if[\t\n\r \xA0]+(?:[a-z_$][\w\']*|``[^\r\n\t`]*(?:``|$))|else|endif|light)/i, null, "#"], [PR.PR_STRING, /^(?:\"(?:[^\"\\]|\\[\s\S])*(?:\"|$)|\'(?:[^\'\\]|\\[\s\S])*(?:\'|$))/, null, "\"'"]], [[PR.PR_COMMENT, /^(?:\/\/[^\r\n]*|\(\*[\s\S]*?\*\))/], [PR.PR_KEYWORD, /^(?:abstract|and|as|assert|begin|class|default|delegate|do|done|downcast|downto|elif|else|end|exception|extern|false|finally|for|fun|function|if|in|inherit|inline|interface|internal|lazy|let|match|member|module|mutable|namespace|new|null|of|open|or|override|private|public|rec|return|static|struct|then|to|true|try|type|upcast|use|val|void|when|while|with|yield|asr|land|lor|lsl|lsr|lxor|mod|sig|atomic|break|checked|component|const|constraint|constructor|continue|eager|event|external|fixed|functor|global|include|method|mixin|object|parallel|process|protected|pure|sealed|trait|virtual|volatile)\b/], 
[PR.PR_LITERAL, /^[+\-]?(?:0x[\da-f]+|(?:(?:\.\d+|\d+(?:\.\d*)?)(?:e[+\-]?\d+)?))/i], [PR.PR_PLAIN, /^(?:[a-z_]\w*[!?#]?|``[^\r\n\t`]*(?:``|$))/i], [PR.PR_PUNCTUATION, /^[^\t\n\r \xA0\"\'\w]+/]]), ["fs", "ml"]);/*
 Copyright (C) 2006 Google Inc.

 Licensed under the Apache License, Version 2.0 (the "License");
 you may not use this file except in compliance with the License.
 You may obtain a copy of the License at

 http://www.apache.org/licenses/LICENSE-2.0

 Unless required by applicable law or agreed to in writing, software
 distributed under the License is distributed on an "AS IS" BASIS,
 WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 See the License for the specific language governing permissions and
 limitations under the License.
*/
PR.registerLangHandler(PR.sourceDecorator({keywords:"bool bytes default double enum extend extensions false fixed32 fixed64 float group import int32 int64 max message option optional package repeated required returns rpc service sfixed32 sfixed64 sint32 sint64 string syntax to true uint32 uint64", cStyleComments:true}), ["proto"]);/*
 Copyright (C) 2008 Google Inc.

 Licensed under the Apache License, Version 2.0 (the "License");
 you may not use this file except in compliance with the License.
 You may obtain a copy of the License at

 http://www.apache.org/licenses/LICENSE-2.0

 Unless required by applicable law or agreed to in writing, software
 distributed under the License is distributed on an "AS IS" BASIS,
 WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 See the License for the specific language governing permissions and
 limitations under the License.
*/
PR.registerLangHandler(PR.createSimpleLexer([[PR.PR_PLAIN, /^[\t\n\r \xA0]+/, null, "\t\n\r \u00a0"], [PR.PR_STRING, /^(?:"(?:[^\"\\]|\\.)*"|'(?:[^\'\\]|\\.)*')/, null, "\"'"]], [[PR.PR_COMMENT, /^(?:--[^\r\n]*|\/\*[\s\S]*?(?:\*\/|$))/], [PR.PR_KEYWORD, /^(?:ADD|ALL|ALTER|AND|ANY|AS|ASC|AUTHORIZATION|BACKUP|BEGIN|BETWEEN|BREAK|BROWSE|BULK|BY|CASCADE|CASE|CHECK|CHECKPOINT|CLOSE|CLUSTERED|COALESCE|COLLATE|COLUMN|COMMIT|COMPUTE|CONSTRAINT|CONTAINS|CONTAINSTABLE|CONTINUE|CONVERT|CREATE|CROSS|CURRENT|CURRENT_DATE|CURRENT_TIME|CURRENT_TIMESTAMP|CURRENT_USER|CURSOR|DATABASE|DBCC|DEALLOCATE|DECLARE|DEFAULT|DELETE|DENY|DESC|DISK|DISTINCT|DISTRIBUTED|DOUBLE|DROP|DUMMY|DUMP|ELSE|END|ERRLVL|ESCAPE|EXCEPT|EXEC|EXECUTE|EXISTS|EXIT|FETCH|FILE|FILLFACTOR|FOR|FOREIGN|FREETEXT|FREETEXTTABLE|FROM|FULL|FUNCTION|GOTO|GRANT|GROUP|HAVING|HOLDLOCK|IDENTITY|IDENTITYCOL|IDENTITY_INSERT|IF|IN|INDEX|INNER|INSERT|INTERSECT|INTO|IS|JOIN|KEY|KILL|LEFT|LIKE|LINENO|LOAD|NATIONAL|NOCHECK|NONCLUSTERED|NOT|NULL|NULLIF|OF|OFF|OFFSETS|ON|OPEN|OPENDATASOURCE|OPENQUERY|OPENROWSET|OPENXML|OPTION|OR|ORDER|OUTER|OVER|PERCENT|PLAN|PRECISION|PRIMARY|PRINT|PROC|PROCEDURE|PUBLIC|RAISERROR|READ|READTEXT|RECONFIGURE|REFERENCES|REPLICATION|RESTORE|RESTRICT|RETURN|REVOKE|RIGHT|ROLLBACK|ROWCOUNT|ROWGUIDCOL|RULE|SAVE|SCHEMA|SELECT|SESSION_USER|SET|SETUSER|SHUTDOWN|SOME|STATISTICS|SYSTEM_USER|TABLE|TEXTSIZE|THEN|TO|TOP|TRAN|TRANSACTION|TRIGGER|TRUNCATE|TSEQUAL|UNION|UNIQUE|UPDATE|UPDATETEXT|USE|USER|VALUES|VARYING|VIEW|WAITFOR|WHEN|WHERE|WHILE|WITH|WRITETEXT)(?=[^\w-]|$)/i, 
null], [PR.PR_LITERAL, /^[+-]?(?:0x[\da-f]+|(?:(?:\.\d+|\d+(?:\.\d*)?)(?:e[+\-]?\d+)?))/i], [PR.PR_PLAIN, /^[a-z_][\w-]*/i], [PR.PR_PUNCTUATION, /^[^\w\t\n\r \xA0]+/]]), ["sql"]);/*
 Copyright (C) 2009 Google Inc.

 Licensed under the Apache License, Version 2.0 (the "License");
 you may not use this file except in compliance with the License.
 You may obtain a copy of the License at

 http://www.apache.org/licenses/LICENSE-2.0

 Unless required by applicable law or agreed to in writing, software
 distributed under the License is distributed on an "AS IS" BASIS,
 WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 See the License for the specific language governing permissions and
 limitations under the License.
*/
PR.registerLangHandler(PR.createSimpleLexer([[PR.PR_PLAIN, /^[\t\n\r \xA0\u2028\u2029]+/, null, "\t\n\r \u00a0\u2028\u2029"], [PR.PR_STRING, /^(?:[\"\u201C\u201D](?:[^\"\u201C\u201D]|[\"\u201C\u201D]{2})(?:[\"\u201C\u201D]c|$)|[\"\u201C\u201D](?:[^\"\u201C\u201D]|[\"\u201C\u201D]{2})*(?:[\"\u201C\u201D]|$))/i, null, '"\u201c\u201d'], [PR.PR_COMMENT, /^[\'\u2018\u2019][^\r\n\u2028\u2029]*/, null, "'\u2018\u2019"]], [[PR.PR_KEYWORD, /^(?:AddHandler|AddressOf|Alias|And|AndAlso|Ansi|As|Assembly|Auto|Boolean|ByRef|Byte|ByVal|Call|Case|Catch|CBool|CByte|CChar|CDate|CDbl|CDec|Char|CInt|Class|CLng|CObj|Const|CShort|CSng|CStr|CType|Date|Decimal|Declare|Default|Delegate|Dim|DirectCast|Do|Double|Each|Else|ElseIf|End|EndIf|Enum|Erase|Error|Event|Exit|Finally|For|Friend|Function|Get|GetType|GoSub|GoTo|Handles|If|Implements|Imports|In|Inherits|Integer|Interface|Is|Let|Lib|Like|Long|Loop|Me|Mod|Module|MustInherit|MustOverride|MyBase|MyClass|Namespace|New|Next|Not|NotInheritable|NotOverridable|Object|On|Option|Optional|Or|OrElse|Overloads|Overridable|Overrides|ParamArray|Preserve|Private|Property|Protected|Public|RaiseEvent|ReadOnly|ReDim|RemoveHandler|Resume|Return|Select|Set|Shadows|Shared|Short|Single|Static|Step|Stop|String|Structure|Sub|SyncLock|Then|Throw|To|Try|TypeOf|Unicode|Until|Variant|Wend|When|While|With|WithEvents|WriteOnly|Xor|EndIf|GoSub|Let|Variant|Wend)\b/i, 
null], [PR.PR_COMMENT, /^REM[^\r\n\u2028\u2029]*/i], [PR.PR_LITERAL, /^(?:True\b|False\b|Nothing\b|\d+(?:E[+\-]?\d+[FRD]?|[FRDSIL])?|(?:&H[0-9A-F]+|&O[0-7]+)[SIL]?|\d*\.\d+(?:E[+\-]?\d+)?[FRD]?|#\s+(?:\d+[\-\/]\d+[\-\/]\d+(?:\s+\d+:\d+(?::\d+)?(\s*(?:AM|PM))?)?|\d+:\d+(?::\d+)?(\s*(?:AM|PM))?)\s+#)/i], [PR.PR_PLAIN, /^(?:(?:[a-z]|_\w)\w*|\[(?:[a-z]|_\w)\w*\])/i], [PR.PR_PUNCTUATION, /^[^\w\t\n\r \"\'\[\]\xA0\u2018\u2019\u201C\u201D\u2028\u2029]+/], [PR.PR_PUNCTUATION, /^(?:\[|\])/]]), ["vb", "vbs"]);/*
 Copyright (C) 2009 Google Inc.

 Licensed under the Apache License, Version 2.0 (the "License");
 you may not use this file except in compliance with the License.
 You may obtain a copy of the License at

 http://www.apache.org/licenses/LICENSE-2.0

 Unless required by applicable law or agreed to in writing, software
 distributed under the License is distributed on an "AS IS" BASIS,
 WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 See the License for the specific language governing permissions and
 limitations under the License.
*/
PR.registerLangHandler(PR.createSimpleLexer([[PR.PR_PLAIN, /^[\t \xA0a-gi-z0-9]+/, null, "\t \u00a0abcdefgijklmnopqrstuvwxyz0123456789"], [PR.PR_PUNCTUATION, /^[=*~\^\[\]]+/, null, "=*~^[]"]], [["lang-wiki.meta", /(?:^^|\r\n?|\n)(#[a-z]+)\b/], [PR.PR_LITERAL, /^(?:[A-Z][a-z][a-z0-9]+[A-Z][a-z][a-zA-Z0-9]+)\b/], ["lang-", /^\{\{\{([\s\S]+?)\}\}\}/], ["lang-", /^`([^\r\n`]+)`/], [PR.PR_STRING, /^https?:\/\/[^\/?#\s]*(?:\/[^?#\s]*)?(?:\?[^#\s]*)?(?:#\S*)?/i], [PR.PR_PLAIN, /^(?:\r\n|[\s\S])[^#=*~^A-Zh\{`\[\r\n]*/]]), 
["wiki"]);
PR.registerLangHandler(PR.createSimpleLexer([[PR.PR_KEYWORD, /^#[a-z]+/i, null, "#"]], []), ["wiki.meta"]);var grokdoc = {};
grokdoc.indexTree = {};
grokdoc.OVERVIEW_CLASS = "entryOverview";
grokdoc.DETAIL_CLASS = "entryDetails";
grokdoc.ENTRY_CLASS = "entry";
grokdoc.SECTION_CLASS = "section";
grokdoc.LEGEND_CLASS = "legend";
grokdoc.LEGEND_KEY_CLASS = "key";
grokdoc.TOGGLELINK_CLASS = "toggleLink";
grokdoc.VIEWDEF_CLASS = "viewdef";
grokdoc.TREE_CLASS = "indexTree";
grokdoc.tippifyAllEntries = function() {
  for(var icons = goog.dom.getElementsByTagNameAndClass("a", grokdoc.VIEWDEF_CLASS), tips = [], i = 0;i < icons.length;i++) {
    var textElt = goog.dom.getNextElementSibling(icons[i]);
    if(textElt) {
      var tooltip = new goog.ui.Tooltip(icons[i]);
      tooltip.setHtml(textElt.innerHTML);
      tips.push(tooltip)
    }
  }return tips
};
grokdoc.zippifyDetails = function(parentElt) {
  for(var allZippies = [], entries = goog.dom.getElementsByTagNameAndClass(null, grokdoc.ENTRY_CLASS, parentElt), i = 0, n = entries.length;i < n;i++) {
    var details = goog.dom.getElementsByTagNameAndClass(null, grokdoc.DETAIL_CLASS, entries[i]);
    if(details[0]) {
      var zip = new goog.ui.AnimatedZippy(entries[i], details[0], false);
      allZippies.push(zip);
      for(var anchors = goog.dom.getElementsByTagNameAndClass("a", null, entries[i]), j = 0, anchor;anchor = anchors[j];j++)goog.events.listen(anchor, "click", function(e) {
        e.stopPropagation()
      })
    }
  }return allZippies
};
grokdoc.zippifyAllDetails = function() {
  for(var sections = goog.dom.getElementsByTagNameAndClass("div", grokdoc.SECTION_CLASS), zippyManagers = [], i = 0;i < sections.length;i++) {
    var zippies = grokdoc.zippifyDetails(sections[i]);
    new grokdoc.SectionManager(false, sections[i], zippies);
    zippyManagers.push()
  }return zippyManagers
};
grokdoc.AugmentedLegend = function(legendElt) {
  this.legendElt_ = legendElt;
  this.containerElt_ = legendElt.parentNode;
  this.checkboxElts_ = {};
  var showTextElt = goog.dom.createElement("strong");
  goog.dom.setTextContent(showTextElt, "Show: ");
  goog.dom.insertSiblingBefore(showTextElt, goog.dom.getFirstElementChild(this.legendElt_));
  this.decorate_()
};
grokdoc.AugmentedLegend.CLASS_NAMES = ["publickey", "protectedkey", "privatekey"];
grokdoc.AugmentedLegend.prototype.decorate_ = function() {
  for(var legendKeys = goog.dom.getElementsByTagNameAndClass("span", grokdoc.LEGEND_KEY_CLASS, this.legendElt_), i = 0, key;key = legendKeys[i];i++) {
    var labelElt = goog.dom.createElement("label"), checkboxContainerElt = goog.dom.createElement("div");
    checkboxContainerElt.className = grokdoc.LEGEND_KEY_CLASS + "-bg";
    var checkboxElt = goog.dom.createElement("input");
    checkboxElt.type = "checkbox";
    var functionType;
    i = 0;
    for(var type;type = grokdoc.AugmentedLegend.CLASS_NAMES[i];i++)if(goog.dom.classes.has(key, type)) {
      functionType = type;
      break
    }goog.dom.classes.add(checkboxContainerElt, functionType);
    checkboxElt.className = functionType;
    checkboxElt.id = functionType + "-cb";
    labelElt.setAttribute("for", checkboxElt.id);
    this.checkboxElts_[functionType] = checkboxElt;
    if(functionType == "publickey")checkboxElt.checked = true;
    else this.setFunctionVisibility_(functionType, false);
    checkboxContainerElt.appendChild(checkboxElt);
    goog.events.listen(checkboxElt, "click", this.checkboxClickHandler_, false, this);
    var keyTextElt = goog.dom.getNextElementSibling(key), tableRowFunctionTypeClass = functionType.replace("key", ""), typeFunctions = goog.dom.getElementsByTagNameAndClass("tr", tableRowFunctionTypeClass, this.containerElt_), newLabelText = document.createTextNode(goog.dom.getTextContent(keyTextElt) + " (" + typeFunctions.length + ")");
    if(typeFunctions.length > 0)for(var functionAndPropertiesTables = goog.dom.getElementsByTagNameAndClass("table", "horiz-rule", this.containerElt_), j = 0, table;table = functionAndPropertiesTables[j];j++) {
      var typeRows = goog.dom.getElementsByTagNameAndClass("tr", tableRowFunctionTypeClass, table);
      if(typeRows.length > 0) {
        var lastRowOfType = typeRows[typeRows.length - 1], row = table.insertRow(lastRowOfType.rowIndex + 1);
        row.className = "funcs-hidden-" + tableRowFunctionTypeClass;
        row.insertCell(0).className = "access";
        var cell = row.insertCell(1);
        cell.className = functionType + "-toggle";
        cell.functionType = functionType;
        cell.setAttribute("colspan", lastRowOfType.cells.length - 1);
        cell.innerHTML = typeRows.length + " hidden " + tableRowFunctionTypeClass + " item" + (typeRows.length > 1 ? "s" : "") + ".";
        goog.events.listen(cell, "click", this.hiddenFunctionTypeRowClickHandler_, false, this)
      }
    }labelElt.appendChild(checkboxContainerElt);
    labelElt.appendChild(newLabelText);
    goog.dom.insertSiblingAfter(labelElt, keyTextElt);
    goog.dom.removeNode(keyTextElt);
    goog.dom.removeNode(key)
  }
};
grokdoc.AugmentedLegend.prototype.hiddenFunctionTypeRowClickHandler_ = function(e) {
  var functionType = e.currentTarget.functionType;
  this.checkboxElts_[functionType].checked = true;
  this.setFunctionVisibility_(functionType, true)
};
grokdoc.AugmentedLegend.prototype.checkboxClickHandler_ = function(e) {
  var checkbox = e.currentTarget;
  this.setFunctionVisibility_(checkbox.className, checkbox.checked)
};
grokdoc.AugmentedLegend.prototype.setFunctionVisibility_ = function(functionType, isVisible) {
  goog.dom.classes.enable(this.containerElt_, "func-hide-" + functionType, !isVisible)
};
grokdoc.SectionManager = function(startOpen, sectionElt, zippies) {
  this.open = startOpen;
  this.zippies = zippies;
  var toggleLinks = goog.dom.getElementsByTagNameAndClass("a", grokdoc.TOGGLELINK_CLASS, sectionElt);
  if(toggleLinks.length > 0) {
    this.toggleElt = toggleLinks[0];
    this.setToggleText();
    goog.events.listen(this.toggleElt, goog.events.EventType.CLICK, this.handleClick, false, this)
  }
};
grokdoc.SectionManager.CLOSEALL_TEXT = "Close all";
grokdoc.SectionManager.OPENALL_TEXT = "Expand all";
grokdoc.SectionManager.prototype.handleClick = function() {
  this.open = !this.open;
  for(var i = 0;i < this.zippies.length;i++)this.zippies[i].setExpanded(this.open);
  this.setToggleText()
};
grokdoc.SectionManager.prototype.setToggleText = function() {
  goog.dom.setTextContent(this.toggleElt, this.open ? grokdoc.SectionManager.CLOSEALL_TEXT : grokdoc.SectionManager.OPENALL_TEXT)
};
grokdoc.IndexDownloader = function() {
  this.xhr_ = new goog.net.XhrIo;
  goog.events.listen(this.xhr_, goog.net.EventType.SUCCESS, this.loadData, false, this);
  this.callbacks_ = []
};
grokdoc.IndexDownloader.prototype.registerCallback = function(f, opt_context) {
  this.callbacks_.push(opt_context ? goog.bind(f, opt_context) : f)
};
grokdoc.IndexDownloader.prototype.send = function(url) {
  this.xhr_.send(url)
};
grokdoc.IndexDownloader.prototype.loadData = function() {
  for(var data = goog.json.unsafeParse(this.xhr_.getResponseText()), i = 0;i < this.callbacks_.length;i++)this.callbacks_[i](data)
};
grokdoc.Selector = function(autocompleteField, opt_maxMatches, opt_blankUrl) {
  this.acElt = autocompleteField;
  this.numToShow = opt_maxMatches || grokdoc.Selector.DEFAULT_MAX_MATCHES;
  this.blankUrl = opt_blankUrl || grokdoc.Selector.DEFAULT_BLANK_URL
};
grokdoc.Selector.DEFAULT_MAX_MATCHES = 25;
grokdoc.Selector.DEFAULT_BLANK_URL = _staticFilePath + "images/blank.gif";
grokdoc.Selector.KIND_TO_SEPARATOR = {"class":".", file:"/"};
grokdoc.Selector.prototype.buildAc = function(tree) {
  this.rows_ = [];
  this.index_ = [];
  this.addSubtree("", tree.typeIndex, []);
  this.addSubtree("", tree.fileIndex, []);
  var ac = new grokdoc.IconifiedAutoComplete(this.rows_, this.acElt, this.blankUrl, false, true);
  ac.setMaxMatches(this.numToShow);
  goog.events.listen(ac, goog.ui.AutoComplete.EventType.UPDATE, this.choiceHandler, false, this)
};
grokdoc.Selector.prototype.addSubtree = function(subtreeName, subtreeData, path) {
  this.addItem(subtreeName, subtreeData, path);
  for(var key in subtreeData[2])this.addSubtree(key, subtreeData[2][key], path.concat(subtreeName))
};
grokdoc.Selector.prototype.addItem = function(itemName, itemData, path) {
  var url = itemData[1];
  if(url) {
    var kind = itemData[0];
    path.shift();
    var pathStr = path.join(grokdoc.Selector.KIND_TO_SEPARATOR[kind]) + grokdoc.Selector.KIND_TO_SEPARATOR[kind], rowData = new grokdoc.AutoCompleteRowData(itemName, pathStr, kind);
    this.index_[rowData.toString()] = url;
    this.rows_.push(rowData)
  }
};
grokdoc.Selector.prototype.choiceHandler = function(e) {
  window.location = this.index_[e.row]
};
grokdoc.AutoCompleteRowData = function(name, pathname, kind) {
  this.name = name;
  this.pathname = pathname;
  this.fullname = this.pathname + this.name;
  this.kind = kind
};
grokdoc.AutoCompleteRowData.prototype.toString = function() {
  return this.fullname
};
grokdoc.AutoCompleteRowData.prototype.getName = function() {
  return this.name
};
grokdoc.AutoCompleteRowData.prototype.getPathname = function() {
  return this.pathname
};
grokdoc.AutoCompleteRowData.prototype.getKind = function() {
  return this.kind
};
grokdoc.IconRowRenderer = function(blankImgUrl) {
  this.blankImg = blankImgUrl
};
grokdoc.IconRowRenderer.DEFAULT_ICON_KIND_CLASS = "gdoc-ac-file-icon";
grokdoc.IconRowRenderer.KIND_ICON_MAP = {"class":"gdoc-ac-class-icon", file:"gdoc-ac-file-icon"};
grokdoc.IconRowRenderer.ICON_CLASS = "goog-tree-icon";
grokdoc.IconRowRenderer.PATH_CLASS = "entryNamespace";
grokdoc.IconRowRenderer.prototype.renderRow = function(row, token, node) {
  var kind = row.data.getKind(), kindCssClass = grokdoc.IconRowRenderer.KIND_ICON_MAP[kind] || grokdoc.IconRowRenderer.DEFAULT_ICON_KIND_CLASS, img = goog.dom.createDom("img", {src:this.blankImg});
  goog.dom.classes.add(img, kindCssClass, grokdoc.IconRowRenderer.ICON_CLASS);
  node.appendChild(img);
  if(kind === "file") {
    var name = goog.dom.createTextNode(row.data.getName() + " "), pathSpan = goog.dom.createDom("span", null, row.data.getPathname());
    goog.dom.classes.add(pathSpan, grokdoc.IconRowRenderer.PATH_CLASS);
    node.appendChild(name);
    node.appendChild(pathSpan)
  }else {
    var content = goog.dom.createTextNode(row.data.toString());
    node.appendChild(content)
  }
};
grokdoc.IconifiedAutoComplete = function(data, input, blankUrl, opt_multi, opt_useSimilar) {
  var matcher = new goog.ui.AutoComplete.ArrayMatcher(data, !opt_useSimilar), renderer = new goog.ui.AutoComplete.Renderer(null, new grokdoc.IconRowRenderer(blankUrl)), inputhandler = new goog.ui.AutoComplete.InputHandler(null, null, !!opt_multi);
  goog.ui.AutoComplete.call(this, matcher, renderer, inputhandler);
  inputhandler.attachAutoComplete(this);
  inputhandler.attachInputs(input)
};
goog.inherits(grokdoc.IconifiedAutoComplete, goog.ui.AutoComplete);
grokdoc.TypedTreeControl = function(html, opt_config, opt_domHelper) {
  var config = opt_config || goog.object.clone(goog.ui.tree.TreeControl.defaultConfig);
  config.cleardotPath = _staticFilePath + "images/cleardot.gif";
  this.current = false;
  goog.ui.tree.TreeControl.call(this, html, config, opt_domHelper)
};
goog.inherits(grokdoc.TypedTreeControl, goog.ui.tree.TreeControl);
grokdoc.TypedTreeControl.prototype.setExpanded = function(expand) {
  grokdoc.TypedTreeControl.superClass_.setExpanded.call(this, expand);
  grokdoc.TypedTreeNode.expandSingleChild(this, expand)
};
grokdoc.TypedTreeControl.prototype.createNode = function(name, html, kind) {
  return new grokdoc.TypedTreeNode(name, html, this.config_, this.dom_, kind)
};
grokdoc.TypedTreeNode = function(name, html, opt_config, opt_domHelper, opt_kind) {
  goog.ui.tree.TreeNode.call(this, html, opt_config, opt_domHelper);
  this.name = name;
  this.type_ = opt_kind
};
goog.inherits(grokdoc.TypedTreeNode, goog.ui.tree.TreeNode);
grokdoc.TypedTreeNode.KIND_ICON_MAP = {"class":"gdoc-tree-class-icon", file:"gdoc-tree-file-icon"};
grokdoc.TypedTreeNode.KIND_LABEL_MAP = {"class":"gdoc-tree-class-label", namespace:"gdoc-tree-namespace-label", file:"gdoc-tree-class-label", folder:"gdoc-tree-namespace-label"};
grokdoc.TypedTreeNode.CURRENT_CLASS = "current";
a = grokdoc.TypedTreeNode.prototype;
a.getName = function() {
  return this.name
};
a.getType = function() {
  return this.type_
};
a.getCalculatedIconClass = function() {
  if(this.type_ in grokdoc.TypedTreeNode.KIND_ICON_MAP)return this.config_.cssTreeIcon + " " + grokdoc.TypedTreeNode.KIND_ICON_MAP[this.type_];
  var behavior = this.getTree() ? this.getTree().getBehavior() : this.config_.defaultBehavior, expanded = behavior == "classic" && this.getExpanded() || behavior != "classic" && this.isSelected();
  if(expanded && this.expandedIconClass_)return this.expandedIconClass_;
  if(!expanded && this.iconClass_)return this.iconClass_;
  if(this.hasChildren())if(expanded && this.config_.cssExpandedFolderIcon)return this.config_.cssTreeIcon + " " + this.config_.cssExpandedFolderIcon;
  else {
    if(!expanded && this.config_.cssCollapsedFolderIcon)return this.config_.cssTreeIcon + " " + this.config_.cssCollapsedFolderIcon
  }else if(this.config_.cssFileIcon)return this.config_.cssTreeIcon + " " + this.config_.cssFileIcon;
  return""
};
a.setExpanded = function(expand) {
  grokdoc.TypedTreeNode.superClass_.setExpanded.call(this, expand);
  grokdoc.TypedTreeNode.expandSingleChild(this, expand)
};
a.isCurrent = function() {
  return this.current
};
a.getRowClassName = function() {
  return this.config_.cssTreeRow + (this.isSelected() ? " selected" : "") + (this.isCurrent() ? " " + grokdoc.TypedTreeNode.CURRENT_CLASS : "")
};
a.getLabelHtml = function() {
  var labelClass = this.config_.cssItemLabel, typeAtt = "";
  if(this.type_ in grokdoc.TypedTreeNode.KIND_LABEL_MAP) {
    labelClass = grokdoc.TypedTreeNode.KIND_LABEL_MAP[this.type_];
    typeAtt = 'type="expand" '
  }var toolTip = this.getToolTip();
  this.getTree();
  var sb = new goog.string.StringBuffer, childCount = this.hasChildren() ? " (" + this.children_.length + ")" : "";
  sb.append("<span ", typeAtt, 'class="', labelClass, '" ', toolTip ? ' title="' + goog.string.htmlEscape(toolTip) + '" ' : " ", ">", this.getHtml(), childCount, "</span>", "<span>", this.getAfterLabelHtml(), "</span>");
  return sb.toString()
};
a.toHtml = function(sb) {
  var tree = this.getTree(), childClass = !tree.getShowLines() || tree == this.getParent() && !tree.getShowRootLines() ? this.config_.cssChildrenNoLines : this.config_.cssChildren, nonEmptyAndExpanded = this.getExpanded() && this.hasChildren();
  sb.append('<div class="', this.config_.cssItem, this.hasChildren() ? " gdoc-treenodewithchildren" : "", '" id="', this.getId(), '">', this.getRowHtml(), '<div class="', childClass, '" style="', this.getLineStyle(), nonEmptyAndExpanded ? "" : "display:none;", '">');
  nonEmptyAndExpanded && this.forEachChild(function(child) {
    child.toHtml(sb)
  });
  sb.append("</div></div>")
};
grokdoc.TypedTreeNode.expandSingleChild = function(component, b) {
  if(b && component.getChildCount() == 1) {
    var child = component.getChildAt(0);
    child.setExpanded && child.setExpanded(true)
  }
};
grokdoc.TypedTreeNode.followPath = function(separator, pathStr, startNode, opt_eachNodeAction, opt_endNodeAction) {
  for(var nodeNames = pathStr.split(separator), foundNode = startNode, n = 0;n < nodeNames.length && foundNode;n++) {
    var children = foundNode.getChildren(), parent = foundNode;
    foundNode = null;
    for(var c = 0;c < children.length;c++)if(children[c].getName() == nodeNames[n]) {
      foundNode = children[c];
      opt_eachNodeAction && opt_eachNodeAction(foundNode)
    }
  }foundNode && opt_endNodeAction && opt_endNodeAction(foundNode, parent)
};
grokdoc.extendTree = function(parent, nodeName, data) {
  var newNode = parent.getTree().createNode(nodeName, null, data[0]), nodeHTML = nodeName;
  if(goog.isString(data[1])) {
    nodeHTML = '<a href="' + data[1] + '">' + nodeHTML + "</a>";
    newNode.onClick_ = goog.nullFunction
  }newNode.setHtml(nodeHTML);
  parent.add(newNode);
  var keys = goog.object.getKeys(data[2]);
  keys.sort();
  for(var k = 0;k < keys.length;k++) {
    var key = keys[k];
    grokdoc.extendTree(newNode, key, data[2][key])
  }
};
grokdoc.makeTree = function(rootName, renderPeg, data) {
  var root = new grokdoc.TypedTreeControl(rootName), keys = goog.object.getKeys(data[2]);
  keys.sort();
  for(var k = 0;k < keys.length;k++) {
    var key = keys[k];
    grokdoc.extendTree(root, key, data[2][key])
  }root.render(renderPeg);
  root.setExpanded(true);
  return root
};
grokdoc.TabManager = function(barElt) {
  var elt = goog.dom.getElement(barElt);
  this.tabs = new goog.ui.TabBar;
  this.tabs.decorate(elt);
  this.tabToPageMap = {};
  this.currTab = null;
  goog.events.listen(this.tabs, goog.ui.Component.EventType.SELECT, this.selectHandler, false, this)
};
grokdoc.TabManager.prototype.addTreeToTab = function(tabName, rootLabel, pageElm, data) {
  pageElm.style.display = "none";
  var treeElts = goog.dom.getElementsByTagNameAndClass("div", grokdoc.TREE_CLASS, pageElm);
  grokdoc.makeTree(rootLabel, treeElts[0], data);
  this.tabToPageMap[tabName] = pageElm;
  this.currTab || this.showTab(tabName)
};
grokdoc.TabManager.prototype.addTab = function(tabName, pageElm) {
  pageElm.style.display = "none";
  this.tabToPageMap[tabName] = pageElm;
  this.currTab || this.showTab(tabName)
};
grokdoc.TabManager.prototype.showTab = function(tabName) {
  if(this.currTab)this.tabToPageMap[this.currTab].style.display = "none";
  this.currTab = tabName;
  this.tabToPageMap[this.currTab].style.display = "block"
};
grokdoc.TabManager.prototype.selectHandler = function(e) {
  this.showTab(e.target.getCaption())
};
function load() {
  function makeTabs(data) {
    tabs.addTreeToTab("Type Index", "goog", typePage, data.typeIndex[2].goog);
    tabs.addTreeToTab("File Index", "Source", filePage, data.fileIndex);
    demoPage && tabs.addTab("Demos", demoPage);
    goog.dom.getElement("loading").style.display = "none"
  }
  function buildLocalView(node, parent) {
    for(var localView = goog.dom.getElement("localView"), siblings = parent.getChildren(), c = 0;c < siblings.length;c++)if(siblings[c].getType() != "namespace") {
      var row = goog.dom.createDom("div");
      row.innerHTML = siblings[c].getHtml();
      localView.appendChild(row);
      siblings[c] == node ? goog.dom.classes.add(row, grokdoc.TypedTreeNode.CURRENT_CLASS) : goog.dom.classes.add(row, "localView")
    }
  }
  function makeSideIndex(sideIndexElt, isTypeIndex, data) {
    for(var currentNodePath = sideIndexElt.getAttribute("current"), rootPath = sideIndexElt.getAttribute("rootPath"), separator = isTypeIndex ? "." : "/", JSCompiler_inline_nodeNames = rootPath.split(separator), JSCompiler_inline_root = isTypeIndex ? data.typeIndex : data.fileIndex, JSCompiler_inline_i = 0;JSCompiler_inline_i < JSCompiler_inline_nodeNames.length;JSCompiler_inline_i++)JSCompiler_inline_root = JSCompiler_inline_root[2][JSCompiler_inline_nodeNames[JSCompiler_inline_i]];
    var root = grokdoc.makeTree('<span style="display:none;"></span>', sideIndexElt, JSCompiler_inline_root);
    grokdoc.TypedTreeNode.followPath(separator, currentNodePath, root, null, buildLocalView)
  }
  function getAclListener(classname) {
    return function() {
      for(var JSCompiler_inline_visible = this.isChecked(), JSCompiler_inline_elts_75 = goog.dom.getElementsByTagNameAndClass(null, classname), JSCompiler_inline_i = 0;JSCompiler_inline_i < JSCompiler_inline_elts_75.length;JSCompiler_inline_i++)goog.style.showElement(JSCompiler_inline_elts_75[JSCompiler_inline_i], JSCompiler_inline_visible)
    }
  }
  function initDom() {
    grokdoc.zippifyAllDetails();
    grokdoc.tippifyAllEntries();
    var downloader = new grokdoc.IndexDownloader, acField = document.getElementById("ac"), selector = acField ? new grokdoc.Selector(acField) : null;
    selector && downloader.registerCallback(selector.buildAc, selector);
    var acls = document.getElementById("acls");
    if(acls)for(var aclBoxes = goog.dom.getElementsByTagNameAndClass(null, "aclbox", acls), i = 0;i < aclBoxes.length;i++) {
      var boxController = new goog.ui.Checkbox(true), accessLevel = aclBoxes[i].getAttribute("accessLevel");
      goog.events.listen(boxController, goog.ui.Component.EventType.CHANGE, getAclListener(accessLevel));
      boxController.decorate(aclBoxes[i])
    }tabs && downloader.registerCallback(makeTabs);
    var sideTypeIndex = goog.dom.getElement("sideTypeIndex");
    sideTypeIndex && downloader.registerCallback(goog.partial(makeSideIndex, sideTypeIndex, true));
    var sideFileIndex = goog.dom.getElement("sideFileIndex");
    sideFileIndex && downloader.registerCallback(goog.partial(makeSideIndex, sideFileIndex, false));
    downloader.send("doc_json_index.js?zx=" + Math.random());
    var legends = goog.dom.getElementsByTagNameAndClass("div", grokdoc.LEGEND_CLASS);
    i = 0;
    for(var legend;legend = legends[i];i++)new grokdoc.AugmentedLegend(legend)
  }
  var tabbar = goog.dom.getElement("tabbar"), typePage = goog.dom.getElement("typePage"), filePage = goog.dom.getElement("filePage"), demoPage = goog.dom.getElement("demoPage"), tabs = tabbar && typePage && filePage ? new grokdoc.TabManager(tabbar) : null, imgLoader = new goog.net.ImageLoader;
  goog.array.forEach(["I.png", "check-outline.gif", "custom-logo.png", "minus.png", "arrow.gif", "check.gif", "inherit.gif", "plus.png", "blank.gif", "cleardot.gif", "loading.gif", "sidetree.png", "bluearrow.png", "logo.png", "tree.png"], function(elt) {
    imgLoader.addImage(elt, _staticFilePath + "images/" + elt)
  });
  goog.events.listen(imgLoader, goog.net.EventType.COMPLETE, initDom);
  imgLoader.start()
}
goog.events.listenOnce(window, "load", load);grokdoc.gviz = {};
grokdoc.gviz.decorators = {};
grokdoc.gviz.decorators["gviz-org-chart"] = function(table) {
  var data = new google.visualization.DataTable;
  data.addColumn("string", "Name");
  data.addColumn("string", "Parent");
  for(var i = 0, row = table.rows[0];row = table.rows[i];i++)row.cells.length >= 2 && data.addRows([[row.cells[0].innerHTML, row.cells[1].innerHTML]]);
  var chartRoot = goog.dom.$dom("div", "goog-inline-block");
  table.parentNode.replaceChild(chartRoot, table);
  (new google.visualization.OrgChart(chartRoot)).draw(data, {allowHtml:true, allowCollapse:true})
};
grokdoc.gviz.init = function() {
  for(var tables = goog.dom.$$("table"), table, i = 0;table = tables[i++];) {
    var fn = grokdoc.gviz.decorators[table.className];
    fn && fn(table)
  }
};
goog.exportSymbol("grokdoc.gviz.init", grokdoc.gviz.init);
document.write('<script type="text/javascript" src="http://www.google.com/jsapi"><\/script><script type="text/javascript"> google.load("visualization", "1", {packages:["orgchart"]}); google.setOnLoadCallback(grokdoc.gviz.init); <\/script>');
