import Sequelize from 'sequelize';
import {Gua, Yao} from '../model';

let fields = ['name', 'desc', 'xiang', 'elements'];

export default {
    addGua(model) {
        return Gua.checkFields(model, fields)
            .then(() => {
                return Gua.create(model);
            });
    },

    deleteGuaById(id) {
        return Gua.destroy({
            where: {id: id}
        });
    },

    findByIdWithYao(id, options) {
        return Gua.findById(id, Object.assign({
            include: [{
                model: Yao,
                attributes: {exclude: ['id', 'guaId']}
            }],
            attributes: {exclude: ['id']}
        }, options))
    }
}