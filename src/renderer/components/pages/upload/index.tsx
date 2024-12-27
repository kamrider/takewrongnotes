import React, { useCallback, useState, useEffect } from 'react';
import { useDropzone } from 'react-dropzone';
import { Upload, FileText as FileIcon, Image as ImageIcon, File as GenericFileIcon, X } from 'lucide-react';
import { Button } from '../../ui/button';
import { Card, CardContent } from '../../ui/card';
import { cn } from '../../../lib/utils';
import Lightbox from "yet-another-react-lightbox";
import "yet-another-react-lightbox/styles.css";

interface FileWithPreview extends File {
  preview?: string;
}

const UploadPage = () => {
  const [files, setFiles] = useState<FileWithPreview[]>([]);
  const [selectedImage, setSelectedImage] = useState<string | null>(null);

  const onDrop = useCallback((acceptedFiles: File[]) => {
    setFiles(prev => [...prev, ...acceptedFiles.map(file => 
      Object.assign(file, {
        preview: file.type.startsWith('image/') 
          ? URL.createObjectURL(file)
          : undefined
      })
    )]);
  }, []);

  useEffect(() => {
    return () => {
      files.forEach(file => {
        if (file.preview) {
          URL.revokeObjectURL(file.preview);
        }
      });
    };
  }, [files]);

  const removeFile = (index: number) => {
    setFiles(prev => {
      const newFiles = [...prev];
      const file = newFiles[index];
      if (file.preview) {
        URL.revokeObjectURL(file.preview);
      }
      newFiles.splice(index, 1);
      return newFiles;
    });
  };

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: {
      'image/*': ['.png', '.jpg', '.jpeg', '.gif'],
      'application/pdf': ['.pdf'],
      'application/msword': ['.doc'],
      'application/vnd.openxmlformats-officedocument.wordprocessingml.document': ['.docx'],
      'application/vnd.ms-excel': ['.xls'],
      'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet': ['.xlsx']
    },
    multiple: true
  });

  const handleImageClick = (preview: string) => {
    setSelectedImage(preview);
  };

  const getFileIcon = (file: FileWithPreview) => {
    if (file.type.startsWith('image/')) {
      return file.preview ? (
        <img
          src={file.preview}
          alt={file.name}
          className="h-10 w-10 object-cover rounded cursor-pointer hover:opacity-80 transition-opacity"
          onClick={() => file.preview && handleImageClick(file.preview)}
        />
      ) : (
        <ImageIcon className="h-10 w-10" />
      );
    }
    if (file.type.includes('pdf') || file.type.includes('word') || file.type.includes('document')) {
      return <FileIcon className="h-10 w-10" />;
    }
    return <GenericFileIcon className="h-10 w-10" />;
  };

  return (
    <div className="p-6">
      <Card className="w-full max-w-2xl mx-auto">
        <CardContent className="p-6">
          <h2 className="text-lg font-semibold mb-1">上传新文档</h2>
          <p className="text-sm text-muted-foreground mb-4">
            选择或拖拽文件到这里上传
          </p>

          <div
            {...getRootProps()}
            className={cn(
              "flex flex-col items-center justify-center border border-dashed rounded-lg p-8 mb-4",
              isDragActive ? "border-primary bg-primary/5" : "border-muted-foreground/25 hover:border-primary/50",
              "cursor-pointer"
            )}
          >
            <input {...getInputProps()} />
            <Upload className="h-10 w-10 text-muted-foreground mb-4" />
            <p className="text-sm text-center text-muted-foreground">
              {isDragActive ? "放开以上传文件" : "拖拽文件到这里，或者点击选择文件"}
            </p>
            <Button 
              variant="outline" 
              onClick={e => e.preventDefault()}
              className="mt-4"
            >
              选择文件
            </Button>
          </div>

          {files.length > 0 && (
            <div>
              <h3 className="text-sm font-medium mb-2">已选择的文件：</h3>
              <ul className="space-y-2">
                {files.map((file, index) => (
                  <li 
                    key={index} 
                    className="flex items-center justify-between p-2 rounded border border-border/50 bg-muted/30"
                  >
                    <div className="flex items-center gap-3">
                      {getFileIcon(file)}
                      <div>
                        <p className="text-sm font-medium">{file.name}</p>
                      </div>
                    </div>
                    <Button
                      variant="ghost"
                      size="icon"
                      className="h-8 w-8 text-muted-foreground hover:text-destructive"
                      onClick={() => removeFile(index)}
                    >
                      <X className="h-4 w-4" />
                    </Button>
                  </li>
                ))}
              </ul>
            </div>
          )}
        </CardContent>
      </Card>

      <Lightbox
        open={!!selectedImage}
        close={() => setSelectedImage(null)}
        slides={[{ src: selectedImage || '' }]}
      />
    </div>
  );
};

export default UploadPage; 