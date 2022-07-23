import Plugin from '@ckeditor/ckeditor5-core/src/plugin'
import ToolbarUI from './ui'
import BlankEditing from './editing'
import { COMMAND_NAME__BLANK } from './constant'

export default class Blank extends Plugin {
  static get requires() {
    return [BlankEditing, ToolbarUI]
  }
  static get pluginName() {
    return COMMAND_NAME__BLANK
  }
}
