<?php

namespace App\Traits\Base;

use App\Interfaces\ThirdPartyInterface;
use App\Models\Settings\ThirdPartySettings;
use Illuminate\Support\Arr;
use Illuminate\Support\Facades\Config;
use Stancl\Tenancy\Contracts\Tenant;

trait ManagesTenancyMailer
{


    protected function setMailConfigDefaults(): void
    {
        Config::set('mail', default_mail_config());
        Config::set('services', default_services_config());
    }

    protected function setMailConfigForTenant(Tenant $tenant): void
    {
        $mailerSetting = app(ThirdPartySettings::class)->mailer;
        if (is_null($mailerSetting)) {
            return;
        }

        switch (Arr::get($mailerSetting, 'mailer')) {
            case ThirdPartyInterface::MAILER_MAILGUN:
                $this->setMailgunMailerForTenant($tenant, $mailerSetting);
                break;
            case ThirdPartyInterface::MAILER_SES:
                $this->setSesMailerForTenant($tenant, $mailerSetting);
                break;
            case ThirdPartyInterface::MAILER_SMTP:
                $this->setSmtpMailerForTenant($tenant, $mailerSetting);
                break;
        }
    }

    protected function setMailgunMailerForTenant(Tenant $tenant, array $mailerSetting): void
    {
        $this->mergeMailConfig([
            'mailers' => [
                'transport' => ThirdPartyInterface::MAILER_MAILGUN,
            ],
            'from' => [
                'address' => Arr::get($mailerSetting, ThirdPartyInterface::MAILER_CONFIG_FROM_ADDRESS),
                'name' => Arr::get($mailerSetting, ThirdPartyInterface::MAILER_CONFIG_FROM_NAME),
            ]
        ]);
        $this->mergeServicesConfig([
            'mailgun' => [
                'domain' => Arr::get($mailerSetting, ThirdPartyInterface::MAILER_CONFIG_SERVICE_DOMAIN),
                'secret' => Arr::get($mailerSetting, ThirdPartyInterface::MAILER_CONFIG_SERVICE_SECRET),
                'endpoint' => Arr::get($mailerSetting, ThirdPartyInterface::MAILER_CONFIG_SERVICE_ENDPOINT),
            ]
        ]);
    }

    protected function setSesMailerForTenant(Tenant $tenant, array $mailerSetting): void
    {
        $this->mergeMailConfig([
            'mailers' => [
                'transport' => ThirdPartyInterface::MAILER_SES,
            ],
            'from' => [
                'address' => Arr::get($mailerSetting, ThirdPartyInterface::MAILER_CONFIG_FROM_ADDRESS),
                'name' => Arr::get($mailerSetting, ThirdPartyInterface::MAILER_CONFIG_FROM_NAME),
            ]
        ]);
        $this->mergeServicesConfig([
            'ses' => [
                'key' => Arr::get($mailerSetting, ThirdPartyInterface::MAILER_CONFIG_SERVICE_KEY),
                'secret' => Arr::get($mailerSetting, ThirdPartyInterface::MAILER_CONFIG_SERVICE_SECRET),
                'region' => Arr::get($mailerSetting, ThirdPartyInterface::MAILER_CONFIG_SERVICE_REGION),
            ]
        ]);
    }

    protected function setSmtpMailerForTenant(Tenant $tenant, array $mailerSetting): void
    {
        $this->mergeMailConfig([
            'mailers' => [
                'transport' => ThirdPartyInterface::MAILER_SMTP,
                'host' => Arr::get($mailerSetting, ThirdPartyInterface::MAILER_CONFIG_HOST),
                'port' => Arr::get($mailerSetting, ThirdPartyInterface::MAILER_CONFIG_PORT),
                'encryption' => Arr::get($mailerSetting, ThirdPartyInterface::MAILER_CONFIG_ENCRYPTION),
                'username' => Arr::get($mailerSetting, ThirdPartyInterface::MAILER_CONFIG_USERNAME),
                'password' => Arr::get($mailerSetting, ThirdPartyInterface::MAILER_CONFIG_PASSWORD),
                'timeout' => is_numeric(Arr::get($mailerSetting, ThirdPartyInterface::MAILER_CONFIG_TIMEOUT)) ? Arr::get($mailerSetting, ThirdPartyInterface::MAILER_CONFIG_TIMEOUT) : null,
            ],
            'from' => [
                'address' => Arr::get($mailerSetting, ThirdPartyInterface::MAILER_CONFIG_FROM_ADDRESS),
                'name' => Arr::get($mailerSetting, ThirdPartyInterface::MAILER_CONFIG_FROM_NAME),
            ]
        ]);
    }

    protected function mergeMailConfig(array $config): void
    {
        Config::set(
            'mail',
            array_merge_recursive(
                Config::get('mail'),
                $config
            )
        );
    }

    protected function mergeServicesConfig(array $config): void
    {
        Config::set(
            'services',
            array_merge_recursive(
                Config::get('services'),
                $config
            )
        );
    }
}
