"use strict";

/**
 *  leaderboard controller
 */

const { createCoreController } = require("@strapi/strapi").factories;

module.exports = createCoreController(
  "api::leaderboard.leaderboard",
  ({ strapi }) => ({
    async create(ctx) {
      if (
        ctx.request &&
        ctx.request.header &&
        ctx.request.header.authorization
      ) {
        const { id } = await strapi.plugins[
          "users-permissions"
        ].services.jwt.getToken(ctx);

        const { user: userId } = ctx.params;

        if (id !== userId) {
          return ctx.badRequest("Cannot create using another user's id");
        }

        const response = await super.create(ctx);
        return response;
      }

      return ctx.badRequest(
        "An error occurred. You should provide a bearer token."
      );
    },
  })
);
