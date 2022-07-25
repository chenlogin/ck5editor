import Plugin from '@ckeditor/ckeditor5-core/src/plugin';
import GeneralHtmlSupport from '@ckeditor/ckeditor5-html-support/src/generalhtmlsupport'

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

// https://ckeditor.com/docs/ckeditor5/latest/features/general-html-support.html
export default {
  plugins: [
    GeneralHtmlSupport,
    ExtendHTMLSupport,//定义具有属性和类的自定义 HTML 元素
  ],
  toolbar: [],
  config: {
    htmlSupport: {
      allow: [ 
        {
          name: /^(div|section|article)$/,
          attributes: true,
          classes: true,
          styles: true
        },
        {
          name: "myelement"
        } 
      ],
    }
  }
}
