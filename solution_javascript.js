const events = {
  ADD: 0,
  SUBTRACT: 1,
  MULTIPLY: 2,
  DIVIDE: 3,
};

class EventSourcer {
  constructor() {
    this.value = 0;
    this.historyStack = [];
    this.futureStack = [];
  }

  add(num) {
    this.value += num;
    this.historyStack.push({ event: events.ADD, value: num });
    return this.value;
  }

  subtract(num) {
    this.value -= num;
    this.historyStack.push({ event: events.SUBTRACT, value: num });
    return this.value;
  }

  multiply(num) {
    this.value *= num;
    this.historyStack.push({ event: events.MULTIPLY, value: num });
    return this.value;
  }

  divide(num) {
    this.value /= num;
    this.historyStack.push({ event: events.DIVIDE, value: num });
    return this.value;
  }

  undo() {
    if (!this.historyStack.length) {
      return this.value;
    }

    const operation = this.historyStack.pop();
    this.futureStack.push(operation);

    switch (operation.event) {
      case events.ADD:
        this.value -= operation.value;
        break;
      case events.SUBTRACT:
        this.value += operation.value;
        break;
      case events.MULTIPLY:
        this.value /= operation.value;
        break;
      case events.DIVIDE:
        this.value *= operation.value;
        break;
    }

    return this.value;
  }

  redo() {
    if (!this.futureStack.length) {
      return this.value;
    }

    const operation = this.futureStack.pop();
    this.historyStack.push(operation);

    switch (operation.event) {
      case events.ADD:
        this.value += operation.value;
        break;
      case events.SUBTRACT:
        this.value -= operation.value;
        break;
      case events.MULTIPLY:
        this.value *= operation.value;
        break;
      case events.DIVIDE:
        this.value /= operation.value;
        break;
    }

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
