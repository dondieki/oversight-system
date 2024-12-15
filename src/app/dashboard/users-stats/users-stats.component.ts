import { Component, Input } from '@angular/core';
import Chart from 'chart.js/auto';

@Component({
  selector: 'app-users-stats',
  templateUrl: './users-stats.component.html',
  styleUrls: ['./users-stats.component.scss'],
})
export class UsersStatsComponent {
  @Input() stats: any;
  chart: any = [];

  ngOnInit() {
    this.populateChart();
  }

  populateChart() {
    const totalUsers =
      this.stats.admin + this.stats.supervisor + this.stats.inspector;

    this.chart = new Chart('usersStatistics', {
      type: 'doughnut',
      data: {
        labels: ['Admins', 'Supervisors', 'Inspectors'],
        datasets: [
          {
            label: 'User Statistics',
            data: [
              this.stats.admin,
              this.stats.supervisor,
              this.stats.inspector,
            ],
            backgroundColor: ['#FF6384', '#36A2EB', '#FFCE56'], // Custom colors
            hoverBackgroundColor: ['#FF6384DD', '#36A2EBDD', '#FFCE56DD'], // Hover colors
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
                const value:any = context.raw;
                const percentage = (
                  (value / totalUsers) *
                  100
                ).toFixed(2); // Calculate percentage
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

            const text = `Total: ${totalUsers}`;
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
