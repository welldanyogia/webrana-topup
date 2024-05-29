export default function TransactionUnpaid({transaction,countDownTime}) {
    return (
        <div className="space-y-2">
            <div className="text-xl font-bold dark:text-white">
                Terima Kasih!
            </div>
            <div className="text-3xl font-bold dark:text-white">
                Harap lengkapi pembayaran.
            </div>
            <div className="text-md dark:text-white">
                {
                    transaction.payment_status === 'UNPAID' && (
                        <span>Pesanan kamu <b>{transaction.trx_id}</b> menunggu pembayaran sebelum di prosess.</span>
                    )
                }
                {
                    transaction.payment_status === 'UNPAID' &&
                    transaction.payment_status === 'FAILED' &&
                    transaction.payment_status === 'EXPIRED' &&(
                        <span>Pesanan kamu <b>{transaction.trx_id}</b> telah kadaluarsa silahakan buat pesanan baru.</span>
                    )
                }
            </div>
            <div className="space-y-6 p-6 ">
                <div className="grid grid-flow-col gap-5 text-center auto-cols-max">
                    {/*<div className="flex flex-col p-2 bg-neutral rounded-box text-neutral-content">*/}
                    {/*<span className="countdown font-mono text-5xl">*/}
                    {/*  <span style={{"--value": countDownTime.days}}></span>*/}
                    {/*</span>*/}
                    {/*    days*/}
                    {/*</div>*/}
                    <div className="flex flex-col p-2 bg-neutral rounded-box text-neutral-content">
                                <span className="countdown font-mono text-5xl">
                                  <span style={{"--value": countDownTime.hours}}></span>
                                </span>
                        hours
                    </div>
                    <div className="flex flex-col p-2 bg-neutral rounded-box text-neutral-content">
                                <span className="countdown font-mono text-5xl">
                                  <span style={{"--value": countDownTime.minutes}}></span>
                                </span>
                        min
                    </div>
                    <div className="flex flex-col p-2 bg-neutral rounded-box text-neutral-content">
                                <span className="countdown font-mono text-5xl">
                                  <span style={{"--value": countDownTime.seconds}}></span>
                                </span>
                        sec
                    </div>
                </div>
            </div>
            <div className="text-md dark:text-white">
                Selesaikan pesananmu sebelum <b>{transaction.expired_time}</b> agar segera di proses.
            </div>
        </div>
    )
}
