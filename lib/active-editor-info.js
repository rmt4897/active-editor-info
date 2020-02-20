'use babel';

import ActiveEditorInfoView from './active-editor-info-view';
import { CompositeDisposable } from 'atom';

export default {

  subscriptions: null,

  activate(state) {
    this.subscriptions = new CompositeDisposable(
        // Add an opener for our view.
        atom.workspace.addOpener(uri => {
          if (uri === 'atom://active-editor-info') {
            return new ActiveEditorInfoView();
          }
        }),

        // Register command that toggles this view
        atom.commands.add('atom-workspace', {
          'active-editor-info:toggle': () => this.toggle()
        }),

        // Destroy any ActiveEditorInfoViews when the package is deactivated.
        new Disposable(() => {
          atom.workspace.getPaneItems().forEach(item => {
            if (item instanceof ActiveEditorInfoView) {
              item.destroy();
            }
          });
        })
      );
    },

  deactivate() {
    this.subscriptions.dispose();
  },
  /* this method is not need for this package */
  // serialize() {
  //   return {
  //     activeEditorInfoViewState: this.activeEditorInfoView.serialize()
  //   };
  // },

  toggle() {
    // console.log('Toggle it!');
    atom.workspace.toggle('atom://active-editor-info');
  }


};
