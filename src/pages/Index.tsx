import { useState } from "react";
import { Upload } from "lucide-react";
import NeuroSightTitle from "@/components/NeuroSightTitle";
import AnalysisOptions from "@/components/AnalysisOptions";
import AnalysisCenter from "@/components/AnalysisCenter";
import ThreatHeatMap from "@/components/ThreatHeatMap";
import SystemAlerts from "@/components/SystemAlerts";
import ReportPanel from "@/components/ReportPanel";
import AnalysisProgress from "@/components/AnalysisProgress";
import ImageUpload from "@/components/ImageUpload";

type AppState = 'home' | 'options' | 'analyzing' | 'completed';

const Index = () => {
  const [currentState, setCurrentState] = useState<AppState>('home');
  const [selectedAnalysisType, setSelectedAnalysisType] = useState<string>('');
  const [uploadedVideo, setUploadedVideo] = useState<File | null>(null);
  const [showImageUpload, setShowImageUpload] = useState(false);
  const [uploadedReferenceImage, setUploadedReferenceImage] = useState<File | null>(null);

  const handleUploadClick = () => {
    setCurrentState('options');
  };

  const handleOptionSelect = (option: string) => {
    setSelectedAnalysisType(option);
    
    // Show image upload for facial recognition or complete analysis
    if (option === 'facial-recognition' || option === 'all') {
      setShowImageUpload(true);
    } else {
      setCurrentState('analyzing');
    }
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
    setUploadedVideo(null);
    setUploadedReferenceImage(null);
  };

  const handleVideoUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file && file.type.startsWith('video/')) {
      setUploadedVideo(file);
    }
  };

  const handleImageUploaded = (image: File) => {
    setUploadedReferenceImage(image);
    setCurrentState('analyzing');
  };

  const handleCloseImageUpload = () => {
    setShowImageUpload(false);
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

      {/* Image Upload Modal */}
      {showImageUpload && (
        <ImageUpload
          onClose={handleCloseImageUpload}
          onImageUploaded={handleImageUploaded}
          analysisType={selectedAnalysisType}
        />
      )}

      {/* Main Content */}
      <div className="container mx-auto px-4 py-6">
        {/* Title Section */}
        <NeuroSightTitle />

        {/* Video Upload & Analysis Controls (Home State) */}
        {currentState === 'home' && (
          <div className="flex flex-col items-center space-y-4 mb-8">
            {/* Video Upload */}
            <div className="flex flex-col items-center space-y-3">
              <label className="flex flex-col items-center px-6 py-4 border-2 border-dashed border-border rounded-lg cursor-pointer hover:border-primary transition-colors">
                <Upload className="h-8 w-8 text-muted-foreground mb-2" />
                <span className="text-sm text-muted-foreground">
                  {uploadedVideo ? uploadedVideo.name : "Upload Video File"}
                </span>
                <input
                  type="file"
                  accept="video/*"
                  onChange={handleVideoUpload}
                  className="hidden"
                />
              </label>
              {uploadedVideo && (
                <div className="text-xs text-success">
                  ✓ Video uploaded: {uploadedVideo.name}
                </div>
              )}
            </div>

            {/* Upload & Analyze Button */}
            <button
              onClick={handleUploadClick}
              disabled={!uploadedVideo}
              className="px-8 py-3 bg-gradient-primary text-primary-foreground rounded-lg font-semibold text-lg hover:shadow-glow-primary transition-all duration-300 transform hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none"
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
