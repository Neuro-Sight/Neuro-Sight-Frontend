import { useState, useEffect } from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { ScrollArea } from "@/components/ui/scroll-area";
import { FileText, Download, Clock, AlertTriangle } from "lucide-react";

interface ReportEntry {
  timestamp: string;
  type: 'detection' | 'analysis' | 'threat' | 'summary';
  severity: 'low' | 'medium' | 'high' | 'critical';
  content: string;
  details?: string;
}

interface ReportPanelProps {
  isAnalyzing: boolean;
  analysisType: string;
}

const ReportPanel = ({ isAnalyzing, analysisType }: ReportPanelProps) => {
  const [reportEntries, setReportEntries] = useState<ReportEntry[]>([]);
  const [startTime] = useState(new Date());

  useEffect(() => {
    // Initialize with analysis start entry
    const initialEntry: ReportEntry = {
      timestamp: new Date().toLocaleTimeString(),
      type: 'analysis',
      severity: 'medium',
      content: `Analysis initiated: ${getAnalysisTypeLabel(analysisType)}`,
      details: 'System parameters optimized for selected analysis type'
    };
    
    setReportEntries([initialEntry]);
  }, [analysisType]);

  useEffect(() => {
    if (!isAnalyzing) return;

    const interval = setInterval(() => {
      const entries = generateReportEntry(analysisType);
      setReportEntries(prev => [...prev, ...entries]);
    }, 2000);

    return () => clearInterval(interval);
  }, [isAnalyzing, analysisType]);

  const getAnalysisTypeLabel = (type: string) => {
    switch (type) {
      case 'object-detection': return 'Object Detection Analysis';
      case 'facial-recognition': return 'Facial Recognition Analysis';
      case 'suspicious-activity': return 'Suspicious Activity Detection';
      case 'all': return 'Complete Multi-Modal Analysis';
      default: return 'Standard Analysis';
    }
  };

  const generateReportEntry = (type: string): ReportEntry[] => {
    const templates = {
      'object-detection': [
        { content: 'Vehicle detected: Sedan, License plate partially visible', severity: 'low' as const },
        { content: 'Person detected: Individual walking, normal gait pattern', severity: 'low' as const },
        { content: 'Unidentified object: Large bag left unattended', severity: 'medium' as const },
        { content: 'Multiple vehicles in frame: Traffic pattern analysis', severity: 'low' as const },
      ],
      'facial-recognition': [
        { content: 'Face detected: Processing biometric markers', severity: 'low' as const },
        { content: 'Individual identified: Cross-referencing database', severity: 'medium' as const },
        { content: 'Unknown individual: No database match found', severity: 'medium' as const },
        { content: 'Facial expression analysis: Stress indicators detected', severity: 'high' as const },
      ],
      'suspicious-activity': [
        { content: 'Loitering detected: Individual stationary for 3+ minutes', severity: 'medium' as const },
        { content: 'Rapid movement: Running pattern detected', severity: 'medium' as const },
        { content: 'Unusual behavior: Repetitive motion patterns', severity: 'high' as const },
        { content: 'Group formation: Multiple individuals converging', severity: 'high' as const },
      ],
      'all': [
        { content: 'Multi-modal analysis: Cross-referencing all detection systems', severity: 'medium' as const },
        { content: 'Threat correlation: Combining facial and behavioral data', severity: 'high' as const },
        { content: 'Environmental analysis: Weather and lighting conditions optimal', severity: 'low' as const },
        { content: 'System performance: All modules operating at 98.7% efficiency', severity: 'low' as const },
      ]
    };

    const typeTemplates = templates[type as keyof typeof templates] || templates.all;
    const randomTemplate = typeTemplates[Math.floor(Math.random() * typeTemplates.length)];
    
    return [{
      timestamp: new Date().toLocaleTimeString(),
      type: Math.random() > 0.7 ? 'threat' : 'detection',
      severity: randomTemplate.severity,
      content: randomTemplate.content,
      details: `Frame: ${Math.floor(Math.random() * 1000) + 1}, Confidence: ${(Math.random() * 15 + 85).toFixed(1)}%`
    }];
  };

  const getSeverityColor = (severity: string) => {
    switch (severity) {
      case 'critical': return 'text-critical border-critical';
      case 'high': return 'text-destructive border-destructive';
      case 'medium': return 'text-warning border-warning';
      case 'low': return 'text-success border-success';
      default: return 'text-muted-foreground border-border';
    }
  };

  const getSeverityIcon = (severity: string) => {
    switch (severity) {
      case 'critical':
      case 'high': return <AlertTriangle className="h-4 w-4" />;
      case 'medium': return <Clock className="h-4 w-4" />;
      default: return <FileText className="h-4 w-4" />;
    }
  };

  const generatePDFReport = () => {
    const reportContent = `
NEURO SIGHT - ANALYSIS REPORT
Generated: ${new Date().toLocaleString()}
Analysis Type: ${getAnalysisTypeLabel(analysisType)}
Duration: ${Math.floor((Date.now() - startTime.getTime()) / 1000)} seconds

EXECUTIVE SUMMARY:
${reportEntries.length} total events detected
${reportEntries.filter(e => e.severity === 'high').length} high priority alerts
${reportEntries.filter(e => e.severity === 'medium').length} medium priority alerts
${reportEntries.filter(e => e.severity === 'low').length} low priority events

DETAILED TIMELINE:
${reportEntries.map(entry => 
  `[${entry.timestamp}] ${entry.content.toUpperCase()}
   Severity: ${entry.severity.toUpperCase()}
   ${entry.details || 'No additional details'}
  `
).join('\n')}

RECOMMENDATIONS:
- Review high priority alerts for immediate action
- Monitor identified individuals and objects
- Continue surveillance in detected threat zones
- Update security protocols based on findings
    `;

    const blob = new Blob([reportContent], { type: 'text/plain' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `neuro-sight-report-${Date.now()}.txt`;
    a.click();
    URL.revokeObjectURL(url);
  };

  return (
    <Card className="h-full flex flex-col">
      <div className="p-4 border-b border-border">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <FileText className="h-5 w-5 text-primary" />
            <h3 className="text-lg font-semibold text-foreground">Analysis Report</h3>
            {isAnalyzing && (
              <Badge variant="outline" className="text-primary border-primary animate-pulse">
                Live
              </Badge>
            )}
          </div>
          <Button
            variant="outline"
            size="sm"
            onClick={generatePDFReport}
            disabled={reportEntries.length === 0}
            className="hover:bg-primary hover:text-primary-foreground transition-colors"
          >
            <Download className="h-4 w-4 mr-2" />
            Export Report
          </Button>
        </div>
        <p className="text-sm text-muted-foreground mt-1">
          {getAnalysisTypeLabel(analysisType)} • {reportEntries.length} events logged
        </p>
      </div>

      <ScrollArea className="flex-1 p-4">
        <div className="space-y-3">
          {reportEntries.map((entry, index) => (
            <div
              key={index}
              className={`p-3 rounded-lg border bg-card/50 transition-all duration-300 animate-slide-up ${getSeverityColor(entry.severity)}`}
              style={{ animationDelay: `${index * 100}ms` }}
            >
              <div className="flex items-start space-x-3">
                <div className={`mt-0.5 ${getSeverityColor(entry.severity)}`}>
                  {getSeverityIcon(entry.severity)}
                </div>
                <div className="flex-1">
                  <div className="flex items-center justify-between mb-1">
                    <Badge variant="outline" className={`text-xs ${getSeverityColor(entry.severity)}`}>
                      {entry.severity.toUpperCase()}
                    </Badge>
                    <span className="text-xs text-muted-foreground font-mono">
                      {entry.timestamp}
                    </span>
                  </div>
                  <p className="text-sm text-foreground font-medium mb-1">
                    {entry.content}
                  </p>
                  {entry.details && (
                    <p className="text-xs text-muted-foreground">
                      {entry.details}
                    </p>
                  )}
                </div>
              </div>
            </div>
          ))}
          
          {reportEntries.length === 0 && (
            <div className="text-center py-8">
              <FileText className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
              <p className="text-muted-foreground">
                No analysis data yet. Start analysis to generate report.
              </p>
            </div>
          )}
        </div>
      </ScrollArea>
    </Card>
  );
};

export default ReportPanel; 