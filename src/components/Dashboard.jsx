
import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { studentAnalyticsAPI } from '../api/studentAnalytics';
import { geographicAPI } from '../api/geographicAPI';
import { predictiveAPI } from '../api/predictiveAPI';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, PieChart, Pie, Cell, BarChart, Bar } from 'recharts';
import { TrendingUp, Users, AlertTriangle, Globe, Brain, Activity, MapPin } from 'lucide-react';

const Dashboard = () => {
  const [performanceData, setPerformanceData] = useState(null);
  const [riskHeatMap, setRiskHeatMap] = useState(null);
  const [departmentData, setDepartmentData] = useState(null);
  const [globeData, setGlobeData] = useState(null);
  const [aiInsights, setAiInsights] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchDashboardData = async () => {
      try {
        const [performance, risk, departments, globe, insights] = await Promise.all([
          studentAnalyticsAPI.getPerformanceTrends(),
          studentAnalyticsAPI.getRiskHeatMap(),
          studentAnalyticsAPI.getDepartmentDistribution(),
          geographicAPI.getGlobeData(),
          predictiveAPI.getAIInsights()
        ]);

        setPerformanceData(performance.data);
        setRiskHeatMap(risk.data);
        setDepartmentData(departments.data);
        setGlobeData(globe.data);
        setAiInsights(insights.data);
      } catch (error) {
        console.error('Error fetching dashboard data:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchDashboardData();
  }, []);

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="text-center">
          <div className="w-16 h-16 border-4 border-blue-500/20 border-t-blue-500 rounded-full animate-spin mb-4 mx-auto"></div>
          <p className="text-xl font-bold bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">
            Loading Analytics...
          </p>
        </div>
      </div>
    );
  }

  const COLORS = ['#3b82f6', '#8b5cf6', '#06b6d4', '#10b981', '#f59e0b', '#ef4444'];

  return (
    <div className="space-y-8 p-6">
      {/* Header Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <Card className="glass-card neon-glow">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-white">Total Students</CardTitle>
            <Users className="h-4 w-4 text-blue-400" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-white">3,750</div>
            <p className="text-xs text-green-400">+12% from last month</p>
          </CardContent>
        </Card>

        <Card className="glass-card neon-glow">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-white">At Risk</CardTitle>
            <AlertTriangle className="h-4 w-4 text-red-400" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-white">567</div>
            <p className="text-xs text-red-400">-5% improved</p>
          </CardContent>
        </Card>

        <Card className="glass-card neon-glow">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-white">Global Reach</CardTitle>
            <Globe className="h-4 w-4 text-cyan-400" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-white">44</div>
            <p className="text-xs text-cyan-400">Universities</p>
          </CardContent>
        </Card>

        <Card className="glass-card neon-glow">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-white">AI Accuracy</CardTitle>
            <Brain className="h-4 w-4 text-purple-400" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-white">89.2%</div>
            <p className="text-xs text-purple-400">Model v2.1.3</p>
          </CardContent>
        </Card>
      </div>

      {/* Performance Trends */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card className="glass-card">
          <CardHeader>
            <CardTitle className="text-white flex items-center gap-2">
              <TrendingUp className="h-5 w-5 text-blue-400" />
              Student Performance Trends
            </CardTitle>
            <CardDescription className="text-gray-300">
              GPA and Attendance trends over time
            </CardDescription>
          </CardHeader>
          <CardContent>
            {performanceData && (
              <ResponsiveContainer width="100%" height={300}>
                <LineChart data={performanceData.datasets[0].data.map((value, index) => ({
                  month: performanceData.labels[index],
                  gpa: value,
                  attendance: performanceData.datasets[1].data[index]
                }))}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#374151" />
                  <XAxis dataKey="month" stroke="#9ca3af" />
                  <YAxis stroke="#9ca3af" />
                  <Tooltip 
                    contentStyle={{ 
                      backgroundColor: '#1f2937', 
                      border: '1px solid #374151',
                      borderRadius: '8px',
                      color: '#ffffff'
                    }} 
                  />
                  <Line type="monotone" dataKey="gpa" stroke="#3b82f6" strokeWidth={3} dot={{ fill: '#3b82f6', strokeWidth: 2, r: 6 }} />
                  <Line type="monotone" dataKey="attendance" stroke="#8b5cf6" strokeWidth={3} dot={{ fill: '#8b5cf6', strokeWidth: 2, r: 6 }} />
                </LineChart>
              </ResponsiveContainer>
            )}
          </CardContent>
        </Card>

        <Card className="glass-card">
          <CardHeader>
            <CardTitle className="text-white flex items-center gap-2">
              <Activity className="h-5 w-5 text-green-400" />
              Department Distribution
            </CardTitle>
            <CardDescription className="text-gray-300">
              Student distribution across departments
            </CardDescription>
          </CardHeader>
          <CardContent>
            {departmentData && (
              <ResponsiveContainer width="100%" height={300}>
                <PieChart>
                  <Pie
                    data={departmentData.chartData}
                    cx="50%"
                    cy="50%"
                    outerRadius={100}
                    fill="#8884d8"
                    dataKey="value"
                    label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                  >
                    {departmentData.chartData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                    ))}
                  </Pie>
                  <Tooltip 
                    contentStyle={{ 
                      backgroundColor: '#1f2937', 
                      border: '1px solid #374151',
                      borderRadius: '8px',
                      color: '#ffffff'
                    }} 
                  />
                </PieChart>
              </ResponsiveContainer>
            )}
          </CardContent>
        </Card>
      </div>

      {/* Risk Analysis */}
      <Card className="glass-card">
        <CardHeader>
          <CardTitle className="text-white flex items-center gap-2">
            <AlertTriangle className="h-5 w-5 text-red-400" />
            Risk Analysis Heatmap
          </CardTitle>
          <CardDescription className="text-gray-300">
            Risk distribution across departments and academic years
          </CardDescription>
        </CardHeader>
        <CardContent>
          {riskHeatMap && (
            <div className="grid grid-cols-3 gap-4">
              {['Computer Science', 'Mathematics', 'Physics'].map((dept) => (
                <div key={dept} className="space-y-2">
                  <h4 className="text-white font-medium text-center">{dept}</h4>
                  {['Year 1', 'Year 2', 'Year 3'].map((year) => {
                    const data = riskHeatMap.heatMapData.find(d => d.x === dept && d.y === year);
                    const riskColor = data?.risk === 'high' ? 'bg-red-500/30 border-red-500' : 
                                     data?.risk === 'medium' ? 'bg-yellow-500/30 border-yellow-500' : 
                                     'bg-green-500/30 border-green-500';
                    return (
                      <div key={year} className={`p-3 rounded-lg border ${riskColor} text-center`}>
                        <div className="text-white text-sm">{year}</div>
                        <div className="text-white font-bold">{data?.value}%</div>
                      </div>
                    );
                  })}
                </div>
              ))}
            </div>
          )}
        </CardContent>
      </Card>

      {/* Geographic Distribution */}
      <Card className="glass-card">
        <CardHeader>
          <CardTitle className="text-white flex items-center gap-2">
            <MapPin className="h-5 w-5 text-cyan-400" />
            Global Student Distribution
          </CardTitle>
          <CardDescription className="text-gray-300">
            Geographic spread of student demographics
          </CardDescription>
        </CardHeader>
        <CardContent>
          {globeData && (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {globeData.studentLocations.map((location, index) => (
                <div key={location.country} className="p-4 rounded-lg bg-white/5 border border-white/10">
                  <div className="flex justify-between items-start mb-2">
                    <h4 className="text-white font-semibold">{location.country}</h4>
                    <span className={`px-2 py-1 rounded text-xs ${
                      location.atRisk / location.students > 0.2 ? 'bg-red-500/20 text-red-300' :
                      location.atRisk / location.students > 0.1 ? 'bg-yellow-500/20 text-yellow-300' :
                      'bg-green-500/20 text-green-300'
                    }`}>
                      {((location.atRisk / location.students) * 100).toFixed(1)}% at risk
                    </span>
                  </div>
                  <div className="space-y-1 text-sm text-gray-300">
                    <div className="flex justify-between">
                      <span>Total Students:</span>
                      <span className="text-white">{location.students.toLocaleString()}</span>
                    </div>
                    <div className="flex justify-between">
                      <span>At Risk:</span>
                      <span className="text-red-300">{location.atRisk}</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Universities:</span>
                      <span className="text-cyan-300">{location.universities}</span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </CardContent>
      </Card>

      {/* AI Insights */}
      <Card className="glass-card">
        <CardHeader>
          <CardTitle className="text-white flex items-center gap-2">
            <Brain className="h-5 w-5 text-purple-400" />
            AI-Powered Insights
          </CardTitle>
          <CardDescription className="text-gray-300">
            Real-time AI analysis and recommendations
          </CardDescription>
        </CardHeader>
        <CardContent>
          {aiInsights && (
            <div className="space-y-4">
              {aiInsights.insights.map((insight, index) => (
                <div key={index} className={`p-4 rounded-lg border-l-4 ${
                  insight.severity === 'critical' ? 'bg-red-500/10 border-red-500' :
                  insight.severity === 'high' ? 'bg-orange-500/10 border-orange-500' :
                  insight.severity === 'positive' ? 'bg-green-500/10 border-green-500' :
                  'bg-blue-500/10 border-blue-500'
                }`}>
                  <div className="flex justify-between items-start mb-2">
                    <h4 className="text-white font-semibold">{insight.title}</h4>
                    <span className="text-sm text-gray-300">{insight.affectedStudents} students</span>
                  </div>
                  <p className="text-gray-300 text-sm mb-2">{insight.description}</p>
                  <p className="text-blue-300 text-sm font-medium">💡 {insight.recommendation}</p>
                </div>
              ))}
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
};

export default Dashboard;
