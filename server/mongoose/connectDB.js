import mongoose from 'mongoose';
import { dbHostMongo } from '../../config/sys.config';

let db = mongoose.connect(dbHostMongo);

db.connection.on('error', err => {
    console.error('数据库连接失败：', err);
});

db.connection.on('disconnected', () => {
    console.error('数据库已关闭');
});

db.connection.on('open', () => {
    console.log('数据库连接成功');
});
