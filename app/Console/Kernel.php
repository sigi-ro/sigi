<?php

namespace App\Console;

use App\Console\Commands\EDU\Course\ProcessCoursePurchasePaymentsDue;
use App\Models\Tenant;
use Illuminate\Console\Scheduling\Schedule;
use Illuminate\Foundation\Console\Kernel as ConsoleKernel;

class Kernel extends ConsoleKernel
{
    /**
     * The Artisan commands provided by your application.
     *
     * @var array
     */
    protected $commands = [
        //
    ];

    /**
     * Define the application's command schedule.
     *
     * @param  \Illuminate\Console\Scheduling\Schedule  $schedule
     * @return void
     */
    protected function schedule(Schedule $schedule)
    {
        // Tenant commands
        Tenant::all()->each(function (Tenant $tenant) use ($schedule) {
            $schedule->command(
                ProcessCoursePurchasePaymentsDue::class,
                [$tenant->id]
            )->dailyAt('05:00');
        });
    }

    /**
     * Register the commands for the application.
     *
     * @return void
     */
    protected function commands()
    {
        $this->load(__DIR__.'/Commands');

        require base_path('routes/console.php');
    }
}
