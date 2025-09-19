import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Activity, Eye, Shield, TrendingUp, Upload, History, FileText } from "lucide-react";

interface AnalysisCenterProps {
  onUploadClick: () => void;
}

const AnalysisCenter = ({ onUploadClick }: AnalysisCenterProps) => {
  const stats = [
    {
      title: "Active Streams",
      value: "24",
      subtitle: "32",
      change: "+2 vs yesterday",
      icon: Activity,
      color: "text-primary",
    },
    {
      title: "Threat Detection",
      value: "99.7%",
      subtitle: "100%",
      change: "+0.3% vs yesterday",
      icon: Shield,
      color: "text-success",
    },
    {
      title: "System Health",
      value: "Optimal",
      subtitle: "100%",
      change: "Stable vs yesterday",
      icon: Eye,
      color: "text-success",
    },
    {
      title: "Alerts Today",
      value: "7",
      subtitle: "Critical: 2",
      change: "-3 vs yesterday",
      icon: TrendingUp,
      color: "text-warning",
    },
  ];

  return (
    <Card className="p-6">
      <div className="flex items-center space-x-2 mb-6">
        <Activity className="h-5 w-5 text-primary" />
        <h2 className="text-xl font-semibold text-foreground">Analysis Center</h2>
      </div>
      
      <p className="text-muted-foreground mb-6">
        AI-powered video forensics and threat assessment
      </p>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
        {stats.map((stat, index) => {
          const Icon = stat.icon;
          return (
            <Card key={index} className="p-4 bg-card/50 border-border hover:border-primary/50 transition-colors">
              <div className="flex items-center justify-between mb-2">
                <span className="text-sm text-muted-foreground">{stat.title}</span>
                <Icon className={`h-4 w-4 ${stat.color}`} />
              </div>
              <div className="space-y-1">
                <div className="text-2xl font-bold text-foreground">{stat.value}</div>
                <div className="text-sm text-muted-foreground">{stat.subtitle}</div>
                <div className="text-xs text-muted-foreground">{stat.change}</div>
              </div>
            </Card>
          );
        })}
      </div>

      {/* Action Buttons */}
      <div className="flex flex-wrap gap-3">
        <Button
          onClick={onUploadClick}
          className="bg-gradient-primary hover:shadow-glow-primary transition-all duration-300"
        >
          <Upload className="h-4 w-4 mr-2" />
          Upload & Analyze
        </Button>
        <Button variant="outline" className="hover:border-primary hover:text-primary">
          <History className="h-4 w-4 mr-2" />
          History
        </Button>
        <Button variant="outline" className="hover:border-primary hover:text-primary">
          <FileText className="h-4 w-4 mr-2" />
          Reports
        </Button>
      </div>
    </Card>
  );
};

export default AnalysisCenter;