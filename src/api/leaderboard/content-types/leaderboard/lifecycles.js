module.exports = {
  async afterCreate(event) {
    const { result } = event;

    try {
      // await strapi.plugins["email"].services.email.send({
      //   to: "ssteven075@gmail.com",
      //   subject: "you created a new leaderboard",
      //   text: `${result.wpm} wpm`,
      // });
      // console.log(event);
    } catch (err) {
      console.log(err);
    }
  },
  async afterDelete(event) {
    const { result } = event;

    console.log(result);
  },
};
