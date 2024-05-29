import {useState} from "react";
import {router} from "@inertiajs/react";

export default function EditProductModal({product}) {
    const [productName, setProductName] = useState(product.product_name); // State untuk menyimpan nama kategori
    const [productPrice, setProductPrice] = useState(product.price);
    const [productSellingPrice, setProductSellingPrice] = useState(product.selling_price);
    const [profit, setProfit] = useState(productSellingPrice-productPrice);
    const [productStatus, setProductStatus] = useState(product.product_status); // State untuk menyimpan status kategori

    // Handler untuk menyimpan kategori baru
    const handleSaveChanges =  (e) => {
        // const newCategory = {
        //     category_name: categoryName,
        //     category_status: categoryStatus
        // };

        // Lakukan logika untuk menyimpan kategori baru (misalnya, kirim ke server)
        // console.log("New category:", newCategory);
        console.log(productSellingPrice)
        e.preventDefault()
       try {

           router.post(`/product/${product.id}`,{
               id:product.id,
               product_name: productName,
               price: productPrice,
               selling_price:productSellingPrice,
               product_status:productStatus
           })
           // const response = await fetch('/category/store', {
           //     method: 'POST',
           //     headers: {
           //         'Content-Type': 'application/json',
           //     },
           //     // body: JSON.stringify({
           //     //     category_name: categoryName,
           //     //     category_status: categoryStatus
           //     // }),
           // });
           // const data = await response.json();
           // Tutup modal setelah menyimpan kategori
           // alert(data.message);
           // onClose();
       }catch (er){
           console.log(er)
           // alert(er.message)
       }
    };
    function formatRupiah(number) {
        return new Intl.NumberFormat('id-ID', {
            style: 'currency',
            currency: 'IDR'
        }).format(number);
    }
    // Add your modal content and logic here
    return (
        <div id={`hs-static-backdrop-modal-edit-product-${product.id}`} className={`hs - overlay hidden size-full fixed top-0 start-0 z-[80] overflow-x-hidden overflow-y-auto [--overlay-backdrop:static]`} data-hs-overlay-keyboard="false">
            {/* Modal backdrop */}
            <div className="flex items-center justify-center min-h-screen">
                <div
                    className="flex flex-col w-1/2 bg-white border shadow-sm rounded-xl pointer-events-auto dark:bg-neutral-800 dark:border-neutral-700 dark:shadow-neutral-700/70">
                    <div className="flex justify-between items-center py-3 px-4 border-b dark:border-neutral-700">
                        <h3 className="font-bold text-gray-800 dark:text-white">
                            Edit {product.product_name}
                        </h3>
                        <button type="button"
                                className="flex justify-center items-center size-7 text-sm font-semibold rounded-full border border-transparent text-gray-800 hover:bg-gray-100 disabled:opacity-50 disabled:pointer-events-none dark:text-white dark:hover:bg-neutral-700"
                                data-hs-overlay={`#hs-static-backdrop-modal-edit-product-${product.id}`}>
                            <span className="sr-only">Close</span>
                            <svg className="flex-shrink-0 size-4" xmlns="http://www.w3.org/2000/svg" width="24"
                                 height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"
                                 strokeLinecap="round" strokeLinejoin="round">
                                <path d="M18 6 6 18"></path>
                                <path d="m6 6 12 12"></path>
                            </svg>
                        </button>
                    </div>
                    <div className="p-4 overflow-y-auto w-full mx-auto ">
                        <form className='space-y-6'>
                            <div className="max-w-sm">
                                <label htmlFor="category-name"
                                       className="block text-sm font-medium mb-2 dark:text-white">Nama Product</label>
                                <input type="text" id="category-name"
                                       className="py-3 px-4 block w-full border-gray-200 rounded-lg text-sm focus:border-blue-500 focus:ring-blue-500 disabled:opacity-50 disabled:pointer-events-none dark:bg-neutral-900 dark:border-neutral-700 dark:text-neutral-400 dark:placeholder-neutral-500 dark:focus:ring-neutral-600"
                                       placeholder="Nama Product"
                                       value={productName}
                                       onChange={(e) => setProductName(e.target.value)}
                                />
                            </div>
                            <div className="max-w-sm">
                                <label htmlFor="category-name"
                                       className="block text-sm font-medium mb-2 dark:text-white">Harga Modal</label>
                                <input type="text" id="category-name"
                                       className="py-3 px-4 block w-full border-gray-200 rounded-lg text-sm focus:border-blue-500 focus:ring-blue-500 disabled:opacity-50 disabled:pointer-events-none dark:bg-neutral-900 dark:border-neutral-700 dark:text-neutral-400 dark:placeholder-neutral-500 dark:focus:ring-neutral-600"
                                       placeholder="Harga Modal"
                                       value={productPrice}
                                       onChange={(e) => {
                                           setProductPrice(e.target.value)
                                           setProfit(productSellingPrice - e.target.value)
                                       }}
                                />
                            </div>
                            <div className="max-w-sm">
                                <label htmlFor="category-name"
                                       className="block text-sm font-medium mb-2 dark:text-white">Harga Jual</label>
                                <input type="number" id="category-name"
                                       className="py-3 text-white px-4 block w-full border-gray-200 rounded-lg text-sm focus:border-blue-500 focus:ring-blue-500 disabled:opacity-50 disabled:pointer-events-none dark:bg-neutral-900 dark:border-neutral-700 dark:placeholder-neutral-500 dark:focus:ring-neutral-600"
                                       placeholder="Harga Jual"
                                       value={productSellingPrice}
                                       onChange={(e) => {
                                           setProductSellingPrice(e.target.value)
                                           setProfit(e.target.value - productPrice)
                                       }}
                                />
                            </div>
                            <div className="max-w-sm">
                                <label htmlFor="category-name"
                                       className="block text-sm font-medium mb-2 dark:text-white">Keuntungan</label>
                                <input type="text" id="category-name"
                                       disabled={true}
                                       className="py-3 px-4 block w-full border-gray-200 rounded-lg text-sm focus:border-blue-500 focus:ring-blue-500 disabled:opacity-50 disabled:pointer-events-none dark:bg-neutral-900 dark:border-neutral-700 dark:text-neutral-400 dark:placeholder-neutral-500 dark:focus:ring-neutral-600"
                                       placeholder="Keuntungan"
                                       value={formatRupiah(profit)}
                                    // onChange={(e) => setProfit()}
                                />
                            </div>
                            <label htmlFor="category-name"
                                   className="block text-sm font-medium mb-2 dark:text-white">Status Product</label>
                            <div className="relative max-w-sm">
                                <select data-hs-select='{
                                          "placeholder": "Select option...",
                                          "toggleTag": "<button type=\"button\"></button>",
                                          "toggleClasses": "hs-select-disabled:pointer-events-none hs-select-disabled:opacity-50 relative py-3 px-4 pe-9 flex text-nowrap w-full cursor-pointer bg-white border border-gray-200 rounded-lg text-start text-sm focus:border-blue-500 focus:ring-blue-500 before:absolute before:inset-0 before:z-[1] dark:bg-neutral-900 dark:border-neutral-700 dark:text-neutral-400",
                                          "dropdownClasses": "mt-2 z-50 w-full max-h-72 p-1 space-y-0.5 bg-white border border-gray-200 rounded-lg overflow-hidden overflow-y-auto dark:bg-neutral-900 dark:border-neutral-700",
                                          "optionClasses": "py-2 px-4 w-full text-sm text-gray-800 cursor-pointer hover:bg-gray-100 rounded-lg focus:outline-none focus:bg-gray-100 dark:bg-neutral-900 dark:hover:bg-neutral-800 dark:text-neutral-200 dark:focus:bg-neutral-800",
                                          "optionTemplate": "<div class=\"flex justify-between items-center w-full\"><span data-title></span><span class=\"hidden hs-selected:block\"><svg class=\"flex-shrink-0 size-3.5 text-blue-600 dark:text-blue-500\" xmlns=\"http:.w3.org/2000/svg\" width=\"24\" height=\"24\" viewBox=\"0 0 24 24\" fill=\"none\" stroke=\"currentColor\" stroke-width=\"2\" stroke-linecap=\"round\" stroke-linejoin=\"round\"><polyline points=\"20 6 9 17 4 12\"/></svg></span></div>"
                                        }' id='category_status'
                                        value={productStatus}
                                        onChange={(e) => setProductStatus(e.target.value)}
                                >
                                    <option value="">Choose</option>
                                    <option value='1'>Aktif</option>
                                    <option value='0'>Nonaktif</option>
                                </select>

                                <div className="absolute top-1/2 end-2.5 -translate-y-1/2">
                                    <svg className="flex-shrink-0 size-4 text-gray-500 dark:text-neutral-500"
                                         xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"
                                         fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round"
                                         strokeLinejoin="round">
                                        <path d="m7 15 5 5 5-5"></path>
                                        <path d="m7 9 5-5 5 5"></path>
                                    </svg>
                                </div>
                            </div>
                        </form>
                    </div>
                    <div className="flex justify-end items-center gap-x-2 py-3 px-4 border-t dark:border-neutral-700">
                    <button type="button"
                                className="py-2 px-3 inline-flex items-center gap-x-2 text-sm font-medium rounded-lg border border-gray-200 bg-white text-gray-800 shadow-sm hover:bg-gray-50 disabled:opacity-50 disabled:pointer-events-none dark:bg-neutral-900 dark:border-neutral-700 dark:text-white dark:hover:bg-neutral-800"
                                data-hs-overlay={`#hs-static-backdrop-modal-edit-product-${product.id}`}>
                            Close
                        </button>
                        <button type="button" onClick={handleSaveChanges} data-hs-overlay={`#hs-static-backdrop-modal-edit-product-${product.id}`}
                                className="py-2 px-3 inline-flex items-center gap-x-2 text-sm font-semibold rounded-lg border border-transparent bg-blue-600 text-white hover:bg-blue-700 disabled:opacity-50 disabled:pointer-events-none">
                            Save changes
                        </button>
                    </div>
                </div>
            </div>
            {/*        <div className="z-50 bg-white p-6 rounded-lg shadow-xl">*/}
            {/*            <div className="flex justify-end">*/}
            {/*                <button onClick={onClose}>Close</button>*/}
            {/*            </div>*/}
            {/*            /!* Add your form for adding a new category here *!/*/}
            {/*            /!* For example: *!/*/}
            {/*            <form>*/}
            {/*                /!* Form fields *!/*/}
            {/*                /!* Submit button *!/*/}
            {/*            </form>*/}
            {/*        </div>*/}
            {/*    </div>*/}
            {/*</div>*/}
        </div>
    );
}
