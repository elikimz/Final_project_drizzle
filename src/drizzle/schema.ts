import { pgTable, serial, text, varchar, integer, primaryKey,decimal,boolean,timestamp,date} from "drizzle-orm/pg-core";
import { relations } from "drizzle-orm";
// Users Table
export const UsersTable = pgTable("users", {
    user_id: serial("user_id").primaryKey(),
    full_name: text("full_name"),
    email: varchar("email", { length: 255 }).unique(),
    contact_phone: varchar("contact_phone", { length: 20 }),
    address: text("address"),
    role: varchar("role", { length: 10 }).default("user"),
    created_at: timestamp("created_at").defaultNow(),
    updated_at: timestamp("updated_at").defaultNow(),
});

export const usersRelations = relations(UsersTable, ({ many }) => ({
    bookings: many(BookingsTable),
    customer_support_tickets: many(CustomerSupportTicketsTable),
}));

// Vehicle Specifications Table
export const VehicleSpecificationsTable = pgTable("vehicle_specifications", {
    vehicleSpec_id: serial("vehicle_id").primaryKey(),
    manufacturer: varchar("manufacturer", { length: 255 }),
    model: varchar("model", { length: 255 }),
    year: integer("year"),
    fuel_type: varchar("fuel_type", { length: 50 }),
    engine_capacity: varchar("engine_capacity", { length: 50 }),
    transmission: varchar("transmission", { length: 50 }),
    seating_capacity: integer("seating_capacity"),
    color: varchar("color", { length: 50 }),
    features: text("features"),
});

export const vehicleSpecificationsRelations = relations(VehicleSpecificationsTable, ({ many }) => ({
    vehicles: many(VehiclesTable),
    bookings: many(BookingsTable),
    fleetManagement: many(FleetManagementTable),
}));

// Vehicles Table
export const VehiclesTable = pgTable("vehicles", {
    vehicle_id: serial("vehicle_id").primaryKey(),
    vehicleSpec_id: integer("vehicleSpec_id").notNull().references(() => VehicleSpecificationsTable.vehicleSpec_id),
    rental_rate: decimal("rental_rate", { precision: 10, scale: 2 }),
    availability: boolean("availability").default(true),
    created_at: timestamp("created_at").defaultNow(),
    updated_at: timestamp("updated_at").defaultNow(),
});

export const vehiclesRelations = relations(VehiclesTable, ({ one }) => ({
    vehicleSpecifications: one(VehicleSpecificationsTable, {
        fields: [VehiclesTable.vehicle_id],
        references: [VehicleSpecificationsTable.vehicleSpec_id],
    }),
}));

// Locations Table
export const LocationsTable = pgTable("locations", {
    location_id: serial("location_id").primaryKey(),
    name: varchar("name", { length: 255 }),
    address: text("address"),
    contact_phone: varchar("contact_phone", { length: 20 }),
    created_at: timestamp("created_at").defaultNow(),
    updated_at: timestamp("updated_at").defaultNow(),
});

// Bookings Table
export const BookingsTable = pgTable("bookings", {
    booking_id: serial("booking_id").primaryKey(),
    user_id: integer("user_id").notNull().references(() => UsersTable.user_id),
    vehicle_id: integer("vehicle_id").notNull().references(() => VehiclesTable.vehicle_id),
    location_id: integer("location_id").notNull().references(() => LocationsTable.location_id),
    booking_date: date("booking_date"),
    return_date: date("return_date"),
    total_amount: decimal("total_amount", { precision: 10, scale: 2 }),
    booking_status: varchar("booking_status", { length: 50 }).default("Pending"),
    created_at: timestamp("created_at").defaultNow(),
    updated_at: timestamp("updated_at").defaultNow(),
});

export const bookingsRelations = relations(BookingsTable, ({ one }) => ({
    user: one(UsersTable, {
        fields: [BookingsTable.user_id],
        references: [UsersTable.user_id],
    }),
    vehicle: one(VehiclesTable, {
        fields: [BookingsTable.vehicle_id],
        references: [VehiclesTable.vehicle_id],
    }),
    location: one(LocationsTable, {
        fields: [BookingsTable.location_id],
        references: [LocationsTable.location_id],
    }),
    payments: one(PaymentsTable, {
        fields: [BookingsTable.booking_id],
        references: [PaymentsTable.booking_id],
    }),
}));

