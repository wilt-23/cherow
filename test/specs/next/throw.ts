import { parseScript, parseModule } from '../../../src/cherow';
import * as chai from 'chai';

const expect = chai.expect;

describe('Next - Throw expression', () => {

    it.skip('should fail on invalid use of parenthesis', () => {
        expect(() => {
            parseScript('function test() { (throw 1, 2); }', {
                next: true
            });
        }).to.throw();
    });


    it('should parse arrow function body', () => {
        expect(parseScript(`function save(filename = throw new TypeError("Argument required")) {}`, {
            raw: true,
            ranges: true,
            next: true
        })).to.eql({
            "type": "Program",
            "body": [
                {
                    "type": "FunctionDeclaration",
                    "params": [
                        {
                            "type": "AssignmentPattern",
                            "left": {
                                "type": "Identifier",
                                "name": "filename",
                                "start": 14,
                                "end": 22
                            },
                            "right": {
                                "type": "ThrowExpression",
                                "expressions": {
                                    "type": "NewExpression",
                                    "callee": {
                                        "type": "Identifier",
                                        "name": "TypeError",
                                        "start": 35,
                                        "end": 44
                                    },
                                    "arguments": [
                                        {
                                            "type": "Literal",
                                            "value": "Argument required",
                                            "start": 45,
                                            "end": 64,
                                            "raw": "\"Argument required\""
                                        }
                                    ],
                                    "start": 31,
                                    "end": 65
                                },
                                "start": 25,
                                "end": 65
                            },
                            "start": 14,
                            "end": 65
                        }
                    ],
                    "body": {
                        "type": "BlockStatement",
                        "body": [],
                        "start": 67,
                        "end": 69
                    },
                    "async": false,
                    "generator": false,
                    "expression": false,
                    "id": {
                        "type": "Identifier",
                        "name": "save",
                        "start": 9,
                        "end": 13
                    },
                    "start": 0,
                    "end": 69
                }
            ],
            "sourceType": "script",
            "start": 0,
            "end": 69
        });
    });

    it('should parse conditional expressions', () => {
        expect(parseScript(`function getEncoder(encoding) {
            const encoder = encoding === "utf8" ? new UTF8Encoder() 
                          : encoding === "utf16le" ? new UTF16Encoder(false) 
                          : encoding === "utf16be" ? new UTF16Encoder(true) 
                          : throw new Error("Unsupported encoding");
          }`, {
            raw: true,
            ranges: true,
            next: true
        })).to.eql({
            "type": "Program",
            "body": [
                {
                    "type": "FunctionDeclaration",
                    "params": [
                        {
                            "type": "Identifier",
                            "name": "encoding",
                            "start": 20,
                            "end": 28
                        }
                    ],
                    "body": {
                        "type": "BlockStatement",
                        "body": [
                            {
                                "type": "VariableDeclaration",
                                "declarations": [
                                    {
                                        "type": "VariableDeclarator",
                                        "init": {
                                            "type": "ConditionalExpression",
                                            "test": {
                                                "type": "BinaryExpression",
                                                "left": {
                                                    "type": "Identifier",
                                                    "name": "encoding",
                                                    "start": 60,
                                                    "end": 68
                                                },
                                                "right": {
                                                    "type": "Literal",
                                                    "value": "utf8",
                                                    "start": 73,
                                                    "end": 79,
                                                    "raw": "\"utf8\""
                                                },
                                                "operator": "===",
                                                "start": 60,
                                                "end": 79
                                            },
                                            "consequent": {
                                                "type": "NewExpression",
                                                "callee": {
                                                    "type": "Identifier",
                                                    "name": "UTF8Encoder",
                                                    "start": 86,
                                                    "end": 97
                                                },
                                                "arguments": [],
                                                "start": 82,
                                                "end": 99
                                            },
                                            "alternate": {
                                                "type": "ConditionalExpression",
                                                "test": {
                                                    "type": "BinaryExpression",
                                                    "left": {
                                                        "type": "Identifier",
                                                        "name": "encoding",
                                                        "start": 129,
                                                        "end": 137
                                                    },
                                                    "right": {
                                                        "type": "Literal",
                                                        "value": "utf16le",
                                                        "start": 142,
                                                        "end": 151,
                                                        "raw": "\"utf16le\""
                                                    },
                                                    "operator": "===",
                                                    "start": 129,
                                                    "end": 151
                                                },
                                                "consequent": {
                                                    "type": "NewExpression",
                                                    "callee": {
                                                        "type": "Identifier",
                                                        "name": "UTF16Encoder",
                                                        "start": 158,
                                                        "end": 170
                                                    },
                                                    "arguments": [
                                                        {
                                                            "type": "Literal",
                                                            "value": false,
                                                            "start": 171,
                                                            "end": 176,
                                                            "raw": "false"
                                                        }
                                                    ],
                                                    "start": 154,
                                                    "end": 177
                                                },
                                                "alternate": {
                                                    "type": "ConditionalExpression",
                                                    "test": {
                                                        "type": "BinaryExpression",
                                                        "left": {
                                                            "type": "Identifier",
                                                            "name": "encoding",
                                                            "start": 207,
                                                            "end": 215
                                                        },
                                                        "right": {
                                                            "type": "Literal",
                                                            "value": "utf16be",
                                                            "start": 220,
                                                            "end": 229,
                                                            "raw": "\"utf16be\""
                                                        },
                                                        "operator": "===",
                                                        "start": 207,
                                                        "end": 229
                                                    },
                                                    "consequent": {
                                                        "type": "NewExpression",
                                                        "callee": {
                                                            "type": "Identifier",
                                                            "name": "UTF16Encoder",
                                                            "start": 236,
                                                            "end": 248
                                                        },
                                                        "arguments": [
                                                            {
                                                                "type": "Literal",
                                                                "value": true,
                                                                "start": 249,
                                                                "end": 253,
                                                                "raw": "true"
                                                            }
                                                        ],
                                                        "start": 232,
                                                        "end": 254
                                                    },
                                                    "alternate": {
                                                        "type": "ThrowExpression",
                                                        "expressions": {
                                                            "type": "NewExpression",
                                                            "callee": {
                                                                "type": "Identifier",
                                                                "name": "Error",
                                                                "start": 294,
                                                                "end": 299
                                                            },
                                                            "arguments": [
                                                                {
                                                                    "type": "Literal",
                                                                    "value": "Unsupported encoding",
                                                                    "start": 300,
                                                                    "end": 322,
                                                                    "raw": "\"Unsupported encoding\""
                                                                }
                                                            ],
                                                            "start": 290,
                                                            "end": 323
                                                        },
                                                        "start": 284,
                                                        "end": 323
                                                    },
                                                    "start": 207,
                                                    "end": 323
                                                },
                                                "start": 129,
                                                "end": 323
                                            },
                                            "start": 60,
                                            "end": 323
                                        },
                                        "id": {
                                            "type": "Identifier",
                                            "name": "encoder",
                                            "start": 50,
                                            "end": 57
                                        },
                                        "start": 50,
                                        "end": 323
                                    }
                                ],
                                "kind": "const",
                                "start": 44,
                                "end": 324
                            }
                        ],
                        "start": 30,
                        "end": 336
                    },
                    "async": false,
                    "generator": false,
                    "expression": false,
                    "id": {
                        "type": "Identifier",
                        "name": "getEncoder",
                        "start": 9,
                        "end": 19
                    },
                    "start": 0,
                    "end": 336
                }
            ],
            "sourceType": "script",
            "start": 0,
            "end": 336
        });
    });

    it('should parse logical operations', () => {
        expect(parseScript(`class Product {
            get id() { return this._id; }
            set id(value) { this._id = value || throw new Error("Invalid value"); }
          }`, {
            raw: true,
            ranges: true,
            next: true
        })).to.eql({
            "type": "Program",
            "body": [
                {
                    "type": "ClassDeclaration",
                    "id": {
                        "type": "Identifier",
                        "name": "Product",
                        "start": 6,
                        "end": 13
                    },
                    "superClass": null,
                    "body": {
                        "type": "ClassBody",
                        "body": [
                            {
                                "type": "MethodDefinition",
                                "computed": false,
                                "key": {
                                    "type": "Identifier",
                                    "name": "id",
                                    "start": 32,
                                    "end": 34
                                },
                                "kind": "get",
                                "static": false,
                                "value": {
                                    "type": "FunctionExpression",
                                    "id": null,
                                    "params": [],
                                    "body": {
                                        "type": "BlockStatement",
                                        "body": [
                                            {
                                                "type": "ReturnStatement",
                                                "argument": {
                                                    "type": "MemberExpression",
                                                    "object": {
                                                        "type": "ThisExpression",
                                                        "start": 46,
                                                        "end": 50
                                                    },
                                                    "computed": false,
                                                    "property": {
                                                        "type": "Identifier",
                                                        "name": "_id",
                                                        "start": 51,
                                                        "end": 54
                                                    },
                                                    "start": 46,
                                                    "end": 54
                                                },
                                                "start": 39,
                                                "end": 55
                                            }
                                        ],
                                        "start": 37,
                                        "end": 57
                                    },
                                    "generator": false,
                                    "async": false,
                                    "expression": false,
                                    "start": 34,
                                    "end": 57
                                },
                                "start": 28,
                                "end": 57
                            },
                            {
                                "type": "MethodDefinition",
                                "computed": false,
                                "key": {
                                    "type": "Identifier",
                                    "name": "id",
                                    "start": 74,
                                    "end": 76
                                },
                                "kind": "set",
                                "static": false,
                                "value": {
                                    "type": "FunctionExpression",
                                    "id": null,
                                    "params": [
                                        {
                                            "type": "Identifier",
                                            "name": "value",
                                            "start": 77,
                                            "end": 82
                                        }
                                    ],
                                    "body": {
                                        "type": "BlockStatement",
                                        "body": [
                                            {
                                                "type": "ExpressionStatement",
                                                "expression": {
                                                    "type": "AssignmentExpression",
                                                    "left": {
                                                        "type": "MemberExpression",
                                                        "object": {
                                                            "type": "ThisExpression",
                                                            "start": 86,
                                                            "end": 90
                                                        },
                                                        "computed": false,
                                                        "property": {
                                                            "type": "Identifier",
                                                            "name": "_id",
                                                            "start": 91,
                                                            "end": 94
                                                        },
                                                        "start": 86,
                                                        "end": 94
                                                    },
                                                    "operator": "=",
                                                    "right": {
                                                        "type": "LogicalExpression",
                                                        "left": {
                                                            "type": "Identifier",
                                                            "name": "value",
                                                            "start": 97,
                                                            "end": 102
                                                        },
                                                        "right": {
                                                            "type": "ThrowExpression",
                                                            "expressions": {
                                                                "type": "NewExpression",
                                                                "callee": {
                                                                    "type": "Identifier",
                                                                    "name": "Error",
                                                                    "start": 116,
                                                                    "end": 121
                                                                },
                                                                "arguments": [
                                                                    {
                                                                        "type": "Literal",
                                                                        "value": "Invalid value",
                                                                        "start": 122,
                                                                        "end": 137,
                                                                        "raw": "\"Invalid value\""
                                                                    }
                                                                ],
                                                                "start": 112,
                                                                "end": 138
                                                            },
                                                            "start": 106,
                                                            "end": 138
                                                        },
                                                        "operator": "||",
                                                        "start": 97,
                                                        "end": 138
                                                    },
                                                    "start": 86,
                                                    "end": 138
                                                },
                                                "start": 86,
                                                "end": 139
                                            }
                                        ],
                                        "start": 84,
                                        "end": 141
                                    },
                                    "generator": false,
                                    "async": false,
                                    "expression": false,
                                    "start": 76,
                                    "end": 141
                                },
                                "start": 70,
                                "end": 141
                            }
                        ],
                        "start": 14,
                        "end": 153
                    },
                    "start": 0,
                    "end": 153
                }
            ],
            "sourceType": "script",
            "start": 0,
            "end": 153
        });
    });

    it('should parse arrow function body', () => {
        expect(parseScript(`lint(ast, { 
            with: () => throw new Error("avoid using 'with' statements.")
          });`, {
            raw: true,
            ranges: true,
            next: true
        })).to.eql({
            "type": "Program",
            "body": [
                {
                    "type": "ExpressionStatement",
                    "expression": {
                        "type": "CallExpression",
                        "arguments": [
                            {
                                "type": "Identifier",
                                "name": "ast",
                                "start": 5,
                                "end": 8
                            },
                            {
                                "type": "ObjectExpression",
                                "properties": [
                                    {
                                        "type": "Property",
                                        "computed": false,
                                        "key": {
                                            "type": "Identifier",
                                            "name": "with",
                                            "start": 25,
                                            "end": 29
                                        },
                                        "kind": "init",
                                        "method": false,
                                        "shorthand": false,
                                        "value": {
                                            "type": "ArrowFunctionExpression",
                                            "id": null,
                                            "params": [],
                                            "body": {
                                                "type": "ThrowExpression",
                                                "expressions": {
                                                    "type": "NewExpression",
                                                    "callee": {
                                                        "type": "Identifier",
                                                        "name": "Error",
                                                        "start": 47,
                                                        "end": 52
                                                    },
                                                    "arguments": [
                                                        {
                                                            "type": "Literal",
                                                            "value": "avoid using 'with' statements.",
                                                            "start": 53,
                                                            "end": 85,
                                                            "raw": "\"avoid using 'with' statements.\""
                                                        }
                                                    ],
                                                    "start": 43,
                                                    "end": 86
                                                },
                                                "start": 37,
                                                "end": 86
                                            },
                                            "generator": false,
                                            "expression": true,
                                            "async": false,
                                            "start": 31,
                                            "end": 86
                                        },
                                        "start": 25,
                                        "end": 86
                                    }
                                ],
                                "start": 10,
                                "end": 98
                            }
                        ],
                        "callee": {
                            "type": "Identifier",
                            "name": "lint",
                            "start": 0,
                            "end": 4
                        },
                        "start": 0,
                        "end": 99
                    },
                    "start": 0,
                    "end": 100
                }
            ],
            "sourceType": "script",
            "start": 0,
            "end": 100
        });
    });

    it('should parse with comma', () => {
        expect(parseScript(`function test() {
              (throw 1, 2);
            }`, {
            raw: true,
            ranges: true,
            next: true
        })).to.eql({
            "type": "Program",
            "body": [
                {
                    "type": "FunctionDeclaration",
                    "params": [],
                    "body": {
                        "type": "BlockStatement",
                        "body": [
                            {
                                "type": "ExpressionStatement",
                                "expression": {
                                    "type": "SequenceExpression",
                                    "expressions": [
                                        {
                                            "type": "ThrowExpression",
                                            "expressions": {
                                                "type": "Literal",
                                                "value": 1,
                                                "start": 39,
                                                "end": 40,
                                                "raw": "1"
                                            },
                                            "start": 33,
                                            "end": 40
                                        },
                                        {
                                            "type": "Literal",
                                            "value": 2,
                                            "start": 42,
                                            "end": 43,
                                            "raw": "2"
                                        }
                                    ],
                                    "start": 33,
                                    "end": 43
                                },
                                "start": 32,
                                "end": 45
                            }
                        ],
                        "start": 16,
                        "end": 59
                    },
                    "async": false,
                    "generator": false,
                    "expression": false,
                    "id": {
                        "type": "Identifier",
                        "name": "test",
                        "start": 9,
                        "end": 13
                    },
                    "start": 0,
                    "end": 59
                }
            ],
            "sourceType": "script",
            "start": 0,
            "end": 59
        });
    });

    it('should parse as expression', () => {
        expect(parseScript(`function test() {
              (throw 1);
            }`, {
            raw: true,
            ranges: true,
            next: true
        })).to.eql({
            "type": "Program",
            "body": [
                {
                    "type": "FunctionDeclaration",
                    "params": [],
                    "body": {
                        "type": "BlockStatement",
                        "body": [
                            {
                                "type": "ExpressionStatement",
                                "expression": {
                                    "type": "ThrowExpression",
                                    "expressions": {
                                        "type": "Literal",
                                        "value": 1,
                                        "start": 39,
                                        "end": 40,
                                        "raw": "1"
                                    },
                                    "start": 33,
                                    "end": 40
                                },
                                "start": 32,
                                "end": 42
                            }
                        ],
                        "start": 16,
                        "end": 56
                    },
                    "async": false,
                    "generator": false,
                    "expression": false,
                    "id": {
                        "type": "Identifier",
                        "name": "test",
                        "start": 9,
                        "end": 13
                    },
                    "start": 0,
                    "end": 56
                }
            ],
            "sourceType": "script",
            "start": 0,
            "end": 56
        });
    });

    it('should parse as logical expression', () => {
        expect(parseScript(`function test() {
              true && throw 1;
            }`, {
            raw: true,
            ranges: true,
            next: true
        })).to.eql({
            "type": "Program",
            "body": [
                {
                    "type": "FunctionDeclaration",
                    "params": [],
                    "body": {
                        "type": "BlockStatement",
                        "body": [
                            {
                                "type": "ExpressionStatement",
                                "expression": {
                                    "type": "LogicalExpression",
                                    "left": {
                                        "type": "Literal",
                                        "value": true,
                                        "start": 32,
                                        "end": 36,
                                        "raw": "true"
                                    },
                                    "right": {
                                        "type": "ThrowExpression",
                                        "expressions": {
                                            "type": "Literal",
                                            "value": 1,
                                            "start": 46,
                                            "end": 47,
                                            "raw": "1"
                                        },
                                        "start": 40,
                                        "end": 47
                                    },
                                    "operator": "&&",
                                    "start": 32,
                                    "end": 47
                                },
                                "start": 32,
                                "end": 48
                            }
                        ],
                        "start": 16,
                        "end": 62
                    },
                    "async": false,
                    "generator": false,
                    "expression": false,
                    "id": {
                        "type": "Identifier",
                        "name": "test",
                        "start": 9,
                        "end": 13
                    },
                    "start": 0,
                    "end": 62
                }
            ],
            "sourceType": "script",
            "start": 0,
            "end": 62
        });
    });

    it('should parse statement', () => {
        expect(parseScript(`function test() {
              throw 1;
            }`, {
            raw: true,
            ranges: true,
            next: true
        })).to.eql({
            "type": "Program",
            "body": [
                {
                    "type": "FunctionDeclaration",
                    "params": [],
                    "body": {
                        "type": "BlockStatement",
                        "body": [
                            {
                                "type": "ThrowStatement",
                                "argument": {
                                    "type": "Literal",
                                    "value": 1,
                                    "start": 38,
                                    "end": 39,
                                    "raw": "1"
                                },
                                "start": 32,
                                "end": 40
                            }
                        ],
                        "start": 16,
                        "end": 54
                    },
                    "async": false,
                    "generator": false,
                    "expression": false,
                    "id": {
                        "type": "Identifier",
                        "name": "test",
                        "start": 9,
                        "end": 13
                    },
                    "start": 0,
                    "end": 54
                }
            ],
            "sourceType": "script",
            "start": 0,
            "end": 54
        });
    });

    it('should parse with comma', () => {
        expect(parseScript(`function test() {
              (throw 1, 2);
            }`, {
            raw: true,
            ranges: true,
            next: true
        })).to.eql({});
    });

    it('should parse with comma', () => {
        expect(parseScript(`function test() {
              (throw 1, 2);
            }`, {
            raw: true,
            ranges: true,
            next: true
        })).to.eql({});
    });
});