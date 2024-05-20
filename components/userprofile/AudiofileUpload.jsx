import React, { useRef, useState } from "react";
import ProgressBar from "@ramonak/react-progress-bar";

// import './FileUpload.css'


const AudioFileUpload = ({ selectedFile, setSelectedFile }) => {
    const inputRef = useRef();
    //   const [selectedFile, setSelectedFile] = useState(null);
    const [progress, setProgress] = useState(0);

    const handleFileChange = (event) => {
        if (event.target.files && event.target.files.length > 0) {
            setSelectedFile(event.target.files[0]);
            setProgress(0); // Reset progress when a new file is selected
        }
    };

    const onChooseFile = () => {
        inputRef.current.click();
    };

    const simulateUpload = async () => {
        if (!selectedFile) {
            return; // No file selected, do nothing
        }

        // Simulate upload progress (replace with actual upload logic if needed)
        for (let i = 0; i <= 100; i += 10) {
            await new Promise((resolve) => setTimeout(resolve, 100)); // Simulate delay
            setProgress(i);
            console.log('---------', i)
        }

        console.log("Simulated upload complete for:", selectedFile.name);
    };

    const clearFileInput = () => {
        inputRef.current.value = "";
        setSelectedFile(null);
        setProgress(0);
    };

    return (
        <div className="audio-upload text-black">
            <input
                ref={inputRef}
                type="file"
                accept="audio/*"
                onChange={handleFileChange}
                style={{ display: "none" }}
            />

            {/* Button to trigger the file input dialog */}
            {!selectedFile && (
                <button className="file-btn w-[150px] text-[22px] " onClick={onChooseFile}>
                    <i class="ri-folder-music-line"></i>
                </button>
            )}

            {selectedFile && (
                <>
                    <div className="file-card">
                        <span className="material-symbols-outlined icon">অডিও ফাইল</span>

                        <div className="file-info">
                            <div style={{ flex: 1 }}>
                                <h6>{selectedFile?.name}</h6>

                                {progress > 0 && ( // Show progress bar only when a file is selected

                                    <ProgressBar
                                        completed={progress}
                                        bgColor="#F9A106"
                                        height="16px"
                                        labelSize="12px"
                                    />
                                )}
                            </div>

                            <button onClick={clearFileInput}>
                                <span class="material-symbols-outlined close-icon">
                                    বাতিল করুন
                                </span>
                            </button>
                        </div>
                    </div>
                    <button className="upload-btn w-[150px] " onClick={simulateUpload}>
                        {progress === 100 ? "আপলোড সম্পন্ন" : "আপলোড করুন"}
                    </button>
                </>
            )}
        </div>
    );
};

export default AudioFileUpload;
