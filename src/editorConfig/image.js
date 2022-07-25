import Image from '@ckeditor/ckeditor5-image/src/image';
import ImageToolbar from '@ckeditor/ckeditor5-image/src/imagetoolbar';
import ImageCaption from '@ckeditor/ckeditor5-image/src/imagecaption';
import ImageStyle from '@ckeditor/ckeditor5-image/src/imagestyle';
import ImageResize from '@ckeditor/ckeditor5-image/src/imageresize';
import ImageUpload from '@ckeditor/ckeditor5-image/src/imageupload.js';
import LinkImage from '@ckeditor/ckeditor5-link/src/linkimage';
import Base64UploadAdapter from '@ckeditor/ckeditor5-upload/src/adapters/base64uploadadapter';

export default {

  plugins: [Image, ImageToolbar, ImageCaption, ImageStyle, ImageResize, ImageUpload,LinkImage,Base64UploadAdapter],
  toolbar: ['uploadImage'],
  config: {
    image: {
      resizeOptions: [
        {
          name: 'resizeImage:original',
          label: '默认大小',
          value: null
        },
        {
          name: 'resizeImage:100',
          label: '100px',
          value: '100'
        },
        {
          name: 'resizeImage:200',
          label: '200px',
          value: '200'
        }
      ],
      resizeUnit: 'px',
      toolbar: [
        'toggleImageCaption',
        'imageTextAlternative',
        '|',
        'imageStyle:inline',
        'imageStyle:wrapText',
        'imageStyle:breakText',
        'imageStyle:side',
        '|',
        'resizeImage'
      ]
    }
  }
}
