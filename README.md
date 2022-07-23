# ck5editor
- CK5 提供了五种类型的编辑器，可以根据自己的需求选择
  - Classic editor
  - Inline editor
  - Balloon editor
  - Balloon block editor
  - Document editor
- 如果没有定制化开发的需求，可以直接引用，或者通过[在线生成器](https://ckeditor.com/ckeditor-5/online-builder/)删减不必要的插件
- 但如果不满足既有功能，想结合自己的需求做一些调整，哪怕只是改个图标，都需要自己打包

- ClassicEditor.create() 函数创建 CKEditor 编辑器，它可以接收两个参数，分别是：用于渲染编辑器的 DOM 元素和配置项 Config，其中完整的 Config 可以查看[官网的说明](https://ckeditor.com/docs/ckeditor5/latest/api/module_core_editor_editorconfig-EditorConfig.html)，常用到plugins 和 toolbar
  - plugins: 加载插件，由插件对象构成的数组。
  - toolbar: 配置工具栏，由工具栏名称组成的字符串数组，工具栏的名称需要在插件中定义。
- CKEditor 提供了一个用于调试编辑器的插件 CKEditor 5 inspector，这个调试器其实是以 DOM 的形式插到页面中的
## 原生插件
- CKEditor把原生的各种插件也都抽离出来了，减少了包的体积但是当代码用的多的时候可能要加载特别多的包
```
ClassicEditor
  .create(document.querySelector('#editor'), {
    // .... 其他配置
    plugins: [Bold],
    toolbar: ['Bold']
  })
  // 创建成功的回调
  .then(editor => {
    // to do sth..
  })
  .catch(error => {
    console.error(error.stack);
  });
  ```
## 自定义插件
- CKEditor 5 的自定义插件都需要从 Plugin 类继承，在此基础上根据实际情况开发三个模块：
1. editing: 插件的核心代码，注册插件对应的 Model，以及插件相关的命令、视图转换等；
2. ui: 常用的是 ButtonView，用来注册工具栏上的图标按钮；其他需要自定义的视图需要自行编写模板 Template；
3. command: 自定义指令 Command，一般用于工具栏，用来控制工具栏按钮的状态和行为；也可以注册一般命令，只在代码中触发，而不暴露给用户；
CKEditor 5 有三种基本的通用 Schema：$root，$block 和 $text，分别指代根节点、块元素、普通文本。对于加粗插件，我们也需要先在 editing.js 中注册一个 Schema：
```
// 注册 schema
_defineSchema() {
  const schema = this.editor.model.schema;

  schema.register(SCHEMA_NAME__BOLD, {
    isInline: true, // 是否为行内元素
    isObject: true, // 是否为一个整体
    allowWhere: "$text", // 允许在哪个 schema 插入
    allowAttributes: ["value"], // 允许携带哪些属性
  });
}
```
常用的属性有：
1. allowIn: String | Array<String> 可以作为哪些 schema 的子节点；
2. allowWhere: String | Array<String> 从其他 schema 继承 allowIn；
3. allowAttributes: String | Array<String> 允许携带哪些属性；
4. isLimit: 设置为 true 时，元素内的所有操作只会修改内容，不会影响元素本身。也就是说该元素无法使用回车键拆分，无法在元素内部使用删除键删除该元素（如果把整个 Molde 理解为一张网页，Limit Element 就相当于 iframe）；
5. isObject: 是否为一个完整对象，通常结合 Widget 使用（完整对象会被整体选中，无法使用回车拆分，无法直接编辑文本）;
6. isBlock: 是否为块元素，类似 HTML 中的块元素；
7. isInline: 是否为行内元素。但对于 < a > < strong > 这些需要即时编辑的行内标签，在编辑器中以文本属性来区分，所以 isInline 只用于独立的元素，即 isObject 应设置为 true;


- 参考文档
  - https://ckeditor.com/docs/ckeditor5/latest/framework/index.html
  - https://www.cnblogs.com/wisewrong/p/14325817.html
  - https://juejin.cn/post/6844904121267404814