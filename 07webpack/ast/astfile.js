let obj = {
    "type": "FunctionDeclaration",
    "start": 24,
    "end": 86,
    // 函数名
    "id": {
        "type": "Identifier",
        "start": 39,
        "end": 42,
        "name": "add"
    },
    "expression": false,
    "generator": false,
    // 是否异步
    "async": true,
    // 函数参数
    "params": [
        {
            "type": "Identifier",
            "start": 43,
            "end": 44,
            "name": "a"
        },
        {
            "type": "Identifier",
            "start": 46,
            "end": 47,
            "name": "b"
        }
    ],
    // 函数体
    "body": {
        "type": "BlockStatement",
        "start": 49,
        "end": 86,
        "body": [
            {
                "type": "VariableDeclaration",
                "start": 55,
                "end": 68,
                "declarations": [
                    {
                        "type": "VariableDeclarator",
                        "start": 59,
                        "end": 67,
                        "id": {
                            "type": "Identifier",
                            "start": 59,
                            "end": 60,
                            "name": "c"
                        },
                        "init": {
                            "type": "BinaryExpression",
                            "start": 63,
                            "end": 67,
                            "left": {
                                "type": "Identifier",
                                "start": 63,
                                "end": 64,
                                "name": "a"
                            },
                            "operator": "+",
                            "right": {
                                "type": "Identifier",
                                "start": 66,
                                "end": 67,
                                "name": "b"
                            }
                        }
                    }
                ],
                // 类型声明
                "kind": "let"
            },
            {
                "type": "ReturnStatement",
                "start": 73,
                "end": 82,
                "argument": {
                    "type": "Identifier",
                    "start": 80,
                    "end": 81,
                    "name": "c"
                }
            }
        ]
    }
},