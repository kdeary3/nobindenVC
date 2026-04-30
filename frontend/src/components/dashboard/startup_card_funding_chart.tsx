import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js';
import { Doughnut } from 'react-chartjs-2';
import ChartDataLabels from 'chartjs-plugin-datalabels';
// import type { Startup } from "../../startup/startup_type.ts";

ChartJS.register(ArcElement, Tooltip, Legend, ChartDataLabels);

// type StartupCardFundingChartProps = {
//     startup: Startup;
// }

// const StartupCardFundingChart = ({ startup }: StartupCardFundingChartProps) => {
const StartupCardFundingChart = () => {
    const data = {
        labels: ['Seed', 'Preseed', 'Series A', 'Series B', 'Series C'],
        datasets: [{
            data: [100, 200, 300, 400, 500],
            backgroundColor: [
                'rgb(255, 99, 132)',
                'rgb(54, 162, 235)',
                'rgb(255, 205, 86)',
                'rgb(75, 192, 192)',
                'rgb(153, 102, 255)'
            ],
            hoverOffset: 4
        }]
    };

    const options = {
        maintainAspectRatio: false,
        plugins: {
            legend: {
                display: false,
            },
            datalabels: {
                display: true,
                color: '#fff', // White text to stand out on colors
                font: {size: 12},
                textAlign: 'center' as const,
                formatter: (value: number, context: any) => {
                    const label = context.chart.data.labels[context.dataIndex];
                    return `${label}\n$${value}`;
                },
            },
        },
    };

    return (
        <div className="p-3 border rounded bg-light mb-2">
            <small className="text-uppercase text-muted d-block mb-2">Funding By Round</small>
            <div style={{ height: '200px' }}>
                <Doughnut options={options} data={data}/>
            </div>
        </div>
    );
};

export default StartupCardFundingChart;