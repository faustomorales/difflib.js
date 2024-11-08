var __getOwnPropNames = Object.getOwnPropertyNames;
var __commonJS = (cb, mod) => function __require() {
  return mod || (0, cb[__getOwnPropNames(cb)[0]])((mod = { exports: {} }).exports, mod), mod.exports;
};

// node_modules/heap/lib/heap.js
var require_heap = __commonJS({
  "node_modules/heap/lib/heap.js"(exports, module) {
    (function() {
      var Heap2, defaultCmp, floor2, heapify, heappop, heappush, heappushpop, heapreplace, insort, min2, nlargest, nsmallest, updateItem, _siftdown, _siftup;
      floor2 = Math.floor, min2 = Math.min;
      defaultCmp = function(x, y) {
        if (x < y) {
          return -1;
        }
        if (x > y) {
          return 1;
        }
        return 0;
      };
      insort = function(a, x, lo, hi, cmp) {
        var mid;
        if (lo == null) {
          lo = 0;
        }
        if (cmp == null) {
          cmp = defaultCmp;
        }
        if (lo < 0) {
          throw new Error("lo must be non-negative");
        }
        if (hi == null) {
          hi = a.length;
        }
        while (lo < hi) {
          mid = floor2((lo + hi) / 2);
          if (cmp(x, a[mid]) < 0) {
            hi = mid;
          } else {
            lo = mid + 1;
          }
        }
        return [].splice.apply(a, [lo, lo - lo].concat(x)), x;
      };
      heappush = function(array, item, cmp) {
        if (cmp == null) {
          cmp = defaultCmp;
        }
        array.push(item);
        return _siftdown(array, 0, array.length - 1, cmp);
      };
      heappop = function(array, cmp) {
        var lastelt, returnitem;
        if (cmp == null) {
          cmp = defaultCmp;
        }
        lastelt = array.pop();
        if (array.length) {
          returnitem = array[0];
          array[0] = lastelt;
          _siftup(array, 0, cmp);
        } else {
          returnitem = lastelt;
        }
        return returnitem;
      };
      heapreplace = function(array, item, cmp) {
        var returnitem;
        if (cmp == null) {
          cmp = defaultCmp;
        }
        returnitem = array[0];
        array[0] = item;
        _siftup(array, 0, cmp);
        return returnitem;
      };
      heappushpop = function(array, item, cmp) {
        var _ref;
        if (cmp == null) {
          cmp = defaultCmp;
        }
        if (array.length && cmp(array[0], item) < 0) {
          _ref = [array[0], item], item = _ref[0], array[0] = _ref[1];
          _siftup(array, 0, cmp);
        }
        return item;
      };
      heapify = function(array, cmp) {
        var i, _i, _j, _len, _ref, _ref1, _results, _results1;
        if (cmp == null) {
          cmp = defaultCmp;
        }
        _ref1 = function() {
          _results1 = [];
          for (var _j2 = 0, _ref2 = floor2(array.length / 2); 0 <= _ref2 ? _j2 < _ref2 : _j2 > _ref2; 0 <= _ref2 ? _j2++ : _j2--) {
            _results1.push(_j2);
          }
          return _results1;
        }.apply(this).reverse();
        _results = [];
        for (_i = 0, _len = _ref1.length; _i < _len; _i++) {
          i = _ref1[_i];
          _results.push(_siftup(array, i, cmp));
        }
        return _results;
      };
      updateItem = function(array, item, cmp) {
        var pos;
        if (cmp == null) {
          cmp = defaultCmp;
        }
        pos = array.indexOf(item);
        if (pos === -1) {
          return;
        }
        _siftdown(array, 0, pos, cmp);
        return _siftup(array, pos, cmp);
      };
      nlargest = function(array, n, cmp) {
        var elem, result, _i, _len, _ref;
        if (cmp == null) {
          cmp = defaultCmp;
        }
        result = array.slice(0, n);
        if (!result.length) {
          return result;
        }
        heapify(result, cmp);
        _ref = array.slice(n);
        for (_i = 0, _len = _ref.length; _i < _len; _i++) {
          elem = _ref[_i];
          heappushpop(result, elem, cmp);
        }
        return result.sort(cmp).reverse();
      };
      nsmallest = function(array, n, cmp) {
        var elem, i, los, result, _i, _j, _len, _ref, _ref1, _results;
        if (cmp == null) {
          cmp = defaultCmp;
        }
        if (n * 10 <= array.length) {
          result = array.slice(0, n).sort(cmp);
          if (!result.length) {
            return result;
          }
          los = result[result.length - 1];
          _ref = array.slice(n);
          for (_i = 0, _len = _ref.length; _i < _len; _i++) {
            elem = _ref[_i];
            if (cmp(elem, los) < 0) {
              insort(result, elem, 0, null, cmp);
              result.pop();
              los = result[result.length - 1];
            }
          }
          return result;
        }
        heapify(array, cmp);
        _results = [];
        for (i = _j = 0, _ref1 = min2(n, array.length); 0 <= _ref1 ? _j < _ref1 : _j > _ref1; i = 0 <= _ref1 ? ++_j : --_j) {
          _results.push(heappop(array, cmp));
        }
        return _results;
      };
      _siftdown = function(array, startpos, pos, cmp) {
        var newitem, parent, parentpos;
        if (cmp == null) {
          cmp = defaultCmp;
        }
        newitem = array[pos];
        while (pos > startpos) {
          parentpos = pos - 1 >> 1;
          parent = array[parentpos];
          if (cmp(newitem, parent) < 0) {
            array[pos] = parent;
            pos = parentpos;
            continue;
          }
          break;
        }
        return array[pos] = newitem;
      };
      _siftup = function(array, pos, cmp) {
        var childpos, endpos, newitem, rightpos, startpos;
        if (cmp == null) {
          cmp = defaultCmp;
        }
        endpos = array.length;
        startpos = pos;
        newitem = array[pos];
        childpos = 2 * pos + 1;
        while (childpos < endpos) {
          rightpos = childpos + 1;
          if (rightpos < endpos && !(cmp(array[childpos], array[rightpos]) < 0)) {
            childpos = rightpos;
          }
          array[pos] = array[childpos];
          pos = childpos;
          childpos = 2 * pos + 1;
        }
        array[pos] = newitem;
        return _siftdown(array, startpos, pos, cmp);
      };
      Heap2 = function() {
        Heap3.push = heappush;
        Heap3.pop = heappop;
        Heap3.replace = heapreplace;
        Heap3.pushpop = heappushpop;
        Heap3.heapify = heapify;
        Heap3.updateItem = updateItem;
        Heap3.nlargest = nlargest;
        Heap3.nsmallest = nsmallest;
        function Heap3(cmp) {
          this.cmp = cmp != null ? cmp : defaultCmp;
          this.nodes = [];
        }
        Heap3.prototype.push = function(x) {
          return heappush(this.nodes, x, this.cmp);
        };
        Heap3.prototype.pop = function() {
          return heappop(this.nodes, this.cmp);
        };
        Heap3.prototype.peek = function() {
          return this.nodes[0];
        };
        Heap3.prototype.contains = function(x) {
          return this.nodes.indexOf(x) !== -1;
        };
        Heap3.prototype.replace = function(x) {
          return heapreplace(this.nodes, x, this.cmp);
        };
        Heap3.prototype.pushpop = function(x) {
          return heappushpop(this.nodes, x, this.cmp);
        };
        Heap3.prototype.heapify = function() {
          return heapify(this.nodes, this.cmp);
        };
        Heap3.prototype.updateItem = function(x) {
          return updateItem(this.nodes, x, this.cmp);
        };
        Heap3.prototype.clear = function() {
          return this.nodes = [];
        };
        Heap3.prototype.empty = function() {
          return this.nodes.length === 0;
        };
        Heap3.prototype.size = function() {
          return this.nodes.length;
        };
        Heap3.prototype.clone = function() {
          var heap;
          heap = new Heap3();
          heap.nodes = this.nodes.slice(0);
          return heap;
        };
        Heap3.prototype.toArray = function() {
          return this.nodes.slice(0);
        };
        Heap3.prototype.insert = Heap3.prototype.push;
        Heap3.prototype.top = Heap3.prototype.peek;
        Heap3.prototype.front = Heap3.prototype.peek;
        Heap3.prototype.has = Heap3.prototype.contains;
        Heap3.prototype.copy = Heap3.prototype.clone;
        return Heap3;
      }();
      (function(root, factory) {
        if (typeof define === "function" && define.amd) {
          return define([], factory);
        } else if (typeof exports === "object") {
          return module.exports = factory();
        } else {
          return root.Heap = factory();
        }
      })(this, function() {
        return Heap2;
      });
    }).call(exports);
  }
});

// node_modules/heap/index.js
var require_heap2 = __commonJS({
  "node_modules/heap/index.js"(exports, module) {
    module.exports = require_heap();
  }
});

// node_modules/object-keys/isArguments.js
var require_isArguments = __commonJS({
  "node_modules/object-keys/isArguments.js"(exports, module) {
    "use strict";
    var toStr = Object.prototype.toString;
    module.exports = function isArguments(value) {
      var str = toStr.call(value);
      var isArgs = str === "[object Arguments]";
      if (!isArgs) {
        isArgs = str !== "[object Array]" && value !== null && typeof value === "object" && typeof value.length === "number" && value.length >= 0 && toStr.call(value.callee) === "[object Function]";
      }
      return isArgs;
    };
  }
});

// node_modules/object-keys/implementation.js
var require_implementation = __commonJS({
  "node_modules/object-keys/implementation.js"(exports, module) {
    "use strict";
    var keysShim;
    if (!Object.keys) {
      has = Object.prototype.hasOwnProperty;
      toStr = Object.prototype.toString;
      isArgs = require_isArguments();
      isEnumerable = Object.prototype.propertyIsEnumerable;
      hasDontEnumBug = !isEnumerable.call({ toString: null }, "toString");
      hasProtoEnumBug = isEnumerable.call(function() {
      }, "prototype");
      dontEnums = [
        "toString",
        "toLocaleString",
        "valueOf",
        "hasOwnProperty",
        "isPrototypeOf",
        "propertyIsEnumerable",
        "constructor"
      ];
      equalsConstructorPrototype = function(o) {
        var ctor = o.constructor;
        return ctor && ctor.prototype === o;
      };
      excludedKeys = {
        $applicationCache: true,
        $console: true,
        $external: true,
        $frame: true,
        $frameElement: true,
        $frames: true,
        $innerHeight: true,
        $innerWidth: true,
        $onmozfullscreenchange: true,
        $onmozfullscreenerror: true,
        $outerHeight: true,
        $outerWidth: true,
        $pageXOffset: true,
        $pageYOffset: true,
        $parent: true,
        $scrollLeft: true,
        $scrollTop: true,
        $scrollX: true,
        $scrollY: true,
        $self: true,
        $webkitIndexedDB: true,
        $webkitStorageInfo: true,
        $window: true
      };
      hasAutomationEqualityBug = function() {
        if (typeof window === "undefined") {
          return false;
        }
        for (var k in window) {
          try {
            if (!excludedKeys["$" + k] && has.call(window, k) && window[k] !== null && typeof window[k] === "object") {
              try {
                equalsConstructorPrototype(window[k]);
              } catch (e) {
                return true;
              }
            }
          } catch (e) {
            return true;
          }
        }
        return false;
      }();
      equalsConstructorPrototypeIfNotBuggy = function(o) {
        if (typeof window === "undefined" || !hasAutomationEqualityBug) {
          return equalsConstructorPrototype(o);
        }
        try {
          return equalsConstructorPrototype(o);
        } catch (e) {
          return false;
        }
      };
      keysShim = function keys(object) {
        var isObject = object !== null && typeof object === "object";
        var isFunction = toStr.call(object) === "[object Function]";
        var isArguments = isArgs(object);
        var isString = isObject && toStr.call(object) === "[object String]";
        var theKeys = [];
        if (!isObject && !isFunction && !isArguments) {
          throw new TypeError("Object.keys called on a non-object");
        }
        var skipProto = hasProtoEnumBug && isFunction;
        if (isString && object.length > 0 && !has.call(object, 0)) {
          for (var i = 0; i < object.length; ++i) {
            theKeys.push(String(i));
          }
        }
        if (isArguments && object.length > 0) {
          for (var j = 0; j < object.length; ++j) {
            theKeys.push(String(j));
          }
        } else {
          for (var name in object) {
            if (!(skipProto && name === "prototype") && has.call(object, name)) {
              theKeys.push(String(name));
            }
          }
        }
        if (hasDontEnumBug) {
          var skipConstructor = equalsConstructorPrototypeIfNotBuggy(object);
          for (var k = 0; k < dontEnums.length; ++k) {
            if (!(skipConstructor && dontEnums[k] === "constructor") && has.call(object, dontEnums[k])) {
              theKeys.push(dontEnums[k]);
            }
          }
        }
        return theKeys;
      };
    }
    var has;
    var toStr;
    var isArgs;
    var isEnumerable;
    var hasDontEnumBug;
    var hasProtoEnumBug;
    var dontEnums;
    var equalsConstructorPrototype;
    var excludedKeys;
    var hasAutomationEqualityBug;
    var equalsConstructorPrototypeIfNotBuggy;
    module.exports = keysShim;
  }
});

