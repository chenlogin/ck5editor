// block/blockedit.js
// 插件类，需要基于这个扩展
import Plugin from '@ckeditor/ckeditor5-core/src/plugin';
// 在这个文件里面创建命令
import command from './blockcommad.js';

export default class Blockedit extends Plugin {
  init() {

    // 定义架构的方法  规定元素的属性，这个属性不是HTML的属性，是CKEditor内使用的
    this._defineSchema();
    // 定义转换器  转换器是生成HTML元素的地方  将定义的模型生成HTML结构
    this._defineConverters();

    // 绑定一个事件 block
    this.editor.commands.add('block', new command(this.editor));
  }

  // 具体参数看文档： https://ckeditor.com/docs/ckeditor5/latest/api/module_engine_model_schema-Schema.html
  _defineSchema(){
    const schema = this.editor.model.schema;
    // 创建一个模型，名字是 testEdit
    schema.register('testEdit', {
      // 是否为一个完整的对象，不可被回车拆分，意思是回车等行为都是在它自身容器内进行
      isObject: true,
      // 要求字符串或数组字符串，可以从其他地方继承
      allowWhere: '$block',
    })

    schema.register('edit', {
      isLimit: true,
      // 在哪个地方使用
      allowIn: 'testEdit',
      // 设置改节点是块还是根，根可以回车
      allowContentOf: '$block'
    });

    schema.register('delete', {
      isLimit: true,
      allowIn: 'testEdit', 
      // 设置改节点是块还是根，根可以回车
      allowContentOf: '$block'
    });
  }

  // 文档：https://ckeditor.com/docs/ckeditor5/latest/api/module_editor-classic_classiceditor-ClassicEditor.html#member-conversion
  _defineConverters(){
    const conversion = this.editor.conversion;

    // 定义转换器  testEdit模型转换成视图  -> <div class="testEdit"></div>
    conversion.elementToElement({
      model: 'testEdit',
      view: {
        name: 'div',
        classes: 'testEdit'
      }
    });
    // 这些同理
    conversion.elementToElement({
      model: 'edit',
      view: {
        name: 'button',
        classes: 'edit'
      }
    });
    conversion.elementToElement({
      model: 'delete',
      view: {
        name: 'button',
        classes: 'delete'
      }
    });
  }
}
