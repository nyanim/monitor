var rsttime;
$.ajax({
    url: '/api/get_service_from_server/' + current_server_name,
    success: function (service_result) {
        service_result.map(function (service_item) {
            $.ajax({
                url: '/api/get_service_data/' + service_item + '/72',
                success: function (result) {
                    data = result.data.map(function (item) {
                        r = item[2];
                        if (r < 0) {
                            r = '-'
                        }
                        return [item[1], item[0], r];
                    });
                    //console.log(data)
                    rsttime = result.time
                    service_series = {
                        name: service_item,
                        type: 'heatmap',
                        data: data,
                        label: {
                            normal: {
                                show: true
                            }
                        },
                        itemStyle: {
                            emphasis: {
                                shadowBlur: 10,
                                shadowColor: 'rgba(0, 0, 0, 0.5)'
                            }
                        }
                    };

                    console.log(service_series)
                    var service_option = {
                        title: {
                            text: service_item
                        },
                        tooltip: {
                            position: 'top'
                        },
                        animation: false,
                        grid: {
                            height: '50%',
                            y: '10%'
                        },
                        xAxis: {
                            type: 'category',
                            data: rsttime,//result.time,
                            splitArea: {
                                show: true
                            }
                        },
                        yAxis: {
                            type: 'category',
                            data: ['http', 'https'],
                            splitArea: {
                                show: true
                            }
                        },
                        visualMap: {
                            min: 0,
                            max: 2,
                            calculable: true,
                            orient: 'horizontal',
                            left: 'center',
                            bottom: '15%'
                        },
                        series: service_series
                    };
                    $("#servicechartsection").append('<div id="' + service_item + '" style="width: 100%;height:400px;"></div>')
                    var serviceChart = echarts.init(document.getElementById(service_item));
                    serviceChart.setOption(service_option);
                }
            });
        })
    }
});