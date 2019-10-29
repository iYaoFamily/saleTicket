'use strict'

/**
 * @param {Egg.Application} app - egg application
 */
module.exports = app => {
  const { router, controller } = app
  // router.get('/', controller.controllerCRUD.selectAll);
  router.get('/site=:site', controller.controllerCRUD.updateDate)
}
