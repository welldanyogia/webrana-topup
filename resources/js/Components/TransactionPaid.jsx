export default function TransactionPaid({transaction}) {
    return (
        <div className="space-y-2">
            <div className="text-xl font-bold dark:text-white">
                Terima Kasih!
            </div>
            <div className="text-3xl font-bold dark:text-white">
                Pembayaran transaksi telah <b>Berhasil</b>.
            </div>
            <div className="text-md dark:text-white">
                {
                    transaction.status === 'process' && (
                        <span>Pesanan kamu <b>{transaction.trx_id}</b> sedang di prosess.</span>
                    )
                }
                {
                    transaction.status === 'success' && (
                        <span>Pesanan kamu <b>{transaction.trx_id}</b> telah berhasil.</span>
                    )
                }
            </div>
        </div>
    )
}
