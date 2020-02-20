'use babel';

export default class ActiveEditorInfoView {

  constructor(serializedState) {
    // Create root element
    this.element = document.createElement('div');
    this.element.classList.add('active-editor-info');

    // Create message element
    const message = document.createElement('div');
    message.textContent = 'The ActiveEditorInfo package is Alive! It\'s ALIVE!';
    message.classList.add('message');
    this.element.appendChild(message);

    this.subscriptions = atom.workspace.getCenter().observeActivePaneItem(item => {
      if (!atom.workspace.isTextEditor(item)) {
        message.innerText = 'Open a file to see important information about it.';
        return;
      }
      message.innerHTML = `
      <h2>${item.getFileName() || 'untitled'}</h2>
      <ul>
        <li><b>Soft Wrap:</b> ${item.softWrapped}</li>
        <li><b>Tab Length:</b> ${item.getTabLength()}</li>
        <li><b>Encoding:</b> ${item.getEncoding()}</li>
        <li><b>Line Count:</b> ${item.getLineCount()}</li>
        </ul>
      `;
    });

  }

  // Returns an object that can be retrieved when package is activated
  serialize() {}

  // Tear down any state and detach
  destroy() {
    this.element.remove();
    this.subscriptions.dispose();
  }

  getElement() {
    return this.element;
  }

  getTitle() {
    // Used by Atom for tab text
    return 'Active Editor Info';
  }

  getURI() {
    // Used by Atom to identify the view when toggling.
    return 'atom://active-editor-info';
  }

  getDefaultLocation() {
    // if user hasn't overriden the location by
    // dragging it elsewhere, this location will be used
    // valid values are "left", "right", "bottom",
    // and "center" (which is the default)
    return 'right';
  }

  getAllowedLocations() {
    // the locations into which the item can be moved.
    return ['left', 'right', 'bottom'];
  }

}
