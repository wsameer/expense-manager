# Use the official PHP image with extensions for Laravel
FROM php:8.2-fpm

# Install system dependencies
RUN apt-get update && apt-get install -y \
  libpng-dev \
  libonig-dev \
  libxml2-dev \
  libsqlite3-dev \
  zip \
  unzip \
  git \
  curl \
  sqlite3

# Clear cache
RUN apt-get clean && rm -rf /var/lib/apt/lists/*

# Install PHP extensions
RUN docker-php-ext-install pdo pdo_sqlite mbstring exif pcntl bcmath gd

# Get latest Composer
COPY --from=composer:latest /usr/bin/composer /usr/bin/composer

# Set working directory
WORKDIR /var/www

# Copy existing application directory contents
COPY . .

# Copy .env.example to .env
RUN cp .env.example .env

# Install dependencies
RUN composer install --no-dev --optimize-autoloader

# Generate key
RUN php artisan key:generate

# Cache optimizations
RUN php artisan config:cache
RUN php artisan route:cache
RUN php artisan view:cache

# Create persistent data directory and SQLite database
RUN mkdir -p /opt/render/project/data
RUN touch /opt/render/project/data/database.sqlite
RUN chmod -R 777 /opt/render/project/data

# Create directory where logs are written
RUN mkdir -p /opt/render/project/data/logs

# Set permissions
RUN chown -R www-data:www-data /var/www/storage
RUN chmod -R 775 /var/www/storage

# Expose port 8000 and start PHP server
EXPOSE 8000
CMD ["php", "artisan", "serve", "--host=0.0.0.0", "--port=8000"]