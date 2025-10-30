import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { AlertTriangle, X, Clock, Activity, Monitor } from "lucide-react";

const SystemAlerts = () => {
  const alerts = [
    {
      id: 1,
      level: "HIGH",
      source: "Upload Queue",
      title: "Analysis Complete - High Priority",
      description: "Security footage analysis revealed suspicious activity patterns",
      time: "1:10:49 AM ago",
      detection: "Detection: 1250ms",
      icon: AlertTriangle,
      levelColor: "bg-destructive text-destructive-foreground",
    },
    {
      id: 2,
      level: "MEDIUM", 
      source: "Analysis Engine",
      title: "New Upload Processing",
      description: "entrance_cam_morning.mp4 is currently being analyzed",
      time: "1:01:49 AM ago",
      detection: "Detection: 850ms",
      icon: Activity,
      levelColor: "bg-warning text-background",
    },
    {
      id: 3,
      level: "LOW",
      source: "System Monitor",
      title: "System Health Check",
      description: "All AI analysis modules operating within normal parameters",
      time: "12:13:49 AM ago",
      detection: "Detection: 2100ms",
      icon: Monitor,
      levelColor: "bg-info text-background",
    },
  ];

  return (
    <Card className="p-6">
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center space-x-2">
          <AlertTriangle className="h-5 w-5 text-warning" />
          <h3 className="text-lg font-semibold text-foreground">System Alerts</h3>
        </div>
        <Badge variant="outline" className="text-warning border-warning">
          3 Active
        </Badge>
      </div>

      <div className="space-y-4">
        {alerts.map((alert) => {
          const Icon = alert.icon;
          return (
            <Card key={alert.id} className="p-4 bg-card/30 border-border hover:border-primary/30 transition-colors">
              <div className="flex items-start justify-between">
                <div className="flex-1">
                  <div className="flex items-center space-x-3 mb-2">
                    <Badge className={`text-xs font-bold ${alert.levelColor}`}>
                      {alert.level}
                    </Badge>
                    <span className="text-sm text-muted-foreground">{alert.source}</span>
                  </div>
                  
                  <h4 className="font-semibold text-foreground mb-1">
                    {alert.title}
                  </h4>
                  
                  <p className="text-sm text-muted-foreground mb-3">
                    {alert.description}
                  </p>
                  
                  <div className="flex items-center space-x-4 text-xs text-muted-foreground">
                    <div className="flex items-center space-x-1">
                      <Clock className="h-3 w-3" />
                      <span>{alert.time}</span>
                    </div>
                    <span>{alert.detection}</span>
                  </div>
                </div>
                
                <div className="flex items-center space-x-2 ml-4">
                  <Icon className="h-5 w-5 text-muted-foreground" />
                  <Button variant="ghost" size="sm" className="h-8 w-8 p-0">
                    <X className="h-4 w-4" />
                  </Button>
                </div>
              </div>
            </Card>
          );
        })}
      </div>
    </Card>
  );
};

export default SystemAlerts;