<!DOCTYPE html>
<html lang="{{ str_replace('_', '-', app()->getLocale()) }}">
    <head>
        <meta charset="utf-8">
        <meta name="viewport" content="width=device-width, initial-scale=1">

        <title inertia>{{ config('app.name', 'Laravel') }}</title>
        <link rel="icon" href="{{ asset('/storage/favicon.ico') }}?v={{ date('YmdHis') }}">

        <!-- Fonts -->
        <link rel="preconnect" href="https://fonts.bunny.net">
        <link href="https://fonts.bunny.net/css?family=figtree:400,500,600&display=swap" rel="stylesheet" />
        <link href="https://cdnjs.cloudflare.com/ajax/libs/flowbite/2.3.0/flowbite.min.css"  rel="stylesheet" />
{{--        <link rel="stylesheet" href="../assets/vendor/apexcharts/dist/apexcharts.css">--}}
{{--        <link rel="stylesheet" href="../../node_modules/apexcharts/dist/apexcharts.css">--}}
{{--        <link href="../node_modules/froala-editor/css/froala_editor.pkgd.min.css" rel="stylesheet" type="text/css" />--}}
        <style type="text/css">
            .apexcharts-tooltip.apexcharts-theme-light {
                background-color: transparent !important;
                border: none !important;
                box-shadow: none !important;
            }
        </style>
        <!-- Scripts -->
        @routes
        @viteReactRefresh
        @vite(['resources/js/app.jsx', "resources/js/Pages/{$page['component']}.jsx", ])
        @inertiaHead
    </head>
    <body class="font-sans antialiased">
        @inertia
{{--        <script src="../../node_modules/clipboard/dist/clipboard.min.js"></script>--}}
        <script src="https://cdn.jsdelivr.net/npm/clipboard@2.0.11/dist/clipboard.min.js"></script>
{{--        <script src="../../node_modules/flowbite/dist/flowbite.min.js"></script>--}}
        <script src="https://cdn.jsdelivr.net/npm/apexcharts"></script>
        <!-- Apexcharts -->
{{--        <script src="../../node_modules/preline/dist/index.js"></script>--}}
{{--        <script src="../../node_modules/lodash/lodash.min.js"></script>--}}
        <script src="https://preline.co/assets/js/hs-apexcharts-helpers.js"></script>
        <script src="https://cdn.jsdelivr.net/npm/apexcharts"></script>
        <script src="https://preline.co/assets/js/hs-apexcharts-helpers.js"></script>

        <script>
            window.addEventListener('load', () => {
                // Apex Curved Line Charts
                (function () {
                    buildChart('#hs-curved-line-charts', (mode) => ({
                        chart: {
                            height: 250,
                            type: 'line',
                            toolbar: {
                                show: false
                            },
                            zoom: {
                                enabled: false
                            }
                        },
                        series: [
                            {
                                name: 'Income',
                                data: [0, 27000, 25000, 27000, 40000]
                            },
                            {
                                name: 'Outcome',
                                data: [19500, 10000, 19000, 17500, 26000]
                            },
                            {
                                name: 'Others',
                                data: [8000, 2200, 6000, 9000, 10000]
                            }
                        ],
                        dataLabels: {
                            enabled: false
                        },
                        stroke: {
                            curve: 'smooth',
                            width: [4, 4, 4],
                            dashArray: [0, 0, 4]
                        },
                        title: {
                            show: false
                        },
                        legend: {
                            show: false
                        },
                        grid: {
                            strokeDashArray: 0,
                            borderColor: '#e5e7eb',
                            padding: {
                                top: -20,
                                right: 0
                            }
                        },
                        xaxis: {
                            type: 'category',
                            categories: [
                                '25 January 2023',
                                '28 January 2023',
                                '31 January 2023',
                                '1 February 2023',
                                '3 February 2023'
                            ],
                            axisBorder: {
                                show: false
                            },
                            axisTicks: {
                                show: false
                            },
                            tooltip: {
                                enabled: false
                            },
                            labels: {
                                offsetY: 5,
                                style: {
                                    colors: '#9ca3af',
                                    fontSize: '13px',
                                    fontFamily: 'Inter, ui-sans-serif',
                                    fontWeight: 400
                                },
                                formatter: (title) => {
                                    let t = title;

                                    if (t) {
                                        const newT = t.split(' ');
                                        t = `${newT[0]} ${newT[1].slice(0, 3)}`;
                                    }

                                    return t;
                                }
                            }
                        },
                        yaxis: {
                            min: 0,
                            max: 40000,
                            tickAmount: 4,
                            labels: {
                                align: 'left',
                                minWidth: 0,
                                maxWidth: 140,
                                style: {
                                    colors: '#9ca3af',
                                    fontSize: '12px',
                                    fontFamily: 'Inter, ui-sans-serif',
                                    fontWeight: 400
                                },
                                formatter: (value) => value >= 1000 ? `${value / 1000}k` : value
                            }
                        },
                        tooltip: {
                            custom: function (props) {
                                const { categories } = props.ctx.opts.xaxis;
                                const { dataPointIndex } = props;
                                const title = categories[dataPointIndex].split(' ');
                                const newTitle = `${title[0]} ${title[1]}`;

                                return buildTooltip(props, {
                                    title: newTitle,
                                    mode,
                                    hasTextLabel: true,
                                    wrapperExtClasses: 'min-w-36',
                                    labelDivider: ':',
                                    labelExtClasses: 'ms-2'
                                });
                            }
                        }
                    }), {
                        colors: ['#2563EB', '#22d3ee', '#d1d5db'],
                        xaxis: {
                            labels: {
                                style: {
                                    colors: '#9ca3af',
                                }
                            }
                        },
                        yaxis: {
                            labels: {
                                style: {
                                    colors: '#9ca3af'
                                }
                            }
                        },
                        grid: {
                            borderColor: '#e5e7eb'
                        }
                    }, {
                        colors: ['#3b82f6', '#22d3ee', '#737373'],
                        xaxis: {
                            labels: {
                                style: {
                                    colors: '#a3a3a3',
                                }
                            }
                        },
                        yaxis: {
                            labels: {
                                style: {
                                    colors: '#a3a3a3'
                                }
                            }
                        },
                        grid: {
                            borderColor: '#404040'
                        }
                    });
                })();
            });
        </script>
        <script src="https://cdnjs.cloudflare.com/ajax/libs/flowbite/2.3.0/flowbite.min.js"></script>
{{--        <script src="node_modules/preline/dist/preline.js"></script>--}}
    </body>
</html>
