'use strict';

/**
 * best-stuff service.
 */

const { createCoreService } = require('@strapi/strapi').factories;

module.exports = createCoreService('api::best-stuff.best-stuff');
