import { useEffect, useState } from "react";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

interface ThreatPoint {
  id: string;
  x: number;
  y: number;
  severity: 'low' | 'medium' | 'high' | 'critical';
  timestamp: Date;
  description: string;
}

interface ThreatHeatMapProps {
  isAnalyzing?: boolean;
}

const ThreatHeatMap = ({ isAnalyzing = false }: ThreatHeatMapProps) => {
  const [threats, setThreats] = useState<ThreatPoint[]>([
    {
      id: '1',
      x: 15,
      y: 25,
      severity: 'high',
      timestamp: new Date(Date.now() - 1000 * 60 * 2),
      description: 'Suspicious movement detected'
    },
    {
      id: '2',
      x: 65, 
      y: 40,
      severity: 'medium',
      timestamp: new Date(Date.now() - 1000 * 60 * 5),
      description: 'Unidentified object'
    },
    {
      id: '3',
      x: 45,
      y: 70,
      severity: 'low',
      timestamp: new Date(Date.now() - 1000 * 60 * 8),
      description: 'Motion anomaly'
    },
  ]);

  const [lastDetection, setLastDetection] = useState(new Date());

  useEffect(() => {
    if (!isAnalyzing) return;

    const interval = setInterval(() => {
      // Simulate new threat detection during analysis
      const newThreat: ThreatPoint = {
        id: Date.now().toString(),
        x: Math.random() * 80 + 10,
        y: Math.random() * 60 + 20,
        severity: ['low', 'medium', 'high'][Math.floor(Math.random() * 3)] as any,
        timestamp: new Date(),
        description: 'Real-time detection'
      };

      setThreats(prev => [...prev.slice(-4), newThreat]);
      setLastDetection(new Date());
    }, 3000);

    return () => clearInterval(interval);
  }, [isAnalyzing]);

  const getSeverityColor = (severity: string) => {
    switch (severity) {
      case 'critical': return 'bg-critical border-critical text-critical-foreground';
      case 'high': return 'bg-destructive border-destructive text-destructive-foreground';
      case 'medium': return 'bg-warning border-warning text-background';
      case 'low': return 'bg-success border-success text-background';
      default: return 'bg-muted border-muted text-muted-foreground';
    }
  };

  const getSeverityDot = (severity: string) => {
    switch (severity) {
      case 'critical': return 'bg-critical shadow-[0_0_20px_hsl(var(--critical))]';
      case 'high': return 'bg-destructive shadow-[0_0_15px_hsl(var(--destructive))]';
      case 'medium': return 'bg-warning shadow-[0_0_10px_hsl(var(--warning))]';
      case 'low': return 'bg-success shadow-[0_0_8px_hsl(var(--success))]';
      default: return 'bg-muted';
    }
  };

  return (
    <Card className="p-6">
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center space-x-2">
          <div className="w-3 h-3 rounded-full bg-primary animate-pulse-glow" />
          <h3 className="text-lg font-semibold text-foreground">Threat Heat Map</h3>
        </div>
        <div className="text-sm text-muted-foreground">
          Last detection: {lastDetection.toLocaleTimeString()}
        </div>
      </div>

      <p className="text-sm text-muted-foreground mb-4">
        Real-time threat distribution across monitored zones
      </p>

      {/* Heat Map Visualization */}
      <div className="relative bg-gradient-dark rounded-lg border border-border h-64 mb-4 overflow-hidden">
        {/* Grid overlay */}
        <div className="absolute inset-0 opacity-20">
          {Array.from({ length: 8 }).map((_, i) => (
            <div key={i} className="absolute border-l border-primary/20" style={{ left: `${(i + 1) * 12.5}%`, height: '100%' }} />
          ))}
          {Array.from({ length: 6 }).map((_, i) => (
            <div key={i} className="absolute border-t border-primary/20" style={{ top: `${(i + 1) * 16.67}%`, width: '100%' }} />
          ))}
        </div>

        {/* Threat points */}
        {threats.map((threat) => (
          <div
            key={threat.id}
            className="absolute transform -translate-x-1/2 -translate-y-1/2 group cursor-pointer"
            style={{ left: `${threat.x}%`, top: `${threat.y}%` }}
          >
            <div className={`w-4 h-4 rounded-full ${getSeverityDot(threat.severity)} animate-pulse`} />
            
            {/* Tooltip */}
            <div className="absolute bottom-6 left-1/2 transform -translate-x-1/2 bg-card border border-border rounded-lg p-2 opacity-0 group-hover:opacity-100 transition-opacity duration-200 whitespace-nowrap z-10">
              <p className="text-xs font-medium text-foreground">{threat.description}</p>
              <p className="text-xs text-muted-foreground">{threat.timestamp.toLocaleTimeString()}</p>
            </div>
          </div>
        ))}

        {/* Zone indicators */}
        <div className="absolute bottom-2 left-2">
          <Badge variant="outline" className="text-xs">
            {threats.length} Active Zones
          </Badge>
        </div>
      </div>

      {/* Legend */}
      <div className="flex items-center justify-between text-xs">
        <div className="flex items-center space-x-4">
          <div className="flex items-center space-x-1">
            <div className="w-2 h-2 rounded-full bg-success" />
            <span className="text-muted-foreground">Low Activity</span>
          </div>
          <div className="flex items-center space-x-1">
            <div className="w-2 h-2 rounded-full bg-warning" />
            <span className="text-muted-foreground">Medium Activity</span>
          </div>
          <div className="flex items-center space-x-1">
            <div className="w-2 h-2 rounded-full bg-destructive" />
            <span className="text-muted-foreground">High Activity</span>
          </div>
        </div>
        
        <div className="flex items-center space-x-2">
          <Badge variant="outline" className={getSeverityColor('low')}>
            {threats.filter(t => t.severity === 'low').length} Low Priority
          </Badge>
          <Badge variant="outline" className={getSeverityColor('medium')}>
            {threats.filter(t => t.severity === 'medium').length} Medium Priority
          </Badge>
          <Badge variant="outline" className={getSeverityColor('high')}>
            {threats.filter(t => t.severity === 'high').length} High Priority
          </Badge>
        </div>
      </div>
    </Card>
  );
};

export default ThreatHeatMap;