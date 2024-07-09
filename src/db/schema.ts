import type { AdapterAccount } from "next-auth/adapters"
import { relations } from "drizzle-orm"
import { integer, pgTable, primaryKey, serial, text, timestamp } from "drizzle-orm/pg-core"

export const users = pgTable("users", {
    id: text("id").primaryKey().$defaultFn(() => crypto.randomUUID()),
    name: text("name"),
    email: text("email").notNull(),
    emailVerified: timestamp("email_verified", { mode: "date" }),
    image: text("image")
})

export const auctions = pgTable("auctions", {
    id: serial("id").primaryKey(),
    userId: text("user_id")
        .notNull()
        .references(() => users.id, { onDelete: "cascade" }),
    name: text("name").notNull(),
    pic: text("pic").notNull(),
    currentBid: integer("current_bid").notNull().default(0),
    startingPriceInCents: integer("starting_price_in_cents").notNull().default(0),
    bidInterval: integer("bid_interval").notNull().default(10),
    endDate: timestamp("end_date", { mode: "date" }).notNull()
})

export const accounts = pgTable("accounts", {
    userId: text("user_id")
        .notNull()
        .references(() => users.id, { onDelete: "cascade" }),
    type: text("type").$type<AdapterAccount>().notNull(),
    provider: text("provider").notNull(),
    providerAccountId: text("providerAccountId").notNull(),
    refresh_token: text("refresh_token"),
    access_token: text("access_token"),
    expires_at: integer("expires_at"),
    token_type: text("token_type"),
    scope: text("scope"),
    id_token: text("id_token"),
    session_state: text("session_state"),
},
(a) => ({
    compoundKey: primaryKey({
    columns: [a.provider, a.providerAccountId],
    }),
}));
  
export const sessions = pgTable("sessions", {
    sessionToken: text("session_token").primaryKey(),
    userId: text("user_id")
      .notNull()
      .references(() => users.id, { onDelete: "cascade" }),
    expires: timestamp("expires", { mode: "date" }).notNull(),
});
  
export const verificationTokens = pgTable("verification_tokens", {
    identifier: text("identifier").notNull(),
    token: text("token").notNull(),
    expires: timestamp("expires", { mode: "date" }).notNull(),
},
(vt) => ({
    compoundKey: primaryKey({ columns: [vt.identifier, vt.token] }),
}))

export const bids = pgTable("bids", {
    id: serial("id").primaryKey(),
    amount: integer("amount").notNull(),
    auctionId: serial("auction_id")
      .notNull()
      .references(() => auctions.id, { onDelete: "cascade" }),
    userId: text("user_id")
      .notNull()
      .references(() => users.id, { onDelete: "cascade" }),
    timestamp: timestamp("timestamp", { mode: "date" }).notNull(),
});

export const usersRelations = relations(bids, ({ one }) => ({
    user: one(users, {
        fields: [bids.userId],
        references: [users.id]
    })
}))

export type Auction = typeof auctions.$inferSelect
export type Auctions = Auction[]
