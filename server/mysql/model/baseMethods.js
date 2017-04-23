export default {
    /**
     * 分页查询
     * @param {number} page 
     * @param {number} pageSize 
     * @param {*} options 
     */
    pagingQuery(page = 1, pageSize = 20, options) {
        return this.findAndCountAll(Object.assign({
            offset: (page - 1) * pageSize,
            limit: pageSize
        }, options)).then(result => {
            return {
                total: result.count,
                data: result.rows
            }
        });
    },

    /**
     * 检查数据是否符合要求
     * @param {object} mInstance 
     * @param {Array} fields 
     */
    checkFields(mInstance, fields) {
        return new Promise((resolve, reject) => {            
            if (!mInstance || !fields) {
                reject({msg: '参数不能为空'});
            }
            let key = '';

            for (let i = 0, len = fields.length; i < len; i++) {
                key = fields[i];
                if (!mInstance[key]) {
                    reject({msg: '数据不符合要求'});
                }
            }
            resolve();
        });
    }
}