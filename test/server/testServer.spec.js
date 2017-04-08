import should from 'should';
import '../../server/mongoose/connectDB';
import personCtrl from  '../../server/mongoose/personCtrl';

describe('test mongoose', function() {
    describe('person find', function() {
        it('should return array', function() {
            return personCtrl.find();
        })
    })
})