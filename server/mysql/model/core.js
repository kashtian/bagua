import Sequelize from 'sequelize';
import sequelize from '../instance';

export default class Core {
    constructor(name, attrs, options) {
        this.table = sequelize.define(name, attrs, Object.assign({
            timestamps: false,
            freezeTableName: true
        }, options))
    }

    /**
     * 增加一条数据
     * @param {object} model 
     * @param {Array} fields
     * @param {object|null} options 
     */
    insert(model, fields, options) {
        if (!this.checkFields(model, fields)) {
            return this.errorPromise('model fields not be empty.');
        }
        return this.table.create(model, options).catch(e => {
            throw e;
        })
    }

    /**
     * 删除数据
     * @param {object} options 
     */
    destroy(options) {
        return this.table.destroy(options).catch(e => {
            throw e;
        })
    }

    /**
     * 修改数据
     * @param {object} model 
     * @param {Array} fields
     * @param {object} options 
     */
    update(model, fields, options) {
        if (!this.checkFields(model, fields)) {
            return this.errorPromise('model fields not be empty.');
        }
        return this.table.update(model, options).catch(e => {
            throw e;
        })
    }

    /**
     * 查找所有符合条件的数据
     * @param {null|object} options 可选的查询条件
     */
    findAll(options) {
        return this.table.findAll(options).catch(e => {
            throw e;
        })
    }

    /**
     * 根据id查找数据
     * @param {number} id 
     * @param {null|object} options 
     */
    findById(id, options) {
        return this.table.findById(id, options).catch(e => {
            throw e;
        })
    }

    /**
     * 查找符合条件的第一条数据
     * @param {null|object} options 可选的查询条件
     */
    findOne(options) {
        return this.table.findOne(options).catch(e => {
            throw e;
        })
    } 

    /**
     * 分页查询
     * @param {number} page 
     * @param {number} pageSize 
     * @param {number} count 总条数
     * @param {null|object} options 
     */
    pagingQuery(page = 1, pageSize = 20, count, options) {
        return this.table.findAll(Object.assign({
            limit: pageSize,                        //每页多少条
            offset: pageSize * (page - 1),          //跳过多少条
        }, options)).then(result => {
            return {
                total: count,
                data: result
            }
        }).catch(e => {
            throw e;
        })
    }

    /**
     * 统计条数
     * @param {null|object} options 可选的查询条件
     */
    count(options) {
        return this.table.count(options).catch(e => {
            throw e;
        })
    }

    /**
     * 创建事务
     * @param {function} fn 要进行的操作(增删改查等)
     */
    transaction(fn) {
        return sequelize.transaction({
            isolationLevel: Sequelize.Transaction.ISOLATION_LEVELS.SERIALIZABLE
        }, fn).catch(e => {
            throw e;
        })
    }

    /**
     * 用于处理失败的promise
     * @param {string} err 
     */
    errorPromise(err) {
        return new Promise((resolve, reject) => {
            reject(err);
        })
    }

    /**
     * 检查数据是否符合要求
     * @param {object} model 
     * @param {Array} fields 
     */
    checkFields(model, fields) {
        if (!model || !fields) {
            return false;
        }
        let key = '';

        for (let i = 0, len = fields.length; i < len; i++) {
            key = fields[i];
            if (!model[key]) {
                return false;
            }
        }
        return true;
    }

}