/** 入口文件 */
import blockedit from './blockedit'
import blockui from './blockui'
// 插件类，创建插件必须基于这个类扩展
import Plugin from '@ckeditor/ckeditor5-core/src/plugin';
// 实例化一个类，然后导出
export default class Block extends Plugin{
  static get requires() {
    return [blockedit, blockui];
  }
}
