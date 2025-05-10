export class Operation {
    constructor({
        id = null,
        name = '',
        amount = 0,
        createdAt = ''
    } = {}) {
        this.id = id;
        this.name = name;
        this.amount = amount;
        this.createdAt = createdAt;
    }
}