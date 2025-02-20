import { TaxBand } from "../../store/types"

const barColors = ['rgb(255, 99, 132)', 'rgb(75, 192, 192)', 'rgb(100, 43, 201)', 'rgb(23, 34, 100)', 'rgb(23, 87, 230)']

export const getPieChartData = (totalTax: number, salary: number, t: any) => ({
    labels: [t("charts.pie.cad"), t("charts.pie.cad")],
    datasets: [
        {
            label: t("charts.pie.cad"),
            data: [totalTax, salary - totalTax],
            backgroundColor: [
                'rgba(255, 99, 132, 0.2)',
                'rgba(54, 162, 235, 0.2)',

            ],
            borderColor: [
                'rgba(255, 99, 132, 1)',
                'rgba(54, 162, 235, 1)',
            ],
            borderWidth: 2,
        },
    ],
})

export const getBarChartData = (taxBands: Array<TaxBand>, t: any) => ({
    labels: [t("charts.bar.taxAmount")],
    datasets: taxBands?.map((band, idx) => ({
        label: t("charts.bar.bandRate", {bandRate: (band.rate * 100).toFixed(1)}),
        data: [band.taxAmount],
        backgroundColor: barColors[idx]
    }))
})


export const barOptions = (t: any) => ({
    plugins: {
        title: {
            display: true,
            text: t("charts.bar.title"),
        },
        legend: {
            display: false
        }
    },
    responsive: true,
    scales: {
        x: {
            stacked: true,
        },
        y: {
            stacked: true,
        },
    },
});

export const pieOptions = (t: any) => ({
    plugins: {
        title: {
            display: true,
            text: t("charts.pie.title"),
        },
        legend: {
            display: false
        }
    }
});