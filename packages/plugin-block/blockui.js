import ButtonView from '@ckeditor/ckeditor5-ui/src/button/buttonview';
import Plugin from '@ckeditor/ckeditor5-core/src/plugin';

// 这个模块是用来监听 click的
import ClickObserver from '@ckeditor/ckeditor5-engine/src/view/observer/clickobserver';
export default class BoxUI extends Plugin {
  init() {
    console.log('UI#init() got called');

    const editor = this.editor;
    const t = editor.t;

    // “block”按钮必须在编辑器的UI组件中注册
    // 将显示在工具栏中。
    editor.ui.componentFactory.add('block', locale => {
      const view = editor.editing.view;
      const command = editor.commands.get('block');

      // 使用模块
      view.addObserver(ClickObserver);

      const buttonView = new ButtonView(locale);
      // 文档：https://ckeditor.com/docs/ckeditor5/latest/api/module_ui_button_buttonview-ButtonView.html
      buttonView.set({
        // 返回一段文字，用作label，当没有ICON的时候显示Babel
        label: t('insert block'),
        withText: true,
        tooltip: true
      });
      // 将按钮的状态绑定到命令。
      buttonView.bind('isOn', 'isEnabled').to(command, 'value', 'isEnabled');
      // 单击(执行)按钮时执行命令。
      this.listenTo(buttonView, 'execute', () => editor.execute('block'));

      return buttonView;
    });
  }
}
