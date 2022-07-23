import Plugin from '@ckeditor/ckeditor5-core/src/plugin'
import BlankCommand from './command'
import { COMMAND_NAME__BLANK, SCHEMA_NAME__BLANK } from './constant'

export default class BlankEditing extends Plugin {
  static get pluginName() {
    return 'BlankEditing'
  }
  init() {
    const editor = this.editor
    this._defineSchema()
    this._defineConverters()
    editor.commands.add(COMMAND_NAME__BLANK, new BlankCommand(editor))
  }
  // 注册 schema
  _defineSchema() {
    const schema = this.editor.model.schema
    schema.extend('$text', {
      allowAttributes: SCHEMA_NAME__BLANK
    })
    schema.setAttributeProperties(SCHEMA_NAME__BLANK, { isFormatting: true, copyOnEnter: true })
  }
  // 定义转换器
  _defineConverters() {
    const conversion = this.editor.conversion

    conversion.for('editingDowncast').attributeToElement({
      model: SCHEMA_NAME__BLANK,
      view: {
        name: 'blank',
        styles: {
          display: 'inline-block',
          'min-width': '100px',
          'border-bottom': '1px solid',
          'text-align': 'center',
          'vertical-align': 'bottom'
        }
      }
    })
    conversion.for('dataDowncast').attributeToElement({
      model: SCHEMA_NAME__BLANK,
      view: 'blank'
    })

    // 将 HTML 渲染为 model
    conversion.for('upcast').elementToAttribute({
      model: SCHEMA_NAME__BLANK,
      view: 'blank'
    })
  }
}
