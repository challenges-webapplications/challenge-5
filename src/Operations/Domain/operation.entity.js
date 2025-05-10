export class Operation {
    constructor({
        id = null,
        title = '',
        operationType = '',
        date = ''
    } = {}) {
        this.id = id;
        this.title = title;
        this.operationType = operationType;
        this.date = date;
    }
}