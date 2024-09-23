<?php

use App\Listeners\CreateDefaultExpenseCategories;
use Illuminate\Auth\Events\Registered;
use Illuminate\Auth\Listeners\SendEmailVerificationNotification;
use Illuminate\Support\ServiceProvider;

class EventServiceProvider extends ServiceProvider
{
  protected $listen = [
    Registered::class => [
      SendEmailVerificationNotification::class,
      CreateDefaultExpenseCategories::class
    ]
  ];
}
