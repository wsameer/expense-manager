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
    Schema::create('transactions', function (Blueprint $table) {
      $table->id();
      $table->foreignId('user_id')->constrained()->onDelete('cascade');
      $table->enum('type', ['bank_to_bank', 'expense', 'income']);
      $table->date('date');
      $table->decimal('amount', 10, 2);
      $table->foreignId('from_account_id')->constrained('accounts')->onDelete('cascade');
      $table->foreignId('to_account_id')->nullable()->constrained('accounts')->onDelete('cascade');
      $table->foreignId('expense_category_id')->nullable()->constrained()->onDelete('cascade');
      $table->foreignId('income_category_id')->nullable()->constrained()->onDelete('cascade');
      $table->text('note')->nullable();
      $table->timestamps();
    });
  }

  /**
   * Reverse the migrations.
   */
  public function down(): void
  {
    Schema::dropIfExists('transactions');
  }
};
