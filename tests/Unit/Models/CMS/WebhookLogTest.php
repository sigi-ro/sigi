<?php

namespace Tests\Unit\Models\CMS;

use App\Models\CMS\WebhookLog;
use PHPUnit\Framework\TestCase;

/**
 * @group unit
 * @group fast
 * @group webhooks
 */
class WebhookLogTest extends TestCase
{
    /**
     * @test
     */
    public function it_has_correct_table_name(): void
    {
        $log = new WebhookLog();

        $this->assertEquals('webhook_logs', $log->getTable());
    }

    /**
     * @test
     */
    public function it_has_correct_fillable_attributes(): void
    {
        $log = new WebhookLog();
        $fillable = $log->getFillable();

        $this->assertContains('event_type', $fillable);
        $this->assertContains('endpoint_url', $fillable);
        $this->assertContains('endpoint_name', $fillable);
        $this->assertContains('status', $fillable);
        $this->assertContains('http_status', $fillable);
        $this->assertContains('request_payload', $fillable);
        $this->assertContains('response_body', $fillable);
        $this->assertContains('error_message', $fillable);
        $this->assertContains('attempt_number', $fillable);
        $this->assertContains('duration_ms', $fillable);
    }

    /**
     * @test
     */
    public function it_casts_integer_fields_correctly(): void
    {
        $log = new WebhookLog();
        $casts = $log->getCasts();

        $this->assertEquals('integer', $casts['http_status']);
        $this->assertEquals('integer', $casts['attempt_number']);
        $this->assertEquals('integer', $casts['duration_ms']);
    }

    /**
     * @test
     */
    public function it_has_status_constants(): void
    {
        $this->assertEquals('pending', WebhookLog::STATUS_PENDING);
        $this->assertEquals('success', WebhookLog::STATUS_SUCCESS);
        $this->assertEquals('failed', WebhookLog::STATUS_FAILED);
    }

    /**
     * @test
     */
    public function it_can_be_instantiated_with_attributes(): void
    {
        $log = new WebhookLog([
            'event_type' => 'page.published',
            'endpoint_url' => 'https://example.com/webhook',
            'endpoint_name' => 'Test Endpoint',
            'status' => WebhookLog::STATUS_SUCCESS,
            'http_status' => 200,
            'request_payload' => '{"test": "data"}',
            'response_body' => 'OK',
            'attempt_number' => 1,
            'duration_ms' => 150,
        ]);

        $this->assertEquals('page.published', $log->event_type);
        $this->assertEquals('https://example.com/webhook', $log->endpoint_url);
        $this->assertEquals('Test Endpoint', $log->endpoint_name);
        $this->assertEquals(WebhookLog::STATUS_SUCCESS, $log->status);
        $this->assertEquals(200, $log->http_status);
        $this->assertEquals('{"test": "data"}', $log->request_payload);
        $this->assertEquals('OK', $log->response_body);
        $this->assertEquals(1, $log->attempt_number);
        $this->assertEquals(150, $log->duration_ms);
    }
}
