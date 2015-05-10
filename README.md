#difftool
> diff module to compare and diff JSON and XML

[![Build Status](https://semaphoreci.com/api/v1/projects/9769be16-a744-419d-9077-3d6394a9e0f9/420070/badge.svg)](https://semaphoreci.com/orlando80/difftool)

[![NPM](https://nodei.co/npm/difftool.png)](https://nodei.co/npm/difftool/)

## Usage
```
$ npm install difftool --save
```

```
var difftool = require('difftool');
    
difftool.diff(lhs,rhs,schema, options, function(result) {

}
```
**lhs and rhs** are the two objects to compare.

**schema** - you can specify a schema to apply to the comparison to compare just by type or skip the field
example:
```
var schema = { a: { skipKey:true, compareValues: true, compareTypes: true  }}

```
in this example when it gets to compare the a field, we tell the comparison to:
     skipKey: don't compare at all, exclude it from the report
     compareValues: if false we compare the types but not the values of the property
     compareType: if false we don't compare neither the values nor the types of a property

**options** is an object with 2 fields:
  **options.filter(a,b)** is a function you can pass to the comparison, it's yield every time 2 fields are compared, if the function return true the comparison for those fields is skipped.
  **options.stringCaseInsensitive** is a boolean, if true the string comparison is done case insensitive

**result** is an array returned from the diff method containing all the differences

## Release history

- **v0.1.0** (2015-05-10)
 - added tested and improved docs
- **v0.0.1** (2015-05-09)
 - initial release


## Contributors
* [@arnoldZokas](https://github.com/arnoldZokas)
