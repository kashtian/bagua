import should from 'should';
import '../../server/connectDB';
import personCtrl from  '../../server/controller/personCtrl';

describe('test mongoose', function() {
    describe('person find', function() {
        it('should return array', function() {
            return personCtrl.find();
        })
    })
})