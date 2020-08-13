<script>
import { Doughnut } from "vue-chartjs";
export default {
  extends: Doughnut,  
  props: ["datos"],
  data() {
    return {
      chartData: {
        labels: ["Parcelas Visitadas", "Parcelas Pendientes Visitar"],
        datasets: [
          {            
            borderColor: ["rgba(255,99,132,1)", "rgba(255, 206, 86, 1)"],
            backgroundColor: [
              "rgba(255, 99, 132, 0.5)",
              "rgba(54, 162, 235, 0.5)",
              "rgba(255, 255, 255, 0.9)",
            ],            
            data: this.datos,            
          },
        ],
      },      
      options: {
        legend: {
          display: true,
        },
        responsive: true,
        maintainAspectRatio: true,        
        cutoutPercentage: 70,
        
      },
    };
  },
  mounted() {    
    this.renderChart(this.chartData, this.options);
  },
};
</script>