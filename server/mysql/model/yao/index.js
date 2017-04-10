import Core from '../core';
import tableFields from './table.config';

class Yao extends Core {
    constructor() {
        super('yao', tableFields, {
            tableName: 'yao'
        })
        this.fields = ['name', 'desc', 'xiang', 'guaId'];
    }

    add(model, options) {
        return this.insert(model, this.fields, options);
    }

    updateById(model, id) {
        return this.update(model, this.fields, {
            where: {
                id: id
            }
        })
    }

    deleteById(id) {
        return this.destroy({
            where: {id: id}
        })
    }
}

export default new Yao();
