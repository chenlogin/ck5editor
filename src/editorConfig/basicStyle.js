import Heading from '@ckeditor/ckeditor5-heading/src/heading';
import Bold from '@ckeditor/ckeditor5-basic-styles/src/bold'
import Italic from '@ckeditor/ckeditor5-basic-styles/src/italic'
import Underline from '@ckeditor/ckeditor5-basic-styles/src/underline'
import Strikethrough from '@ckeditor/ckeditor5-basic-styles/src/strikethrough'
import Alignment from '@ckeditor/ckeditor5-alignment/src/alignment'; 
import SpecialCharacters from '@ckeditor/ckeditor5-special-characters/src/specialcharacters';
import SpecialCharactersEssentials from '@ckeditor/ckeditor5-special-characters/src/specialcharactersessentials';
import Link from '@ckeditor/ckeditor5-link/src/link';
import AutoLink from '@ckeditor/ckeditor5-link/src/autolink';
import SourceEditing from '@ckeditor/ckeditor5-source-editing/src/sourceediting';

import font from './font';

/**
 * A plugin extending General HTML Support for example custom HTML elements.
 */
 function SpecialCharactersEmoji( editor ) {
  editor.plugins.get( 'SpecialCharacters' ).addItems( 'Emoji', [
      { title: 'smiley face', character: '😊' },
      { title: 'rocket', character: '🚀' },
      { title: 'wind blowing face', character: '🌬️' },
      { title: 'floppy disk', character: '💾' },
      { title: 'heart', character: '❤️' }
  ] );
}

export default {
  plugins: [
    Heading, 
    Bold,
    Italic,
    Underline,
    Strikethrough,
    Alignment,
    SpecialCharacters,
    SpecialCharactersEssentials,
    SpecialCharactersEmoji,
    Link,
    AutoLink,
    SourceEditing,
    ...font.plugins,
  ],
  toolbar: [
    'heading', 'undo', 'redo', '|',
    ...font.toolbar,
    'alignment', '|',
    'specialCharacters',
    'bold', 'italic', 'strikethrough', 'underline', 'subscript', 'superscript', '|',
    'link', '|',
    'code', 'codeBlock', 'SourceEditing', '|',
    
  ],
  config: {
    heading: {
      options: [
          { model: 'paragraph', title: 'Paragraph', class: 'ck-heading_paragraph' },
          { model: 'heading1', view: 'h1', title: 'Heading 1', class: 'ck-heading_heading1' },
          { model: 'heading2', view: 'h2', title: 'Heading 2', class: 'ck-heading_heading2' }
      ]
    },
    ...font.config,
  }
}
