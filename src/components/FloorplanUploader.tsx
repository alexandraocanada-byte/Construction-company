import { useState, useRef, DragEvent, ChangeEvent } from "react";
import { UploadCloud, File, AlertTriangle, Cpu, CheckCircle, HelpCircle, ChevronRight } from "lucide-react";
import { motion, AnimatePresence } from "motion/react";

export default function FloorplanUploader() {
  const [isDragging, setIsDragging] = useState(false);
  const [file, setFile] = useState<File | null>(null);
  const [parsing, setParsing] = useState(false);
  const [parseResult, setParseResult] = useState<{
    rooms: string[];
    approxSqft: number;
    wallCondition: string;
    advice: string;
    adviceZh: string;
  } | null>(null);

  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleDragOver = (e: DragEvent) => {
    e.preventDefault();
    setIsDragging(true);
  };

  const handleDragLeave = () => {
    setIsDragging(false);
  };

  const handleDrop = (e: DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
    const droppedFiles = e.dataTransfer.files;
    if (droppedFiles && droppedFiles.length > 0) {
      processFile(droppedFiles[0]);
    }
  };

  const handleFileSelect = (e: ChangeEvent<HTMLInputElement>) => {
    const selectedFiles = e.target.files;
    if (selectedFiles && selectedFiles.length > 0) {
      processFile(selectedFiles[0]);
    }
  };

  const selectFileManual = () => {
    fileInputRef.current?.click();
  };

  const processFile = (file: File) => {
    // Basic file validating
    if (!file.type.startsWith("image/") && file.type !== "application/pdf") {
      alert("Please upload an image file (PNG/JPG) or flat PDF floorplan layout.");
      return;
    }
    setFile(file);
    setParseResult(null);
    setParsing(true);

    // Simulate blueprint AI parser
    setTimeout(() => {
      setParsing(false);
      setParseResult({
        rooms: ["Kitchen", "Master Bedroom", "Open Living Area", "Ensuite Bathroom", "Rear Patio Entry"],
        approxSqft: Math.floor(Math.random() * 400) + 650, // Between 650 and 1050 sqft
        wallCondition: "Load-bearing spine wall detected; partition walls are non-structural and suitable for fluid remodeling.",
        advice: "Recommend opening the partition between the Kitchen and Living Area to form a modern, bright, fluid entertainment lounge. Ideal for hosting and welcoming queer community mixers.",
        adviceZh: "建议拆除厨房与客厅之间的非承重墙体，构成更具流线性的现代餐厨一体起居庭。完美符合多功能社交、朋友聚会及无界舒适的生活理念。"
      });
    }, 2800);
  };

  const clearFile = () => {
    setFile(null);
    setParseResult(null);
    if (fileInputRef.current) fileInputRef.current.value = "";
  };

  return (
    <section id="floorplan" className="py-20 bg-stone-50 text-stone-900 overflow-hidden border-b border-stone-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Title Block */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="flex items-center justify-center space-x-1.5 text-rose-500 font-sans text-xs font-semibold tracking-widest uppercase mb-3">
            <Cpu className="w-4 h-4 text-rose-500" />
            <span>Interactive Floorplan Analyzer</span>
          </div>
          <h2 className="font-sans font-bold text-3xl sm:text-4xl text-stone-900 tracking-tight">
            Analyze Your Spatial Layout
          </h2>
          <p className="mt-3 text-sm sm:text-base text-stone-600 font-sans max-w-xl mx-auto">
            Drag and drop your local blueprint image or property floorplan PDF. Our craft intelligence tool will analyze spatial dimensions and offer inclusive layout suggestions.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10">
          
          {/* Uploader Box (cols-7) */}
          <div className="lg:col-span-6 flex flex-col justify-center">
            <div 
              onDragOver={handleDragOver}
              onDragLeave={handleDragLeave}
              onDrop={handleDrop}
              onClick={selectFileManual}
              className={`border-2 border-dashed rounded-3xl p-8 sm:p-12 text-center transition-all duration-300 cursor-pointer flex flex-col items-center justify-center min-h-[320px] relative ${
                isDragging 
                  ? "border-yellow-500 bg-yellow-500/5 ring-4 ring-yellow-500/10"
                  : file 
                    ? "border-yellow-500 bg-yellow-500/[0.02]"
                    : "border-stone-300 bg-white hover:border-stone-400"
              }`}
            >
              <input 
                type="file"
                ref={fileInputRef}
                onChange={handleFileSelect}
                className="hidden"
                accept="image/*,.pdf"
              />

              <AnimatePresence mode="wait">
                {!file ? (
                  <motion.div 
                    key="empty-upload"
                    className="space-y-4"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                  >
                    <div className="w-14 h-14 bg-stone-100 rounded-2xl flex items-center justify-center mx-auto text-stone-600 shadow-sm border border-stone-200/50">
                      <UploadCloud className="w-7 h-7" id="uploader-cloud-icon" />
                    </div>
                    <div>
                      <h3 className="font-sans font-bold text-base text-stone-950">Drag & Drop Floorplan</h3>
                      <p className="text-xs text-stone-500 font-sans mt-1">or click to browse local files (PNG, JPG, PDF)</p>
                    </div>
                    <div className="text-[10px] text-stone-400 font-mono flex items-center justify-center gap-1.5 pt-4">
                      <span>Drag anything here</span>
                      <span className="w-1 h-1 bg-stone-300 rounded-full" />
                      <span>Strictly Confidential</span>
                    </div>
                  </motion.div>
                ) : (
                  <motion.div 
                    key="active-file"
                    className="space-y-4 w-full"
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0 }}
                    onClick={(e) => e.stopPropagation()} // Stop triggering manual file selecting
                  >
                    <div className="flex items-center space-x-3 bg-white border border-stone-200 p-4 rounded-2xl max-w-sm mx-auto shadow-sm">
                      <div className="p-2.5 bg-yellow-100 rounded-xl text-yellow-800">
                        <File className="w-6 h-6" id="uploader-file-icon" />
                      </div>
                      <div className="text-left flex-1 min-w-0">
                        <p className="font-sans font-bold text-xs sm:text-sm text-stone-900 truncate">{file.name}</p>
                        <p className="font-mono text-[10px] text-stone-500 mt-0.5">{(file.size / 1024).toFixed(1)} KB</p>
                      </div>
                    </div>

                    {!parsing && !parseResult && (
                      <button
                        onClick={clearFile}
                        className="text-stone-550 hover:text-stone-800 text-xs font-sans font-semibold underline underline-offset-4 cursor-pointer"
                      >
                        Remove and select another file
                      </button>
                    )}

                    {parsing && (
                      <div className="py-4 space-y-3">
                        <div className="flex items-center justify-center space-x-1 text-sm font-sans font-bold text-yellow-600 animate-pulse">
                          <Cpu className="w-4 h-4 animate-spin text-yellow-500" />
                          <span>Mapping layout structures...</span>
                        </div>
                        <div className="w-full max-w-xs bg-stone-200 h-1.5 rounded-full overflow-hidden mx-auto">
                          <motion.div 
                            className="bg-yellow-500 h-full rounded-full"
                            initial={{ width: "0%" }}
                            animate={{ width: "100%" }}
                            transition={{ duration: 2.6 }}
                          />
                        </div>
                      </div>
                    )}
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </div>

          {/* Results feedback Box (cols-6) */}
          <div className="lg:col-span-6">
            <AnimatePresence mode="wait">
              {parseResult ? (
                <motion.div
                  key="results-panel"
                  className="bg-stone-900 border border-stone-800 text-stone-100 rounded-3xl p-6 sm:p-8 space-y-6 shadow-md"
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -20 }}
                  transition={{ duration: 0.4 }}
                >
                  <div className="flex items-center justify-between border-b border-stone-800 pb-4">
                    <div className="flex items-center space-x-2">
                      <CheckCircle className="w-5 h-5 text-emerald-500" />
                      <h3 className="font-sans font-bold text-sm text-stone-100">Structural Analysis Sheet</h3>
                    </div>
                    <span className="font-mono text-[9px] text-stone-400 bg-stone-800 px-2 py-0.5 rounded">
                      DETECTION OK
                    </span>
                  </div>

                  {/* Rooms list */}
                  <div className="space-y-1.5">
                    <span className="text-stone-500 font-sans text-[10px] font-bold tracking-wider uppercase block">
                      A. Identified Spatial Nodes (区域识别)
                    </span>
                    <div className="flex flex-wrap gap-2 pt-1">
                      {parseResult.rooms.map((room) => (
                        <span key={room} className="bg-stone-800 border border-stone-750 text-stone-200 px-3 py-1 rounded-lg text-xs font-sans">
                          {room}
                        </span>
                      ))}
                    </div>
                  </div>

                  {/* Approximate Sqft */}
                  <div className="grid grid-cols-2 gap-4 bg-stone-850 p-4 rounded-2xl border border-stone-800">
                    <div>
                      <span className="text-stone-500 font-sans text-[9px] font-bold block uppercase tracking-wide">
                        B. Evaluated Area
                      </span>
                      <span className="font-mono font-bold text-lg text-stone-200">
                        {parseResult.approxSqft} <span className="text-xs font-normal">SQFT</span>
                      </span>
                    </div>
                    <div>
                      <span className="text-stone-500 font-sans text-[9px] font-bold block uppercase tracking-wide">
                        C. Load spines
                      </span>
                      <span className="font-sans font-bold text-xs text-yellow-500 block mt-1">
                        Solid Center Core
                      </span>
                    </div>
                  </div>

                  {/* Structural conditions */}
                  <div className="space-y-1">
                    <span className="text-stone-500 font-sans text-[10px] font-bold tracking-wider uppercase block">
                      D. Base Boundary Evaluation (承重墙判断)
                    </span>
                    <p className="text-xs text-stone-300 font-sans leading-relaxed">
                      {parseResult.wallCondition}
                    </p>
                  </div>

                  {/* Dynamic advice */}
                  <div className="border-t border-stone-800 pt-4 space-y-2">
                    <span className="text-yellow-500 font-sans text-[10px] font-bold tracking-wider uppercase flex items-center gap-1.5">
                      <Cpu className="w-3.5 h-3.5 fill-yellow-500/10" />
                      <span>Cooperative design Suggestion (包容空间规划建议)</span>
                    </span>
                    <p className="text-xs text-stone-300 font-sans leading-relaxed">
                      {parseResult.advice}
                    </p>
                    <p className="text-xs text-stone-400 font-sans leading-relaxed italic pt-1.5 border-t border-stone-850">
                      {parseResult.adviceZh}
                    </p>
                  </div>

                  {/* Form Trigger button */}
                  <div className="pt-3 flex items-center justify-between text-xs text-stone-400">
                    <span className="font-sans">Want real spatial sketches?</span>
                    <button 
                      onClick={() => {
                        alert("Blueprint analyzed! We have attached this structural sheet to your session. Our design reps will inspect it during your consultation visit.");
                      }}
                      className="text-yellow-500 font-sans font-bold flex items-center space-x-1 hover:underline cursor-pointer"
                    >
                      <span>Lock Blueprint in Consult Session</span>
                      <ChevronRight className="w-4 h-4" />
                    </button>
                  </div>

                </motion.div>
              ) : (
                <motion.div
                  key="empty-results"
                  className="bg-stone-50 border border-stone-200 rounded-3xl p-6 sm:p-8 flex flex-col items-center justify-center text-center text-stone-500 min-h-[320px] shadow-sm relative overflow-hidden"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                >
                  <div className="absolute top-0 right-0 w-24 h-24 bg-rose-500/5 rounded-bl-full pointer-events-none" />
                  
                  <div className="p-4 bg-white border border-stone-250/60 rounded-full shadow-sm text-stone-400 mb-4">
                    <HelpCircle className="w-6 h-6" id="uploader-help-icon" />
                  </div>
                  <div>
                    <h3 className="font-sans font-bold text-sm text-stone-900">Waiting for floorplan file...</h3>
                    <p className="text-xs text-stone-500 max-w-xs mx-auto mt-2 leading-relaxed">
                      Upload your layout drawing or hand-drawn plan on the left. Lockr Spatial Services will reconstruct structural partition estimates automatically.
                    </p>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>

        </div>

      </div>
    </section>
  );
}
