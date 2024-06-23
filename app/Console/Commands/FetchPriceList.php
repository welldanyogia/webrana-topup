<?php

namespace App\Console\Commands;

use App\Http\Controllers\Admin\DigiflazzController;
use App\Services\FonnteService;
use Illuminate\Console\Command;
use Laravel\Reverb\Loggers\Log;

class FetchPriceList extends Command
{
    /**
     * The name and signature of the console command.
     *
     * @var string
     */
    protected $signature = 'app:fetch-price-list';

    /**
     * The console command description.
     *
     * @var string
     */
    protected $description = 'Fetch and store the price list every 5 minutes';

    protected $fonnteService;

    public function __construct(FonnteService $fonnteService)
    {
        parent::__construct();
//        $this->fonnteService = $fonnteService;
    }

    /**
     * Execute the console command.
     */
    public function handle()
    {
//        info("Cron Job running at ". now());
//        $controller = new DigiflazzController($this->fonnteService); // Instantiate your controller
//        $controller->fetchAndStorePriceList(); // Call your method
    }
}