// node_modules/object-keys/index.js
var require_object_keys = __commonJS({
  "node_modules/object-keys/index.js"(exports, module) {
    "use strict";
    var slice = Array.prototype.slice;
    var isArgs = require_isArguments();
    var origKeys = Object.keys;
    var keysShim = origKeys ? function keys(o) {
      return origKeys(o);
    } : require_implementation();
    var originalKeys = Object.keys;
    keysShim.shim = function shimObjectKeys() {
      if (Object.keys) {
        var keysWorksWithArguments = function() {
          var args = Object.keys(arguments);
          return args && args.length === arguments.length;
        }(1, 2);
        if (!keysWorksWithArguments) {
          Object.keys = function keys(object) {
            if (isArgs(object)) {
              return originalKeys(slice.call(object));
            }
            return originalKeys(object);
          };
        }
      } else {
        Object.keys = keysShim;
      }
      return Object.keys || keysShim;
    };
    module.exports = keysShim;
  }
});

// node_modules/has-symbols/shams.js
var require_shams = __commonJS({
  "node_modules/has-symbols/shams.js"(exports, module) {
    "use strict";
    module.exports = function hasSymbols() {
      if (typeof Symbol !== "function" || typeof Object.getOwnPropertySymbols !== "function") {
        return false;
      }
      if (typeof Symbol.iterator === "symbol") {
        return true;
      }
      var obj = {};
      var sym = Symbol("test");
      var symObj = Object(sym);
      if (typeof sym === "string") {
        return false;
      }
      if (Object.prototype.toString.call(sym) !== "[object Symbol]") {
        return false;
      }
      if (Object.prototype.toString.call(symObj) !== "[object Symbol]") {
        return false;
      }
      var symVal = 42;
      obj[sym] = symVal;
      for (sym in obj) {
        return false;
      }
      if (typeof Object.keys === "function" && Object.keys(obj).length !== 0) {
        return false;
      }
      if (typeof Object.getOwnPropertyNames === "function" && Object.getOwnPropertyNames(obj).length !== 0) {
        return false;
      }
      var syms = Object.getOwnPropertySymbols(obj);
      if (syms.length !== 1 || syms[0] !== sym) {
        return false;
      }
      if (!Object.prototype.propertyIsEnumerable.call(obj, sym)) {
        return false;
      }
      if (typeof Object.getOwnPropertyDescriptor === "function") {
        var descriptor = Object.getOwnPropertyDescriptor(obj, sym);
        if (descriptor.value !== symVal || descriptor.enumerable !== true) {
          return false;
        }
      }
      return true;
    };
  }
});

// node_modules/es-errors/index.js
var require_es_errors = __commonJS({
  "node_modules/es-errors/index.js"(exports, module) {
    "use strict";
    module.exports = Error;
  }
});

// node_modules/es-errors/eval.js
var require_eval = __commonJS({
  "node_modules/es-errors/eval.js"(exports, module) {
    "use strict";
    module.exports = EvalError;
  }
});

// node_modules/es-errors/range.js
var require_range = __commonJS({
  "node_modules/es-errors/range.js"(exports, module) {
    "use strict";
    module.exports = RangeError;
  }
});

// node_modules/es-errors/ref.js
var require_ref = __commonJS({
  "node_modules/es-errors/ref.js"(exports, module) {
    "use strict";
    module.exports = ReferenceError;
  }
});

// node_modules/es-errors/syntax.js
var require_syntax = __commonJS({
  "node_modules/es-errors/syntax.js"(exports, module) {
    "use strict";
    module.exports = SyntaxError;
  }
});

// node_modules/es-errors/type.js
var require_type = __commonJS({
  "node_modules/es-errors/type.js"(exports, module) {
    "use strict";
    module.exports = TypeError;
  }
});

// node_modules/es-errors/uri.js
var require_uri = __commonJS({
  "node_modules/es-errors/uri.js"(exports, module) {
    "use strict";
    module.exports = URIError;
  }
});

// node_modules/has-symbols/index.js
var require_has_symbols = __commonJS({
  "node_modules/has-symbols/index.js"(exports, module) {
    "use strict";
    var origSymbol = typeof Symbol !== "undefined" && Symbol;
    var hasSymbolSham = require_shams();
    module.exports = function hasNativeSymbols() {
      if (typeof origSymbol !== "function") {
        return false;
      }
      if (typeof Symbol !== "function") {
        return false;
      }
      if (typeof origSymbol("foo") !== "symbol") {
        return false;
      }
      if (typeof Symbol("bar") !== "symbol") {
        return false;
      }
      return hasSymbolSham();
    };
  }
});

// node_modules/has-proto/index.js
var require_has_proto = __commonJS({
  "node_modules/has-proto/index.js"(exports, module) {
    "use strict";
    var test = {
      __proto__: null,
      foo: {}
    };
    var $Object = Object;
    module.exports = function hasProto() {
      return { __proto__: test }.foo === test.foo && !(test instanceof $Object);
    };
  }
});

// node_modules/function-bind/implementation.js
var require_implementation2 = __commonJS({
  "node_modules/function-bind/implementation.js"(exports, module) {
    "use strict";
    var ERROR_MESSAGE = "Function.prototype.bind called on incompatible ";
    var toStr = Object.prototype.toString;
    var max2 = Math.max;
    var funcType = "[object Function]";
    var concatty = function concatty2(a, b) {
      var arr = [];
      for (var i = 0; i < a.length; i += 1) {
        arr[i] = a[i];
      }
      for (var j = 0; j < b.length; j += 1) {
        arr[j + a.length] = b[j];
      }
      return arr;
    };
    var slicy = function slicy2(arrLike, offset) {
      var arr = [];
      for (var i = offset || 0, j = 0; i < arrLike.length; i += 1, j += 1) {
        arr[j] = arrLike[i];
      }
      return arr;
    };
    var joiny = function(arr, joiner) {
      var str = "";
      for (var i = 0; i < arr.length; i += 1) {
        str += arr[i];
        if (i + 1 < arr.length) {
          str += joiner;
        }
      }
      return str;
    };
    module.exports = function bind(that) {
      var target = this;
      if (typeof target !== "function" || toStr.apply(target) !== funcType) {
        throw new TypeError(ERROR_MESSAGE + target);
      }
      var args = slicy(arguments, 1);
      var bound;
      var binder = function() {
        if (this instanceof bound) {
          var result = target.apply(
            this,
            concatty(args, arguments)
          );
          if (Object(result) === result) {
            return result;
          }
          return this;
        }
        return target.apply(
          that,
          concatty(args, arguments)
        );
      };
      var boundLength = max2(0, target.length - args.length);
      var boundArgs = [];
      for (var i = 0; i < boundLength; i++) {
        boundArgs[i] = "$" + i;
      }
      bound = Function("binder", "return function (" + joiny(boundArgs, ",") + "){ return binder.apply(this,arguments); }")(binder);
      if (target.prototype) {
        var Empty = function Empty2() {
        };
        Empty.prototype = target.prototype;
        bound.prototype = new Empty();
        Empty.prototype = null;
      }
      return bound;
    };
  }
});

// node_modules/function-bind/index.js
var require_function_bind = __commonJS({
  "node_modules/function-bind/index.js"(exports, module) {
    "use strict";
    var implementation = require_implementation2();
    module.exports = Function.prototype.bind || implementation;
  }
});

// node_modules/hasown/index.js
var require_hasown = __commonJS({
  "node_modules/hasown/index.js"(exports, module) {
    "use strict";
    var call = Function.prototype.call;
    var $hasOwn = Object.prototype.hasOwnProperty;
    var bind = require_function_bind();
    module.exports = bind.call(call, $hasOwn);
  }
});

