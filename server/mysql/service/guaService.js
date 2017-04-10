import Sequelize from 'sequelize';
import {gua, yao} from '../model';

export default {
    addGua(model) {
        return gua.add(model).then(() => {
            console.log('add gua successfully.');
        })
    },

    deleteGuaById(id) {
        return gua.deleteById(id);
    },

    findByIdWithYao(id, options) {
        return gua.findById(id, Object.assign({
            include: [{
                model: yao.table,
                attributes: ['name', 'desc', 'dExplain', 'xiang', 'xExplain']
            }],
            attributes: ['name', 'desc', 'dExplain', 'xiang', 'xExplain', 'elements']
        }, options))
    }
}