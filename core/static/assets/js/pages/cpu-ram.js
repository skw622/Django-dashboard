
'use strict';
$(document).ready(function () {
    setTimeout(function () {
        // [ Donut-chart ] Start
        var ramGraph = Morris.Donut({
            element: 'ram-status',
            data: [{
                value: 1,
                label: 'Free'
            },
            {
                value: 0,
                label: 'Used'
            },
            ],
            colors: [
                '#A389D4',
                '#1de9b6',
            ],
            resize: true,
            formatter: function (x) {
                return `${x} Byte`
            }
        });
        var cpuGraph = Morris.Donut({
            element: 'cpu-status',
            data: [{
                value: 1,
                label: 'Free'
            },
            {
                value: 0,
                label: 'Used'
            },
            ],
            colors: [
                '#A389D4',
                '#1de9b6',
            ],
            resize: true,
            formatter: function (x) {
                return `${x} Percent`
            }
        });
        setInterval(() => {
            $.ajax({
                url: 'getStatus',
                method: "GET",
            }).done(res => {
                res = JSON.parse(res)
                if (res) {
                    ramGraph.setData([{
                        value: res.memory.used,
                        label: 'Used'
                    }, {
                        value: res.memory.free,
                        label: 'Free'
                    },
                    ])
                    cpuGraph.setData([{
                        value: 100 - res.cpu,
                        label: 'Free'
                    },
                    {
                        value: res.cpu,
                        label: 'Used'
                    },
                    ])
                }
            })
        }, 1000);
        // [ Donut-chart ] end
    }, 700);
});

