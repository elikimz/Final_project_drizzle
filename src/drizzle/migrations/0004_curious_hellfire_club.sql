ALTER TABLE "authentication" ADD COLUMN "role" "role" DEFAULT 'user';--> statement-breakpoint
ALTER TABLE "users" DROP COLUMN IF EXISTS "role";