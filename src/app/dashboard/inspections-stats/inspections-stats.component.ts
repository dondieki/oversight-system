import { Component, Input } from '@angular/core';
import Chart from 'chart.js/auto';

@Component({
  selector: 'app-inspections-stats',
  templateUrl: './inspections-stats.component.html',
  styleUrls: ['./inspections-stats.component.scss'],
})
export class InspectionsStatsComponent {
  @Input() stats: any;
  chart: any = [];

  ngOnInit() {
    this.populateChart();
  }

  populateChart() {
    const totalInspections = this.stats.completed + this.stats.incomplete;

    this.chart = new Chart('inspectionsStatistics', {
      type: 'doughnut',
      data: {
        labels: ['Completed', 'Pending'],
        datasets: [
          {
            label: 'Inspections Statistics',
            data: [this.stats.completed, this.stats.incomplete],
            backgroundColor: ['#2196F3', '#FF5722'], // Custom colors
            hoverBackgroundColor: ['#2196F3DD', '#FF5722DD'], // Hover colors
            borderWidth: 1,
            borderColor: '#ffffff', // Border color
          },
        ],
      },
      options: {
        responsive: true,
        maintainAspectRatio: true,
        plugins: {
          legend: {
            display: true,
            position: 'top',
          },
          tooltip: {
            callbacks: {
              label: function (context) {
                const label = context.label || '';
                const value: any = context.raw;
                const percentage = ((value / totalInspections) * 100).toFixed(
                  2
                ); // Calculate percentage
                return `${label}: ${value} (${percentage}%)`;
              },
            },
          },
        },
      },
      plugins: [
        {
          id: 'centerTextPlugin',
          beforeDraw(chart) {
            const { width } = chart;
            const { height } = chart;
            const { ctx } = chart;
            const fontSize = (height / 100) * 5;

            ctx.restore();
            ctx.font = `${fontSize}px Arial`;
            ctx.textBaseline = 'middle';

            const text = `Total: ${totalInspections}`;
            const textX = Math.round((width - ctx.measureText(text).width) / 2);
            const textY = height / 2;

            ctx.fillStyle = '#000000'; // Text color
            ctx.fillText(text, textX, textY);
            ctx.save();
          },
        },
      ],
    });
  }
}
