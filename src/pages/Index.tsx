import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Upload, LogOut, User } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import { Session } from "@supabase/supabase-js";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";
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
  const navigate = useNavigate();
  const [session, setSession] = useState<Session | null>(null);
  const [currentState, setCurrentState] = useState<AppState>('home');
  const [selectedAnalysisType, setSelectedAnalysisType] = useState<string>('');
  const [uploadedVideo, setUploadedVideo] = useState<File | null>(null);
  const [showImageUpload, setShowImageUpload] = useState(false);
  const [uploadedReferenceImage, setUploadedReferenceImage] = useState<File | null>(null);

  useEffect(() => {
    // Set up auth state listener
    const { data: { subscription } } = supabase.auth.onAuthStateChange(
      (_event, session) => {
        setSession(session);
      }
    );

    // Check for existing session
    supabase.auth.getSession().then(({ data: { session } }) => {
      setSession(session);
    });

    return () => subscription.unsubscribe();
  }, []);

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
    if (!session) {
      toast.error("Please login to upload videos");
      navigate("/auth");
      return;
    }
    
    const file = event.target.files?.[0];
    if (file && file.type.startsWith('video/')) {
      setUploadedVideo(file);
    }
  };

  const handleLogout = async () => {
    const { error } = await supabase.auth.signOut();
    if (error) {
      toast.error("Error logging out");
    } else {
      toast.success("Logged out successfully");
      setCurrentState('home');
      setUploadedVideo(null);
      setUploadedReferenceImage(null);
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
      {/* Header with auth and system time */}
      <div className="absolute top-4 right-4 flex items-center gap-4">
        {session ? (
          <div className="flex items-center gap-2">
            <div className="flex items-center gap-2 text-sm text-muted-foreground font-mono">
              <User className="h-4 w-4" />
              <span>{session.user.email}</span>
            </div>
            <Button
              variant="outline"
              size="sm"
              onClick={handleLogout}
              className="gap-2"
            >
              <LogOut className="h-4 w-4" />
              Logout
            </Button>
          </div>
        ) : (
          <Button
            variant="default"
            size="sm"
            onClick={() => navigate("/auth")}
          >
            Login / Sign Up
          </Button>
        )}
        <div className="text-sm text-muted-foreground font-mono">
          System Time: {new Date().toLocaleTimeString()}
        </div>
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
              onClick={() => {
                if (!session) {
                  toast.error("Please login to analyze videos");
                  navigate("/auth");
                  return;
                }
                handleUploadClick();
              }}
              disabled={!uploadedVideo || !session}
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
  