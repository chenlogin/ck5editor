import classiceditor from '@ckeditor/ckeditor5-editor-classic/src/classiceditor';
import inlineeditor from '@ckeditor/ckeditor5-editor-inline/src/inlineeditor';
import CKEditorInspector from '@ckeditor/ckeditor5-inspector';

import { defaultEditorConfig } from './src/editorConfig';

class Editor {
  constructor(config) {
    this.config = config;
    this.init() 
  }

  init() {
    let Editor = classiceditor;
    if (this.config.type === 'inline') {
      Editor = inlineeditor;
    }

    Editor
    .create( document.querySelector( `#${this.config.id}` ), defaultEditorConfig)
    .then( editor => {
        this.ckeditor = editor;
        console.log( 'Editor was initialized', editor );
        console.log('检索所有可用的工具栏项', Array.from( editor.ui.componentFactory.names() ));

        editor.model.document.on( 'change', () => {
          console.log( 'The document has changed!' );
        } );
        editor.model.document.on( 'change:data', () => {
            console.log( 'The data has changed!' );
            this.getData();
        } );
        // 监听模块的点击事件
        editor.editing.view.document.on('click', (evt, data) => {
          if (data.domTarget.className == 'edit'){
            console.log("监听模块的点击事件");
          }
          if (data.domTarget.className == 'closeIcon' || data.domTarget.className == 'close' ) {
            const selection = editor.model.document.selection;
            editor.model.document.model.deleteContent(selection)
          };
        });

        CKEditorInspector.attach( this.ckeditor );
    })
    .catch( error => {
        console.error( error.stack );
    }); 
  }

  getData() {
    const data = this.ckeditor.getData();
    console.log(data);
  }
}

new Editor({
  id: 'classic-editor',
  type : 'classic'
})