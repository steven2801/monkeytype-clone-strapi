"use strict";

module.exports = {
  /**
   * An asynchronous register function that runs before
   * your application is initialized.
   *
   * This gives you an opportunity to extend code.
   */
  register({ strapi }) {
    const extensionService = strapi.plugin("graphql").service("extension");

    extensionService.use({
      resolversConfig: {
        "Mutation.createLeaderboard": {
          policies: [
            async (context) => {
              // taken from http headers
              const loggedInUserId = context.state.user.id;
              // taken from query variables
              const targetedUserId = context.args.data.user;

              const timeList = [15, 30, 45, 60, 120];
              const time = context.args.data.time;

              return (
                loggedInUserId == targetedUserId && timeList.includes(time)
              );
            },
          ],
        },
      },
    });
  },

  /**
   * An asynchronous bootstrap function that runs before
   * your application gets started.
   *
   * This gives you an opportunity to set up your data model,
   * run jobs, or perform some special logic.
   */
  // bootstrap(/*{ strapi }*/) {},
};
