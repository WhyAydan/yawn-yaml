(function(f){if(typeof exports==="object"&&typeof module!=="undefined"){module.exports=f()}else if(typeof define==="function"&&define.amd){define([],f)}else{var g;if(typeof window!=="undefined"){g=window}else if(typeof global!=="undefined"){g=global}else if(typeof self!=="undefined"){g=self}else{g=this}g.YAWN = f()}})(function(){var define,module,exports;return (function(){function r(e,n,t){function o(i,f){if(!n[i]){if(!e[i]){var c="function"==typeof require&&require;if(!f&&c)return c(i,!0);if(u)return u(i,!0);var a=new Error("Cannot find module '"+i+"'");throw a.code="MODULE_NOT_FOUND",a}var p=n[i]={exports:{}};e[i][0].call(p.exports,function(r){var n=e[i][1][r];return o(n||r)},p,p.exports,r,e,n,t)}return n[i].exports}for(var u="function"==typeof require&&require,i=0;i<t.length;i++)o(t[i]);return o}return r})()({1:[function(require,module,exports){
exports.endianness = function () { return 'LE' };

exports.hostname = function () {
    if (typeof location !== 'undefined') {
        return location.hostname
    }
    else return '';
};

exports.loadavg = function () { return [] };

exports.uptime = function () { return 0 };

exports.freemem = function () {
    return Number.MAX_VALUE;
};

exports.totalmem = function () {
    return Number.MAX_VALUE;
};

exports.cpus = function () { return [] };

exports.type = function () { return 'Browser' };

exports.release = function () {
    if (typeof navigator !== 'undefined') {
        return navigator.appVersion;
    }
    return '';
};

exports.networkInterfaces
= exports.getNetworkInterfaces
= function () { return {} };

exports.arch = function () { return 'javascript' };

exports.platform = function () { return 'browser' };

exports.tmpdir = exports.tmpDir = function () {
    return '/tmp';
};

exports.EOL = '\n';

exports.homedir = function () {
	return '/'
};

},{}],2:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, '__esModule', {
  value: true
});

var _get = function get(_x, _x2, _x3) { var _again = true; _function: while (_again) { var object = _x, property = _x2, receiver = _x3; _again = false; if (object === null) object = Function.prototype; var desc = Object.getOwnPropertyDescriptor(object, property); if (desc === undefined) { var parent = Object.getPrototypeOf(object); if (parent === null) { return undefined; } else { _x = parent; _x2 = property; _x3 = receiver; _again = true; desc = parent = undefined; continue _function; } } else if ('value' in desc) { return desc.value; } else { var getter = desc.get; if (getter === undefined) { return undefined; } return getter.call(receiver); } } };

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function'); } }

function _inherits(subClass, superClass) { if (typeof superClass !== 'function' && superClass !== null) { throw new TypeError('Super expression must either be null or a function, not ' + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var YAWNError = (function (_Error) {
  _inherits(YAWNError, _Error);

  function YAWNError(message) {
    _classCallCheck(this, YAWNError);

    _get(Object.getPrototypeOf(YAWNError.prototype), 'constructor', this).call(this, message);
    this.message = message;
    this.name = 'YAWNError';
  }

  return YAWNError;
})(Error);

exports['default'] = YAWNError;
module.exports = exports['default'];

},{}],3:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, '__esModule', {
  value: true
});

var _slicedToArray = (function () { function sliceIterator(arr, i) { var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i['return']) _i['return'](); } finally { if (_d) throw _e; } } return _arr; } return function (arr, i) { if (Array.isArray(arr)) { return arr; } else if (Symbol.iterator in Object(arr)) { return sliceIterator(arr, i); } else { throw new TypeError('Invalid attempt to destructure non-iterable instance'); } }; })();

