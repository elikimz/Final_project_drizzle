ALTER TABLE "authentication" ADD COLUMN "email" varchar(255);--> statement-breakpoint
ALTER TABLE "authentication" ADD CONSTRAINT "authentication_email_unique" UNIQUE("email");