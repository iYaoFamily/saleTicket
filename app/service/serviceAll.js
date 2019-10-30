'use strict';
const Service = require('egg').Service;

class ServiceAllService extends Service {
  async updateDate() {
    const { site } = this.ctx.params;
    const transaction = await this.ctx.model.transaction();
    const sel = 'select * from sale';
    const update = `update sale set num=num-1 where num>=0 and site=${site}`;
    const insert = `insert into orders (site_id) select site from sale where num>=0 and site=${site}`;
    try {
      const [ res = [] ] = await this.ctx.model.query(sel, { transaction });
      this.ctx.body = {
        msg: '所有的票务信息',
        data: res,
      };
      await this.app.mysql.query(update, { transaction, lock: transaction.LOCK.UPDATE });
      await this.app.mysql.query(insert, { transaction });
      if (res[0].num === -1) {
        this.ctx.body = {
          msg: '暂无余票~~~',
        };
        return;
      }
      transaction.commit();
    } catch (err) {
      await transaction.rollback();
      throw err;
    }
  }
}
module.exports = ServiceAllService;
