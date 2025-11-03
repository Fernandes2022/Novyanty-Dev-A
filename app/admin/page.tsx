'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import { Users, Globe, Zap, TrendingUp, Settings, Database, Activity, CheckCircle } from 'lucide-react';

export default function AdminPage() {
  const [loading, setLoading] = useState(false);

  const stats = [
    { icon: Users, label: "Total Users", value: "10,247", change: "+12%" },
    { icon: Globe, label: "Websites Created", value: "15,892", change: "+8%" },
    { icon: Zap, label: "Active Projects", value: "3,421", change: "+23%" },
    { icon: TrendingUp, label: "Conversion Rate", value: "4.2%", change: "+0.8%" }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-950 via-purple-950 to-slate-950 p-6">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-8"
        >
          <h1 className="text-4xl font-bold text-white mb-2 flex items-center gap-3">
            <Settings className="h-10 w-10 text-purple-400" />
            Admin Dashboard
          </h1>
          <p className="text-gray-400">Manage your platform and monitor performance</p>
        </motion.div>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          {stats.map((stat, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              className="glass-dark p-6 rounded-2xl"
            >
              <div className="flex items-center justify-between mb-4">
                <div className="p-3 bg-purple-500/10 rounded-xl">
                  <stat.icon className="h-6 w-6 text-purple-400" />
                </div>
                <span className="text-green-400 text-sm font-semibold">{stat.change}</span>
              </div>
              <div className="text-3xl font-bold text-white mb-1">{stat.value}</div>
              <div className="text-gray-400 text-sm">{stat.label}</div>
            </motion.div>
          ))}
        </div>

        {/* Actions Grid */}
        <div className="grid lg:grid-cols-2 gap-6">
          {/* Quick Actions */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.4 }}
            className="glass-dark p-8 rounded-3xl"
          >
            <h2 className="text-2xl font-bold text-white mb-6 flex items-center gap-2">
              <Zap className="h-6 w-6 text-purple-400" />
              Quick Actions
            </h2>
            
            <div className="space-y-4">
              <button
                onClick={() => setLoading(!loading)}
                className="w-full flex items-center justify-between p-4 glass-dark hover:bg-white/5 rounded-xl transition-colors group"
              >
                <div className="flex items-center gap-3">
                  <Database className="h-5 w-5 text-purple-400" />
                  <span className="text-white font-medium">Generate Testimonials</span>
                </div>
                <div className="text-gray-400 group-hover:text-purple-400 transition-colors">→</div>
              </button>

              <button className="w-full flex items-center justify-between p-4 glass-dark hover:bg-white/5 rounded-xl transition-colors group">
                <div className="flex items-center gap-3">
                  <Activity className="h-5 w-5 text-purple-400" />
                  <span className="text-white font-medium">View Analytics</span>
                </div>
                <div className="text-gray-400 group-hover:text-purple-400 transition-colors">→</div>
              </button>

              <button className="w-full flex items-center justify-between p-4 glass-dark hover:bg-white/5 rounded-xl transition-colors group">
                <div className="flex items-center gap-3">
                  <Users className="h-5 w-5 text-purple-400" />
                  <span className="text-white font-medium">Manage Users</span>
                </div>
                <div className="text-gray-400 group-hover:text-purple-400 transition-colors">→</div>
              </button>
            </div>
          </motion.div>

          {/* System Status */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.5 }}
            className="glass-dark p-8 rounded-3xl"
          >
            <h2 className="text-2xl font-bold text-white mb-6 flex items-center gap-2">
              <Activity className="h-6 w-6 text-purple-400" />
              System Status
            </h2>
            
            <div className="space-y-4">
              {[
                { service: "API Service", status: "Operational", uptime: "99.9%" },
                { service: "Database", status: "Operational", uptime: "100%" },
                { service: "CDN", status: "Operational", uptime: "99.8%" },
                { service: "Build System", status: "Operational", uptime: "99.7%" }
              ].map((item, index) => (
                <div key={index} className="flex items-center justify-between p-4 bg-white/5 rounded-xl">
                  <div className="flex items-center gap-3">
                    <CheckCircle className="h-5 w-5 text-green-400" />
                    <div>
                      <div className="text-white font-medium">{item.service}</div>
                      <div className="text-sm text-gray-400">{item.status}</div>
                    </div>
                  </div>
                  <div className="text-green-400 text-sm font-semibold">{item.uptime}</div>
                </div>
              ))}
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  );
}