var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ('value' in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function'); } }

var _os = require('os');

var _yamlJs = (window.yaml);

var _jsYaml = (window.jsyaml);

var _lodash = (window._);

var _errorJs = require('./error.js');

var _errorJs2 = _interopRequireDefault(_errorJs);

var NULL_TAG = 'tag:yaml.org,2002:null';
var STR_TAG = 'tag:yaml.org,2002:str';
var INT_TAG = 'tag:yaml.org,2002:int';
var FLOAT_TAG = 'tag:yaml.org,2002:float';
var MAP_TAG = 'tag:yaml.org,2002:map';
var SEQ_TAG = 'tag:yaml.org,2002:seq';

var SPACE = ' ';
var DASH = '-';

// export default class YAWN {
var YAWN = (function () {
  function YAWN(str) {
    _classCallCheck(this, YAWN);

    if (!(0, _lodash.isString)(str)) {
      throw new TypeError('str should be a string');
    }

    this.yaml = str;
  }

  /*
   * Determines the AST tag of a JSON object
   *
   * @param {any} - json
   * @returns {boolean}
   * @throws {YAWNError} - if json has weird type
  */

  _createClass(YAWN, [{
    key: 'toString',
    value: function toString() {
      return this.yaml;
    }
  }, {
    key: 'toJSON',
    value: function toJSON() {
      return this.json;
    }
  }, {
    key: 'getRemark',
    value: function getRemark(path) {
      var ast = (0, _yamlJs.compose)(this.yaml);
      var pathlist = path.split('.');
      var node = getNode(ast, pathlist);
      return node && getNodeRemark(node, this.yaml);
    }
  }, {
    key: 'setRemark',
    value: function setRemark(path, remark) {
      var ast = (0, _yamlJs.compose)(this.yaml);
      var pathlist = path.split('.');
      var node = getNode(ast, pathlist);
      return !!node && !!(this.yaml = setNodeRemark(node, remark, this.yaml));
    }
  }, {
    key: 'json',
    get: function get() {
      return (0, _jsYaml.load)(this.yaml);
    },
    set: function set(newJson) {

      // if json is not changed do nothing
      if ((0, _lodash.isEqual)(this.json, newJson)) {
        return;
      }

      var ast = (0, _yamlJs.compose)(this.yaml);

      if ((0, _lodash.isUndefined)(newJson)) {
        this.yaml = '';
        return;
      }

      // -------------------------------------------------------------------------
      // check if entire json is changed
      // -------------------------------------------------------------------------
      var newTag = getTag(newJson);

      if (ast.tag !== newTag) {
        var newYaml = cleanDump(newJson);

        // replace this.yaml value from start to end mark with newYaml if node is
        // primitive
        if (!(0, _lodash.isObject)(newJson)) {
          this.yaml = replacePrimitive(ast, newYaml, this.yaml, 0);

          // if node is not primitive
        } else {
            this.yaml = replaceNode(ast, newYaml, this.yaml, 0);
          }

        return;
      }

      // -------------------------------------------------------------------------
      // NULL_TAG, STR_TAG, INT_TAG, FLOAT_TAG
      // -------------------------------------------------------------------------
      if ((0, _lodash.includes)([NULL_TAG, STR_TAG, INT_TAG, FLOAT_TAG], ast.tag)) {
        this.yaml = replacePrimitive(ast, newJson, this.yaml, 0);

        return;
      }

      // -------------------------------------------------------------------------
      // MAP_TAG
      // -------------------------------------------------------------------------
      if (ast.tag === MAP_TAG) {
        var json = this.json;

        this.yaml = updateMap(ast, newJson, json, this.yaml, 0);
      }

      // -------------------------------------------------------------------------
      // SEQ_TAG
      // -------------------------------------------------------------------------
      if (ast.tag === SEQ_TAG) {
        this.yaml = updateSeq(ast, newJson, this.yaml, 0);
      }

      // Trim trailing whitespaces
      this.yaml = this.yaml.split(_os.EOL).map(function (line) {
        return line.replace(/[ \t]+$/, '');
      }).join(_os.EOL);
    }
  }]);

  return YAWN;
})();

exports['default'] = YAWN;
function getTag(json) {
  var tag = null;

  if ((0, _lodash.isArray)(json)) {
    tag = SEQ_TAG;
  } else if ((0, _lodash.isObject)(json)) {
    tag = MAP_TAG;
  } else if ((0, _lodash.isNull)(json)) {
    tag = NULL_TAG;
  } else if ((0, _lodash.isNumber)(json)) {
    if (json % 10 === 0) {
      tag = INT_TAG;
    } else {
      tag = FLOAT_TAG;
    }
  } else if ((0, _lodash.isString)(json)) {
    tag = STR_TAG;
  } else {
    throw new _errorJs2['default']('Unknown type');
  }
  return tag;
}

/*
 * Update a sequence with new JSON
 *
 * @param {Node} ast
 * @param {object} newJson
 * @param {string} yaml
 *
 * @returns {string}
 *
*/
function updateSeq(ast, newJson, yaml, offset) {
  var values = (0, _jsYaml.load)((0, _yamlJs.serialize)(ast));
  var min = Math.min(values.length, newJson.length);
  for (var i = 0; i < min; i++) {
    var newYaml = changeArrayElement(ast.value[i], cleanDump(newJson[i]), yaml, offset);
    offset = offset + newYaml.length - yaml.length;
    yaml = newYaml;
  }

  if (values.length > min) {
    for (var i = min; i < values.length; i++) {
      var newYaml = removeArrayElement(ast.value[i], yaml, offset);
      offset = offset + newYaml.length - yaml.length;
      yaml = newYaml;
    }
  } else if (newJson.length > min) {
    yaml = insertAfterNode(ast, cleanDump(newJson.slice(min)), yaml, offset);
  }

  return yaml;
}

/*
 * update a map structure with new values
 *
 * @param {AST} ast - a map AST
 * @param {any} newJson
 * @param {any} - json
 * @param {string} yaml
 * @returns {boolean}
 * @throws {YAWNError} - if json has weird type
*/
function updateMap(ast, newJson, json, yaml, offset) {
  // look for changes
  (0, _lodash.each)(ast.value, function (pair) {
    var _pair = _slicedToArray(pair, 2);

    var keyNode = _pair[0];
    var valNode = _pair[1];

    // node is deleted
    if ((0, _lodash.isUndefined)(newJson[keyNode.value])) {

      // TODO: can we use of the methods below?
      var newYaml = yaml.substr(0, keyNode.start_mark.pointer + offset) + yaml.substring(getNodeEndMark(valNode).pointer + offset);
      offset = offset + newYaml.length - yaml.length;
      yaml = newYaml;
      return;
    }

    var value = json[keyNode.value];
    var newValue = newJson[keyNode.value];

    // primitive value has changed
    if (newValue !== value && !(0, _lodash.isArray)(valNode.value)) {

      // replace the value node
      var newYaml = replacePrimitive(valNode, newValue, yaml, offset);
      offset = offset + newYaml.length - yaml.length;
      yaml = newYaml;
      // remove the key/value from newJson so it's not detected as new pair in
      // later code
      delete newJson[keyNode.value];
    }

    // non primitive value has changed
    if (!(0, _lodash.isEqual)(newValue, value) && (0, _lodash.isArray)(valNode.value)) {

      // array value has changed
      if ((0, _lodash.isArray)(newValue)) {

        // recurse
        var newYaml = updateSeq(valNode, newValue, yaml, offset);
        offset = offset + newYaml.length - yaml.length;
        yaml = newYaml;

        // map value has changed
      } else {

          // recurse
          var newYaml = updateMap(valNode, newValue, value, yaml, offset);
          offset = offset + newYaml.length - yaml.length;
          yaml = newYaml;

          // ast = compose(yaml);

          // remove the key/value from newJson so it's not detected as new pair in
          // later code
          delete newJson[keyNode.value];
        }
    }
  });

  // look for new items to add
  (0, _lodash.each)(newJson, function (value, key) {

    // item is new
    if ((0, _lodash.isUndefined)(json[key])) {
      var newValue = cleanDump(_defineProperty({}, key, value));

      var newYaml = insertAfterNode(ast, newValue, yaml, offset);
      offset = offset + newYaml.length - yaml.length;
      yaml = newYaml;
    }
  });

  return yaml;
}

/*
 * Place value in node range in yaml string
 *
 * @param node {Node}
 * @param value {string}
 * @param yaml {string}
 *
 * @returns {string}
*/
function replacePrimitive(node, value, yaml, offset) {
  return yaml.substr(0, node.start_mark.pointer + offset) + JSON.stringify(value) + yaml.substring(node.end_mark.pointer + offset);
}

/*
 * Place value in node range in yaml string
 *
 * @param node {Node}
 * @param value {string}
 * @param yaml {string}
 *
 * @returns {string}
*/
function replaceNode(node, value, yaml, offset) {
  var indentedValue = indent(value, node.start_mark.column);
  var lineStart = node.start_mark.pointer - node.start_mark.column + offset;

  return yaml.substr(0, lineStart) + indentedValue + yaml.substring(getNodeEndMark(node).pointer + offset);
}

/*
 * Place value after node range in yaml string
 *
 * @param node {Node}
 * @param value {string}
 * @param yaml {string}
 *
 * @returns {string}
*/
function insertAfterNode(node, value, yaml, offset) {
  var indentedValue = indent(value, node.start_mark.column);

  return yaml.substr(0, getNodeEndMark(node).pointer + offset) + _os.EOL + indentedValue + yaml.substring(getNodeEndMark(node).pointer + offset);
}

/*
 * Removes a node from array
 *
 * @param {Node} node
 * @param {string} yaml
 *
 * @returns {string}
*/
function removeArrayElement(node, yaml, offset) {
  var index = node.start_mark.pointer - node.start_mark.column - 1 + offset;

  return yaml.substr(0, index) + yaml.substring(getNodeEndMark(node).pointer + offset);
}

/*
 * Changes a node from array
 *
 * @param {Node} node
 * @param value {string}
 * @param {string} yaml
 *
 * @returns {string}
*/
function changeArrayElement(node, value, yaml, offset) {
  var indentedValue = indent(value, node.start_mark.column);

  // find index of DASH(`-`) character for this array
  var index = node.start_mark.pointer + offset;
  while (index > 0 && yaml[index] !== DASH) {
    index--;
  }

  return yaml.substr(0, index + 2) + indentedValue.substr(node.start_mark.column) + yaml.substring(getNodeEndMark(node).pointer + offset);
}

/*
 * Gets end mark of an AST
 *
 * @param {Node} ast
 *
 * @returns {Mark}
*/
function getNodeEndMark(_x) {
  var _again = true;

  _function: while (_again) {
    var ast = _x;
    _again = false;

    if ((0, _lodash.isArray)(ast.value) && ast.value.length) {
      var lastItem = (0, _lodash.last)(ast.value);

      if ((0, _lodash.isArray)(lastItem) && lastItem.length) {
        _x = (0, _lodash.last)(lastItem);
        _again = true;
        lastItem = undefined;
        continue _function;
      }

      _x = lastItem;
      _again = true;
      lastItem = undefined;
      continue _function;
    }

    return ast.end_mark;
  }
}

/*
 * Indents a string with number of characters
 *
 * @param {string} str
 * @param {integer} depth - can be negative also
 *
 * @returns {string}
*/
function indent(str, depth) {
  return str.split(_os.EOL).filter(function (line) {
    return line;
  }).map(function (line) {
    return (0, _lodash.repeat)(SPACE, depth) + line;
  }).join(_os.EOL);
}

/*
 * Dump a value to YAML sting without the trailing new line
 *
 * @param {any} value
 *
 * @returns {string}
 *
*/
function cleanDump(value) {
  if (value === null || (0, _lodash.isString)(value) || (0, _lodash.isNumber)(value)) {
    return value;
  }

  var yaml = (0, _jsYaml.dump)(value).replace(/\n$/, '');

  if (_os.EOL !== '\n') {
    yaml = yaml.replace(/\n/g, _os.EOL);
  }

  return yaml;
}

/*
 * Gets remark of an AST
 *
 * @param {Node} ast
 * @param {string} yaml
 *
 * @returns {string}
*/
function getNodeRemark(ast, yaml) {
  var index = getNodeEndMark(ast).pointer;
  while (index < yaml.length && yaml[index] !== '#' && yaml[index] !== _os.EOL) {
    ++index;
  }

  if (_os.EOL === yaml[index] || index === yaml.length) {
    return '';
  } else {
    while (index < yaml.length && (yaml[index] === '#' || yaml[index] === ' ')) {
      ++index;
    }
    var end = index;
    while (end < yaml.length && yaml[end] !== _os.EOL) {
      ++end;
    }
    return yaml.substring(index, end);
  }
}

/*
 * Sets remark of an AST
 *
 * @param {Node} ast
 * @param {string} remark
 * @param {string} yaml
 *
 * @returns {boolean}
*/
function setNodeRemark(ast, remark, yaml) {
  var index = getNodeEndMark(ast).pointer;
  while (index < yaml.length && yaml[index] !== '#' && yaml[index] !== _os.EOL) {
    ++index;
  }

  if (_os.EOL === yaml[index] || index === yaml.length) {
    return yaml.substr(0, index) + ' # ' + remark + yaml.substring(index);
  } else {
    while (index < yaml.length && (yaml[index] === '#' || yaml[index] === ' ')) {
      ++index;
    }
    var end = index;
    while (end < yaml.length && yaml[end] !== _os.EOL) {
      ++end;
    }
    return yaml.substr(0, index) + remark + yaml.substring(end);
  }
}

/*
 * Gets node of an AST which path
 *
 * @param {Node} ast
 * @param {array} path
 *
 * @returns {Node}
*/
function getNode(_x2, _x3) {
  var _left;

  var _again2 = true;

  _function2: while (_again2) {
    var ast = _x2,
        path = _x3;
    _again2 = false;

    if (path.length) {
      if (ast.tag === MAP_TAG) {
        var value = ast.value;
        for (var i = 0; i < value.length; ++i) {
          var _value$i = _slicedToArray(value[i], 2);

          var keyNode = _value$i[0];
          var valNode = _value$i[1];

          if (path[0] === keyNode.value) {
            _x2 = valNode;
            _x3 = path.slice(1);
            _again2 = true;
            value = i = _value$i = keyNode = valNode = undefined;
            continue _function2;
          }
        }
        return undefined;
      } else if (ast.tag === SEQ_TAG) {
        if (!(_left = ast.value[path[0]])) {
          return _left;
        }

        _x2 = ast.value[path[0]];
        _x3 = path.slice(1);
        _again2 = true;
        value = i = _value$i = keyNode = valNode = undefined;
        continue _function2;
      }
    }
    return ast;
  }
}
module.exports = exports['default'];

},{"./error.js":2,"os":1}]},{},[3])(3)
});

