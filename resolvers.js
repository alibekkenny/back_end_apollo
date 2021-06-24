const resolvers = {
    Query: {
        users: async (parent, args, context, info) => {
            const users = await context.prisma.user.findMany({
                include: {
                    posts: true,
                }
            });
            console.log(users);
            return users;
        },
        user: async (parent, args, context, info) => {
            const user = await context.prisma.user.findUnique({
                where: {
                    id: args.id
                },
                include: {
                    posts: true,
                }
            });
            return user;
        },
        posts: async (parent, args, context, info) => {
            const posts = await context.prisma.post.findMany();
            return posts;
        },
        post: async (parent, args, context, info) => {
            const post = await context.prisma.post.findUnique({
                where: {
                    id: args.id
                },
            });
            return post;
        }
    },
    Mutation: {
        createUser: async (parent, args, context, info) => {
            try {
                const user = await context.prisma.user.create({
                    data: args.input,
                })
                return user;
            } catch (e) {
                console.log(e);
                return null;
            }
        },
        updateUser: async (parent, args, context, info) => {
            try {
                const user = await context.prisma.user.update({
                    where: {
                        id: args.id
                    },
                    data: args.input,
                });
                return user;
            } catch (e) {
                console.log(e);
                return null;
            }
        },
        deleteUser: async (parent, args, context, info) => {
            try {
                const posts = await context.prisma.post.deleteMany({
                    where: {
                        authorId: args.id
                    }
                });
                const user = await context.prisma.user.delete({
                    where: {
                        id: args.id
                    },
                });
                return user;
            }
            catch (e) {
                console.log(e);
                return null;
            }
        },
        createPost: async (parent, args, context, info) => {
            try {
                const post = await context.prisma.post.create({
                    data: args.input,
                });
                return post;
            }
            catch (e) {
                console.log(e);
                return null;
            }
        },
        updatePost: async (parent, args, context, info) => {
            try {
                const post = await context.prisma.post.update({
                    where: {
                        id: args.id
                    },
                    data: args.input
                });
                return post;
            }
            catch (e) {
                console.log(e);
                return null;
            }
        },
        deletePost: async (parent, args, context, info) => {
            try {
                const post = await context.prisma.post.delete({
                    where: {
                        id: args.id
                    }
                });
                return post;
            }
            catch (e) {
                console.log(e);
                return null;
            }
        }
    }
}

exports.resolvers = resolvers