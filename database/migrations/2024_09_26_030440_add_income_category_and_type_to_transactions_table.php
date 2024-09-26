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
    Schema::table('transactions', function (Blueprint $table) {
      $table->unsignedBigInteger('income_category_id')->nullable()->after('expense_category_id');
      $table->enum('type', ['income', 'expense'])->after('description');
      $table->foreign('income_category_id')->references('id')->on('income_categories')->onDelete('set null');
    });
  }

  /**
   * Reverse the migrations.
   */
  public function down(): void
  {
    Schema::table('transactions', function (Blueprint $table) {
      $table->dropForeign(['income_category_id']);
      $table->dropColumn('income_category_id');
      $table->dropColumn('type');
    });
  }
};
