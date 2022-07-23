// block/blockcommad.js
import Command from '@ckeditor/ckeditor5-core/src/command';

export default class InsertSimpleBoxCommand extends Command {
  // 执行命令会调这个函数
  execute() {
    this.editor.model.change(writer => {
      // 模型里面插入
      // 文档：https://ckeditor.com/docs/ckeditor5/latest/api/module_engine_model_model-Model.html
      this.editor.model.insertContent(createSimpleBox(writer));
    });
  }
  // 关于这个事件和上面事件或更多，查看文档：https://ckeditor.com/docs/ckeditor5/latest/api/module_engine_model_documentselection-DocumentSelection.html
  refresh() {
    const model = this.editor.model;
    const selection = model.document.selection;
    const allowedIn = model.schema.findAllowedParent(selection.getFirstPosition(), 'testEdit');

    this.isEnabled = allowedIn !== null;
  }
}

function createSimpleBox(writer) {
  const testEdit = writer.createElement('testEdit');
  const edit = writer.createElement('edit');
  writer.insertText('编辑', writer.createPositionAt(edit, 0));
  const deleteEl = writer.createElement('delete');
  writer.insertText('删除', writer.createPositionAt(deleteEl, 0));
  writer.append(edit, testEdit);
  writer.append(deleteEl, testEdit);

  return testEdit;
}
