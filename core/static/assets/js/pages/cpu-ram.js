
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
        setInterval(() => {
            $.ajax({
                url: 'getStatus',
                method: "GET",
            }).done(res => {
                res = JSON.parse(res)
                if (res.used) {
                    ramGraph.setData([{
                        value: res.used,
                        label: 'Used'
                    }, {
                        value: res.free,
                        label: 'Free'
                    },
                    ])
                }
            })
        }, 1000);
        // [ Donut-chart ] end
    }, 700);
});

