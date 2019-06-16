import { Platform, I18nManager } from 'react-native';

module.exports = {
  RichTextEditor: (Platform.OS !== 'ios')? { uri: 'file:///android_asset/templates/rich-text-editor.html' }: require('./templates/rich-text-editor.html')
}
