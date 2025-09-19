import { useState, useEffect } from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { Badge } from "@/components/ui/badge";
import { Play, Pause, Square, AlertTriangle, CheckCircle } from "lucide-react";

interface AnalysisProgressProps {
  analysisType: string;
  onTerminate: () => void;
  onComplete: () => void;
}

const AnalysisProgress = ({ analysisType, onTerminate, onComplete }: AnalysisProgressProps) => {
  const [progress, setProgress] = useState(0);
  const [isRunning, setIsRunning] = useState(true);
  const [currentPhase, setCurrentPhase] = useState("Initializing");
  const [detections, setDetections] = useState(0);
  const [threats, setThreats] = useState(0);

  const phases = [
    "Initializing analysis modules",
    "Processing video frames",
    "Running AI detection algorithms", 
    "Analyzing behavioral patterns",
    "Cross-referencing threat databases",
    "Generating comprehensive report",
    "Analysis complete"
  ];

  useEffect(() => {
    if (!isRunning) return;

    const interval = setInterval(() => {
      setProgress(prev => {
        const newProgress = prev + Math.random() * 3;
        
        // Update phase based on progress
        const phaseIndex = Math.min(Math.floor(newProgress / 15), phases.length - 1);
        setCurrentPhase(phases[phaseIndex]);
        
        // Simulate detections
        if (Math.random() > 0.7) {
          setDetections(prev => prev + 1);
        }
        if (Math.random() > 0.9) {
          setThreats(prev => prev + 1);
        }

        // Complete at 100%
        if (newProgress >= 100) {
          setCurrentPhase("Analysis complete");
          setIsRunning(false);
          setTimeout(() => onComplete(), 1000);
          return 100;
        }
        
        return newProgress;
      });
    }, 800);

    return () => clearInterval(interval);
  }, [isRunning, onComplete, phases]);

  const handleTerminate = () => {
    setIsRunning(false);
    onTerminate();
  };

  const getAnalysisTypeLabel = (type: string) => {
    switch (type) {
      case 'object-detection': return 'Object Detection';
      case 'facial-recognition': return 'Facial Recognition';
      case 'suspicious-activity': return 'Suspicious Activity Detection';
      case 'all': return 'Complete Analysis';
      default: return 'Analysis';
    }
  };

  return (
    <Card className="p-6">
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center space-x-2">
          <div className={`w-3 h-3 rounded-full ${isRunning ? 'bg-primary animate-pulse-glow' : 'bg-success'}`} />
          <h3 className="text-lg font-semibold text-foreground">
            {getAnalysisTypeLabel(analysisType)} in Progress
          </h3>
        </div>
        <Badge variant="outline" className={isRunning ? "text-primary border-primary" : "text-success border-success"}>
          {isRunning ? "Running" : "Complete"}
        </Badge>
      </div>

      {/* Progress Bar */}
      <div className="mb-6">
        <div className="flex items-center justify-between mb-2">
          <span className="text-sm text-muted-foreground">{currentPhase}</span>
          <span className="text-sm font-mono text-foreground">{Math.round(progress)}%</span>
        </div>
        <Progress value={progress} className="h-2" />
      </div>

      {/* Statistics */}
      <div className="grid grid-cols-2 gap-4 mb-6">
        <Card className="p-3 bg-card/30">
          <div className="flex items-center space-x-2">
            <CheckCircle className="h-4 w-4 text-success" />
            <div>
              <div className="text-lg font-bold text-foreground">{detections}</div>
              <div className="text-xs text-muted-foreground">Detections</div>
            </div>
          </div>
        </Card>
        <Card className="p-3 bg-card/30">
          <div className="flex items-center space-x-2">
            <AlertTriangle className="h-4 w-4 text-warning" />
            <div>
              <div className="text-lg font-bold text-foreground">{threats}</div>
              <div className="text-xs text-muted-foreground">Threats</div>
            </div>
          </div>
        </Card>
      </div>

      {/* Controls */}
      <div className="flex items-center space-x-3">
        {isRunning ? (
          <>
            <Button
              variant="outline"
              size="sm"
              onClick={() => setIsRunning(!isRunning)}
              className="hover:border-warning hover:text-warning"
            >
              <Pause className="h-4 w-4 mr-2" />
              Pause
            </Button>
            <Button
              variant="destructive"
              size="sm"
              onClick={handleTerminate}
              className="hover:bg-destructive/80"
            >
              <Square className="h-4 w-4 mr-2" />
              Terminate & Generate Report
            </Button>
          </>
        ) : (
          <Button
            variant="outline"
            size="sm"
            onClick={() => setIsRunning(true)}
            className="hover:border-primary hover:text-primary"
          >
            <Play className="h-4 w-4 mr-2" />
            Resume
          </Button>
        )}
      </div>

      {progress === 100 && (
        <div className="mt-4 p-3 rounded-lg bg-success/10 border border-success/20">
          <div className="flex items-center space-x-2">
            <CheckCircle className="h-5 w-5 text-success" />
            <span className="text-sm text-success font-medium">
              Analysis completed successfully! Report generated.
            </span>
          </div>
        </div>
      )}
    </Card>
  );
};

export default AnalysisProgress;