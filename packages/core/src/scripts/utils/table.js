export default class Table {
  constructor(editor) {
    this.editor = editor;
    const focusKey = editor.value.selection.focus.key;
    this.table = editor.value.document.nodes
      .filter(node => node.type === 'table')
      .find(node => node.hasDescendant(focusKey));
    if (this.table) {
      this.tbody = this.table.nodes.first();
      this.trs = this.tbody.nodes;
      this.focusTr = this.trs.find(tr => tr.hasDescendant(focusKey));
      this.focusTrIndex = this.trs.findIndex(tr => tr.hasDescendant(focusKey));
      this.focusTdIndex = this.focusTr.nodes.findIndex(td =>
        td.hasDescendant(focusKey)
      );
    }
  }

  removeFocusColumn() {
    this.trs.forEach(tr => {
      this.editor.removeNodeByKey(tr.nodes.get(this.focusTdIndex).key);
    });
  }

  insertColumn(direction = 'right') {
    this.trs.forEach(tr => {
      const td = tr.nodes.get(this.focusTdIndex);
      this.editor.moveToRangeOfNode(td);
      if (direction === 'right') {
        this.editor.moveToEnd();
      } else {
        this.editor.moveToStart();
      }
      this.editor.insertBlock('td');
    });
  }

  removeFocusRow() {
    this.editor.removeNodeByKey(this.focusTr.key);
  }

  insertRow(direction = 'below') {
    this.editor.insertNodeByKey(
      this.tbody.key,
      this.focusTrIndex + (direction === 'below' ? 1 : 0),
      {
        object: 'block',
        type: 'tr',
        nodes: Array(this.focusTr.nodes.size).fill({
          object: 'block',
          type: 'td'
        })
      }
    );
  }

  jump() {
    this.editor
      .moveToRangeOfNode(this.table)
      .moveToEnd()
      .insertBlock('paragraph')
      .unwrapBlock()
      .unwrapBlock()
      .unwrapBlock();
  }
}
