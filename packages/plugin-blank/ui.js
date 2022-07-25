import Plugin from '@ckeditor/ckeditor5-core/src/plugin'
import ButtonView from '@ckeditor/ckeditor5-ui/src/button/buttonview'
import icon from '../../src/theme/icons/blank.svg'
import { COMMAND_NAME__BLANK, COMMAND_LABEL__BLANK } from './constant'

export default class BlankToolbarUI extends Plugin {
  init() {
    this._createToolbarButton()
  }

  _createToolbarButton() {
    const editor = this.editor
    const command = editor.commands.get(COMMAND_NAME__BLANK)
    editor.ui.componentFactory.add(COMMAND_NAME__BLANK, locale => {
      const view = new ButtonView(locale)
      view.set({
        label: COMMAND_LABEL__BLANK,
        tooltip: true,
        icon: icon,
        isToggleable: true
      })
      // 将按钮的状态关联到命令对应值上
      // eslint-disable-next-line
      // @ts-ignore
      view.bind('isOn', 'isEnabled').to(command, 'value', 'isEnabled')
      // 点击按钮时触发相应命令
      this.listenTo(view, 'execute', () => {
        editor.execute(COMMAND_NAME__BLANK)
        editor.editing.view.focus()
      })
      return view
    })
  }
}
