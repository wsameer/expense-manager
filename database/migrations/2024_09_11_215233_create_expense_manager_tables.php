<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
  /**
   * Run the migrations.
   */
  public function up(): void
  {
    Schema::create('expense_categories', function (Blueprint $table) {
      $table->id();
      $table->foreignId('user_id')->constrained()->onDelete('cascade');
      $table->string('name');
      $table->boolean('is_default')->default(false);
      $table->timestamps();
    });

    Schema::create('expense_subcategories', function (Blueprint $table) {
      $table->id();
      $table->foreignId('expense_category_id')->constrained()->onDelete('cascade');
      $table->string('name');
      $table->timestamps();
    });

    Schema::create('transactions', function (Blueprint $table) {
      $table->id();
      $table->foreignId('user_id')->constrained()->onDelete('cascade');
      $table->foreignId('expense_category_id')->constrained()->onDelete('cascade');
      $table->foreignId('account_id')->constrained()->onDelete('cascade');
      $table->decimal('amount', 10, 2);
      $table->date('transaction_date');
      $table->text('description')->nullable();
      $table->timestamps();
    });
  }

  /**
   * Reverse the migrations.
   */
  public function down(): void
  {
    Schema::dropIfExists('transactions');
    Schema::dropIfExists('expense_subcategories');
    Schema::dropIfExists('expense_categories');
  }
};
