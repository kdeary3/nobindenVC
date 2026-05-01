import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js';
import { Doughnut } from 'react-chartjs-2';
import ChartDataLabels from 'chartjs-plugin-datalabels';
import type { Startup } from "../../startup/startup_type.ts";

ChartJS.register(ArcElement, Tooltip, Legend, ChartDataLabels);

type StartupCardFundingChartProps = {
    startup: Startup;
}

const CHART_COLORS = [
    'rgb(255, 99, 132)',
    'rgb(54, 162, 235)',
    'rgb(255, 205, 86)',
    'rgb(75, 192, 192)',
    'rgb(153, 102, 255)',
];

// const StartupCardFundingChart = ({ startup }: StartupCardFundingChartProps) => {
const StartupCardFundingChart = ({ startup }: StartupCardFundingChartProps) => {
    const fundingByRound = startup.fundingByRound ?? {};
    const labels = Object.keys(fundingByRound);
    const values = Object.values(fundingByRound);
    const hasData = values.length > 0 && values.some(v => v > 0);

    const data = {
        labels: hasData ? labels : ['No data'],
        datasets: [{
            data: hasData ? values : [1],
            backgroundColor: hasData ? CHART_COLORS.slice(0, labels.length) : ['#e0e0e0'],
            hoverOffset: 4
        }]
    };

    const options = {
        maintainAspectRatio: false,
        plugins: {
            legend: { display: false },
            datalabels: {
                display: hasData,
                color: '#fff',
                font: { size: 12 },
                textAlign: 'center' as const,
                formatter: (value: number, context: any) => {
                    const label = context.chart.data.labels[context.dataIndex];
                    return `${label}\n$${value}k`;
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
            {!hasData && (
                <p className="text-center text-muted small mt-2">No funding rounds recorded.</p>
            )}
        </div>
    );
};

export default StartupCardFundingChart;