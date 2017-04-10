import {yao} from '../model';

export default {
    addYao(model) {
        return yao.add(model).then(() => {
            console.log('add gua successfully.');
        })
    },

    deleteYaoById(id) {
        return yao.deleteById(id);
    }
}