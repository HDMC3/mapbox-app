module.exports = {
    env: {
        browser: true,
        es2021: true,
        node: true
    },
    extends: [
        'standard'
    ],
    parser: '@typescript-eslint/parser',
    parserOptions: {
        ecmaVersion: 'latest',
        sourceType: 'module'
    },
    plugins: [
        '@typescript-eslint'
    ],
    rules: {
        quotes: ['error', 'single'],
        semi: ['error', 'always'],
        'padded-blocks': ['off'],
        'space-before-function-paren': ['error', 'never'],
        'no-multiple-empty-lines': ['error', { max: 5, maxEOF: 1, maxBOF: 1 }],
        indent: ['error', 4, {
            SwitchCase: 1,
            VariableDeclarator: 1,
            outerIIFEBody: 1,
            MemberExpression: 1,
            FunctionDeclaration: { parameters: 1, body: 1 },
            FunctionExpression: { parameters: 1, body: 1 },
            CallExpression: { arguments: 1 },
            ArrayExpression: 1,
            ObjectExpression: 1,
            ImportDeclaration: 1,
            flatTernaryExpressions: false,
            ignoreComments: false,
            ignoredNodes: ['TemplateLiteral *', 'JSXElement', 'JSXElement > *', 'JSXAttribute', 'JSXIdentifier', 'JSXNamespacedName', 'JSXMemberExpression', 'JSXSpreadAttribute', 'JSXExpressionContainer', 'JSXOpeningElement', 'JSXClosingElement', 'JSXFragment', 'JSXOpeningFragment', 'JSXClosingFragment', 'JSXText', 'JSXEmptyExpression', 'JSXSpreadChild'],
            offsetTernaryExpressions: true
        }]
    }
}
