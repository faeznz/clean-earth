import React from "react";
import ReactFC from "react-fusioncharts";
import FusionCharts from "fusioncharts";
import Column2D from "fusioncharts/fusioncharts.charts";
import FusionTheme from "fusioncharts/themes/fusioncharts.theme.fusion";

ReactFC.fcRoot(FusionCharts, Column2D, FusionTheme);

const BarChart = (props) => {
  const { dataChart = [] } = props;
  const chartData = dataChart.map((items, i) => {
    return {
      label: items.bulan,
      value: items.jumlah_sampah,
      color: "#EB8C35",
    };
  });

  const chartConfigs = {
    type: "column2d",
    width: "100%",
    height: "70%",
    dataFormat: "json",
    dataSource: {
      chart: {
        caption: "Laporan Setoran Sampah",
        xAxisName: "Bulan",
        yAxisName: "Jumlah",
        theme: "fusion",
      },
      data: chartData,
    },
  };
  return (
    <div>
      <ReactFC {...chartConfigs} />
    </div>
  );
};

export default BarChart;
