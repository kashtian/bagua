import Person from './person';

let test = new Person({name: 'test_person'});

export default {
    find() {
        return Person.find((err, p) => {
            if (err) {
                return console.error(err);
            }
            console.log('person document: ', p);
        });
    },

    save() {
        return test.save().then(doc => {
            console.log('save person:  ', doc);
        }, err => {
            console.log(err);
        });
    }
}