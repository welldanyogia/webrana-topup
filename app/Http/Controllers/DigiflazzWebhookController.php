<?php

namespace App\Http\Controllers;

use App\Models\Transactions;
use App\Services\FonnteService;
use Carbon\Carbon;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Log;

class DigiflazzWebhookController extends Controller
{
    protected $fonnteService;

    public function __construct(FonnteService $fonnteService)
    {
        $this->fonnteService = $fonnteService;
    }
    public function handle(Request $request)
    {
//        $secret = env('DIGIFLAZZ_WEBHOOK_SECRET');
        $secret = "201aabefcfe7212e";
        $signature = $request->header('X-Hub-Signature');
        $post_data = $request->getContent();
        $computed_signature = 'sha1=' . hash_hmac('sha1', $post_data, $secret);

        // Verify the signature
        if (!hash_equals($signature, $computed_signature)) {
            Log::info('message : Invalid signature');
            return response()->json(['success' => false, 'message' => 'Invalid signature', 'compute secret' => $computed_signature,'signature'=> $signature,'postdata'=> $post_data], 400);

        }

        $event = $request->header('X-Digiflazz-Event');
        $data = json_decode($post_data, true);

        if (json_last_error() !== JSON_ERROR_NONE) {
            Log::info('message : Invalid JSON');
            return response()->json(['success' => false, 'message' => 'Invalid JSON'], 400);
        }

        switch ($event) {
            case 'create':
                $this->handleCreateEvent($data);
                break;
            case 'update':
                $this->handleUpdateEvent($data);
                break;
            default:
                Log::info('message : Unrecognized event');
                return response()->json(['success' => false, 'message' => 'Unrecognized event'], 400);
        }

        return response()->json(['success' => true]);
    }

    protected function handleCreateEvent($data)
    {
        // Handle the create event
        Log::info('Create event received', $data);
        // You can add custom logic here, for example, saving the transaction data to the database
    }

    protected function handleUpdateEvent($data)
    {
        // Handle the update event
        Log::info('Update event received', $data);

        // Extract necessary data
        $transactionData = $data['data'] ?? [];

        $trxId = $transactionData['ref_id'] ?? null;
        $status = $transactionData['status'] ?? null;

        if ($trxId && $status) {
            // Find the transaction and update its status
            $transaction = Transactions::where('trx_id', $trxId)->first();

            if ($transaction) {
                // Determine the status based on the received status
                $newStatus = match ($status) {
                    'sukses', 'Sukses' => 'success',
                    'pending', 'Pending' => 'pending',
                    'gagal','Gagal' => 'failed',
                    default => 'unknown',
                };

                // Update transaction status
                $transaction->update([
                    'status' => $newStatus,
                    'digiflazz_status' => $transactionData['status'],
                ]);

                if ($newStatus === 'success'){
                    $this->sendSuccessInvoiceToWhatsApp($transaction,$transaction->phone_number);
                }

                // Log the update
                Log::info('Transaction updated', ['trx_id' => $trxId, 'status' => $newStatus]);
            } else {
                Log::warning('Transaction not found', ['trx_id' => $trxId]);
            }
        }else {
            Log::error('Missing transaction data', $transactionData);
        }
    }

    private function sendSuccessInvoiceToWhatsApp($transaction, $phone_number)
    {
        Carbon::setLocale('id');
        $appNameFull = config('app.name');
        $appNameParts = explode(' |', $appNameFull);
        $appName = $appNameParts[0];
        $appUrl = config('app.url');
//        $appUrl = "http://webranastore.com";
        $expiredTime = Carbon::parse($transaction->expired_time);
        $formattedExpiredTime = $expiredTime->translatedFormat('d F Y, H:i:s');

        $message = "Halo {$transaction->user_name},\n\n";
        $message .= "Transakasi anda dengan ID Transakasi *{$transaction->trx_id}* telah berhasil.\n";
        $message .= "Silahkan periksa akun anda\n\n";

        $message .= "\n\nDetail Transaksi : {$appUrl}/transaction/{$transaction->trx_id}\n\n";
        $message .= "Jika ada pertanyaan, silakan hubungi kami.\n\n";
        $message .= "Terima kasih,\n";
        $message .= "Tim {$appName}";

        $this->fonnteService->sendMessage([
            'target' => $phone_number,
            'message' => $message,
        ]);
    }
}
