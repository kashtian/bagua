import Core from '../core';
import tableFields from './table.config';
import yao from '../yao';

class Gua extends Core {
    constructor() {
        super('gua', tableFields, {
            tableName: 'gua64'
        });

        this.fields = ['name', 'desc', 'xiang', 'elements'];
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

const gua = new Gua();
gua.table.hasMany(yao.table);

export default gua;
