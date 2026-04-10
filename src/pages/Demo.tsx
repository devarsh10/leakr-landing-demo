import { Link } from "react-router-dom";

const Demo = () => {
  return (
    <div className="min-h-screen bg-background flex flex-col items-center justify-center">
      <p className="text-2xl font-semibold text-foreground mb-6">Demo coming soon</p>
      <Link to="/" className="flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground transition-colors">
        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <path d="M19 12H5M12 19l-7-7 7-7"/>
        </svg>
        Back to home
      </Link>
    </div>
  );
};

export default Demo;
