"use client";

import type React from "react";

import { useState } from "react";
import { Button, CircularProgress } from "@mui/material";
import { CloudUpload as CloudUploadIcon } from "@mui/icons-material";

interface ImageUploadProps {
  onUpload: (file: File) => Promise<string>;
  onError?: (error: Error) => void;
}

export default function ImageUpload({ onUpload, onError }: ImageUploadProps) {
  const [uploading, setUploading] = useState(false);

  const handleFileChange = async (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    const file = event.target.files?.[0];
    if (!file) return;

    try {
      setUploading(true);
      await onUpload(file);
    } catch (error) {
      onError?.(error as Error);
    } finally {
      setUploading(false);
    }
  };

  return (
    <div className="flex items-center gap-4">
      <Button
        variant="contained"
        component="label"
        startIcon={
          uploading ? <CircularProgress size={20} /> : <CloudUploadIcon />
        }
        disabled={uploading}
      >
        Upload Image
        <input
          type="file"
          hidden
          accept="image/*"
          onChange={handleFileChange}
        />
      </Button>
    </div>
  );
}