// node_modules/get-intrinsic/index.js
var require_get_intrinsic = __commonJS({
  "node_modules/get-intrinsic/index.js"(exports, module) {
    "use strict";
    var undefined2;
    var $Error = require_es_errors();
    var $EvalError = require_eval();
    var $RangeError = require_range();
    var $ReferenceError = require_ref();
    var $SyntaxError = require_syntax();
    var $TypeError = require_type();
    var $URIError = require_uri();
    var $Function = Function;
    var getEvalledConstructor = function(expressionSyntax) {
      try {
        return $Function('"use strict"; return (' + expressionSyntax + ").constructor;")();
      } catch (e) {
      }
    };
    var $gOPD = Object.getOwnPropertyDescriptor;
    if ($gOPD) {
      try {
        $gOPD({}, "");
      } catch (e) {
        $gOPD = null;
      }
    }
    var throwTypeError = function() {
      throw new $TypeError();
    };
    var ThrowTypeError = $gOPD ? function() {
      try {
        arguments.callee;
        return throwTypeError;
      } catch (calleeThrows) {
        try {
          return $gOPD(arguments, "callee").get;
        } catch (gOPDthrows) {
          return throwTypeError;
        }
      }
    }() : throwTypeError;
    var hasSymbols = require_has_symbols()();
    var hasProto = require_has_proto()();
    var getProto = Object.getPrototypeOf || (hasProto ? function(x) {
      return x.__proto__;
    } : null);
    var needsEval = {};
    var TypedArray = typeof Uint8Array === "undefined" || !getProto ? undefined2 : getProto(Uint8Array);
    var INTRINSICS = {
      __proto__: null,
      "%AggregateError%": typeof AggregateError === "undefined" ? undefined2 : AggregateError,
      "%Array%": Array,
      "%ArrayBuffer%": typeof ArrayBuffer === "undefined" ? undefined2 : ArrayBuffer,
      "%ArrayIteratorPrototype%": hasSymbols && getProto ? getProto([][Symbol.iterator]()) : undefined2,
      "%AsyncFromSyncIteratorPrototype%": undefined2,
      "%AsyncFunction%": needsEval,
      "%AsyncGenerator%": needsEval,
      "%AsyncGeneratorFunction%": needsEval,
      "%AsyncIteratorPrototype%": needsEval,
      "%Atomics%": typeof Atomics === "undefined" ? undefined2 : Atomics,
      "%BigInt%": typeof BigInt === "undefined" ? undefined2 : BigInt,
      "%BigInt64Array%": typeof BigInt64Array === "undefined" ? undefined2 : BigInt64Array,
      "%BigUint64Array%": typeof BigUint64Array === "undefined" ? undefined2 : BigUint64Array,
      "%Boolean%": Boolean,
      "%DataView%": typeof DataView === "undefined" ? undefined2 : DataView,
      "%Date%": Date,
      "%decodeURI%": decodeURI,
      "%decodeURIComponent%": decodeURIComponent,
      "%encodeURI%": encodeURI,
      "%encodeURIComponent%": encodeURIComponent,
      "%Error%": $Error,
      "%eval%": eval,
      // eslint-disable-line no-eval
      "%EvalError%": $EvalError,
      "%Float32Array%": typeof Float32Array === "undefined" ? undefined2 : Float32Array,
      "%Float64Array%": typeof Float64Array === "undefined" ? undefined2 : Float64Array,
      "%FinalizationRegistry%": typeof FinalizationRegistry === "undefined" ? undefined2 : FinalizationRegistry,
      "%Function%": $Function,
      "%GeneratorFunction%": needsEval,
      "%Int8Array%": typeof Int8Array === "undefined" ? undefined2 : Int8Array,
      "%Int16Array%": typeof Int16Array === "undefined" ? undefined2 : Int16Array,
      "%Int32Array%": typeof Int32Array === "undefined" ? undefined2 : Int32Array,
      "%isFinite%": isFinite,
      "%isNaN%": isNaN,
      "%IteratorPrototype%": hasSymbols && getProto ? getProto(getProto([][Symbol.iterator]())) : undefined2,
      "%JSON%": typeof JSON === "object" ? JSON : undefined2,
      "%Map%": typeof Map === "undefined" ? undefined2 : Map,
      "%MapIteratorPrototype%": typeof Map === "undefined" || !hasSymbols || !getProto ? undefined2 : getProto((/* @__PURE__ */ new Map())[Symbol.iterator]()),
      "%Math%": Math,
      "%Number%": Number,
      "%Object%": Object,
      "%parseFloat%": parseFloat,
      "%parseInt%": parseInt,
      "%Promise%": typeof Promise === "undefined" ? undefined2 : Promise,
      "%Proxy%": typeof Proxy === "undefined" ? undefined2 : Proxy,
      "%RangeError%": $RangeError,
      "%ReferenceError%": $ReferenceError,
      "%Reflect%": typeof Reflect === "undefined" ? undefined2 : Reflect,
      "%RegExp%": RegExp,
      "%Set%": typeof Set === "undefined" ? undefined2 : Set,
      "%SetIteratorPrototype%": typeof Set === "undefined" || !hasSymbols || !getProto ? undefined2 : getProto((/* @__PURE__ */ new Set())[Symbol.iterator]()),
      "%SharedArrayBuffer%": typeof SharedArrayBuffer === "undefined" ? undefined2 : SharedArrayBuffer,
      "%String%": String,
      "%StringIteratorPrototype%": hasSymbols && getProto ? getProto(""[Symbol.iterator]()) : undefined2,
      "%Symbol%": hasSymbols ? Symbol : undefined2,
      "%SyntaxError%": $SyntaxError,
      "%ThrowTypeError%": ThrowTypeError,
      "%TypedArray%": TypedArray,
      "%TypeError%": $TypeError,
      "%Uint8Array%": typeof Uint8Array === "undefined" ? undefined2 : Uint8Array,
      "%Uint8ClampedArray%": typeof Uint8ClampedArray === "undefined" ? undefined2 : Uint8ClampedArray,
      "%Uint16Array%": typeof Uint16Array === "undefined" ? undefined2 : Uint16Array,
      "%Uint32Array%": typeof Uint32Array === "undefined" ? undefined2 : Uint32Array,
      "%URIError%": $URIError,
      "%WeakMap%": typeof WeakMap === "undefined" ? undefined2 : WeakMap,
      "%WeakRef%": typeof WeakRef === "undefined" ? undefined2 : WeakRef,
      "%WeakSet%": typeof WeakSet === "undefined" ? undefined2 : WeakSet
    };
    if (getProto) {
      try {
        null.error;
      } catch (e) {
        errorProto = getProto(getProto(e));
        INTRINSICS["%Error.prototype%"] = errorProto;
      }
    }
    var errorProto;
    var doEval = function doEval2(name) {
      var value;
      if (name === "%AsyncFunction%") {
        value = getEvalledConstructor("async function () {}");
      } else if (name === "%GeneratorFunction%") {
        value = getEvalledConstructor("function* () {}");
      } else if (name === "%AsyncGeneratorFunction%") {
        value = getEvalledConstructor("async function* () {}");
      } else if (name === "%AsyncGenerator%") {
        var fn = doEval2("%AsyncGeneratorFunction%");
        if (fn) {
          value = fn.prototype;
        }
      } else if (name === "%AsyncIteratorPrototype%") {
        var gen = doEval2("%AsyncGenerator%");
        if (gen && getProto) {
          value = getProto(gen.prototype);
        }
      }
      INTRINSICS[name] = value;
      return value;
    };
    var LEGACY_ALIASES = {
      __proto__: null,
      "%ArrayBufferPrototype%": ["ArrayBuffer", "prototype"],
      "%ArrayPrototype%": ["Array", "prototype"],
      "%ArrayProto_entries%": ["Array", "prototype", "entries"],
      "%ArrayProto_forEach%": ["Array", "prototype", "forEach"],
      "%ArrayProto_keys%": ["Array", "prototype", "keys"],
      "%ArrayProto_values%": ["Array", "prototype", "values"],
      "%AsyncFunctionPrototype%": ["AsyncFunction", "prototype"],
      "%AsyncGenerator%": ["AsyncGeneratorFunction", "prototype"],
      "%AsyncGeneratorPrototype%": ["AsyncGeneratorFunction", "prototype", "prototype"],
      "%BooleanPrototype%": ["Boolean", "prototype"],
      "%DataViewPrototype%": ["DataView", "prototype"],
      "%DatePrototype%": ["Date", "prototype"],
      "%ErrorPrototype%": ["Error", "prototype"],
      "%EvalErrorPrototype%": ["EvalError", "prototype"],
      "%Float32ArrayPrototype%": ["Float32Array", "prototype"],
      "%Float64ArrayPrototype%": ["Float64Array", "prototype"],
      "%FunctionPrototype%": ["Function", "prototype"],
      "%Generator%": ["GeneratorFunction", "prototype"],
      "%GeneratorPrototype%": ["GeneratorFunction", "prototype", "prototype"],
      "%Int8ArrayPrototype%": ["Int8Array", "prototype"],
      "%Int16ArrayPrototype%": ["Int16Array", "prototype"],
      "%Int32ArrayPrototype%": ["Int32Array", "prototype"],
      "%JSONParse%": ["JSON", "parse"],
      "%JSONStringify%": ["JSON", "stringify"],
      "%MapPrototype%": ["Map", "prototype"],
      "%NumberPrototype%": ["Number", "prototype"],
      "%ObjectPrototype%": ["Object", "prototype"],
      "%ObjProto_toString%": ["Object", "prototype", "toString"],
      "%ObjProto_valueOf%": ["Object", "prototype", "valueOf"],
      "%PromisePrototype%": ["Promise", "prototype"],
      "%PromiseProto_then%": ["Promise", "prototype", "then"],
      "%Promise_all%": ["Promise", "all"],
      "%Promise_reject%": ["Promise", "reject"],
      "%Promise_resolve%": ["Promise", "resolve"],
      "%RangeErrorPrototype%": ["RangeError", "prototype"],
      "%ReferenceErrorPrototype%": ["ReferenceError", "prototype"],
      "%RegExpPrototype%": ["RegExp", "prototype"],
      "%SetPrototype%": ["Set", "prototype"],
      "%SharedArrayBufferPrototype%": ["SharedArrayBuffer", "prototype"],
      "%StringPrototype%": ["String", "prototype"],
      "%SymbolPrototype%": ["Symbol", "prototype"],
      "%SyntaxErrorPrototype%": ["SyntaxError", "prototype"],
      "%TypedArrayPrototype%": ["TypedArray", "prototype"],
      "%TypeErrorPrototype%": ["TypeError", "prototype"],
      "%Uint8ArrayPrototype%": ["Uint8Array", "prototype"],
      "%Uint8ClampedArrayPrototype%": ["Uint8ClampedArray", "prototype"],
      "%Uint16ArrayPrototype%": ["Uint16Array", "prototype"],
      "%Uint32ArrayPrototype%": ["Uint32Array", "prototype"],
      "%URIErrorPrototype%": ["URIError", "prototype"],
      "%WeakMapPrototype%": ["WeakMap", "prototype"],
      "%WeakSetPrototype%": ["WeakSet", "prototype"]
    };
    var bind = require_function_bind();
    var hasOwn = require_hasown();
    var $concat = bind.call(Function.call, Array.prototype.concat);
    var $spliceApply = bind.call(Function.apply, Array.prototype.splice);
    var $replace = bind.call(Function.call, String.prototype.replace);
    var $strSlice = bind.call(Function.call, String.prototype.slice);
    var $exec = bind.call(Function.call, RegExp.prototype.exec);
    var rePropName = /[^%.[\]]+|\[(?:(-?\d+(?:\.\d+)?)|(["'])((?:(?!\2)[^\\]|\\.)*?)\2)\]|(?=(?:\.|\[\])(?:\.|\[\]|%$))/g;
    var reEscapeChar = /\\(\\)?/g;
    var stringToPath = function stringToPath2(string) {
      var first = $strSlice(string, 0, 1);
      var last = $strSlice(string, -1);
      if (first === "%" && last !== "%") {
        throw new $SyntaxError("invalid intrinsic syntax, expected closing `%`");
      } else if (last === "%" && first !== "%") {
        throw new $SyntaxError("invalid intrinsic syntax, expected opening `%`");
      }
      var result = [];
      $replace(string, rePropName, function(match, number, quote, subString) {
        result[result.length] = quote ? $replace(subString, reEscapeChar, "$1") : number || match;
      });
      return result;
    };
    var getBaseIntrinsic = function getBaseIntrinsic2(name, allowMissing) {
      var intrinsicName = name;
      var alias;
      if (hasOwn(LEGACY_ALIASES, intrinsicName)) {
        alias = LEGACY_ALIASES[intrinsicName];
        intrinsicName = "%" + alias[0] + "%";
      }
      if (hasOwn(INTRINSICS, intrinsicName)) {
        var value = INTRINSICS[intrinsicName];
        if (value === needsEval) {
          value = doEval(intrinsicName);
        }
        if (typeof value === "undefined" && !allowMissing) {
          throw new $TypeError("intrinsic " + name + " exists, but is not available. Please file an issue!");
        }
        return {
          alias,
          name: intrinsicName,
          value
        };
      }
      throw new $SyntaxError("intrinsic " + name + " does not exist!");
    };
    module.exports = function GetIntrinsic(name, allowMissing) {
      if (typeof name !== "string" || name.length === 0) {
        throw new $TypeError("intrinsic name must be a non-empty string");
      }
      if (arguments.length > 1 && typeof allowMissing !== "boolean") {
        throw new $TypeError('"allowMissing" argument must be a boolean');
      }
      if ($exec(/^%?[^%]*%?$/, name) === null) {
        throw new $SyntaxError("`%` may not be present anywhere but at the beginning and end of the intrinsic name");
      }
      var parts = stringToPath(name);
      var intrinsicBaseName = parts.length > 0 ? parts[0] : "";
      var intrinsic = getBaseIntrinsic("%" + intrinsicBaseName + "%", allowMissing);
      var intrinsicRealName = intrinsic.name;
      var value = intrinsic.value;
      var skipFurtherCaching = false;
      var alias = intrinsic.alias;
      if (alias) {
        intrinsicBaseName = alias[0];
        $spliceApply(parts, $concat([0, 1], alias));
      }
      for (var i = 1, isOwn = true; i < parts.length; i += 1) {
        var part = parts[i];
        var first = $strSlice(part, 0, 1);
        var last = $strSlice(part, -1);
        if ((first === '"' || first === "'" || first === "`" || (last === '"' || last === "'" || last === "`")) && first !== last) {
          throw new $SyntaxError("property names with quotes must have matching quotes");
        }
        if (part === "constructor" || !isOwn) {
          skipFurtherCaching = true;
        }
        intrinsicBaseName += "." + part;
        intrinsicRealName = "%" + intrinsicBaseName + "%";
        if (hasOwn(INTRINSICS, intrinsicRealName)) {
          value = INTRINSICS[intrinsicRealName];
        } else if (value != null) {
          if (!(part in value)) {
            if (!allowMissing) {
              throw new $TypeError("base intrinsic for " + name + " exists, but the property is not available.");
            }
            return void 0;
          }
          if ($gOPD && i + 1 >= parts.length) {
            var desc = $gOPD(value, part);
            isOwn = !!desc;
            if (isOwn && "get" in desc && !("originalValue" in desc.get)) {
              value = desc.get;
            } else {
              value = value[part];
            }
          } else {
            isOwn = hasOwn(value, part);
            value = value[part];
          }
          if (isOwn && !skipFurtherCaching) {
            INTRINSICS[intrinsicRealName] = value;
          }
        }
      }
      return value;
    };
  }
});

// node_modules/es-define-property/index.js
var require_es_define_property = __commonJS({
  "node_modules/es-define-property/index.js"(exports, module) {
    "use strict";
    var GetIntrinsic = require_get_intrinsic();
    var $defineProperty = GetIntrinsic("%Object.defineProperty%", true) || false;
    if ($defineProperty) {
      try {
        $defineProperty({}, "a", { value: 1 });
      } catch (e) {
        $defineProperty = false;
      }
    }
    module.exports = $defineProperty;
  }
});

// node_modules/gopd/index.js
var require_gopd = __commonJS({
  "node_modules/gopd/index.js"(exports, module) {
    "use strict";
    var GetIntrinsic = require_get_intrinsic();
    var $gOPD = GetIntrinsic("%Object.getOwnPropertyDescriptor%", true);
    if ($gOPD) {
      try {
        $gOPD([], "length");
      } catch (e) {
        $gOPD = null;
      }
    }
    module.exports = $gOPD;
  }
});

// node_modules/define-data-property/index.js
var require_define_data_property = __commonJS({
  "node_modules/define-data-property/index.js"(exports, module) {
    "use strict";
    var $defineProperty = require_es_define_property();
    var $SyntaxError = require_syntax();
    var $TypeError = require_type();
    var gopd = require_gopd();
    module.exports = function defineDataProperty(obj, property, value) {
      if (!obj || typeof obj !== "object" && typeof obj !== "function") {
        throw new $TypeError("`obj` must be an object or a function`");
      }
      if (typeof property !== "string" && typeof property !== "symbol") {
        throw new $TypeError("`property` must be a string or a symbol`");
      }
      if (arguments.length > 3 && typeof arguments[3] !== "boolean" && arguments[3] !== null) {
        throw new $TypeError("`nonEnumerable`, if provided, must be a boolean or null");
      }
      if (arguments.length > 4 && typeof arguments[4] !== "boolean" && arguments[4] !== null) {
        throw new $TypeError("`nonWritable`, if provided, must be a boolean or null");
      }
      if (arguments.length > 5 && typeof arguments[5] !== "boolean" && arguments[5] !== null) {
        throw new $TypeError("`nonConfigurable`, if provided, must be a boolean or null");
      }
      if (arguments.length > 6 && typeof arguments[6] !== "boolean") {
        throw new $TypeError("`loose`, if provided, must be a boolean");
      }
      var nonEnumerable = arguments.length > 3 ? arguments[3] : null;
      var nonWritable = arguments.length > 4 ? arguments[4] : null;
      var nonConfigurable = arguments.length > 5 ? arguments[5] : null;
      var loose = arguments.length > 6 ? arguments[6] : false;
      var desc = !!gopd && gopd(obj, property);
      if ($defineProperty) {
        $defineProperty(obj, property, {
          configurable: nonConfigurable === null && desc ? desc.configurable : !nonConfigurable,
          enumerable: nonEnumerable === null && desc ? desc.enumerable : !nonEnumerable,
          value,
          writable: nonWritable === null && desc ? desc.writable : !nonWritable
        });
      } else if (loose || !nonEnumerable && !nonWritable && !nonConfigurable) {
        obj[property] = value;
      } else {
        throw new $SyntaxError("This environment does not support defining a property as non-configurable, non-writable, or non-enumerable.");
      }
    };
  }
});

// node_modules/has-property-descriptors/index.js
var require_has_property_descriptors = __commonJS({
  "node_modules/has-property-descriptors/index.js"(exports, module) {
    "use strict";
    var $defineProperty = require_es_define_property();
    var hasPropertyDescriptors = function hasPropertyDescriptors2() {
      return !!$defineProperty;
    };
    hasPropertyDescriptors.hasArrayLengthDefineBug = function hasArrayLengthDefineBug() {
      if (!$defineProperty) {
        return null;
      }
      try {
        return $defineProperty([], "length", { value: 1 }).length !== 1;
      } catch (e) {
        return true;
      }
    };
    module.exports = hasPropertyDescriptors;
  }
});

// node_modules/set-function-length/index.js
var require_set_function_length = __commonJS({
  "node_modules/set-function-length/index.js"(exports, module) {
    "use strict";
    var GetIntrinsic = require_get_intrinsic();
    var define2 = require_define_data_property();
    var hasDescriptors = require_has_property_descriptors()();
    var gOPD = require_gopd();
    var $TypeError = require_type();
    var $floor = GetIntrinsic("%Math.floor%");
    module.exports = function setFunctionLength(fn, length) {
      if (typeof fn !== "function") {
        throw new $TypeError("`fn` is not a function");
      }
      if (typeof length !== "number" || length < 0 || length > 4294967295 || $floor(length) !== length) {
        throw new $TypeError("`length` must be a positive 32-bit integer");
      }
      var loose = arguments.length > 2 && !!arguments[2];
      var functionLengthIsConfigurable = true;
      var functionLengthIsWritable = true;
      if ("length" in fn && gOPD) {
        var desc = gOPD(fn, "length");
        if (desc && !desc.configurable) {
          functionLengthIsConfigurable = false;
        }
        if (desc && !desc.writable) {
          functionLengthIsWritable = false;
        }
      }
      if (functionLengthIsConfigurable || functionLengthIsWritable || !loose) {
        if (hasDescriptors) {
          define2(
            /** @type {Parameters<define>[0]} */
            fn,
            "length",
            length,
            true,
            true
          );
        } else {
          define2(
            /** @type {Parameters<define>[0]} */
            fn,
            "length",
            length
          );
        }
      }
      return fn;
    };
  }
});

// node_modules/call-bind/index.js
var require_call_bind = __commonJS({
  "node_modules/call-bind/index.js"(exports, module) {
    "use strict";
    var bind = require_function_bind();
    var GetIntrinsic = require_get_intrinsic();
    var setFunctionLength = require_set_function_length();
    var $TypeError = require_type();
    var $apply = GetIntrinsic("%Function.prototype.apply%");
    var $call = GetIntrinsic("%Function.prototype.call%");
    var $reflectApply = GetIntrinsic("%Reflect.apply%", true) || bind.call($call, $apply);
    var $defineProperty = require_es_define_property();
    var $max = GetIntrinsic("%Math.max%");
    module.exports = function callBind(originalFunction) {
      if (typeof originalFunction !== "function") {
        throw new $TypeError("a function is required");
      }
      var func = $reflectApply(bind, $call, arguments);
      return setFunctionLength(
        func,
        1 + $max(0, originalFunction.length - (arguments.length - 1)),
        true
      );
    };
    var applyBind = function applyBind2() {
      return $reflectApply(bind, $apply, arguments);
    };
    if ($defineProperty) {
      $defineProperty(module.exports, "apply", { value: applyBind });
    } else {
      module.exports.apply = applyBind;
    }
  }
});

// node_modules/call-bind/callBound.js
var require_callBound = __commonJS({
  "node_modules/call-bind/callBound.js"(exports, module) {
    "use strict";
    var GetIntrinsic = require_get_intrinsic();
    var callBind = require_call_bind();
    var $indexOf = callBind(GetIntrinsic("String.prototype.indexOf"));
    module.exports = function callBoundIntrinsic(name, allowMissing) {
      var intrinsic = GetIntrinsic(name, !!allowMissing);
      if (typeof intrinsic === "function" && $indexOf(name, ".prototype.") > -1) {
        return callBind(intrinsic);
      }
      return intrinsic;
    };
  }
});

// node_modules/object.assign/implementation.js
var require_implementation3 = __commonJS({
  "node_modules/object.assign/implementation.js"(exports, module) {
    "use strict";
    var objectKeys = require_object_keys();
    var hasSymbols = require_shams()();
    var callBound = require_callBound();
    var toObject = Object;
    var $push = callBound("Array.prototype.push");
    var $propIsEnumerable = callBound("Object.prototype.propertyIsEnumerable");
    var originalGetSymbols = hasSymbols ? Object.getOwnPropertySymbols : null;
    module.exports = function assign(target, source1) {
      if (target == null) {
        throw new TypeError("target must be an object");
      }
      var to = toObject(target);
      if (arguments.length === 1) {
        return to;
      }
      for (var s = 1; s < arguments.length; ++s) {
        var from = toObject(arguments[s]);
        var keys = objectKeys(from);
        var getSymbols = hasSymbols && (Object.getOwnPropertySymbols || originalGetSymbols);
        if (getSymbols) {
          var syms = getSymbols(from);
          for (var j = 0; j < syms.length; ++j) {
            var key = syms[j];
            if ($propIsEnumerable(from, key)) {
              $push(keys, key);
            }
          }
        }
        for (var i = 0; i < keys.length; ++i) {
          var nextKey = keys[i];
          if ($propIsEnumerable(from, nextKey)) {
            var propValue = from[nextKey];
            to[nextKey] = propValue;
          }
        }
      }
      return to;
    };
  }
});

// node_modules/object.assign/polyfill.js
var require_polyfill = __commonJS({
  "node_modules/object.assign/polyfill.js"(exports, module) {
    "use strict";
    var implementation = require_implementation3();
    var lacksProperEnumerationOrder = function() {
      if (!Object.assign) {
        return false;
      }
      var str = "abcdefghijklmnopqrst";
      var letters = str.split("");
      var map = {};
      for (var i = 0; i < letters.length; ++i) {
        map[letters[i]] = letters[i];
      }
      var obj = Object.assign({}, map);
      var actual = "";
      for (var k in obj) {
        actual += k;
      }
      return str !== actual;
    };
    var assignHasPendingExceptions = function() {
      if (!Object.assign || !Object.preventExtensions) {
        return false;
      }
      var thrower = Object.preventExtensions({ 1: 2 });
      try {
        Object.assign(thrower, "xy");
      } catch (e) {
        return thrower[1] === "y";
      }
      return false;
    };
    module.exports = function getPolyfill() {
      if (!Object.assign) {
        return implementation;
      }
      if (lacksProperEnumerationOrder()) {
        return implementation;
      }
      if (assignHasPendingExceptions()) {
        return implementation;
      }
      return Object.assign;
    };
  }
});

// node_modules/assert/node_modules/util/support/isBufferBrowser.js
var require_isBufferBrowser = __commonJS({
  "node_modules/assert/node_modules/util/support/isBufferBrowser.js"(exports, module) {
    module.exports = function isBuffer(arg) {
      return arg && typeof arg === "object" && typeof arg.copy === "function" && typeof arg.fill === "function" && typeof arg.readUInt8 === "function";
    };
  }
});

// node_modules/assert/node_modules/inherits/inherits_browser.js
var require_inherits_browser = __commonJS({
  "node_modules/assert/node_modules/inherits/inherits_browser.js"(exports, module) {
    if (typeof Object.create === "function") {
      module.exports = function inherits(ctor, superCtor) {
        ctor.super_ = superCtor;
        ctor.prototype = Object.create(superCtor.prototype, {
          constructor: {
            value: ctor,
            enumerable: false,
            writable: true,
            configurable: true
          }
        });
      };
    } else {
      module.exports = function inherits(ctor, superCtor) {
        ctor.super_ = superCtor;
        var TempCtor = function() {
        };
        TempCtor.prototype = superCtor.prototype;
        ctor.prototype = new TempCtor();
        ctor.prototype.constructor = ctor;
      };
    }
  }
});

// node_modules/assert/node_modules/util/util.js
var require_util = __commonJS({
  "node_modules/assert/node_modules/util/util.js"(exports) {
    var formatRegExp = /%[sdj%]/g;
    exports.format = function(f) {
      if (!isString(f)) {
        var objects = [];
        for (var i = 0; i < arguments.length; i++) {
          objects.push(inspect(arguments[i]));
        }
        return objects.join(" ");
      }
      var i = 1;
      var args = arguments;
      var len = args.length;
      var str = String(f).replace(formatRegExp, function(x2) {
        if (x2 === "%%") return "%";
        if (i >= len) return x2;
        switch (x2) {
          case "%s":
            return String(args[i++]);
          case "%d":
            return Number(args[i++]);
          case "%j":
            try {
              return JSON.stringify(args[i++]);
            } catch (_) {
              return "[Circular]";
            }
          default:
            return x2;
        }
      });
      for (var x = args[i]; i < len; x = args[++i]) {
        if (isNull(x) || !isObject(x)) {
          str += " " + x;
        } else {
          str += " " + inspect(x);
        }
      }
      return str;
    };
    exports.deprecate = function(fn, msg) {
      if (isUndefined(global.process)) {
        return function() {
          return exports.deprecate(fn, msg).apply(this, arguments);
        };
      }
      if (process.noDeprecation === true) {
        return fn;
      }
      var warned = false;
      function deprecated() {
        if (!warned) {
          if (process.throwDeprecation) {
            throw new Error(msg);
          } else if (process.traceDeprecation) {
            console.trace(msg);
          } else {
            console.error(msg);
          }
          warned = true;
        }
        return fn.apply(this, arguments);
      }
      return deprecated;
    };
    var debugs = {};
    var debugEnviron;
    exports.debuglog = function(set) {
      if (isUndefined(debugEnviron))
        debugEnviron = process.env.NODE_DEBUG || "";
      set = set.toUpperCase();
      if (!debugs[set]) {
        if (new RegExp("\\b" + set + "\\b", "i").test(debugEnviron)) {
          var pid = process.pid;
          debugs[set] = function() {
            var msg = exports.format.apply(exports, arguments);
            console.error("%s %d: %s", set, pid, msg);
          };
        } else {
          debugs[set] = function() {
          };
        }
      }
      return debugs[set];
    };
    function inspect(obj, opts) {
      var ctx = {
        seen: [],
        stylize: stylizeNoColor
      };
      if (arguments.length >= 3) ctx.depth = arguments[2];
      if (arguments.length >= 4) ctx.colors = arguments[3];
      if (isBoolean(opts)) {
        ctx.showHidden = opts;
      } else if (opts) {
        exports._extend(ctx, opts);
      }
      if (isUndefined(ctx.showHidden)) ctx.showHidden = false;
      if (isUndefined(ctx.depth)) ctx.depth = 2;
      if (isUndefined(ctx.colors)) ctx.colors = false;
      if (isUndefined(ctx.customInspect)) ctx.customInspect = true;
      if (ctx.colors) ctx.stylize = stylizeWithColor;
      return formatValue(ctx, obj, ctx.depth);
    }
    exports.inspect = inspect;
    inspect.colors = {
      "bold": [1, 22],
      "italic": [3, 23],
      "underline": [4, 24],
      "inverse": [7, 27],
      "white": [37, 39],
      "grey": [90, 39],
      "black": [30, 39],
      "blue": [34, 39],
      "cyan": [36, 39],
      "green": [32, 39],
      "magenta": [35, 39],
      "red": [31, 39],
      "yellow": [33, 39]
    };
    inspect.styles = {
      "special": "cyan",
      "number": "yellow",
      "boolean": "yellow",
      "undefined": "grey",
      "null": "bold",
      "string": "green",
      "date": "magenta",
      // "name": intentionally not styling
      "regexp": "red"
    };
    function stylizeWithColor(str, styleType) {
      var style = inspect.styles[styleType];
      if (style) {
        return "\x1B[" + inspect.colors[style][0] + "m" + str + "\x1B[" + inspect.colors[style][1] + "m";
      } else {
        return str;
      }
    }
    function stylizeNoColor(str, styleType) {
      return str;
    }
    function arrayToHash(array) {
      var hash = {};
      array.forEach(function(val, idx) {
        hash[val] = true;
      });
      return hash;
    }
    function formatValue(ctx, value, recurseTimes) {
      if (ctx.customInspect && value && isFunction(value.inspect) && // Filter out the util module, it's inspect function is special
      value.inspect !== exports.inspect && // Also filter out any prototype objects using the circular check.
      !(value.constructor && value.constructor.prototype === value)) {
        var ret = value.inspect(recurseTimes, ctx);
        if (!isString(ret)) {
          ret = formatValue(ctx, ret, recurseTimes);
        }
        return ret;
      }
      var primitive = formatPrimitive(ctx, value);
      if (primitive) {
        return primitive;
      }
      var keys = Object.keys(value);
      var visibleKeys = arrayToHash(keys);
      if (ctx.showHidden) {
        keys = Object.getOwnPropertyNames(value);
      }
      if (isError(value) && (keys.indexOf("message") >= 0 || keys.indexOf("description") >= 0)) {
        return formatError(value);
      }
      if (keys.length === 0) {
        if (isFunction(value)) {
          var name = value.name ? ": " + value.name : "";
          return ctx.stylize("[Function" + name + "]", "special");
        }
        if (isRegExp(value)) {
          return ctx.stylize(RegExp.prototype.toString.call(value), "regexp");
        }
        if (isDate(value)) {
          return ctx.stylize(Date.prototype.toString.call(value), "date");
        }
        if (isError(value)) {
          return formatError(value);
        }
      }
      var base = "", array = false, braces = ["{", "}"];
      if (isArray(value)) {
        array = true;
        braces = ["[", "]"];
      }
      if (isFunction(value)) {
        var n = value.name ? ": " + value.name : "";
        base = " [Function" + n + "]";
      }
      if (isRegExp(value)) {
        base = " " + RegExp.prototype.toString.call(value);
      }
      if (isDate(value)) {
        base = " " + Date.prototype.toUTCString.call(value);
      }
      if (isError(value)) {
        base = " " + formatError(value);
      }
      if (keys.length === 0 && (!array || value.length == 0)) {
        return braces[0] + base + braces[1];
      }
      if (recurseTimes < 0) {
        if (isRegExp(value)) {
          return ctx.stylize(RegExp.prototype.toString.call(value), "regexp");
        } else {
          return ctx.stylize("[Object]", "special");
        }
      }
      ctx.seen.push(value);
      var output;
      if (array) {
        output = formatArray(ctx, value, recurseTimes, visibleKeys, keys);
      } else {
        output = keys.map(function(key) {
          return formatProperty(ctx, value, recurseTimes, visibleKeys, key, array);
        });
      }
      ctx.seen.pop();
      return reduceToSingleString(output, base, braces);
    }
    function formatPrimitive(ctx, value) {
      if (isUndefined(value))
        return ctx.stylize("undefined", "undefined");
      if (isString(value)) {
        var simple = "'" + JSON.stringify(value).replace(/^"|"$/g, "").replace(/'/g, "\\'").replace(/\\"/g, '"') + "'";
        return ctx.stylize(simple, "string");
      }
      if (isNumber(value))
        return ctx.stylize("" + value, "number");
      if (isBoolean(value))
        return ctx.stylize("" + value, "boolean");
      if (isNull(value))
        return ctx.stylize("null", "null");
    }
    function formatError(value) {
      return "[" + Error.prototype.toString.call(value) + "]";
    }
    function formatArray(ctx, value, recurseTimes, visibleKeys, keys) {
      var output = [];
      for (var i = 0, l = value.length; i < l; ++i) {
        if (hasOwnProperty(value, String(i))) {
          output.push(formatProperty(
            ctx,
            value,
            recurseTimes,
            visibleKeys,
            String(i),
            true
          ));
        } else {
          output.push("");
        }
      }
      keys.forEach(function(key) {
        if (!key.match(/^\d+$/)) {
          output.push(formatProperty(
            ctx,
            value,
            recurseTimes,
            visibleKeys,
            key,
            true
          ));
        }
      });
      return output;
    }
    function formatProperty(ctx, value, recurseTimes, visibleKeys, key, array) {
      var name, str, desc;
      desc = Object.getOwnPropertyDescriptor(value, key) || { value: value[key] };
      if (desc.get) {
        if (desc.set) {
          str = ctx.stylize("[Getter/Setter]", "special");
        } else {
          str = ctx.stylize("[Getter]", "special");
        }
      } else {
        if (desc.set) {
          str = ctx.stylize("[Setter]", "special");
        }
      }
      if (!hasOwnProperty(visibleKeys, key)) {
        name = "[" + key + "]";
      }
      if (!str) {
        if (ctx.seen.indexOf(desc.value) < 0) {
          if (isNull(recurseTimes)) {
            str = formatValue(ctx, desc.value, null);
          } else {
            str = formatValue(ctx, desc.value, recurseTimes - 1);
          }
          if (str.indexOf("\n") > -1) {
            if (array) {
              str = str.split("\n").map(function(line) {
                return "  " + line;
              }).join("\n").substr(2);
            } else {
              str = "\n" + str.split("\n").map(function(line) {
                return "   " + line;
              }).join("\n");
            }
          }
        } else {
          str = ctx.stylize("[Circular]", "special");
        }
      }
      if (isUndefined(name)) {
        if (array && key.match(/^\d+$/)) {
          return str;
        }
        name = JSON.stringify("" + key);
        if (name.match(/^"([a-zA-Z_][a-zA-Z_0-9]*)"$/)) {
          name = name.substr(1, name.length - 2);
          name = ctx.stylize(name, "name");
        } else {
          name = name.replace(/'/g, "\\'").replace(/\\"/g, '"').replace(/(^"|"$)/g, "'");
          name = ctx.stylize(name, "string");
        }
      }
      return name + ": " + str;
    }
    function reduceToSingleString(output, base, braces) {
      var numLinesEst = 0;
      var length = output.reduce(function(prev, cur) {
        numLinesEst++;
        if (cur.indexOf("\n") >= 0) numLinesEst++;
        return prev + cur.replace(/\u001b\[\d\d?m/g, "").length + 1;
      }, 0);
      if (length > 60) {
        return braces[0] + (base === "" ? "" : base + "\n ") + " " + output.join(",\n  ") + " " + braces[1];
      }
      return braces[0] + base + " " + output.join(", ") + " " + braces[1];
    }
    function isArray(ar) {
      return Array.isArray(ar);
    }
    exports.isArray = isArray;
    function isBoolean(arg) {
      return typeof arg === "boolean";
    }
    exports.isBoolean = isBoolean;
    function isNull(arg) {
      return arg === null;
    }
    exports.isNull = isNull;
    function isNullOrUndefined(arg) {
      return arg == null;
    }
    exports.isNullOrUndefined = isNullOrUndefined;
    function isNumber(arg) {
      return typeof arg === "number";
    }
    exports.isNumber = isNumber;
    function isString(arg) {
      return typeof arg === "string";
    }
    exports.isString = isString;
    function isSymbol(arg) {
      return typeof arg === "symbol";
    }
    exports.isSymbol = isSymbol;
    function isUndefined(arg) {
      return arg === void 0;
    }
    exports.isUndefined = isUndefined;
    function isRegExp(re) {
      return isObject(re) && objectToString(re) === "[object RegExp]";
    }
    exports.isRegExp = isRegExp;
    function isObject(arg) {
      return typeof arg === "object" && arg !== null;
    }
    exports.isObject = isObject;
    function isDate(d) {
      return isObject(d) && objectToString(d) === "[object Date]";
    }
    exports.isDate = isDate;
    function isError(e) {
      return isObject(e) && (objectToString(e) === "[object Error]" || e instanceof Error);
    }
    exports.isError = isError;
    function isFunction(arg) {
      return typeof arg === "function";
    }
    exports.isFunction = isFunction;
    function isPrimitive(arg) {
      return arg === null || typeof arg === "boolean" || typeof arg === "number" || typeof arg === "string" || typeof arg === "symbol" || // ES6 symbol
      typeof arg === "undefined";
    }
    exports.isPrimitive = isPrimitive;
    exports.isBuffer = require_isBufferBrowser();
    function objectToString(o) {
      return Object.prototype.toString.call(o);
    }
    function pad(n) {
      return n < 10 ? "0" + n.toString(10) : n.toString(10);
    }
    var months = [
      "Jan",
      "Feb",
      "Mar",
      "Apr",
      "May",
      "Jun",
      "Jul",
      "Aug",
      "Sep",
      "Oct",
      "Nov",
      "Dec"
    ];
    function timestamp() {
      var d = /* @__PURE__ */ new Date();
      var time = [
        pad(d.getHours()),
        pad(d.getMinutes()),
        pad(d.getSeconds())
      ].join(":");
      return [d.getDate(), months[d.getMonth()], time].join(" ");
    }
    exports.log = function() {
      console.log("%s - %s", timestamp(), exports.format.apply(exports, arguments));
    };
    exports.inherits = require_inherits_browser();
    exports._extend = function(origin, add) {
      if (!add || !isObject(add)) return origin;
      var keys = Object.keys(add);
      var i = keys.length;
      while (i--) {
        origin[keys[i]] = add[keys[i]];
      }
      return origin;
    };
    function hasOwnProperty(obj, prop) {
      return Object.prototype.hasOwnProperty.call(obj, prop);
    }
  }
});

// node_modules/assert/assert.js
var require_assert = __commonJS({
  "node_modules/assert/assert.js"(exports, module) {
    "use strict";
    var objectAssign = require_polyfill()();
    function compare(a, b) {
      if (a === b) {
        return 0;
      }
      var x = a.length;
      var y = b.length;
      for (var i = 0, len = Math.min(x, y); i < len; ++i) {
        if (a[i] !== b[i]) {
          x = a[i];
          y = b[i];
          break;
        }
      }
      if (x < y) {
        return -1;
      }
      if (y < x) {
        return 1;
      }
      return 0;
    }
    function isBuffer(b) {
      if (global.Buffer && typeof global.Buffer.isBuffer === "function") {
        return global.Buffer.isBuffer(b);
      }
      return !!(b != null && b._isBuffer);
    }
    var util = require_util();
    var hasOwn = Object.prototype.hasOwnProperty;
    var pSlice = Array.prototype.slice;
    var functionsHaveNames = function() {
      return function foo() {
      }.name === "foo";
    }();
    function pToString(obj) {
      return Object.prototype.toString.call(obj);
    }
    function isView(arrbuf) {
      if (isBuffer(arrbuf)) {
        return false;
      }
      if (typeof global.ArrayBuffer !== "function") {
        return false;
      }
      if (typeof ArrayBuffer.isView === "function") {
        return ArrayBuffer.isView(arrbuf);
      }
      if (!arrbuf) {
        return false;
      }
      if (arrbuf instanceof DataView) {
        return true;
      }
      if (arrbuf.buffer && arrbuf.buffer instanceof ArrayBuffer) {
        return true;
      }
      return false;
    }
    var assert2 = module.exports = ok;
    var regex = /\s*function\s+([^\(\s]*)\s*/;
    function getName(func) {
      if (!util.isFunction(func)) {
        return;
      }
      if (functionsHaveNames) {
        return func.name;
      }
      var str = func.toString();
      var match = str.match(regex);
      return match && match[1];
    }
    assert2.AssertionError = function AssertionError(options) {
      this.name = "AssertionError";
      this.actual = options.actual;
      this.expected = options.expected;
      this.operator = options.operator;
      if (options.message) {
        this.message = options.message;
        this.generatedMessage = false;
      } else {
        this.message = getMessage(this);
        this.generatedMessage = true;
      }
      var stackStartFunction = options.stackStartFunction || fail;
      if (Error.captureStackTrace) {
        Error.captureStackTrace(this, stackStartFunction);
      } else {
        var err = new Error();
        if (err.stack) {
          var out = err.stack;
          var fn_name = getName(stackStartFunction);
          var idx = out.indexOf("\n" + fn_name);
          if (idx >= 0) {
            var next_line = out.indexOf("\n", idx + 1);
            out = out.substring(next_line + 1);
          }
          this.stack = out;
        }
      }
    };
    util.inherits(assert2.AssertionError, Error);
    function truncate(s, n) {
      if (typeof s === "string") {
        return s.length < n ? s : s.slice(0, n);
      } else {
        return s;
      }
    }
    function inspect(something) {
      if (functionsHaveNames || !util.isFunction(something)) {
        return util.inspect(something);
      }
      var rawname = getName(something);
      var name = rawname ? ": " + rawname : "";
      return "[Function" + name + "]";
    }
    function getMessage(self) {
      return truncate(inspect(self.actual), 128) + " " + self.operator + " " + truncate(inspect(self.expected), 128);
    }
    function fail(actual, expected, message, operator, stackStartFunction) {
      throw new assert2.AssertionError({
        message,
        actual,
        expected,
        operator,
        stackStartFunction
      });
    }
    assert2.fail = fail;
    function ok(value, message) {
      if (!value) fail(value, true, message, "==", assert2.ok);
    }
    assert2.ok = ok;
    assert2.equal = function equal(actual, expected, message) {
      if (actual != expected) fail(actual, expected, message, "==", assert2.equal);
    };
    assert2.notEqual = function notEqual(actual, expected, message) {
      if (actual == expected) {
        fail(actual, expected, message, "!=", assert2.notEqual);
      }
    };
    assert2.deepEqual = function deepEqual(actual, expected, message) {
      if (!_deepEqual(actual, expected, false)) {
        fail(actual, expected, message, "deepEqual", assert2.deepEqual);
      }
    };
    assert2.deepStrictEqual = function deepStrictEqual(actual, expected, message) {
      if (!_deepEqual(actual, expected, true)) {
        fail(actual, expected, message, "deepStrictEqual", assert2.deepStrictEqual);
      }
    };
    function _deepEqual(actual, expected, strict2, memos) {
      if (actual === expected) {
        return true;
      } else if (isBuffer(actual) && isBuffer(expected)) {
        return compare(actual, expected) === 0;
      } else if (util.isDate(actual) && util.isDate(expected)) {
        return actual.getTime() === expected.getTime();
      } else if (util.isRegExp(actual) && util.isRegExp(expected)) {
        return actual.source === expected.source && actual.global === expected.global && actual.multiline === expected.multiline && actual.lastIndex === expected.lastIndex && actual.ignoreCase === expected.ignoreCase;
      } else if ((actual === null || typeof actual !== "object") && (expected === null || typeof expected !== "object")) {
        return strict2 ? actual === expected : actual == expected;
      } else if (isView(actual) && isView(expected) && pToString(actual) === pToString(expected) && !(actual instanceof Float32Array || actual instanceof Float64Array)) {
        return compare(
          new Uint8Array(actual.buffer),
          new Uint8Array(expected.buffer)
        ) === 0;
      } else if (isBuffer(actual) !== isBuffer(expected)) {
        return false;
      } else {
        memos = memos || { actual: [], expected: [] };
        var actualIndex = memos.actual.indexOf(actual);
        if (actualIndex !== -1) {
          if (actualIndex === memos.expected.indexOf(expected)) {
            return true;
          }
        }
        memos.actual.push(actual);
        memos.expected.push(expected);
        return objEquiv(actual, expected, strict2, memos);
      }
    }
    function isArguments(object) {
      return Object.prototype.toString.call(object) == "[object Arguments]";
    }
    function objEquiv(a, b, strict2, actualVisitedObjects) {
      if (a === null || a === void 0 || b === null || b === void 0)
        return false;
      if (util.isPrimitive(a) || util.isPrimitive(b))
        return a === b;
      if (strict2 && Object.getPrototypeOf(a) !== Object.getPrototypeOf(b))
        return false;
      var aIsArgs = isArguments(a);
      var bIsArgs = isArguments(b);
      if (aIsArgs && !bIsArgs || !aIsArgs && bIsArgs)
        return false;
      if (aIsArgs) {
        a = pSlice.call(a);
        b = pSlice.call(b);
        return _deepEqual(a, b, strict2);
      }
      var ka = objectKeys(a);
      var kb = objectKeys(b);
      var key, i;
      if (ka.length !== kb.length)
        return false;
      ka.sort();
      kb.sort();
      for (i = ka.length - 1; i >= 0; i--) {
        if (ka[i] !== kb[i])
          return false;
      }
      for (i = ka.length - 1; i >= 0; i--) {
        key = ka[i];
        if (!_deepEqual(a[key], b[key], strict2, actualVisitedObjects))
          return false;
      }
      return true;
    }
    assert2.notDeepEqual = function notDeepEqual(actual, expected, message) {
      if (_deepEqual(actual, expected, false)) {
        fail(actual, expected, message, "notDeepEqual", assert2.notDeepEqual);
      }
    };
    assert2.notDeepStrictEqual = notDeepStrictEqual;
    function notDeepStrictEqual(actual, expected, message) {
      if (_deepEqual(actual, expected, true)) {
        fail(actual, expected, message, "notDeepStrictEqual", notDeepStrictEqual);
      }
    }
    assert2.strictEqual = function strictEqual(actual, expected, message) {
      if (actual !== expected) {
        fail(actual, expected, message, "===", assert2.strictEqual);
      }
    };
    assert2.notStrictEqual = function notStrictEqual(actual, expected, message) {
      if (actual === expected) {
        fail(actual, expected, message, "!==", assert2.notStrictEqual);
      }
    };
    function expectedException(actual, expected) {
      if (!actual || !expected) {
        return false;
      }
      if (Object.prototype.toString.call(expected) == "[object RegExp]") {
        return expected.test(actual);
      }
      try {
        if (actual instanceof expected) {
          return true;
        }
      } catch (e) {
      }
      if (Error.isPrototypeOf(expected)) {
        return false;
      }
      return expected.call({}, actual) === true;
    }
    function _tryBlock(block) {
      var error;
      try {
        block();
      } catch (e) {
        error = e;
      }
      return error;
    }
    function _throws(shouldThrow, block, expected, message) {
      var actual;
      if (typeof block !== "function") {
        throw new TypeError('"block" argument must be a function');
      }
      if (typeof expected === "string") {
        message = expected;
        expected = null;
      }
      actual = _tryBlock(block);
      message = (expected && expected.name ? " (" + expected.name + ")." : ".") + (message ? " " + message : ".");
      if (shouldThrow && !actual) {
        fail(actual, expected, "Missing expected exception" + message);
      }
      var userProvidedMessage = typeof message === "string";
      var isUnwantedException = !shouldThrow && util.isError(actual);
      var isUnexpectedException = !shouldThrow && actual && !expected;
      if (isUnwantedException && userProvidedMessage && expectedException(actual, expected) || isUnexpectedException) {
        fail(actual, expected, "Got unwanted exception" + message);
      }
      if (shouldThrow && actual && expected && !expectedException(actual, expected) || !shouldThrow && actual) {
        throw actual;
      }
    }
    assert2.throws = function(block, error, message) {
      _throws(true, block, error, message);
    };
    assert2.doesNotThrow = function(block, error, message) {
      _throws(false, block, error, message);
    };
    assert2.ifError = function(err) {
      if (err) throw err;
    };
    function strict(value, message) {
      if (!value) fail(value, true, message, "==", strict);
    }
    assert2.strict = objectAssign(strict, assert2, {
      equal: assert2.strictEqual,
      deepEqual: assert2.deepStrictEqual,
      notEqual: assert2.notStrictEqual,
      notDeepEqual: assert2.notDeepStrictEqual
    });
    assert2.strict.strict = assert2.strict;
    var objectKeys = Object.keys || function(obj) {
      var keys = [];
      for (var key in obj) {
        if (hasOwn.call(obj, key)) keys.push(key);
      }
      return keys;
    };
  }
});

// lib/difflib.js
var Differ;
var Heap;
var IS_CHARACTER_JUNK;
var IS_LINE_JUNK;
var SequenceMatcher;
var _any;
var _arrayCmp;
var _calculateRatio;
var _countLeading;
var _formatRangeContext;
var _formatRangeUnified;
var _has;
var assert;
var contextDiff;
var floor;
var getCloseMatches;
var max;
var min;
var ndiff;
var restore;
var unifiedDiff;
var indexOf = [].indexOf;
({ floor, max, min } = Math);
Heap = require_heap2();
assert = require_assert();
_calculateRatio = function(matches, length) {
  if (length) {
    return 2 * matches / length;
  } else {
    return 1;
  }
};
_arrayCmp = function(a, b) {
  var i, l, la, lb, ref;
  [la, lb] = [a.length, b.length];
  for (i = l = 0, ref = min(la, lb); 0 <= ref ? l < ref : l > ref; i = 0 <= ref ? ++l : --l) {
    if (a[i] < b[i]) {
      return -1;
    }
    if (a[i] > b[i]) {
      return 1;
    }
  }
  return la - lb;
};
_has = function(obj, key) {
  return Object.prototype.hasOwnProperty.call(obj, key);
};
_any = function(items) {
  var item, l, len;
  for (l = 0, len = items.length; l < len; l++) {
    item = items[l];
    if (item) {
      return true;
    }
  }
  return false;
};
SequenceMatcher = class SequenceMatcher2 {
  /*
    SequenceMatcher is a flexible class for comparing pairs of sequences of
    any type, so long as the sequence elements are hashable.  The basic
    algorithm predates, and is a little fancier than, an algorithm
    published in the late 1980's by Ratcliff and Obershelp under the
    hyperbolic name "gestalt pattern matching".  The basic idea is to find
    the longest contiguous matching subsequence that contains no "junk"
    elements (R-O doesn't address junk).  The same idea is then applied
    recursively to the pieces of the sequences to the left and to the right
    of the matching subsequence.  This does not yield minimal edit
    sequences, but does tend to yield matches that "look right" to people.
  
    SequenceMatcher tries to compute a "human-friendly diff" between two
    sequences.  Unlike e.g. UNIX(tm) diff, the fundamental notion is the
    longest *contiguous* & junk-free matching subsequence.  That's what
    catches peoples' eyes.  The Windows(tm) windiff has another interesting
    notion, pairing up elements that appear uniquely in each sequence.
    That, and the method here, appear to yield more intuitive difference
    reports than does diff.  This method appears to be the least vulnerable
    to synching up on blocks of "junk lines", though (like blank lines in
    ordinary text files, or maybe "<P>" lines in HTML files).  That may be
    because this is the only method of the 3 that has a *concept* of
    "junk" <wink>.
  
    Example, comparing two strings, and considering blanks to be "junk":
  
    >>> isjunk = (c) -> c is ' '
    >>> s = new SequenceMatcher(isjunk,
                                'private Thread currentThread;',
                                'private volatile Thread currentThread;')
  
    .ratio() returns a float in [0, 1], measuring the "similarity" of the
    sequences.  As a rule of thumb, a .ratio() value over 0.6 means the
    sequences are close matches:
  
    >>> s.ratio().toPrecision(3)
    '0.866'
  
    If you're only interested in where the sequences match,
    .getMatchingBlocks() is handy:
  
    >>> for [a, b, size] in s.getMatchingBlocks()
    ...   console.log("a[#{a}] and b[#{b}] match for #{size} elements");
    a[0] and b[0] match for 8 elements
    a[8] and b[17] match for 21 elements
    a[29] and b[38] match for 0 elements
  
    Note that the last tuple returned by .get_matching_blocks() is always a
    dummy, (len(a), len(b), 0), and this is the only case in which the last
    tuple element (number of elements matched) is 0.
  
    If you want to know how to change the first sequence into the second,
    use .get_opcodes():
  
    >>> for [op, a1, a2, b1, b2] in s.getOpcodes()
    ...   console.log "#{op} a[#{a1}:#{a2}] b[#{b1}:#{b2}]"
    equal a[0:8] b[0:8]
    insert a[8:8] b[8:17]
    equal a[8:29] b[17:38]
  
    See the Differ class for a fancy human-friendly file differencer, which
    uses SequenceMatcher both to compare sequences of lines, and to compare
    sequences of characters within similar (near-matching) lines.
  
    See also function getCloseMatches() in this module, which shows how
    simple code building on SequenceMatcher can be used to do useful work.
  
    Timing:  Basic R-O is cubic time worst case and quadratic time expected
    case.  SequenceMatcher is quadratic time for the worst case and has
    expected-case behavior dependent in a complicated way on how many
    elements the sequences have in common; best case time is linear.
  
    Methods:
  
    constructor(isjunk=null, a='', b='')
        Construct a SequenceMatcher.
  
    setSeqs(a, b)
        Set the two sequences to be compared.
  
    setSeq1(a)
        Set the first sequence to be compared.
  
    setSeq2(b)
        Set the second sequence to be compared.
  
    findLongestMatch(alo, ahi, blo, bhi)
        Find longest matching block in a[alo:ahi] and b[blo:bhi].
  
    getMatchingBlocks()
        Return list of triples describing matching subsequences.
  
    getOpcodes()
        Return list of 5-tuples describing how to turn a into b.
  
    ratio()
        Return a measure of the sequences' similarity (float in [0,1]).
  
    quickRatio()
        Return an upper bound on .ratio() relatively quickly.
  
    realQuickRatio()
        Return an upper bound on ratio() very quickly.
    */
  constructor(isjunk1, a = "", b = "", autojunk = true) {
    this.isjunk = isjunk1;
    this.autojunk = autojunk;
    this.a = this.b = null;
    this.setSeqs(a, b);
  }
  setSeqs(a, b) {
    this.setSeq1(a);
    return this.setSeq2(b);
  }
  setSeq1(a) {
    if (a === this.a) {
      return;
    }
    this.a = a;
    return this.matchingBlocks = this.opcodes = null;
  }
  setSeq2(b) {
    if (b === this.b) {
      return;
    }
    this.b = b;
    this.matchingBlocks = this.opcodes = null;
    this.fullbcount = null;
    return this._chainB();
  }
  // For each element x in b, set b2j[x] to a list of the indices in
  // b where x appears; the indices are in increasing order; note that
  // the number of times x appears in b is b2j[x].length ...
  // when @isjunk is defined, junk elements don't show up in this
  // map at all, which stops the central findLongestMatch method
  // from starting any matching block at a junk element ...
  // also creates the fast isbjunk function ...
  // b2j also does not contain entries for "popular" elements, meaning
  // elements that account for more than 1 + 1% of the total elements, and
  // when the sequence is reasonably large (>= 200 elements); this can
  // be viewed as an adaptive notion of semi-junk, and yields an enormous
  // speedup when, e.g., comparing program files with hundreds of
  // instances of "return null;" ...
  // note that this is only called when b changes; so for cross-product
  // kinds of matches, it's best to call setSeq2 once, then setSeq1
  // repeatedly
  _chainB() {
    var b, b2j, elt, i, idxs, indices, isjunk, junk, l, len, len1, m, n, ntest, popular, ref;
    b = this.b;
    this.b2j = b2j = {};
    for (i = l = 0, len = b.length; l < len; i = ++l) {
      elt = b[i];
      indices = _has(b2j, elt) ? b2j[elt] : b2j[elt] = [];
      indices.push(i);
    }
    junk = {};
    isjunk = this.isjunk;
    if (isjunk) {
      ref = Object.keys(b2j);
      for (m = 0, len1 = ref.length; m < len1; m++) {
        elt = ref[m];
        if (isjunk(elt)) {
          junk[elt] = true;
          delete b2j[elt];
        }
      }
    }
    popular = {};
    n = b.length;
    if (this.autojunk && n >= 200) {
      ntest = floor(n / 100) + 1;
      for (elt in b2j) {
        idxs = b2j[elt];
        if (idxs.length > ntest) {
          popular[elt] = true;
          delete b2j[elt];
        }
      }
    }
    this.isbjunk = function(b2) {
      return _has(junk, b2);
    };
    return this.isbpopular = function(b2) {
      return _has(popular, b2);
    };
  }
  findLongestMatch(alo, ahi, blo, bhi) {
    var a, b, b2j, besti, bestj, bestsize, i, isbjunk, j, j2len, k, l, len, m, newj2len, ref, ref1, ref2;
    [a, b, b2j, isbjunk] = [this.a, this.b, this.b2j, this.isbjunk];
    [besti, bestj, bestsize] = [alo, blo, 0];
    j2len = {};
    for (i = l = ref = alo, ref1 = ahi; ref <= ref1 ? l < ref1 : l > ref1; i = ref <= ref1 ? ++l : --l) {
      newj2len = {};
      ref2 = _has(b2j, a[i]) ? b2j[a[i]] : [];
      for (m = 0, len = ref2.length; m < len; m++) {
        j = ref2[m];
        if (j < blo) {
          continue;
        }
        if (j >= bhi) {
          break;
        }
        k = newj2len[j] = (j2len[j - 1] || 0) + 1;
        if (k > bestsize) {
          [besti, bestj, bestsize] = [i - k + 1, j - k + 1, k];
        }
      }
      j2len = newj2len;
    }
    while (besti > alo && bestj > blo && !isbjunk(b[bestj - 1]) && a[besti - 1] === b[bestj - 1]) {
      [besti, bestj, bestsize] = [besti - 1, bestj - 1, bestsize + 1];
    }
    while (besti + bestsize < ahi && bestj + bestsize < bhi && !isbjunk(b[bestj + bestsize]) && a[besti + bestsize] === b[bestj + bestsize]) {
      bestsize++;
    }
    while (besti > alo && bestj > blo && isbjunk(b[bestj - 1]) && a[besti - 1] === b[bestj - 1]) {
      [besti, bestj, bestsize] = [besti - 1, bestj - 1, bestsize + 1];
    }
    while (besti + bestsize < ahi && bestj + bestsize < bhi && isbjunk(b[bestj + bestsize]) && a[besti + bestsize] === b[bestj + bestsize]) {
      bestsize++;
    }
    return [besti, bestj, bestsize];
  }
  getMatchingBlocks() {
    var ahi, alo, bhi, blo, i, i1, i2, j, j1, j2, k, k1, k2, l, la, lb, len, matchingBlocks, nonAdjacent, queue, x;
    if (this.matchingBlocks) {
      return this.matchingBlocks;
    }
    [la, lb] = [this.a.length, this.b.length];
    queue = [[0, la, 0, lb]];
    matchingBlocks = [];
    while (queue.length) {
      [alo, ahi, blo, bhi] = queue.pop();
      [i, j, k] = x = this.findLongestMatch(alo, ahi, blo, bhi);
      if (k) {
        matchingBlocks.push(x);
        if (alo < i && blo < j) {
          queue.push([alo, i, blo, j]);
        }
        if (i + k < ahi && j + k < bhi) {
          queue.push([i + k, ahi, j + k, bhi]);
        }
      }
    }
    matchingBlocks.sort(_arrayCmp);
    i1 = j1 = k1 = 0;
    nonAdjacent = [];
    for (l = 0, len = matchingBlocks.length; l < len; l++) {
      [i2, j2, k2] = matchingBlocks[l];
      if (i1 + k1 === i2 && j1 + k1 === j2) {
        k1 += k2;
      } else {
        if (k1) {
          nonAdjacent.push([i1, j1, k1]);
        }
        [i1, j1, k1] = [i2, j2, k2];
      }
    }
    if (k1) {
      nonAdjacent.push([i1, j1, k1]);
    }
    nonAdjacent.push([la, lb, 0]);
    return this.matchingBlocks = nonAdjacent;
  }
  getOpcodes() {
    var ai, answer, bj, i, j, l, len, ref, size, tag;
    if (this.opcodes) {
      return this.opcodes;
    }
    i = j = 0;
    this.opcodes = answer = [];
    ref = this.getMatchingBlocks();
    for (l = 0, len = ref.length; l < len; l++) {
      [ai, bj, size] = ref[l];
      tag = "";
      if (i < ai && j < bj) {
        tag = "replace";
      } else if (i < ai) {
        tag = "delete";
      } else if (j < bj) {
        tag = "insert";
      }
      if (tag) {
        answer.push([tag, i, ai, j, bj]);
      }
      [i, j] = [ai + size, bj + size];
      if (size) {
        answer.push(["equal", ai, i, bj, j]);
      }
    }
    return answer;
  }
  getGroupedOpcodes(n = 3) {
    var codes, group, groups, i1, i2, j1, j2, l, len, nn, tag;
    codes = this.getOpcodes();
    if (!codes.length) {
      codes = [["equal", 0, 1, 0, 1]];
    }
    if (codes[0][0] === "equal") {
      [tag, i1, i2, j1, j2] = codes[0];
      codes[0] = [tag, max(i1, i2 - n), i2, max(j1, j2 - n), j2];
    }
    if (codes[codes.length - 1][0] === "equal") {
      [tag, i1, i2, j1, j2] = codes[codes.length - 1];
      codes[codes.length - 1] = [tag, i1, min(i2, i1 + n), j1, min(j2, j1 + n)];
    }
    nn = n + n;
    groups = [];
    group = [];
    for (l = 0, len = codes.length; l < len; l++) {
      [tag, i1, i2, j1, j2] = codes[l];
      if (tag === "equal" && i2 - i1 > nn) {
        group.push([tag, i1, min(i2, i1 + n), j1, min(j2, j1 + n)]);
        groups.push(group);
        group = [];
        [i1, j1] = [max(i1, i2 - n), max(j1, j2 - n)];
      }
      group.push([tag, i1, i2, j1, j2]);
    }
    if (group.length && !(group.length === 1 && group[0][0] === "equal")) {
      groups.push(group);
    }
    return groups;
  }
  ratio() {
    var l, len, match, matches, ref;
    matches = 0;
    ref = this.getMatchingBlocks();
    for (l = 0, len = ref.length; l < len; l++) {
      match = ref[l];
      matches += match[2];
    }
    return _calculateRatio(matches, this.a.length + this.b.length);
  }
  quickRatio() {
    var avail, elt, fullbcount, l, len, len1, m, matches, numb, ref, ref1;
    if (!this.fullbcount) {
      this.fullbcount = fullbcount = {};
      ref = this.b;
      for (l = 0, len = ref.length; l < len; l++) {
        elt = ref[l];
        fullbcount[elt] = (fullbcount[elt] || 0) + 1;
      }
    }
    fullbcount = this.fullbcount;
    avail = {};
    matches = 0;
    ref1 = this.a;
    for (m = 0, len1 = ref1.length; m < len1; m++) {
      elt = ref1[m];
      if (_has(avail, elt)) {
        numb = avail[elt];
      } else {
        numb = fullbcount[elt] || 0;
      }
      avail[elt] = numb - 1;
      if (numb > 0) {
        matches++;
      }
    }
    return _calculateRatio(matches, this.a.length + this.b.length);
  }
  realQuickRatio() {
    var la, lb;
    [la, lb] = [this.a.length, this.b.length];
    return _calculateRatio(min(la, lb), la + lb);
  }
};
getCloseMatches = function(word, possibilities, n = 3, cutoff = 0.6) {
  var l, len, len1, m, result, results, s, score, x;
  if (!(n > 0)) {
    throw new Error(`n must be > 0: (${n})`);
  }
  if (!(0 <= cutoff && cutoff <= 1)) {
    throw new Error(`cutoff must be in [0.0, 1.0]: (${cutoff})`);
  }
  result = [];
  s = new SequenceMatcher();
  s.setSeq2(word);
  for (l = 0, len = possibilities.length; l < len; l++) {
    x = possibilities[l];
    s.setSeq1(x);
    if (s.realQuickRatio() >= cutoff && s.quickRatio() >= cutoff && s.ratio() >= cutoff) {
      result.push([s.ratio(), x]);
    }
  }
  result = Heap.nlargest(result, n, _arrayCmp);
  results = [];
  for (m = 0, len1 = result.length; m < len1; m++) {
    [score, x] = result[m];
    results.push(x);
  }
  return results;
};
_countLeading = function(line, ch) {
  var i, n;
  [i, n] = [0, line.length];
  while (i < n && line[i] === ch) {
    i++;
  }
  return i;
};
Differ = class Differ2 {
  /*
    Differ is a class for comparing sequences of lines of text, and
    producing human-readable differences or deltas.  Differ uses
    SequenceMatcher both to compare sequences of lines, and to compare
    sequences of characters within similar (near-matching) lines.
  
    Each line of a Differ delta begins with a two-letter code:
  
        '- '    line unique to sequence 1
        '+ '    line unique to sequence 2
        '  '    line common to both sequences
        '? '    line not present in either input sequence
  
    Lines beginning with '? ' attempt to guide the eye to intraline
    differences, and were not present in either input sequence.  These lines
    can be confusing if the sequences contain tab characters.
  
    Note that Differ makes no claim to produce a *minimal* diff.  To the
    contrary, minimal diffs are often counter-intuitive, because they synch
    up anywhere possible, sometimes accidental matches 100 pages apart.
    Restricting synch points to contiguous matches preserves some notion of
    locality, at the occasional cost of producing a longer diff.
  
    Example: Comparing two texts.
  
    >>> text1 = ['1. Beautiful is better than ugly.\n',
    ...   '2. Explicit is better than implicit.\n',
    ...   '3. Simple is better than complex.\n',
    ...   '4. Complex is better than complicated.\n']
    >>> text1.length
    4
    >>> text2 = ['1. Beautiful is better than ugly.\n',
    ...   '3.   Simple is better than complex.\n',
    ...   '4. Complicated is better than complex.\n',
    ...   '5. Flat is better than nested.\n']
  
    Next we instantiate a Differ object:
  
    >>> d = new Differ()
  
    Note that when instantiating a Differ object we may pass functions to
    filter out line and character 'junk'.
  
    Finally, we compare the two:
  
    >>> result = d.compare(text1, text2)
    [ '  1. Beautiful is better than ugly.\n',
      '- 2. Explicit is better than implicit.\n',
      '- 3. Simple is better than complex.\n',
      '+ 3.   Simple is better than complex.\n',
      '?   ++\n',
      '- 4. Complex is better than complicated.\n',
      '?          ^                     ---- ^\n',
      '+ 4. Complicated is better than complex.\n',
      '?         ++++ ^                      ^\n',
      '+ 5. Flat is better than nested.\n' ]
  
    Methods:
  
    constructor(linejunk=null, charjunk=null)
        Construct a text differencer, with optional filters.
    compare(a, b)
        Compare two sequences of lines; generate the resulting delta.
    */
  constructor(linejunk1, charjunk1) {
    this.linejunk = linejunk1;
    this.charjunk = charjunk1;
  }
  /*
    Construct a text differencer, with optional filters.
  
    The two optional keyword parameters are for filter functions:
  
    - `linejunk`: A function that should accept a single string argument,
      and return true iff the string is junk. The module-level function
      `IS_LINE_JUNK` may be used to filter out lines without visible
      characters, except for at most one splat ('#').  It is recommended
      to leave linejunk null. 
  
    - `charjunk`: A function that should accept a string of length 1. The
      module-level function `IS_CHARACTER_JUNK` may be used to filter out
      whitespace characters (a blank or tab; **note**: bad idea to include
      newline in this!).  Use of IS_CHARACTER_JUNK is recommended.
    */
  compare(a, b) {
    var ahi, alo, bhi, blo, cruncher, g, l, len, len1, line, lines, m, ref, tag;
    cruncher = new SequenceMatcher(this.linejunk, a, b);
    lines = [];
    ref = cruncher.getOpcodes();
    for (l = 0, len = ref.length; l < len; l++) {
      [tag, alo, ahi, blo, bhi] = ref[l];
      switch (tag) {
        case "replace":
          g = this._fancyReplace(a, alo, ahi, b, blo, bhi);
          break;
        case "delete":
          g = this._dump("-", a, alo, ahi);
          break;
        case "insert":
          g = this._dump("+", b, blo, bhi);
          break;
        case "equal":
          g = this._dump(" ", a, alo, ahi);
          break;
        default:
          throw new Error(`unknow tag (${tag})`);
      }
      for (m = 0, len1 = g.length; m < len1; m++) {
        line = g[m];
        lines.push(line);
      }
    }
    return lines;
  }
  _dump(tag, x, lo, hi) {
    var i, l, ref, ref1, results;
    results = [];
    for (i = l = ref = lo, ref1 = hi; ref <= ref1 ? l < ref1 : l > ref1; i = ref <= ref1 ? ++l : --l) {
      results.push(`${tag} ${x[i]}`);
    }
    return results;
  }
  _plainReplace(a, alo, ahi, b, blo, bhi) {
    var first, g, l, len, len1, line, lines, m, ref, second;
    assert(alo < ahi && blo < bhi);
    if (bhi - blo < ahi - alo) {
      first = this._dump("+", b, blo, bhi);
      second = this._dump("-", a, alo, ahi);
    } else {
      first = this._dump("-", a, alo, ahi);
      second = this._dump("+", b, blo, bhi);
    }
    lines = [];
    ref = [first, second];
    for (l = 0, len = ref.length; l < len; l++) {
      g = ref[l];
      for (m = 0, len1 = g.length; m < len1; m++) {
        line = g[m];
        lines.push(line);
      }
    }
    return lines;
  }
  _fancyReplace(a, alo, ahi, b, blo, bhi) {
    var aelt, ai, ai1, ai2, atags, belt, bestRatio, besti, bestj, bj, bj1, bj2, btags, cruncher, cutoff, eqi, eqj, i, j, l, la, lb, len, len1, len2, len3, len4, line, lines, m, o, p, q, r, ref, ref1, ref2, ref3, ref4, ref5, ref6, ref7, ref8, t, tag;
    [bestRatio, cutoff] = [0.74, 0.75];
    cruncher = new SequenceMatcher(this.charjunk);
    [eqi, eqj] = [
      null,
      null
      // 1st indices of equal lines (if any)
    ];
    lines = [];
    for (j = l = ref = blo, ref1 = bhi; ref <= ref1 ? l < ref1 : l > ref1; j = ref <= ref1 ? ++l : --l) {
      bj = b[j];
      cruncher.setSeq2(bj);
      for (i = m = ref2 = alo, ref3 = ahi; ref2 <= ref3 ? m < ref3 : m > ref3; i = ref2 <= ref3 ? ++m : --m) {
        ai = a[i];
        if (ai === bj) {
          if (eqi === null) {
            [eqi, eqj] = [i, j];
          }
          continue;
        }
        cruncher.setSeq1(ai);
        if (cruncher.realQuickRatio() > bestRatio && cruncher.quickRatio() > bestRatio && cruncher.ratio() > bestRatio) {
          [bestRatio, besti, bestj] = [cruncher.ratio(), i, j];
        }
      }
    }
    if (bestRatio < cutoff) {
      if (eqi === null) {
        ref4 = this._plainReplace(a, alo, ahi, b, blo, bhi);
        for (o = 0, len = ref4.length; o < len; o++) {
          line = ref4[o];
          lines.push(line);
        }
        return lines;
      }
      [besti, bestj, bestRatio] = [eqi, eqj, 1];
    } else {
      eqi = null;
    }
    ref5 = this._fancyHelper(a, alo, besti, b, blo, bestj);
    for (p = 0, len1 = ref5.length; p < len1; p++) {
      line = ref5[p];
      lines.push(line);
    }
    [aelt, belt] = [a[besti], b[bestj]];
    if (eqi === null) {
      atags = btags = "";
      cruncher.setSeqs(aelt, belt);
      ref6 = cruncher.getOpcodes();
      for (q = 0, len2 = ref6.length; q < len2; q++) {
        [tag, ai1, ai2, bj1, bj2] = ref6[q];
        [la, lb] = [ai2 - ai1, bj2 - bj1];
        switch (tag) {
          case "replace":
            atags += Array(la + 1).join("^");
            btags += Array(lb + 1).join("^");
            break;
          case "delete":
            atags += Array(la + 1).join("-");
            break;
          case "insert":
            btags += Array(lb + 1).join("+");
            break;
          case "equal":
            atags += Array(la + 1).join(" ");
            btags += Array(lb + 1).join(" ");
            break;
          default:
            throw new Error(`unknow tag (${tag})`);
        }
      }
      ref7 = this._qformat(aelt, belt, atags, btags);
      for (r = 0, len3 = ref7.length; r < len3; r++) {
        line = ref7[r];
        lines.push(line);
      }
    } else {
      lines.push("  " + aelt);
    }
    ref8 = this._fancyHelper(a, besti + 1, ahi, b, bestj + 1, bhi);
    for (t = 0, len4 = ref8.length; t < len4; t++) {
      line = ref8[t];
      lines.push(line);
    }
    return lines;
  }
  _fancyHelper(a, alo, ahi, b, blo, bhi) {
    var g;
    g = [];
    if (alo < ahi) {
      if (blo < bhi) {
        g = this._fancyReplace(a, alo, ahi, b, blo, bhi);
      } else {
        g = this._dump("-", a, alo, ahi);
      }
    } else if (blo < bhi) {
      g = this._dump("+", b, blo, bhi);
    }
    return g;
  }
  _qformat(aline, bline, atags, btags) {
    var common, lines;
    lines = [];
    common = min(_countLeading(aline, "	"), _countLeading(bline, "	"));
    common = min(common, _countLeading(atags.slice(0, common), " "));
    common = min(common, _countLeading(btags.slice(0, common), " "));
    atags = atags.slice(common).replace(/\s+$/, "");
    btags = btags.slice(common).replace(/\s+$/, "");
    lines.push("- " + aline);
    if (atags.length) {
      lines.push(`? ${Array(common + 1).join("	")}${atags}
`);
    }
    lines.push("+ " + bline);
    if (btags.length) {
      lines.push(`? ${Array(common + 1).join("	")}${btags}
`);
    }
    return lines;
  }
};
IS_LINE_JUNK = function(line, pat = /^\s*#?\s*$/) {
  return pat.test(line);
};
IS_CHARACTER_JUNK = function(ch, ws = " 	") {
  return indexOf.call(ws, ch) >= 0;
};
_formatRangeUnified = function(start, stop) {
  var beginning, length;
  beginning = start + 1;
  length = stop - start;
  if (length === 1) {
    return `${beginning}`;
  }
  if (!length) {
    beginning--;
  }
  return `${beginning},${length}`;
};
unifiedDiff = function(a, b, { fromfile, tofile, fromfiledate, tofiledate, n, lineterm } = {}) {
  var file1Range, file2Range, first, fromdate, group, i1, i2, j1, j2, l, last, len, len1, len2, len3, len4, line, lines, m, o, p, q, ref, ref1, ref2, ref3, started, tag, todate;
  if (fromfile == null) {
    fromfile = "";
  }
  if (tofile == null) {
    tofile = "";
  }
  if (fromfiledate == null) {
    fromfiledate = "";
  }
  if (tofiledate == null) {
    tofiledate = "";
  }
  if (n == null) {
    n = 3;
  }
  if (lineterm == null) {
    lineterm = "\n";
  }
  lines = [];
  started = false;
  ref = new SequenceMatcher(null, a, b).getGroupedOpcodes();
  for (l = 0, len = ref.length; l < len; l++) {
    group = ref[l];
    if (!started) {
      started = true;
      fromdate = fromfiledate ? `	${fromfiledate}` : "";
      todate = tofiledate ? `	${tofiledate}` : "";
      lines.push(`--- ${fromfile}${fromdate}${lineterm}`);
      lines.push(`+++ ${tofile}${todate}${lineterm}`);
    }
    [first, last] = [group[0], group[group.length - 1]];
    file1Range = _formatRangeUnified(first[1], last[2]);
    file2Range = _formatRangeUnified(first[3], last[4]);
    lines.push(`@@ -${file1Range} +${file2Range} @@${lineterm}`);
    for (m = 0, len1 = group.length; m < len1; m++) {
      [tag, i1, i2, j1, j2] = group[m];
      if (tag === "equal") {
        ref1 = a.slice(i1, i2);
        for (o = 0, len2 = ref1.length; o < len2; o++) {
          line = ref1[o];
          lines.push(" " + line);
        }
        continue;
      }
      if (tag === "replace" || tag === "delete") {
        ref2 = a.slice(i1, i2);
        for (p = 0, len3 = ref2.length; p < len3; p++) {
          line = ref2[p];
          lines.push("-" + line);
        }
      }
      if (tag === "replace" || tag === "insert") {
        ref3 = b.slice(j1, j2);
        for (q = 0, len4 = ref3.length; q < len4; q++) {
          line = ref3[q];
          lines.push("+" + line);
        }
      }
    }
  }
  return lines;
};
_formatRangeContext = function(start, stop) {
  var beginning, length;
  beginning = start + 1;
  length = stop - start;
  if (!length) {
    beginning--;
  }
  if (length <= 1) {
    return `${beginning}`;
  }
  return `${beginning},${beginning + length - 1}`;
};
contextDiff = function(a, b, { fromfile, tofile, fromfiledate, tofiledate, n, lineterm } = {}) {
  var _, file1Range, file2Range, first, fromdate, group, i1, i2, j1, j2, l, last, len, len1, len2, len3, len4, line, lines, m, o, p, prefix, q, ref, ref1, ref2, started, tag, todate;
  if (fromfile == null) {
    fromfile = "";
  }
  if (tofile == null) {
    tofile = "";
  }
  if (fromfiledate == null) {
    fromfiledate = "";
  }
  if (tofiledate == null) {
    tofiledate = "";
  }
  if (n == null) {
    n = 3;
  }
  if (lineterm == null) {
    lineterm = "\n";
  }
  prefix = {
    insert: "+ ",
    delete: "- ",
    replace: "! ",
    equal: "  "
  };
  started = false;
  lines = [];
  ref = new SequenceMatcher(null, a, b).getGroupedOpcodes();
  for (l = 0, len = ref.length; l < len; l++) {
    group = ref[l];
    if (!started) {
      started = true;
      fromdate = fromfiledate ? `	${fromfiledate}` : "";
      todate = tofiledate ? `	${tofiledate}` : "";
      lines.push(`*** ${fromfile}${fromdate}${lineterm}`);
      lines.push(`--- ${tofile}${todate}${lineterm}`);
      [first, last] = [group[0], group[group.length - 1]];
      lines.push("***************" + lineterm);
      file1Range = _formatRangeContext(first[1], last[2]);
      lines.push(`*** ${file1Range} ****${lineterm}`);
      if (_any(function() {
        var len12, m2, results;
        results = [];
        for (m2 = 0, len12 = group.length; m2 < len12; m2++) {
          [tag, _, _, _, _] = group[m2];
          results.push(tag === "replace" || tag === "delete");
        }
        return results;
      }())) {
        for (m = 0, len1 = group.length; m < len1; m++) {
          [tag, i1, i2, _, _] = group[m];
          if (tag !== "insert") {
            ref1 = a.slice(i1, i2);
            for (o = 0, len2 = ref1.length; o < len2; o++) {
              line = ref1[o];
              lines.push(prefix[tag] + line);
            }
          }
        }
      }
      file2Range = _formatRangeContext(first[3], last[4]);
      lines.push(`--- ${file2Range} ----${lineterm}`);
      if (_any(function() {
        var len32, p2, results;
        results = [];
        for (p2 = 0, len32 = group.length; p2 < len32; p2++) {
          [tag, _, _, _, _] = group[p2];
          results.push(tag === "replace" || tag === "insert");
        }
        return results;
      }())) {
        for (p = 0, len3 = group.length; p < len3; p++) {
          [tag, _, _, j1, j2] = group[p];
          if (tag !== "delete") {
            ref2 = b.slice(j1, j2);
            for (q = 0, len4 = ref2.length; q < len4; q++) {
              line = ref2[q];
              lines.push(prefix[tag] + line);
            }
          }
        }
      }
    }
  }
  return lines;
};
ndiff = function(a, b, linejunk, charjunk = IS_CHARACTER_JUNK) {
  return new Differ(linejunk, charjunk).compare(a, b);
};
restore = function(delta, which) {
  var l, len, line, lines, prefixes, ref, tag;
  tag = {
    1: "- ",
    2: "+ "
  }[which];
  if (!tag) {
    throw new Error(`unknow delta choice (must be 1 or 2): ${which}`);
  }
  prefixes = ["  ", tag];
  lines = [];
  for (l = 0, len = delta.length; l < len; l++) {
    line = delta[l];
    if (ref = line.slice(0, 2), indexOf.call(prefixes, ref) >= 0) {
      lines.push(line.slice(2));
    }
  }
  return lines;
};
var difflib_default = { SequenceMatcher, getCloseMatches, Differ, unifiedDiff, contextDiff, ndiff, restore };
export {
  difflib_default as default
};
/*! Bundled license information:

assert/assert.js:
  (*!
   * The buffer module from node.js, for the browser.
   *
   * @author   Feross Aboukhadijeh <feross@feross.org> <http://feross.org>
   * @license  MIT
   *)
*/
