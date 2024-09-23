import {sqliteTable, text, integer, uniqueIndex} from 'drizzle-orm/sqlite-core'

export const waitlist = sqliteTable('waitlist', {
    id: integer('id').primaryKey({autoIncrement: true}),
    email: text('email').notNull().unique(),
    createdAt: integer('created_at', {mode: 'timestamp'}).notNull(),
}, (table) => ({
    emailIdx: uniqueIndex('email_idx').on(table.email)
}))