// Payments Table
export const PaymentsTable = pgTable("payments", {
    payment_id: serial("payment_id").primaryKey(),
    booking_id: integer("booking_id").references(() => BookingsTable.booking_id),
    amount: decimal("amount", { precision: 10, scale: 2 }),
    payment_status: varchar("payment_status", { length: 50 }).default("Pending"),
    payment_date: timestamp("payment_date").defaultNow(),
    payment_method: varchar("payment_method", { length: 50 }),
    transaction_id: varchar("transaction_id", { length: 255 }),
    created_at: timestamp("created_at").defaultNow(),
    updated_at: timestamp("updated_at").defaultNow(),
});

export const paymentsRelations = relations(PaymentsTable, ({ one }) => ({
    booking: one(BookingsTable, {
        fields: [PaymentsTable.booking_id],
        references: [BookingsTable.booking_id],
    }),
}));

// Customer Support Tickets Table
export const CustomerSupportTicketsTable = pgTable("customer_support_tickets", {
    ticket_id: serial("ticket_id").primaryKey(),
    user_id: integer("user_id").notNull().references(() => UsersTable.user_id),
    subject: varchar("subject", { length: 255 }),
    description: text("description"),
    status: varchar("status", { length: 50 }),
    created_at: timestamp("created_at").defaultNow(),
    updated_at: timestamp("updated_at").defaultNow(),
});

export const customerSupportTicketsRelations = relations(CustomerSupportTicketsTable, ({ one }) => ({
    user: one(UsersTable, {
        fields: [CustomerSupportTicketsTable.user_id],
        references: [UsersTable.user_id],
    }),
}));

// Fleet Management Table
export const FleetManagementTable = pgTable("fleet_management", {
    fleet_id: serial("fleet_id").primaryKey(),
    vehicle_id: integer("vehicle_id").notNull().references(() => VehiclesTable.vehicle_id),
    acquisition_date: date("acquisition_date"),
    depreciation_rate: decimal("depreciation_rate", { precision: 5, scale: 2 }),
    current_value: decimal("current_value", { precision: 10, scale: 2 }),
    maintenance_cost: decimal("maintenance_cost", { precision: 10, scale: 2 }),
    status: varchar("status", { length: 50 }),
    created_at: timestamp("created_at").defaultNow(),
    updated_at: timestamp("updated_at").defaultNow(),
});

export const fleetManagementRelations = relations(FleetManagementTable, ({ one }) => ({
    vehicle: one(VehiclesTable, {
        fields: [FleetManagementTable.vehicle_id],
        references: [VehiclesTable.vehicle_id],
    }),
}));

// Authentication Table
export const AuthenticationTable = pgTable("authentication", {
    auth_id: serial("auth_id").primaryKey(),
    user_id: integer("user_id").notNull().references(() => UsersTable.user_id),
    password: varchar("password"),
    created_at: timestamp("created_at").defaultNow(),
    updated_at: timestamp("updated_at").defaultNow(),
});

export const authenticationRelations = relations(AuthenticationTable, ({ one }) => ({
    user: one(UsersTable, {
        fields: [AuthenticationTable.user_id],
        references: [UsersTable.user_id],
    }),
}));

export type TIUser = typeof UsersTable.$inferInsert;
export type TSUser = typeof UsersTable.$inferSelect;

export type TIVehicleSpecifications = typeof VehicleSpecificationsTable.$inferInsert;
export type TSVehicleSpecifications = typeof VehicleSpecificationsTable.$inferSelect;

export type TIVehicles = typeof VehiclesTable.$inferInsert;
export type TSVehicles = typeof VehiclesTable.$inferSelect;

export type TILocations = typeof LocationsTable.$inferInsert;
export type TSLocations = typeof LocationsTable.$inferSelect;

export type TIBookings = typeof BookingsTable.$inferInsert;
export type TSBookings = typeof BookingsTable.$inferSelect;

export type TIPayments = typeof PaymentsTable.$inferInsert;
export type TSPayments = typeof PaymentsTable.$inferSelect;

export type TICustomerSupportTickets = typeof CustomerSupportTicketsTable.$inferInsert;
export type TSCustomerSupportTickets = typeof CustomerSupportTicketsTable.$inferSelect;

export type TIFleetManagement = typeof FleetManagementTable.$inferInsert;
export type TSFleetManagement = typeof FleetManagementTable.$inferSelect;


export type TIAuthentication = typeof AuthenticationTable.$inferInsert;
export type TSAuthentication = typeof AuthenticationTable.$inferSelect;





