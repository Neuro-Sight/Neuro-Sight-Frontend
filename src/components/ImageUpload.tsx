import { useState, useCallback } from "react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { X, Upload, Check, AlertCircle } from "lucide-react";

interface ImageUploadProps {
  onClose: () => void;
  onImageUploaded: (file: File) => void;
  analysisType: string;
}

const ImageUpload = ({ onClose, onImageUploaded, analysisType }: ImageUploadProps) => {
  const [uploadedImage, setUploadedImage] = useState<File | null>(null);
  const [imagePreview, setImagePreview] = useState<string>("");
  const [isMatched, setIsMatched] = useState<boolean | null>(null);
  const [isAnalyzing, setIsAnalyzing] = useState(false);

  const handleImageUpload = useCallback((event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file && (file.type === "image/png" || file.type === "image/jpeg" || file.type === "image/jpg")) {
      setUploadedImage(file);
      const reader = new FileReader();
      reader.onload = (e) => {
        setImagePreview(e.target?.result as string);
      };
      reader.readAsDataURL(file);
      
      // Simulate facial recognition analysis
      if (analysisType === "facial-recognition" || analysisType === "all") {
        setIsAnalyzing(true);
        setTimeout(() => {
          setIsMatched(Math.random() > 0.3); // Random match result for demo
          setIsAnalyzing(false);
        }, 2000);
      }
    }
  }, [analysisType]);

  const handleConfirm = () => {
    if (uploadedImage) {
      onImageUploaded(uploadedImage);
      onClose();
    }
  };

  return (
    <div className="fixed inset-0 bg-background/80 backdrop-blur-sm flex items-center justify-center z-50 animate-fade-in">
      <Card className="w-full max-w-md p-6 mx-4">
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-lg font-semibold text-foreground">
            Upload Reference Image
          </h3>
          <Button
            variant="ghost"
            size="icon"
            onClick={onClose}
            className="h-8 w-8"
          >
            <X className="h-4 w-4" />
          </Button>
        </div>

        <p className="text-sm text-muted-foreground mb-4">
          Upload a reference image for facial recognition matching (PNG/JPG format)
        </p>

        <div className="space-y-4">
          <Input
            type="file"
            accept=".png,.jpg,.jpeg"
            onChange={handleImageUpload}
            className="cursor-pointer"
          />

          {imagePreview && (
            <div className="space-y-3">
              <div className="relative">
                <img
                  src={imagePreview}
                  alt="Preview"
                  className="w-full h-48 object-cover rounded-lg border border-border"
                />
              </div>

              {isAnalyzing && (
                <div className="flex items-center justify-center py-2">
                  <div className="animate-spin rounded-full h-6 w-6 border-b-2 border-primary"></div>
                  <span className="ml-2 text-sm text-muted-foreground">
                    Analyzing facial features...
                  </span>
                </div>
              )}

              {!isAnalyzing && isMatched !== null && (
                <div className={`flex items-center justify-center py-2 px-3 rounded-lg ${
                  isMatched 
                    ? 'bg-success/10 text-success border border-success/20' 
                    : 'bg-destructive/10 text-destructive border border-destructive/20'
                }`}>
                  {isMatched ? (
                    <Check className="h-4 w-4 mr-2" />
                  ) : (
                    <AlertCircle className="h-4 w-4 mr-2" />
                  )}
                  <span className="text-sm font-medium">
                    {isMatched ? "Face match detected" : "No face match found"}
                  </span>
                </div>
              )}
            </div>
          )}
        </div>

        <div className="flex justify-end space-x-3 mt-6">
          <Button variant="outline" onClick={onClose}>
            Cancel
          </Button>
          <Button
            onClick={handleConfirm}
            disabled={!uploadedImage}
            className="bg-gradient-primary hover:shadow-glow-primary transition-all duration-300"
          >
            <Upload className="h-4 w-4 mr-2" />
            Use Image
          </Button>
        </div>
      </Card>
    </div>
  );
};

export default ImageUpload;