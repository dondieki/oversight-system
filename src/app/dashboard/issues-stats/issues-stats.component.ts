import { Component, Input } from '@angular/core';
import Chart from 'chart.js/auto';

@Component({
  selector: 'app-issues-stats',
  templateUrl: './issues-stats.component.html',
  styleUrls: ['./issues-stats.component.scss'],
})
export class IssuesStatsComponent {
  @Input() stats: any;
  chart: any = [];

  ngOnInit() {
    this.populateChart();
  }

  populateChart() {
    const totalIssues = this.stats.resolved + this.stats.unresolved;

    this.chart = new Chart('issuesStatistics', {
      type: 'doughnut',
      data: {
        labels: ['Resolved', 'Pending'],
        datasets: [
          {
            label: 'Issues Statistics',
            data: [this.stats.resolved, this.stats.unresolved],
            backgroundColor: ['#4CAF50', '#FFC107'], // Custom colors
            hoverBackgroundColor: ['#4CAF50DD', '#FFC107DD'], // Hover colors
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
                const percentage = ((value / totalIssues) * 100).toFixed(2); // Calculate percentage
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

            const text = `Total: ${totalIssues}`;
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
