export const authOptions = {
  providers: [],
  pages: {
    signIn: "/auth/signin",
    error: "/auth/error",
  },
  callbacks: {
    authorized({ request }: { request: any }) {
      return !!request.auth
    },
  },
}
