import Essentials from '@ckeditor/ckeditor5-essentials/src/essentials';
import Paragraph from '@ckeditor/ckeditor5-paragraph/src/paragraph';

import basic from './basicStyle';
import htmlSupport from './htmlSupport';
import image from './image';
import table from './table';
import math from './math';

import Block  from '@plugin/plugin-block/index';
import Tip from '@plugin/plugin-tips/index';
import CustomBold from '@plugin/plugin-bold/index';
import Blank from '@plugin/plugin-blank/index';

export const defaultEditorConfig = {
  plugins: [
    Essentials,
    Paragraph,
    ...basic.plugins,
    ...table.plugins,
    ...image.plugins,
    ...htmlSupport.plugins,
    ...math.plugins,
    Block,
    Tip,
    CustomBold,
    Blank,
  ],
  toolbar: {
    items: [
      ...basic.toolbar,
      'outdent', 'indent', '|',
      'bulletedList', 'numberedList', 'todoList', '|',
      ...table.toolbar, ...math.toolbar, '|',
      ...image.toolbar,'blockQuote', 'linkImage', '|', 
      Block.pluginName,
      Tip.pluginName,
      CustomBold.pluginName,
      Blank.pluginName,
    ], 
    shouldNotGroupWhenFull: false
  },
  language: {
    // The UI will be English.
    ui: 'en',

    // But the content will be edited in Arabic.
    content: 'en'
  },
  ...basic.config,
  ...math.config,
  ...table.config,
  ...image.config,
  ...htmlSupport.config,
};