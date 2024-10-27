# Makefile

# Wipe user's data
wipe-user:
	php artisan user:wipe ${userId}

# Migrate the database
migrate:
	php artisan migrate

# Seed the database
seed:
	php artisan db:seed
