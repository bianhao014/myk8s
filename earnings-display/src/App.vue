<template>
  <div class="app-container">
    <el-card class="earnings-card">
      <template #header>
        <div class="card-header">
          <h1>应用收益统计</h1>
          <div class="total-earnings">
            <span>总收益:</span>
            <span class="amount">{{ totalEarnings }}</span>
          </div>
        </div>
      </template>
      
      <div class="chart-container">
        <div class="chart-wrapper">
          <h3>APP总收益分布</h3>
          <pie-chart :chart-data="pieChartData" />
        </div>
        <div class="chart-wrapper">
          <h3>APP日收益对比</h3>
          <bar-chart :chart-data="barChartData" />
        </div>
      </div>
      
      <div class="table-container">
        <h3>详细收益数据</h3>
        <el-table :data="earningsData" stripe style="width: 100%" :default-sort="{ prop: 'totalAppEarnings', order: 'descending' }">
          <el-table-column prop="appName" label="应用名称" width="180" />
          <el-table-column prop="dailyAppEarnings" label="APP日收益" width="120">
            <template #default="scope">
              <span :class="{ 'negative': scope.row.dailyAppEarnings < 0, 'positive': scope.row.dailyAppEarnings > 0 }">
                {{ scope.row.dailyAppEarnings }}
              </span>
            </template>
          </el-table-column>
          <el-table-column prop="totalAppEarnings" label="APP总收益" width="120">
            <template #default="scope">
              <span :class="{ 'negative': scope.row.totalAppEarnings < 0, 'positive': scope.row.totalAppEarnings > 0 }">
                {{ scope.row.totalAppEarnings }}
              </span>
            </template>
          </el-table-column>
          <el-table-column label="收益占比" width="180">
            <template #default="scope">
              <el-progress 
                :percentage="getPercentage(scope.row.totalAppEarnings)" 
                :color="getProgressColor(scope.row.totalAppEarnings)"
                :stroke-width="18"
              />
            </template>
          </el-table-column>
        </el-table>
      </div>
    </el-card>
  </div>
</template>

<script>
import { defineComponent, computed } from 'vue'
import { Bar } from 'vue-chartjs'
import { Chart as ChartJS, Title, Tooltip, Legend, BarElement, CategoryScale, LinearScale, ArcElement } from 'chart.js'
import { Pie } from 'vue-chartjs'

ChartJS.register(Title, Tooltip, Legend, BarElement, CategoryScale, LinearScale, ArcElement)

const PieChart = {
  name: 'PieChart',
  components: { Pie },
  props: {
    chartData: {
      type: Object,
      required: true
    }
  },
  setup(props) {
    const chartOptions = {
      responsive: true,
      maintainAspectRatio: false
    }
    
    return { chartOptions }
  },
  template: `
    <Pie 
      :data="chartData"
      :options="chartOptions"
      :height="200"
    />
  `
}

const BarChart = {
  name: 'BarChart',
  components: { Bar },
  props: {
    chartData: {
      type: Object,
      required: true
    }
  },
  setup(props) {
    const chartOptions = {
      responsive: true,
      maintainAspectRatio: false,
      scales: {
        y: {
          beginAtZero: true
        }
      }
    }
    
    return { chartOptions }
  },
  template: `
    <Bar 
      :data="chartData"
      :options="chartOptions"
      :height="200"
    />
  `
}

