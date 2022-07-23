import Plugin from '@ckeditor/ckeditor5-core/src/plugin';
import command from './tipCommand';

export default class tipEdit extends Plugin {
  init() {
    this._defineSchema();
    this._defineConverters();
    this.editor.commands.add('tip', new command(this.editor));
  }

  _defineSchema() {
    const schema = this.editor.model.schema;
    // 注册模型
    schema.register('editItemBox', {
      // 是否为一个完整的对象，不可被回车拆分，意思是回车等行为都是在它自身容器内进行
      isObject: true,
      allowWhere: '$block',
    })

    schema.register('tipContentBox', {
      allowWhere: '$block',
      isLimit: true,
      allowIn: 'editItemBox',
    })

    schema.register('tipTitle', {
      isLimit: true,
      allowIn: 'tipContentBox',
      isObject: true,
      allowContentOf: '$root'
    })

    schema.register('tipContent', {
      isLimit: true,
      allowIn: 'tipContentBox',
      isObject: true,
      allowContentOf: '$root'
    })

    schema.register('tipClose', {
      isLimit: true,
      allowIn: 'tipContentBox',
      allowContentOf: '$block'
    });


    schema.register('tipSpan', {
      isLimit: true,
      allowIn: 'tipClose',
      allowContentOf: '$block'
    });
  }

  _defineConverters() {
    const conversion = this.editor.conversion;

    // model的名称整个项目需要唯一
    conversion.elementToElement({
      model: 'editItemBox',
      view: {
        name: 'div',
        classes: 'edit-item-box'
      }
    });

    // 创建一个普通的转换器
    conversion.elementToElement({
      model: 'tipContentBox',
      view: {
        name: 'div',
        classes: 'tip-content-box'
      }
    });

    conversion.elementToElement({
      model: 'tipClose',
      view: {
        name: 'div',
        classes: 'close'
      }
    });

    conversion.elementToElement({
      model: 'tipSpan',
      view: {
        name: 'span',
        classes: 'closeIcon'
      }
    });

    // 创建一个普通的可编辑可选择的转换器
    conversion.elementToElement({
      model: 'tipTitle',
      view: {
        name: 'div',
        classes: 'tip-title'
      }
    });

    conversion.elementToElement({
      model: 'tipContent',
      view: {
        name: 'div',
        classes: 'tip-content'
      }
    });
  }
}