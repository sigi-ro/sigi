<?php

namespace App\Providers;

use App\Models\CMS\Url;
use App\Models\CRM\Contact;
use App\Observers\CMS\UrlObserver;
use App\Observers\CRM\ContactObserver;
use Illuminate\Support\ServiceProvider;

class AppServiceProvider extends ServiceProvider
{
    /**
     * Register any application services.
     *
     * @return void
     */
    public function register()
    {
        //
    }

    /**
     * Bootstrap any application services.
     *
     * @return void
     */
    public function boot()
    {
        Contact::observe([
            ContactObserver::class
        ]);

        Url::observe([
            UrlObserver::class
        ]);

        // When running tests we need the migrator to be aware of the
        // additional migration folders used by this project (landlord and
        // tenant). This ensures the RefreshDatabase trait and artisan
        // migrations pick up those migrations automatically during tests.
        if ($this->app->environment('testing')) {
            $this->loadMigrationsFrom([
                database_path('migrations/landlord'),
                database_path('migrations/tenant'),
            ]);
        }
    }
}