export default {
  name: 'App',
  components: {
    PieChart,
    BarChart
  },
  setup() {
    // 收益数据
    const earningsData = [
      { appName: '书旗小说', dailyAppEarnings: -1.7, totalAppEarnings: 0.02 },
      { appName: '番茄免费小说', dailyAppEarnings: 0, totalAppEarnings: 0.6 },
      { appName: '星空免费小说', dailyAppEarnings: 0.06, totalAppEarnings: 0.69 },
      { appName: '速看剧场', dailyAppEarnings: 0, totalAppEarnings: 0.04 },
      { appName: '番茄畅听', dailyAppEarnings: 0, totalAppEarnings: 0 },
      { appName: '七猫小说', dailyAppEarnings: 0, totalAppEarnings: 0.62 },
      { appName: '奇迹小说', dailyAppEarnings: -0.29, totalAppEarnings: 1.64 },
      { appName: '熊猫脑洞小说', dailyAppEarnings: 0.04, totalAppEarnings: 0.61 },
      { appName: '茄子小说', dailyAppEarnings: 0.04, totalAppEarnings: 0.78 },
      { appName: '快手', dailyAppEarnings: 0, totalAppEarnings: 0 },
      { appName: '枫以视频', dailyAppEarnings: 0.05, totalAppEarnings: 3.29 },
      { appName: '盛读', dailyAppEarnings: 0.39, totalAppEarnings: 5.32 },
      { appName: '西瓜视频', dailyAppEarnings: 0, totalAppEarnings: 0.04 },
      { appName: '悟空浏览器', dailyAppEarnings: 0, totalAppEarnings: 0.04 },
      { appName: 'UC浏览器', dailyAppEarnings: 0, totalAppEarnings: 2.28 },
      { appName: '浩看免费小说', dailyAppEarnings: 0.23, totalAppEarnings: 6.75 },
      { appName: '袋鼠点点短视频', dailyAppEarnings: 0.09, totalAppEarnings: 3.19 }
    ]

    // 计算总收益
    const totalEarnings = computed(() => {
      return '25.91'
    })

    // 为饼图准备数据
    const pieChartData = computed(() => {
      // 只显示总收益大于0.5的应用
      const filteredData = earningsData.filter(item => item.totalAppEarnings >= 0.5)
      
      return {
        labels: filteredData.map(item => item.appName),
        datasets: [
          {
            backgroundColor: [
              '#FF9F43', '#1E90FF', '#28C76F', '#EA5455', '#7367F0',
              '#00CFE8', '#9C8E53', '#6B7280', '#F59E0B', '#8B5CF6',
              '#EC4899', '#10B981', '#3B82F6', '#EF4444', '#6366F1'
            ],
            data: filteredData.map(item => item.totalAppEarnings)
          }
        ]
      }
    })

    // 为柱状图准备数据
    const barChartData = computed(() => {
      // 只显示日收益不为0的应用
      const filteredData = earningsData.filter(item => item.dailyAppEarnings !== 0)
      
      return {
        labels: filteredData.map(item => item.appName),
        datasets: [
          {
            label: 'APP日收益',
            backgroundColor: filteredData.map(item => 
              item.dailyAppEarnings > 0 ? '#28C76F' : '#EA5455'
            ),
            data: filteredData.map(item => item.dailyAppEarnings)
          }
        ]
      }
    })

    // 计算收益占比百分比
    const getPercentage = (value) => {
      const maxValue = Math.max(...earningsData.map(item => item.totalAppEarnings))
      return Math.round((value / maxValue) * 100)
    }

    // 获取进度条颜色
    const getProgressColor = (value) => {
      if (value <= 0) return '#EA5455'
      if (value < 1) return '#FF9F43'
      if (value < 3) return '#1E90FF'
      return '#28C76F'
    }

    return {
      earningsData,
      totalEarnings,
      pieChartData,
      barChartData,
      getPercentage,
      getProgressColor
    }
  }
}
</script>

<style>
body {
  margin: 0;
  padding: 0;
  font-family: 'PingFang SC', 'Microsoft YaHei', sans-serif;
  background-color: #f5f7fa;
}

.app-container {
  max-width: 1200px;
  margin: 20px auto;
  padding: 0 20px;
}

.earnings-card {
  border-radius: 12px;
  box-shadow: 0 4px 24px rgba(0, 0, 0, 0.1);
  overflow: hidden;
}

.card-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.card-header h1 {
  margin: 0;
  font-size: 24px;
  color: #333;
}

.total-earnings {
  display: flex;
  align-items: center;
  gap: 10px;
  font-size: 18px;
}

.total-earnings .amount {
  font-size: 28px;
  font-weight: bold;
  color: #28C76F;
}

.chart-container {
  display: flex;
  flex-wrap: wrap;
  gap: 20px;
  margin-bottom: 30px;
}

.chart-wrapper {
  flex: 1;
  min-width: 300px;
  height: 300px;
  padding: 15px;
  background-color: #fff;
  border-radius: 8px;
  box-shadow: 0 2px 12px rgba(0, 0, 0, 0.05);
}

.chart-wrapper h3 {
  margin-top: 0;
  text-align: center;
  color: #5e6c84;
}

.table-container {
  margin-top: 30px;
}

.table-container h3 {
  margin-bottom: 15px;
  color: #5e6c84;
}

.negative {
  color: #EA5455;
}

.positive {
  color: #28C76F;
}

@media (max-width: 768px) {
  .chart-wrapper {
    flex: 100%;
  }
  
  .card-header {
    flex-direction: column;
    align-items: flex-start;
    gap: 10px;
  }
}
</style>