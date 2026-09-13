import { eq } from "drizzle-orm";
import db from "./drizzle.ts";
import passport from "passport";
import { usersTable } from "../src/db/schema.ts";
import { Strategy as JwtStrategy, type StrategyOptions } from "passport-jwt";
import { ExtractJwt } from "passport-jwt";
import { PayloadType } from "../src/types.ts";

const opts: StrategyOptions = {
  jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
  secretOrKey: process.env.JWT_SECRET_KEY as string,
};




export default passport.use(
  // eslint-disable-next-line @typescript-eslint/no-misused-promises
  new JwtStrategy(opts, async function (jwt_payload: PayloadType, done) {
    const user = await db
      .select()
      .from(usersTable)
      .where(eq(usersTable.id, jwt_payload.id));

    if (user) {
      return done(null, user);
    } else {
      return done(null, false);
      // or you could create a new account
    }
  }),
);
