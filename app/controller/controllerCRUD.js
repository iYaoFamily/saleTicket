'use strict';

const Controller = require('egg').Controller;

class ControllerCRUDController extends Controller {
  // async selectAll() {
  //   await this.service.serviceAll.selectAll();
  // }

  async updateDate() {
    await this.service.serviceAll.updateDate();
  }
}

module.exports = ControllerCRUDController;
