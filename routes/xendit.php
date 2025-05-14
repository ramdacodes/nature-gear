<?php

use Illuminate\Support\Facades\Route;
use Xendit\Configuration;
use Xendit\Invoice\InvoiceApi;

Route::get('/test-xendit', function () {
    Configuration::setXenditKey(config('services.xendit.secret_key'));

    $apiInstance = new InvoiceApi();
    $create_invoice_request = new Xendit\Invoice\CreateInvoiceRequest([
        'external_id' => 'test1234',
        'description' => 'Test Invoice',
        'amount' => 10000,
        'invoice_duration' => 172800,
        'currency' => 'IDR',
        'reminder_time' => 1
    ]);

    try {
        $invoice = $apiInstance->createInvoice($create_invoice_request);

        return redirect($invoice['invoice_url']);
    } catch (\Xendit\XenditSdkException $e) {
        echo 'Exception when calling InvoiceApi->createInvoice: ', $e->getMessage(), PHP_EOL;
        echo 'Full Error: ', json_encode($e->getFullError()), PHP_EOL;
    }
});
