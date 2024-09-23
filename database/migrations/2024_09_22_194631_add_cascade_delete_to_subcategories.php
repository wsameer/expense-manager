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
    Schema::table('expense_subcategories', function (Blueprint $table) {
      $table->dropForeign(['expense_category_id']);
      $table->foreign('expense_category_id')
        ->references('id')
        ->on('expense_categories')
        ->onDelete('cascade');
    });
  }

  /**
   * Reverse the migrations.
   */
  public function down(): void
  {
    Schema::table('expense_subcategories', function (Blueprint $table) {
      $table->dropForeign(['expense_category_id']);
      $table->foreign('expense_category_id')
        ->references('id')
        ->on('expense_categories');
    });
  }
};
