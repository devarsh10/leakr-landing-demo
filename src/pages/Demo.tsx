import { ArrowLeft } from "lucide-react";
import { Link } from "react-router-dom";

const Demo = () => {
  return (
    <div className="min-h-screen bg-background flex flex-col items-center justify-center">
      <p className="text-2xl font-semibold text-foreground mb-6">Demo coming soon</p>
      <Link to="/" className="flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground transition-colors">
        <ArrowLeft className="w-4 h-4" />
        Back to home
      </Link>
    </div>
  );
};

export default Demo;
