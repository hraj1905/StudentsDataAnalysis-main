
// Geographic and 3D Visualization API
export const geographicAPI = {
  // 3D Globe Visualization Data
  getGlobeData: async () => {
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve({
          success: true,
          data: {
            studentLocations: [
              { 
                country: 'India', 
                coordinates: [77.1025, 28.7041], 
                students: 1250, 
                atRisk: 187,
                universities: 15 
              },
              { 
                country: 'USA', 
                coordinates: [-74.0059, 40.7128], 
                students: 890, 
                atRisk: 134,
                universities: 12 
              },
              { 
                country: 'UK', 
                coordinates: [-0.1276, 51.5074], 
                students: 560, 
                atRisk: 78,
                universities: 8 
              },
              { 
                country: 'Canada', 
                coordinates: [-75.6972, 45.4215], 
                students: 320, 
                atRisk: 45,
                universities: 5 
              },
              { 
                country: 'Australia', 
                coordinates: [151.2093, -33.8688], 
                students: 280, 
                atRisk: 38,
                universities: 4 
              }
            ],
            heatMapPoints: [
              { lat: 28.7041, lng: 77.1025, intensity: 0.8 },
              { lat: 40.7128, lng: -74.0059, intensity: 0.6 },
              { lat: 51.5074, lng: -0.1276, intensity: 0.4 },
              { lat: 45.4215, lng: -75.6972, intensity: 0.3 },
              { lat: -33.8688, lng: 151.2093, intensity: 0.25 }
            ]
          }
        });
      }, 1200);
    });
  },

  // Geographic Distribution Demographics
  getDemographicDistribution: async (region = 'global') => {
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve({
          success: true,
          data: {
            regions: [
              {
                name: 'North America',
                totalStudents: 1210,
                riskBreakdown: { low: 726, medium: 363, high: 121 },
                demographics: {
                  ageRange: { '18-20': 45, '21-23': 35, '24+': 20 },
                  gender: { male: 52, female: 45, other: 3 },
                  background: { domestic: 78, international: 22 }
                }
              },
              {
                name: 'Europe',
                totalStudents: 890,
                riskBreakdown: { low: 534, medium: 267, high: 89 },
                demographics: {
                  ageRange: { '18-20': 50, '21-23': 30, '24+': 20 },
                  gender: { male: 48, female: 48, other: 4 },
                  background: { domestic: 85, international: 15 }
                }
              },
              {
                name: 'Asia Pacific',
                totalStudents: 1650,
                riskBreakdown: { low: 990, medium: 495, high: 165 },
                demographics: {
                  ageRange: { '18-20': 60, '21-23': 25, '24+': 15 },
                  gender: { male: 55, female: 42, other: 3 },
                  background: { domestic: 92, international: 8 }
                }
              }
            ],
            timeSeriesData: {
              labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun'],
              datasets: [
                {
                  label: 'At Risk Students',
                  data: [375, 390, 410, 425, 398, 375],
                  borderColor: '#ef4444',
                  backgroundColor: 'rgba(239, 68, 68, 0.1)'
                }
              ]
            }
          }
        });
      }, 1000);
    });
  },

  // Real-time Location Updates
  getRealTimeUpdates: async () => {
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve({
          success: true,
          data: {
            liveUpdates: [
              {
                timestamp: new Date().toISOString(),
                location: 'Mumbai, India',
                event: 'New student registration',
                riskLevel: 'low',
                details: 'Computer Science Department'
              },
              {
                timestamp: new Date(Date.now() - 5000).toISOString(),
                location: 'New York, USA',
                event: 'Risk status updated',
                riskLevel: 'medium',
                details: 'Attendance dropped below threshold'
              }
            ],
            activeRegions: [
              { region: 'Asia Pacific', activeUsers: 1250, trend: 'up' },
              { region: 'North America', activeUsers: 890, trend: 'stable' },
              { region: 'Europe', activeUsers: 560, trend: 'down' }
            ]
          }
        });
      }, 500);
    });
  }
};