//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIm5vZGVfbW9kdWxlcy9icm93c2VyLXBhY2svX3ByZWx1ZGUuanMiLCJub2RlX21vZHVsZXMvb3MtYnJvd3NlcmlmeS9icm93c2VyLmpzIiwic3JjL2Vycm9yLmpzIiwic3JjL2luZGV4LmpzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBO0FDQUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUNqREEsWUFBWSxDQUFDOzs7Ozs7Ozs7Ozs7SUFFUSxTQUFTO1lBQVQsU0FBUzs7QUFDakIsV0FEUSxTQUFTLENBQ2hCLE9BQU8sRUFBRTswQkFERixTQUFTOztBQUUxQiwrQkFGaUIsU0FBUyw2Q0FFcEIsT0FBTyxFQUFFO0FBQ2YsUUFBSSxDQUFDLE9BQU8sR0FBRyxPQUFPLENBQUM7QUFDdkIsUUFBSSxDQUFDLElBQUksR0FBRyxXQUFXLENBQUM7R0FDekI7O1NBTGtCLFNBQVM7R0FBUyxLQUFLOztxQkFBdkIsU0FBUzs7OztBQ0Y5QixZQUFZLENBQUM7Ozs7Ozs7Ozs7Ozs7Ozs7a0JBRU8sSUFBSTs7c0JBQ1MsU0FBUzs7c0JBQ2pCLFNBQVM7O3NCQWEzQixRQUFROzt1QkFFTyxZQUFZOzs7O0FBRWxDLElBQU0sUUFBUSxHQUFHLHdCQUF3QixDQUFDO0FBQzFDLElBQU0sT0FBTyxHQUFHLHVCQUF1QixDQUFDO0FBQ3hDLElBQU0sT0FBTyxHQUFHLHVCQUF1QixDQUFDO0FBQ3hDLElBQU0sU0FBUyxHQUFHLHlCQUF5QixDQUFDO0FBQzVDLElBQU0sT0FBTyxH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QUFDLFNBQVMsQ0FBQyxHQUFHLENBQUMsQ0FBQztHQUN6QjtDQUNGOzs7Ozs7Ozs7O0FBVUQsU0FBUyxPQUFPOzs7Ozs4QkFBWTtRQUFYLEdBQUc7UUFBRSxJQUFJOzs7QUFDeEIsUUFBSSxJQUFJLENBQUMsTUFBTSxFQUFFO0FBQ2YsVUFBSSxHQUFHLENBQUMsR0FBRyxLQUFLLE9BQU8sRUFBRTtBQUN2QixZQUFJLEtBQUssR0FBRyxHQUFHLENBQUMsS0FBSyxDQUFDO0FBQ3RCLGFBQUssSUFBSSxDQUFDLEdBQUcsQ0FBQyxFQUFFLENBQUMsR0FBRyxLQUFLLENBQUMsTUFBTSxFQUFFLEVBQUUsQ0FBQyxFQUFFO3dDQUNaLEtBQUssQ0FBQyxDQUFDLENBQUM7O2NBQTVCLE9BQU87Y0FBRSxPQUFPOztBQUNyQixjQUFJLElBQUksQ0FBQyxDQUFDLENBQUMsS0FBSyxPQUFPLENBQUMsS0FBSyxFQUFFO2tCQUNkLE9BQU87a0JBQUUsSUFBSSxDQUFDLEtBQUssQ0FBQyxDQUFDLENBQUM7O0FBSnJDLGlCQUFLLEdBQ0EsQ0FBQyxjQUNILE9BQU8sR0FBRSxPQUFPOztXQUdwQjtTQUNGO0FBQ0QsZUFBTyxTQUFTLENBQUM7T0FDbEIsTUFBTSxJQUFJLEdBQUcsQ0FBQyxHQUFHLEtBQUssT0FBTyxFQUFFO3NCQUN2QixHQUFHLENBQUMsS0FBSyxDQUFDLElBQUksQ0FBQyxDQUFDLENBQUMsQ0FBQzs7OztjQUFZLEdBQUcsQ0FBQyxLQUFLLENBQUMsSUFBSSxDQUFDLENBQUMsQ0FBQyxDQUFDO2NBQUUsSUFBSSxDQUFDLEtBQUssQ0FBQyxDQUFDLENBQUM7O0FBVGxFLGFBQUssR0FDQSxDQUFDLGNBQ0gsT0FBTyxHQUFFLE9BQU87O09BUXhCO0tBQ0Y7QUFDRCxXQUFPLEdBQUcsQ0FBQztHQUNaO0NBQUEiLCJmaWxlIjoiZ2VuZXJhdGVkLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXNDb250ZW50IjpbIihmdW5jdGlvbigpe2Z1bmN0aW9uIHIoZSxuLHQpe2Z1bmN0aW9uIG8oaSxmKXtpZighbltpXSl7aWYoIWVbaV0pe3ZhciBjPVwiZnVuY3Rpb25cIj09dHlwZW9mIHJlcXVpcmUmJnJlcXVpcmU7aWYoIWYmJmMpcmV0dXJuIGMoaSwhMCk7aWYodSlyZXR1cm4gdShpLCEwKTt2YXIgYT1uZXcgRXJyb3IoXCJDYW5ub3QgZmluZCBtb2R1bGUgJ1wiK2krXCInXCIpO3Rocm93IGEuY29kZT1cIk1PRFVMRV9OT1RfRk9VTkRcIixhfXZhciBwPW5baV09e2V4cG9ydHM6e319O2VbaV1bMF0uY2FsbChwLmV4cG9ydHMsZnVuY3Rpb24ocil7dmFyIG49ZVtpXVsxXVtyXTtyZXR1cm4gbyhufHxyKX0scCxwLmV4cG9ydHMscixlLG4sdCl9cmV0dXJuIG5baV0uZXhwb3J0c31mb3IodmFyIHU9XCJmdW5jdGlvblwiPT10eXBlb2YgcmVxdWlyZSYmcmVxdWlyZSxpPTA7aTx0Lmxlbmd0aDtpKyspbyh0W2ldKTtyZXR1cm4gb31yZXR1cm4gcn0pKCkiLCJleHBvcnRzLmVuZGlhbm5lc3MgPSBmdW5jdGlvbiAoKSB7IHJldHVybiAnTEUnIH07XG5cbmV4cG9ydHMuaG9zdG5hbWUgPSBmdW5jdGlvbiAoKSB7XG4gICAgaWYgKHR5cGVvZiBsb2NhdGlvbiAhPT0gJ3VuZGVmaW5lZCcpIHtcbiAgICAgICAgcmV0dXJuIGxvY2F0aW9uLmhvc3RuYW1lXG4gICAgfVxuICAgIGVsc2UgcmV0dXJuICcnO1xufTtcblxuZXhwb3J0cy5sb2FkYXZnID0gZnVuY3Rpb24gKCkgeyByZXR1cm4gW10gfTtcblxuZXhwb3J0cy51cHRpbWUgPSBmdW5jdGlvbiAoKSB7IHJldHVybiAwIH07XG5cbmV4cG9ydHMuZnJlZW1lbSA9IGZ1bmN0aW9uICgpIHtcbiAgICByZXR1cm4gTnVtYmVyLk1BWF9WQUxVRTtcbn07XG5cbmV4cG9ydHMudG90YWxtZW0gPSBmdW5jdGlvbiAoKSB7XG4gICAgcmV0dXJuIE51bWJlci5NQVhfVkFMVUU7XG59O1xuXG5leHBvcnRzLmNwdXMgPSBmdW5jdGlvbiAoKSB7IHJldHVybiBbXSB9O1xuXG5leHBvcnRzLnR5cGUgPSBmdW5jdGlvbiAoKSB7IHJldHVybiAnQnJvd3NlcicgfTtcblxuZXhwb3J0cy5yZWxlYXNlID0gZnVuY3Rpb24gKCkge1xuICAgIGlmICh0eXBlb2YgbmF2aWdhdG9yICE9PSAndW5kZWZpbmVkJykge1xuICAgICAgICByZXR1cm4gbmF2aWdhdG9yLmFwcFZlcnNpb247XG4gICAgfVxuICAgIHJldHVybiAnJztcbn07XG5cbmV4cG9ydHMubmV0d29ya0ludGVyZmFjZXNcbj0gZXhwb3J0cy5nZXROZXR3b3JrSW50ZXJmYWNlc1xuPSBmdW5jdGlvbiAoKSB7IHJldHVybiB7fSB9O1xuXG5leHBvcnRzLmFyY2ggPSBmdW5jdGlvbiAoKSB7IHJldHVybiAnamF2YXNjcmlwdCcgfTtcblxuZXhwb3J0cy5wbGF0Zm9ybSA9IGZ1bmN0aW9uICgpIHsgcmV0dXJuICdicm93c2VyJyB9O1xuXG5leHBvcnRzLnRtcGRpciA9IGV4cG9ydHMudG1wRGlyID0gZnVuY3Rpb24gKCkge1xuICAgIHJldHVybiAnL3RtcCc7XG59O1xuXG5leHBvcnRzLkVPTCA9ICdcXG4nO1xuXG5leHBvcnRzLmhvbWVkaXIgPSBmdW5jdGlvbiAoKSB7XG5cdHJldHVybiAnLydcbn07XG4iLCIndXNlIHN0cmljdCc7XG5cbmV4cG9ydCBkZWZhdWx0IGNsYXNzIFlBV05FcnJvciBleHRlbmRzIEVycm9yIHtcbiAgY29uc3RydWN0b3IobWVzc2FnZSkge1xuICAgIHN1cGVyKG1lc3NhZ2UpO1xuICAgIHRoaXMubWVzc2FnZSA9IG1lc3NhZ2U7XG4gICAgdGhpcy5uYW1lID0gJ1lBV05FcnJvcic7XG4gIH1cbn1cbiIsIid1c2Ugc3RyaWN0JztcblxuaW1wb3J0IHsgRU9MIH0gZnJvbSAnb3MnO1xuaW1wb3J0IHtjb21wb3NlLCBzZXJpYWxpemV9IGZyb20gJ3lhbWwtanMnO1xuaW1wb3J0IHtsb2FkLCBkdW1wfSBmcm9tICdqcy15YW1sJztcbmltcG9ydCB7XG4gIGlzQXJyYXksXG4gIGlzU3RyaW5nLFxuICBpc09iamVjdCxcbiAgaXNVbmRlZmluZWQsXG4gIGlzTnVsbCxcbiAgaXNOdW1iZXIsXG4gIGlzRXF1YWwsXG4gIHJlcGVhdCxcbiAgZWFjaCxcbiAgaW5jbHVkZXMsXG4gIGxhc3Rcbn0gZnJvbSAnbG9kYXNoJztcblxuaW1wb3J0IFlBV05FcnJvciBmcm9tICcuL2Vycm9yLmpzJztcblxuY29uc3QgTlVMTF9UQUcgPSAndGFnOnlhbWwub3JnLDIwMDI6bnVsbCc7XG5jb25zdCBTVFJfVEFHID0gJ3RhZzp5YW1sLm9yZywyMDAyOnN0cic7XG5jb25zdCBJTlRfVEFHID0gJ3RhZzp5YW1sLm9yZywyMDAyOmludCc7XG5jb25zdCBGTE9BVF9UQUcgPSAndGFnOnlhbWwub3JnLDIwMDI6ZmxvYXQnO1xuY29uc3QgTUFQX1RBRyA9ICd0YWc6eWFtbC5vcmcsMjAwMjptYXAnO1xuY29uc3QgU0VRX1RBRyA9ICd0YWc6eWFtbC5vcmcsMjAwMjpzZXEnO1xuXG5jb25zdCBTUEFDRSA9ICcgJztcbmNvbnN0IERBU0ggPSAnLSc7XG5cbi8vIGV4cG9ydCBkZWZhdWx0IGNsYXNzIFlBV04ge1xuZXhwb3J0IGRlZmF1bHQgY2xhc3MgWUFXTiB7XG5cbiAgY29uc3RydWN0b3Ioc3RyKSB7XG4gICAgaWYgKCFpc1N0cmluZyhzdHIpKSB7XG4gICAgICB0aHJvdyBuZXcgVHlwZUVycm9yKCdzdHIgc2hvdWxkIGJlIGEgc3RyaW5nJyk7XG4gICAgfVxuXG4gICAgdGhpcy55YW1sID0gc3RyO1xuICB9XG5cbiAgZ2V0IGpzb24oKSB7XG4gICAgcmV0dXJuIGxvYWQodGhpcy55YW1sKTtcbiAgfVxuXG4gIHNldCBqc29uKG5ld0pzb24pIHtcblxuICAgIC8vIGlmIGpzb24gaXMgbm90IGNoYW5nZWQgZG8gbm90aGluZ1xuICAgIGlmIChpc0VxdWFsKHRoaXMuanNvbiwgbmV3SnNvbikpIHtcbiAgICAgIHJldHVybjtcbiAgICB9XG5cbiAgICBjb25zdCBhc3QgPSBjb21wb3NlKHRoaXMueWFtbCk7XG5cbiAgICBpZiAoaXNVbmRlZmluZWQobmV3SnNvbikpIHtcbiAgICAgIHRoaXMueWFtbCA9ICcnO1xuICAgICAgcmV0dXJuO1xuICAgIH1cblxuICAgIC8vIC0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS1cbiAgICAvLyBjaGVjayBpZiBlbnRpcmUganNvbiBpcyBjaGFuZ2VkXG4gICAgLy8gLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLVxuICAgIGxldCBuZXdUYWcgPSBnZXRUYWcobmV3SnNvbik7XG5cbiAgICBpZiAoYXN0LnRhZyAhPT0gbmV3VGFnKSB7XG4gICAgICBsZXQgbmV3WWFtbCA9IGNsZWFuRHVtcChuZXdKc29uKTtcblxuICAgICAgLy8gcmVwbGFjZSB0aGlzLnlhbWwgdmFsdWUgZnJvbSBzdGFydCB0byBlbmQgbWFyayB3aXRoIG5ld1lhbWwgaWYgbm9kZSBpc1xuICAgICAgLy8gcHJpbWl0aXZlXG4gICAgICBpZiAoIWlzT2JqZWN0KG5ld0pzb24pKSB7XG4gICAgICAgIHRoaXMueWFtbCA9IHJlcGxhY2VQcmltaXRpdmUoYXN0LCBuZXdZYW1sLCB0aGlzLnlhbWwsIDApO1xuXG4gICAgICAvLyBpZiBub2RlIGlzIG5vdCBwcmltaXRpdmVcbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIHRoaXMueWFtbCA9IHJlcGxhY2VOb2RlKGFzdCwgbmV3WWFtbCwgdGhpcy55YW1sLCAwKTtcbiAgICAgIH1cblxuICAgICAgcmV0dXJuO1xuICAgIH1cblxuICAgIC8vIC0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS1cbiAgICAvLyBOVUxMX1RBRywgU1RSX1RBRywgSU5UX1RBRywgRkxPQVRfVEFHXG4gICAgLy8gLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLVxuICAgIGlmIChpbmNsdWRlcyhbTlVMTF9UQUcsIFNUUl9UQUcsIElOVF9UQUcsIEZMT0FUX1RBR10sIGFzdC50YWcpKSB7XG4gICAgICB0aGlzLnlhbWwgPSByZXBsYWNlUHJpbWl0aXZlKGFzdCwgbmV3SnNvbiwgdGhpcy55YW1sLCAwKTtcblxuICAgICAgcmV0dXJuO1xuICAgIH1cblxuXG4gICAgLy8gLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLVxuICAgIC8vIE1BUF9UQUdcbiAgICAvLyAtLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tXG4gICAgaWYgKGFzdC50YWcgPT09IE1BUF9UQUcpIHtcbiAgICAgIGxldCBqc29uID0gdGhpcy5qc29uO1xuXG4gICAgICB0aGlzLnlhbWwgPSB1cGRhdGVNYXAoYXN0LCBuZXdKc29uLCBqc29uLCB0aGlzLnlhbWwsIDApO1xuICAgIH1cblxuICAgIC8vIC0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS1cbiAgICAvLyBTRVFfVEFHXG4gICAgLy8gLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLVxuICAgIGlmIChhc3QudGFnID09PSBTRVFfVEFHKSB7XG4gICAgICB0aGlzLnlhbWwgPSB1cGRhdGVTZXEoYXN0LCBuZXdKc29uLCB0aGlzLnlhbWwsIDApO1xuICAgIH1cblxuICAgIC8vIFRyaW0gdHJhaWxpbmcgd2hpdGVzcGFjZXNcbiAgICB0aGlzLnlhbWwgPSB0aGlzLnlhbWxcbiAgICAgIC5zcGxpdChFT0wpXG4gICAgICAubWFwKGxpbmU9PiBsaW5lLnJlcGxhY2UoL1sgXFx0XSskLywgJycpKVxuICAgICAgLmpvaW4oRU9MKTtcbiAgfVxuXG4gIHRvU3RyaW5nKCkge1xuICAgIHJldHVybiB0aGlzLnlhbWw7XG4gIH1cblxuICB0b0pTT04oKSB7XG4gICAgcmV0dXJuIHRoaXMuanNvbjtcbiAgfVxuXG4gIGdldFJlbWFyayhwYXRoKSB7XG4gICAgY29uc3QgYXN0ID0gY29tcG9zZSh0aGlzLnlhbWwpO1xuICAgIGxldCBwYXRobGlzdCA9IHBhdGguc3BsaXQoJy4nKTtcbiAgICBsZXQgbm9kZSA9IGdldE5vZGUoYXN0LCBwYXRobGlzdCk7XG4gICAgcmV0dXJuIG5vZGUgJiYgZ2V0Tm9kZVJlbWFyayhub2RlLCB0aGlzLnlhbWwpO1xuICB9XG5cbiAgc2V0UmVtYXJrKHBhdGgsIHJlbWFyaykge1xuICAgIGNvbnN0IGFzdCA9IGNvbXBvc2UodGhpcy55YW1sKTtcbiAgICBsZXQgcGF0aGxpc3QgPSBwYXRoLnNwbGl0KCcuJyk7XG4gICAgbGV0IG5vZGUgPSBnZXROb2RlKGFzdCwgcGF0aGxpc3QpO1xuICAgIHJldHVybiAhIW5vZGUgJiYgISEodGhpcy55YW1sID0gc2V0Tm9kZVJlbWFyayhub2RlLCByZW1hcmssIHRoaXMueWFtbCkpO1xuICB9XG59XG5cbi8qXG4gKiBEZXRlcm1pbmVzIHRoZSBBU1QgdGFnIG9mIGEgSlNPTiBvYmplY3RcbiAqXG4gKiBAcGFyYW0ge2FueX0gLSBqc29uXG4gKiBAcmV0dXJucyB7Ym9vbGVhbn1cbiAqIEB0aHJvd3Mge1lBV05FcnJvcn0gLSBpZiBqc29uIGhhcyB3ZWlyZCB0eXBlXG4qL1xuZnVuY3Rpb24gZ2V0VGFnKGpzb24pIHtcbiAgbGV0IHRhZyA9IG51bGw7XG5cbiAgaWYgKGlzQXJyYXkoanNvbikpIHtcbiAgICB0YWcgPSBTRVFfVEFHO1xuICB9IGVsc2UgaWYgKGlzT2JqZWN0KGpzb24pKSB7XG4gICAgdGFnID0gTUFQX1RBRztcbiAgfSBlbHNlIGlmIChpc051bGwoanNvbikpIHtcbiAgICB0YWcgPSBOVUxMX1RBRztcbiAgfSBlbHNlIGlmIChpc051bWJlcihqc29uKSkge1xuICAgIGlmIChqc29uICUgMTAgPT09IDApIHtcbiAgICAgIHRhZyA9IElOVF9UQUc7XG4gICAgfSBlbHNlIHtcbiAgICAgIHRhZyA9IEZMT0FUX1RBRztcbiAgICB9XG4gIH0gZWxzZSBpZiAoaXNTdHJpbmcoanNvbikpIHtcbiAgICB0YWcgPSBTVFJfVEFHO1xuICB9IGVsc2Uge1xuICAgIHRocm93IG5ldyBZQVdORXJyb3IoJ1Vua25vd24gdHlwZScpO1xuICB9XG4gIHJldHVybiB0YWc7XG59XG5cbi8qXG4gKiBVcGRhdGUgYSBzZXF1ZW5jZSB3aXRoIG5ldyBKU09OXG4gKlxuICogQHBhcmFtIHtOb2RlfSBhc3RcbiAqIEBwYXJhbSB7b2JqZWN0fSBuZXdKc29uXG4gKiBAcGFyYW0ge3N0cmluZ30geWFtbFxuICpcbiAqIEByZXR1cm5zIHtzdHJpbmd9XG4gKlxuKi9cbmZ1bmN0aW9uIHVwZGF0ZVNlcShhc3QsIG5ld0pzb24sIHlhbWwsIG9mZnNldCkge1xuICBsZXQgdmFsdWVzID0gbG9hZChzZXJpYWxpemUoYXN0KSk7XG4gIGxldCBtaW4gPSBNYXRoLm1pbih2YWx1ZXMubGVuZ3RoLCBuZXdKc29uLmxlbmd0aCk7XG4gIGZvciAobGV0IGkgPSAwOyBpIDwgbWluOyBpKyspIHtcbiAgICBjb25zdCBuZXdZYW1sID0gY2hhbmdlQXJyYXlFbGVtZW50KGFzdC52YWx1ZVtpXSwgY2xlYW5EdW1wKG5ld0pzb25baV0pLCB5YW1sLCBvZmZzZXQpO1xuICAgIG9mZnNldCA9IG9mZnNldCArIG5ld1lhbWwubGVuZ3RoIC0geWFtbC5sZW5ndGg7XG4gICAgeWFtbCA9IG5ld1lhbWw7XG4gIH1cblxuICBpZiAodmFsdWVzLmxlbmd0aCA+IG1pbikge1xuICAgIGZvciAobGV0IGkgPSBtaW47IGkgPCB2YWx1ZXMubGVuZ3RoOyBpKyspIHtcbiAgICAgIGNvbnN0IG5ld1lhbWwgPSByZW1vdmVBcnJheUVsZW1lbnQoYXN0LnZhbHVlW2ldLCB5YW1sLCBvZmZzZXQpO1xuICAgICAgb2Zmc2V0ID0gb2Zmc2V0ICsgbmV3WWFtbC5sZW5ndGggLSB5YW1sLmxlbmd0aDtcbiAgICAgIHlhbWwgPSBuZXdZYW1sO1xuICAgIH1cbiAgfSBlbHNlIGlmIChuZXdKc29uLmxlbmd0aCA+IG1pbikge1xuICAgIHlhbWwgPSBpbnNlcnRBZnRlck5vZGUoYXN0LCBjbGVhbkR1bXAobmV3SnNvbi5zbGljZShtaW4pKSwgeWFtbCwgb2Zmc2V0KTtcbiAgfVxuXG4gIHJldHVybiB5YW1sO1xufVxuXG4vKlxuICogdXBkYXRlIGEgbWFwIHN0cnVjdHVyZSB3aXRoIG5ldyB2YWx1ZXNcbiAqXG4gKiBAcGFyYW0ge0FTVH0gYXN0IC0gYSBtYXAgQVNUXG4gKiBAcGFyYW0ge2FueX0gbmV3SnNvblxuICogQHBhcmFtIHthbnl9IC0ganNvblxuICogQHBhcmFtIHtzdHJpbmd9IHlhbWxcbiAqIEByZXR1cm5zIHtib29sZWFufVxuICogQHRocm93cyB7WUFXTkVycm9yfSAtIGlmIGpzb24gaGFzIHdlaXJkIHR5cGVcbiovXG5mdW5jdGlvbiB1cGRhdGVNYXAoYXN0LCBuZXdKc29uLCBqc29uLCB5YW1sLCBvZmZzZXQpIHtcbiAgLy8gbG9vayBmb3IgY2hhbmdlc1xuICBlYWNoKGFzdC52YWx1ZSwgcGFpciA9PiB7XG4gICAgbGV0IFtrZXlOb2RlLCB2YWxOb2RlXSA9IHBhaXI7XG5cbiAgICAvLyBub2RlIGlzIGRlbGV0ZWRcbiAgICBpZiAoaXNVbmRlZmluZWQobmV3SnNvbltrZXlOb2RlLnZhbHVlXSkpIHtcblxuICAgICAgLy8gVE9ETzogY2FuIHdlIHVzZSBvZiB0aGUgbWV0aG9kcyBiZWxvdz9cbiAgICAgIGNvbnN0IG5ld1lhbWwgPSB5YW1sLnN1YnN0cigwLCBrZXlOb2RlLnN0YXJ0X21hcmsucG9pbnRlciArIG9mZnNldCkgK1xuICAgICAgICB5YW1sLnN1YnN0cmluZyhnZXROb2RlRW5kTWFyayh2YWxOb2RlKS5wb2ludGVyICsgb2Zmc2V0KTtcbiAgICAgIG9mZnNldCA9IG9mZnNldCArIG5ld1lhbWwubGVuZ3RoIC0geWFtbC5sZW5ndGg7XG4gICAgICB5YW1sID0gbmV3WWFtbDtcbiAgICAgIHJldHVybjtcbiAgICB9XG5cbiAgICBsZXQgdmFsdWUgPSBqc29uW2tleU5vZGUudmFsdWVdO1xuICAgIGxldCBuZXdWYWx1ZSA9IG5ld0pzb25ba2V5Tm9kZS52YWx1ZV07XG5cbiAgICAvLyBwcmltaXRpdmUgdmFsdWUgaGFzIGNoYW5nZWRcbiAgICBpZiAobmV3VmFsdWUgIT09IHZhbHVlICYmICFpc0FycmF5KHZhbE5vZGUudmFsdWUpKSB7XG5cbiAgICAgIC8vIHJlcGxhY2UgdGhlIHZhbHVlIG5vZGVcbiAgICAgIGNvbnN0IG5ld1lhbWwgPSByZXBsYWNlUHJpbWl0aXZlKHZhbE5vZGUsIG5ld1ZhbHVlLCB5YW1sLCBvZmZzZXQpO1xuICAgICAgb2Zmc2V0ID0gb2Zmc2V0ICsgbmV3WWFtbC5sZW5ndGggLSB5YW1sLmxlbmd0aDtcbiAgICAgIHlhbWwgPSBuZXdZYW1sO1xuICAgICAgLy8gcmVtb3ZlIHRoZSBrZXkvdmFsdWUgZnJvbSBuZXdKc29uIHNvIGl0J3Mgbm90IGRldGVjdGVkIGFzIG5ldyBwYWlyIGluXG4gICAgICAvLyBsYXRlciBjb2RlXG4gICAgICBkZWxldGUgbmV3SnNvbltrZXlOb2RlLnZhbHVlXTtcbiAgICB9XG5cbiAgICAvLyBub24gcHJpbWl0aXZlIHZhbHVlIGhhcyBjaGFuZ2VkXG4gICAgaWYgKCFpc0VxdWFsKG5ld1ZhbHVlLCB2YWx1ZSkgJiYgaXNBcnJheSh2YWxOb2RlLnZhbHVlKSkge1xuXG4gICAgICAvLyBhcnJheSB2YWx1ZSBoYXMgY2hhbmdlZFxuICAgICAgaWYgKGlzQXJyYXkobmV3VmFsdWUpKSB7XG5cbiAgICAgICAgLy8gcmVjdXJzZVxuICAgICAgICBjb25zdCBuZXdZYW1sID0gdXBkYXRlU2VxKHZhbE5vZGUsIG5ld1ZhbHVlLCB5YW1sLCBvZmZzZXQpO1xuICAgICAgICBvZmZzZXQgPSBvZmZzZXQgKyBuZXdZYW1sLmxlbmd0aCAtIHlhbWwubGVuZ3RoO1xuICAgICAgICB5YW1sID0gbmV3WWFtbDtcblxuICAgICAgLy8gbWFwIHZhbHVlIGhhcyBjaGFuZ2VkXG4gICAgICB9IGVsc2Uge1xuXG4gICAgICAgIC8vIHJlY3Vyc2VcbiAgICAgICAgY29uc3QgbmV3WWFtbCA9IHVwZGF0ZU1hcCh2YWxOb2RlLCBuZXdWYWx1ZSwgdmFsdWUsIHlhbWwsIG9mZnNldCk7XG4gICAgICAgIG9mZnNldCA9IG9mZnNldCArIG5ld1lhbWwubGVuZ3RoIC0geWFtbC5sZW5ndGg7XG4gICAgICAgIHlhbWwgPSBuZXdZYW1sO1xuXG4gICAgICAgIC8vIGFzdCA9IGNvbXBvc2UoeWFtbCk7XG5cbiAgICAgICAgLy8gcmVtb3ZlIHRoZSBrZXkvdmFsdWUgZnJvbSBuZXdKc29uIHNvIGl0J3Mgbm90IGRldGVjdGVkIGFzIG5ldyBwYWlyIGluXG4gICAgICAgIC8vIGxhdGVyIGNvZGVcbiAgICAgICAgZGVsZXRlIG5ld0pzb25ba2V5Tm9kZS52YWx1ZV07XG4gICAgICB9XG4gICAgfVxuICB9KTtcblxuICAvLyBsb29rIGZvciBuZXcgaXRlbXMgdG8gYWRkXG4gIGVhY2gobmV3SnNvbiwgKHZhbHVlLCBrZXkpPT4ge1xuXG4gICAgLy8gaXRlbSBpcyBuZXdcbiAgICBpZiAoaXNVbmRlZmluZWQoanNvbltrZXldKSkge1xuICAgICAgbGV0IG5ld1ZhbHVlID0gY2xlYW5EdW1wKHtba2V5XTogdmFsdWV9KTtcblxuICAgICAgY29uc3QgbmV3WWFtbCA9IGluc2VydEFmdGVyTm9kZShhc3QsIG5ld1ZhbHVlLCB5YW1sLCBvZmZzZXQpO1xuICAgICAgb2Zmc2V0ID0gb2Zmc2V0ICsgbmV3WWFtbC5sZW5ndGggLSB5YW1sLmxlbmd0aDtcbiAgICAgIHlhbWwgPSBuZXdZYW1sO1xuICAgIH1cbiAgfSk7XG5cbiAgcmV0dXJuIHlhbWw7XG59XG5cbi8qXG4gKiBQbGFjZSB2YWx1ZSBpbiBub2RlIHJhbmdlIGluIHlhbWwgc3RyaW5nXG4gKlxuICogQHBhcmFtIG5vZGUge05vZGV9XG4gKiBAcGFyYW0gdmFsdWUge3N0cmluZ31cbiAqIEBwYXJhbSB5YW1sIHtzdHJpbmd9XG4gKlxuICogQHJldHVybnMge3N0cmluZ31cbiovXG5mdW5jdGlvbiByZXBsYWNlUHJpbWl0aXZlKG5vZGUsIHZhbHVlLCB5YW1sLCBvZmZzZXQpIHtcbiAgcmV0dXJuIHlhbWwuc3Vic3RyKDAsIG5vZGUuc3RhcnRfbWFyay5wb2ludGVyICsgb2Zmc2V0KSArXG4gICAgSlNPTi5zdHJpbmdpZnkodmFsdWUpICtcbiAgICB5YW1sLnN1YnN0cmluZyhub2RlLmVuZF9tYXJrLnBvaW50ZXIgKyBvZmZzZXQpO1xufVxuXG4vKlxuICogUGxhY2UgdmFsdWUgaW4gbm9kZSByYW5nZSBpbiB5YW1sIHN0cmluZ1xuICpcbiAqIEBwYXJhbSBub2RlIHtOb2RlfVxuICogQHBhcmFtIHZhbHVlIHtzdHJpbmd9XG4gKiBAcGFyYW0geWFtbCB7c3RyaW5nfVxuICpcbiAqIEByZXR1cm5zIHtzdHJpbmd9XG4qL1xuZnVuY3Rpb24gcmVwbGFjZU5vZGUobm9kZSwgdmFsdWUsIHlhbWwsIG9mZnNldCkge1xuICBsZXQgaW5kZW50ZWRWYWx1ZSA9IGluZGVudCh2YWx1ZSwgbm9kZS5zdGFydF9tYXJrLmNvbHVtbik7XG4gIGxldCBsaW5lU3RhcnQgPSBub2RlLnN0YXJ0X21hcmsucG9pbnRlciAtIG5vZGUuc3RhcnRfbWFyay5jb2x1bW4gKyBvZmZzZXQ7XG5cbiAgcmV0dXJuIHlhbWwuc3Vic3RyKDAsIGxpbmVTdGFydCkgK1xuICAgIGluZGVudGVkVmFsdWUgK1xuICAgIHlhbWwuc3Vic3RyaW5nKGdldE5vZGVFbmRNYXJrKG5vZGUpLnBvaW50ZXIgKyBvZmZzZXQpO1xufVxuXG4vKlxuICogUGxhY2UgdmFsdWUgYWZ0ZXIgbm9kZSByYW5nZSBpbiB5YW1sIHN0cmluZ1xuICpcbiAqIEBwYXJhbSBub2RlIHtOb2RlfVxuICogQHBhcmFtIHZhbHVlIHtzdHJpbmd9XG4gKiBAcGFyYW0geWFtbCB7c3RyaW5nfVxuICpcbiAqIEByZXR1cm5zIHtzdHJpbmd9XG4qL1xuZnVuY3Rpb24gaW5zZXJ0QWZ0ZXJOb2RlKG5vZGUsIHZhbHVlLCB5YW1sLCBvZmZzZXQpIHtcbiAgbGV0IGluZGVudGVkVmFsdWUgPSBpbmRlbnQodmFsdWUsIG5vZGUuc3RhcnRfbWFyay5jb2x1bW4pO1xuXG4gIHJldHVybiB5YW1sLnN1YnN0cigwLCBnZXROb2RlRW5kTWFyayhub2RlKS5wb2ludGVyICsgb2Zmc2V0KSArXG4gICAgRU9MICtcbiAgICBpbmRlbnRlZFZhbHVlICtcbiAgICB5YW1sLnN1YnN0cmluZyhnZXROb2RlRW5kTWFyayhub2RlKS5wb2ludGVyICsgb2Zmc2V0KTtcbn1cblxuLypcbiAqIFJlbW92ZXMgYSBub2RlIGZyb20gYXJyYXlcbiAqXG4gKiBAcGFyYW0ge05vZGV9IG5vZGVcbiAqIEBwYXJhbSB7c3RyaW5nfSB5YW1sXG4gKlxuICogQHJldHVybnMge3N0cmluZ31cbiovXG5mdW5jdGlvbiByZW1vdmVBcnJheUVsZW1lbnQobm9kZSwgeWFtbCwgb2Zmc2V0KSB7XG4gIGxldCBpbmRleCA9IG5vZGUuc3RhcnRfbWFyay5wb2ludGVyIC0gbm9kZS5zdGFydF9tYXJrLmNvbHVtbiAtIDEgKyBvZmZzZXQ7XG5cbiAgcmV0dXJuIHlhbWwuc3Vic3RyKDAsIGluZGV4KSArXG4gICAgICB5YW1sLnN1YnN0cmluZyhnZXROb2RlRW5kTWFyayhub2RlKS5wb2ludGVyICsgb2Zmc2V0KTtcbn1cblxuLypcbiAqIENoYW5nZXMgYSBub2RlIGZyb20gYXJyYXlcbiAqXG4gKiBAcGFyYW0ge05vZGV9IG5vZGVcbiAqIEBwYXJhbSB2YWx1ZSB7c3RyaW5nfVxuICogQHBhcmFtIHtzdHJpbmd9IHlhbWxcbiAqXG4gKiBAcmV0dXJucyB7c3RyaW5nfVxuKi9cbmZ1bmN0aW9uIGNoYW5nZUFycmF5RWxlbWVudChub2RlLCB2YWx1ZSwgeWFtbCwgb2Zmc2V0KSB7XG4gIGxldCBpbmRlbnRlZFZhbHVlID0gaW5kZW50KHZhbHVlLCBub2RlLnN0YXJ0X21hcmsuY29sdW1uKTtcblxuICAvLyBmaW5kIGluZGV4IG9mIERBU0goYC1gKSBjaGFyYWN0ZXIgZm9yIHRoaXMgYXJyYXlcbiAgbGV0IGluZGV4ID0gbm9kZS5zdGFydF9tYXJrLnBvaW50ZXIgKyBvZmZzZXQ7XG4gIHdoaWxlIChpbmRleCA+IDAgJiYgeWFtbFtpbmRleF0gIT09IERBU0gpIHtcbiAgICBpbmRleC0tO1xuICB9XG5cbiAgcmV0dXJuIHlhbWwuc3Vic3RyKDAsIGluZGV4ICsgMikgK1xuICAgICAgaW5kZW50ZWRWYWx1ZS5zdWJzdHIobm9kZS5zdGFydF9tYXJrLmNvbHVtbikgK1xuICAgICAgeWFtbC5zdWJzdHJpbmcoZ2V0Tm9kZUVuZE1hcmsobm9kZSkucG9pbnRlciArIG9mZnNldCk7XG59XG5cbi8qXG4gKiBHZXRzIGVuZCBtYXJrIG9mIGFuIEFTVFxuICpcbiAqIEBwYXJhbSB7Tm9kZX0gYXN0XG4gKlxuICogQHJldHVybnMge01hcmt9XG4qL1xuZnVuY3Rpb24gZ2V0Tm9kZUVuZE1hcmsoYXN0KSB7XG4gIGlmIChpc0FycmF5KGFzdC52YWx1ZSkgJiYgYXN0LnZhbHVlLmxlbmd0aCkge1xuICAgIGxldCBsYXN0SXRlbSA9IGxhc3QoYXN0LnZhbHVlKTtcblxuICAgIGlmIChpc0FycmF5KGxhc3RJdGVtKSAmJiBsYXN0SXRlbS5sZW5ndGgpIHtcbiAgICAgIHJldHVybiBnZXROb2RlRW5kTWFyayhsYXN0KGxhc3RJdGVtKSk7XG4gICAgfVxuXG4gICAgcmV0dXJuIGdldE5vZGVFbmRNYXJrKGxhc3RJdGVtKTtcbiAgfVxuXG4gIHJldHVybiBhc3QuZW5kX21hcms7XG59XG5cbi8qXG4gKiBJbmRlbnRzIGEgc3RyaW5nIHdpdGggbnVtYmVyIG9mIGNoYXJhY3RlcnNcbiAqXG4gKiBAcGFyYW0ge3N0cmluZ30gc3RyXG4gKiBAcGFyYW0ge2ludGVnZXJ9IGRlcHRoIC0gY2FuIGJlIG5lZ2F0aXZlIGFsc29cbiAqXG4gKiBAcmV0dXJucyB7c3RyaW5nfVxuKi9cbmZ1bmN0aW9uIGluZGVudChzdHIsIGRlcHRoKSB7XG4gIHJldHVybiBzdHJcbiAgICAuc3BsaXQoRU9MKVxuICAgIC5maWx0ZXIobGluZSA9PiBsaW5lKVxuICAgIC5tYXAobGluZSA9PiByZXBlYXQoU1BBQ0UsIGRlcHRoKSArIGxpbmUpXG4gICAgLmpvaW4oRU9MKTtcbn1cblxuLypcbiAqIER1bXAgYSB2YWx1ZSB0byBZQU1MIHN0aW5nIHdpdGhvdXQgdGhlIHRyYWlsaW5nIG5ldyBsaW5lXG4gKlxuICogQHBhcmFtIHthbnl9IHZhbHVlXG4gKlxuICogQHJldHVybnMge3N0cmluZ31cbiAqXG4qL1xuZnVuY3Rpb24gY2xlYW5EdW1wKHZhbHVlKSB7XG4gIGlmICh2YWx1ZSA9PT0gbnVsbCB8fCBpc1N0cmluZyh2YWx1ZSkgfHwgaXNOdW1iZXIodmFsdWUpKSB7XG4gICAgcmV0dXJuIHZhbHVlO1xuICB9XG5cbiAgbGV0IHlhbWwgPSBkdW1wKHZhbHVlKS5yZXBsYWNlKC9cXG4kLywgJycpO1xuXG4gIGlmIChFT0wgIT09ICdcXG4nKSB7XG4gICAgeWFtbCA9IHlhbWwucmVwbGFjZSgvXFxuL2csIEVPTCk7XG4gIH1cblxuICByZXR1cm4geWFtbDtcbn1cblxuLypcbiAqIEdldHMgcmVtYXJrIG9mIGFuIEFTVFxuICpcbiAqIEBwYXJhbSB7Tm9kZX0gYXN0XG4gKiBAcGFyYW0ge3N0cmluZ30geWFtbFxuICpcbiAqIEByZXR1cm5zIHtzdHJpbmd9XG4qL1xuZnVuY3Rpb24gZ2V0Tm9kZVJlbWFyayhhc3QsIHlhbWwpIHtcbiAgbGV0IGluZGV4ID0gZ2V0Tm9kZUVuZE1hcmsoYXN0KS5wb2ludGVyO1xuICB3aGlsZSAoaW5kZXggPCB5YW1sLmxlbmd0aCAmJiB5YW1sW2luZGV4XSAhPT0gJyMnICYmIHlhbWxbaW5kZXhdICE9PSBFT0wpIHtcbiAgICArK2luZGV4O1xuICB9XG5cbiAgaWYgKEVPTCA9PT0geWFtbFtpbmRleF0gfHwgaW5kZXggPT09IHlhbWwubGVuZ3RoKSB7XG4gICAgcmV0dXJuICcnO1xuICB9IGVsc2Uge1xuICAgIHdoaWxlIChpbmRleCA8IHlhbWwubGVuZ3RoICYmICh5YW1sW2luZGV4XSA9PT0gJyMnIHx8IHlhbWxbaW5kZXhdID09PSAnICcpKSB7XG4gICAgICArK2luZGV4O1xuICAgIH1cbiAgICBsZXQgZW5kID0gaW5kZXg7XG4gICAgd2hpbGUgKGVuZCA8IHlhbWwubGVuZ3RoICYmIHlhbWxbZW5kXSAhPT0gRU9MKSB7XG4gICAgICArK2VuZDtcbiAgICB9XG4gICAgcmV0dXJuIHlhbWwuc3Vic3RyaW5nKGluZGV4LCBlbmQpO1xuICB9XG59XG5cbi8qXG4gKiBTZXRzIHJlbWFyayBvZiBhbiBBU1RcbiAqXG4gKiBAcGFyYW0ge05vZGV9IGFzdFxuICogQHBhcmFtIHtzdHJpbmd9IHJlbWFya1xuICogQHBhcmFtIHtzdHJpbmd9IHlhbWxcbiAqXG4gKiBAcmV0dXJucyB7Ym9vbGVhbn1cbiovXG5mdW5jdGlvbiBzZXROb2RlUmVtYXJrKGFzdCwgcmVtYXJrLCB5YW1sKSB7XG4gIGxldCBpbmRleCA9IGdldE5vZGVFbmRNYXJrKGFzdCkucG9pbnRlcjtcbiAgd2hpbGUgKGluZGV4IDwgeWFtbC5sZW5ndGggJiYgeWFtbFtpbmRleF0gIT09ICcjJyAmJiB5YW1sW2luZGV4XSAhPT0gRU9MKSB7XG4gICAgKytpbmRleDtcbiAgfVxuXG4gIGlmIChFT0wgPT09IHlhbWxbaW5kZXhdIHx8IGluZGV4ID09PSB5YW1sLmxlbmd0aCkge1xuICAgIHJldHVybiB5YW1sLnN1YnN0cigwLCBpbmRleCkgKyAnICMgJyArIHJlbWFyayArXG4gICAgICAgIHlhbWwuc3Vic3RyaW5nKGluZGV4KTtcbiAgfSBlbHNlIHtcbiAgICB3aGlsZSAoaW5kZXggPCB5YW1sLmxlbmd0aCAmJiAoeWFtbFtpbmRleF0gPT09ICcjJyB8fCB5YW1sW2luZGV4XSA9PT0gJyAnKSkge1xuICAgICAgKytpbmRleDtcbiAgICB9XG4gICAgbGV0IGVuZCA9IGluZGV4O1xuICAgIHdoaWxlIChlbmQgPCB5YW1sLmxlbmd0aCAmJiB5YW1sW2VuZF0gIT09IEVPTCkge1xuICAgICAgKytlbmQ7XG4gICAgfVxuICAgIHJldHVybiB5YW1sLnN1YnN0cigwLCBpbmRleCkgKyByZW1hcmsgK1xuICAgICAgICB5YW1sLnN1YnN0cmluZyhlbmQpO1xuICB9XG59XG5cbi8qXG4gKiBHZXRzIG5vZGUgb2YgYW4gQVNUIHdoaWNoIHBhdGhcbiAqXG4gKiBAcGFyYW0ge05vZGV9IGFzdFxuICogQHBhcmFtIHthcnJheX0gcGF0aFxuICpcbiAqIEByZXR1cm5zIHtOb2RlfVxuKi9cbmZ1bmN0aW9uIGdldE5vZGUoYXN0LCBwYXRoKSB7XG4gIGlmIChwYXRoLmxlbmd0aCkge1xuICAgIGlmIChhc3QudGFnID09PSBNQVBfVEFHKSB7XG4gICAgICBsZXQgdmFsdWUgPSBhc3QudmFsdWU7XG4gICAgICBmb3IgKGxldCBpID0gMDsgaSA8IHZhbHVlLmxlbmd0aDsgKytpKSB7XG4gICAgICAgIGxldCBba2V5Tm9kZSwgdmFsTm9kZV0gPSB2YWx1ZVtpXTtcbiAgICAgICAgaWYgKHBhdGhbMF0gPT09IGtleU5vZGUudmFsdWUpIHtcbiAgICAgICAgICByZXR1cm4gZ2V0Tm9kZSh2YWxOb2RlLCBwYXRoLnNsaWNlKDEpKTtcbiAgICAgICAgfVxuICAgICAgfVxuICAgICAgcmV0dXJuIHVuZGVmaW5lZDtcbiAgICB9IGVsc2UgaWYgKGFzdC50YWcgPT09IFNFUV9UQUcpIHtcbiAgICAgIHJldHVybiBhc3QudmFsdWVbcGF0aFswXV0gJiYgZ2V0Tm9kZShhc3QudmFsdWVbcGF0aFswXV0sIHBhdGguc2xpY2UoMSkpO1xuICAgIH1cbiAgfVxuICByZXR1cm4gYXN0O1xufVxuIl19
