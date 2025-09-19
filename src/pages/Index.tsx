import { useState } from "react";
import NeuroSightTitle from "@/components/NeuroSightTitle";
import AnalysisOptions from "@/components/AnalysisOptions";
import AnalysisCenter from "@/components/AnalysisCenter";
import ThreatHeatMap from "@/components/ThreatHeatMap";
import SystemAlerts from "@/components/SystemAlerts";
import ReportPanel from "@/components/ReportPanel";
import AnalysisProgress from "@/components/AnalysisProgress";

type AppState = 'home' | 'options' | 'analyzing' | 'completed';

const Index = () => {
  const [currentState, setCurrentState] = useState<AppState>('home');
  const [selectedAnalysisType, setSelectedAnalysisType] = useState<string>('');

  const handleUploadClick = () => {
    setCurrentState('options');
  };

  const handleOptionSelect = (option: string) => {
    setSelectedAnalysisType(option);
    setCurrentState('analyzing');
  };

  const handleCancelOptions = () => {
    setCurrentState('home');
  };

  const handleTerminateAnalysis = () => {
    setCurrentState('completed');
  };

  const handleAnalysisComplete = () => {
    setCurrentState('completed');
  };

  const handleBackToHome = () => {
    setCurrentState('home');
    setSelectedAnalysisType('');
  };

  return (
    <div className="min-h-screen bg-background text-foreground">
      {/* Header with system time */}
      <div className="absolute top-4 right-4 text-sm text-muted-foreground font-mono">
        System Time: {new Date().toLocaleTimeString()}
      </div>

      {/* Analysis Options Modal */}
      {currentState === 'options' && (
        <AnalysisOptions
          onOptionSelect={handleOptionSelect}
          onCancel={handleCancelOptions}
        />
      )}

      {/* Main Content */}
      <div className="container mx-auto px-4 py-6">
        {/* Title Section */}
        <NeuroSightTitle />

        {/* Upload & Analyze Button (Home State) */}
        {currentState === 'home' && (
          <div className="flex justify-center mb-8">
            <button
              onClick={handleUploadClick}
              className="px-8 py-3 bg-gradient-primary text-primary-foreground rounded-lg font-semibold text-lg hover:shadow-glow-primary transition-all duration-300 transform hover:scale-105"
            >
              Upload & Analyze
            </button>
          </div>
        )}

        {/* Analysis State Controls */}
        {(currentState === 'analyzing' || currentState === 'completed') && (
          <div className="flex justify-center space-x-4 mb-8">
            <button
              onClick={handleBackToHome}
              className="px-6 py-2 border border-border rounded-lg text-foreground hover:border-primary hover:text-primary transition-colors"
            >
              Back to Home
            </button>
            {currentState === 'completed' && (
              <button
                onClick={() => setCurrentState('analyzing')}
                className="px-6 py-2 bg-gradient-primary text-primary-foreground rounded-lg hover:shadow-glow-primary transition-all duration-300"
              >
                New Analysis
              </button>
            )}
          </div>
        )}

        {/* Main Dashboard Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Left Column */}
          <div className="lg:col-span-2 space-y-6">
            {/* Analysis Center */}
            {currentState === 'home' && (
              <AnalysisCenter onUploadClick={handleUploadClick} />
            )}

            {/* Analysis Progress */}
            {currentState === 'analyzing' && (
              <AnalysisProgress
                analysisType={selectedAnalysisType}
                onTerminate={handleTerminateAnalysis}
                onComplete={handleAnalysisComplete}
              />
            )}

            {/* Threat Heat Map */}
            <ThreatHeatMap isAnalyzing={currentState === 'analyzing'} />
          </div>

          {/* Right Column */}
          <div className="space-y-6">
            {/* System Alerts */}
            {currentState === 'home' && <SystemAlerts />}

            {/* Report Panel */}
            {(currentState === 'analyzing' || currentState === 'completed') && (
              <ReportPanel
                isAnalyzing={currentState === 'analyzing'}
                analysisType={selectedAnalysisType}
              />
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Index;
