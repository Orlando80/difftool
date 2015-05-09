'use strict';

var _ = require('underscore'),
        xml2js = require('xml2js');

var compareObjects = function(a, b, schema, keyPrefix, options) {
    var differences = [],
        ak          = Object.keys(a),
        bk          = Object.keys(b),
        allKeys     = _.union(ak, bk);

    allKeys.forEach(function(key) {
        var formattedKey = (keyPrefix || '') + key;
        var fieldOptions = schema[key] || {};

        if (options.filter && options.filter(a[key],b[key])) {
            return;
        }

        if(!_.contains(ak, key)) {
            if(fieldOptions.skipKey) {
                return;
            } else {
                return differences.push({
                    path: formattedKey,
                    type: 'missing field',
                    message: 'field ' + formattedKey + ' not present in lhs'
                });
            }
        }

        if(!_.contains(bk, key)) {
            if(fieldOptions.skipKey) {
                return;
            } else {
                return differences.push({
                    path: formattedKey,
                    type: 'missing field',
                    message: 'field ' + formattedKey + ' not present in rhs'
                });
            }
        }

        if((fieldOptions.compareTypes === undefined || fieldOptions.compareTypes === true) && (typeof a[key] !== typeof b[key])) {
            return differences.push({
                path: formattedKey,
                type: 'type equality',
                message: 'lhs field type (' + (typeof a[key]) + ') does not match rhs field type (' + (typeof b[key] + ')'),
                lhs: a[key],
                rhs: b[key]
            });
        }

        if(_.isArray(a[key])) {
            for(var i = 0; i < a[key].length; i++) {
                var objA = a[key][i];
                var objB = b[key][i];

                if(objA === '' && objB === '') {
                    return;
                }

                if(objA === 'false' && objB === 'false') {
                    return;
                }
                if(objA === 0 && objB === 0) {
                    return;
                }
                if(!objB) {
                    return differences.push({
                        path: formattedKey,
                        type: 'missing field',
                        message: 'field ' + formattedKey + '[' + i + ']' + ' not present in rhs'
                    });
                }
                if(!objA) {
                    return differences.push({
                        path: formattedKey,
                        type: 'missing field',
                        message: 'field ' + formattedKey + '[' + i + ']' + ' not present in lhs'
                    });
                } 
                if(_.isObject(a[key][i]) && _.isObject(b[key][i])) {
                        differences = differences.concat(compareObjects(a[key][i], b[key][i], fieldOptions, formattedKey + '[' + i + '].', options));
                    } else {
                        if((fieldOptions.compareValues === undefined || fieldOptions.compareValues === true) &&
                            ((a[key][i] !== b[key][i]) && (fieldOptions.equalityFunction  ? !fieldOptions.equalityFunction(a[key][i],b[key][i]) : true) )) {
                            return differences.push({
                                path: formattedKey,
                                type: 'value equality',
                                lhs: a[key][i],
                                rhs: b[key][i]
                            });
                        }
                    }
            }
        } else if(_.isObject(a[key])) {
            differences = differences.concat(compareObjects(a[key], b[key], fieldOptions, formattedKey + '.', options));
        } else  if(typeof a[key] === 'string' && typeof b[key] === 'string' && options.stringCaseInsensitive) {
            if((a[key].toLowerCase() === b[key].toLowerCase())) {
                return;
            }
        } else if((fieldOptions.compareValues === undefined || fieldOptions.compareValues === true) &&  ((a[key] !== b[key]) && (fieldOptions.equalityFunction  ? !fieldOptions.equalityFunction(a[key],b[key]) : true) )) {
                return differences.push({
                    path: formattedKey,
                    type: 'value equality',
                    lhs: a[key],
                    rhs: b[key]
                });

        }
    });

    return differences;
};

module.exports = {
    diff: function(lhs,rhs,schema, options, next) {
      next(compareObjects(lhs,rhs,schema || {}, null, options || {}));
    },
   diffAsXml: function(lhs, rhs, schema, options, next) {
        xml2js.parseString(lhs,function(err, lhsp) {
            xml2js.parseString(rhs, function(err, rhsp) {
                next(compareObjects(lhsp,rhsp, schema || {}, null, options || {}));
            });
        });
    }
};

