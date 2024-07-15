ALTER TABLE "authentication" DROP CONSTRAINT "authentication_email_unique";--> statement-breakpoint
ALTER TABLE "authentication" DROP COLUMN IF EXISTS "full_name";--> statement-breakpoint
ALTER TABLE "authentication" DROP COLUMN IF EXISTS "email";--> statement-breakpoint
ALTER TABLE "authentication" DROP COLUMN IF EXISTS "contact_phone";--> statement-breakpoint
ALTER TABLE "authentication" DROP COLUMN IF EXISTS "address";--> statement-breakpoint
ALTER TABLE "authentication" DROP COLUMN IF EXISTS "role";