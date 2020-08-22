框架使用：dom(div、a、span等dom元素为例)
1、html元素结构
        a、单个标签["dom"]，
        b、标签内含标签
        [
            "dom",
            ["dom"]
        ]
        c、文本内容{"dom":"文本内容"}
        d、统一过后
            [
                "dom",
                [
                    "dom",
                    {"dom":"文本内容"},
                ]
                ["dom"]
            ]
            对应：
                <dom>
                    <dom></dom>  
                    <dom>文本内容</dom>  
                </dom>
            
        
2、class类名添加
    [
        "dom|className"
        {"dom|className":"文本内容"}
    ]
    对应：
                <dom class="className"></dom>  
                <dom class="className">文本内容</dom>  
2、id添加
取第二个|之后字符为id
    [
        "dom||id"
        {"dom|className|id":"文本内容"}
    ]
    对应：
                <dom id="id"></dom>  
                <dom class="className" id="id">文本内容</dom>          
注意事项1、class和id中不允许出现|符号