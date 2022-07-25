import ui from './tipUi'
import edit from './tipEdit'
import Plugin from '@ckeditor/ckeditor5-core/src/plugin';
import Widget from '@ckeditor/ckeditor5-widget/src/widget';

function insertCss(){
  let cssText = `.tip-content-box{
        width: 100%;
        position: relative;
        border: 1px solid #ccc;
        padding: 6px 10px;
        box-sizing: border-box;
        border-radius: 4px;
        cursor: pointer;
      }
      .tip-content-box:hover .close{
        display: block;
      }
      .tip-title{
        background: white;
        text-align: center;
        font-size: 14px;
        position: absolute;
        top: -10px;
        cursor: text;
        height: 20px;
        left: 50%;
        transform: translateX(-50%);
      }
      .edit-item-box{
        margin: 20px 0;
      }
      .tip-content{
        font-size: 14px;
        cursor: text;
      }
      .close{
        position: absolute;
        top: -7px;
        right: -4px;
        width: 14px;
        height: 14px;
        color:white;
        background:#ccc;
        text-align: center;
        line-height: 12px;
        border-radius: 50%;
        display: none;
        z-index: 99;
        cursor: pointer;
      }
      .tip-title p{
        padding: 0 10px;
        color: #365f93;
        font-weight: bold;
        transform: translateY(-15px);
      }
      .closeIcon{
        transform: scaleX(1.2) translateX(0px) translateY(-1.5px);
        display: inline-block;
        font-size: 12px;
      }`;
  let style = document.createElement('style');
  let head = document.head || document.getElementsByTagName('head')[0];
  let textNode = document.createTextNode(cssText);
  style.appendChild(textNode);
  head.appendChild(style);
};
insertCss();
export default class writeBox extends Plugin {
  static get requires() {
    return [ui, edit, Widget];
  }
  static get pluginName() {
    return 'tip';
  }
}
