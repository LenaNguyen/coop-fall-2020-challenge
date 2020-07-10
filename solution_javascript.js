class EventSourcer {
  constructor() {
    this.value = 0;
    this.historyStack = [];
    this.futureStack = [];
  }

  add(num) {
    this.value += num;
    this.historyStack.push(num);
    return this.value;
  }

  subtract(num) {
    this.value -= num;
    this.historyStack.push(num * -1);
    return this.value;
  }

  undo() {
    if (!this.historyStack.length) {
      return this.value;
    }

    const operation = this.historyStack.pop();
    this.futureStack.push(operation);
    this.value -= operation;

    return this.value;
  }

  redo() {
    if (!this.futureStack.length) {
      return this.value;
    }

    const operation = this.futureStack.pop();
    this.historyStack.push(operation);
    this.value += operation;

    return this.value;
  }

  bulk_undo(num) {
    let numOperations =
      num > this.historyStack.length ? this.historyStack.length : num;

    for (let i = 0; i < numOperations; i++) {
      this.undo();
    }

    return this.value;
  }

  bulk_redo(num) {
    let numOperations =
      num > this.futureStack.length ? this.futureStack.length : num;

    for (let i = 0; i < numOperations; i++) {
      this.redo();
    }

    return this.value;
  }
}

// ----- Do not modify anything below this line (needed for test suite) ------
module.exports = EventSourcer;
