import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Eye, Users, AlertTriangle, Zap } from "lucide-react";

interface AnalysisOptionsProps {
  onOptionSelect: (option: string) => void;
  onCancel: () => void;
}

const AnalysisOptions = ({ onOptionSelect, onCancel }: AnalysisOptionsProps) => {
  const [selectedOption, setSelectedOption] = useState<string>("");

  const options = [ 
    {
      id: "object-detection",
      title: "Object Detection",
      description: "Identify and track objects, vehicles, and items in the video",
      icon: Eye,
      color: "text-primary",
      bgColor: "bg-primary/10",
    },
    {
      id: "facial-recognition",
      title: "Facial Recognition",
      description: "Detect, identify, and analyze facial features and expressions",
      icon: Users,
      color: "text-accent",
      bgColor: "bg-accent/10",
    },
    {
      id: "suspicious-activity",
      title: "Suspicious Activity Detection",
      description: "Monitor for unusual behaviors and potential security threats",
      icon: AlertTriangle,
      color: "text-warning",
      bgColor: "bg-warning/10",
    },
    {
      id: "all",
      title: "Complete Analysis",
      description: "Run all detection modules for comprehensive threat assessment",
      icon: Zap,
      color: "text-success",
      bgColor: "bg-success/10",
    },
  ];

  const handleSelect = (optionId: string) => {
    setSelectedOption(optionId);
  };

  const handleConfirm = () => {
    if (selectedOption) {
      onOptionSelect(selectedOption);
    }
  };

  return (
    <div className="fixed inset-0 bg-background/80 backdrop-blur-sm flex items-center justify-center z-50 animate-fade-in">
      <Card className="w-full max-w-4xl p-8 mx-4">
        <div className="text-center mb-8">
          <h2 className="text-3xl font-bold text-foreground mb-2">
            Select Analysis Type
          </h2>
          <p className="text-muted-foreground">
            Choose the type of analysis you want to perform on your video
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
          {options.map((option) => {
            const Icon = option.icon;
            const isSelected = selectedOption === option.id;
            
            return (
              <Card
                key={option.id}
                className={`p-6 cursor-pointer transition-all duration-300 hover:scale-105 ${
                  isSelected 
                    ? 'border-primary shadow-glow-primary bg-primary/5' 
                    : 'hover:border-primary/50 hover:shadow-cyber'
                }`}
                onClick={() => handleSelect(option.id)}
              >
                <div className="flex items-start space-x-4">
                  <div className={`p-3 rounded-lg ${option.bgColor}`}>
                    <Icon className={`h-6 w-6 ${option.color}`} />
                  </div>
                  <div className="flex-1">
                    <h3 className="text-lg font-semibold text-foreground mb-2">
                      {option.title}
                    </h3>
                    <p className="text-sm text-muted-foreground">
                      {option.description}
                    </p>
                  </div>
                  {isSelected && (
                    <div className="w-6 h-6 rounded-full bg-primary flex items-center justify-center animate-pulse-glow">
                      <div className="w-3 h-3 rounded-full bg-primary-foreground" />
                    </div>
                  )}
                </div>
              </Card>
            );
          })}
        </div>

        <div className="flex justify-center space-x-4">
          <Button
            variant="outline"
            onClick={onCancel}
            className="px-8"
          >
            Cancel
          </Button>
          <Button
            onClick={handleConfirm}
            disabled={!selectedOption}
            className="px-8 bg-gradient-primary hover:shadow-glow-primary transition-all duration-300"
          >
            Start Analysis
          </Button>
        </div>
      </Card>
    </div>
  );
};

export default AnalysisOptions;