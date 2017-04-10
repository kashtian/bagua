import should from 'should';
import {guaService, yaoService} from '../../server/mysql/service';

describe('Mysql', () => {
    describe('connection', () => {
        it('get success log', () => {

        });
    });

    // describe('add yao', () => {
    //     it ('add success', () => {
    //         return yaoService.addYao({
    //             name: '九二',
    //             desc: '见龙在田，利见大人',
    //             dExplain: '九二，龙已出现在地上，利于出现德高势隆的大人物。',
    //             xiang: '《象》曰："见龙在田"，德施普也。',
    //             xExplain: '《象辞》说："龙已出现在地上"，犹如阳光普照，天下人普遍得到恩惠。',
    //             guaId: 1
    //         })
    //     })
    // })

    describe('find gua with yao', () => {
        it ('find success', () => {
            return guaService.findByIdWithYao(1).then(data => {
                console.log('data: ', data.get({
                    plain: true
                }));
            });
        })
    })
})