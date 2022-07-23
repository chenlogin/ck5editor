//答题线
import classiceditor from '@ckeditor/ckeditor5-editor-classic/src/classiceditor';
import inlineeditor from '@ckeditor/ckeditor5-editor-inline/src/inlineeditor';
import Plugin from '@ckeditor/ckeditor5-core/src/plugin';

import Mathematics from 'ckeditor5-math/src/math';
import AutoformatMathematics from 'ckeditor5-math/src/autoformatmath';

import Essentials from '@ckeditor/ckeditor5-essentials/src/essentials';
import Paragraph from '@ckeditor/ckeditor5-paragraph/src/paragraph';
import Bold from '@ckeditor/ckeditor5-basic-styles/src/bold';
import Italic from '@ckeditor/ckeditor5-basic-styles/src/italic';
import Alignment from '@ckeditor/ckeditor5-alignment/src/alignment'; 
import Font from '@ckeditor/ckeditor5-font/src/font';
import Heading from '@ckeditor/ckeditor5-heading/src/heading';
import SpecialCharacters from '@ckeditor/ckeditor5-special-characters/src/specialcharacters';
import SpecialCharactersEssentials from '@ckeditor/ckeditor5-special-characters/src/specialcharactersessentials';
import Link from '@ckeditor/ckeditor5-link/src/link';
import AutoLink from '@ckeditor/ckeditor5-link/src/autolink';
import Table from '@ckeditor/ckeditor5-table/src/table';
import TableToolbar from '@ckeditor/ckeditor5-table/src/tabletoolbar';
import Image from '@ckeditor/ckeditor5-image/src/image';
import ImageToolbar from '@ckeditor/ckeditor5-image/src/imagetoolbar';
import ImageCaption from '@ckeditor/ckeditor5-image/src/imagecaption';
import ImageStyle from '@ckeditor/ckeditor5-image/src/imagestyle';
import ImageResize from '@ckeditor/ckeditor5-image/src/imageresize';
import ImageUpload from '@ckeditor/ckeditor5-image/src/imageupload.js';
import LinkImage from '@ckeditor/ckeditor5-link/src/linkimage';
import Base64UploadAdapter from '@ckeditor/ckeditor5-upload/src/adapters/base64uploadadapter';
import GeneralHtmlSupport from '@ckeditor/ckeditor5-html-support/src/generalhtmlsupport';
import SourceEditing from '@ckeditor/ckeditor5-source-editing/src/sourceediting';

import CKEditorInspector from '@ckeditor/ckeditor5-inspector';

import Block  from './packages/plugin-block/block.js';
import Tip from './packages/plugin-tips/tip';
import CustomBold from './packages/plugin-bold/main';
import Blank from './packages/plugin-blank/index';

/**
 * A plugin extending General HTML Support for example custom HTML elements.
 */
 class ExtendHTMLSupport extends Plugin {
  static get requires() {
      return [ GeneralHtmlSupport ];
  }

  init() {
    // Extend schema with custom HTML elements.
    const dataFilter = this.editor.plugins.get( 'DataFilter' );
    const dataSchema = this.editor.plugins.get( 'DataSchema' );

    // Inline element
    dataSchema.registerInlineElement( {
        view: 'element-inline',
        model: 'myElementInline'
    } );

    // Custom elements need to be registered using direct API instead of config.
    dataFilter.allowElement( 'element-inline' );
    dataFilter.allowAttributes( { name: 'element-inline', attributes: { 'data-foo': false }, classes: [ 'foo' ] } );

    // Block element
    dataSchema.registerBlockElement( {
        view: 'element-block',
        model: 'myElementBlock',
        modelSchema: {
            inheritAllFrom: '$block'
        }
    } );

    dataFilter.allowElement( 'element-block' );
  }
}

function SpecialCharactersEmoji( editor ) {
  editor.plugins.get( 'SpecialCharacters' ).addItems( 'Emoji', [
      { title: 'smiley face', character: '😊' },
      { title: 'rocket', character: '🚀' },
      { title: 'wind blowing face', character: '🌬️' },
      { title: 'floppy disk', character: '💾' },
      { title: 'heart', character: '❤️' }
  ] );
}

//CKEditor 插件需要实现PluginInterface. 最简单的方法是从基Plugin类继承
class InsertSolution extends Plugin {
  init() {
      console.log( 'InsertImage was initialized' );
  }
}

