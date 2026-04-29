import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js';
import { Doughnut } from 'react-chartjs-2';
import type { Startup } from "../../startup/startup_type.ts";

ChartJS.register(ArcElement, Tooltip, Legend);

type StartupCardFundingChartProps = {
    startup: Startup;
}

// const StartupCardFundingChart = ({ startup }: StartupCardFundingChartProps) => {
const StartupCardFundingChart = () => {
    const data = {
        labels: ['Seed', 'Preseed', 'Series A', 'Series B', 'Series C'],
        datasets: [{
            data: [300, 50, 100],
            backgroundColor: [
                'rgb(255, 99, 132)',
                'rgb(54, 162, 235)',
                'rgb(255, 205, 86)'
            ],
            hoverOffset: 4
        }]
    };

    return (
        <div className="p-3 border rounded bg-light mb-2">
            <small className="text-uppercase text-muted d-block mb-2">Funding By Round</small>
            <div style={{ height: '200px' }}>
                {/* Use the Doughnut component here */}
                <Doughnut data={data} />
            </div>
        </div>
    );
};

export default StartupCardFundingChart;