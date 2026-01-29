<?php

use Spatie\LaravelSettings\Migrations\SettingsMigration;

class CreateWebhookSettings extends SettingsMigration
{
    public function up(): void
    {
        $this->migrator->add('webhooks.endpoints', []);
        $this->migrator->add('webhooks.enabled', true);
        $this->migrator->add('webhooks.retry_attempts', 3);
        $this->migrator->add('webhooks.timeout_seconds', 30);
    }

    public function down(): void
    {
        $this->migrator->delete('webhooks.endpoints');
        $this->migrator->delete('webhooks.enabled');
        $this->migrator->delete('webhooks.retry_attempts');
        $this->migrator->delete('webhooks.timeout_seconds');
    }
}
