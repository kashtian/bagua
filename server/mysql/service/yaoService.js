import {Yao} from '../model';

let fields = ['name', 'desc', 'xiang', 'guaId'];

export default {
    addYao(model) {
        return Yao.checkFields(model, fields)
                .then(() => {
                    return Yao.create(model);
                });
    },

    deleteYaoById(id) {
        return Yao.destroy({
            where: {id: id}
        });
    }
}