const config = {
  plugins: [
    ExtendHTMLSupport,//定义具有属性和类的自定义 HTML 元素
    Essentials,
    Paragraph,
    Bold,
    Italic,
    Alignment,
    Font,
    Heading,
    SpecialCharacters,
    SpecialCharactersEssentials,
    SpecialCharactersEmoji,
    Link,
    AutoLink,
    Table,
    TableToolbar,
    Image,
    ImageToolbar,
    ImageCaption,
    ImageStyle,
    ImageResize,
    ImageUpload,
    LinkImage,
    Base64UploadAdapter,
    GeneralHtmlSupport,
    Mathematics,
    AutoformatMathematics,
    SourceEditing,
    Block,
    Tip,
    CustomBold,
    Blank,
  ],
  language: {
    // The UI will be English.
    ui: 'en',

    // But the content will be edited in Arabic.
    content: 'en'
  },
  toolbar: {
    items: [
      'heading', '|',
      'undo', 'redo',
      'fontfamily', 'fontsize', '|',
      'alignment', '|',
      'fontColor', 'fontBackgroundColor', '|',
      'specialCharacters',
      'bold', 'italic', 'strikethrough', 'underline', 'subscript', 'superscript', '|',
      'link', '|',
      'outdent', 'indent', '|',
      'bulletedList', 'numberedList', 'todoList', '|',
      'code', 'codeBlock', 'SourceEditing', '|',
      'insertTable', 'math', '|',
      'uploadImage','blockQuote', 'linkImage', '|', 
      'Block','Tip','ck-custom-bold','yq-blank',
    ], 
    shouldNotGroupWhenFull: false
  },
  math: {
		engine: 'mathjax', // or katex or function. E.g. (equation, element, display) => { ... }
		lazyLoad: undefined, // async () => { ... }, called once before rendering first equation if engine doesn't exist. After resolving promise, plugin renders equations.
		outputType: 'span', // or script
		forceOutputType: false, // forces output to use outputType
		enablePreview: true, // Enable preview view
		previewClassName: [], // Class names to add to previews
		popupClassName: [] // Class names to add to math popup balloon
	},
  heading: {
    options: [
        { model: 'paragraph', title: 'Paragraph', class: 'ck-heading_paragraph' },
        { model: 'heading1', view: 'h1', title: 'Heading 1', class: 'ck-heading_heading1' },
        { model: 'heading2', view: 'h2', title: 'Heading 2', class: 'ck-heading_heading2' }
    ]
  },
  fontFamily: {
    options: [
      'default',
      'Ubuntu, Arial, sans-serif',
      'Ubuntu Mono, Courier New, Courier, monospace'
    ]
  },
  fontSize: {
    options: [
        9,
        11,
        13,
        'default',
        17,
        19,
        21
    ]
  }, 
  fontColor: {
    colors: [
        {
            color: 'hsl(0, 0%, 0%)',
            label: 'Black'
        },
        {
            color: 'hsl(0, 0%, 30%)',
            label: 'Dim grey'
        },
        {
            color: 'hsl(0, 0%, 60%)',
            label: 'Grey'
        },
        {
            color: 'hsl(0, 0%, 90%)',
            label: 'Light grey'
        },
        {
            color: 'hsl(0, 0%, 100%)',
            label: 'White',
            hasBorder: true
        },
    ]
  },
  fontBackgroundColor: {
    colors: [
        {
            color: 'hsl(0, 75%, 60%)',
            label: 'Red'
        },
        {
            color: 'hsl(30, 75%, 60%)',
            label: 'Orange'
        },
        {
            color: 'hsl(60, 75%, 60%)',
            label: 'Yellow'
        },
        {
            color: 'hsl(90, 75%, 60%)',
            label: 'Light green'
        },
        {
            color: 'hsl(120, 75%, 60%)',
            label: 'Green'
        },
    ]
  },
  table: {
    contentToolbar: [ 'tableColumn', 'tableRow', 'mergeTableCells' ]
  },
  image: {
		toolbar: [
			'imageTextAlternative',
			'imageStyle:inline',
			'imageStyle:block',
			'imageStyle:side'
		]
	},
  htmlSupport: {
    allow: [ 
      {
        name: /^(div|section|article)$/
      },
      {
        name: "myelement"
      } 
    ],
  }
};

classiceditor
  .create( document.querySelector( '#classic-editor' ), config)
  .then( editor => {
      console.log( 'Editor was initialized', editor );
      console.log('检索所有可用的工具栏项', Array.from( editor.ui.componentFactory.names() ));

      editor.model.document.on( 'change', () => {
        console.log( 'The document has changed!' );
      } );
      editor.model.document.on( 'change:data', () => {
          console.log( 'The data has changed!' );
          getData();
      } );
      // 监听模块的点击事件
      editor.editing.view.document.on('click', (evt, data) => {
        if (data.domTarget.className == 'edit'){
          console.log("监听模块的点击事件");
        }
      });

      window.ckeditor = editor;
      CKEditorInspector.attach( editor );
  } )
  .catch( error => {
      console.error( error.stack );
  } );
inlineeditor
  .create( document.querySelector( '#inline-editor' ), config)
  .catch( error => {
    console.error( error.stack );
  } ); 
  
function getData() {
    const data = window.ckeditor.getData();
    console.log(data)
    // const preview = document.getElementById( 'editor-preview' );
    // preview.innerHTML = data;
}
