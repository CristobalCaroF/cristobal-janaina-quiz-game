import NextAuth from "next-auth";
import GithubProvider from "next-auth/providers/github";
import { MongoDBAdapter } from "@auth/mongodb-adapter";
import clientPromise from "@/db/mongodb";
import dbConnect from "@/db/dbConnect";
import User from "@/db/models/User";

export const authOptions = {
  providers: [
    GithubProvider({
      clientId: process.env.GITHUB_ID,
      clientSecret: process.env.GITHUB_SECRET,
    }),
  ],
  callbacks: {
    async jwt({ token, account, profile }) {
      return token;
    },
    async session({ session }) {
      await dbConnect();
      let user = await User.findOne({ gitUsername: session.user.name });
      if (user === null) {
        user = await User.create({
          gitUsername: session.user.name,
        });
      }
      return { ...session, user: { ...session.user, userId: user._id } };
    },
  },

  debug: true,
};

export default NextAuth(authOptions);
