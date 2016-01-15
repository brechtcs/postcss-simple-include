var postcss = require('postcss');

module.exports =  postcss.plugin('myplugin', function myplugin(options) {

    return function(css) {
        options = options || {};

        css.walkRules(function (rule) {
            var includes = getIncludes(rule);
            includes.forEach(function(selector) {
                var declarations = getDeclarations(css, selector);
                declarations.forEach(function(decl) {
                    rule.append({
                        prop: decl.prop,
                        value: decl.value
                    })
                });
            });
        });

    };
});

function getIncludes(rule) {
    var selectors = [];
    rule.walkAtRules(function (atrule) {
        if (atrule.name == 'include') {
            var params = commaListToArray(removeSpaces(atrule.params));
            selectors = selectors.concat(params);

            rule.removeChild(atrule);
        }
    });
            
    return selectors;
}

function getDeclarations(css, selector) {
    var declarations = [];
    css.walkRules(function (rule) {
        rule.selectors.forEach(function(_selector) {
            if (selector == _selector) {
                rule.walkDecls(function(decl) {
                    declarations.push(decl);
                })
            }
        })
    });

    return declarations;
}

function removeSpaces(string) {
    return string.replace(' ', '');
}

function commaListToArray(list) {
    return list.split(',');
}
