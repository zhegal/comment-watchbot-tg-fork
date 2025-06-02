export default class AdminGuard {
    static async isAdmin(ctx) {
        const msg = ctx?.update?.message;
        let admins = await ctx.getChatAdministrators();
        admins = admins.map(admin => admin.user.id);
        return admins.includes(msg?.from?.id);
    }
}